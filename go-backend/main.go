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
	log.Default().Println("Server is running on port 8080")
	//Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Default().Println("Server is running on port 8080")

	// Connect to the PostgreSQL database
	database.Connect()
	log.Default().Println("Server is running on port 8080")
	// Initialize the Gin router
	router := gin.Default()

	// Enable CORS - for Frontend & Backend on different domains to communicate
	router.Use(cors.Default())

	// Initialise routes
	routes.InitialiseRoutes(router)

	log.Default().Println("Server is running on port 8080")

	// Run the server
	router.Run(":8080")

}
