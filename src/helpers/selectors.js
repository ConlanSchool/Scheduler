export function getAppointmentsForDay(state, day) {
  // Find the day object in state.days
  const dayObj = state.days.find(d => d.name === day);
  
  // If the day object doesn't exist return an empty array
  if (!dayObj) {
    return [];
  }
  
  // Map the appointment ids to the appointment objects in state.appointments
  const appointments = dayObj.appointments.map(id => state.appointments[id.toString()]);

  // Return the array of appointments
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];
  return {
    ...interview,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);
  
  
  if (!dayObj || !dayObj.interviewers || Object.keys(state.interviewers).length === 0) {
    return [];
  }
  
  const interviewers = dayObj.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}
export function getSpotsForDay(state, day) {
  const dayObj = state.days.find(d => d.name === day);

  if (!dayObj) {
    return 0;
  }

  const appointments = dayObj.appointments.map(id => state.appointments[id]);
  const spots = appointments.filter(appointment => !appointment.interview).length;

  return spots;
}
