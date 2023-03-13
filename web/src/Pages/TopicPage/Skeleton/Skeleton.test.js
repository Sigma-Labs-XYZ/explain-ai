import { render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AudienceContext from "../../../components/AudienceContext";
import TopicPage from "../TopicPage";
import TestingData from "./TestingData.json";

beforeEach(() => {
  fetchMock.enableMocks();
  fetch.resetMocks();
});

describe("Rendering Topic Page", () => {
  test("Testing if Skeleton is present when loading is set to true", () => {
    fetch.mockResponseOnce(JSON.stringify(TestingData));

    render(
      <AudienceContext>
        <TopicPage />
      </AudienceContext>,
      {
        wrapper: BrowserRouter,
      },
    );

    const skeletons = screen.queryAllByTestId("skeleton");
    skeletons.forEach((skeleton) => {
      expect(skeleton).toBeInTheDocument();
    });
  });
});
