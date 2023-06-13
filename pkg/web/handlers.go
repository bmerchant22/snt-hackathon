package web

import (
	"fmt"
	"github.com/bmerchant22/snt-hackathon.git/pkg/models"
	"github.com/bmerchant22/snt-hackathon.git/pkg/store"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"net/http"
	"time"
)

type Server struct {
	r     *gin.Engine
	store *store.PostgresStore
}

func (srv *Server) UserSignup(c *gin.Context) {
	var request models.SignupRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the user already exists
	if user := srv.store.FindUser(request.Username); user != (models.User{}) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User already exists"})
		return
	}

	if err := srv.store.UserSignup(request.Username, request.Email, request.Password); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}

	response := models.Response{Message: "Signup successful"}
	c.JSON(http.StatusOK, response)
}

func (srv *Server) UserLogin(c *gin.Context) {
	var request models.LoginRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user := srv.store.FindUser(request.Username)
	if user == (models.User{}) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid credentials"})
		return
	}

	// Compare the passwords
	if user.Password != request.Password {
		zap.S().Errorf("%v && %v", user.Password, request.Password)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	response := models.Response{Message: "Login successful"}
	c.JSON(http.StatusOK, response)
}

func (srv *Server) FetchPosts(c *gin.Context) {
	posts, err := srv.store.FetchPosts()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error in displaying the posts !"})
		return
	}
	c.JSON(http.StatusOK, posts)
}

func (srv *Server) AddPost(c *gin.Context) {
	var request models.PostRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	t := time.Now()
	createdAt := fmt.Sprintf("%d-%02d-%02d %02d:%02d:%02d",
		t.Year(), t.Month(), t.Day(),
		t.Hour(), t.Minute(), t.Second())
	if err := srv.store.AddPost(createdAt, request.PostId, request.Username, request.Post); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err})
	}
	response := models.Response{Message: "Post added successfully"}
	c.JSON(http.StatusOK, response)
}

func (srv *Server) DeletePost(c *gin.Context) {
	var request models.DeleteRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := srv.store.DeletePost(request.PostId); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err})
		return
	}
	response := models.Response{Message: "Post added successfully"}
	c.JSON(http.StatusOK, response)
}
