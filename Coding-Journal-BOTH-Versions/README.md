# Coding Journal – Old & New Versions

This repository contains two versions side-by-side:

```
Coding-Journal/
├─ Old-Version/        # Your original app (kept separate)
│  ├─ Backend/
│  ├─ Frontend/
│  └─ README.md
└─ New-Version/        # Upgraded app (AI review + Monaco + Topics)
   ├─ Backend/
   ├─ Frontend/
   └─ README.md
```

## Quick Deploy
- **Backend**: Render (root directory = `New-Version/Backend`), `npm install`, `node server.js`
- **Frontend**: Vercel (root directory = `New-Version/Frontend`), `npm run build`, output=`build`

### Render (Backend) ENV
```
PORT=10000
MONGO_URL=<your mongodb uri>
JWT_SECRET=<random long string>
OPENAI_API_KEY=<optional for real AI review>
FRONTEND_URL=https://your-frontend.vercel.app
```

### Vercel (Frontend) ENV
```
REACT_APP_API_BASE_URL=https://your-backend.onrender.com
REACT_APP_EXECUTOR_URL=https://your-executor-service/execute  # optional
```

> The backend will return safe **mock suggestions** if `OPENAI_API_KEY` is not set.

## Local Dev

**Backend**
```bash
cd New-Version/Backend
cp .env.example .env
npm install
node server.js
```
**Frontend**
```bash
cd New-Version/Frontend
cp .env.example .env
npm install
npm start
```

---

**Note:** `Old-Version/` is a placeholder—copy your existing code there if you want to keep it in the same repo.
