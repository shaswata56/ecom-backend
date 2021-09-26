package helper

import (
	"context"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/shaswata56/ecom-backend/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"os"
	"time"
)

type SignedComponent struct {
	Email    string
	UserName string
	UserId   string
	UserType string
	jwt.StandardClaims
}

var userCollection = database.OpenCollection(database.Client, "user_auth")

var SecretKey = os.Getenv("SECRET_KEY")

func GenerateAllTokens(email, userName, userType, uid string) (signedToken, signedRefreshToken string, err error) {
	claims := &SignedComponent{
		Email:    email,
		UserName: userName,
		UserId:   uid,
		UserType: userType,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(24)).Unix(),
		},
	}

	refreshClaims := &SignedComponent{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SecretKey))
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(SecretKey))

	if err != nil {
		log.Fatal(err)
		return
	}
	return token, refreshToken, err
}

func ValidateToken(signedToken string) (claims *SignedComponent, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&SignedComponent{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(SecretKey), nil
		},
	)

	if err != nil {
		msg = err.Error()
		return
	}

	claims, ok := token.Claims.(*SignedComponent)
	if !ok {
		msg = fmt.Sprintf("The token is invalid!")
		return
	}

	if claims.ExpiresAt < time.Now().Local().Unix() {
		msg = fmt.Sprintf("The token is expired!")
		return
	}

	msg = ""

	return claims, msg
}

func UpdateAllTokens(signedToken, signedRefreshToken, userId string) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)

	updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

	updateObj := bson.M{"$set": bson.M{
		"token":        signedToken,
		"refreshtoken": signedRefreshToken,
		"updatedat":    updatedAt,
	},
	}

	upsert := true
	filter := bson.M{"userid": bson.M{"$eq": userId}}
	opt := options.UpdateOptions{
		Upsert: &upsert,
	}

	updatedId, err := userCollection.UpdateOne(
		ctx,
		filter,
		updateObj,
		&opt,
	)
	defer cancel()

	if err != nil && updatedId.ModifiedCount != 4 {
		log.Fatal(err)
		return
	}
	return
}
