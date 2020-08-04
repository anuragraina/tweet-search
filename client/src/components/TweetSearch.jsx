import React from "react";
import "../assets/styles/TweetSearch.css";
import twitter_icon from "../assets/images/twitter_icon.png";

function TweetSearch() {
  return (
    <div className="tweet-search">
      <span> TWEET </span>{" "}
      <span>
        <img src={twitter_icon} alt="Twitter Icon" />
      </span>{" "}
      <span>SEARCH </span>
    </div>
  );
}

export default TweetSearch;
