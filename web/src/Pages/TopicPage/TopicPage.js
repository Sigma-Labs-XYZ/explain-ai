import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchData, { postData } from "../../utils/networking";
import Breadcrumbs from "./BreadCrumbs/Breadcrumbs";
import TopicCard from "./TopicCard/TopicCard";
import ErrorMessage from "../../components/ErrorMessage";
import RelationCard from "./RelationCard/RelationCard";
import { ageContext } from "../../components/AudienceContext";
// eslint-disable-next-line
import { Helmet } from "react-helmet";
import { audienceChangeOnSubjectEvent } from "../../utils/gaEvents";

export default function TopicPage() {
  const { topic } = useParams();
  const [retrievedTopics, setRetrievedTopics] = useState();
  const { audience } = useContext(ageContext);
  const MAIN_URL = `${process.env.REACT_APP_API_ENDPOINT}/topic/${topic}`;
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const fetchedData = await fetchData(MAIN_URL);
      // Descriptions were found
      if (fetchedData.isGenerated) {
        setRetrievedTopics(fetchedData);
        return setIsLoading(false);
      }
      // Descriptions were not found, let's generate them
      setIsGenerating(true);
      const GENERATE_URL = `${process.env.REACT_APP_API_ENDPOINT}/topic`;
      const generatedData = await postData({ url: GENERATE_URL, body: { name: topic } });
      setRetrievedTopics(generatedData);
      setIsGenerating(false);
      return setIsLoading(false);
    };
    doFetch();
  }, [MAIN_URL]);

  useEffect(() => {
    audienceChangeOnSubjectEvent(topic, audience);
  }, [audience]);

  if (isGenerating) return <div style={{ textAlign: "center", marginTop: 200 }}>Generating...</div>;
  if (isLoading) return <div>Loading...</div>;
  const topicData = retrievedTopics?.topic?.[0];
  if (topicData?.descriptions.length) {
    return (
      <div className="mt-[80px] phone:mt-[70.5px]">
        <Helmet>
          <meta property="og:title" content="Topic" data-react-helmet="true" />
          <meta property="og:description" content="topic description" data-react-helmet="true" />
          <link
            rel="canonical"
            href="https://deploy-preview-118--explain-ai.netlify.app/javascript"
          />
        </Helmet>
        <Breadcrumbs
          parent={topicData.parent.parent}
          grandParent={topicData.parent.parent.grandparent.grandparent}
          current={topic}
        />
        <TopicCard topic={retrievedTopics.topic[0]} />

        <h2 className="text-left text-4xl ml-5 text-white font-extrabold mb-5 mt-28 superWideDesktop:ml-[14.5%]">
          Related
        </h2>
        {/* <h1 className="text-left text-white ml-5 mb-5 mt-16 superWideDesktop:ml-[15%]">Related</h1> */}
        {topicData.relationships &&
          topicData.relationships.map((rel) =>
            rel.audience === audience ? (
              <RelationCard
                key={rel.to.name}
                name={rel.to.name}
                description={rel.description}
                image={rel.to.image}
                parent={topic}
              />
            ) : null,
          )}
      </div>
    );
  }
  return <ErrorMessage message={`Failed to find "${topic} ;_; `} />;
}
