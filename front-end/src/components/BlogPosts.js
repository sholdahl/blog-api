import React, { useState, useEffect } from "react";

const BlogPosts = (props) => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(false);

  const apiUrl = "https://sleepy-brushlands-83452.herokuapp.com/" + "posts"

  useEffect(() => {
    console.log("HERE IT IS: " + apiUrl)
    fetch(apiUrl, {mode: 'cors'})
    .then(function(response) {
      return response.json()
    })
    .then(function (response) {
      setPosts(response);
      console.log(response)
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
      )
  } else {
    return (
      <div className="container-md">
        {posts}
      </div>
      )
  }
};

export default BlogPosts;
