import React from "react";
import "../assets/styles/Card.css";
import dateFormat from "dateformat";
import comment_icon from "../assets/images/comment_icon.png";
import retweet_icon from "../assets/images/retweet_icon.png";
import abbreviate from "number-abbreviate";

function Card(props) {
  //console.log(props.tweetData.retweet_count);
  const date = dateFormat(props.tweetData.created_at, "mmmm d, yyyy");
  const likes = abbreviate(props.tweetData.favorite_count, 1);
  const retweets = abbreviate(props.tweetData.retweet_count, 1);

  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <span>
            <img
              className="card-image"
              src={props.tweetData.user.profile_image_url_https}
              alt="Profile"
            />
          </span>
          <span className="user-details">
            <div className="user-name">{props.tweetData.user.name} </div>
            <div className="screen-name">
              @{props.tweetData.user.screen_name}
            </div>
          </span>
          <span className="date">{date} </span>
        </div>
        <div className="card-text">{props.tweetData.full_text} </div>
        <div className="card-footer">
          <span className="counts">
            <img src={comment_icon} alt="Comments" />
            <span className="count-value"> {likes} </span>
          </span>
          <span className="counts">
            <img src={retweet_icon} alt="Retweets" />
            <span className="count-value"> {retweets} </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
