package models

type User struct {
	Name          string `json:"name"`
	Email         string `json:"email"`
	ID            string `json:"id"`
	Picture       string `json:"picture"`
	Password      string `json:"password"`
	GoogleID      string `json:"google_id"`
}
