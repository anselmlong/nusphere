import React from "react";
import Events from "./Events";
import { useState, useEffect } from "react";

const Category = ({ category }) => {

	const [data, setData] = useState([]);

	const fetchData = () => {
		return fetch('http://localhost:8080/events')
			.then((res) => res.json())
			.then((d) => setData(d));
	};

	// Fetches the data from the server 
	useEffect(() => {
		fetchData();
	}, []);

	function returnMatchingCategory(data) {
		return data.filter((data) =>
			data.type.toLowerCase() === category.toLowerCase()
		);
	}

	return (
		<Events eventsData={returnMatchingCategory(data)} />
	);
};

export default Category;