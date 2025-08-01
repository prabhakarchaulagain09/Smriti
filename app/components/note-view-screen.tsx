"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Edit,
  Share,
  Trash2,
  MoreVertical,
  Type,
  Mic,
  PenTool,
  Clock,
  Tag,
  Play,
  Pause,
  Sparkles,
  Network,
  Link,
  BarChart3,
  Lightbulb,
} from "lucide-react"

interface Note {
  id: number
  title: string
  content: string
  type: "text" | "voice" | "canvas"
  tags: string[]
  date: string
  color: string
}

interface NoteViewScreenProps {
  note: Note | null
  onBack: () => void
  onNavigate: (screen: string, note?: any) => void
  onOpenAI: (context: { type: string; content: string }) => void
}

export function NoteViewScreen({ note, onBack, onNavigate, onOpenAI }: NoteViewScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(false)

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No note selected</p>
      </div>
    )
  }

  const getTypeIcon = () => {
    switch (note.type) {
      case "text":
        return <Type className="w-5 h-5 text-blue-600" />
      case "voice":
        return <Mic className="w-5 h-5 text-green-600" />
      case "canvas":
        return <PenTool className="w-5 h-5 text-purple-600" />
      default:
        return <Type className="w-5 h-5" />
    }
  }

  const getTypeColor = () => {
    switch (note.type) {
      case "text":
        return "from-blue-50 to-indigo-50"
      case "voice":
        return "from-green-50 to-emerald-50"
      case "canvas":
        return "from-purple-50 to-pink-50"
      default:
        return "from-gray-50 to-slate-50"
    }
  }

  const handleAIAction = (action: string) => {
    onOpenAI({
      type: "note",
      content: `${note.title}\n\n${note.content}`,
    })
  }

  return (
    <div className={`h-full flex flex-col bg-gradient-to-br ${getTypeColor()}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2">
          {getTypeIcon()}
          <span className="font-medium text-gray-700 capitalize">{note.type} Note</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => handleAIAction("analyze")}>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-gray-200">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{note.date}</span>
            </div>
            {note.tags.length > 0 && (
              <div className="flex items-center space-x-1">
                <Tag className="w-4 h-4" />
                <div className="flex space-x-1">
                  {note.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Quick Actions */}
          <div className="flex flex-wrap gap-2 mb-6 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <Button size="sm" variant="outline" onClick={() => handleAIAction("summarize")} className="bg-white/80">
              <BarChart3 className="w-3 h-3 mr-1" />
              Summarize
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleAIAction("expand")} className="bg-white/80">
              <Lightbulb className="w-3 h-3 mr-1" />
              Expand Ideas
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleAIAction("links")} className="bg-white/80">
              <Link className="w-3 h-3 mr-1" />
              Find Links
            </Button>
            <Button size="sm" variant="outline" onClick={() => onNavigate("mind-map")} className="bg-white/80">
              <Network className="w-3 h-3 mr-1" />
              View in Graph
            </Button>
          </div>

          {/* Note Content */}
          {note.type === "text" && (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          )}

          {note.type === "voice" && (
            <div className="space-y-4">
              <div className="bg-green-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-green-800">Voice Recording</span>
                  <span className="text-xs text-green-600">2:34</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1 bg-green-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">AI Transcription:</h3>
                  <Button size="sm" variant="outline" onClick={() => handleAIAction("improve-transcription")}>
                    <Sparkles className="w-3 h-3 mr-1" />
                    Improve
                  </Button>
                </div>
                <p className="text-gray-700">{note.content}</p>
              </div>
            </div>
          )}

          {note.type === "canvas" && (
            <div className="space-y-4">
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <PenTool className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                <p className="text-purple-800 font-medium">Canvas Drawing</p>
                <p className="text-sm text-purple-600 mt-1">{note.content}</p>
              </div>
              <div className="bg-white border-2 border-dashed border-purple-200 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">Canvas preview would appear here</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAIAction("describe-drawing")}
                  className="flex-1"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Describe Drawing
                </Button>
                <Button size="sm" variant="outline" onClick={() => onNavigate("mind-map")} className="flex-1">
                  <Network className="w-3 h-3 mr-1" />
                  Add to Graph
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" className="flex-1 bg-transparent">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
