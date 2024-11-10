import React from "react";
import MapComponent from "./MapComponent";

// This component is responsible for the post card for each post, putting the title, author, body and the bonus map using MapComponent
const Post = ({ title, body, author, lat, lng }) => {
  return (
    <div className="bg-washed-blue dib br3 pa3 ma2 bw2 grow shadow-5 ba tc w-90">
      <div className="post-header mb3">
        <h1 className="f3 mb2">{title}</h1>
        <span className="f6 gray">Author: User {author}</span>
      </div>
      <p className="tc lh-copy">{body}</p>

      {/* Render MapComponent with random coordinates for each post */}
      <div className="map-container mt4 mb2">
        <MapComponent lat={lat} lng={lng} />
      </div>
    </div>
  );
};

export default Post;
