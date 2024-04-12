import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Question, QuestionService } from './question.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Quiz TUE/TFUE';

  questions: Question[] = []
  displayAnswer = false;
  score = 0;

  constructor(private readonly _questionService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    this._questionService.getQuestions().subscribe(data => this.questions = data);
  }

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
