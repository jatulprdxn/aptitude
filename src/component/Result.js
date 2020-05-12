import React from 'react'
import styled from 'styled-components';
import {
  Link
} from "react-router-dom";
function Results(props) {

	const { questionAttends, score, questionBank } = props.location.state;
	let per = ((score/questionBank.length) * 100).toFixed(2);
	const obj = [
		{
		text: "Total number of questions",
		count:questionBank && questionBank.length
	 },
	 {
		text: "Number of attempted questions",
		count: questionAttends && questionAttends.length
	 },
	 {
		 text: "Number of correct answer",
		 count: score
	 },
	 {
		 text: "Number of wrong answer",
		 count: questionBank && questionBank.length - score
	 }
]
	return (
			<ResultContainer>
				<Title>Result</Title>
	      <ScorePercentage>Your Score {per}%</ScorePercentage>
				<TotalQuestion>
					{
						obj.map( item => {
							return (
								<ResultDetail>
									<Text>{item.text}</Text>
									<Count>{item.count}</Count>
								</ResultDetail>
							)
						})
					}
				</TotalQuestion>
				<QuestionPageContainer>
				  <QuestionPage to='/'>Back to question page</QuestionPage>
				</QuestionPageContainer>
			</ResultContainer>
	)
}

export default Results;

const ResultContainer = styled.div`
  width: 80%;
	height: 400px;
	background-color:#E8E8E8	;
	margin:0 auto;
`;

const Title = styled.h3`
	font-size: 30px;
	text-align: center;
	padding-top:20px;
`;

const TotalQuestion = styled.ul`
	padding: 0;
`;

const ResultDetail = styled.li`
	margin:0 20px 15px;
	display: flex;
	justify-content: space-between;
`;

const Text = styled.span`
	font-size: 22px;
`;

const Count = styled.span`
	font-size: 22px;
`;

const ScorePercentage = styled.h1`
	text-align:center;
	color:#00BFFF;
	font-size:50px;
`;

const QuestionPage = styled(Link)`
  width:20%;
	margin:0 auto;
  display:block;
	padding:12px 0 12px;
	text-decoration:none;
	font-size:20px;
	text-align:center;
	border:2px solid #0000FF;	
	&:hover {
		background-color:#0000FF;
		color:#fff;
	}
`;

const QuestionPageContainer = styled.div`
	
`;

