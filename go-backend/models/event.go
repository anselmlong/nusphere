package models

type Event struct {
	Id               int    `json:"id" gorm:"primaryKey"`
	Title            string `json:"title"`
	Date             string `json:"date"`
	Description      string `json:"description"`
	ImageUrl         string `json:"imageUrl"`
	Type             string `json:"type"`
	Price            string `json:"price"`
	Organiser        string `json:"organiser"`
	StartTime        string `json:"startTime"`
	EndTime          string `json:"endTime"`
	RegistrationLink string `json:"registrationLink"`
	Location         string `json:"location"`
}
