package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type User struct {
	ID        		primitive.ObjectID	`bson:"_id"`
	UserName		*string				`json:"username" validate:"min=6,max=32"`
	FirstName 		*string           	`json:"firstname"`
	LastName  		*string			  	`json:"lastname"`
	Password		*string			  	`json:"password" validate:"required,min=6"`
	Email			*string				`json:"email" validate:"email,required"`
	Phone			*string				`json:"phone"`
	Token			*string				`json:"token"`
	UserType		*string				`json:"usertype"`
	RefreshToken	*string				`json:"refreshtoken"`
	CreatedAt		time.Time			`json:"createdat"`
	UpdatedAt		time.Time			`json:"updatedat"`
	UserId			string				`json:"userid"`
}

type Status struct {
	Success		bool	`json:"success"`
}

type UToken struct {
	Token		string	`json:"token"`
	UserId		string	`json:"userid"`
}