package main

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// Event represents an event object
type Event struct {
	Title       string `json:"title"`
	Date        string `json:"date"`
	Description string `json:"description"`
	ImageUrl    string `json:"imageUrl"`
	Type        string `json:"type"`
	Price       string `json:"price"`
}

// events is a slice of Event objects
var events = []Event{
	{Title: "NUS Beach Day", Date: "18 June 2024", Description: "Feeling bored this summer? Join us at Sentosa!", ImageUrl: "beach-day.jpg", Type: "Social", Price: "FREE"},
	{Title: "TikTok x SOC Career Fair", Date: "2 July 2024", Description: "Come and get some jobs at TikTok!", ImageUrl: "tiktok-career.jpg", Type: "Career", Price: "FREE"},
	{Title: "SoC Orbital Information Session", Date: "2 July 2024", Description: "Want to learn more about Orbital? Come join us!", ImageUrl: "orbital-info.jpg", Type: "Career", Price: "FREE"},
	{Title: "RunNUS", Date: "2 July 2024", Description: "Run for a good cause at RunNUS!", ImageUrl: "runnus.jpg", Type: "Career", Price: "FREE"},
}

// getEvents is a handler function for the "/api/events" endpoint
func getEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}

func main() {
	// Create a new router
	r := mux.NewRouter()

	// Register the getEvents handler function for the "/api/events" endpoint
	r.HandleFunc("/api/events", getEvents).Methods("GET")

	// Handle all requests using the router
	http.Handle("/", r)

	// Start the HTTP server on port 8000
	http.ListenAndServe(":8000", nil)
}
