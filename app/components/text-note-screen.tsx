"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Mic, ImageIcon, Paperclip, Bold, Italic, List, Tag, X, Sparkles, Link } from "lucide-react"

interface TextNoteScreenProps {
  onBack: () => void
  onOpenAI: (context: { type: string; content: string }) => void
}

export function TextNoteScreen({ onBack, onOpenAI }: TextNoteScreenProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleAIAssist = () => {
    onOpenAI({
      type: "text-note",
      content: `Title: ${title}\nContent: ${content}`,
    })
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-gray-800">New Note</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleAIAssist}>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </Button>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Title */}
        <Input
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold border-none px-0 focus-visible:ring-0 placeholder:text-gray-400"
        />

        {/* AI Suggestions Bar */}
        {(title || content) && (
          <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <div className="flex-1 flex space-x-2 overflow-x-auto">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenAI({ type: "auto-tag", content: `${title} ${content}` })}
                className="bg-white/80 whitespace-nowrap"
              >
                Auto-tag
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenAI({ type: "expand", content: `${title} ${content}` })}
                className="bg-white/80 whitespace-nowrap"
              >
                Expand Ideas
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onOpenAI({ type: "find-links", content: `${title} ${content}` })}
                className="bg-white/80 whitespace-nowrap"
              >
                <Link className="w-3 h-3 mr-1" />
                Find Links
              </Button>
            </div>
          </div>
        )}

        {/* Formatting Toolbar */}
        <div className="flex items-center space-x-2 py-2 border-y border-gray-100">
          <Button variant="ghost" size="sm">
            <Bold className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Italic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <List className="w-4 h-4" />
          </Button>
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            className={isRecording ? "bg-red-100 text-red-600" : ""}
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ImageIcon className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>

        {/* Text Area */}
        <Textarea
          placeholder="Start writing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] border-none px-0 resize-none focus-visible:ring-0 placeholder:text-gray-400"
        />

        {/* Tags Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Add tags..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="flex-1 h-8 text-sm"
            />
            <Button size="sm" onClick={addTag} disabled={!newTag.trim()}>
              Add
            </Button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-500 text-white p-3 rounded-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
          Recording... Tap to stop
        </div>
      )}
    </div>
  )
}
