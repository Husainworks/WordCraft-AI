import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { LuChevronDown, LuDot, LuReply, LuTrash2 } from "react-icons/lu";
import { UserContext } from "../../context/userContext";
import moment from "moment";
import { CommentReplyInput } from "../Inputs/CommentReplyInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const CommentInfoCard = ({
  commentId,
  authorName,
  authorPhoto,
  content,
  updatedOn,
  post,
  replies,
  getAllComments,
  onDelete,
  depth = 0,
  isForPost,
}) => {
  const { user } = useContext(UserContext);

  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showSubReplies, setShowSubReplies] = useState(false);

  const handleCancelReply = () => {
    setReplyText("");
    setShowReplyForm(false);
  };

  const handleAddReply = async () => {
    try {
      await axiosInstance.post(API_PATHS.COMMENTS.ADD(post._id), {
        content: replyText,
        parentComment: commentId,
      });

      toast.success("Reply added successfully");
      setReplyText("");
      setShowReplyForm(false);
      getAllComments();
    } catch (error) {
      console.error("Error adding reply: ", error);
    }
  };

  // CONFIG: indentation step and max total
  const STEP = 20; // px per level
  const MAX_TOTAL = 80; // max total indentation in px

  // total indentation intended for this depth (capped)
  const totalIndent = Math.min(depth * STEP, MAX_TOTAL);

  // total indentation of parent (depth-1)
  const parentTotalIndent = Math.min((depth - 1) * STEP, MAX_TOTAL);

  // apply only the incremental delta so values accumulate to the capped total
  const deltaIndent =
    depth === 0 ? 0 : Math.max(0, totalIndent - parentTotalIndent);

  return (
    <>
      <div
        className={`bg-white p-3 rounded-lg cursor-pointer group mb-3 transition-all duration-200`}
        style={{ marginLeft: `${deltaIndent}px` }}
      >
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-8 order-2 md:order-1">
            <div className="flex items-start gap-3">
              <img
                src={authorPhoto}
                alt={authorName}
                className="w-10 h-10 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h3 className="text-xs text-gray-500 font-medium">
                    @{authorName}
                  </h3>

                  <LuDot className="text-gray-500" />

                  <span className="text-xs text-gray-500 font-medium">
                    {updatedOn}
                  </span>
                </div>

                <p className="text-sm text-black font-medium">{content}</p>

                <div className="flex items-center gap-3 mt-1.5">
                  <button
                    className="flex items-center gap-2 text-sm font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                    onClick={() => setShowReplyForm((prevState) => !prevState)}
                  >
                    <LuReply /> Reply
                  </button>

                  {replies?.length > 0 && (
                    <button
                      className="flex items-center gap-1.5 text-sm font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-sky-500 hover:text-white cursor-pointer"
                      onClick={() =>
                        setShowSubReplies((prevState) => !prevState)
                      }
                    >
                      {replies.length}{" "}
                      {replies.length === 1 ? "reply" : "replies"}{" "}
                      <LuChevronDown
                        className={`${showSubReplies ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}

                  {!isForPost && (
                    <button
                      className="flex items-center gap-1.5 text-sm font-medium text-sky-950 bg-sky-50 px-4 py-0.5 rounded-full hover:bg-rose-500 hover:text-white cursor-pointer"
                      onClick={() => onDelete(commentId)}
                    >
                      <LuTrash2 /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {!isForPost && depth === 0 && (
            <div className="col-span-12 md:col-span-4 order-1 md:order-2 flex items-center gap-4">
              <img
                src={post?.coverImageUrl}
                alt="Post cover"
                className="w-20 h-[60px] rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <h4 className="text-base text-gray-800 font-medium">
                    {post?.title}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>

        {showReplyForm && (
          <CommentReplyInput
            user={user}
            authorName={authorName}
            content={content}
            replyText={replyText}
            setReplyText={setReplyText}
            handleAddReply={handleAddReply}
            handleCancelReply={handleCancelReply}
          />
        )}

        {showSubReplies &&
          replies?.length > 0 &&
          replies.map((reply, index) => (
            <CommentInfoCard
              key={reply._id || index}
              commentId={reply._id}
              authorName={reply.author.name}
              authorPhoto={reply.author.profileImageUrl}
              content={reply.content}
              post={reply.post || post}
              replies={reply.replies || []}
              updatedOn={
                reply.updatedAt
                  ? moment(reply.updatedAt).format("Do MMM YYYY")
                  : "-"
              }
              onDelete={(id) => onDelete(id)}
              getAllComments={getAllComments}
              depth={depth + 1}
              isForPost
            />
          ))}
      </div>
    </>
  );
};
