import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";

const Bookmarks = () => {

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

	// Placeholder until we can figure out how to bookmark events
	function bookmarked(data) {
		return data;
	}

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
			}}
		>
			<h1>
				Bookmarked Events:
				<div>
					<Events eventsData={bookmarked(data)} />
				</div>
			</h1>
		</div>
	);
};

export default Bookmarks;