package models

import (
	"database/sql/driver"
	"encoding/json"
	"errors"
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
	ID             uint       `gorm:"primaryKey"`
	Username       string     `gorm:"unique;not null"`
	Email          string     `gorm:"unique;not null"`
	Password       string     `gorm:"not null"`
	Volunteer      bool       `gorm:"default:false"`
	Voluntee       bool       `gorm:"default:false"`
	Category       StringList `gorm:"type:jsonb;not null"`
	Auth0ID        string     `gorm:"unique"`
	GitHubID       string     `gorm:"unique"`
	GoogleID       string     `gorm:"unique"`
}
