# Express MVC REST API Assignment

**Student:** Muhammad Hassan Abdullah  
**Roll Number:** SU92-BSCSM-F24-132

## Features
- Register and login with hashed passwords and JWT token.
- Category CRUD: create, read all, read one, update, delete.
- Course CRUD: create, read all, read one, update, delete.
- Modular MVC-style folders: routes, controllers, services, middleware and data store.
- Validation responses for missing required fields.
- JSON 404 response for unknown URLs and unknown resource IDs.

## Requirements
Install Node.js LTS and Postman. Check Node installation with `node -v` and `npm -v`.

## Run the project
1. Extract this ZIP.
2. Open the project folder in VS Code.
3. Open the VS Code terminal in that folder.
4. Run `npm install`.
5. Copy `.env.example` to a new file named `.env`.
6. In `.env`, change `JWT_SECRET` to a long random secret.
7. Run `npm run dev` (or `npm start`).
8. Keep the terminal running. API base URL: `http://localhost:3000`.

> Note: This beginner assignment uses an in-memory data store. The records reset whenever the server restarts. A database can be added later.

## Postman requests

Set Body type to **raw → JSON** for JSON request bodies. For protected POST/PUT/DELETE requests, select **Authorization → Bearer Token** and paste the token returned by login. Also ensure `Content-Type: application/json`.

### 1. Register
- Method: POST
- URL: `http://localhost:3000/api/auth/register`
- Body:
```json
{
  "name": "Muhammad Hassan Abdullah",
  "email": "hassan@example.com",
  "password": "Hassan123"
}
```
Expected: **201 Created**. Register only once, or use a new email.

### 2. Login
- Method: POST
- URL: `http://localhost:3000/api/auth/login`
- Body:
```json
{
  "email": "hassan@example.com",
  "password": "Hassan123"
}
```
Expected: **200 OK**. Copy the `token` value from the response.

### 3. Create category
- Method: POST
- URL: `http://localhost:3000/api/categories`
- Headers: `Content-Type: application/json`; `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "name": "Web Development",
  "description": "Web development courses"
}
```
Expected: **201 Created**. Save the returned category `id` for course creation.

### 4. Get all categories
- Method: GET
- URL: `http://localhost:3000/api/categories`
Expected: **200 OK**.

### 5. Required-field validation (400)
- Method: POST
- URL: `http://localhost:3000/api/categories`
- Headers: `Content-Type: application/json`; `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "description": "Name intentionally missing"
}
```
Expected: **400 Bad Request**.

### 6. Unknown URL (404)
- Method: GET
- URL: `http://localhost:3000/api/this-route-does-not-exist`
Expected: **404 Not Found** with `Route not found` in the response body.

### 7. Create course
Replace `CATEGORY_ID_FROM_RESPONSE` with the ID returned when you created a category.
- Method: POST
- URL: `http://localhost:3000/api/courses`
- Headers: `Content-Type: application/json`; `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "title": "Express.js Basics",
  "description": "Introduction to REST APIs",
  "duration": 6,
  "categoryId": "CATEGORY_ID_FROM_RESPONSE"
}
```
Expected: **201 Created**.

### Other CRUD requests
- Categories: `GET /api/categories/:id`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`
- Courses: `GET /api/courses`, `GET /api/courses/:id`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`

For PUT, send all required fields for the selected resource. Protected requests need a Bearer token.

## Required screenshots / evidence PDF
Every screenshot/page should show this heading at the top:
**Name:** Muhammad Hassan Abdullah  
**Roll Number:** SU92-BSCSM-F24-132

Capture these five cases in Postman:
1. Register and login responses (you may show both in separate captures if needed).
2. `POST /api/categories` — 201 Created.
3. `GET /api/categories` — 200 OK.
4. `POST /api/categories` with `name` missing — 400 Bad Request.
5. `GET /api/this-route-does-not-exist` — 404 Not Found.

Make sure the screenshot shows the request method, full URL, relevant Headers tab, and the response status plus response body. Maximize Postman before capturing. Use Windows Snipping Tool (`Win + Shift + S`) or `Win + PrtScn`. Paste screenshots into Word, put the student heading above each image, then export/save as PDF. Do not fake the status codes; capture actual responses from the running API.

## Push to GitHub
1. Create a new empty repository on GitHub, e.g. `express-mvc-rest-api-assignment`.
2. In VS Code terminal, from this project folder, run:
```bash
git init
git add .
git commit -m "Complete Express MVC REST API assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/express-mvc-rest-api-assignment.git
git push -u origin main
```
3. Replace `YOUR-USERNAME` with your GitHub username and use the repository URL GitHub gives you.
4. If Git asks you to sign in, complete the browser sign-in. Do not upload `.env` or `node_modules`.
5. Copy the repository URL and submit it with the Postman evidence PDF.

## Troubleshooting
- `npm is not recognized`: install Node.js LTS, close/reopen VS Code, then check `node -v`.
- `EADDRINUSE`: port 3000 is already in use; stop the other server or change `PORT` in `.env`.
- `401 Authorization token is required`: login and paste the returned token into Bearer Token authorization.
- `400 categoryId must refer...`: create a category first and use its exact ID.
- Data disappears: expected in this in-memory demo after server restart.
