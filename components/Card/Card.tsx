import React, { useState } from "react";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  overview: string;
  id: string;
}

const Card = ({ title, image, overview, id }: CardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Link className="h-80 w-72 rounded-lg" href={`/movies/${id}`}>
      <div className=" px-2 py-2">
        <img
          className="rounded-2xl w-72 h-72"
          width={300}
          height={200}
          src={`https://image.tmdb.org/t/p/original/${image}`}
          alt=""
        />
      </div>
      <h1 className="font-bold text-gray-300 overview-[1.25rem] flex justify-center">
        {title}
      </h1>
      <div className="px-2">
        <p
          className={`line-clamp-1 text-white ${
            expanded ? "line-clamp-none" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: overview }}
        ></p>
        {!expanded && (
          <a
            className="overview-blue-500 font-semibold hover:underline cursor-pointer"
            onClick={toggleExpanded}
          >
            Read More
          </a>
        )}
      </div>
    </Link>
  );
};

export default Card;
