import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { Input } from "./Input";
import { LuLoaderCircle } from "react-icons/lu";

export const GenerateBlogPostForm = ({
  contentParams,
  setPostContent,
  handleCloseForm,
}) => {
  const [formData, setFormData] = useState({
    title: contentParams?.title || "",
    tone: contentParams?.tone || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleGenerateBlogPost = async (e) => {
    e.preventDefault();

    const { title, tone } = formData;

    if (!title || !tone) {
      setError("Please fill all the required fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_BLOG_POST,
        { title, tone }
      );

      const generatedPost = aiResponse.data;
      setPostContent(title, generatedPost?.rawText ?? generatedPost ?? "");
      handleCloseForm();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">
          Generate a Blog Post
        </h3>

        <p className="text-base text-slate-700 mt-1.5 mb-3">
          Provide a title and tone to generate your blog post
        </p>

        <form onSubmit={handleGenerateBlogPost} className="flex flex-col gap-3">
          <Input
            label={"Blog Post Title"}
            placeholder={""}
            onChange={({ target }) => handleChange("title", target.value)}
            type={"text"}
            value={formData.title}
          />

          <Input
            label={"Tone"}
            placeholder={"Beginner Friendly, Technical, Casual, Etc."}
            onChange={({ target }) => handleChange("tone", target.value)}
            type={"text"}
            value={formData.tone}
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            className="btn-primary w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <LuLoaderCircle className="animate-spin text-lg" />}{" "}
            {isLoading ? "Generating..." : "Generate Post"}
          </button>
        </form>
      </div>
    </>
  );
};

// 4:35:48
