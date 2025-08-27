"use client"
import { Phone, Video, MoreVertical, Users, Hash, CheckCheck, Eye } from "lucide-react"
import MessageInput from "./MessageInput"
import { useState } from "react"

const ChatWindow = ({ activeChat, chatType, messages, showReadReceipts, setShowReadReceipts }) => {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (message) => {
    console.log("[v0] Sending message:", message)
    // Message sending logic would go here
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 via-violet-900/20 to-purple-900/20 backdrop-blur-xl p-4 shadow-lg shadow-purple-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30">
              {chatType === "groups" ? (
                <Users className="w-5 h-5 text-white" />
              ) : (
                <Hash className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-purple-100">{activeChat}</h2>
              <p className="text-sm text-purple-200/70">{chatType === "groups" ? "8 members • 3 online" : "Online"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 transition-colors duration-200">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 transition-colors duration-200">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 transition-colors duration-200">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-white custom-scrollbar"
        style={{ maxHeight: "calc(100vh - 280px)" }} // Adjusted maxHeight to account for header and input area
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.isOwn ? "flex-row-reverse" : ""}`}>
            {!message.isOwn && (
              <div className="w-10 h-10 border-2 border-purple-400/30 shadow-lg shadow-purple-500/20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-medium">
                <img
                  src={`/abstract-geometric-shapes.png?height=40&width=40&query=${message.sender}`}
                  alt={message.sender}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
                <span style={{ display: "none" }} className="w-full h-full flex items-center justify-center">
                  {message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
            )}
            <div className={`flex-1 max-w-2xl ${message.isOwn ? "text-right" : ""}`}>
              {!message.isOwn && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-purple-800">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
              )}
              <div
                className={`inline-block p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                  message.isOwn
                    ? "bg-gradient-to-br from-purple-500 to-violet-500 text-white rounded-br-md shadow-purple-500/30 hover:shadow-purple-500/40"
                    : "bg-gradient-to-br from-purple-100 to-violet-100 text-purple-900 rounded-bl-md shadow-purple-500/20 hover:shadow-purple-500/30 border border-purple-200"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>

              {message.isOwn && (
                <div className="flex items-center justify-end gap-2 mt-1">
                  <span className="text-xs text-gray-500">{message.time}</span>
                  <div className="flex items-center gap-1">
                    <CheckCheck className="w-3 h-3 text-purple-600" />
                    <button
                      onClick={() => setShowReadReceipts(showReadReceipts === message.id ? null : message.id)}
                      className="flex -space-x-1 hover:space-x-0 transition-all duration-200"
                    >
                      {message.readBy?.slice(0, 3).map((reader, index) => (
                        <div
                          key={reader.id}
                          className="w-4 h-4 border border-purple-400/50 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center text-white text-xs"
                        >
                          {reader.avatar ? (
                            <img
                              src={reader.avatar || "/placeholder.svg"}
                              alt={reader.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            reader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </div>
                      ))}
                      {message.readBy?.length > 3 && (
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center">
                          <span className="text-xs text-purple-300">+{message.readBy.length - 3}</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {showReadReceipts === message.id && message.readBy && (
                <div className="absolute right-0 mt-2 p-3 bg-gradient-to-r from-slate-800/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-10">
                  <h4 className="text-xs font-semibold text-purple-200 mb-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Read by {message.readBy.length} people
                  </h4>
                  <div className="space-y-1">
                    {message.readBy.map((reader) => (
                      <div key={reader.id} className="flex items-center gap-2">
                        <div className="w-5 h-5 border border-purple-400/30 rounded-full overflow-hidden bg-purple-500 flex items-center justify-center text-white text-xs">
                          {reader.avatar ? (
                            <img
                              src={reader.avatar || "/placeholder.svg"}
                              alt={reader.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            reader.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </div>
                        <span className="text-xs text-purple-100">{reader.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reactions */}
              {Object.keys(message.reactions).length > 0 && (
                <div className="flex gap-1 mt-2">
                  {Object.entries(message.reactions).map(([emoji, count]) => (
                    <button
                      key={emoji}
                      className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-200 text-xs border border-purple-400/20 backdrop-blur-sm"
                    >
                      <span>{emoji}</span>
                      <span className="text-purple-200">{count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0">
        {" "}
        {/* Added flex-shrink-0 to prevent input from being compressed */}
        <MessageInput newMessage={newMessage} setNewMessage={setNewMessage} onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatWindow
