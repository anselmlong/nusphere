import React from "react";

const SearchResults = ({query}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}
        >
            <h1>
                You searched for: {query}
                PLACEHOLDER
            </h1>
        </div>
    );
};

export default SearchResults;