# DiaCare AI — Personalized Diabetic Medical Nutrition Therapy System

An enterprise-grade, clinical nutrition monorepo platform designed for diabetic patients (Type 1, Type 2, Pre-Diabetes, and Gestational Diabetes). 

Built with **Next.js 14 App Router**, **NestJS Modular Backend**, **Supabase PostgreSQL Database**, **NextAuth Credentials Authentication**, and deployed on **Vercel** with full code versioning on **GitHub**.

---

## Key Features

1. **Dedicated Marketing Landing Page** (`/`):
   - Interactive 24-Hour Glycemic Wave Simulator
   - Live Metabolic Calorie & Carbohydrate Target Calculator
   - Four Pillars of Diabetic Plaque & Glycemic Defense
   - Cultural Dietary Archetype Showcase

2. **Dedicated Main Application Portal** (`/dashboard`):
   - Real-time Patient Biomarker Overview (HbA1c, Fasting Blood Sugar, BMI, eGFR)
   - Glowing SVG Macronutrient Donut Visualizer (Mifflin-St Jeor Energy Split)
   - Interactive 24-Hour Glucose Stability Wave Curve
   - Today's Meal Timeline with Glycemic Load Badges

3. **Interactive Patient Intake Wizard** (`/patient-intake`):
   - 3-Step Guided Clinical Intake
   - Diabetes Subtype Calibration (Type 1, Type 2, Pre-DM, Gestational)
   - Comorbidity & Medication Safety Checks (Metformin, Insulin, Sulfonylureas, eGFR renal protection)
   - Cultural Archetype Selection (Mediterranean, South Asian/Indian, Low-Carb, DASH, Plant-Based)

4. **Dynamic 7-Day Meal Schedule & 1-Click Dish Swapper** (`/diet-plans`):
   - Day-by-day carbohydrate distribution (Breakfast dawn-phenomenon buffer, Lunch peak, Dinner taper, 10 PM Casein shield)
   - 1-Click Instant Dish Replacement Modal with equivalent glycemic index calibration
   - Full Recipe Cooking Guides with Step-by-Step Instructions

5. **Diabetic Recipe & Glycemic Index Library** (`/recipes`):
   - Curated low-glycemic recipes with exact GI, GL, fiber, and macro breakdowns
   - Filterable by category and therapeutic tags

6. **Smart Supermarket Grocery Guide** (`/grocery-list`):
   - Categorized by grocery store aisle (Produce, Marine EPA/DHA, Ancient Millets, Healthy Fats)
   - Interactive checklists and one-click printable format

7. **Clinical Summary & Printable PDF Report** (`/print-plan`):
   - Hospital-grade clean printable format for doctor/patient handover and fridge placement

---

## Tech Stack & Architecture

- **Monorepo**: Turborepo & npm workspaces
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Lucide Icons, Glassmorphism Design System
- **Backend API**: NestJS (TypeScript), Modular Services, DTOs, Swagger Docs (`/api/docs`)
- **Database**: PostgreSQL 17 on Supabase with Prisma ORM
- **Authentication**: NextAuth.js (Auth.js) Credentials Provider with bcrypt password hashing
- **Deployment**: Vercel Serverless Architecture
- **Version Control**: GitHub (`zfathimaa22/diacare-monorepo`)

---

## Repository Structure

```
diacare-monorepo/
├── apps/
│   ├── web/                     # Next.js App (Landing Page + Clinical Dashboard)
│   │   ├── app/
│   │   │   ├── (marketing)/    # Dedicated Landing Page
│   │   │   ├── (auth)/         # Login & Registration Pages
│   │   │   └── (dashboard)/    # Clinical Dashboard & Meal Planner
│   │   ├── components/visuals/ # GlycemicMeter, MacroDonutRing, Glucose24hCurve, MealCard
│   │   └── lib/                # Supabase, Auth, Clinical API Client
│   └── api/                    # NestJS API Backend Application
│       └── src/
│           ├── auth/           # Authentication Module
│           ├── clinical-engine/# Mifflin-St Jeor & Glycemic Calculation Service
│           ├── diet-plans/     # 7-Day Plan Generation Module
│           ├── patients/       # Patient Clinical Profile Service
│           ├── recipes/        # Diabetic Recipe Bank Module
│           └── prisma/         # Prisma Database Connection
├── packages/
│   ├── database/               # Prisma Schema & PostgreSQL Migration Scripts
│   └── shared-types/           # Shared TypeScript Interfaces
├── turbo.json                  # Turborepo Build Pipeline
├── vercel.json                 # Vercel Deployment Configuration
└── package.json
```

---

## Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/zfathimaa22/diacare-monorepo.git
cd diacare-monorepo

# Install dependencies
npm install

# Run the frontend development server
cd apps/web
npm run dev

# Run the backend API server
cd ../api
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.
