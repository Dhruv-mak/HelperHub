package routes

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prathamrao021/HelperHub/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// createUser godoc
// @Summary Create a new user
// @Description Create a new user with the provided details
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.User true "User data"
// @Success 200 {object} models.User
// @Router /users/create [post]
func createUser(c *gin.Context, db *gorm.DB) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password_Hash), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password_Hash = string(hashedPassword)
	user.Created_At = time.Now()
	user.Updated_At = time.Now()

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

// deleteUser godoc
// @Summary Delete an existing user
// @Description Delete an existing user by username
// @Tags users
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Success 200 {object} models.User
// @Router /users/delete/{username} [delete]
func deleteUser(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")

	if err := db.Where("username = ?", username).Delete(&models.User{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// updateUser godoc
// @Summary Update an existing user
// @Description Update an existing user with the provided details
// @Tags users
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Param user body models.User true "User data"
// @Success 200 {object} models.User
// @Router /users/update/{username} [put]
func updateUser(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")
	var user models.User

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password_Hash), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password_Hash = string(hashedPassword)

	if err := db.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User data updated successfully"})
}

// getUser godoc
// @Summary Get user data
// @Description Get user data with the provided username
// @Tags users
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Success 200 {object} models.User
// @Router /users/get/{username} [get]
func getUser(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")
	var user models.User

	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "User Data Sent.", "data": user})
}

// func SetupRoutes(router *gin.Engine, db *gorm.DB) {
// 	// Routes for user management
// 	userRouter := router.Group("/users")
// 	userRouter.POST("/create", func(c *gin.Context) { createUser(c, db) })
// 	userRouter.DELETE("/delete/:username", func(c *gin.Context) { deleteUser(c, db) })
// 	userRouter.PUT("/update/:username", func(c *gin.Context) { updateUser(c, db) })
// 	userRouter.GET("/get/:username", func(c *gin.Context) { getUser(c, db) })
// }
