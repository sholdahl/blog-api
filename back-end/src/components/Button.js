import React from "react";

const Button = (props) => {
  const {text, link} = props;

    return (
        <a class="btn btn-blog" href={link} role="button">{text}</a>
    );
};

export default Button;