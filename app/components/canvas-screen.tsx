"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Save,
  Undo,
  Redo,
  Eraser,
  PenTool,
  Highlighter,
  Type,
  Download,
  Plus,
  Sparkles,
  Network,
  Link,
} from "lucide-react"

interface CanvasScreenProps {
  onBack: () => void
  onNavigate: (screen: string, note?: any) => void
  onOpenAI: (context: { type: string; content: string }) => void
}

export function CanvasScreen({ onBack, onNavigate, onOpenAI }: CanvasScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState<"pen" | "highlighter" | "eraser">("pen")
  const [currentColor, setCurrentColor] = useState("#000000")
  const [brushSize, setBrushSize] = useState(3)
  const [showColorPalette, setShowColorPalette] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 })
  const [showAITools, setShowAITools] = useState(false)

  const colors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set initial canvas background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    if (currentTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
      ctx.lineWidth = brushSize * 3
    } else {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
      ctx.globalAlpha = currentTool === "highlighter" ? 0.5 : 1
    }

    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const addTextNote = (e: React.MouseEvent) => {
    if (currentTool !== "pen") return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTextPosition({ x, y })
    setShowTextInput(true)
  }

  const addText = (text: string) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.font = "16px Arial"
    ctx.fillStyle = currentColor
    ctx.fillText(text, textPosition.x, textPosition.y)

    setShowTextInput(false)
  }

  const handleAIAnalyze = () => {
    onOpenAI({
      type: "canvas",
      content: "Canvas drawing with various sketches and diagrams",
    })
  }

  const convertToNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Canvas Note",
      content: "Converted from canvas drawing",
      type: "canvas" as const,
      tags: ["drawing", "sketch"],
      date: "Just now",
      color: "bg-purple-100",
    }
    onNavigate("note-view", newNote)
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-purple-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-semibold text-gray-800">Digital Canvas</h1>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setShowAITools(!showAITools)}>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo className="w-4 h-4" />
          </Button>
          <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      {/* AI Tools Panel */}
      {showAITools && (
        <div className="p-3 bg-gradient-to-r from-purple-100 to-indigo-100 border-b border-purple-200">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <Button size="sm" variant="outline" onClick={handleAIAnalyze} className="bg-white/80 whitespace-nowrap">
              <Sparkles className="w-3 h-3 mr-1" />
              Analyze Drawing
            </Button>
            <Button size="sm" variant="outline" onClick={convertToNote} className="bg-white/80 whitespace-nowrap">
              <Type className="w-3 h-3 mr-1" />
              Convert to Note
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigate("mind-map")}
              className="bg-white/80 whitespace-nowrap"
            >
              <Network className="w-3 h-3 mr-1" />
              Add to Graph
            </Button>
            <Button size="sm" variant="outline" className="bg-white/80 whitespace-nowrap">
              <Link className="w-3 h-3 mr-1" />
              Smart Link
            </Button>
          </div>
        </div>
      )}

      {/* Tools */}
      <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border-b border-purple-200">
        <div className="flex items-center space-x-2">
          <Button variant={currentTool === "pen" ? "default" : "ghost"} size="sm" onClick={() => setCurrentTool("pen")}>
            <PenTool className="w-4 h-4" />
          </Button>
          <Button
            variant={currentTool === "highlighter" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTool("highlighter")}
          >
            <Highlighter className="w-4 h-4" />
          </Button>
          <Button
            variant={currentTool === "eraser" ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentTool("eraser")}
          >
            <Eraser className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Type className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Brush Size */}
          <div className="flex items-center space-x-1">
            <div className="text-xs text-gray-600">Size:</div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16"
            />
          </div>

          {/* Color Picker */}
          <div className="relative">
            <Button variant="ghost" size="sm" onClick={() => setShowColorPalette(!showColorPalette)} className="p-1">
              <div className="w-6 h-6 rounded border-2 border-gray-300" style={{ backgroundColor: currentColor }} />
            </Button>

            {showColorPalette && (
              <Card className="absolute top-10 right-0 p-2 z-10">
                <div className="grid grid-cols-5 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setCurrentColor(color)
                        setShowColorPalette(false)
                      }}
                    />
                  ))}
                </div>
              </Card>
            )}
          </div>

          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-4">
        <div className="relative h-full bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onDoubleClick={addTextNote}
          />

          {/* Text Input Overlay */}
          {showTextInput && (
            <div
              className="absolute bg-white border border-gray-300 rounded p-2 shadow-lg"
              style={{ left: textPosition.x, top: textPosition.y }}
            >
              <input
                type="text"
                placeholder="Enter text..."
                className="border-none outline-none text-sm"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    addText(e.currentTarget.value)
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    addText(e.target.value)
                  } else {
                    setShowTextInput(false)
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-purple-200">
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            <Plus className="w-4 h-4 mr-1" />
            Add Sticky Note
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            Export as PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
