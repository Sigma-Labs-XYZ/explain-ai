import React from "react";
import { BrowserRouter } from "react-router-dom";
import TopicPageLoading from "./TopicPageLoading";
import TopicPage from "../TopicPage";
import "../../../index.css";
import "../../../Styling/TopicCard/TopicCard.css";
import "../../../Styling/TopicBreadcrumbs/TopicBreadcrumbs.css";
import dimensions from "../../../Tests/dimensions";
import AudienceContext from "../../../components/AudienceContext";

describe("<TopicPageLoading />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <TopicPageLoading />
      </BrowserRouter>,
    );
  });

  Object.values(dimensions).forEach((device) => {
    it(`Skeleton is present in viewport resolution ${device.viewportWidth} x ${device.viewportLength}`, () => {
      cy.mount(
        <BrowserRouter>
          <TopicPageLoading />
        </BrowserRouter>,
      );
      cy.viewport(device.viewportWidth, device.viewportLength);
      cy.get("[data-testid=skeleton]").should("be.visible");
    });
  });
});

describe("Testing skeleton on Topic Page when data is not fetching, and error message appears afterwards", () => {
  it("Should display skeleton", () => {
    cy.mount(
      <BrowserRouter>
        <AudienceContext>
          <TopicPage />
        </AudienceContext>
      </BrowserRouter>,
    );
    cy.get("[data-testid=skeleton]").should("be.visible");
    cy.get("[data-testid=error-message]").should("be.visible");
  });
});
