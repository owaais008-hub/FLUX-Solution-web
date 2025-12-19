# Deployment Instructions

## Prerequisites

1. Node.js (version 16 or higher)
2. npm (comes with Node.js)
3. A Supabase account (https://supabase.com/)
4. A GitHub account (for GitHub Pages deployment)

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env` file in the root directory with your actual credentials:

```env
# Supabase Configuration
# Get these from your Supabase project dashboard
VITE_SUPABASE_URL=your-actual-project-url
VITE_SUPABASE_ANON_KEY=your-actual-anon-key

# EmailJS Configuration (optional, for contact form)
# Get these from your EmailJS dashboard
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# Application name
VITE_APP_NAME=Flux Solutions
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Test Locally

```bash
npm run dev
```

Visit http://localhost:5173 to see your application running locally.

### 4. Build for Production

```bash
npm run build
```

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This will automatically build your project and deploy it to GitHub Pages.

## Troubleshooting

### 404 Errors
If you encounter 404 errors:
1. Make sure all image references use properly encoded URLs (spaces should be %20)
2. Verify that all static assets are in the `public` directory
3. Check that the `base` path in `vite.config.ts` matches your GitHub Pages URL

### Database Connection Issues
If you see ERR_NAME_NOT_RESOLVED errors:
1. Verify your Supabase URL is correct
2. Ensure your Supabase project is properly configured
3. Check that your anon key is correct
4. Make sure your Supabase tables are created by running the migrations

### GitHub Pages Deployment Issues
If GitHub Pages shows a 404:
1. Go to your repository settings
2. Navigate to "Pages" section
3. Set the source to "GitHub Actions" or ensure the gh-pages branch is selected
4. Wait a few minutes for GitHub to process the deployment