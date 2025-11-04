"use client"

import { useState, useEffect } from "react"

interface ThemeSettings {
  backgroundColor: string
  textColor: string
  accentColor: string
  deleteColor: string
  restoreColor: string
}

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
  settings: ThemeSettings
  onSettingsChange: (settings: ThemeSettings) => void
}

export default function Settings({ isOpen, onClose, settings, onSettingsChange }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<ThemeSettings>(settings)

  useEffect(() => {
    setLocalSettings(settings)
  }, [settings])

  const handleSave = () => {
    onSettingsChange(localSettings)
    onClose()
  }

  const handleReset = () => {
    const defaultSettings: ThemeSettings = {
      backgroundColor: "#0A1929",
      textColor: "#FFFFFF",
      accentColor: "#FFFFFF",
      deleteColor: "#FF4444",
      restoreColor: "#FFFFFF",
    }
    setLocalSettings(defaultSettings)
    onSettingsChange(defaultSettings)
  }

  if (!isOpen) return null

  const colorInputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border"
        style={{
          backgroundColor: settings.backgroundColor,
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2
            className="text-3xl font-light"
            style={{ color: settings.textColor, fontFamily: "'Playfair Display', serif" }}
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-3xl leading-none hover:opacity-70 transition-opacity"
            style={{ color: settings.textColor }}
          >
            ×
          </button>
        </div>

        <div className="space-y-8">
          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: settings.textColor, opacity: 0.9 }}>
              Background Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={localSettings.backgroundColor}
                onChange={(e) => setLocalSettings({ ...localSettings, backgroundColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 flex-shrink-0"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <input
                type="text"
                value={localSettings.backgroundColor}
                onChange={(e) => setLocalSettings({ ...localSettings, backgroundColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                style={colorInputStyle}
                placeholder="#0A1929"
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: settings.textColor, opacity: 0.9 }}>
              Text Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={localSettings.textColor}
                onChange={(e) => setLocalSettings({ ...localSettings, textColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 flex-shrink-0"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <input
                type="text"
                value={localSettings.textColor}
                onChange={(e) => setLocalSettings({ ...localSettings, textColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                style={colorInputStyle}
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          {/* Restore Button Color */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: settings.textColor, opacity: 0.9 }}>
              Restore Button Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={localSettings.restoreColor}
                onChange={(e) => setLocalSettings({ ...localSettings, restoreColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 flex-shrink-0"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <input
                type="text"
                value={localSettings.restoreColor}
                onChange={(e) => setLocalSettings({ ...localSettings, restoreColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                style={colorInputStyle}
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          {/* Delete Button Color */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: settings.textColor, opacity: 0.9 }}>
              Delete Button Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={localSettings.deleteColor}
                onChange={(e) => setLocalSettings({ ...localSettings, deleteColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 flex-shrink-0"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <input
                type="text"
                value={localSettings.deleteColor}
                onChange={(e) => setLocalSettings({ ...localSettings, deleteColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                style={colorInputStyle}
                placeholder="#FF4444"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: settings.textColor, opacity: 0.9 }}>
              Accent Color
            </label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={localSettings.accentColor}
                onChange={(e) => setLocalSettings({ ...localSettings, accentColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 flex-shrink-0"
                style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <input
                type="text"
                value={localSettings.accentColor}
                onChange={(e) => setLocalSettings({ ...localSettings, accentColor: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                style={colorInputStyle}
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4" style={{ color: settings.textColor, opacity: 0.9 }}>
              Preset Themes
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  const preset = {
                    backgroundColor: "#0A1929",
                    textColor: "#FFFFFF",
                    accentColor: "#FFFFFF",
                    deleteColor: "#FF4444",
                    restoreColor: "#FFFFFF",
                  }
                  setLocalSettings(preset)
                }}
                className="px-4 py-3 rounded-lg border-2 transition-opacity hover:opacity-80 text-sm font-medium"
                style={{
                  backgroundColor: "#0A1929",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                }}
              >
                Dark Blue
              </button>
              <button
                onClick={() => {
                  const preset = {
                    backgroundColor: "#1A1A1A",
                    textColor: "#E0E0E0",
                    accentColor: "#4A9EFF",
                    deleteColor: "#FF6B6B",
                    restoreColor: "#51CF66",
                  }
                  setLocalSettings(preset)
                }}
                className="px-4 py-3 rounded-lg border-2 transition-opacity hover:opacity-80 text-sm font-medium"
                style={{
                  backgroundColor: "#1A1A1A",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#E0E0E0",
                }}
              >
                Dark Gray
              </button>
              <button
                onClick={() => {
                  const preset = {
                    backgroundColor: "#1E293B",
                    textColor: "#F1F5F9",
                    accentColor: "#8B5CF6",
                    deleteColor: "#EF4444",
                    restoreColor: "#10B981",
                  }
                  setLocalSettings(preset)
                }}
                className="px-4 py-3 rounded-lg border-2 transition-opacity hover:opacity-80 text-sm font-medium"
                style={{
                  backgroundColor: "#1E293B",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#F1F5F9",
                }}
              >
                Slate
              </button>
              <button
                onClick={() => {
                  const preset = {
                    backgroundColor: "#000000",
                    textColor: "#FFFFFF",
                    accentColor: "#00FF88",
                    deleteColor: "#FF0080",
                    restoreColor: "#00D9FF",
                  }
                  setLocalSettings(preset)
                }}
                className="px-4 py-3 rounded-lg border-2 transition-opacity hover:opacity-80 text-sm font-medium"
                style={{
                  backgroundColor: "#000000",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                }}
              >
                Pure Black
              </button>
            </div>
          </div>

          <div
            className="flex items-center justify-between pt-8 border-t"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg font-medium hover:opacity-80 transition-opacity border text-sm"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: settings.textColor,
              }}
            >
              Reset to Default
            </button>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg font-medium hover:opacity-80 transition-opacity border text-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: settings.textColor,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: settings.textColor,
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
