package main

import (
	"github.com/gin-gonic/gin"
	"github.com/shaswata56/ecom-backend/middleware"
	"github.com/shaswata56/ecom-backend/routes"
	"os"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	router := gin.New()
	router.Use(gin.Logger())
	router.Use(middleware.Cors())

	routes.AuthRoutes(router)
	routes.UserRoutes(router)

	// API-1
	router.GET("/api-1", func(c *gin.Context) {
		c.JSON(200, gin.H{"success": "Access granted for api-1"})
	})

	// API-2
	router.GET("/api-2", func(c *gin.Context) {
		c.JSON(200, gin.H{"success": "Access granted for api-2"})
	})

	err := router.Run("127.0.0.1:" + port)
	if err != nil {
		return
	}
}