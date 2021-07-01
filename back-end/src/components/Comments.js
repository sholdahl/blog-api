import React, { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const Comments = (props) => {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(false);
  let { postId } = props;

  const apiUrl =
    process.env.REACT_APP_API_URL + "posts/" + postId + "/comments";

  useEffect(() => {
    fetch(apiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setComments(response);
      })
      .catch(function (err) {
        setError(true);
      });
  }, []);

  if (comments == null) {
    return <h3 className="p-5 text-center">loading...</h3>;
  }
  return (
    <div className="comments-section">
      <hr />
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment._id}
            commentAuthor={comment.author}
            commentDate={comment.dateFormatted}
            commentText={comment.comment}
            postId={comment.id}
            commentId={comment._id}
          />
        );
      })}
      <CommentForm postID={postId} />
    </div>
  );
};

export default Comments;