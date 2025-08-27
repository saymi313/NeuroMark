"use client"

import { useState } from "react"
import { Send, Smile, Paperclip, ImageIcon, FileText, Mic } from "lucide-react"

const MessageInput = ({ newMessage, setNewMessage, onSendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showFileOptions, setShowFileOptions] = useState(false)

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
    "🙌",
    "🤲",
    "🤝",
    "🙏",
    "✍️",
    "💪",
    "🦾",
    "🦿",
    "🦵",
    "🦶",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✨",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "⭐",
  ]

  const handleFileUpload = (type) => {
    const input = document.createElement("input")
    input.type = "file"

    switch (type) {
      case "image":
        input.accept = "image/*"
        break
      case "document":
        input.accept = ".pdf,.doc,.docx,.txt,.xlsx,.pptx"
        break
      case "audio":
        input.accept = "audio/*"
        break
      default:
        input.accept = "*"
    }

    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        console.log(`[v0] Uploading ${type} file:`, file.name)
        onSendMessage(`📎 Shared ${type}: ${file.name}`)
      }
    }

    input.click()
    setShowFileOptions(false)
  }

  return (
    <div className="border-t border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-slate-900/40 to-purple-900/20 backdrop-blur-xl p-4 shadow-lg shadow-purple-500/5">
      <div className="flex items-end gap-3">
        {/* File Upload Button */}
        <div className="relative">
          <button
            onClick={() => setShowFileOptions(!showFileOptions)}
            className="p-2 text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 rounded-lg transition-colors duration-200"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {showFileOptions && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-50 animate-in slide-in-from-bottom-2 duration-200">
              <div className="p-2">
                <button
                  onClick={() => handleFileUpload("image")}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                >
                  <ImageIcon className="w-4 h-4" />
                  Upload Image
                </button>
                <button
                  onClick={() => handleFileUpload("document")}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                >
                  <FileText className="w-4 h-4" />
                  Upload Document
                </button>
                <button
                  onClick={() => handleFileUpload("audio")}
                  className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                >
                  <Mic className="w-4 h-4" />
                  Upload Audio
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full pr-12 py-3 bg-purple-950/30 border border-purple-400/30 text-purple-100 placeholder:text-purple-300/60 rounded-xl focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 shadow-lg shadow-purple-500/10 outline-none transition-all duration-200"
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (newMessage.trim()) {
                  onSendMessage(newMessage)
                  setNewMessage("")
                }
              }
            }}
          />

          {/* Emoji Button */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-purple-200 hover:bg-purple-500/10 rounded-lg transition-colors duration-200"
            >
              <Smile className="w-4 h-4" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 w-80 h-64 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-50 animate-in slide-in-from-bottom-2 duration-200">
                <div className="p-3">
                  <h4 className="text-sm font-medium text-purple-200 mb-3">Choose an emoji</h4>
                  <div className="grid grid-cols-10 gap-1 max-h-48 overflow-y-auto">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setNewMessage(newMessage + emoji)
                          setShowEmojiPicker(false)
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-purple-500/20 transition-colors duration-200 text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            if (newMessage.trim()) {
              onSendMessage(newMessage)
              setNewMessage("")
            }
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 shadow-lg shadow-purple-500/30 transition-all duration-300 text-white font-medium"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default MessageInput
