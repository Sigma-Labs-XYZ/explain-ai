import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchData } from "../utils/networking";

export default function TopicPage() {
  const { topic } = useParams();
  const [retrievedTopics, setRetrievedTopics] = useState();
  const MAIN_URL = `http://localhost:4000/topic/${topic}`;

  useEffect(() => {
    (async function () {
      setRetrievedTopics(await fetchData(MAIN_URL));
    })();
  }, []);

  return (
    <div>
      <h1>{topic}</h1>
      {retrievedTopics && (
        <p data-testid="jsondat">{JSON.stringify(retrievedTopics)}</p>
      )}

      {/* Test has specifically been created for testing purposes */}
      <p style={{ visibility: "hidden" }}>Test: {topic}</p>
    </div>
  );
}