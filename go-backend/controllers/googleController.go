package controllers

import (
	"context"
	"database/sql"
	"go-backend/database"
	"go-backend/models"
	"net/http"

	//"golang.org/x/oauth2"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/idtoken"
)

func GoogleLogin(c *gin.Context) {
	var requestBody struct {
		GoogleID string `json:"googleId"`
		Token    string `json:"token"`
	}

	//Binds incoming json payload to requestBody struct
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request"})
		return
	}

	//Validate the token
	payload, err := idtoken.Validate(context.Background(), requestBody.Token, requestBody.GoogleID)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid token"})
		return
	}

	// Extract user info from the payload
	email := payload.Claims["email"].(string)
	name := payload.Claims["name"].(string)

	var user models.User
	err = database.DB.QueryRow("SELECT id FROM users WHERE google_id = $1", requestBody.GoogleID).Scan(&user.ID)
	if err == sql.ErrNoRows {
		// User does not exist, create new user
		_, err = database.DB.Exec("INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3)",
			requestBody.GoogleID, name, email)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating user"})
			return
		}
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Error retrieving user"})
		return
	}

	// Return success response
	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})

}
