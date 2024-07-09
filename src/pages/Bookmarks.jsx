import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const Bookmarks = () => {

	const [data, setData] = useState([]);

	const fetchData = () => {
		return fetch(process.env.REACT_APP_BACKEND_URL + "/events")
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

	const handleDeleteEvent = (id) => {
		console.log("Deleting event with id: " + id);
	};

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
			}}
		>
			<Box>
				<Typography fontWeight="800" variant="h4" sx={{ m: 2 }}>Bookmarked Events: </Typography>
				<div>
					<Events eventsData={bookmarked(data)} deleteButton={true} onDeleteEvent={handleDeleteEvent} />
				</div>
			</Box>
		</div>
	);
};

export default Bookmarks;