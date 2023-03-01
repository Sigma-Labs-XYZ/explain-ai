import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";
import TopicPage from "../components/TopicPage";

beforeEach(() => {
  fetchMock.enableMocks();
  fetch.resetMocks();
});

describe("Test for API render on sucess", () => {
  test("Check that a fetch is made", async () => {
    fetch.mockResponseOnce(JSON.stringify({ test: "test" }));

    render(<TopicPage />);
    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.getByText('{"test":"test"}')).toBeInTheDocument();
    });
  });

  // created for testing unsuccessfull requests in the future
  test("a p tag is not created with json file upon an unsuccessful fetch", async () => {
    fetch.mockResponseOnce(JSON.stringify());
    render(<TopicPage />);
    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByTestId("jsondat")).not.toBeInTheDocument();
    });
  });
});