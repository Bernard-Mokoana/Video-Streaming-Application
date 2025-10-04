# StreamVidz Backend

Express + MongoDB backend for StreamVidz.

## Prerequisites

- Node.js 18+
- MongoDB (Atlas or local)
- Cloudinary account (for media uploads)

## Environment Variables

Create a `.env` in `Backend/` with:

```
PORT=8001
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net
DB_NAME=streamvidz
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=<strong-secret>
REFRESH_TOKEN_SECRET=<strong-secret>
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
```

## Install & Run

```bash
cd Backend
npm install
npm run dev
```

Server runs on `http://localhost:8001`.

## API Base

`/api/v1`

### Users

- `POST /users/register`
- `POST /users/login`
- `POST /users/logout` (auth)
- `POST /users/refresh-token`
- `POST /users/change-password` (auth)
- `GET /users/current-user` (auth)
- `PATCH /users/update-account` (auth)
- `PATCH /users/avatar` (auth, form-data avatar)
- `PATCH /users/cover-image` (auth, form-data coverImage)
- `GET /users/c/:username` (auth)
- `GET /users/history` (auth)

### Videos

- `GET /videos/`
- `POST /videos/upload` (auth, form-data: videoFile, thumbnailFile)
- `GET /videos/:videoId` (auth)
- `PATCH /videos/:videoId` (auth, optional form-data: thumbnailFile)
- `DELETE /videos/:videoId` (auth)
- `PATCH /videos/toggle/publish/:videoId` (auth)

## File Uploads

Temporary uploads are stored in `public/temp/` then uploaded to Cloudinary.
Max file size is 500MB for images/videos.

## Error Handling

Consistent JSON shape with `statusCode`, `message`, and optional `errors`.

## Scripts

- `npm run dev` – nodemon
- `npm start` – node

## Project Structure

```
src/
  app.js
  index.js
  db/
  middleware/
  models/
  controllers/
  routes/
  utils/
```
