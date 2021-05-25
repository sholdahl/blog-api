import React from "react";

const BlogCard = (props) => {
  const {blogTitle, blogAuthor, blogDate, blogText} = props;

  let summaryText = ""

  if(blogText > 100) {
     summaryText = blogText.substring(0,99) + "..." 
  } else {
      summaryText = blogText
  }

    return (
      <div className="col-12">
        <div className="blog-card p-4">
            <h3 className="blog-card-title">{blogTitle}</h3>
            <h6 className="blog-card-date-author">{blogDate} • {blogAuthor}</h6>
            <p className="blog-card-summary-text">{summaryText}</p>
        </div>
      </div>
    );
};

export default BlogCard;
