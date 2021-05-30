import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BlogPost = (props) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  let { id } = useParams();

  const apiUrl = process.env.REACT_APP_API_URL + "posts/" + id;

  useEffect(() => {
    fetch(apiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setPost(response);
      })
      .catch(function (err) {
        setError(true);
      });
  }, []);

  if (post == null) {
    return <h3 className="p-5 text-center">loading...</h3>;
  }
  return (
    <div>
      <div class="hero-div">
        <div>
          <h1 class="text-center hero-title">{post.title}</h1>
          <h3 class="text-center hero-subtitle">
            {post.author[0].firstName + " " + post.author[0].lastName} -{" "}
            {post.dateFormatted}
          </h3>
        </div>
      </div>
      <div className="container blog-container">
        <div className="row">
          <div className="col">
            <p className="blog-content">{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
