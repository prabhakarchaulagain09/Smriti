# Smriti (स्मृति)

**Smriti** is a modern, multi-modal, AI-enhanced note-taking app inspired by Sanskrit heritage. It empowers users to capture, organize, and explore their thoughts using text, voice, freehand drawing, and interactive mind maps — all seamlessly connected by intelligent AI features.

---

## 🚀 Key Features

### Multi-Modal Note Taking
- **Text Notes:** Rich text editor with tagging and voice dictation support
- **Voice/Chat Notes:** WhatsApp-style interface for voice and text-based note entry
- **Canvas Drawing:** Full-featured freehand drawing with pen, highlighter, eraser, and color options
- **Mind Map Visualization:** Interactive graph view of notes with draggable nodes and AI-powered connection suggestions

### AI-Powered Enhancements (via Gemini API)
- **AI Assistant ("Smriti Sahaayak"):** Context-aware AI that summarizes notes, suggests tags, expands ideas, and analyzes mood
- **Smart Linking:** Automatically identifies related notes and suggests backlinks for a connected knowledge base
- **Daily/Weekly Digest:** Generates summaries and highlights to review your progress
- **Canvas & Voice Note Analysis:** Converts drawings and speech into actionable note content

### User Experience
- Sanskrit-inspired branding with Devanagari typography (स्मृति)
- Clean, minimal UI with warm amber gradients and rounded components
- Dark and light theme support
- Responsive, mobile-first design optimized for touch interaction
- Settings to customize AI behavior, theme, and integrations

### Integrations
- WhatsApp integration toggle for note creation and retrieval
- Cloud sync support (optional; configurable backend)

---

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prabhakarchaulagain09/Smriti.git
   cd Smriti
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```
   
   Add the following environment variables:
   ```env
   # AI Features (Optional - for full AI functionality)
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Database (Optional - for data persistence)
   DATABASE_URL=your_database_url_here
   
   # Authentication (Optional - for user accounts)
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Install shadcn/ui components**
   
   The app uses shadcn/ui components. Initialize shadcn/ui:
   ```bash
   npx shadcn@latest init
   ```
   
   Install required components:
   ```bash
   npx shadcn@latest add button card input textarea badge switch separator
   npx shadcn@latest add dropdown-menu tooltip sheet collapsible
   ```

### Running the Application

1. **Development mode**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

2. **Production build**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

### 🤖 AI Features Setup (Optional)

To enable AI-powered features like the Smriti Sahaayak assistant:

1. **Get a Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env.local` file

2. **Configure AI Settings**
   - Launch the app and go to Settings
   - Navigate to "AI Assistant (Sahaayak)" section
   - Click "Connect" next to Gemini API Connection
   - Enable desired AI features (auto-tagging, summaries, etc.)

### 📱 Mobile Development

For the best mobile experience:

1. **Enable mobile viewport**
   - Open browser developer tools (F12)
   - Toggle device toolbar (Ctrl+Shift+M)
   - Select a mobile device preset

2. **PWA Installation** (Coming Soon)
   - The app will support Progressive Web App features
   - Install directly from your mobile browser

### 🗂️ Project Structure

```
smriti-notes-app/
├── app/
│   ├── components/          # React components
│   │   ├── onboarding-screen.tsx
│   │   ├── home-screen.tsx
│   │   ├── mind-map-screen.tsx
│   │   ├── ai-assistant-modal.tsx
│   │   └── ...
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Main app component
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
└── README.md
```

### 🎨 Customization

1. **Themes and Colors**
   - Edit `tailwind.config.ts` for color customization
   - Modify gradient backgrounds in component files
   - Update the Sanskrit logo styling in `onboarding-screen.tsx`

2. **AI Behavior**
   - Customize AI responses in `ai-assistant-modal.tsx`
   - Modify analysis types and suggestions
   - Adjust AI tone and personality

### 🔧 Troubleshooting

**Common Issues:**

1. **Dependencies not installing**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **shadcn/ui components not found**
   ```bash
   npx shadcn@latest add [component-name]
   ```

3. **AI features not working**
   - Check your Gemini API key in `.env.local`
   - Ensure the API key has proper permissions
   - Check browser console for error messages

4. **Mobile responsiveness issues**
   - The app is designed for mobile-first (max-width: 428px)
   - Test on actual mobile devices for best results

### 📚 Next Steps

Once you have the app running:

1. **Explore the Features**
   - Create your first note using the floating action button
   - Try voice recording and canvas drawing
   - Experiment with the AI assistant
   - Explore the Mind Map view

2. **Customize Your Experience**
   - Set up AI preferences in Settings
   - Choose your preferred note-taking style
   - Configure notifications and integrations

3. **Contribute**
   - Check out our [Contributing Guidelines](CONTRIBUTING.md)
   - Report bugs or suggest features via GitHub Issues
   - Join our community discussions

---

## 📦 Tech Stack

### Current Implementation
- **Frontend:** Next.js 15 with React 18
- **UI Components:** shadcn/ui with Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** Google Gemini API
- **Canvas Drawing:** HTML5 Canvas API
- **Voice Processing:** Web Speech API
- **Mind Map Visualization:** Custom Canvas implementation
- **State Management:** React useState and useContext

### Planned Integrations
- **Backend:** FastAPI or Django REST Framework
- **Database:** PostgreSQL or MongoDB
- **Voice Processing:** Google Cloud Speech-to-Text
- **Enhanced Mind Maps:** React Flow / D3.js / Vis.js
- **Advanced Canvas:** Fabric.js / Konva.js
- **Messaging Integration:** Twilio WhatsApp API

---

## 📈 Future Improvements & Ideas

- **Temporal Notes Map:** Visual timeline to track note evolution over time
- **Offline AI Mode:** Local LLM support for AI features without internet connection
- **End-to-End Encryption:** Enhanced privacy for sensitive notes
- **Wearable Companion App:** Quick voice notes and reminders via smartwatch integration
- **Wellness & Reflection Modes:** Guided journaling and mental health check-ins
- **Collaboration Features:** Share notes and mind maps with others in real time
- **Progressive Web App:** Full PWA support with offline functionality
- **Cross-Platform:** React Native mobile app for iOS and Android

---


## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development setup
- Pull request process
- Issue reporting guidelines

---



## 🙏 Acknowledgements

Special thanks to the open-source communities powering AI, UI, and note-taking frameworks.

- [Next.js](https://nextjs.org/) - The React framework for production
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Google Gemini](https://ai.google.dev/) - AI-powered features
- [Lucide](https://lucide.dev/) - Beautiful icons

---

**Ready to capture your thoughts? Let's get started! 🎉**

Feel free to contribute, suggest features, or report issues!  
Together, let's build **Smriti** — your intelligent, intuitive second brain. 🌿

