import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import fetchData, { postData } from "../../utils/networking";
import Breadcrumbs from "./BreadCrumbs/Breadcrumbs";
import TopicCard from "./TopicCard/TopicCard";
import ErrorMessage from "../../components/ErrorMessage";
import RelationCard from "./RelationCard/RelationCard";
import TopicPageLoading from "./Skeleton/TopicPageLoading";
import { ageContext } from "../../components/AudienceContext";
import { audienceChangeOnSubjectEvent } from "../../utils/gaEvents";

export default function TopicPage() {
  const { topic } = useParams();
  const [topicData, setTopicData] = useState();
  const { audience } = useContext(ageContext);
  const MAIN_URL = `${process.env.REACT_APP_API_ENDPOINT}/topic/${topic}`;
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const fetchedData = await fetchData(MAIN_URL);
      // Descriptions were found
      if (fetchedData.isGenerated) {
        const currentTopicData = fetchedData?.topic?.[0];
        setTopicData(currentTopicData);
        return setIsLoading(false);
      }
      // Descriptions were not found, let's generate them
      const data = fetchedData?.topic?.[0];
      setTopicData(data);
      setIsGenerating(true);
      const GENERATE_URL = `${process.env.REACT_APP_API_ENDPOINT}/topic`;
      const generatedData = await postData({ url: GENERATE_URL, body: { name: topic } });
      const currentTopicData = generatedData?.topic?.[0];
      setTopicData(currentTopicData);
      setIsGenerating(false);
      return setIsLoading(false);
    };
    doFetch();
  }, [MAIN_URL]);

  useEffect(() => {
    audienceChangeOnSubjectEvent(topic, audience);
  }, [audience]);

  function loading() {
    setIsLoading(true);
  }

  if (isGenerating)
    return <div style={{ textAlign: "center", marginTop: 200 }}>Generating... </div>;
  if (isLoading) return <TopicPageLoading />;

  if (topicData?.descriptions.length) {
    return (
      <div className="mt-[70px]">
        <Breadcrumbs
          parent={topicData.parent.parent}
          grandParent={topicData.parent.parent.grandparent.grandparent}
          current={topic}
        />
        <TopicCard topic={topicData} />

        <h2 className="text-left text-3xl ml-5 text-white font-bold mb-5 mt-16 superWideDesktop:ml-[14.5%]">
          Related
        </h2>
        {topicData.relationships &&
          topicData.relationships.map((rel) =>
            rel.audience === audience ? (
              <RelationCard
                key={rel.to.name}
                name={rel.to.name}
                description={rel.description}
                image={rel.to.image}
                parent={topic}
                // eslint-disable-next-line react/jsx-no-bind
                loading={loading}
              />
            ) : null,
          )}
      </div>
    );
  }
  return <ErrorMessage message={`Failed to find "${topic} ;_; `} />;
}
