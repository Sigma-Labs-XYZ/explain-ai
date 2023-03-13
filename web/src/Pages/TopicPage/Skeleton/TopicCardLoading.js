import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopicCardLoading() {
  return (
    <div className="topic-card-parent">
      <div className="topic-card">
        <div className="topic-card-title">
          <h1 data-testid="skeleton">
            <Skeleton height={50} width={200} className="m-[20px]" />
          </h1>
        </div>
        <div className="topic-card-description">
          <p className="topic-desc" data-testid="skeleton">
            <Skeleton count={3} />
          </p>
        </div>

        <div className="topic-card-img-btn">
          {/* <Skeleton height={50} width={300} className="translate-x-[13%] translate-y-[75%]" /> */}
          <button type="button" data-testid="skeleton">
            Tell me more
          </button>
          <div data-testid="skeleton">
            <Skeleton circle height={200} width={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
