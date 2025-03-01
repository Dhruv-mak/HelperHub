package routes

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prathamrao021/HelperHub/models"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// createVolunteer godoc
// @Summary Create a new volunteer
// @Description Create a new volunteer with the provided details
// @Tags volunteers
// @Accept json
// @Produce json
// @Param volunteer body models.Volunteer true "Volunteer data"
// @Success 200 {object} models.Volunteer
// @Router /volunteers/create [post]
func createVolunteer(c *gin.Context, db *gorm.DB) {
	var volunteer models.Volunteer
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(volunteer.Password_Hash), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	volunteer.Password_Hash = string(hashedPassword)
	volunteer.Created_At = time.Now()
	volunteer.Updated_At = time.Now()

	if err := db.Create(&volunteer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Volunteer data created successfully"})
}

// deleteVolunteer godoc
// @Summary Delete an existing volunteer
// @Description Delete an existing volunteer by username
// @Tags volunteers
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Success 200 {object} models.Volunteer
// @Router /volunteers/delete/{username} [delete]
func deleteVolunteer(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")

	if err := db.Where("username = ?", username).Delete(&models.Volunteer{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Volunteer data deleted successfully"})
}

// updateVolunteer godoc
// @Summary Update an existing volunteer
// @Description Update an existing volunteer with the provided details
// @Tags volunteers
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Param volunteer body models.Volunteer true "Volunteer data"
// @Success 200 {object} models.Volunteer
// @Router /volunteers/update/{username} [put]
func updateVolunteer(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")
	var volunteer models.Volunteer
	if err := c.ShouldBindJSON(&volunteer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Hash the password if it is provided
	if volunteer.Password_Hash != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(volunteer.Password_Hash), bcrypt.DefaultCost)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
			return
		}
		volunteer.Password_Hash = string(hashedPassword)
	}

	volunteer.Updated_At = time.Now()

	if err := db.Where("username = ?", username).Updates(&volunteer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Volunteer data updated successfully"})
}

// getVolunteer godoc
// @Summary Get an existing volunteer
// @Description Get an existing volunteer by username
// @Tags volunteers
// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Success 200 {object} models.Volunteer
// @Router /volunteers/get/{username} [get]
func getVolunteer(c *gin.Context, db *gorm.DB) {
	username := c.Param("username")
	var volunteer models.Volunteer

	if err := db.Where("username = ?", username).First(&volunteer).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, volunteer)
}
