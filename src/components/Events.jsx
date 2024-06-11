// convert this into a component i can use 
import React from "react"

const Events = ({ eventsData }) => {
	return (
		<div className="events">
			{eventsData.map((event, index) => (
				<div key={index} className="event-card">
					<img src={'img/' + event.imageUrl} alt={event.title} />
					<h3>{event.title}</h3>
					<p>{event.description}</p>
					<span>{event.date}</span>
					<span>{event.type}</span>
					<span>{event.price}</span>
				</div>
			))}
		</div>
	)
}

export default Events;