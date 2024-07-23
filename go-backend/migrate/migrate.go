package main

import (
	"go-backend/database"
	"log"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func init() {
	//Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Default().Println("Server is running on port 8080")

	// Connect to the PostgreSQL database
	database.Connect()
	log.Default().Println("Server is running on port 8080")
}

func main() {
}
