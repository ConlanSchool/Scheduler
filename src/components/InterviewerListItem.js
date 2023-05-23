import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { interviewer, selected, setInterviewer } = props;

  const interviewerItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerItemClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}

