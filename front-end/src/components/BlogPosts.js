import React, { useState, useEffect } from "react";
const { DateTime } = require("luxon");

const BlogPosts = (props) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL + "posts";

  useEffect(() => {
    console.log("HERE IT IS: " + apiUrl);
    fetch(apiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setPosts(response);
        console.log(response);
      })
      .catch(function (err) {
        setError(true);
      });
  }, []);

  if (posts == null) {
    return (
      <div className="container-md text-center">
        <h3 className="p-5">loading...</h3>
      </div>
    );
  } else {
    return (
      <div className="container-md">
        {posts.map((post) => {
          return (
            <div className="blogPostCard">
              <h2>{post.title}</h2>
              <p>{post.date}</p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default BlogPosts;
