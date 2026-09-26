# Hotel Management System

A simple hotel booking web app.

- **Admins** add hotels and rooms, and see every booking.
- **Users** pick a city, location, hotel and room, then book it. The price fills in automatically.

| Part | Technology | Folder | Runs on |
|------|------------|--------|---------|
| Backend (API) | Node.js, Express, MongoDB (Mongoose), JWT login | `backend/` | http://localhost:3000 |
| Frontend (website) | Plain HTML, CSS, JavaScript | `frontend/` | http://localhost:5000 |

---

## 1. What you need to install first

| Tool | Why | Download |
|------|-----|----------|
| **Git** | To clone (download) the project | https://git-scm.com/downloads |
| **Node.js** (version 18 or newer) | To run the backend | https://nodejs.org (choose the LTS version) |
| **MongoDB Community Server** | The database | https://www.mongodb.com/try/download/community |

When you install MongoDB on Windows, keep **"Install MongoD as a Service"** ticked. MongoDB then starts automatically with Windows.

To check that everything is installed, open **PowerShell** and run:

```powershell
git --version
node -v
npm -v
```

Each command should print a version number.

---

## 2. Clone the project

Pick a folder to keep the project in (for example `D:\projects`), then run:

```powershell
cd D:\projects
git clone https://github.com/ADITYAAVISETTI/Hotel-Mangement.git
cd Hotel-Mangement
```

You should now see this structure:

```
Hotel-Mangement/
├── backend/      Express API: controllers/, model/, routes/, index.js
├── frontend/     Website: index.html, admin.html, user.html, …
├── CLAUDE.md
└── README.md
```

---

## 3. Set up the backend

### 3.1 Install the packages

```powershell
cd backend
npm install
```

This creates a `node_modules` folder. It takes a minute the first time.

### 3.2 Create the `.env` file

The backend reads its settings from a file called `.env` inside the `backend` folder. It is **not** on GitHub because it contains a secret key, so everyone who clones the project must create their own.

Create `backend/.env` with this content:

```
DB_CONNECT=mongodb://127.0.0.1:27017/HotelManagement
TOKEN_SECRET=put_any_long_random_text_here
PORT=3000
```

| Setting | Meaning |
|---------|---------|
| `DB_CONNECT` | Where MongoDB is. The value above is correct for MongoDB installed on your own computer. The database `HotelManagement` is created automatically. |
| `TOKEN_SECRET` | The secret used to sign login tokens. Type any long random text and don't share it. |
| `PORT` | The port the backend runs on. Keep it at `3000`, because the frontend expects this port. |

In PowerShell, you can create the file with one command (run it inside `backend`):

```powershell
"DB_CONNECT=mongodb://127.0.0.1:27017/HotelManagement`nTOKEN_SECRET=change_me_to_something_long_and_random`nPORT=3000" | Set-Content .env
```

### 3.3 Start the backend

```powershell
npm start
```

The backend is working when you see:

```
Server is up and running on port 3000
Connected to MongoDB
```

**Keep this window open.** Closing it stops the backend.

---

## 4. Start the frontend

Open a **second** PowerShell window:

```powershell
cd D:\projects\Hotel-Mangement\frontend
npx serve . -l 5000
```

(The first time, it may ask to install `serve`. Type `y`.)

Now open **http://localhost:5000** in your browser.

> You can also just double-click `frontend/index.html`, but using `npx serve` works more reliably.

---

## 5. How to use the app

### Step 1: Create an admin account
1. On the home page, open **Register**.
2. Enter a name (at least 3 letters), an email, and a password (at least 6 characters).
3. Turn on the **admin toggle** until it shows **"Registering as: Admin"**.
4. Click **Register**.

### Step 2: Log in as admin
1. Open **Login** and enter the same email and password.
2. Turn on the **admin toggle** until it shows **"Logging in as: Admin"**. The role must match the one you registered with.
3. You land on the **Admin Dashboard**.

### Step 3: Add a hotel (admin)
1. Click **Hotels**.
2. Choose a city (Hyderabad, Bangalore, Mumbai, Delhi or Chennai), then enter the hotel name, amenities and location.
3. Save. The hotel appears in the table.

