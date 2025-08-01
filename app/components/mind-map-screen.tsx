"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Plus,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize,
  Filter,
  Sparkles,
  Network,
  Type,
  Mic,
  PenTool,
} from "lucide-react"

interface MindMapScreenProps {
  onBack: () => void
  onNavigate: (screen: string, note?: any) => void
}

interface Node {
  id: string
  title: string
  type: "text" | "voice" | "canvas"
  x: number
  y: number
  connections: string[]
  tags: string[]
  color: string
}

export function MindMapScreen({ onBack, onNavigate }: MindMapScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      title: "Project Planning",
      type: "text",
      x: 200,
      y: 150,
      connections: ["2", "3"],
      tags: ["work", "planning"],
      color: "#3B82F6",
    },
    {
      id: "2",
      title: "Meeting Notes",
      type: "text",
      x: 100,
      y: 250,
      connections: ["1", "4"],
      tags: ["work", "meeting"],
      color: "#10B981",
    },
    {
      id: "3",
      title: "Design Ideas",
      type: "canvas",
      x: 300,
      y: 250,
      connections: ["1", "5"],
      tags: ["design", "creative"],
      color: "#8B5CF6",
    },
    {
      id: "4",
      title: "Voice Reminder",
      type: "voice",
      x: 50,
      y: 350,
      connections: ["2"],
      tags: ["personal"],
      color: "#F59E0B",
    },
    {
      id: "5",
      title: "Wireframes",
      type: "canvas",
      x: 350,
      y: 350,
      connections: ["3"],
      tags: ["design", "wireframe"],
      color: "#EF4444",
    },
  ])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [showAddNode, setShowAddNode] = useState(false)
  const [newNodeTitle, setNewNodeTitle] = useState("")
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    drawMindMap()
  }, [nodes, zoom, selectedNode])

  const drawMindMap = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set transform for zoom
    ctx.save()
    ctx.scale(zoom, zoom)

    // Draw connections first
    nodes.forEach((node) => {
      node.connections.forEach((connectionId) => {
        const connectedNode = nodes.find((n) => n.id === connectionId)
        if (connectedNode) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connectedNode.x, connectedNode.y)
          ctx.strokeStyle = "#E5E7EB"
          ctx.lineWidth = 2
          ctx.stroke()
        }
      })
    })

    // Draw nodes
    nodes.forEach((node) => {
      const isSelected = selectedNode === node.id

      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, isSelected ? 35 : 30, 0, 2 * Math.PI)
      ctx.fillStyle = node.color
      ctx.fill()

      if (isSelected) {
        ctx.strokeStyle = "#F97316"
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Node icon
      ctx.fillStyle = "white"
      ctx.font = "16px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const icon = node.type === "text" ? "T" : node.type === "voice" ? "🎤" : "✏️"
      ctx.fillText(icon, node.x, node.y)

      // Node title
      ctx.fillStyle = "#374151"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"

      const maxWidth = 80
      const words = node.title.split(" ")
      let line = ""
      let y = node.y + 45

      words.forEach((word) => {
        const testLine = line + word + " "
        const metrics = ctx.measureText(testLine)

        if (metrics.width > maxWidth && line !== "") {
          ctx.fillText(line, node.x, y)
          line = word + " "
          y += 15
        } else {
          line = testLine
        }
      })
      ctx.fillText(line, node.x, y)
    })

    ctx.restore()
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / zoom
    const y = (e.clientY - rect.top) / zoom

    // Check if clicked on a node
    const clickedNode = nodes.find((node) => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2)
      return distance <= 30
    })

    if (clickedNode) {
      setSelectedNode(clickedNode.id)
    } else {
      setSelectedNode(null)
    }
  }

  const handleNodeDoubleClick = () => {
    if (selectedNode) {
      const node = nodes.find((n) => n.id === selectedNode)
      if (node) {
        onNavigate("note-view", {
          id: Number.parseInt(node.id),
          title: node.title,
          type: node.type,
          tags: node.tags,
          content: `This is the content for ${node.title}`,
          date: "Today",
          color: `bg-${node.color.slice(1)}`,
        })
      }
    }
  }

  const addNewNode = () => {
    if (!newNodeTitle.trim()) return

    const newNode: Node = {
      id: (nodes.length + 1).toString(),
      title: newNodeTitle,
      type: "text",
      x: 200 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      connections: selectedNode ? [selectedNode] : [],
      tags: [],
      color: "#6B7280",
    }

    setNodes([...nodes, newNode])
    setNewNodeTitle("")
    setShowAddNode(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <Type className="w-4 h-4" />
      case "voice":
        return <Mic className="w-4 h-4" />
      case "canvas":
        return <PenTool className="w-4 h-4" />
      default:
        return <Type className="w-4 h-4" />
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-indigo-200">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h1 className="font-semibold text-gray-800 flex items-center">
            <Network className="w-5 h-5 mr-2" />
            Mind Map
          </h1>
          <p className="text-xs text-gray-600">Visual knowledge graph</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setShowAddNode(true)}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-sm border-b border-indigo-200">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-full bg-white/80">
            <Search className="w-4 h-4 mr-1" />
            Search
          </Button>
          <Button variant="outline" size="sm" className="rounded-full bg-white/80">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-gray-600 px-2">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Maximize className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mind Map Canvas */}
      <div className="flex-1 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          width={400}
          height={600}
          className="w-full h-full cursor-pointer"
          onClick={handleCanvasClick}
          onDoubleClick={handleNodeDoubleClick}
        />

        {/* AI Suggestions Overlay */}
        <div className="absolute top-4 right-4">
          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
            <Sparkles className="w-4 h-4 mr-1" />
            AI Suggest
          </Button>
        </div>

        {/* Selected Node Info */}
        {selectedNode && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="p-3 bg-white/90 backdrop-blur-sm border-indigo-200">
              {(() => {
                const node = nodes.find((n) => n.id === selectedNode)
                if (!node) return null

                return (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: node.color }}
                      >
                        {getTypeIcon(node.type)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 text-sm">{node.title}</h3>
                        <div className="flex space-x-1 mt-1">
                          {node.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onDoubleClick={handleNodeDoubleClick}>
                      Open
                    </Button>
                  </div>
                )
              })()}
            </Card>
          </div>
        )}
      </div>

      {/* Add Node Modal */}
      {showAddNode && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm p-4 bg-white">
            <h3 className="font-semibold text-gray-800 mb-3">Add New Node</h3>
            <Input
              placeholder="Node title..."
              value={newNodeTitle}
              onChange={(e) => setNewNodeTitle(e.target.value)}
              className="mb-3"
              autoFocus
            />
            <div className="flex space-x-2">
              <Button onClick={addNewNode} className="flex-1 bg-indigo-500 hover:bg-indigo-600">
                Add Node
              </Button>
              <Button variant="outline" onClick={() => setShowAddNode(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
