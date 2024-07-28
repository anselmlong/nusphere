package main

import (
	"go-backend/database"
	"go-backend/routes"
	"log"
	"os"
	"time"

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
	// CORS configuration
	corsConfig := cors.Config{
		AllowOrigins:     []string{os.Getenv("BACKEND_URL")}, // Frontend URL
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	router.Use(cors.New(corsConfig))

	// Initialise routes
	routes.InitialiseRoutes(router)

	log.Default().Println("Server is running on port 8080")

	// Run the server
	router.Run()

}
