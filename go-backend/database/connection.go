package database

import (
	"database/sql"
	"log"
	"os"
)

var DB *sql.DB

func Connect() {
	var err error
	connStr := os.Getenv("DATABASE_URL")
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Database connection established")
}
