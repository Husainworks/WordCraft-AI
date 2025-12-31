import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { PostCard } from "./PostCard";

const TrendingPostsSection = () => {
  const [postList, setPostList] = useState([]);

  const getTrendingPosts = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POSTS.GET_TRENDING_POSTS
      );

      setPostList(response.data?.posts?.length > 0 ? response.data.posts : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTrendingPosts();
  }, []);

  return (
    <>
      <div className="sticky top-26 bg-white shadow-lg shadow-gray-200 p-3 rounded-sm">
        <h4 className="text-2xl text-black font-semibold mb-3">Recent Posts</h4>

        {postList.length > 0 &&
          postList.map((item) => (
            <PostCard
              key={item._id}
              title={item.title}
              coverImageUrl={item.coverImageUrl}
              tags={item.tags}
              postSlug={item.slug}
            />
          ))}
      </div>
    </>
  );
};

export default TrendingPostsSection;
