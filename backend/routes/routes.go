package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/prathamrao021/HelperHub/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"github.com/auth0/go-auth0"
	"github.com/auth0/go-auth0/management"
	"github.com/auth0/go-auth0/authentication"
)

func createUser(c *gin.Context, db *gorm.DB) {
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

func deleteUser(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")

	if err := db.Where("username = ?", username).Delete(&models.User{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func updateUser(c *gin.Context, db *gorm.DB) {
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

func auth0Login(c *gin.Context, auth0Client *authentication.Client) {
	// Implement Auth0 login logic here
}

func auth0Callback(c *gin.Context, auth0Client *authentication.Client) {
	// Implement Auth0 callback logic here
}

func SetupRoutes(router *gin.Engine, db *gorm.DB, auth0Client *authentication.Client, auth0Management *management.Management) {

	// Routes for user management
	userRouter := router.Group("/users")
	userRouter.POST("/create", func(c *gin.Context) { createUser(c, db) })
	userRouter.POST("/delete/:username", func(c *gin.Context) { deleteUser(c, db) })
	userRouter.POST("/update/:username", func(c *gin.Context) { updateUser(c, db) })

	// Routes for Auth0 authentication
	authRouter := router.Group("/auth")
	authRouter.GET("/login", func(c *gin.Context) { auth0Login(c, auth0Client) })
	authRouter.GET("/callback", func(c *gin.Context) { auth0Callback(c, auth0Client) })
}
