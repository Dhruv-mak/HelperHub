package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB) {

	// Routes for user management
	userRouter := router.Group("/users")
	userRouter.POST("/create", func(c *gin.Context) { createUser(c, db) })
	userRouter.DELETE("/delete/:username", func(c *gin.Context) { deleteUser(c, db) })
	userRouter.PUT("/update/:username", func(c *gin.Context) { updateUser(c, db) })
	userRouter.GET("/get/:username", func(c *gin.Context) { getUser(c, db) })

	// Routes for volunteer management
	volunteerRouter := router.Group("/volunteers")
	volunteerRouter.POST("/create", func(c *gin.Context) { createVolunteer(c, db) })
	volunteerRouter.DELETE("/delete/:username", func(c *gin.Context) { deleteVolunteer(c, db) })
	volunteerRouter.PUT("/update/:username", func(c *gin.Context) { updateVolunteer(c, db) })
	volunteerRouter.GET("/get/:username", func(c *gin.Context) { getVolunteer(c, db) })

	// Routes for organization management
}
