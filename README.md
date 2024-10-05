# 3105-backend-design-exercise

## Testing

```bash
# Register (POST)
- URL: http://localhost:3000/user/register
- Headers: Content-Type: application/json
- Body (raw JSON): { "username": "testUser", "password": "testPassword", "email": "test@example.com" }

# LOGIN (POST)
- URL: http://localhost:3000/user/login
- Headers: Content-Type: application/json
- Body (raw JSON): { "username": "testUser", "password": "testPassword" }

# PROFILE (GET)
- URL: http://localhost:3000/user/profile
- Headers: Authorization: Bearer <Token> 
```

