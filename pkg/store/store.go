package store

import (
	"github.com/bmerchant22/snt-hackathon.git/pkg/models"
	"go.uber.org/zap"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"strconv"
)

type PostgresStore struct {
	db *gorm.DB
}

func (p *PostgresStore) ConnectToDatabase() error {
	const (
		host     = "localhost"
		port     = 5432
		user     = "postgres"
		password = "postgres53"
		dbname   = "lnf_users"
	)

	zap.S().Infof("Connecting to database ...")

	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + strconv.Itoa(port) + " sslmode=disable " + "TimeZone=Asia/Kolkata"

	var err error
	p.db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		zap.S().Errorf("Error while opening connection to postgresql")
		return err
	}
	//defer p.db.Close()
	zap.S().Infof("Connection established successfully with user: %v, db: %v", user, dbname)
	return err
}

func (p *PostgresStore) FindUser(username string) models.User {
	var user models.User
	if result := p.db.Where("username = ?", username).First(&user); result.Error == nil {
		return user
	}
	return models.User{}
}

func (p *PostgresStore) UserSignup(username string, email string, hash string) error {
	user := models.User{
		Username: username,
		Email:    email,
		Password: hash,
	}
	result := p.db.Create(&user)
	if result.Error != nil {
		zap.S().Errorf("Error while inserting user with username : %v with error : %v", user.Username, result.Error)
		return result.Error
	}
	return result.Error
}

func (p *PostgresStore) AddPost(createdAt string, postId int, username string, post string) error {
	Post := models.Post{
		CreatedAt: createdAt,
		PostId:    postId,
		Username:  username,
		Post:      post,
	}
	result := p.db.Create(&Post)
	if result.Error != nil {
		zap.S().Errorf("Unable to insert the given post")
		return result.Error
	}
	zap.S().Infof("Post  inserted successfully !")
	return nil
}

func (p *PostgresStore) FetchPosts() ([]models.Post, error) {
	var posts []models.Post
	result := p.db.Find(&posts)
	if result.Error != nil {
		zap.S().Errorf("No posts fetched, empty array received !")
		return nil, result.Error
	}
	zap.S().Infof("Posts fetched successfully !")
	return posts, result.Error
}

func (p *PostgresStore) DeletePost(postId int) error {
	var post models.Post
	result := p.db.Where("post_id = ?", postId).Delete(&post)
	if result.Error != nil {
		zap.S().Errorf("Error while deleting the post with postId")
		return result.Error
	}
	zap.S().Infof("Post deleted successfully !")
	return nil
}
