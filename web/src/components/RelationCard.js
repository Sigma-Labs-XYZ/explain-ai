import "../components/RelationCard.scss";
import daddy from "./daddy.png";

export default function RelationCard({ name, description }) {
  return (
    <div className="text-left bg-white m-5 p-2 flex">
      <div>
        <h2 className="text-2xl font-bold ">{name}</h2>
        <p className="">{description}</p>
      </div>
      <div className="object-right">
        <img className="w-20 h-20  rounded-tl" src={daddy} alt="daddy" />
      </div>
    </div>
  );
}
