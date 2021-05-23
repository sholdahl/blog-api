import React, {useState} from "react";
import Header from "./components/Header";
import BlogPosts from "./components/BlogPosts";


function App() {
  return (
    <div className="container-fluid no-gutters app-container">
      <Header/>
      <BlogPosts/>
    </div>
  );
}

export default App;