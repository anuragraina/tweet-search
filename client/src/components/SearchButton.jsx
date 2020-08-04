import React, { useContext } from "react";
import "../assets/styles/SearchButton.css";
import { Link } from "react-router-dom";
import { SearchContext } from "../App";

function SearchButton(props) {
  const { search } = useContext(SearchContext);
  let searchUrl = "";

  search[0] === "#"
    ? (searchUrl = "/search/%23" + search.slice(1))
    : (searchUrl = props.url);

  return (
    <Link to={searchUrl}>
      <button className="search-button">SEARCH</button>
    </Link>
  );
}

export default SearchButton;
