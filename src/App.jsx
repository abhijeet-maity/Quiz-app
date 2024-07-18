import { useState, useEffect, useCallback } from 'react'
import data from './data'
import './App.css'



function App() {

  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [incorrectanswer, setIncorrectAnswer] = useState([]);

  //utility function which will run only once when component is mounted and not declared everytime when 
  //component is rendered.

  const scrambleArray = useCallback((array) => {
    return array.sort(() => Math.random() - 0.5);
  },[]);

  const [questionArr, setQuestionArr] = useState(scrambleArray([...data]));

  console.log(data);
  console.log(questionArr);

  useEffect(() => {
    const pauseTimer = setTimeout(() => {
      if(answer) {
        //code here to move to next question
        moveToNextQuestion();
      }
    }, 2000);
    return () => clearTimeout(pauseTimer);
  },[answer]);


  const handleAnswerCheck = (option) => {
    console.log("selected answer :", option);
    setAnswer(option);
    setDisplayAnswer(true);
    if(option === questionArr[question].correctAnswer) {
      setScore((prev) => prev + 1);
      console.log("Score is : ", score)
    } else {
      setIncorrectAnswer((prev) => [...prev, questionArr[question]]);
      console.log("incorrectly answered questions : ", incorrectanswer);
    }
  };


  const moveToNextQuestion = () => {
    setDisplayAnswer(false);
    setAnswer(null);
    if(question < questionArr.length ) {
      setQuestion((prev) => prev + 1);
    } else {
      alert("Quiz Completed");
    }
  }


  const resetQuiz = () => {
    setQuestionArr(scrambleArray([...data]));
    setQuestion(0);
    setScore(0);
    setAnswer(null);
    setDisplayAnswer(false);
    setIncorrectAnswer([]);
  }


  return (
    <div className='quizApp'>
      <h1>Quiz Application</h1>
      <p className='score'>Quiz score : {score}</p>
      <main>
        {question < questionArr.length && <h3 className='question-heading'>Question {question + 1} of 10.</h3>}
  
        {question < questionArr.length ? (
          <div>
            {/* <h2>Index is :{question} --- {questionArr.length-1}</h2> */}
            <h4 className='question'>{questionArr[question].question}</h4>
            <div className='alloption-section'>
              {questionArr[question].options.map((option) => (
                <button className="btn" key={option} onClick={() => {handleAnswerCheck(option)}} disabled={displayAnswer}>
                  {option}
                </button>
              ))}
            </div>
            {displayAnswer && (
              <h3 className='answer'>Correct Answer : {questionArr[question].correctAnswer}</h3>
            )}
          </div> 
        ) : (
          <section className='result-section'>
            <h2>Quiz Completed</h2>
            <p className='result-text'>{incorrectanswer.length === 0 ? "Congratulations your all answers are correct " : "Answers which are incorrectly answered"}</p>
            <ul className='incorrect-container'>
              {incorrectanswer.map((question, index) => (
                <li className='incorrect-answers' key={index}>{question.question} -- Correct Answer : {question.correctAnswer}</li>
              ))}
            </ul>
            <button className='reset' onClick={resetQuiz}>Reset Quiz</button>
          </section>
        ) 
        }
      </main>
    </div>
  );
};

export default App
