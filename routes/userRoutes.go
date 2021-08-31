package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shaswata56/ecom-backend/controller"
	"github.com/shaswata56/ecom-backend/middleware"
)

func UserRoutes(incomingRoutes *gin.Engine)  {
	incomingRoutes.Use(middleware.Authentication())
	incomingRoutes.GET("/users", controller.GetUsers())
	incomingRoutes.GET("/user/:userid", controller.GetUser())
}