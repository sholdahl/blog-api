import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogPosts from "./components/BlogPosts";
import About from "./components/About";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <BlogPosts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
