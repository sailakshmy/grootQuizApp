import {shuffleArray} from './utils';
/*these details have been received from the responsw of the Fetch API.*/
export type Question = {
    category: string;
    correct_answer: string;
    difficulty:string;
    incorrect_answers: string[];
    question:string;
    type:string;
}

/**In the response from this API, we get 2 different properties for answers- correct_answer and incorrect_answers.
 * But we want them in 1 property, so that it can be displayed in the UI. So, we add a property to the response
 * as shown. This will use the types that are specified in Question and add the answers property to it.*/
export type QuestionState = Question &  {answers: string[]}

/**The questions have been linked to the type QuestionState Array. The answers also have to be linked to a similar
 * array.
 */
export type AnswerState = {
    question: string;
    userAnswer: string;
    correct: boolean;
    correctAnswer: string;
  }

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard"
}

//Create the function that will fetch the questions from the API.
export const fetchQuizQuestions = async (numberOfQuestions:number, difficulty:Difficulty) =>{
    try{
        const URL=`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=16&type=multiple&difficulty=${difficulty}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data.results.map((question: Question)=>({
        ...question,
        /**Now, we have to shuffle the answer set here or the correct answer will always be in the 
        same place. To do this, we use the shuffleArray that we have defined in utils.ts file. */
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }))
    }catch(err){
        console.log(err);
    }
    
}