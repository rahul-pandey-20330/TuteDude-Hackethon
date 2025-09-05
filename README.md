📦 Vendor Buddy

Vendor Buddy is a web application built during the TuteDude Hackathon.
It helps street food vendors track their raw material usage, wastage, and daily/weekly expenses in a simple and efficient way.

🚀 Features

📊 Track raw material usage

💸 Log daily expenses

🍲 Monitor leftover/wastage

📅 View daily & weekly reports

👤 Vendor registration & profile management

🛠️ Tech Stack

Backend: Node.js, Express.js

Frontend: EJS, Tailwind CSS

Database: MongoDB (Mongoose ODM)

Other: Cookie-Parser, Multer (if used for uploads)

📂 Project Structure
VendorBuddy/
│── app.js              # Main application entry point
│── package.json        # Project dependencies
│── /controllers        # Handles request logic
│── /models             # Mongoose schemas (User, Material, Expense)
│── /routes             # API routes
│── /middlewares        # Authentication, validation, etc.
│── /views              # EJS templates (UI)
│── /public             # Static files (CSS, JS, images)

⚙️ Installation & Setup

Clone the repository

git clone https://github.com/rahul-pandey-20330/TuteDude-Hackethon.git
cd TuteDude-Hackethon


Install dependencies

npm install


Configure environment variables (.env file)

MONGO_URI=your_mongodb_connection
PORT=3000


Run the app

npm start


Open in browser → http://localhost:3000

📖 Code Explanation
🔹 app.js

Sets up Express server

Connects to MongoDB

Uses middlewares (express.json, cookie-parser)

Mounts all routes (/users, /materials, /expenses)

Configures view engine → EJS for rendering frontend pages

🔹 Models (/models)

User.js → Vendor schema

Stores vendor details (name, email, password, profile, etc.)

Material.js → Raw material schema

Tracks material name, quantity, usage, wastage

Expense.js → Expense schema

Logs expense type, amount, date

🔹 Controllers (/controllers)

UserController.js → Handles signup/login, profile management

MaterialController.js → Add/update raw materials, usage tracking

ExpenseController.js → Add/view expenses

Each controller contains business logic for database operations using Mongoose.

🔹 Routes (/routes)

/users → Registration, login, profile APIs

/materials → CRUD operations for raw materials

/expenses → Log and fetch expenses

🔹 Views (/views)

Built with EJS templates

Pages: Login, Signup, Dashboard, Add Material, Add Expense, Reports

📊 Example Flow

Vendor registers & logs in

Vendor adds materials → (e.g. flour, oil, spices)

Each day vendor logs usage & wastage

Vendor adds daily expenses (electricity, gas, etc.)

Dashboard shows summary & weekly reports

👨‍💻 Author

Rahul Pandey
GitHub: rahul-pandey-20330
