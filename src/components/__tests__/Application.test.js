import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import axios from 'axios';
import Application from "components/Application";

jest.mock('axios');

afterEach(cleanup);

describe("Application", () => {
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, "Confirm"));
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce(new Error("Failed to save appointment"));
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByAltText(container, "Add"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment =>
      queryByText(appointment, "12pm")
    );
  
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
  
    fireEvent.click(getByAltText(appointment, "Close"));
  
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
  });
  
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce(new Error("Failed to delete appointment"));
    const { container, debug } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment =>
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Delete"));
  
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
  
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    expect(getByAltText(appointment, "Loading")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
  
    fireEvent.click(getByAltText(appointment, "Close"));
  
    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
  
});
