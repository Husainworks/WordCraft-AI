import React from "react";

export const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <>
      <div className="p-5">
        <p className="text-sm">{content}</p>

        <div className="flex justify-end mt-6">
          <button type="button" className="btn-small" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
