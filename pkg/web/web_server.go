package web

import (
	"github.com/bmerchant22/snt-hackathon.git/pkg/store"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func CreateWebServer(store *store.PostgresStore) *Server {
	srv := new(Server)
	srv.store = store
	srv.r = gin.Default()
	srv.r.Use(cors.Default())

	srv.r.POST(kUserSignup, srv.UserSignup)
	srv.r.POST(kUserLogin, srv.UserLogin)
	srv.r.GET(kFetchPost, srv.FetchPosts)
	srv.r.POST(kAddPost, srv.AddPost)
	srv.r.POST(kDeletePost, srv.DeletePost)

	if err := srv.r.Run("localhost:8080"); err != nil {
		zap.S().Errorf("Error while running the server !")
	}

	zap.S().Infof("Web server created successfully !!")

	return srv
}
