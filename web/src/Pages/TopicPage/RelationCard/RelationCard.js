import React from "react";
import { Link } from "react-router-dom";
import PropType from "prop-types";
import { sendRelationEvent, sendClickEvent } from "../../../utils/gaEvents";
import { replaceImage } from "../../../components/ErrorMessage";

function RelationCard({ name, description, image, parent, loading }) {
  return (
    <Link
      to={`/${name.toLowerCase()}`}
      title={`link to ${name.toLowerCase()}`}
      onClick={() => {
        loading();
        sendRelationEvent(parent, name);
        sendClickEvent("RelationCard", name);
      }}
    >
      <div
        className="flex items-center ml-5 phone:mr-0 phone:ml-0 superWideDesktop:mr-[15%]"
        data-testid="link-div-rtl"
        data-test-id="link-div"
      >
        <div className="text-left bg-white border-transparent mb-3 p-3 pl-10 flex items-center w-full phone:ml-0 phone:pr-0 superWideDesktop:ml-[15%]">
          <div className="pr-24 phone:mr-10">
            <h3 className="font-bold text-black mb-0 mt-4">{name}</h3>
            <p className="mt-2">{description}</p>
          </div>
        </div>
        <div
          className="mr-5 -ml-12 mb-[0.8%] phone:-ml-32 phone:mr-8 "
          data-test-id="img container"
        >
          <div className="w-24 h-24">
            <img
              className="rounded-full object-cover h-full w-full"
              src={image}
              alt={name}
              onError={replaceImage}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

RelationCard.propTypes = {
  name: PropType.string.isRequired,
  description: PropType.string.isRequired,
  image: PropType.string.isRequired,
};

export default RelationCard;
