import React from "react";
import { Link } from "react-router-dom";

export const PostCard = ({ title, coverImageUrl, tags = [], postSlug }) => {
  return (
    <Link to={`/${postSlug}`} className="block cursor-pointer mb-3">
      <h6 className="text-xs font-semibold text-sky-500">
        {tags[0]?.toUpperCase() || "BLOG"}
      </h6>

      <div className="flex items-start gap-4 mt-2">
        <img
          src={coverImageUrl}
          alt={title}
          className="w-14 h-14 object-cover rounded"
        />

        <h2 className="text-sm md:text-base font-medium mb-2 line-clamp-3">
          {title}
        </h2>
      </div>
    </Link>
  );
};
