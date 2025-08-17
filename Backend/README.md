Coding Journal Backend - Full Auth + AI Review (Final)
-----------------------------------------------------

Files included:
- server.js
- config/db.js
- models/User.js
- models/Problem.js
- middleware/authMiddleware.js
- controllers/authController.js
- controllers/problemController.js
- controllers/reviewController.js
- routes/authRoutes.js
- routes/problemRoutes.js
- routes/reviewRoutes.js
- package.json
- .env.example

Env vars required (set on Render):
- MONGO_URL
- JWT_SECRET
- OPENAI_API_KEY (optional; if not set, review returns mock suggestions)
- FRONTEND_URL (your Vercel URL)

Start locally:
npm install
cp .env.example .env   # edit .env and fill values
node server.js
