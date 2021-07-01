import React from "react";

const Button = (props) => {
  const {text, assignedClasses, link} = props;

    return (
        <a className={assignedClasses} href={link} role="button">{text}</a>
    );
};

export default Button;