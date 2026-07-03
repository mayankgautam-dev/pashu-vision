<div align="center"> <img width="1200" height="475" alt="PashuVision Banner" src="assets/banner.png" /> </div>
PashuVision

PashuVision is an AI-powered livestock registration and health management system built for Indian veterinary services. It helps field workers and veterinarians register animals, identify breeds from photos, track vaccinations, and maintain health records.
Key features

    Photo-based breed identification with confidence scoring
    Owner and animal registration workflow
    Vaccination and health record tracking
    Breed-specific guidance and suggestions
    Multilanguage support and offline-friendly forms

Run locally

Prerequisites: Node.js (16+ recommended) and npm

    Install dependencies: npm install
    Create a .env.local file in the project root and add your API key: GEMINI_API_KEY=your_api_key_here
    (The app reads process.env.GEMINI_API_KEY as used in vite.config.ts and services.)
    Run the development server: npm run dev

Build for production

    Build the app: npm run build
    Preview the production build locally: npm run preview

Configuration & notes

    Keep API keys and secrets out of source control. Use environment files (gitignored) or a secrets manager.
    The app expects GEMINI_API_KEY for the AI/breed-identification services used by the backend/frontend modules.
    Static assets and images are stored under public or assets. If you replace the banner, update the assets/banner.png path.
    Vite exposes the env value to the client via vite.config.ts (see process.env.GEMINI_API_KEY definition).

Contributing

Contributions, bug reports, and feature requests are welcome. Please open issues or pull requests with a clear description of the change.
License

This repository is open source. See the LICENSE file for details.
