import React from "react";

export const Icons = ({ srcIcons, altIcons }) => {
  return (
    <>
      <div>
        <img src={srcIcons} alt={altIcons} className="imgFacebook" />
      </div>
    </>
  );
};
