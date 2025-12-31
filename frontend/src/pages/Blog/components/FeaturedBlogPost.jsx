import React from "react";
import { Link } from "react-router-dom";

const FeaturedBlogPost = ({
  title,
  coverImageUrl,
  description,
  tags = [],
  updatedOn,
  authorName,
  authProfileImg,
  postSlug,
}) => {
  return (
    <>
      <div className="grid grid-cols-12 bg-white shadow-lg shadow-gray-200 rounded-xl overflow-hidden cursor-pointer">
        <div className="col-span-6">
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="col-span-6">
          <div className="p-6">
            <Link to={`/${postSlug}`}>
              <h2 className="text-lg md:text-2xl font-bold mb-2 line-clamp-3">
                {title}
              </h2>
            </Link>

            <Link to={`/${postSlug}`}>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {description}
              </p>
            </Link>

            <div className="flex items-center flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <Link
                  key={index}
                  to={`/tag/${tag}`}
                  className="bg-sky-200/50 text-sky-800/80 text-xs font-medium px-3 py-0.5 rounded-full text-nowrap"
                >
                  # {tag}
                </Link>
              ))}
            </div>

            <div className="flex items-center">
              <img
                src={authProfileImg}
                alt={authorName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="text-gray-600 text-sm">{authorName}</p>
                <p className="text-gray-500 text-xs">{updatedOn}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBlogPost;
