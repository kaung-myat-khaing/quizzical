import React from "react";
import Answer from "./Answer";
export default function AnswerContainer(props) {
	function styleChosenAns(event) {
		event.stopPropagation();
		let answers = document.querySelectorAll(
			`.quiz-${props.quizId}-answers > *`
		);
		answers.forEach((answer) => answer.classList.remove("clicked"));
		if (
			event.target !== document.querySelector(`.quiz-${props.quizId}-answers`)
		) {
			event.target.classList.add("clicked");
		}
	}
	function chooseAns(answer, ind) {
		props.setUserAnswers((prevObj) => {
			return {
				...prevObj,
				[props.quizId]: {
					ansId: ind,
					ans: answer,
				},
			};
		});
	}

	let userChoices = Object.values(props.userAnswers).map((el) => el.ans);
	let ansElements = props.answers.map((answer, ind) => {
		let ansStyle = {};

		// STYLE THE CLICKED ANSWER BASED ON CORRETNESS
		if (props.checkedAns) {
			if (userChoices.includes(answer)) {
				if (answer === props.correctAnswer) {
					ansStyle = {
						backgroundColor: "#94D7A2",
						border: "transparent",
					};
				} else {
					ansStyle = {
						backgroundColor: "#F8BCBC",
						border: "transparent",
						opacity: "0.4",
					};
				}
			}
			if (answer === props.correctAnswer) {
				ansStyle = {
					backgroundColor: "#94D7A2",
					border: "transparent",
				};
			}
			if (answer !== props.correctAnswer && !userChoices.includes(answer)) {
				ansStyle = {
					opacity: "0.4",
				};
			}
		}
		return (
			<Answer
				key={ind}
				answer={answer}
				ansStyle={ansStyle}
				id={ind}
				handleOnClick={() => chooseAns(answer, ind)}
			/>
		);
	});
	return (
		<>
			<div
				className={`quiz-${props.quizId}-answers`}
				onClick={styleChosenAns}
				style={props.ansContainerStyle}
			>
				{ansElements}
			</div>
		</>
	);
}
