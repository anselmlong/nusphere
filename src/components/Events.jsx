// convert this into a component i can use 
import React from "react"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './Events.css';
import { Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';

// Define a mapping of event types to colors
const eventTypeToColor = {
	Academic: "blue",
	Social: "orange",
	Sports: "red",
	Career: "purple",
	// Add more event types and their corresponding colors as needed
};


const Events = ({ eventsData, editButton, deleteButton, onEditEvent, onDeleteEvent }) => {
	let navigate = useNavigate();
	const [editing, setEditing] = useState(false);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Move to event details
	const handleEventClick = (id) => {
		navigate(`/events/${id}`);
	};

	const handleEditing = (id) => {
		setEditing(true);
		navigate(`/events/${id}`, { state: { editing: true } }); // Pass editing state
	};

	const handleDeleteEvent = (eventId) => {
		setOpen(false);
		onDeleteEvent(eventId);
		navigate(`/My-Events`);
	};

	return (
		<div className="events">
			<Grid container spacing={2}>
			{eventsData.map((event, index) => (
				<Grid item xs={6}>
					<Item>
					<div key={index} className="event-card" onClick={() => handleEventClick(event.id)}>
						<img src ={event.imageUrl} alt={event.title} />
						{/*<img className='img' src={'../img/' + event.imageUrl} alt={event.title} />*/}
						{/*console.log(event.imageUrl)*/}

						<Typography variant="h5">{event.title}</Typography>

						<Typography variant="body1"
							sx={{
								overflow: 'hidden',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 2, // Adjust the number of lines to show
								lineClamp: 2, // Adjust the number of lines to show
							}}>
							{event.description}
						</Typography>

						<Box display="flex" sx={{ mt: 1 }}>
							<CalendarMonthIcon />
							<Typography variant="body1" style={{ marginLeft: 4 }}>{event.date}</Typography>
						</Box>

						<Box fontWeight="fontWeightMedium" sx={{ display: "inline-block", p: 0.5, my: 1, mr: 1, border: "2px solid gray", borderRadius: 2 }}>
							<Typography variant="body1" sx={{ color: eventTypeToColor[event.type] || "black", fontWeight: "bold" }}>
								{event.type}
							</Typography>
						</Box>

						<Box sx={{ display: "inline-block", p: 0.5, my: 1, border: "2px solid gray", borderRadius: 2 }}>
							<Typography>
								{event.price > 0 ? "$" + event.price : "Free"}
							</Typography>
						</Box>

					</div>

					{/* Edit and Delete buttons */}
					<div className="event-buttons">
						<Box display={"flex"}>
						{editButton &&
							<Button variant="outlined" onClick={() => handleEditing(event.id)} sx={{ ml: 2, mr: 1 }} size="small">
								Edit
							</Button>
						}
						{deleteButton &&
							<Box>
								<Button variant="outlined" onClick={handleClickOpen} sx={{ mx: 1 }} color="error" size="small" >
									Delete
								</Button>

								<Dialog
									open={open}
									onClose={handleClose}
									aria-labelledby="alert-dialog-title"
									aria-describedby="alert-dialog-description"
								>
									<DialogTitle id="alert-dialog-title">
										{"Delete event?"}
									</DialogTitle>

									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											This cannot be undone. Be very sure!
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose}>Disagree</Button>
										<Button onClick={() => handleDeleteEvent(event.id)} autoFocus>
											Agree
										</Button>
									</DialogActions>
								</Dialog>
							</Box>
						}
						</Box>
					</div>
					</Item>
				</Grid>
			))}
			</Grid>
		</div>
	)
}

export default Events;