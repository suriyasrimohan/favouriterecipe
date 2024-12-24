🍳 Favorite Recipes App
Favorite Recipes App is a simple and interactive web application designed to store, view, update, and delete your favorite recipes. Built with modern web technologies, it features a user-friendly interface and a robust backend for seamless data management.

🔥 Features
📝 Add Recipes: Easily add recipes with name, ingredients, and instructions.
📄 View Recipes: Display all your saved recipes dynamically.
✏️ Edit Recipes: Update existing recipes with new details.
❌ Delete Recipes: Remove recipes you no longer need.
🌐 REST API: Perform CRUD operations with a fully functional API.
🖼️ Responsive Design: Optimized for both desktop and mobile devices.



🚀 Technologies Used:
Frontend:
HTML5
CSS3
JavaScript (Vanilla)
Backend:
Node.js
Express.js
MongoDB (Database):
Other Tools:
Mongoose (ODM)
Multer (File Upload Middleware)
CORS (Cross-Origin Resource Sharing)


🛠️ Installation & Setup:
1. create directory
cd favorite-recipes-app
2. Backend Setup
Navigate to the backend folder:---cd backend
Install required dependencies:---npm install
Start the backend server:---node server.js
Ensure MongoDB is running locally or update the connection string in server.js to use a remote MongoDB instance.
3. Frontend Setup
Open the index.html file located in the frontend folder in your preferred browser.

Directory Structure:
favorite-recipes-app/
│
├── backend/
│   ├── server.js          # Backend server
│   ├── models/recipe.js   # Mongoose schema for recipes
│   └── package.json       # Backend dependencies
│
├── frontend/
│   ├── index.html         # Main HTML file
│   ├── app.js             # Frontend JavaScript
│   ├── styles.css         # Styles for the app
│   └── images/            # Icons and images
│
└── README.md              # Project documentation

