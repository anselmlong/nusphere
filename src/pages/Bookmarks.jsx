import React from "react";
import Events from "../components/Events";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Bookmarks = () => {

	const [data, setData] = useState([]);
	const token = localStorage.getItem('SavedToken');
	let userID;
	if (token) {
		try {
			const decodedToken = jwtDecode(token);
			userID = decodedToken.user_id;
		} catch (error) {
			console.error("Error decoding token:", error);
		}
	}
	// should return a list of events
	const fetchBookmarks = async () => {
		if (!userID) {
		  console.error("User ID is invalid.");
		  return;
		}
		try {
		  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/bookmarks/${userID}`);
		  setData(response.data);
		} catch (error) {
		  console.error("Error fetching bookmarks:", error);
		}
	  };
	
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