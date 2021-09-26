package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/shaswata56/ecom-backend/database"
	"github.com/shaswata56/ecom-backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"net/http"
	"strconv"
	"time"
)

var branchCollection = database.OpenCollection(database.Client, "Branches")
var customerCollection = database.OpenCollection(database.Client, "Customers")
var loanCollection = database.OpenCollection(database.Client, "Loans")
var borrowerCollection = database.OpenCollection(database.Client, "Borrowers")
var depositorCollection = database.OpenCollection(database.Client, "Depositors")
var accountCollection = database.OpenCollection(database.Client, "Accounts")

func GetBranches() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var branches []models.Branch
		result, err := branchCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &branches); err != nil {
			log.Fatal(err)
		}
		fmt.Println(branches)
		c.JSON(http.StatusOK, branches)
	}
}

func GetBranch() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		branchId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var branch models.Branch
		err := branchCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": branchId}}).Decode(&branch)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, branch)
	}
}

func UpdateBranch() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var branch models.Branch
		if err := c.BindJSON(&branch); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		branch.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := branchCollection.ReplaceOne(ctx,
			bson.M{"_id": branch.ID},
			bson.M{
				"name":   branch.Name,
				"city":   branch.City,
				"assets": branch.Assets,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Branch was updated successfully!"})
	}
}

func DeleteBranches() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := branchCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteBranch() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		branchId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := branchCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": branchId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, result)
	}
}

func AddNewBranch() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var branch models.Branch
		if err := c.BindJSON(&branch); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := branchCollection.FindOne(ctx, bson.M{"name": bson.M{"$eq": branch.Name}}).Decode(&branch)
		if err != nil {
			branch.ID = primitive.NewObjectID()
			_, err := branchCollection.InsertOne(ctx, branch)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Branch was added successfully!"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": "Already inserted!"})
	}
}

func GetCustomers() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var customers []models.Customer
		result, err := customerCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &customers); err != nil {
			fmt.Println(customers)
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, customers)
	}
}

func GetCustomer() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		customerId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var customer models.Customer
		err := customerCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": customerId}}).Decode(&customer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, customer)
	}
}

func UpdateCustomer() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var customer models.Customer
		if err := c.BindJSON(&customer); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		customer.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := customerCollection.ReplaceOne(ctx,
			bson.M{"_id": customer.ID},
			bson.M{
				"name":   customer.Name,
				"street": customer.Street,
				"city":   customer.City,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Customer was updated successfully!"})
	}
}

func DeleteCustomers() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := customerCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteCustomer() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		customerId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := customerCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": customerId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, result)
	}
}

func AddNewCustomer() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var customer models.Customer
		if err := c.BindJSON(&customer); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := customerCollection.FindOne(ctx, bson.M{"name": bson.M{"$eq": customer.Name}, "street": bson.M{"$eq": customer.Street}, "city": bson.M{"$eq": customer.City}}).Decode(&customer)
		if err != nil {
			customer.ID = primitive.NewObjectID()
			_, err := customerCollection.InsertOne(ctx, customer)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Customer was added successfully!"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": "Already inserted!"})
	}
}

func GetLoans() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var loans []models.Loan
		result, err := loanCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &loans); err != nil {
			fmt.Println(loans)
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, loans)
	}
}

func GetLoan() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		loanId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var loan models.Loan
		err := loanCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": loanId}}).Decode(&loan)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, loan)
	}
}

func UpdateLoan() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var loan models.Loan
		if err := c.BindJSON(&loan); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		loan.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := loanCollection.ReplaceOne(ctx,
			bson.M{"_id": loan.ID},
			bson.M{
				"branchName": loan.BranchName,
				"amount":     loan.Amount,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Loan was updated successfully!"})
	}
}

func DeleteLoans() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := loanCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteLoan() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		loanId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := loanCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": loanId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		fmt.Println("Deleted all")
		c.JSON(http.StatusOK, result)
	}
}

