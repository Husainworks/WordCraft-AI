import React from "react";

export const BlogPostIdeaCard = ({
  title,
  description,
  tags,
  tone,
  onSelect,
}) => {
  return (
    <>
      <div
        onClick={onSelect}
        className="border-b border-gray-100 hover:bg-gray-100/60 px-5 py-5 cursor-pointer"
      >
        <h3 className="text-base text-black font-medium">
          {title}{" "}
          <span className="text-sm capitalize text-yellow-900 bg-yellow-100 px-2 py-0.5 rounded">
            {tone}
          </span>
        </h3>

        <p className="text-sm font-medium text-gray-600/70 mt-1">
          {description}
        </p>

        <div className="flex items-center gap-2.5 mt-2">
          {tags.map((tag, index) => (
            <div
              key={`tag_${index}`}
              className="text-sm text-sky-700 font-medium bg-sky-50 px-2.5 py-1 rounded "
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
