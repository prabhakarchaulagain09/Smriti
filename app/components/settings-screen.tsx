"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Moon,
  Sun,
  Globe,
  MessageCircle,
  Cloud,
  Shield,
  Bell,
  Palette,
  Download,
  Info,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react"

interface SettingsScreenProps {
  onBack: () => void
}

export function SettingsScreen({ onBack }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [whatsappIntegration, setWhatsappIntegration] = useState(false)
  const [cloudSync, setCloudSync] = useState(true)
  const [aiEnabled, setAiEnabled] = useState(true)
  const [aiAutoTag, setAiAutoTag] = useState(true)
  const [aiSummaries, setAiSummaries] = useState(true)
  const [aiTone, setAiTone] = useState("friendly")
  const [geminiConnected, setGeminiConnected] = useState(false)

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-gray-50 to-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-gray-800">Settings</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {/* App Info */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg" style={{ fontFamily: "serif" }}>
                स्मृ
              </span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Smriti</h2>
              <p className="text-sm text-gray-600">Version 2.0.0 - AI Enhanced</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Capture your thoughts with text, voice, and canvas - now powered by AI.
          </p>
        </Card>

        {/* AI Assistant Settings */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
            AI Assistant (Sahaayak)
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Enable AI Features</p>
                <p className="text-sm text-gray-600">Turn on AI-powered assistance</p>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>

            {aiEnabled && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">Gemini API Connection</p>
                      <p className="text-sm text-gray-600">{geminiConnected ? "Connected" : "Not connected"}</p>
                    </div>
                  </div>
                  <Button
                    variant={geminiConnected ? "outline" : "default"}
                    size="sm"
                    onClick={() => setGeminiConnected(!geminiConnected)}
                  >
                    {geminiConnected ? "Disconnect" : "Connect"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Auto-tagging</p>
                    <p className="text-sm text-gray-600">Automatically tag notes with AI</p>
                  </div>
                  <Switch checked={aiAutoTag} onCheckedChange={setAiAutoTag} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Daily Summaries</p>
                    <p className="text-sm text-gray-600">Get AI-generated note summaries</p>
                  </div>
                  <Switch checked={aiSummaries} onCheckedChange={setAiSummaries} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">AI Tone</p>
                    <p className="text-sm text-gray-600">How AI responds to you</p>
                  </div>
                  <div className="flex space-x-1">
                    {["formal", "friendly", "reflective"].map((tone) => (
                      <Badge
                        key={tone}
                        variant={aiTone === tone ? "default" : "secondary"}
                        className="cursor-pointer capitalize"
                        onClick={() => setAiTone(tone)}
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Mind Map Settings */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-indigo-500" />
            Mind Map & Graph View
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Auto-link Related Notes</p>
                <p className="text-sm text-gray-600">AI suggests connections between notes</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Graph Clustering</p>
                <p className="text-sm text-gray-600">Group related notes visually</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Appearance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                <div>
                  <p className="font-medium text-gray-800">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Language</p>
                  <p className="text-sm text-gray-600">English (US)</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Get notified about reminders</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">AI Insights</p>
                <p className="text-sm text-gray-600">Weekly AI-generated insights</p>
              </div>
              <Switch checked={true} onCheckedChange={() => {}} />
            </div>
          </div>
        </Card>

        {/* Integrations */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Integrations
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800">WhatsApp Integration</p>
                <p className="text-sm text-gray-600">Send notes via WhatsApp</p>
              </div>
            </div>
            <Switch checked={whatsappIntegration} onCheckedChange={setWhatsappIntegration} />
          </div>
        </Card>

        {/* Data & Privacy */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Data & Privacy
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cloud className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Cloud Sync</p>
                  <p className="text-sm text-gray-600">Sync notes across devices</p>
                </div>
              </div>
              <Switch checked={cloudSync} onCheckedChange={setCloudSync} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Export Data</p>
                  <p className="text-sm text-gray-600">Download all your notes</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">AI Data Processing</p>
                  <p className="text-sm text-gray-600">Allow AI to analyze your notes</p>
                </div>
              </div>
              <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2" />
            About
          </h3>
          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="text-left">
                <p className="font-medium text-gray-800">Privacy Policy</p>
                <p className="text-sm text-gray-600">How we protect your data</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="text-left">
                <p className="font-medium text-gray-800">Terms of Service</p>
                <p className="text-sm text-gray-600">App usage terms</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="text-left">
                <p className="font-medium text-gray-800">AI Ethics & Usage</p>
                <p className="text-sm text-gray-600">How AI features work</p>
              </div>
            </Button>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto">
              <div className="text-left">
                <p className="font-medium text-gray-800">Help & Support</p>
                <p className="text-sm text-gray-600">Get help using Smriti</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
