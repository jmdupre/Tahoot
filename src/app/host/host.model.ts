export type CurrentHostPage = 'home' | 'create' | 'manage';

export interface INewOption {
  id: string;
  optionText: string;
  optionImageUrl?: string;
  status: boolean;
}

export interface INewQuestion {
  id: string;
  type: string;
  questionText?: string;
  questionImageUrl?: string;
  timer: number;
  points: number;
  options: {
    type: string,
    optionList: INewOption[]
  };
}

export interface INewQuiz {
  id: string;
  name: string;
  description: string;
  questions: INewQuestion[];
}
