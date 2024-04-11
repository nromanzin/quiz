import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

export type Question = {
  prompt: string;
  options: string[];
  solution: string;
  selectedOption?: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Quiz TUE/TFUE';

  questions: Question[] = [
    {
      prompt: 'Question 1',
      options: ['Réponse A', 'Réponse B', 'Réponse C'],
      solution: 'Réponse B',
    },
    {
      prompt: 'Question 2',
      options: ['Réponse A', 'Réponse B', 'Réponse C'],
      solution: 'Réponse C',
    },
    {
      prompt: 'Question 3',
      options: ['Réponse A', 'Réponse B', 'Réponse C'],
      solution: 'Réponse A',
    },
  ];

  displayAnswer = false;
  score = 0;

  selectAnswer(event: MatRadioChange, question: Question) {
    question.selectedOption = event.value;
    console.log(question);
  }
  validate() {
    this.score = 0;
    this.displayAnswer = true;
    for (const question of this.questions) {
      this.score += question.solution === question.selectedOption ? 1 : 0;
    }
  }
}
