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

// GetRoot implements the root endpoint
func (s *Server) GetRoot(c *gin.Context) {
	c.String(http.StatusOK, "This is white-flask server!")
}

// GetHello implements the hello endpoint
func (s *Server) GetHello(c *gin.Context) {
	response := api.HelloResponse{
		Message: "Hello, World!",
	}

	c.JSON(http.StatusOK, response)
}
