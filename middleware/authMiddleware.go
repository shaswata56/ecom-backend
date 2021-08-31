package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/shaswata56/ecom-backend/helper"
	"net/http"
)

func Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			errMsg := fmt.Sprintf("No token Header found!")
			c.JSON(http.StatusInternalServerError, gin.H{"error": errMsg})
			c.Abort()
			return
		}

		claims, err := helper.ValidateToken(clientToken)
		if err != "" {
			errMsg := fmt.Sprintf("No claims found!")
			c.JSON(http.StatusInternalServerError, gin.H{"error": errMsg})
			c.Abort()
			return
		}

		c.Set("email", claims.Email)
		c.Set("firstname", claims.UserName)
		c.Set("userid", claims.UserId)
		c.Set("usertype", claims.UserType)

		c.Next()
	}
}
