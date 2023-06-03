import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import useVisualMode from 'hooks/useVisualMode';

import './styles.scss';

import Status from 'components/Appointment/Status'; // Import Status component at the top

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; 

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING); // Transition to SAVING mode before saving
    props.bookInterview(props.id, interview) // Call bookInterview function with the appointment ID and the interview object
      .then(() => transition(SHOW)); // Transition to SHOW mode after saving
  };

  return (
    <article className='appointment' data-testid='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => console.log('confirm')}
          onEdit={() => console.log('edit')}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
      {mode === SAVING && <Status message="Saving" />} // Add new case for SAVING mode
    </article>
  );
}
