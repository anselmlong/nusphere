import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Events from "../components/Events";

const SearchResults = () => {

  const [data, setData] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const fetchData = () => {
    return fetch('http://localhost:8080/events')
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  // Fetches the data from the server 
  useEffect(() => {
    fetchData();
  }, []);

  // Gets the search parameters from the data
  const search_params = Object.keys(Object.assign({}, ...data));

  // Search function
  function search(data) {
    return data.filter((data) =>
      search_params.some((param) =>
        data[param].toString().toLowerCase().includes(query)
      )
    );
  }
  console.log(search(data));
  // passes data into the events component
  return (
    <div className="search-results">
      {search(data).length > 0
        ? <div>
          <h1 className="text-3xl underline text-blue-500">Search Results for "{query}"</h1>
          <Events eventsData={search(data)} />
        </div>
        : <div>
          <h1 className="text-3xl text-red-500">No results found for "{query}"</h1>
        </div>
      }
    </div>
  );
};

export default SearchResults;