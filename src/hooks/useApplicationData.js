import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      const [daysRes, appointmentsRes, interviewersRes] = all;
      setState(prev => ({
        ...prev,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data,
      }));
    }).catch(error => console.log(error));
  }, []);

  const updateSpots = function(dayName, days, appointments) {
    const day = days.find(d => d.name === dayName);
  
    const spots = day.appointments
      .filter(id => appointments[id].interview === null)
      .length;
  
    const newDay = { ...day, spots };
    const newDays = days.map(d => d.name === dayName ? newDay : d);
  
    return newDays;
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(state.day, state.days, appointments);

      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      const days = updateSpots(state.day, state.days, appointments);

      setState({
        ...state,
        appointments,
        days
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
