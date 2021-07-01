import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const BlogPosts = (props) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL + "posts";

  useEffect(() => {
    fetch(apiUrl, { mode: "cors" })
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setPosts(response);
      })
      .catch(function (err) {
        setError(true);
      });
  }, []);

  if (posts == null) {
    return <h3 className="p-5 text-center">loading...</h3>;
  }
  return (
    <div>
      <div class="hero-div">
          <div>
            <h1 class="text-center hero-title">The Latest Blog Posts</h1>
            <h3 class="text-center hero-subtitle">
              
            </h3>
          </div>
        </div>
    <div className="container-sm">
      <div className="row">
        {posts.map((post) => {
          return (
            <BlogCard
              key={post._id}
              blogTitle={post.title}
              blogAuthor={
                post.author[0].firstName + " " + post.author[0].lastName
              }
              blogDate={post.dateFormatted}
              blogText={post.content}
              blogId={post._id}
            />
          );
        })}
      </div>
    </div>
    </div>

  );
};

export default BlogPosts;
