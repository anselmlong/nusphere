package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"go-backend/database"
	"go-backend/models"
)

// Get events in database
func GetEvents(c *gin.Context) { //c contains information of incoming HTTP request

	//SQL database query
	rows, err := database.DB.Query("SELECT id, title, date, description, image_url, type, price FROM events")

	//Error handling
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	events := []models.Event{} //initialise empty slice of event
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.Id, &event.Title, &event.Date, &event.Description, &event.ImageUrl, &event.Type, &event.Price); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		events = append(events, event)
	}

	//Response in JSON format
	c.JSON(http.StatusOK, events)
}

func CreateEvent(c *gin.Context) {
	var event models.Event

	event.Title = c.PostForm("eventTitle")
	event.Date = c.PostForm("date")
	event.Description = c.PostForm("eventDescription")
	//event.ImageUrl = c.PostForm("picture")
	//event.Type = c.PostForm("type")
	event.Price = c.PostForm("cost")
	event.Organiser = c.PostForm("organiser")
	event.StartTime = c.PostForm("startTime")
	event.EndTime = c.PostForm("endTime")
	event.RegistrationLink = c.PostForm("registrationLink")
	event.Location = c.PostForm("location")

	if err := c.ShouldBind(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Handle image upload
	file, err := c.FormFile("picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// Save the uploaded file to a specific directory
	// For example, you can use the filepath package to generate a unique file name
	filePath := "public/img/" + file.Filename
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Set the image URL to the file path in your event struct
	event.ImageUrl = filePath

	_, err = database.DB.Exec("INSERT INTO events (title, date, description, image_url, price, organiser, start_time, end_time, registration_link, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
		event.Title, event.Date, event.Description, event.ImageUrl, event.Price, event.Organiser, event.StartTime, event.EndTime, event.RegistrationLink, event.Location)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Event created"})
}

func UpdateEvent(c *gin.Context) {
	id := c.Param("id")
	var event models.Event
	if err := c.BindJSON(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := database.DB.Exec("UPDATE events SET title = $1, date = $2, description = $3, image_url = $4, type = $5, price = $6 WHERE id = $7",
		event.Title, event.Date, event.Description, event.ImageUrl, event.Type, event.Price, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Event updated"})
}

func DeleteEvent(c *gin.Context) {
	id := c.Param("id")

	_, err := database.DB.Exec("DELETE FROM events WHERE id = $1", id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Event deleted"})
}
