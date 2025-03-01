package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
	"time"
)

// StringList is a custom type for a list of strings
type StringList []string

// driver.Valuer interface for StringList (GO -> DB)
func (s StringList) Value() (driver.Value, error) {
	return json.Marshal(s)
}

// sql.Scanner interface for StringList (DB -> GO)
func (s *StringList) Scan(value interface{}) error {
	bytes, ok := value.([]byte)
	if !ok {
		return errors.New("type assertion to []byte failed")
	}

	return json.Unmarshal(bytes, s)
}

// User struct
type User struct {
	ID            uint   `gorm:"primaryKey"`
	Email         string `gorm:"unique;not null"`
	Password_Hash string `gorm:"not null"`
	Full_Name     string `gorm:"not null"`
	Role          string `gorm:"not null"`
	Created_At    time.Time
	Updated_At    time.Time
}

// Volunteer struct
type Volunteer struct {
	ID               uint   `gorm:"primaryKey"`
	Email            string `gorm:"unique;not null"`
	Password_Hash    string `gorm:"not null"`
	Name             string `gorm:"not null"`
	Phone            string `gorm:"unique;not null"`
	Location         string
	Bio_Data         string
	Availabile_Hours uint `gorm:"not null"`
	Created_At       time.Time
	Updated_At       time.Time
}

// Organization struct
type Organization struct {
	ID            uint   `gorm:"primaryKey"`
	Email         string `gorm:"unique;not null"`
	Password_Hash string `gorm:"not null"`
	Name          string `gorm:"unique;not null"`
	Phone         string `gorm:"not null"`
	Location      string `gorm:"not null"`
	Description   string `gorm:"not null"`
	Website_Url   string `gorm:"not null"`
	Created_At    time.Time
	Updated_At    time.Time
}

// Category struct
type Category struct {
	ID         uint   `gorm:"primaryKey"`
	Category   string `gorm:"unique;not null"`
	Created_At time.Time
	Updated_At time.Time
}

// Volunteer_Category struct
type Volunteer_Category struct {
	ID           uint `gorm:"primaryKey"`
	Volunteer_ID uint `gorm:"not null"`
	Category_ID  uint `gorm:"not null"`
}

// Opportunity struct
type Opportunity struct {
	ID              uint      `gorm:"primaryKey"`
	Organization_ID uint      `gorm:"not null"`
	Category_ID     uint      `gorm:"not null"`
	Title           string    `gorm:"not null"`
	Description     string    `gorm:"not null"`
	Location        string    `gorm:"not null"`
	Start_Date      time.Time `gorm:"not null"`
	End_Date        time.Time `gorm:"not null"`
	Created_At      time.Time
	Updated_At      time.Time
}

// Application struct
type Application struct {
	ID             uint   `gorm:"primaryKey"`
	Volunteer_ID   uint   `gorm:"not null"`
	Opportunity_ID uint   `gorm:"not null"`
	Status         string `gorm:"not null"`
	Cover_Letter   string `gorm:"not null"`
	Created_At     time.Time
	Updated_At     time.Time
}
