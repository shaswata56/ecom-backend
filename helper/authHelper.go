package helper

import (
	"errors"
	"github.com/gin-gonic/gin"
)

func CheckUserType(c *gin.Context, role string) (err error) {
	userType := c.GetString("usertype")
	err = nil
	if userType != role {
		err = errors.New("usertype mismatched")
		return err
	}

	return err
}


func MatchUserTypeToUid(c *gin.Context, userId string) error {
	userType := c.GetString("usertype")
	uid := c.GetString("userid")
	var err error = nil

	if (userType == "USER" || userType == "ADMIN") && uid != userId {
		err = errors.New("unauthorized to access this resource")
		return err
	}

	return CheckUserType(c, userType)
}