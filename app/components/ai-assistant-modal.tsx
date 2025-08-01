"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Sparkles, Send, Lightbulb, Link, BarChart3, Tag, FileText, Mic, Loader2 } from "lucide-react"

interface AIAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  context: { type: string; content: string }
}

interface AIResponse {
  type: "summary" | "suggestions" | "links" | "tags" | "mood" | "ideas"
  content: string
  data?: any
}

export function AIAssistantModal({ isOpen, onClose, context }: AIAssistantModalProps) {
  const [input, setInput] = useState("")
  const [responses, setResponses] = useState<AIResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"chat" | "analyze" | "suggest">("analyze")

  useEffect(() => {
    if (isOpen && context.content) {
      generateInitialAnalysis()
    }
  }, [isOpen, context])

  const generateInitialAnalysis = async () => {
    setIsLoading(true)

    // Simulate AI analysis
    setTimeout(() => {
      const mockResponses: AIResponse[] = []

      if (context.type === "note") {
        mockResponses.push({
          type: "summary",
          content:
            "This note discusses project planning and timeline management. Key themes include task delegation, milestone tracking, and resource allocation.",
        })

        mockResponses.push({
          type: "tags",
          content: "Suggested tags based on content analysis:",
          data: ["project-management", "planning", "deadlines", "team-coordination"],
        })

        mockResponses.push({
          type: "links",
          content: "Related notes you might want to connect:",
          data: [
            { title: "Meeting Notes - Q4 Planning", relevance: 95 },
            { title: "Team Structure Overview", relevance: 87 },
            { title: "Budget Allocation Draft", relevance: 73 },
          ],
        })

        mockResponses.push({
          type: "mood",
          content: "Tone Analysis: Professional and organized. Confidence level: High. Stress indicators: Low.",
        })
      }

      setResponses(mockResponses)
      setIsLoading(false)
    }, 1500)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    setIsLoading(true)

    // Add user message
    const userMessage = input
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIResponse = {
        type: "ideas",
        content: getAIResponse(userMessage),
      }

      setResponses((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("expand") || lowerMessage.includes("idea")) {
      return "Here are some ways to expand on this topic: 1) Break down into smaller actionable tasks, 2) Consider potential roadblocks and mitigation strategies, 3) Add timeline estimates for each phase, 4) Include stakeholder communication plan."
    } else if (lowerMessage.includes("summarize")) {
      return "Key points: Project planning requires systematic approach, clear timelines, and regular check-ins. Main focus areas are resource allocation, risk management, and team coordination."
    } else if (lowerMessage.includes("connect") || lowerMessage.includes("link")) {
      return "This note connects well with your meeting notes, budget planning documents, and team structure overview. I can help create automatic links between related concepts."
    } else {
      return "I can help you with summarizing content, generating ideas, suggesting connections, analyzing mood, or auto-tagging your notes. What would you like me to focus on?"
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="w-full max-w-sm bg-white rounded-t-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Smriti Sahaayak</h2>
              <p className="text-xs text-gray-600">AI Assistant</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <Button
            variant={activeTab === "analyze" ? "default" : "ghost"}
            size="sm"
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("analyze")}
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analyze
          </Button>
          <Button
            variant={activeTab === "suggest" ? "default" : "ghost"}
            size="sm"
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("suggest")}
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Suggest
          </Button>
          <Button
            variant={activeTab === "chat" ? "default" : "ghost"}
            size="sm"
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("chat")}
          >
            <Mic className="w-4 h-4 mr-1" />
            Chat
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
              <span className="ml-2 text-gray-600">Analyzing...</span>
            </div>
          )}

          {responses.map((response, index) => (
            <Card key={index} className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {response.type === "summary" && <FileText className="w-3 h-3 text-white" />}
                  {response.type === "tags" && <Tag className="w-3 h-3 text-white" />}
                  {response.type === "links" && <Link className="w-3 h-3 text-white" />}
                  {response.type === "mood" && <BarChart3 className="w-3 h-3 text-white" />}
                  {response.type === "ideas" && <Lightbulb className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 mb-2">{response.content}</p>

                  {response.type === "tags" && response.data && (
                    <div className="flex flex-wrap gap-1">
                      {response.data.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {response.type === "links" && response.data && (
                    <div className="space-y-2">
                      {response.data.map((link: any, i: number) => (
                        <div key={i} className="flex items-center justify-between bg-white/50 rounded p-2">
                          <span className="text-xs text-gray-700">{link.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {link.relevance}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Ask Sahaayak anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 rounded-full"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
