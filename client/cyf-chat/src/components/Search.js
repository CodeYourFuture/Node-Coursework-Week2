 

import React, { useState, useEffect } from "react";

const Search = () => {
  const [searchMessage, setSearchMessage] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (searchTerm && search) {
      fetch(`/messages/search?term=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSearchMessage(data);
          setSearch(false);
        });
    }
  }, [searchTerm, search]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setSearch(true);
    }
  };

  return (
    <div className="search">
      <input placeholder="Search..." type="text" onChange={handleSearch} />
      <button onClick={() => setSearch(true)}>Search</button>

      {searchMessage.map((message) => (
        <div className={!search ? "search" : "hide"}>
          <div className="message-search">
            <p>{message.from}</p>
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
