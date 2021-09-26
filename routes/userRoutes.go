package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/shaswata56/ecom-backend/controller"
	"github.com/shaswata56/ecom-backend/middleware"
)

func UserRoutes(incomingRoutes *gin.Engine) {
	incomingRoutes.Use(middleware.Authentication())
	incomingRoutes.GET("/verify", controller.Verify())
	incomingRoutes.GET("/users", controller.GetUsers())
	incomingRoutes.GET("/user/:userid", controller.GetUser())

	incomingRoutes.GET("/branches", controller.GetBranches())
	incomingRoutes.DELETE("/branches", controller.DeleteBranches())
	incomingRoutes.GET("/branch/:id", controller.GetBranch())
	incomingRoutes.PUT("/branch/:id", controller.UpdateBranch())
	incomingRoutes.DELETE("/branch/:id", controller.DeleteBranch())
	incomingRoutes.POST("/branch", controller.AddNewBranch())

	incomingRoutes.GET("/customers", controller.GetCustomers())
	incomingRoutes.DELETE("/customers", controller.DeleteCustomers())
	incomingRoutes.GET("/customer/:id", controller.GetCustomer())
	incomingRoutes.PUT("/customer/:id", controller.UpdateCustomer())
	incomingRoutes.DELETE("/customer/:id", controller.DeleteCustomer())
	incomingRoutes.POST("/customer", controller.AddNewCustomer())

	incomingRoutes.GET("/loans", controller.GetLoans())
	incomingRoutes.DELETE("/loans", controller.DeleteLoans())
	incomingRoutes.GET("/loan/:id", controller.GetLoan())
	incomingRoutes.PUT("/loan/:id", controller.UpdateLoan())
	incomingRoutes.DELETE("/loan/:id", controller.DeleteLoan())
	incomingRoutes.POST("/loan", controller.AddNewLoan())

	incomingRoutes.GET("/borrowers", controller.GetBorrowers())
	incomingRoutes.DELETE("/borrowers", controller.DeleteBorrowers())
	incomingRoutes.GET("/borrower/:id", controller.GetBorrower())
	incomingRoutes.PUT("/borrower/:id", controller.UpdateBorrower())
	incomingRoutes.DELETE("/borrower/:id", controller.DeleteBorrower())
	incomingRoutes.POST("/borrower", controller.AddNewBorrower())

	incomingRoutes.GET("/depositors", controller.GetDepositors())
	incomingRoutes.DELETE("/depositors", controller.DeleteDepositors())
	incomingRoutes.GET("/depositor/:id", controller.GetDepositor())
	incomingRoutes.PUT("/depositor/:id", controller.UpdateDepositor())
	incomingRoutes.DELETE("/depositor/:id", controller.DeleteDepositor())
	incomingRoutes.POST("/depositor", controller.AddNewDepositor())

	incomingRoutes.GET("/accounts", controller.GetAccounts())
	incomingRoutes.DELETE("/accounts", controller.DeleteAccounts())
	incomingRoutes.GET("/account/:id", controller.GetAccount())
	incomingRoutes.PUT("/account/:id", controller.UpdateAccount())
	incomingRoutes.DELETE("/account/:id", controller.DeleteAccount())
	incomingRoutes.POST("/account", controller.AddNewAccount())

	incomingRoutes.POST("/createAccount", controller.CreateNewAccount())
	incomingRoutes.POST("/createLoan", controller.CreateNewLoan())
}
