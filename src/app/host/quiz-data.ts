import { v4 as uuid } from 'uuid';
import { INewOption, INewQuestion, INewQuiz } from './host.model';

export const newOption = (id: string): INewOption => {
  return {
    id,
    optionText: 'New option',
    optionImageUrl: 'http://fake_option_image_url',
    status: true,
  };
};

export const newQuestion = (id: string): INewQuestion => {
  return {
    id,
    type: 'text',
    questionText: 'New Question',
    questionImageUrl: 'https://fake_image_url',
    timer: 5000,
    points: 1000,
    options: {
      type: 'text',
      optionList: [
        newOption(uuid())
      ]
    }
  };
};

export const newQuiz = (id: string): INewQuiz => {
  return {
    id,
    name: 'new Quiz',
    description: 'New Quiz Description',
    questions: [
      newQuestion(uuid())
    ]
  };
};
