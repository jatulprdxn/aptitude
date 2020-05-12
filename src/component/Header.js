import React from 'react'
import styled from 'styled-components';

const  Headers = (props) => {
	const {questionBank, answred, minutes,seconds} = props;
	
	return (
		<Header>
			<Total>{answred+1}/{questionBank.length}</Total>
			<Timer>
		
			{ minutes === 0 && seconds === 0
				? <span>Busted!</span>
				: <span> 	 Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
      }
			</Timer>
		</Header>
	)
}

export default Headers;


const Header = styled.div`
  display:flex;
  justify-content:space-between;
	margin:20px;
`;

const Total = styled.span`
  
`;

const Timer = styled.div`
`