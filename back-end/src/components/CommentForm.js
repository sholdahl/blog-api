import React,{useState} from "react";
import axios from "axios";

const CommentForm = (props) => {
  const { postID } = props;
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const apiUrl =
  process.env.REACT_APP_API_URL + "posts/" + postID + "/comments";

  // Handling form submission
  const handleSubmit = (event) => {
    console.log(apiUrl);
    axios.post(apiUrl, {
      author: author,
      comment: comment
    })
    .then(res => {
      window.location.reload();
    })
    event.preventDefault()
  }

  // Handling input
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const handleComment = (event) => {
    setComment(event.target.value)
  }
  
  return (
    <div className="col-12">
      <div className="comment-form">
        <p className="comment-heading mb-3">
          <strong>Add a Comment</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="author">
            Name
          </label>
          <input className="form-control" type="text" name="author" id="author" onChange={handleAuthor} value={author} required/>
          <label className="form-label mt-3" htmlFor="comment">
            Comment
          </label>
          <textarea className="form-control" name="comment" id="comment" onChange={handleComment} value={comment} required></textarea>
          <div className="d-grid mt-3">
            <button className="btn btn-blog" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;