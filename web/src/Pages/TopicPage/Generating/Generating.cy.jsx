import React from "react";
import { BrowserRouter } from "react-router-dom";
import Generating from "./Generating";
import "../../../Styling/Generating/generatingPage.css";
import dimensions from "../../../Tests/dimensions";

const computing = "computing";

describe("<Generating />", () => {
  it("renders", () => {
    cy.mount(
      <BrowserRouter>
        <Generating topic={computing} />,
      </BrowserRouter>,
    );
  });

  Object.values(dimensions).forEach((device) => {
    it(`Generating is present in viewport resolution ${device.viewportWidth} x ${device.viewportLength}`, () => {
      cy.mount(
        <BrowserRouter>
          <Generating topic={computing} />,
        </BrowserRouter>,
      );
      cy.viewport(device.viewportWidth, device.viewportLength);
      cy.get("[data-testid=generating]").should("be.visible");
    });
  });
});
