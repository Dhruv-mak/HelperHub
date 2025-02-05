package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prathamrao021/HelperHub/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	// "backend/models"
	// "github.com/prathamrao021/HelperHub/backend/models"
)

var db *gorm.DB

func initDB() {
	var err error
	dsn := "host=localhost user=postgres password=admin dbname=User port=5432 sslmode=prefer TimeZone=Asia/Shanghai"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	db.AutoMigrate(&models.User{})
	fmt.Println("Database connection successfully opened")
}

func Caller(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

func createUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = string(hashedPassword)

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User data created successfully"})
}

func deleteUser(c *gin.Context) {
	username := c.Param("username")

	if err := db.Where("username = ?", username).Delete(&models.User{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func getUser(c *gin.Context) {
	username := c.Param("username")
	var user models.User

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User Data Sent."})
}

func updateUser(c *gin.Context) {
	username := c.Param("username")
	var user models.User

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User data updated successfully"})
}

func main() {
	initDB()

	r := gin.Default()
	r.GET("/ping", Caller)
	r.POST("/users/create", createUser)
	r.GET("/users/read/:username", getUser)
	r.POST("/users/delete/:username", deleteUser)
	r.POST("/users/update/:username", updateUser)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
