"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mic, Send, Bot, User, MicOff, Sparkles, BarChart3, FileText } from "lucide-react"

interface VoiceChatScreenProps {
  onBack: () => void
  onOpenAI: (context: { type: string; content: string }) => void
}

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: string
  isVoice?: boolean
}

export function VoiceChatScreen({ onBack, onOpenAI }: VoiceChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your voice assistant. You can type or speak to me. Try saying something like 'Remind me to call John at 3 PM' or 'Create a note about my meeting ideas'.",
      sender: "assistant",
      timestamp: "10:30 AM",
    },
  ])
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const sendMessage = () => {
    if (!inputText.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMessage])
    setInputText("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: messages.length + 2,
        text: getAssistantResponse(inputText),
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, assistantResponse])
    }, 1000)
  }

  const getAssistantResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("remind")) {
      return "I've created a reminder note for you! It's been saved to your notes with the 'reminder' tag."
    } else if (message.includes("meeting") || message.includes("work")) {
      return "I've created a work note for you. Would you like me to add any specific tags or set a reminder?"
    } else if (message.includes("shopping") || message.includes("buy")) {
      return "I've created a shopping list note. You can add more items anytime by speaking to me!"
    } else {
      return "I've saved that as a note for you. Is there anything else you'd like me to help you remember?"
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    setIsListening(!isListening)

    if (!isRecording) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false)
        setIsRecording(false)
        setInputText("Remind me to drink water every 2 hours")
      }, 3000)
    }
  }

  const handleAIAction = (action: string) => {
    const conversationContext = messages.map((m) => `${m.sender}: ${m.text}`).join("\n")
    onOpenAI({
      type: action,
      content: conversationContext,
    })
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-green-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-semibold text-gray-800">Voice Assistant</h1>
          <p className="text-xs text-gray-600">Speak or type your thoughts</p>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => handleAIAction("summarize-chat")}>
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleAIAction("convert-to-note")}>
            <FileText className="w-4 h-4 text-blue-500" />
          </Button>
        </div>
      </div>

      {/* AI Quick Actions */}
      <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 border-b border-green-200">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAIAction("summarize-chat")}
            className="bg-white/80 whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Summarize Chat
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAIAction("extract-tasks")}
            className="bg-white/80 whitespace-nowrap"
          >
            Extract Tasks
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAIAction("mood-analysis")}
            className="bg-white/80 whitespace-nowrap"
          >
            Mood Analysis
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user" ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <Card
                className={`p-3 ${
                  message.sender === "user" ? "bg-orange-500 text-white" : "bg-white border-green-200"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-orange-100" : "text-gray-500"}`}>
                  {message.timestamp}
                </p>
              </Card>
            </div>
          </div>
        ))}

        {isListening && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <Card className="p-3 bg-white border-green-200">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">Listening...</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-green-200">
        <div className="flex items-center space-x-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            onClick={toggleRecording}
            className={`rounded-full ${isRecording ? "animate-pulse" : ""}`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
          <Input
            placeholder="Type or speak your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 rounded-full bg-white border-green-200"
            disabled={isRecording}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || isRecording}
            className="rounded-full bg-green-500 hover:bg-green-600"
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
