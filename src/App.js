import React, { useState } from "react";
import Quiz from "./components/Quiz";
export default function App() {
	let [starting, setStarting] = React.useState(false);
	let [amount, setAmount] = useState({ value: "5", validity: true });
	let buttonStyle = amount.validity
		? { pointerEvents: "auto", opacity: "1" }
		: { pointerEvents: "none", opacity: "0.3" };
	let questionNoun = amount.value > 1 ? "questions." : "question.";
	return (
		<main>
			{!starting && (
				<div className="start-page">
					<h1 className="karla">Quizzical</h1>
					<h2 className="inter">quiz for nerds</h2>
					<form>
						<label id="amount" className="inter">
							I would like to try{" "}
							<input
								type="number"
								min="5"
								max="20"
								maxLength="2"
								name="amount"
								htmlFor="amount"
								className="form-control"
								value={amount.value}
								onChange={(e) => {
									setAmount((prevObj) => ({
										...prevObj,
										value:
											e.target.value.indexOf("0") === 0
												? e.target.value.slice(0, e.target.value.length - 1)
												: e.target.value,
										validity: e.target.value >= 5 && e.target.validity.valid,
									}));
								}}
								required={true}
							></input>{" "}
							{questionNoun}{" "}
							<span className="input-constraint-info">
								Choose between 5 and 20.
							</span>
						</label>

						<button
							style={buttonStyle}
							className="inter btn btn-accent btn-lg"
							onClick={(e) => {
								e.preventDefault();
								setStarting(true);
							}}
							type="button"
						>
							{" "}
							Start quiz
						</button>
					</form>
				</div>
			)}
			{starting && <Quiz setStarting={setStarting} amount={amount.value} />}
		</main>
	);
}
