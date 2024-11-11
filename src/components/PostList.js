import React from "react";
import Post from "./Post";

// This component is responsible for the list of the posts, creating a Post card for each one of the posts that fit the filters.
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
            <Post title={post.title} body={post.body} author={post.userId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
