import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

const Comments = (props) => {
  const [comments, setComments] = useState(null);
  const [post, setPost] = useState(null);
  const [commentError, setCommentError] = useState(false);
  const [postError, setPostError] = useState(false);

  let { id } = useParams();

  const commentApiUrl =
    process.env.REACT_APP_API_URL + "posts/" + id + "/comments";

  useEffect(() => {
    fetch(commentApiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setComments(response);
      })
      .catch(function (err) {
        setCommentError(true);
      });
  }, []);

  const postApiUrl = process.env.REACT_APP_API_URL + "posts/" + id;

  useEffect(() => {
    fetch(postApiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setPost(response);
      })
      .catch(function (err) {
        setPostError(true);
      });
  }, []);

  if (comments == null || post == null) {
    return <h3 className="p-5 text-center">loading...</h3>;
  }

  return (
    <div>
      <div className="hero-div">
        <div>
          <h1 className="text-center hero-title">Comments: <em>{post.title}</em></h1>
          <h3 className="text-center hero-subtitle">
            {post.author[0].firstName + " " + post.author[0].lastName} -{" "}
            {post.dateFormatted}
          </h3>
        </div>
      </div>
      <div className="container blog-container">
        <div className="row">
          <div className="comments-section">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
