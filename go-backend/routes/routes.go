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
	router.POST("/users", controllers.TraditionalSignUp)
	router.POST("/users-login", controllers.TraditionalLogin)
	router.POST("/google-users", controllers.GoogleLogin)
	router.POST("/bookmarks", CreateBookmark)
	router.GET("/bookmarks/:id", GetBookmark)
}
