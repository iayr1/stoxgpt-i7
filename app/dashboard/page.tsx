"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface ChatMessage {
  id: string
  type: "user" | "ai"
  message: string
  timestamp: Date
}

export default function DashboardPage() {
  const [cryptoData, setCryptoData] = useState<MarketData[]>([])
  const [stockData, setStockData] = useState<MarketData[]>([])
  const [chartData, setChartData] = useState<number[]>([])
  const [showAIChat, setShowAIChat] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      message: "Welcome to StoxGPT! I'm your AI trading assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [selectedAsset, setSelectedAsset] = useState("BTC")
  const [tradeAmount, setTradeAmount] = useState("")
  const [portfolioValue, setPortfolioValue] = useState(2847650)

  useEffect(() => {
    const generateMarketData = () => {
      // Generate crypto data
      const cryptos = ["BTC", "ETH", "BNB", "ADA", "DOT", "MATIC"]
      const newCryptoData = cryptos.map((symbol) => ({
        symbol,
        price: Math.random() * 100000 + 10000,
        change: (Math.random() - 0.5) * 10000,
        changePercent: (Math.random() - 0.5) * 10,
      }))
      setCryptoData(newCryptoData)

      // Generate Indian stock data
      const stocks = ["RELIANCE", "TCS", "INFY", "HDFC", "ICICI", "SBI"]
      const newStockData = stocks.map((symbol) => ({
        symbol,
        price: Math.random() * 5000 + 500,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 5,
      }))
      setStockData(newStockData)

      // Generate chart data
      const data = Array.from({ length: 50 }, (_, i) => {
        const base = 50 + Math.sin(i * 0.2) * 20
        const noise = Math.random() * 15 - 7.5
        return Math.max(10, Math.min(90, base + noise))
      })
      setChartData(data)

      // Update portfolio value
      setPortfolioValue((prev) => prev + (Math.random() - 0.5) * 10000)
    }

    generateMarketData()
    const interval = setInterval(generateMarketData, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: chatInput,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on current market trends, I recommend diversifying your portfolio.",
        "The crypto market is showing bullish signals. Consider increasing your BTC position.",
        "Indian stocks are performing well today. RELIANCE and TCS show strong momentum.",
        "Risk management is key. Consider setting stop-loss orders for your positions.",
        "The AI analysis suggests a potential breakout in the next 24 hours.",
      ]

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4">
      <Navigation />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 pt-16 sm:pt-20 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="font-orbitron text-xl sm:text-2xl font-bold neon-glow-cyan">StoxGPT Dashboard</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setShowAIChat(true)}
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white text-sm px-3 py-2 flex-1 sm:flex-none"
            >
              AI Assistant
            </Button>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-red-400/50 text-red-400 hover:bg-red-400 hover:text-white text-sm px-3 py-2 bg-transparent"
              >
                Logout
              </Button>
            </Link>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs sm:text-sm text-gray-400">Portfolio Value</div>
            <div className="font-bold text-base sm:text-lg neon-glow-cyan">₹{portfolioValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Left Column - Charts and Market Data */}
        <div className="xl:col-span-2 space-y-4 sm:space-y-6">
          {/* Main Chart */}
          <Card className="glassmorphic p-3 sm:p-6 animate-neon-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <h2 className="font-orbitron text-lg sm:text-xl font-bold neon-glow-cyan">
                Price Chart - {selectedAsset}
              </h2>
              <div className="flex gap-1 sm:gap-2 flex-wrap">
                {["BTC", "ETH", "RELIANCE", "TCS"].map((asset) => (
                  <Button
                    key={asset}
                    onClick={() => setSelectedAsset(asset)}
                    variant={selectedAsset === asset ? "default" : "outline"}
                    size="sm"
                    className={`text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${selectedAsset === asset ? "bg-cyan-400 text-black" : "border-cyan-400/50 text-cyan-400"}`}
                  >
                    {asset}
                  </Button>
                ))}
              </div>
            </div>

            <div className="relative h-48 sm:h-64 bg-black/30 rounded border border-cyan-400/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent" />
              <svg className="w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="xMidYMid meet">
                {/* Grid */}
                {[...Array(6)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="500"
                    y2={i * 50}
                    stroke="rgba(0, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                ))}
                {[...Array(11)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50}
                    y2="250"
                    stroke="rgba(0, 255, 255, 0.1)"
                    strokeWidth="1"
                  />
                ))}

                {/* Chart line */}
                <polyline
                  fill="none"
                  stroke="url(#chartGradient)"
                  strokeWidth="2"
                  points={chartData
                    .map((value, index) => `${(index / (chartData.length - 1)) * 500},${250 - (value / 100) * 250}`)
                    .join(" ")}
                  className="animate-pulse"
                />

                {/* Chart area */}
                <polygon
                  fill="url(#chartFill)"
                  points={`0,250 ${chartData
                    .map((value, index) => `${(index / (chartData.length - 1)) * 500},${250 - (value / 100) * 250}`)
                    .join(" ")} 500,250`}
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
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-holographic-sweep" />
            </div>
          </Card>

          {/* Market Tickers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Crypto Tickers */}
            <Card className="glassmorphic p-3 sm:p-4">
              <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-cyan mb-3 sm:mb-4">
                Cryptocurrency
              </h3>
              <div className="space-y-2">
                {cryptoData.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="flex items-center justify-between p-2 rounded bg-black/30 touch-manipulation"
                  >
                    <div className="font-semibold text-sm sm:text-base">{crypto.symbol}</div>
                    <div className="text-right">
                      <div className="font-bold text-sm sm:text-base">₹{crypto.price.toLocaleString()}</div>
                      <div
                        className={`text-xs sm:text-sm ${crypto.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {crypto.changePercent >= 0 ? "+" : ""}
                        {crypto.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stock Tickers */}
            <Card className="glassmorphic p-3 sm:p-4">
              <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-magenta mb-3 sm:mb-4">
                Indian Stocks
              </h3>
              <div className="space-y-2">
                {stockData.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between p-2 rounded bg-black/30 touch-manipulation"
                  >
                    <div className="font-semibold text-sm sm:text-base">{stock.symbol}</div>
                    <div className="text-right">
                      <div className="font-bold text-sm sm:text-base">₹{stock.price.toLocaleString()}</div>
                      <div
                        className={`text-xs sm:text-sm ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Trading Panel and Portfolio */}
        <div className="space-y-4 sm:space-y-6">
          {/* Buy/Sell Panel */}
          <Card className="glassmorphic p-4 sm:p-6 animate-neon-border">
            <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-purple mb-3 sm:mb-4">Quick Trade</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-2">Asset</label>
                <select className="w-full bg-black/50 border border-purple-400/50 rounded p-2 sm:p-3 text-white text-sm sm:text-base touch-manipulation">
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>RELIANCE</option>
                  <option>TCS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-2">Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="bg-black/50 border-purple-400/50 text-white h-10 sm:h-12 text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button className="bg-green-500 hover:bg-green-400 text-white font-bold h-10 sm:h-12 text-sm sm:text-base touch-manipulation">
                  BUY
                </Button>
                <Button className="bg-red-500 hover:bg-red-400 text-white font-bold h-10 sm:h-12 text-sm sm:text-base touch-manipulation">
                  SELL
                </Button>
              </div>
            </div>
          </Card>

          {/* Portfolio Summary */}
          <Card className="glassmorphic p-4 sm:p-6">
            <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-cyan mb-3 sm:mb-4">
              Portfolio Summary
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Total Value</span>
                <span className="font-bold neon-glow-cyan text-sm sm:text-base">
                  ₹{portfolioValue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Today's P&L</span>
                <span className="font-bold text-green-400 text-sm sm:text-base">+₹12,450 (+2.4%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm sm:text-base">Available Balance</span>
                <span className="font-bold text-sm sm:text-base">₹45,230</span>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-gray-700">
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Top Holdings</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>BTC</span>
                    <span>₹8,45,000</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>RELIANCE</span>
                    <span>₹3,25,000</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>ETH</span>
                    <span>₹2,15,000</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="glassmorphic p-4 sm:p-6">
            <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-magenta mb-3 sm:mb-4">AI Insights</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 bg-cyan-400/10 rounded border border-cyan-400/30 touch-manipulation">
                <div className="text-xs sm:text-sm text-cyan-400 font-semibold">Market Signal</div>
                <div className="text-xs text-gray-300">BTC showing strong bullish momentum</div>
              </div>
              <div className="p-2 sm:p-3 bg-purple-400/10 rounded border border-purple-400/30 touch-manipulation">
                <div className="text-xs sm:text-sm text-purple-400 font-semibold">Risk Alert</div>
                <div className="text-xs text-gray-300">High volatility expected in next 2 hours</div>
              </div>
              <div className="p-2 sm:p-3 bg-green-400/10 rounded border border-green-400/30 touch-manipulation">
                <div className="text-xs sm:text-sm text-green-400 font-semibold">Opportunity</div>
                <div className="text-xs text-gray-300">RELIANCE oversold, potential rebound</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* AI Chat Assistant Modal */}
      {showAIChat && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <Card className="glassmorphic w-full max-w-2xl h-80 sm:h-96 flex flex-col animate-neon-border mx-2 sm:mx-0">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
              <h3 className="font-orbitron text-base sm:text-lg font-bold neon-glow-purple">AI Trading Assistant</h3>
              <Button
                onClick={() => setShowAIChat(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white touch-manipulation"
              >
                ✕
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs p-2 sm:p-3 rounded-lg ${
                      message.type === "user" ? "bg-cyan-400/20 text-cyan-100" : "bg-purple-400/20 text-purple-100"
                    }`}
                  >
                    <div className="text-xs sm:text-sm">{message.message}</div>
                    <div className="text-xs opacity-60 mt-1">{message.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 sm:p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask me about trading strategies..."
                  className="bg-black/50 border-purple-400/50 text-white text-sm sm:text-base h-10 sm:h-12"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-purple-500 hover:bg-purple-400 text-white h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base touch-manipulation"
                >
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
