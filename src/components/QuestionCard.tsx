import React   from 'react';
import {AnswerState} from '../API';
import {Wrapper, ButtonWrapper} from './QuestionCard.styles';
//These are the props for this component.
type PropsForThisComponent = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    userAnswers:AnswerState|undefined;
    questionNumber: number;
    totalQuestions:number;
}
//In order to inform the component to use the above mentioned props, use React.FC. FC stands for functional
//component. To specify the props, pass the type in the <> brackets
const QuestionCard:React.FC<PropsForThisComponent> = ({question,answers,callback,userAnswers,
                                                        questionNumber,totalQuestions})=>(
    <Wrapper>
        <p className="number">Question:{questionNumber}/{totalQuestions}</p>
        {console.log(question)}
                                                        <p>{question}
        {/*<p dangerouslySetInnerHTML={{__html: question}}>*/}
            <div>
                {answers.map(answer=>(
                    <ButtonWrapper correct={userAnswers?.correctAnswer === answer} 
                    userClicked={userAnswers?.userAnswer === answer}
                          key={answer}>
                        <button disabled={userAnswers?true:false} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{__html:answer}}/>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
       </p>
        </Wrapper>
)
    

export default QuestionCard;