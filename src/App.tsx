"use client"

import { useState, useEffect, useMemo } from "react"
import Settings from "./Settings"
import "./index.css"

interface Tab {
  id: string
  url: string
  title: string
  favIconUrl?: string
  timestamp: number
}

interface SavedSession {
  id: string
  timestamp: number
  tabs: Tab[]
  groupLabel?: string
}

interface ThemeSettings {
  backgroundColor: string
  textColor: string
  accentColor: string
  deleteColor: string
  restoreColor: string
}

const defaultTheme: ThemeSettings = {
  backgroundColor: "#0A1929",
  textColor: "#FFFFFF",
  accentColor: "#FFFFFF",
  deleteColor: "#FF4444",
  restoreColor: "#FFFFFF",
}

declare const chrome: typeof globalThis.chrome

export default function App() {
  const [currentTabs, setCurrentTabs] = useState<Tab[]>([])
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")

  useEffect(() => {
    loadSavedSessions()
    loadTheme()
  }, [])

  useEffect(() => {
    getCurrentTabs()
  }, [])

  const loadTheme = async () => {
    try {
      const result = await chrome.storage.local.get(["themeSettings"])
      if (result.themeSettings) {
        setTheme(result.themeSettings)
      }
    } catch (error) {
      console.error("Error loading theme:", error)
    }
  }

  const saveTheme = async (newTheme: ThemeSettings) => {
    try {
      await chrome.storage.local.set({ themeSettings: newTheme })
      setTheme(newTheme)
    } catch (error) {
      console.error("Error saving theme:", error)
    }
  }

  const loadSavedSessions = async () => {
    try {
      const result = await chrome.storage.local.get(["savedSessions"])
      if (result.savedSessions) {
        setSavedSessions(result.savedSessions)
      }
    } catch (error) {
      console.error("Error loading sessions:", error)
    }
  }

  const saveSessions = async (sessions: SavedSession[]) => {
    try {
      await chrome.storage.local.set({ savedSessions: sessions })
      setSavedSessions(sessions)
    } catch (error) {
      console.error("Error saving sessions:", error)
    }
  }

  const getCurrentTabs = async () => {
    try {
      const tabs = await chrome.tabs.query({ currentWindow: true })
      const formattedTabs: Tab[] = tabs
        .filter((tab: any) => tab.url && !tab.url.startsWith("chrome://") && !tab.url.startsWith("chrome-extension://"))
        .map((tab: any) => ({
          id: String(tab.id),
          url: tab.url || "",
          title: tab.title || "Untitled",
          favIconUrl: tab.favIconUrl,
          timestamp: Date.now(),
        }))
      setCurrentTabs(formattedTabs)
    } catch (error) {
      console.error("Error getting tabs:", error)
    }
  }

  const handleSaveCurrentTabs = async () => {
    if (currentTabs.length === 0) {
      return
    }

    setIsLoading(true)
    try {
      const newSession: SavedSession = {
        id: `session-${Date.now()}`,
        timestamp: Date.now(),
        tabs: currentTabs,
      }

      const updatedSessions = [newSession, ...savedSessions]
      await saveSessions(updatedSessions)

      const tabIds = currentTabs.map((tab) => Number.parseInt(tab.id))
      const filteredTabIds = tabIds.filter((id) => !isNaN(id))

      if (filteredTabIds.length > 0) {
        await chrome.tabs.remove(filteredTabIds)
      }

      setTimeout(() => {
        getCurrentTabs()
        setIsLoading(false)
      }, 300)
    } catch (error) {
      console.error("Error saving tabs:", error)
      setIsLoading(false)
    }
  }

  const handleRestoreAll = async () => {
    setIsLoading(true)
    try {
      for (const session of savedSessions) {
        for (const tab of session.tabs) {
          await chrome.tabs.create({ url: tab.url })
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Error restoring tabs:", error)
      setIsLoading(false)
    }
  }

  const handleRestoreSingle = async (url: string) => {
    try {
      await chrome.tabs.create({ url })
    } catch (error) {
      console.error("Error restoring tab:", error)
    }
  }

  const handleDeleteTab = async (sessionId: string, tabIndex: number) => {
    const updatedSessions = savedSessions.map((session) => {
      if (session.id === sessionId) {
        return {
          ...session,
          tabs: session.tabs.filter((_, idx) => idx !== tabIndex),
        }
      }
      return session
    })
    await saveSessions(updatedSessions.filter((s) => s.tabs.length > 0))
  }

  const handleDeleteAll = async () => {
    if (window.confirm("Delete all saved sessions? This cannot be undone.")) {
      await saveSessions([])
    }
  }

  const allTabs = useMemo(() => {
    const tabs: Array<{ tab: Tab; sessionId: string; index: number }> = []
    savedSessions.forEach((session) => {
      session.tabs.forEach((tab, idx) => {
        tabs.push({ tab, sessionId: session.id, index: idx })
      })
    })
    return tabs
  }, [savedSessions])

  const filteredTabs = useMemo(() => {
    if (!searchQuery.trim()) return allTabs
    const query = searchQuery.toLowerCase()
    return allTabs.filter(
      (item) => item.tab.title.toLowerCase().includes(query) || item.tab.url.toLowerCase().includes(query),
    )
  }, [allTabs, searchQuery])

  const handleCopyUrl = (url: string) => {
    if (navigator?.clipboard && url) {
      navigator.clipboard.writeText(url)
    }
  }

  const handleSendFeedback = () => {
    setShowFeedback(false)
    alert("Thanks for your feedback!")
    setFeedbackText("")
  }

  return (
    <>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
        }}
      >
        {/* Header */}
        <header className="border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-light tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  TooManyTabs
                </h1>
                <p className="text-xs mt-1" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  Save and organize your browser tabs
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
              title="Settings"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          {currentTabs.length > 0 && (
            <div
              className="mb-12 p-6 rounded-xl border backdrop-blur transition-all duration-300 hover:border-white/15"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-lg font-light mb-2">
                    {currentTabs.length} tab{currentTabs.length !== 1 ? "s" : ""} open
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Save them to free up memory
                  </p>
                </div>
                <button
                  onClick={handleSaveCurrentTabs}
                  disabled={isLoading}
                  className="px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50 text-sm whitespace-nowrap"
                  style={{
                    backgroundColor: theme.restoreColor,
                    color: theme.backgroundColor,
                  }}
                >
                  {isLoading ? "⟳ Saving..." : "↓ Save All Tabs"}
                </button>
              </div>
            </div>
          )}

          {allTabs.length > 0 && (
            <div className="mb-8">
              <div
                className="relative rounded-lg border backdrop-blur"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search tabs by title or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-4 rounded-lg outline-none transition-all duration-200 text-sm"
                  style={{
                    backgroundColor: "transparent",
                    color: theme.textColor,
                  }}
                />
              </div>
            </div>
          )}

          {filteredTabs.length > 0 && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex-1">
                <h2 className="text-xl font-light">{searchQuery ? `Search Results` : "Saved Tabs"}</h2>
                <p className="text-xs mt-2" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  {searchQuery
                    ? `${filteredTabs.length} result${filteredTabs.length !== 1 ? "s" : ""}`
                    : `${allTabs.length} total saved`}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={handleRestoreAll}
                  disabled={isLoading}
                  className="font-medium hover:opacity-70 transition-opacity disabled:opacity-50 text-sm px-4 py-2 rounded-lg hover:bg-white/5"
                  style={{ color: theme.restoreColor }}
                >
                  ↻ Restore all
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="font-medium hover:opacity-70 transition-opacity text-sm px-4 py-2 rounded-lg hover:bg-white/5"
                  style={{ color: theme.deleteColor }}
                >
                  × Delete all
                </button>
              </div>
            </div>
          )}

          {allTabs.length === 0 && (
            <div className="text-center py-24">
              <div className="mb-8 text-6xl opacity-30">⊡</div>
              <p className="text-xl font-light mb-3" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                No saved tabs yet
              </p>
              <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Save your current tabs to get started
              </p>
            </div>
          )}

          {filteredTabs.length > 0 && (
            <div className="space-y-3">
              {filteredTabs.map(({ tab, sessionId, index }) => {
                const tabKey = `${sessionId}-${index}`
                return (
                  <div
                    key={tabKey}
                    className="group flex items-start gap-4 p-4 rounded-lg transition-all duration-200 hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                    style={{}}
                  >
                    {/* Favicon */}
                    <div className="flex-shrink-0 mt-1">
                      {tab.favIconUrl ? (
                        <img
                          src={tab.favIconUrl || "/placeholder.svg"}
                          alt=""
                          className="w-5 h-5 rounded-sm"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            if (target) target.style.display = "none"
                          }}
                        />
                      ) : (
                        <div
                          className="w-5 h-5 rounded-sm flex items-center justify-center text-xs font-medium"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: theme.restoreColor,
                          }}
                        >
                          ◆
                        </div>
                      )}
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium mb-1 cursor-pointer hover:opacity-70 transition-opacity line-clamp-1">
                        {tab.title || "Untitled"}
                      </h3>
                      <p className="text-xs font-mono truncate" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        {tab.url}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
                      <button
                        onClick={() => handleCopyUrl(tab.url)}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                        title="Copy URL"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleRestoreSingle(tab.url)}
                        className="px-3 py-2 rounded text-xs font-medium transition-all hover:opacity-90"
                        style={{
                          color: theme.backgroundColor,
                          backgroundColor: theme.restoreColor,
                        }}
                      >
                        ↻
                      </button>
                      <button
                        onClick={() => handleDeleteTab(sessionId, index)}
                        className="p-2 hover:bg-white/10 rounded transition-colors"
                        style={{ color: theme.deleteColor }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* No Results State */}
          {searchQuery && filteredTabs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                No tabs match "{searchQuery}"
              </p>
            </div>
          )}
        </main>

        <footer
          className="border-t mt-auto py-6 px-6"
          style={{
            borderColor: "rgba(255, 255, 255, 0.08)",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <p>Made by Proxy • Built with care</p>
            <button
              onClick={() => setShowFeedback(true)}
              className="hover:opacity-100 opacity-70 transition-opacity underline"
            >
              Send Feedback
            </button>
          </div>
        </footer>
      </div>

      {showFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowFeedback(false)}
        >
          <div
            className="rounded-xl p-8 max-w-md w-full backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(10, 25, 41, 0.95)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-light mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Send Feedback
            </h3>
            <p className="text-sm mb-6" style={{ color: "rgba(255, 255, 255, 0.7)" }}>
              Help us improve TooManyTabs by sharing your thoughts
            </p>
            <textarea
              placeholder="Your feedback here..."
              className="w-full p-4 rounded-lg mb-6 text-sm outline-none resize-none"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: theme.textColor,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowFeedback(false)}
                className="px-6 py-2.5 rounded-lg text-sm hover:opacity-70 transition-opacity"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  color: theme.textColor,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: theme.restoreColor,
                  color: theme.backgroundColor,
                }}
                disabled={!feedbackText.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={theme}
        onSettingsChange={saveTheme}
      />
    </>
  )
}
