import React from 'react';
import { render } from "@testing-library/react";
import Appointment from "../Appointment/index";


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });


  xit("does something it is supposed to do", () => {
    // ...
  });
  
  // or if using test
  test.skip("does something it is supposed to do", () => {
    // ...
  });
});