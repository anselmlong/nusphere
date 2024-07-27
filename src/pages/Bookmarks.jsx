import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Bookmarks = () => {

	const [data, setData] = useState([]);
	const userID = jwtDecode(localStorage.getItem('SavedToken')).user_id;

	// should return a list of events
	// TODO: Implement this function
	const fetchBookmarks = () => {
		return axios.get(process.env.REACT_APP_BACKEND_URL + "/bookmarks/" + userID)
			.then((res) => res.json())
			.then((d) => setData(d));
	}

	// Fetches the data from the server 
	useEffect(() => {
		fetchBookmarks();
	}, []);

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
					<Events eventsData={(data)} deleteButton={true} onDeleteEvent={handleDeleteEvent} />
				</div>
			</Box>
		</div>
	);
};

export default Bookmarks;