package controllers

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"

	"go-backend/database"
	"go-backend/models"
)

// Get events in database
func GetEvents(c *gin.Context) { //c contains information of incoming HTTP request

	//SQL database query
	rows, err := database.DB.Query("SELECT id, title, date, description, image_url, type, price, user_id FROM events")

	//Error handling
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	events := []models.Event{} //initialise empty slice of event
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.Id, &event.Title, &event.Date, &event.Description, &event.ImageUrl, &event.Type, &event.Price, &event.UserID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		events = append(events, event)
	}

	//Response in JSON format
	c.JSON(http.StatusOK, events)
}

func GetEventByID(c *gin.Context) {
	id := c.Param("id")
	var event models.Event

	//Query uses a placeholder ($1) to prevent SQL injection
	err := database.DB.QueryRow("SELECT title, date, description, image_url, type, price, organiser, start_time, end_time, registration_link, location FROM events WHERE id = $1", id).Scan(&event.Title, &event.Date, &event.Description, &event.ImageUrl, &event.Type, &event.Price, &event.Organiser, &event.StartTime, &event.EndTime, &event.RegistrationLink, &event.Location)
	if err != nil {
		if err == sql.ErrNoRows { // Check if the error is because no rows were found
			c.JSON(http.StatusNotFound, gin.H{"message": "Event not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error retrieving event"})
		}
		return
	}

	c.JSON(http.StatusOK, event)
}

func CreateEvent(c *gin.Context) {
	var event models.Event

	event.Title = c.PostForm("eventTitle")
	event.Date = c.PostForm("date")
	event.Description = c.PostForm("eventDescription")
	event.ImageUrl = c.PostForm("picture")
	event.Type = c.PostForm("type")
	event.Price = c.PostForm("cost")
	event.Organiser = c.PostForm("organiser")
	event.StartTime = c.PostForm("startTime")
	event.EndTime = c.PostForm("endTime")
	event.RegistrationLink = c.PostForm("registrationLink")
	event.Location = c.PostForm("location")
	event.UserID = c.PostForm("userID")

	if err := c.ShouldBind(&event); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Handle image upload
	//file, err := c.FormFile("picture")
	//if err != nil {
	//	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	//	return
	//}
	// Save the uploaded file to a specific directory
	// For example, you can use the filepath package to generate a unique file name
	//filePath := "public/img/" + file.Filename
	//filePath := filepath.Join("..", "public", "img", file.Filename)
	//if err := c.SaveUploadedFile(file, filePath); err != nil {
	//	c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	//	return
	//}

	// Set the image URL to the file path in your event struct
	//event.ImageUrl = "/" + filePath
	//event.ImageUrl = file.Filename

	_, err := database.DB.Exec("INSERT INTO events (title, date, description, type, image_url, price, organiser, start_time, end_time, registration_link, location, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
		event.Title, event.Date, event.Description, event.Type, event.ImageUrl, event.Price, event.Organiser, event.StartTime, event.EndTime, event.RegistrationLink, event.Location, event.UserID)
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

	_, err := database.DB.Exec("UPDATE events SET title = $1, date = $2, description = $3, image_url = $4, type = $5, price = $6, organiser = $7, start_time = $8, end_time = $9, registration_link = $10, location = $11 WHERE id = $12",
		event.Title, event.Date, event.Description, event.ImageUrl, event.Type, event.Price, event.Organiser, event.StartTime, event.EndTime, event.RegistrationLink, event.Location, id)
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

func CreateBookmark(c *gin.Context) {
	var bookmark models.Bookmark
	if err := c.ShouldBindJSON(&bookmark); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, err := database.DB.Exec("INSERT INTO bookmarks (user_id, event_id) VALUES ($1, $2)", bookmark.UserID, bookmark.EventID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Bookmark created"})
}

func GetBookmark(c *gin.Context) {
	userID := c.Param("userID")

	rows, err := database.DB.Query(`
        SELECT events.id, events.title, events.date, events.description, events.image_url, events.type, events.price
        FROM bookmarks
        JOIN events ON bookmarks.event_id = events.id
        WHERE bookmarks.user_id = $1`, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer rows.Close()

	events := []models.Event{}
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.Id, &event.Title, &event.Date, &event.Description, &event.ImageUrl, &event.Type, &event.Price); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		events = append(events, event)
	}

	c.JSON(http.StatusOK, events)
}
