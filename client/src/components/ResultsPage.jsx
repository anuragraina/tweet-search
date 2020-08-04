import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/ResultsPage.css";
import TweetSearch from "./TweetSearch";
import AutocompleteInputBar from "./AutocompleteInputBar";
import SearchButton from "./SearchButton";
import Card from "./Card";

function ResultsPage(props) {
  const id = props.match.params.id;
  const tweetUrl = "/search_tweet/" + id;

  const [userTweets, setUserTweets] = useState([]);

  //Used to fetch tweets from server from given hashtag or screen_name
  useEffect(() => {
    axios.get(`${tweetUrl}`).then((response) => {
      setUserTweets(response.data.statuses);
    });
  }, [tweetUrl]);

  return (
    <div className="result-page">
      <div className="result-header">
        <TweetSearch />
        <AutocompleteInputBar id={id} />
        <SearchButton url={props.match.url} />
      </div>
      {/* Looping over the array of tweets fetched to display them accordingly */}
      <div className="result-body">
        {userTweets.map((userTweet) => {
          return <Card tweetData={userTweet} key={userTweet.id} />;
        })}
      </div>
    </div>
  );
}

export default ResultsPage;
