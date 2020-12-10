import React,{useState} from 'react';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions, Difficulty, QuestionState, AnswerState} from './API';
import {AppStyle, Wrapper} from './App.styles';


const TOTAL_QUESTIONS=10;
function App() {
  //Creating the states
  /**useState takes in 1 argument which will be the initial state. This initial state will be used only
   * during the initial render. useState returns the current state and a function to update the state.
   */
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);/**This means that the questions property
  will be an array of the type QuestionState */
  const [number,setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerState[]>([]);
  const [score, setScore]= useState(0);
  const [gameOver, setGameOver] = useState(true);

  //Function to fetch the question once user clicks on start quiz button
  const startQuiz = async () =>{
    setLoading(true);//
    setGameOver(false);// the gameover state will be set to false, at the beginning of the game.

    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY);
    setQuestions(newQuestions);//the questions state will be set to the data that we receive from the fetch api
    setScore(0);//the score will be set to 0 at the beginning of the game
    setUserAnswers([]);
    setNumber(0);//This will refer to the first place in the array of questions
    setLoading(false);//After everything has been received, then this should be set to false as we are not loading anymore.

  }
  //Function to record the answer
  const checkAnswer  = (e: React.MouseEvent<HTMLButtonElement>) =>{ 
    /**This is to inform TS that the event that we are expecting is a Mouse event that will 
      take place on an HTML Button element. Since we are using this in React, we have to preceed the call with React library*/
      if(!gameOver){
        //Users answer
        const userAnswer =  e.currentTarget.value;
        //check if the user's answer for this question is the same as the correct answer for this question
        const correctAnswer = questions[number].correct_answer;
        let correct = false;
        if(correctAnswer===userAnswer){
          correct = true;
          //if the answers match, then increase the scrore
          setScore(prev=>prev+1);
        }
        //Save the user's answer in the AnswerState array, so that it can be shown later if required.
        const answerObject = {
          question:questions[number].question,
          userAnswer,
          correct,
          correctAnswer
        }
        setUserAnswers((prev) =>([...prev, answerObject])); 

      }

  }

  //Function to move to the next question
  const nextQuestion = () =>{
    const nextQuestionNumber = number+1;
    if(nextQuestionNumber===TOTAL_QUESTIONS){
      setGameOver(true);
    }else
    setNumber(nextQuestionNumber);
  }

  //console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))
  console.log(questions);

  return (
    <>
    <AppStyle/>
    <Wrapper>
      <h1>Groot's Quiz App</h1>
      {/**The Start button will be rendered only if teh game is over or if the user has answered the last question */}
      {gameOver || userAnswers.length===TOTAL_QUESTIONS ? 
      (<button className="start" onClick={startQuiz}> Click me when you are ready to start the quiz!</button>)
      : null}
      {/**The score will be shown only if we are not in the gameover mode */}
      {!gameOver? <p className="score">{`You have scored:${score}/10`} </p> : null}      
      {/**The Loading questions will only be shown when we load something. */}
      {loading? <p>Loading Questions....</p>: null}
      
      {/**Here questionNumber is supposed to be Number+1 because our numbering starts from 0 but that would
       * be weird for the user.
       * question is the current question from the array of questions. The index of the array of questions will
       * be denoted by the questionNumber prop, which in turn will be denoted by the number state variable.
       * if we have some answer in the userAnswer state, then we can get the correct answer by specifying the number
       * on the question Array
       */}
      {/**The question card wil be shown only if we are not loading and if we are not in gameover */}
      { !loading && !gameOver &&
        (<QuestionCard questionNumber={number+1} totalQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question} answers={questions[number].answers}
                    userAnswers={userAnswers?userAnswers[number]:undefined}
                    callback={checkAnswer}/> )}
      {/**The next question button will be available only if the game is not over and if we are not loading and 
       * if the user has answered the question and if we are not on the last question
       */}
       {!gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 ?
      (<button className="next" onClick={nextQuestion}>Next Question</button>) : null }
    </Wrapper>
    </>
  );
}

export default App;
