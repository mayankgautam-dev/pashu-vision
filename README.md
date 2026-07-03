<div align="center">

# 🐄 PashuVision

### AI-Powered Livestock Registration & Health Management System

An intelligent platform designed for Indian veterinary services to simplify livestock registration, breed identification, vaccination tracking, and digital health record management.

<img src="assets/banner.png" alt="PashuVision Banner" width="100%"/>

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

# 📖 Overview

**PashuVision** is an AI-powered livestock management platform developed to assist veterinarians, animal health workers, and government field staff in digitizing livestock records.

The application leverages **Google Gemini AI** to identify animal breeds from images while maintaining comprehensive digital records including ownership details, vaccinations, treatments, and health history.

Designed with real-world veterinary workflows in mind, PashuVision supports multilingual usage and offline-friendly data entry for rural environments.

---

# ✨ Features

### 🐮 AI Breed Identification
- Upload an animal photo
- Detect likely breed using AI
- Confidence score for predictions
- Breed-specific recommendations

### 📋 Animal Registration
- Register livestock digitally
- Store owner information
- Generate unique animal records
- Easy search and retrieval

### 💉 Vaccination Tracking
- Record vaccinations
- Maintain immunization history
- Track upcoming doses
- View complete vaccination timeline

### 🩺 Health Management
- Maintain treatment history
- Store medical records
- Monitor animal health
- Disease tracking

### 🌐 Multilingual Support
- User-friendly multilingual interface
- Suitable for rural veterinary workers

### 📱 Offline-Friendly Workflow
- Optimized forms
- Easy field usage
- Designed for low-connectivity environments

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Gemini AI | Breed Identification |
| CSS | Styling |

---

# 📂 Project Structure

```
PashuVision/
│
├── assets/
│   └── banner.png
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   └── App.tsx
│
├── .env.local
├── package.json
├── vite.config.ts
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure you have:

- Node.js (v16 or higher)
- npm

Check versions:

```bash
node -v
npm -v
```

---

# 📥 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/PashuVision.git
```

Move into the project

```bash
cd PashuVision
```

Install dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a file named:

```
.env.local
```

Add your Gemini API Key:

```env
GEMINI_API_KEY=your_api_key_here
```

> **Note:** Never commit your API keys to GitHub.

---

# ▶️ Run the Development Server

```bash
npm run dev
```

The application will be available at

```
http://localhost:5173
```

---

# 🏗 Build for Production

Build the application

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 📸 Application Workflow

```
Animal Photo
      │
      ▼
AI Breed Detection
      │
      ▼
Breed Prediction
      │
      ▼
Animal Registration
      │
      ▼
Owner Details
      │
      ▼
Vaccination Records
      │
      ▼
Health History
```

---

# 🔒 Security

- Keep API keys inside `.env.local`
- Do not commit secrets to version control
- Store credentials securely in production
- Use environment variables for configuration

---

# 🎯 Use Cases

- Government Veterinary Departments
- Livestock Health Monitoring
- Animal Husbandry Programs
- Dairy Farm Management
- Veterinary Clinics
- Rural Animal Health Workers

---

# 🤝 Contributing

Contributions are always welcome!

If you'd like to improve PashuVision:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

<div align="center">

### Made with ❤️ for Smarter Livestock Healthcare

**Empowering Veterinary Services through Artificial Intelligence**

</div>
