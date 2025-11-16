# AI-Generated Wellness Recommendation Board

A beautiful, personalized wellness app that uses AI to generate tailored health and wellness recommendations based on your profile and goals.

## ✨ Features

- **Personalized Profile**: Enter your age, gender, and wellness goal to receive customized recommendations
- **AI-Powered Tips**: Get 5 actionable wellness tips generated specifically for you
- **Detailed Guidance**: Tap any tip to see in-depth explanations and a step-by-step action plan
- **Favorites System**: Save your favorite tips locally for easy access later
- **Regenerate**: Get fresh recommendations anytime with one click
- **Beautiful Design**: Calming teal and coral colors with smooth animations

## 🎯 Wellness Goals

Choose from multiple goals:
- ⚖️ Weight Loss
- 🧘 Stress Relief  
- 😴 Better Sleep
- ⚡ Energy Boost
- 💪 Fitness
- 🧠 Mental Clarity

## 🏗️ Architecture

### Frontend
- **React + TypeScript**: Modern, type-safe component architecture
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Global state management for user profile, tips, and favorites
- **Local Storage**: Persistent favorites across sessions
- **Tailwind CSS**: Utility-first styling with custom design system
- **shadcn/ui**: Beautiful, accessible UI components

### Backend (Lovable Cloud)
- **Edge Function**: `generate-wellness-tips` handles all AI requests
- **Lovable AI Gateway**: Powered by Google Gemini 2.5 Flash model
- **Two AI Operations**:
  - Generate 5 personalized wellness tips
  - Expand specific tips with details and action plans

### File Structure

```
src/
├── components/
│   ├── ProfileForm.tsx      # User profile intake
│   ├── TipsDisplay.tsx      # Grid of wellness tip cards
│   ├── TipDetail.tsx        # Detailed tip view with action plan
│   └── Favorites.tsx        # Saved tips management
├── contexts/
│   └── WellnessContext.tsx  # Global state provider
├── types/
│   └── wellness.ts          # TypeScript interfaces
├── pages/
│   ├── Profile.tsx          # Profile entry page
│   ├── Tips.tsx             # Tips listing page
│   ├── TipDetails.tsx       # Individual tip detail page
│   └── FavoritesPage.tsx    # Favorites collection page
└── App.tsx                  # Main app with routing

supabase/
└── functions/
    └── generate-wellness-tips/
        └── index.ts         # AI edge function
```

## 🎨 Design System

The app uses a carefully crafted wellness-themed design system:

**Colors:**
- Primary (Teal): `hsl(175 60% 45%)` - Calming, trustworthy
- Secondary (Coral): `hsl(15 85% 65%)` - Motivational, energizing
- Accent (Purple): `hsl(265 60% 70%)` - Mindfulness, clarity

**Custom Gradients:**
- Hero backgrounds with subtle color transitions
- Button gradients for visual appeal
- Card shadows with teal glow effects

## 🚀 Getting Started

### Prerequisites
- Node.js & npm installed
- Lovable Cloud enabled (automatic with this project)

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:8080 in your browser

## 🔧 Configuration

The app is pre-configured with:
- Lovable Cloud backend
- Lovable AI Gateway (Google Gemini 2.5 Flash)
- LOVABLE_API_KEY (auto-configured as Supabase secret)

No additional API keys or configuration required!

## 💡 AI Prompt Examples

### Generating Tips
```
Generate exactly 5 concise, actionable wellness tips for a 
30-year-old female aiming for stress reduction and relaxation.

For each tip, provide:
1. A short, catchy title (max 6 words)
2. A one-sentence summary (max 15 words)  
3. A relevant emoji icon
```

### Expanding Details
```
Provide detailed information about the wellness tip: "Morning Meditation Practice"

Include:
1. A detailed explanation (2-3 paragraphs)
2. A practical 3-5 step action plan with specific daily steps
```

## 🎯 User Flow

1. **Profile Entry** (`/`)
   - User enters age, gender, and wellness goal
   - Form validation ensures valid inputs
   - Navigates to tips display

2. **Tips Display** (`/tips`)
   - AI generates 5 personalized tips
   - Cards show icon, title, and summary
   - Click any card to view details
   - "Regenerate" button for new tips
   - Heart icon shows access to favorites

3. **Tip Details** (`/tip/:id`)
   - Full explanation of the tip
   - Step-by-step action plan
   - Save/unsave to favorites
   - Back button to tips list

4. **Favorites** (`/favorites`)
   - View all saved tips
   - Remove tips from favorites
   - Click tips to view details
   - Shows save date for each tip

## 🔒 Data Persistence

- **User Profile**: Stored in React Context (session only)
- **Generated Tips**: Stored in React Context (session only)
- **Favorites**: Persisted to localStorage (permanent)

## 🎨 Styling Approach

The app follows a "design system first" approach:
- All colors defined as CSS variables in `index.css`
- Custom Tailwind utilities for gradients and animations
- No inline styles or ad-hoc color values
- Consistent spacing and typography
- Smooth transitions and hover effects

## 📱 Responsive Design

- Mobile-first approach
- Cards stack on mobile, grid on desktop
- Touch-friendly button sizes
- Optimized for all screen sizes

## 🚨 Error Handling

The app gracefully handles:
- AI rate limiting (429 errors)
- Usage limits (402 errors)
- Invalid AI responses
- Network failures
- Missing profile data

## 🔮 Future Enhancements

Potential features to add:
- User authentication for cloud-synced favorites
- Progress tracking over time
- Social sharing of tips
- More wellness goal categories
- Personalized tip scheduling/reminders
- Integration with health tracking apps

## 📊 AI Model Details

**Model**: Google Gemini 2.5 Flash
- Fast, cost-efficient
- Excellent at conversational responses
- Good balance of quality and speed
- Perfect for wellness recommendations

**Temperature**: 0.8 (creative but consistent)

## 🐛 Known Issues

- Tips and profile don't persist across sessions (by design)
- Regenerating while on detail page doesn't update current tip
- No undo for removing favorites

## 📝 License

This project was created with Lovable.dev - AI-powered web app builder.

## 🙋 Support

For issues or questions:
- Check the Lovable docs: https://docs.lovable.dev
- Join the Lovable community: https://discord.gg/lovable
- View your backend: Click "Cloud" tab in Lovable editor

---

Built with ❤️ using Lovable, React, TypeScript, and AI
