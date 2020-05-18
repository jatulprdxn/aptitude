import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import axios from 'axios';
import QuestionsBox from './component/QuestionsBox';
import Headers from './component/Header';

class Quiz extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionBank:[],
      question:[],
      currentIndex:0,
      score:0,
      questionAttends:[{answer: "", questionId: ""}],
      minutes:30,
      seconds:0,
      count:0
    };
    this.interval = null;
  }

  componentDidMount() {
    this.getData();
    
  }

  getData = async () => {
    const response = await axios.get('./data.json')
    let question = [response.data[this.state.currentIndex]];
    
    this.setState({
      questionBank:response.data,
      question
    });
  }

  currentQuestion = (text) => {
    const { questionBank,currentIndex } = this.state;
  
    let question = [];
    let questionIndex = ''

    if(text === "next") {
      questionIndex = (currentIndex >= questionBank.length-1) ? currentIndex : currentIndex + 1;
     question = [questionBank[questionIndex]] 
    } else {
      questionIndex = currentIndex < 1 ? currentIndex : currentIndex - 1;
      question = [questionBank[questionIndex]] 
    }
    
    this.setState({
      question,
      currentIndex:questionIndex,
    })  
  }

  computeScore = (answer,correctAnswer,questionId) => {
    
    let questionAttends = this.state.questionAttends;
    
    questionAttends = questionAttends.filter((item,index) => item.questionId !== questionId);
    questionAttends.push({"answer":answer,"questionId":questionId});

    this.setState({
      questionAttends,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();  

    this.props.history.push(
      {
        pathname: '/result',
        state: { questionAttends: this.state.questionAttends,
        questionBank: this.state.questionBank 
      }
    });
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
          this.setState(({ seconds }) => ({
              seconds: seconds - 1
          }))
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(this.interval);
              this.handleSubmit();
          } else {
              this.setState(({ minutes }) => ({
                  minutes: minutes - 1,
                  seconds: 59
              }))
          }
      } 
  }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
}

  render() {
    const {  questionBank,minutes,seconds } = this.state;
    return (
      <Quizcontainer className="container">
        <Quiztitle className="title">Aptitude</Quiztitle>
          <QuestionContainer>
            {
            this.state.question.length && 
              this.state.question.map(({question, answers,correct,questionId},index) => {
            return (
              <>
                <Headers 
                  questionBank = {questionBank} 
                  minutes = {minutes} 
                  seconds={seconds}  
                  answred = {this.state.currentIndex } 
                />
                <QuestionsBox 
                  question={question} 
                  options={answers} 
                  queId={questionId} 
                  selected={(answer,key) => this.computeScore(answer,correct,key)}
                  questionAttends = {this.state.questionAttends}
                />
                <ButtonContainer>
                  {
                    this.state.currentIndex >= 1 && 
                    <PreviousButton onClick = {() => this.currentQuestion("prev")}>
                      Previous
                    </PreviousButton>
                  }
                  <NextButton onClick = {() => this.currentQuestion("next")}>
                    Next
                  </NextButton>
                </ButtonContainer>
                <Start>
                  <StartButton onClick={this.startTimer}>Start the aptitude</StartButton>
                </Start>  
                { questionBank.length-1 === this.state.currentIndex &&
                <SubmitButton onClick={(e) => this.handleSubmit(e)}>Submit</SubmitButton>
                }
              </> 
            )
            })}
          </QuestionContainer>
      </Quizcontainer>
    )
  }
}

export default Quiz;


const Quizcontainer = styled.div`
	position: absolute;
  width: 1024px;
  height: 700px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
  text-align:center;
`;

const Quiztitle = styled.h1`
  position: relative;
  background-color: rgba(0, 0, 0, 1);
  color: rgb(255, 255, 255);
  padding: 20px;
  font-size: 1.8em;
  border-radius: 5px;
`;

const QuestionContainer = styled.div``;

const ButtonStyledCSS = css`
  position: relative;
  padding: 10px;
  background-color: rgb(250, 151, 37);
  display: inline-block;
  margin: 10px;
  outline: none;
  border: none;
  font-size: 1em;
  color: rgb(255, 255, 255);
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonContainer = styled.div``;

const NextButton = styled.button`
  ${ButtonStyledCSS};
  background-color: #00BFFF	;
  margin-left:30px;

  &:hover {
    background-color:#87CEEB	;
  }
`;

const PreviousButton = styled.button`
   ${ButtonStyledCSS};
   background-color: #32CD32;
  &:hover {
    background-color: #ADFF2F;
  }
`;

const Start = styled.div`
  margin-top:50px;
`;

const StartButton = styled.button`
  ${ButtonStyledCSS};
  color:darkmagenta;
`;

const SubmitButton = styled.button`
  ${ButtonStyledCSS};
  color:darkmagenta;
  margin-top:50px;
`;