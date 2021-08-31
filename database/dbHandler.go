package database

import (
	"context"
	"fmt"
	"github.com/joho/godotenv"
	"github.com/shaswata56/ecom-backend/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"os"
	"time"
)

var Client *mongo.Client = DBinstance()

func DBinstance() *mongo.Client {
	err := godotenv.Load(".env")
	utils.CheckError(err)

	mongoUri := os.Getenv("MONGODB_URL")
	fmt.Println(mongoUri)

	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUri))
	utils.CheckError(err)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	utils.CheckError(err)

	fmt.Println("Connection to Database Established.")

	return client
}


func OpenCollection(client *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = client.Database("ECommerce-Backend").Collection(collectionName)
	return collection
}