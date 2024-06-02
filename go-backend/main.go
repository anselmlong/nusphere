package main

import (
	"go-backend/database"
	"go-backend/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {

	//Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to the PostgreSQL database
	database.Connect()

	// Initialize the Gin router
	router := gin.Default()

	// Enable CORS - for Frontend & Backend on different domains to communicate
	router.Use(cors.Default())

	// Initialise routes
	routes.InitialiseRoutes(router)

	// Run the server
	router.Run(":8080")

}
