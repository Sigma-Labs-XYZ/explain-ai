/* eslint-disable react/self-closing-comp */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { React } from "react";
import { Link } from "react-router-dom";
import "../../../Styling/TopicBreadcrumbs/TopicBreadcrumbs.css";

function BreadcrumbLoading() {
  return (
    <div className="bg-backdrop h-[65px]">
      <nav id="desktop" className="desktop">
        <span className="desktop-container" data-test-id="skeleton">
          <Link>Loading...</Link>
          <span data-test-id="skeleton" className="font-thin">
            {"  > "}
          </span>
          <Link>Loading...</Link>
          <span data-testid="desktop-parent" className="font-thin">
            {"  > "}
          </span>
        </span>
      </nav>

      <div id="mobile" data-testid="mobile">
        <Link>
          <button type="button" className="mobile-parent-btn">
            <span className="ml-7">
              Loading...
              {/* {"  > "} */}
            </span>
          </button>
        </Link>

        <Link data-testid="mobile-parent">
          <button type="button" className="mobile-grandParent-btn">
            <span className="ml-7">
              Loading...
              {/* {"  > "} */}
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BreadcrumbLoading;
