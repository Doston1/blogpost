import React, { useState } from "react";

const FilterBar = ({
  authors,
  selectedAuthors,
  onAuthorToggle,
  sortOrder,
  onSortToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCount = selectedAuthors.length;

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-dropdown-wrapper">
          <button className="filter-button" onClick={() => setIsOpen(!isOpen)}>
            {selectedCount
              ? `${selectedCount} Author${
                  selectedCount > 1 ? "s" : ""
                } Selected`
              : "Select Authors"}
            <span>{isOpen ? "▼" : "▲"}</span>
          </button>

          <button onClick={onSortToggle} className="sort-button">
            Sort by Title {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>

        <div className={`filter-content ${isOpen ? "show" : ""}`}>
          {authors.map((authorId) => (
            <div key={authorId} className="checkbox-item">
              <input
                type="checkbox"
                id={`author-${authorId}`}
                checked={selectedAuthors.includes(authorId)}
                onChange={() => onAuthorToggle(authorId)}
              />
              <label htmlFor={`author-${authorId}`}>User {authorId}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
