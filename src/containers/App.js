import "leaflet/dist/leaflet.css";
import React, { Component } from "react";
import "tachyons";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
      error: null,
      allAuthors: [],
      selectedAuthors: [],
      currentPage: 1,
      postsPerPage: 10,
      sortOrder: "asc",
    };
  }

  // After the component is rendered, fetch the posts.
  componentDidMount() {
    this.fetchPosts();
  }

  // A function to fetch the posts, taking care of errors, and updating the 'loading' status.
  fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const posts = await response.json();

      // Add random coordinates to each post
      const postsWithCoords = posts.map((post) => ({
        ...post,
        lat: parseFloat((Math.random() * 180 - 90).toFixed(5)),
        lng: parseFloat((Math.random() * 360 - 180).toFixed(5)),
      }));

      // Create allAuthors array based on fetched posts
      const allAuthors = [...new Set(posts.map((post) => post.userId))];

      // this.setState({ posts, allAuthors, loading: false });
      this.setState({ posts: postsWithCoords, allAuthors, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // A function that will be called each time a new author is selected/unselected in the authors filter.
  toggleAuthorFilter = (authorId) => {
    this.setState((prevState) => ({
      selectedAuthors: prevState.selectedAuthors.includes(authorId)
        ? prevState.selectedAuthors.filter((id) => id !== authorId)
        : [...prevState.selectedAuthors, authorId],
      currentPage: 1, // Reset to first page when filter changes
    }));
  };

  // A function that will be called each time the user clicks 'next' or 'previous' in the pagination system (Bonus).
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  // A function that will be called each time the user clicks the 'sort' button, to change the sorting order (Bonus).
  toggleSort = () => {
    this.setState((prevState) => ({
      sortOrder: prevState.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  // When called, this function will filter and sort the posts according to what the user set.
  getFilteredAndSortedPosts = () => {
    const { posts, selectedAuthors, sortOrder } = this.state;

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

  render() {
    const { loading, allAuthors, error, currentPage, postsPerPage, sortOrder } =
      this.state;

    // If the page is still loading or there are errors, output it.
    if (loading) return <div className="tc pa4">Loading posts...</div>;
    if (error) return <div className="tc pa4 red">{error}</div>;

    // filter and sort the posts according to what the user chose.
    const filteredPosts = this.getFilteredAndSortedPosts();

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
          selectedAuthors={this.state.selectedAuthors}
          onAuthorToggle={this.toggleAuthorFilter}
          sortOrder={sortOrder}
          onSortToggle={this.toggleSort}
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
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
