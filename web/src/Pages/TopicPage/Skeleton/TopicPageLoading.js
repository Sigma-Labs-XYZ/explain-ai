import React from "react";
import RelationCardLoading from "./RelationCardLoading";
import TopicCardLoading from "./TopicCardLoading";
import BreadCrumbLoading from "./BreadCrumbLoading";

export default function TopicPageLoading() {
  return (
    <div className="mt-[70px]">
      <BreadCrumbLoading />
      <TopicCardLoading />

      <h2 className="text-left text-3xl ml-5 text-white font-bold mb-5 mt-16 superWideDesktop:ml-[15%]">
        Related
      </h2>

      <RelationCardLoading />
      <RelationCardLoading />
      <RelationCardLoading />
    </div>
  );
}
