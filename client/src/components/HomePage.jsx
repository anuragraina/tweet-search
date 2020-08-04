import React from "react";
import "../assets/styles/HomePage.css";
import TweetSearch from "./TweetSearch";
import AutocompleteInputBar from "./AutocompleteInputBar";
import SearchButton from "./SearchButton";

function HomePage(props) {
  return (
    <div className="home-page">
      <TweetSearch />
      <AutocompleteInputBar screenName="" />
      <SearchButton url={props.match.url} />
    </div>
  );
}

export default HomePage;
