const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User)
        }
    },
    "openapi":"3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Users and Products CRUD API",
        "description": "An application for creating users and choosing product",
        "contact": {
            "name": "Api support",
            "url": "https://aueb.gr",
            "email": "support@example.com",
            
        }
    },
    "servers": [
        {
            url:"http://localhost:3000",
            description:"Local Server"
        },
        {
            url:"http://www.backend.aueb.gr"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "Endpoints for User"
        },
        {
            "name": "Users and Products",
            "description": "Endpoints for Users and their Products"
        }
    ],
    "paths": {
        "/api/users": {
            "get": {
                "tags": ["Users"],
            
                    "description": {
                        "responses": {

                            "200": {
                            "description":"List of all users",
                            "content": {
                                "application/json" :{
                                    "schema": {
                                        "type": "array",
                                        "items": {
                                            "$ref": "#/components/schemas/User"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/api/users/{username}": {

        }
    }
}