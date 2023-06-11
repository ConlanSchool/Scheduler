import { getAppointmentsForDay, getInterviewersForDay } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2, 3] // Add interviewers array to your days
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2, 3] // And here as well
    }
  ],
  appointments: {
    // ... your existing appointments data
  },
  interviewers: { // New interviewers data
    "1": { id: 1, name: "Interviewer 1", avatar: "image1.png" },
    "2": { id: 2, name: "Interviewer 2", avatar: "image2.png" },
    "3": { id: 3, name: "Interviewer 3", avatar: "image3.png" },
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
