package main

import (
	"fmt"
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

	// Print server URL
	fmt.Println("Server is running at http://localhost:3003")

	// Start server
	if err := router.Run(":3003"); err != nil {
		panic(err)
	}
}
