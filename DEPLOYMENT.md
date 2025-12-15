# 🚀 Deployment Guide - SilverMoonAI

This guide will help you deploy your application to production using:
- **Vercel** for Frontend (React)
- **Render** for Backend (Node.js) and Python AI Service

---

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free) - https://vercel.com
3. Render account (free) - https://render.com
4. MongoDB Atlas database (already set up ✅)

---

## 🔧 Step 1: Prepare Your Code

### 1.1 Create Git Repository

```bash
cd C:\Users\ASUS\Desktop\my-couple-app
git init
git add .
git commit -m "Initial commit - SilverMoonAI"
```

### 1.2 Push to GitHub

1. Create a new repository on GitHub: https://github.com/new
2. Name it: `silvermoon-ai` or `couple-app`
3. Push your code:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Import Project

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repository
5. Select the **`frontend`** folder as the root directory

### 2.2 Configure Build Settings

- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 2.3 Add Environment Variables

In Vercel dashboard, go to **Settings → Environment Variables** and add:

| Name | Value |
|------|-------|
| `VITE_API_URL` | (Leave empty for now - will add after backend deployment) |

### 2.4 Deploy

Click **"Deploy"** and wait for deployment to complete.

**Save your Vercel URL**: `https://your-app-name.vercel.app`

---

## ⚙️ Step 3: Deploy Backend to Render

### 3.1 Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository

### 3.2 Configure Service

- **Name**: `silvermoon-backend`
- **Region**: Choose nearest to your users
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`
- **Instance Type**: Free

### 3.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://pdsilva496_db_user:4jL8YCFoDnyfeFaY@couple-app.vxmmkoi.mongodb.net/couple-app?retryWrites=true&w=majority&appName=couple-app` |
| `AI_SERVICE_URL` | (Leave empty - will add after Python service deployment) |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://your-app-name.vercel.app` (from Step 2.4) |
| `NODE_VERSION` | `22.12.0` |

### 3.4 Deploy

Click **"Create Web Service"** and wait for deployment.

**Save your Render Backend URL**: `https://silvermoon-backend.onrender.com`

---

## 🐍 Step 4: Deploy Python AI Service to Render

### 4.1 Create requirements.txt

First, create a `requirements.txt` file in `resolve-ai-service` folder:

```bash
cd resolve-ai-service
```

Create file: `requirements.txt` with content:
```
fastapi==0.115.6
uvicorn==0.34.0
pydantic==2.10.5
```

### 4.2 Create New Web Service

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select your repository again

### 4.3 Configure Service

- **Name**: `silvermoon-ai-service`
- **Region**: Same as backend
- **Root Directory**: `resolve-ai-service`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- **Instance Type**: Free

### 4.4 Deploy

Click **"Create Web Service"**.

**Save your Python Service URL**: `https://silvermoon-ai-service.onrender.com`

---

## 🔗 Step 5: Update Environment Variables

### 5.1 Update Backend Environment Variables

Go to your backend service on Render → **Environment** → Edit:

| Name | Value |
|------|-------|
| `AI_SERVICE_URL` | `https://silvermoon-ai-service.onrender.com` (from Step 4.4) |

Click **"Save Changes"** (backend will auto-redeploy)

### 5.2 Update Frontend Environment Variables

Go to Vercel → Your Project → **Settings** → **Environment Variables** → Edit:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://silvermoon-backend.onrender.com` (from Step 3.4) |

Click **"Save"**

### 5.3 Redeploy Frontend

Go to **Deployments** tab → Click on latest deployment → **"Redeploy"**

---

## ✅ Step 6: Test Your Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test the application:
   - Enter a problem
   - Click "Find Solution"
   - Test feedback buttons (👍/👎)
3. Check MongoDB Atlas to verify data is being saved

---

## 🛠️ Common Issues & Fixes

### Issue: "Could not connect to backend"
- Check backend logs in Render dashboard
- Verify `VITE_API_URL` in Vercel matches your Render backend URL
- Ensure `FRONTEND_URL` in backend includes your Vercel URL for CORS

### Issue: "AI Service offline"
- Check Python service logs in Render
- Verify `AI_SERVICE_URL` in backend environment variables
- Ensure Python service is running (check Render dashboard)

### Issue: Free tier services sleep after 15 minutes
- Render free tier services sleep after inactivity
- First request after sleep takes 30-60 seconds
- Solution: Upgrade to paid tier or use a service like UptimeRobot to ping your services

---

## 📱 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://silvermoon-backend.onrender.com`
- **Python AI**: `https://silvermoon-ai-service.onrender.com`

---

## 🔒 Security Notes

1. **MongoDB Credentials**: Already using environment variables ✅
2. **CORS**: Configured to only allow your frontend URL ✅
3. **API Keys**: Add authentication if making this public
4. **HTTPS**: All Vercel and Render deployments use HTTPS by default ✅

---

## 📊 Monitoring

- **Vercel Analytics**: Check traffic and performance
- **Render Logs**: Monitor backend and Python service logs
- **MongoDB Atlas**: Monitor database usage and queries

---

## 🎉 Congratulations!

Your SilverMoonAI app is now live! Share the Vercel URL with users to start collecting data.

Need help? Check the logs in Vercel and Render dashboards for debugging.
