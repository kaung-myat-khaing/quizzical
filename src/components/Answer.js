import React from "react";
export default function Answer(props) {
	return (
		<div
			id={props.id}
			dangerouslySetInnerHTML={{ __html: props.answer }}
			style={props.ansStyle}
			onClick={props.handleOnClick}
			className="inter"
		></div>
	);
}
