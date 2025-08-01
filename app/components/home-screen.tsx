"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Plus,
  Type,
  Mic,
  PenTool,
  Settings,
  Grid3X3,
  List,
  Filter,
  Clock,
  Tag,
  Sparkles,
  Network,
  Brain,
} from "lucide-react"

interface HomeScreenProps {
  onNavigate: (screen: string, note?: any) => void
  onOpenAI: (context: { type: string; content: string }) => void
}

export function HomeScreen({ onNavigate, onOpenAI }: HomeScreenProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCreateMenu, setShowCreateMenu] = useState(false)

  const sampleNotes = [
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discussed project timeline and deliverables...",
      type: "text",
      tags: ["work", "meeting"],
      date: "2 hours ago",
      color: "bg-blue-100",
    },
    {
      id: 2,
      title: "Voice Reminder",
      content: "Remind me to call mom at 7 PM",
      type: "voice",
      tags: ["personal"],
      date: "1 day ago",
      color: "bg-green-100",
    },
    {
      id: 3,
      title: "Sketch Ideas",
      content: "App wireframe concepts",
      type: "canvas",
      tags: ["design", "ideas"],
      date: "3 days ago",
      color: "bg-purple-100",
    },
  ]

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "serif" }}>
              स्मृति
            </h1>
            <p className="text-sm text-gray-600">Your thoughts, organized</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenAI({ type: "daily-summary", content: "Generate daily summary" })}
              className="rounded-full"
            >
              <Sparkles className="w-5 h-5 text-purple-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate("mind-map")} className="rounded-full">
              <Network className="w-5 h-5 text-indigo-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onNavigate("settings")} className="rounded-full">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search notes..."
            className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 rounded-xl"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            onClick={() => onOpenAI({ type: "search-help", content: "Help me find notes" })}
          >
            <Brain className="w-4 h-4 text-purple-500" />
          </Button>
        </div>

        {/* Filter and View Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-full bg-white/80">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/80">
              <Tag className="w-4 h-4 mr-1" />
              Tags
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="w-8 h-8 rounded-lg"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="w-8 h-8 rounded-lg"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="px-4 mb-4">
        <Card className="p-3 bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">AI Insight</p>
              <p className="text-xs text-gray-600">You've been most productive on Tuesdays this month!</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenAI({ type: "insights", content: "Show me more insights" })}
            >
              View
            </Button>
          </div>
        </Card>
      </div>

      {/* Notes Grid/List */}
      <div className="flex-1 px-4 pb-20 overflow-y-auto">
        <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
          {sampleNotes.map((note) => (
            <Card
              key={note.id}
              className={`p-4 cursor-pointer hover:shadow-md transition-shadow bg-white/80 backdrop-blur-sm border-orange-200 ${note.color}`}
              onClick={() => onNavigate("note-view", note)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{note.title}</h3>
                <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                  {note.type === "text" && <Type className="w-2 h-2" />}
                  {note.type === "voice" && <Mic className="w-2 h-2" />}
                  {note.type === "canvas" && <PenTool className="w-2 h-2" />}
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{note.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {note.date}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-6 right-4">
        {showCreateMenu && (
          <div className="absolute bottom-16 right-0 space-y-2">
            <Button
              onClick={() => onNavigate("canvas")}
              className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 shadow-lg"
            >
              <PenTool className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate("voice-chat")}
              className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate("text-note")}
              className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
            >
              <Type className="w-5 h-5" />
            </Button>
          </div>
        )}
        <Button
          onClick={() => setShowCreateMenu(!showCreateMenu)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 shadow-lg"
        >
          <Plus className={`w-6 h-6 transition-transform ${showCreateMenu ? "rotate-45" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
