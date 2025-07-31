package main

import (
	"github.com/gin-gonic/gin"
	api "github.com/siropaca/white-flask/backend/generated"
	"github.com/siropaca/white-flask/backend/handler"
)

func main() {
	// Create server instance
	server := handler.NewServer()

	// Create Gin router
	router := gin.Default()

	// Register OpenAPI handlers
	api.RegisterHandlers(router, server)

	// Start server
	router.Run(":3003")
}
