package main

import (
	store2 "github.com/bmerchant22/snt-hackathon.git/pkg/store"
	"github.com/bmerchant22/snt-hackathon.git/pkg/web"
	"go.uber.org/zap"
	"log"
)

func main() {
	var logger *zap.Logger
	var loggerErr error

	if logger, loggerErr = zap.NewDevelopment(); loggerErr != nil {
		log.Fatalln(loggerErr)
	}

	defer logger.Sync()

	zap.ReplaceGlobals(logger)

	p := store2.PostgresStore{}

	p.ConnectToDatabase()

	web.CreateWebServer(&p)
}
