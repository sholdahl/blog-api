import React, { useState, useEffect } from "react";

const BlogPost = (props) => {
  return (
    <div>
      <div class="hero-div">
        <div>
          <h1 class="text-center hero-title">About</h1>
          <h3 class="text-center hero-subtitle"></h3>
        </div>
      </div>
      <div className="container blog-container">
        <div className="row">
          <div className="col">
            <p className="blog-content">
              Hello! My name is Sam Holdahl. I am a web developer based out of
              Minneapolis, Minnesota. I created this blog to share my ideas and
              record my journey. This blog was created as a part of the Odin
              Project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
