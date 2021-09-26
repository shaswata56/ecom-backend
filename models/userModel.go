package models

import (
	"encoding/json"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

type User struct {
	ID           primitive.ObjectID `bson:"_id"`
	UserName     *string            `json:"username" validate:"min=6,max=32"`
	FirstName    *string            `json:"firstname"`
	LastName     *string            `json:"lastname"`
	Password     *string            `json:"password" validate:"required,min=6"`
	Email        *string            `json:"email" validate:"email,required"`
	Phone        *string            `json:"phone"`
	Token        *string            `json:"token"`
	UserType     *string            `json:"usertype"`
	RefreshToken *string            `json:"refreshtoken"`
	CreatedAt    time.Time          `json:"createdat"`
	UpdatedAt    time.Time          `json:"updatedat"`
	UserId       string             `json:"userid"`
}

type Status struct {
	Success bool `json:"success"`
}

type UToken struct {
	Token  string `json:"token"`
	UserId string `json:"userid"`
}

type Branch struct {
	ID     primitive.ObjectID `bson:"_id" json:"id"`
	Name   string             `json:"name"`
	City   string             `json:"city"`
	Assets json.Number        `json:"assets"`
}

type Customer struct {
	ID     primitive.ObjectID `bson:"_id" json:"id"`
	Name   string             `json:"name"`
	Street string             `json:"street"`
	City   string             `json:"city"`
}

type Loan struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	BranchName string             `json:"branchName"`
	Amount     json.Number        `json:"amount"`
}

type Borrower struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	Name       string             `json:"name"`
	LoanNumber string             `json:"loanNumber"`
}

type Depositor struct {
	ID            primitive.ObjectID `bson:"_id" json:"id"`
	Name          string             `json:"name"`
	AccountNumber string             `json:"accountNumber"`
}

type Account struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	BranchName string             `json:"branchName"`
	Balance    json.Number        `json:"balance"`
}

type AnyAccount struct {
	ID         primitive.ObjectID `bson:"_id" json:"id"`
	Name       string             `json:"customerName"`
	Street     string             `json:"customerStreet"`
	City       string             `json:"customerCity"`
	BranchName string             `json:"branchName"`
	Balance    json.Number        `json:"balance"`
}
