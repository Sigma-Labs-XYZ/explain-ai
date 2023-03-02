import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../utils/networking";
import Breadcrumbs from "./Breadcrumbs";
import TopicCard from "./TopicCard";
import ErrorMessage from "./ErrorMessage";

export default function TopicPage() {
  const { topic } = useParams();
  const [retrievedTopics, setRetrievedTopics] = useState();
  const [audience, setAudience] = useState();
  const MAIN_URL = `http://${process.env.REACT_APP_API_ENDPOINT}/topic/${topic}`;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedAge = localStorage.getItem("age");
    if (storedAge) {
      setAudience(parseInt(localStorage.getItem("age"), 10));
    } else {
      localStorage.setItem("age", 5);
      setAudience(5);
    }
  }, [audience]);
  useEffect(() => {
    const doFetch = async () => {
      const fetchedData = await fetchData(MAIN_URL);
      setRetrievedTopics(fetchedData);
      setIsLoading(false);
    };
    doFetch();
  }, [MAIN_URL]);

  if (isLoading) return <div>Loading...</div>;
  const topicData = retrievedTopics?.topic?.[0];
  if (topicData) {
    return (
      <>
        <Breadcrumbs
          parent={topicData.parent.parent}
          grandParent={topicData.parent.parent.grandparent.grandparent}
        />
        <TopicCard topic={topicData} audience={audience} />
      </>
    );
  }
  return <ErrorMessage message={`Failed to find "${topic} ;_; `} />;
}
