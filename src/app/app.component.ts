import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  DEFAULT_QUESTIONS_NUMBER,
  Question,
  QuestionService,
} from './question.service';
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
    MatSliderModule,
    MatToolbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Quiz TUE/TFUE';

  selectedQuestionNumber = DEFAULT_QUESTIONS_NUMBER;
  questions: Question[] = [];
  quizStarted = false;
  displayAnswer = false;
  score = 0;

  constructor(private readonly _questionService: QuestionService) {}

  selectQuestionNumber(selectedQuestionNumber: number) {
    this.selectedQuestionNumber = selectedQuestionNumber;
  }

  startQuiz(): void {
    this.getQuestions();
    this.quizStarted = true;
  }

  getQuestions() {
    this._questionService
      .getQuestions(this.selectedQuestionNumber)
      .subscribe((data) => (this.questions = data));
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
