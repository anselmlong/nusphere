package models

type Bookmark struct {
	Id      int `json:"id" gorm:"primaryKey"`
	UserID  int `json:"user_id"`
	EventID int `json:"event_id"`
}
