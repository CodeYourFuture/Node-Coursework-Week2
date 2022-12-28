import React, { useState, useEffect } from "react";

const Search = ({ setMessages }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (searchTerm && search) {
      fetch(`/messages/search?term=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMessages(data);
          setSearch(false);
        });
    }
  }, [searchTerm, search, setMessages]);

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
    </div>
  );
};

export default Search;
