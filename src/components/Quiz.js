import React, { useEffect, useState } from "react";
//import array from "../testData"; //testing without fetching the data
import AnswerContainer from "./AnswerContainer";
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
	return array;
}

let ALL_ANSWERS = [];

export default function Quiz(props) {
	// let QUIZZES = array.results;
	let [QUIZZES, setQuizzes] = useState([]);
	let [ready, setReady] = useState(false);
	// console.log(`question amount: ${props.amount}`);
	useEffect(() => {
		fetch(`https://opentdb.com/api.php?amount=${props.amount}`)
			.then((res) => {
				if (res.ok) setReady((prev) => !prev);
				return res.json();
			})
			.then((data) => {
				setQuizzes(data.results);
				// console.log(`right after fetch quizzes: ${QUIZZES}`);//debugging code
			});
	}, []);
	// console.log(`outside the fetch quizzes: ${QUIZZES}`);//debugging code

	let [checkedAns, setCheckedAns] = React.useState(false);

	QUIZZES.forEach((quiz) => {
		let answers = shuffle([quiz.correct_answer, ...quiz.incorrect_answers]);
		ALL_ANSWERS.push(answers);
	});
	let [userAnswers, setUserAnswers] = React.useState({});
	let correctAnswers = QUIZZES.map((quiz, ind) => {
		return { ans: quiz.correct_answer, id: ind };
	});
	let [disableInteraction, setDisableInteraction] = React.useState(false);
	let ansContainerStyle = {
		pointerEvents: disableInteraction ? "none" : "auto",
	};
	let [correctAnsCount, setCorrectAnsCount] = React.useState(0);
	function checkAns() {
		let userChoices = Object.values(userAnswers).map((el) => {
			return el.ans;
		});
		// console.log(userAnswers); //debugging code
		// console.log(correctAnswers); //debugging code
		setDisableInteraction(true);
		correctAnswers.forEach((correctAnswer) => {
			if (userChoices.includes(correctAnswer.ans)) {
				setCorrectAnsCount((prevCount) => prevCount + 1);
			}
		});
		setCheckedAns(true);
	}

	let quizElements = QUIZZES.map((quiz, ind) => {
		let id = ind;
		let answers = ALL_ANSWERS[ind];
		return (
			<div className={`quiz-${id}-question`} key={id} id={id}>
				<h3
					className="karla"
					dangerouslySetInnerHTML={{ __html: quiz.question }}
				></h3>
				<AnswerContainer
					correctAnswer={correctAnswers[ind].ans}
					correctAnswers={correctAnswers}
					answers={answers}
					quizId={ind}
					ansContainerStyle={ansContainerStyle}
					setUserAnswers={setUserAnswers}
					checkedAns={checkedAns}
					userAnswers={userAnswers}
				/>
				<hr></hr>
			</div>
		);
	});
	let resultTemplate = (
		<div className="result inter">
			<h3 className="">
				You scored {correctAnsCount}/{QUIZZES.length} correct answers
			</h3>
			<button
				type="button"
				className="inter btn btn-accent btn-sm"
				onClick={() => {
					ALL_ANSWERS = []; //EMPTY ANSWER ARRAY FOR NEW GAME
					setReady(false);
					props.setStarting(false);
				}}
			>
				Play Again
			</button>
		</div>
	);
	let checkAnsBtn = (
		<button type="button" className="check-answer-btn inter" onClick={checkAns}>
			Check Answers
		</button>
	);
	let loadingTemplate = (
		<div className="inter loading">
			<span>Loading...</span>
		</div>
	);
	let template;
	if (!checkedAns && !ready) {
		template = loadingTemplate;
	}
	if (!checkedAns && ready) {
		template = checkAnsBtn;
	}
	if (checkedAns && ready) {
		template = resultTemplate;
	}
	return (
		<>
			{quizElements}
			{template}
		</>
	);
}
