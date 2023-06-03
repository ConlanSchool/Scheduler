import { getAppointmentsForDay } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};

test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});


describe("getInterviewersForDay", () => {
  it("returns an array", () => {
    const result = getInterviewersForDay(state, "Monday");
    expect(Array.isArray(result)).toBe(true);
  });

  it("returns an array with a length matching the number of interviewers for that day", () => {
    const result = getInterviewersForDay(state, "Monday");
    expect(result.length).toEqual(3);
  });

  it("returns an array containing the correct interviewers objects", () => {
    const [first, second] = getInterviewersForDay(state, "Monday");
    expect(first).toEqual(state.interviewers["1"]);
    expect(second).toEqual(state.interviewers["2"]);
  });

  it("returns an empty array when the day is not found", () => {
    const result = getInterviewersForDay(state, "Wednesday");
    expect(result.length).toEqual(0);
  });

  it("returns an empty array when the days data is empty", () => {
    const result = getInterviewersForDay({ days: [] }, "Monday");
    expect(result.length).toEqual(0);
  });

  it("returns an empty array when the interviewers data is empty", () => {
    const result = getInterviewersForDay({ days: [state.days[0]], interviewers: {} }, "Monday");
    expect(result.length).toEqual(0);
  });
});