### Step 4: Add rooms (admin)
1. Click **Rooms**.
2. Select the city, location and hotel, then enter the room type (e.g. Deluxe), capacity, bed configuration and price.
3. Save. Add as many rooms as you like.

### Step 5: Book a room (user)
1. Log out, then **register** a second account with the admin toggle **off** (a regular user).
2. Log in with the toggle **off**. You land on the **User Dashboard**.
3. Click **Booking**, then choose the city, location, hotel and room type. The **price fills in automatically**.
4. Submit. The booking appears in your booking list, where you can edit or delete it.

Admins can see **all** bookings from the dashboard.

---

## 6. Starting the app again later

Every time you want to use the app, open two PowerShell windows:

**Window 1 (backend):**
```powershell
cd D:\projects\Hotel-Mangement\backend
npm start
```

**Window 2 (frontend):**
```powershell
cd D:\projects\Hotel-Mangement\frontend
npx serve . -l 5000
```

Then open http://localhost:5000. To stop either one, press **Ctrl + C** in its window.

---

## 7. Getting the latest changes from GitHub

```powershell
cd D:\projects\Hotel-Mangement
git pull
cd backend
npm install
```

Run `npm install` again whenever `backend/package.json` changes.

---

## 8. Common problems

| Problem | Cause and fix |
|---------|---------------|
| `npm error enoent Could not read package.json` | You're in the wrong folder. Run `cd backend` first. |
| ``The `uri` parameter to `openUri()` must be a string, got "undefined"`` | The `backend/.env` file is missing or misspelled. Create it as shown in step 3.2, then restart with `npm start` (or type `rs` in the nodemon window). |
| `MongoDB connection error … ECONNREFUSED 127.0.0.1:27017` | MongoDB isn't running. Press Win+R, type `services.msc`, find **MongoDB Server** and click **Start**. |
| `Error: listen EADDRINUSE :::3000` | The backend is already running in another window. Close that window, or press Ctrl+C in it. |
| Login fails with `Invalid role` | The admin toggle must match the role you registered with. |
| Login fails with `Email not found` / `Invalid Password` | Check the email and password, or register again. |
| The website loads but no data appears | The backend isn't running. Check window 1, and press F12 → Console in the browser to see the error. |
| `Deletion of directory 'frontend' failed` during a git command | A server is still running inside that folder. Stop both servers (Ctrl+C), then try again. |

---

## 9. API reference (for developers)

Base URL: `http://localhost:3000`

| Method | URL | What it does |
|--------|-----|--------------|
| POST | `/api/user/register` | Register a user. Body: `name`, `email`, `password`, `role` (`user` or `admin`) |
| POST | `/api/user/login` | Log in. Body: `email`, `password`, `role`. Returns `{ token, username }` |
| GET / POST | `/hotel` | List all hotels / add a hotel |
| GET / PUT / DELETE | `/hotel/:id` | Get / update / delete one hotel |
| GET | `/hotel/search/:area` | Hotels in a city |
| GET | `/hotel/search/:area/:location` | Hotels in a city and location |
| GET / POST | `/rooms` | List all rooms / add a room |
| PUT / DELETE | `/rooms/:room_id` | Update / delete a room |
| GET | `/rooms/:location/:hotelName` | Rooms of one hotel |
| GET | `/rooms/:location/:hotelName/:roomType` | Price of a room type: `{ price }` |
| GET / POST | `/bookings` | List all bookings / create a booking |
| GET | `/bookings/:name` | Bookings made by one user |
| PUT / DELETE | `/bookings/:id` | Update / delete a booking |

### Project structure

```
backend/
├── index.js          Starts the server and connects to MongoDB
├── validation.js     Checks register/login input (Joi)
├── model/            Database schemas: user, hotel, rooms, booking
├── controllers/      Logic for hotels, rooms, bookings
└── routes/           URL definitions + JWT check (verifyToken.js)

frontend/
├── index.html        Login / register page (assets/js/main.js)
├── admin.html        Admin dashboard
├── user.html         User dashboard
├── hotel.html/.js    Manage hotels (admin)
├── rooms.html/.js    Manage rooms (admin)
├── booking.html/.js  Make and view bookings
└── assets/           CSS, images, main.js
```
