import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Generating from "./Generating";
import TestingData from "./TestingData.json";

beforeEach(() => {
  fetchMock.enableMocks();
  fetch.resetMocks();
});

const computing = "computing";

describe("Rendering Topic Page", () => {
  test("Testing if generating is present when generating is set to true", () => {
    fetch.mockResponseOnce(JSON.stringify(TestingData));

    render(
      <BrowserRouter>
        <Generating topic={computing} />
      </BrowserRouter>,
    );

    const generating = screen.queryAllByTestId("generating");
    generating.forEach((generated) => {
      expect(generated).toBeInTheDocument();
    });
  });
});
