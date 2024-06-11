package routes

import (
	"github.com/gin-gonic/gin"

	"go-backend/controllers"
)

// Define endpoints routes
func InitialiseRoutes(router *gin.Engine) {
	router.GET("/events", controllers.GetEvents)
	router.POST("/events", controllers.CreateEvent)
	router.GET("/events/:id", controllers.GetEventByID)
	router.PUT("/events/:id", controllers.UpdateEvent)
	router.DELETE("/events/:id", controllers.DeleteEvent)
}
