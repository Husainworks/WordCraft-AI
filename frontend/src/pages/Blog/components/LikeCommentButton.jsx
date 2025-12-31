import React, { useState } from "react";
import { LuMessageCircleDashed } from "react-icons/lu";
import { PiHandsClapping } from "react-icons/pi";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import clsx from "clsx";

export const LikeCommentButton = ({
  postId,
  likes,
  comments,
  hasUserLiked = false,
}) => {
  const [postLikes, setPostLikes] = useState(likes || 0);
  const [liked, setLiked] = useState(hasUserLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeClick = async () => {
    if (!postId || isLoading) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.POSTS.LIKE(postId));

      if (response.data) {
        setPostLikes(response.data.totalLikes);
        setLiked(response.data.liked);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="fixed bottom-8 right-8 px-6 py-3 bg-black text-white rounded-full shadow-lg flex items-center justify-center">
        <button
          className="flex items-end gap-2 cursor-pointer"
          onClick={handleLikeClick}
          disabled={isLoading}
        >
          <PiHandsClapping
            className={clsx(
              "text-[22px] transition-transform duration-300",
              liked ? "scale-110 text-cyan-500" : "scale-100 text-white",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          />
          <span className="text-base font-medium leading-4">{postLikes}</span>
        </button>

        <div className="h-6 w-px bg-gray-500 mx-5"></div>

        <button className="flex items-end gap-2 cursor-pointer">
          <LuMessageCircleDashed className="text-[22px]" />
          <span className="text-base font-medium leading-4">{comments}</span>
        </button>
      </div>
    </div>
  );
};
