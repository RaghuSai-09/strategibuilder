# StrategiBuilder

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/RaghuSai-09/strategibuilder)

StrategiBuilder is a comprehensive web platform for a boutique insurance brokerage. It features a client-facing portal with a secure dashboard, a multi-step insurance application system, and an innovative ACORD form processor. The application is built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

-   **Secure Authentication:** Complete user authentication flow with registration, login, logout, and protected routes using JWT and middleware.
-   **Client Dashboard:** A personalized dashboard for users to manage applications, track status, and access insurance forms.
-   **Multi-Step Application Forms:** A dynamic and user-friendly multi-step form builder for submitting various types of insurance applications, such as Technology E&O.
-   **ACORD Form Processing:** A powerful feature allowing users to download blank ACORD forms, upload completed PDFs, and have the data automatically extracted and reviewed.
-   **PDF Data Extraction:** Leverages `pdf-lib` and other tools to parse and extract data from uploaded PDF forms, streamlining the application process.
-   **RESTful API:** A robust backend built with Next.js API Routes to handle authentication, application data, drafts, and PDF uploads.
-   **Modern Tech Stack:** Built with Next.js 14 App Router, TypeScript for type safety, and styled with Tailwind CSS.
-   **Responsive Design:** A fully responsive interface providing a seamless experience on all devices.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI & Animations:** [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
-   **Form Management:** [React Dropzone](https://react-dropzone.js.org/), [Zod](https://zod.dev/)
-   **PDF Processing:** [pdf-lib](https://pdf-lib.js.org/), [pdfjs-dist](https://mozilla.github.io/pdf.js/), [Tesseract.js](https://tesseract.projectnaptha.com/)

## Getting Started

### Prerequisites

-   Node.js (version 18 or later)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/raghusai-09/strategibuilder.git
    cd strategibuilder
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a local environment file `.env.local` and add necessary environment variables. Refer to `AUTH_IMPLEMENTATION.md` for guidance on required variables like `JWT_SECRET` and `DATABASE_URL`.

### Running the Development Server

Execute the following command to start the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To create a production-ready build, run:
```bash
npm run build
```
And to start the production server:
```bash
npm start
```

## Project Structure

The repository is organized following Next.js App Router conventions:

```
raghusai-09-strategibuilder/
├── src/
│   ├── app/
│   │   ├── (protected)/     # Protected dashboard, profile, and application routes
│   │   ├── api/             # API routes for backend logic
│   │   ├── auth/            # Authentication pages (login/register)
│   │   ├── page.tsx         # Main landing page
│   │   └── layout.tsx       # Root layout
│   ├── components/
│   │   ├── dashboard/       # Components for the user dashboard
│   │   ├── forms/           # Multi-step form and field components
│   │   ├── sections/        # Components for the landing page sections
│   │   └── ui/              # Reusable UI elements (Button, Card, etc.)
│   ├── config/
│   │   ├── acord-forms.ts   # Configuration for ACORD forms
│   │   └── forms/           # Configuration for multi-step application forms
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── hooks/
│   │   └── useScrollAnimation.ts # Custom hook for scroll animations
│   └── lib/
│       ├── pdf-extractor.ts # Logic for PDF data extraction
│       └── utils.ts         # Utility functions
├── middleware.ts            # Middleware for protecting routes
└── package.json             # Project dependencies and scripts
```

## Core Functionality

### Authentication

The authentication system is built using JWT. Mock API endpoints are located in `src/app/api/auth/`. The `middleware.ts` file handles route protection, redirecting unauthenticated users from protected routes and authenticated users from auth pages. A detailed guide for connecting a database and implementing the full authentication logic is available in `AUTH_IMPLEMENTATION.md`.

**Test Credentials (Mock):**
-   **Email:** `demo@example.com`
-   **Password:** `password123`

### Insurance Application Forms

The platform includes a dynamic multi-step form system for submitting insurance applications. The configuration for different insurance types (e.g., Technology E&O) and their corresponding steps and fields are defined in `src/config/forms/`. The `MultiStepForm` component orchestrates the user experience, including step-by-step validation, progress tracking, and auto-saving drafts.

### ACORD Form Processing

A key feature is the ability to process filled ACORD PDF forms.
1.  **Download:** Users can download blank ACORD forms from the `/dashboard/forms` library.
2.  **Upload:** Completed forms can be uploaded via the `/dashboard/forms/upload` page.
3.  **Extraction:** The `/api/forms/upload` endpoint uses the `pdf-lib` library to read the PDF structure and extract data from form fields.
4.  **Review:** The extracted data is presented to the user for review and editing before final submission, streamlining data entry for complex standard forms.

## License

© 2025 Strategi Builder LLC. All rights reserved.
