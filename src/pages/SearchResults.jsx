import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


const SearchResults = () => {
    
    const [data, setData] = useState([]);
    const [ searchParams ] = useSearchParams(); 
    const query = searchParams.get('query');
    const fetchData = () => {
        return fetch('http://localhost:8080/events')
            .then((res) => res.json())
            .then((d) => setData(d));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const search_params = Object.keys(Object.assign({}, ...data));

    function search(data) {
        return data.filter((data) =>
            search_params.some((param) =>
                data[param].toString().toLowerCase().includes(query)
            )
        );
    }

    return (
        <center>
        {search(data).map((dataObj) => {
          return (
            <div className="box">
              <div class="card">
                <div class="heading">
                  {dataObj.eventTitle}
                  {query}
                </div>
              </div>
            </div>
          );
        })}
      </center>
    );
};

export default SearchResults;