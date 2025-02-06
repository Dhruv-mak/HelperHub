package main

import (
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	docs "github.com/prathamrao021/HelperHub/docs"
	"github.com/prathamrao021/HelperHub/models"
	"github.com/prathamrao021/HelperHub/routes"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"github.com/auth0/go-auth0"
	"github.com/auth0/go-auth0/management"
	"github.com/auth0/go-auth0/authentication"
)

func initDB() *gorm.DB {
	var err error
	dsn := "host=localhost user=postgres password=admin dbname=User port=5432 sslmode=prefer TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	db.AutoMigrate(&models.User{})
	fmt.Println("Database connection successfully opened")
	return db
}

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	db := initDB()

	auth0Domain := "YOUR_AUTH0_DOMAIN"
	auth0ClientID := "YOUR_AUTH0_CLIENT_ID"
	auth0ClientSecret := "YOUR_AUTH0_CLIENT_SECRET"

	auth0Client := authentication.New(auth0Domain)
	auth0Management := management.New(auth0Domain, management.WithClientCredentials(auth0ClientID, auth0ClientSecret))

	routes.SetupRoutes(router, db, auth0Client, auth0Management)

	docs.SwaggerInfo.BasePath = "/"
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	log.Print("Starting server on port 8080")
	router.Run(":8080")
}
