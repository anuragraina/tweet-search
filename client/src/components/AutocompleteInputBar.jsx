import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "../assets/styles/AutocompleteInputBar.css";
import { Link } from "react-router-dom";
import search_icon from "../assets/images/search_icon.png";
import { SearchContext } from "../App";

function AutocompleteInputBar(props) {
  const { search, setSearch } = useContext(SearchContext);

  const [users, setUsers] = useState([]);
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  const searchUrl = "/" + search;
  const userUrl = "/user/" + props.id;

  //Used to pre-fill search bar when on Search Page
  //First check for invalid entries, then check for hashtags
  //If not a hashtag, then get User Name from server for a given Screen Name
  useEffect(() => {
    if (props.id === "" || props.id === undefined) setSearch("");
    else if (props.id.slice(0, 3) === "%23") setSearch("#" + props.id.slice(3));
    else {
      axios.get(`${userUrl}`).then((response) => {
        setSearch(response.data.name);
      });
    }
  }, [userUrl, props.id, setSearch]);

  //Used for Autocomplete as we type in Search Bar
  //Get updated users from server
  useEffect(() => {
    if (search !== "") {
      if (search[0] !== "#") {
        axios.get(`${searchUrl}`).then((response) => {
          setUsers(response.data);
        });
      }
    }
  }, [searchUrl, search]);

  //Used to collapse Autocomplete when clicked outside it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  //As soon as search bar is clicked and the value is not a hashtag, autocomplete pops up.
  const handleClick = () =>
    search === "" || search[0] !== "#" ? setDisplay(true) : setDisplay(false);

  //Keeps components controlled
  //If hashtag is present autocomplete turns-off
  //If hashtag is removed autocomplete pops up again
  const handleChange = (event) => {
    setSearch(event.target.value);
    search[0] === "#" ? setDisplay(false) : setDisplay(true);
    search === "" && setDisplay(true);
  };

  return (
    <div ref={wrapperRef} className="autocomplete">
      <div className="search-bar-with-icon">
        <input
          className="search-bar"
          type="text"
          onClick={() => handleClick()}
          onChange={handleChange}
          value={search}
        />

        <img className="search-icon" src={search_icon} alt="Search Icon" />
      </div>

      {display && (
        <div className="option-list">
          {users.map((user) => {
            return (
              <Link
                className="link"
                tabIndex="0"
                key={user.screen_name}
                to={`/search/${user.screen_name}`}
                onClick={() => {
                  setDisplay(false);
                  setSearch(user.name);
                }}
              >
                <div className="options">{user.name}</div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AutocompleteInputBar;
