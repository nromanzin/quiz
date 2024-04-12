import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { getRandomSubarray, shuffleArray } from './random';

export type DataInput = {
  category: string;
  prompt: string;
  solution: string;
};

export type Question = DataInput & {
  options: string[];
  selectedOption?: string;
};

export const DEFAULT_QUESTIONS_NUMBER = 10;
export const DEFAULT_OPTIONS_NUMBER = 3;

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(private readonly _httpClient: HttpClient) {}
  getQuestions(): Observable<Question[]> {
    return this._httpClient
      .get('assets/questions.csv', { responseType: 'text' })
      .pipe(
        map((content) => {
          const data: DataInput[] = [];
          const lines = content.split('\n');
          for (const line of lines) {
            const splittedLine = line.split(';');
            const datum: DataInput = {
              category: splittedLine[0],
              prompt: splittedLine[1],
              solution: splittedLine[2],
            };
            data.push(datum);
          }
          const questions: Question[] = [];
          const solutions = data.map((question) => question.solution);
          for (const datum of data) {
            const clonedSolutions = Object.assign([], solutions);
            const currentSolutionIndex = clonedSolutions.indexOf(
              datum.solution
            );
            if (currentSolutionIndex > -1) {
              clonedSolutions.splice(currentSolutionIndex, 1);
            }
            const options = [
              ...getRandomSubarray(clonedSolutions, DEFAULT_OPTIONS_NUMBER - 1),
              datum.solution,
            ];
            shuffleArray(options);
            const question: Question = {
              ...datum,
              options,
            };
            questions.push(question);
          }
          return getRandomSubarray(questions, DEFAULT_QUESTIONS_NUMBER);
        })
      );
  }
}
