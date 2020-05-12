import React from 'react';
import styled from 'styled-components';

const QuestionsBox = ({question,options,selected,questionAttends}) => {
	return (
		<OptionContainer>
			<Option>{question}</Option>
			{
				options.map((text,index) => (
					<OptionButton 
						key={index} 
						className="ansbtn" 
						onClick={() => {
							selected(text);	
							}}
							questionAttends={ questionAttends.includes(text) }
							>
						{text}
					</OptionButton>
      	))
			}
		</OptionContainer>
	)
}

export default QuestionsBox;

const OptionContainer = styled.div`
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-top: 5px;
  padding: 15px;
  box-sizing: border-box;
  background-color: rgb(250, 250, 250);
`;

const OptionButton = styled.button`
  position: relative;
  padding: 10px;
  background-color: #87CEEB;
  display: inline-block;
  margin: 30px 20px;
  outline: none;
  border: none;
  font-size: 1em;
  color: rgb(255, 255, 255);
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
	background-color:${ props => props.questionAttends ? "#00008B" : "#1E90FF" }
`
;

const Option = styled.span`
	display:block;
	font-size:25px;
	margin:0 auto;
`;
