package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	api "github.com/siropaca/white-flask/backend/generated"
)

// Server implements the ServerInterface
type Server struct{}

// NewServer creates a new Server instance
func NewServer() *Server {
	return &Server{}
}

// GetHello implements the hello endpoint
func (s *Server) GetHello(c *gin.Context) {
	response := api.HelloResponse{
		Message: "Hello, World!",
	}

	c.JSON(http.StatusOK, response)
}