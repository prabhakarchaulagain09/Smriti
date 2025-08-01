"use client"

import { useState } from "react"
import { OnboardingScreen } from "./components/onboarding-screen"
import { HomeScreen } from "./components/home-screen"
import { TextNoteScreen } from "./components/text-note-screen"
import { VoiceChatScreen } from "./components/voice-chat-screen"
import { CanvasScreen } from "./components/canvas-screen"
import { NoteViewScreen } from "./components/note-view-screen"
import { SettingsScreen } from "./components/settings-screen"
import { MindMapScreen } from "./components/mind-map-screen"
import { AIAssistantModal } from "./components/ai-assistant-modal"

export default function SmritiApp() {
  const [currentScreen, setCurrentScreen] = useState("onboarding")
  const [selectedNote, setSelectedNote] = useState(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiContext, setAiContext] = useState({ type: "", content: "" })

  const navigateToScreen = (screen: string, note?: any) => {
    setCurrentScreen(screen)
    if (note) setSelectedNote(note)
  }

  const openAIAssistant = (context: { type: string; content: string }) => {
    setAiContext(context)
    setShowAIAssistant(true)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return <OnboardingScreen onComplete={() => navigateToScreen("home")} />
      case "home":
        return <HomeScreen onNavigate={navigateToScreen} onOpenAI={openAIAssistant} />
      case "text-note":
        return <TextNoteScreen onBack={() => navigateToScreen("home")} onOpenAI={openAIAssistant} />
      case "voice-chat":
        return <VoiceChatScreen onBack={() => navigateToScreen("home")} onOpenAI={openAIAssistant} />
      case "canvas":
        return (
          <CanvasScreen
            onBack={() => navigateToScreen("home")}
            onNavigate={navigateToScreen}
            onOpenAI={openAIAssistant}
          />
        )
      case "note-view":
        return (
          <NoteViewScreen
            note={selectedNote}
            onBack={() => navigateToScreen("home")}
            onNavigate={navigateToScreen}
            onOpenAI={openAIAssistant}
          />
        )
      case "mind-map":
        return <MindMapScreen onBack={() => navigateToScreen("home")} onNavigate={navigateToScreen} />
      case "settings":
        return <SettingsScreen onBack={() => navigateToScreen("home")} />
      default:
        return <HomeScreen onNavigate={navigateToScreen} onOpenAI={openAIAssistant} />
    }
  }

  return (
    <div className="h-screen w-full max-w-sm mx-auto bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden relative">
      {renderScreen()}

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} context={aiContext} />
    </div>
  )
}
