import React from 'react';

const AppointmentStatus = (props) => {
  const { statusMessage } = props;

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{statusMessage}</h1>
    </main>
  );
};

export default AppointmentStatus;
