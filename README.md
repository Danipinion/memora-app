# 🌟 Memora - Your Smart Task Reminder

Welcome to **Memora**, your personal and group task reminder application designed to keep you on track and ahead of your deadlines. With Memora, you can create tasks, set reminders, manage groups, and never miss a deadline again. 

---

## 🚀 Features

- **Personal Task Management**: Create and manage your personal tasks privately.
- **Group Collaboration**: Create groups, add members, and collaborate on tasks together.
- **Admin Approval**: Groups require admin approval before they become active.
- **WhatsApp Reminders**: Get notified via WhatsApp one day before your tasks are due.
- **Task Tracking**: Easily check off completed tasks and monitor your progress.

---

## 🎨 Tech Stack

- **Frontend**: Next.js 14
- **Backend**: Node.js, Express
- **Database**: Prisma, PostgreSQL
- **Notification Service**: WhatsApp Bot Integration

---

## 📂 Project Structure

```bash
memora/
├── public/               # Static files
├── src/                  # Source files
│   ├── components/       # Reusable components
│   ├── pages/            # Next.js pages
│   ├── styles/           # Styling files
│   └── utils/            # Utility functions
├── prisma/               # Prisma schema and migrations
└── README.md             # Project documentation
```
## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Danipinion/memora.git
   ```
2. Navigate to the project directory:
    ```bash
   cd memora
   ```
3. Install dependencies:
    ```bash
   cd memora
   ```
4. Set up your environment variables in .env file:
    ```bash
   DATABASE_URL=your_database_url
   ```
5. Run database migrations:
    ```bash
   npx prisma migrate dev
   ```
6. Start the development server:
    ```bash
   npm run dev
   ```
    
---

## 🌍 Live Demo

Check out the live demo of Memora [here](https://memora-app-sigma.vercel.app/).

---

## 🛠️ Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new feature branch (git checkout -b feature/your-feature-name).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/your-feature-name).
5. Open a pull request.
