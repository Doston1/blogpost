import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import "tachyons";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allAuthors, setAllAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // We don't need a setter for this since it's constant
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchPosts();
  }, []);

  // A function to fetch the posts, taking care of errors, and updating the 'loading' status.
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const posts = await response.json();

      // Create allAuthors array based on fetched posts
      const allAuthors = [...new Set(posts.map((post) => post.userId))];

      setPosts(posts);
      setAllAuthors(allAuthors);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // A function that will be called each time a new author is selected/unselected in the authors filter.
  const toggleAuthorFilter = (authorId) => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.includes(authorId)
        ? prevAuthors.filter((id) => id !== authorId)
        : [...prevAuthors, authorId]
    );
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // A function that will be called each time the user clicks 'next' or 'previous' in the pagination system (Bonus).
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // A function that will be called each time the user clicks the 'sort' button, to change the sorting order (Bonus).
  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // When called, this function will filter and sort the posts according to what the user set.
  const getFilteredAndSortedPosts = () => {
    return posts
      .filter(
        (post) =>
          selectedAuthors.length === 0 || selectedAuthors.includes(post.userId)
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
      });
  };

  // If the page is still loading or there are errors, output it.
  if (loading) return <div className="tc pa4">Loading posts...</div>;
  if (error) return <div className="tc pa4 red">{error}</div>;

  // filter and sort the posts according to what the user chose.
  const filteredPosts = getFilteredAndSortedPosts();

  // Calculate in which page we are right now, and slice the posts array accordingly.
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="App">
      <h1 className="welcome-title">Welcome To Doston's Blogpost</h1>

      <FilterBar
        authors={allAuthors}
        selectedAuthors={selectedAuthors}
        onAuthorToggle={toggleAuthorFilter}
        sortOrder={sortOrder}
        onSortToggle={toggleSort}
      />

      <div className="content-container">
        <div className="posts-container">
          {/* PostList component is responsible for showing the posts */}
          <PostList posts={currentPosts} />
        </div>
        {/* Pagination component is responsible for the pagination system */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
