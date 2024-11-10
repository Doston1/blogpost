import React from "react";
import Post from "./Post";

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="f4 pa4 white">No posts found matching your criteria</div>
    );
  }

  return (
    <div className="fl w-100">
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <Post
              title={post.title}
              body={post.body}
              author={post.userId}
              lat={post.lat} // Pass lat and lng to Post component
              lng={post.lng}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;