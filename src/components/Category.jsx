import React from "react";
import { useParams } from "react-router-dom";
import Events from "./Events";
import { useState, useEffect } from "react";

const Category = () => {

	const [data, setData] = useState([]);
	const { category } = useParams();
	
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
		<div style={{
			display: "flex",
			justifyContent: "centre",
			alignItems: "centre",
			height: "100vh",
		}}>
			<h1>
				Events with {category} tag:
			</h1>
			<Events eventsData={returnMatchingCategory(data)} />
		</div>
	);
};

export default Category;