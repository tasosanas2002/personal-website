import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Navbar } from './navbar/navbar';
import { Footer } from "./footer/footer";
import { Technologies } from "./technologies/technologies";

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

type Project = {
  name: string;
  url: string;
  description: string;
  language: string | null;
  updatedAt: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, Navbar, Footer, Technologies],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly githubUsername = 'tasosanas2002';
  private readonly maxProjects = 6;

  // Add repository names here to force them to appear first.
  private readonly featuredGithubRepos: string[] = [
    // 'my-best-project',
  ];

  // Add repository names here to hide projects you do not want to show.
  private readonly hiddenGithubRepos: string[] = [
    // 'old-experiment',
  ];

  // Optional manual projects (non-GitHub or private work).
  private readonly manualProjects: Project[] = [
    // {
    //   name: 'Private Client Platform',
    //   url: 'https://example.com',
    //   description: 'Custom business platform delivered for a private client.',
    //   language: 'Angular',
    //   updatedAt: new Date().toISOString()
    // }
  ];

  readonly projects = signal<Project[]>([]);
  readonly projectsLoading = signal(true);
  readonly projectsError = signal<string | null>(null);
  readonly profileView = signal<'experience' | 'education'>('experience');

  setProfileView(view: 'experience' | 'education'): void {
    this.profileView.set(view);
  }

  async ngOnInit(): Promise<void> {
    await this.loadProjects();
  }

  private async loadProjects(): Promise<void> {
    const endpoint = `https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=100&type=owner`;

    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept: 'application/vnd.github+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub request failed with status ${response.status}`);
      }

      const repos = (await response.json()) as GithubRepo[];

      const visibleRepos = repos.filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          !this.hiddenGithubRepos.includes(repo.name)
      );

      const featuredRepoCards = this.featuredGithubRepos
        .map((featuredName) => visibleRepos.find((repo) => repo.name === featuredName))
        .filter((repo): repo is GithubRepo => !!repo)
        .map((repo) => this.mapRepoToProject(repo));

      const remainingRepoCards = visibleRepos
        .filter((repo) => !this.featuredGithubRepos.includes(repo.name))
        .sort(
          (first, second) =>
            new Date(second.updated_at).getTime() - new Date(first.updated_at).getTime()
        )
        .map((repo) => this.mapRepoToProject(repo));

      const projectCards = [...this.manualProjects, ...featuredRepoCards, ...remainingRepoCards].slice(
        0,
        this.maxProjects
      );

      this.projects.set(projectCards);
    } catch {
      this.projectsError.set('Could not load projects from GitHub right now.');
    } finally {
      this.projectsLoading.set(false);
    }
  }

  private mapRepoToProject(repo: GithubRepo): Project {
    return {
      name: repo.name,
      url: repo.html_url,
      description: repo.description ?? 'No description provided yet.',
      language: repo.language,
      updatedAt: repo.updated_at
    };
  }
}
