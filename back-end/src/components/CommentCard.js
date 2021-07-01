import React from "react";
import Button from "./Button";

const CommentCard = (props) => {
  const { commentAuthor, commentDate, commentText, postId, commentId } = props;

  return (
    <div className="col-12">
      <div className="comment-card">
        <p className="comment-heading"><strong>{commentAuthor}</strong> - {commentDate}</p>
        <p className="comment-text">{commentText}</p>
      </div>
    </div>
  );
};

export default CommentCard;