func AddNewLoan() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var loan models.Loan
		if err := c.BindJSON(&loan); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := loanCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": loan.ID}}).Decode(&loan)
		if err != nil {
			loan.ID = primitive.NewObjectID()
			_, err := loanCollection.InsertOne(ctx, loan)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Loan was added successfully!"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": "Already inserted!"})
	}
}

func GetBorrowers() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var borrowers []models.Borrower
		result, err := borrowerCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &borrowers); err != nil {
			fmt.Println(borrowers)
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, borrowers)
	}
}

func GetBorrower() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		borrowerId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var borrower models.Borrower
		err := borrowerCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": borrowerId}}).Decode(&borrower)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, borrower)
	}
}

func UpdateBorrower() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var borrower models.Borrower
		if err := c.BindJSON(&borrower); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		borrower.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := borrowerCollection.ReplaceOne(ctx,
			bson.M{"_id": borrower.ID},
			bson.M{
				"name": borrower.Name,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Borrower was updated successfully!"})
	}
}

func DeleteBorrowers() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := borrowerCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteBorrower() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		borrowerId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := borrowerCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": borrowerId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		fmt.Println("Deleted all")
		c.JSON(http.StatusOK, result)
	}
}

func AddNewBorrower() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var borrower models.Borrower
		if err := c.BindJSON(&borrower); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := borrowerCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": borrower.LoanNumber}}).Decode(&borrower)
		if err != nil {
			borrower.ID = primitive.NewObjectID()
			_, err := borrowerCollection.InsertOne(ctx, borrower)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Borrower was added successfully!"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": "Already inserted!"})
	}
}

func GetDepositors() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var depositors []models.Depositor
		result, err := depositorCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &depositors); err != nil {
			fmt.Println(depositors)
			log.Fatal(err)
		}
		c.JSON(http.StatusOK, depositors)
	}
}

func GetDepositor() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		depositorId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var depositor models.Depositor
		err := depositorCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": depositorId}}).Decode(&depositor)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, depositor)
	}
}

func UpdateDepositor() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var depositor models.Depositor
		if err := c.BindJSON(&depositor); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		depositor.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := depositorCollection.ReplaceOne(ctx,
			bson.M{"_id": depositor.ID},
			bson.M{
				"name": depositor.Name,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Depositor was updated successfully!"})
	}
}

func DeleteDepositors() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := depositorCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteDepositor() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		depositorId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := depositorCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": depositorId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		fmt.Println("Deleted all")
		c.JSON(http.StatusOK, result)
	}
}

func AddNewDepositor() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var depositor models.Depositor
		if err := c.BindJSON(&depositor); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		err := depositorCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": depositor.AccountNumber}}).Decode(&depositor)
		if err != nil {
			depositor.ID = primitive.NewObjectID()
			_, err := depositorCollection.InsertOne(ctx, depositor)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Depositor was added successfully!"})
			return
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": "Already inserted!"})
	}
}

func GetAccounts() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var accounts []models.Account
		result, err := accountCollection.Find(ctx, bson.M{})
		if err = result.All(ctx, &accounts); err != nil {
			log.Fatal(err)
		}
		fmt.Println(accounts)
		c.JSON(http.StatusOK, accounts)
	}
}

func GetAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		accountId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var account models.Account
		err := accountCollection.FindOne(ctx, bson.M{"_id": bson.M{"$eq": accountId}}).Decode(&account)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, account)
	}
}

func UpdateAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var account models.Account
		if err := c.BindJSON(&account); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		account.ID, _ = primitive.ObjectIDFromHex(c.Param("id"))
		_, err := accountCollection.ReplaceOne(ctx,
			bson.M{"_id": account.ID},
			bson.M{
				"branchName": account.BranchName,
				"balance":    account.Balance,
			})
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Account was updated successfully!"})
	}
}

func DeleteAccounts() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		result, err := accountCollection.DeleteMany(ctx, bson.M{})
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(result.DeletedCount)
		c.JSON(http.StatusOK, result.DeletedCount)
	}
}

func DeleteAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		accountId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		result, err := accountCollection.DeleteOne(ctx, bson.M{"_id": bson.M{"$eq": accountId}})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, result)
	}
}

func AddNewAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var account models.Account
		if err := c.BindJSON(&account); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		account.ID = primitive.NewObjectID()
		_, err := accountCollection.InsertOne(ctx, account)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "The Account was added successfully!"})
		return
	}
}

func CreateNewAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var depositorAccount models.AnyAccount
		if err := c.BindJSON(&depositorAccount); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var customer models.Customer
		customer.ID = primitive.NewObjectID()
		customer.City = depositorAccount.City
		customer.Name = depositorAccount.Name
		customer.Street = depositorAccount.Street
		var account models.Account
		account.ID = primitive.NewObjectID()
		account.BranchName = depositorAccount.BranchName
		account.Balance = depositorAccount.Balance
		var depositor models.Depositor
		depositor.ID = primitive.NewObjectID()
		depositor.Name = depositorAccount.Name
		depositor.AccountNumber = account.ID.Hex()
		_, err := customerCollection.InsertOne(ctx, customer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		_, err = accountCollection.InsertOne(ctx, account)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		_, err = depositorCollection.InsertOne(ctx, depositor)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		var branch models.Branch
		err = branchCollection.FindOne(ctx, bson.M{"name": bson.M{"$eq": depositorAccount.BranchName}}).Decode(&branch)
		if err != nil {
			branch.ID = primitive.NewObjectID()
			branch.City = depositorAccount.City
			branch.Name = depositorAccount.BranchName
			branch.Assets = depositorAccount.Balance
			_, err := branchCollection.InsertOne(ctx, branch)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Branch was added successfully!"})
			return
		}
		a, err := depositorAccount.Balance.Int64()
		b, err := branch.Assets.Int64()
		branch.Assets = json.Number(strconv.FormatInt(a+b, 10))
		fmt.Println(branch)
		_, err = branchCollection.ReplaceOne(ctx,
			bson.M{"_id": branch.ID},
			bson.M{
				"name":   branch.Name,
				"city":   branch.City,
				"assets": branch.Assets,
			})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Added new Account!"})
	}
}

func CreateNewLoan() gin.HandlerFunc {
	return func(c *gin.Context) {
		var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var depositorAccount models.AnyAccount
		if err := c.BindJSON(&depositorAccount); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		var customer models.Customer
		customer.ID = primitive.NewObjectID()
		customer.City = depositorAccount.City
		customer.Name = depositorAccount.Name
		customer.Street = depositorAccount.Street
		var loan models.Loan
		loan.ID = primitive.NewObjectID()
		loan.BranchName = depositorAccount.BranchName
		loan.Amount = depositorAccount.Balance
		var borrower models.Borrower
		borrower.ID = primitive.NewObjectID()
		borrower.Name = depositorAccount.Name
		borrower.LoanNumber = loan.ID.Hex()
		_, err := customerCollection.InsertOne(ctx, customer)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		_, err = loanCollection.InsertOne(ctx, loan)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		_, err = borrowerCollection.InsertOne(ctx, borrower)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		var branch models.Branch
		err = branchCollection.FindOne(ctx, bson.M{"name": bson.M{"$eq": depositorAccount.BranchName}}).Decode(&branch)
		if err != nil {
			branch.ID = primitive.NewObjectID()
			branch.City = depositorAccount.City
			branch.Name = depositorAccount.BranchName
			bal, _ := depositorAccount.Balance.Int64()
			branch.Assets = json.Number(strconv.FormatInt(0-bal, 10))
			_, err := branchCollection.InsertOne(ctx, branch)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "The Branch was added successfully!"})
			return
		}
		a, _ := depositorAccount.Balance.Int64()
		b, _ := branch.Assets.Int64()
		branch.Assets = json.Number(strconv.FormatInt(b-a, 10))
		fmt.Println(branch)
		_, err = branchCollection.ReplaceOne(ctx,
			bson.M{"_id": branch.ID},
			bson.M{
				"name":   branch.Name,
				"city":   branch.City,
				"assets": branch.Assets,
			})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Added new Loan!"})
	}
}
