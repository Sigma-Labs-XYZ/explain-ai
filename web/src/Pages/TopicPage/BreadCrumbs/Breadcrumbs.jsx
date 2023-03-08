/* eslint-disable react/button-has-type */
import { Link } from "react-router-dom";
import { React } from "react";
import "../../../Styling/TopicBreadcrumbs/TopicBreadcrumbs.css";

export default function Breadcrumbs({ grandParent, parent }) {
  return (
    <div className="bg-backdrop h-[65px]">
      <nav data-testid="desktop" id="desktop" className="desktop">
        <span className="desktop-container">
          <Link to={`/${grandParent.slug}`}>{grandParent.name}</Link>
          <span data-testid="desktop-grandParent" className="font-thin">
            {" > "}
          </span>
          <Link to={`/${parent.slug}`}>{parent.name}</Link>
          <span data-testid="desktop-parent" className="font-thin">
            {" > "}
          </span>
        </span>
      </nav>
      <div id="mobile" data-testid="mobile">
        <Link data-testid="mobile-grandParent" to={`/${grandParent.slug}`}>
          <button className="mobile-parent-btn">
            <span className="ml-7">
              {" "}
              {grandParent.name}
              {"  > "}{" "}
            </span>
          </button>
        </Link>

        <Link data-testid="mobile-parent" to={`/${parent.slug}`}>
          <button className="mobile-grandParent-btn">
            <span className="ml-7">
              {" "}
              {parent.name}
              {"  > "}{" "}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
