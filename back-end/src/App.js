import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import BlogPosts from "./components/BlogPosts";
import BlogPost from "./components/BlogPost";
import Settings from "./components/Settings";
import NotFound from "./components/NotFound";
import Comments from "./components/Comments";
import CreatePost from "./components/CreatePost";


function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Switch>
          <Route path="/posts/:id/comments">
            <Comments />
          </Route>
          <Route path="/write">
            <CreatePost />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route exact path="/posts">
            <BlogPosts />
          </Route>
          <Route path="/posts/:id">
            <BlogPost />
          </Route>
          <Route exact path="/">
            <BlogPosts />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
