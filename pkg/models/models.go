package models

import "time"

type User struct {
	Username string `gorm:"primaryKey"`
	Email    string `gorm:"unique"`
	Password string
}

type SignupRequest struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Response struct {
	Message string `json:"message"`
}

type Post struct {
	CreatedAt time.Time
	PostId    int    `gorm:"primaryKey"`
	Username  string `gorm:"unique"`
	Post      string
}

type PostRequest struct {
	PostId   int    `json:"postId"`
	Username string `json:"username"`
	Post     string `json:"post"`
}
