import React from 'react';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Form from 'components/Appointment/Form';
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import useVisualMode from 'hooks/useVisualMode';
import Error from 'components/Appointment/Error';
import './styles.scss';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"; 
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_DELETE = "ERROR_DELETE";
const EDIT = "EDIT";



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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={() => {
        transition(DELETING);
        props.cancelInterview(props.id)
          .then(() => transition(EMPTY))
          .catch(error => transition(ERROR_DELETE, true));
      }} onCancel={() => back()} />}

      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back()} />}
      {mode === EDIT && (
        <Form 
          name={props.interview.student} 
          interviewer={props.interview.interviewer.id} 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={() => back()} 
        />
      )}

    </article>

  );
}
