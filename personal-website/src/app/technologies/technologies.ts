import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technologies',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './technologies.html',
  styleUrls: ['./technologies.css'],
})
export class Technologies {
  technologies = [
  { name: 'HTML', picture: 'assets/images/html5logo.png', borderColor: '#e44d26' },
  { name: 'CSS', picture: 'assets/images/csslogo.png', borderColor: '#1468d4' },
  { name: 'JavaScript', picture: 'assets/images/javascriptlogo.png', borderColor: '#f0db31' },
  { name: 'TypeScript', picture: 'assets/images/typescriptlogo.png', borderColor: '#3178c6' },
  { name: 'Angular', picture: 'assets/images/angularlogo.png', borderColor: '#dd1b16' },
  { name: 'React', picture: 'assets/images/reactlogo.png', borderColor: '#61dafb' },
];

  aiTools = [
  { name: 'ChatGPT', picture: 'assets/images/chatgpt.png', borderColor: '#10b981' },
  { name: 'GitHub Copilot', picture: 'assets/images/copilotgithub.png', borderColor: '#000000' },
  { name: 'Lovable AI User Interface ', picture: 'assets/images/lovableai.png', borderColor: '#ff69b4' },
];



  developerTools = [
  { name: 'GitHub Desktop', picture: 'assets/images/GithubDlogo.png', borderColor: '#9106cd' },
  { name: 'VS Code', picture: 'assets/images/VSClogo.png', borderColor: '#0a4d80' },
  { name: 'Node.js', picture: 'assets/images/nodejslogo.png', borderColor: '#3c873a' },
  { name: 'Docker', picture: 'assets/images/Dockerlogo.png', borderColor: '#0db7ed' },
];
  languages = [ //LANGUAGES/
    { name: 'Greek (Primary)', picture: 'assets/images/Greece.png', borderColor: '#5bc2e1' },
    { name: 'English (Fluent)', picture: 'assets/images/UK.png', borderColor: '#de4343' },
  ];
}
