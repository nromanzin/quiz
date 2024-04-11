import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

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

  questions = [
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

  selectedAnswer = '';
  answer = '';
  selectAnswer(event: MatRadioChange) {
    this.selectedAnswer = event.value;
  }
  validate() {
    this.displayAnswer = true;
  }
}
