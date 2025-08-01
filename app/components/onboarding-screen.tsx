"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PenTool, Mic, Type, Sparkles } from "lucide-react"

interface OnboardingScreenProps {
  onComplete: () => void
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mb-4 mx-auto">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: "serif" }}>
          स्मृति
        </h1>
        <p className="text-lg text-gray-600 font-medium">Smriti</p>
        <p className="text-sm text-gray-500 mt-1">Capture Your Thoughts, Your Way</p>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4 mb-8 w-full">
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Type className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Rich Text Notes</h3>
              <p className="text-sm text-gray-600">Write and format your thoughts</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Voice Assistant</h3>
              <p className="text-sm text-gray-600">Chat and speak your notes</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <PenTool className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Digital Canvas</h3>
              <p className="text-sm text-gray-600">Draw and sketch freely</p>
            </div>
          </div>
        </Card>
      </div>

      <Button
        onClick={onComplete}
        className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white font-semibold py-3 rounded-xl"
      >
        Get Started
      </Button>
    </div>
  )
}
