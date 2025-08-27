"use client"

import { useState } from "react"
import { Plus, Settings, X, UserPlus } from "lucide-react"
import ChatSidebar from "../../components/ChatComponents/ChatSidebar"
import ChatWindow from "../../components/ChatComponents/ChatWindow"

const users = [
  {
    id: 1,
    name: "Farrakh Saeed",
    role: "Product Manager",
    avatar: "/professional-woman-diverse.png",
    status: "online",
    lastSeen: "now",
  },
  {
    id: 2,
    name: "Usairam Saeed",
    role: "Software Engineer",
    avatar: "/professional-man.png",
    status: "online",
    lastSeen: "now",
  },
  {
    id: 3,
    name: "Ayesha Malik",
    role: "UX Designer",
    avatar: "/professional-woman-designer.png",
    status: "away",
    lastSeen: "5 min ago",
  },
  {
    id: 4,
    name: "Hassan Sheikh",
    role: "DevOps Engineer",
    avatar: "/professional-engineer.png",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  {
    id: 5,
    name: "Zara Ahmed",
    role: "Marketing Lead",
    avatar: "/professional-woman-marketing.png",
    status: "online",
    lastSeen: "now",
  },
  {
    id: 6,
    name: "Usman Tariq",
    role: "Backend Developer",
    avatar: "/professional-man-developer.png",
    status: "busy",
    lastSeen: "1 hour ago",
  },
]

const groups = [
  {
    id: 1,
    name: "Product Team",
    members: 8,
    type: "team",
    lastMessage: "Great work on the new feature!",
    time: "2:30 PM",
  },
  {
    id: 2,
    name: "Development",
    members: 12,
    type: "department",
    lastMessage: "Code review meeting at 3 PM",
    time: "1:45 PM",
  },
  {
    id: 3,
    name: "Design System",
    members: 5,
    type: "project",
    lastMessage: "Updated the color palette",
    time: "11:20 AM",
  },
  {
    id: 4,
    name: "All Hands",
    members: 45,
    type: "company",
    lastMessage: "Quarterly results are in!",
    time: "Yesterday",
  },
]

const messages = [
  {
    id: 1,
    sender: "Farrakh Saeed",
    content: "Hey team! Just wanted to update everyone on the project progress. We're ahead of schedule!",
    time: "2:30 PM",
    reactions: { "👍": 3, "🎉": 2 },
    isOwn: false,
    readBy: [
      { id: 2, name: "Ahmed Ali", avatar: "/professional-man.png" },
      { id: 5, name: "Zara Ahmed", avatar: "/professional-woman-marketing.png" },
      { id: 6, name: "Usman Tariq", avatar: "/professional-man-developer.png" },
    ],
  },
  {
    id: 2,
    sender: "You",
    content: "That's fantastic news! The new design system is really helping with development speed.",
    time: "2:32 PM",
    reactions: { "💯": 1 },
    isOwn: true,
    readBy: [
      { id: 1, name: "Fatima Khan", avatar: "/professional-woman-diverse.png" },
      { id: 2, name: "Ahmed Ali", avatar: "/professional-man.png" },
      { id: 3, name: "Ayesha Malik", avatar: "/professional-woman-designer.png" },
      { id: 5, name: "Zara Ahmed", avatar: "/professional-woman-marketing.png" },
    ],
  },
  {
    id: 3,
    sender: "Ahmed Ali",
    content: "Agreed! The component library has saved us so much time. Great work Ayesha on the designs.",
    time: "2:35 PM",
    reactions: { "👏": 4 },
    isOwn: false,
    readBy: [
      { id: 1, name: "Fatima Khan", avatar: "/professional-woman-diverse.png" },
      { id: 3, name: "Ayesha Malik", avatar: "/professional-woman-designer.png" },
    ],
  },
  {
    id: 4,
    sender: "Ayesha Malik",
    content: "Thanks everyone! I'm working on some new components for the next sprint. Will share mockups soon.",
    time: "2:38 PM",
    reactions: { "🔥": 2, "👀": 1 },
    isOwn: false,
    readBy: [{ id: 2, name: "Ahmed Ali", avatar: "/professional-man.png" }],
  },
  {
    id: 5,
    sender: "You",
    content: "Looking forward to seeing them! Should we schedule a design review session?",
    time: "2:40 PM",
    reactions: {},
    isOwn: true,
    readBy: [
      { id: 1, name: "Fatima Khan", avatar: "/professional-woman-diverse.png" },
      { id: 2, name: "Ahmed Ali", avatar: "/professional-man.png" },
    ],
  },
]

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState("Product Team")
  const [searchTerm, setSearchTerm] = useState("")
  const [newMessage, setNewMessage] = useState("")
  const [showProfile, setShowProfile] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showReadReceipts, setShowReadReceipts] = useState(null)
  const [chatType, setChatType] = useState("groups")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showNewGroupModal, setShowNewGroupModal] = useState(false)
  const [showChatOptions, setShowChatOptions] = useState(null)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState([])
  const [mutedChats, setMutedChats] = useState(new Set())
  const [pinnedChats, setPinnedChats] = useState(new Set())
  const [chatMessages, setChatMessages] = useState(messages)

  const handleSendMessage = (messageContent) => {
    const newMsg = {
      id: chatMessages.length + 1,
      sender: "You",
      content: messageContent,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      reactions: {},
      isOwn: true,
      readBy: [],
    }
    setChatMessages([...chatMessages, newMsg])
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "busy":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 p-4">
      <div className="h-full bg-gradient-to-br from-slate-950/80 via-purple-950/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col overflow-hidden">
        <div className="border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-violet-900/30 to-purple-900/30 backdrop-blur-xl shadow-lg shadow-purple-500/10 flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                Chat Hub
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowNewGroupModal(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500/10 border border-purple-400/30 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/50 backdrop-blur-sm rounded-md transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  New Group
                </button>
                <button className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-500/10 border border-purple-400/30 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/50 backdrop-blur-sm rounded-md transition-all duration-200">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar
            users={users}
            groups={groups}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            chatType={chatType}
            setChatType={setChatType}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            setShowNewGroupModal={setShowNewGroupModal}
            setSelectedUser={setSelectedUser}
            setShowProfile={setShowProfile}
            showChatOptions={showChatOptions}
            setShowChatOptions={setShowChatOptions}
            mutedChats={mutedChats}
            setMutedChats={setMutedChats}
            pinnedChats={pinnedChats}
            setPinnedChats={setPinnedChats}
          />

          <div className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow
              activeChat={activeChat}
              chatType={chatType}
              messages={chatMessages}
              showReadReceipts={showReadReceipts}
              setShowReadReceipts={setShowReadReceipts}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSendMessage={handleSendMessage}
            />
          </div>

          {/* Profile Sidebar */}
          {showProfile && selectedUser && (
            <div className="w-80 h-full border-l border-purple-500/20 bg-gradient-to-b from-purple-900/20 via-slate-900/40 to-purple-900/20 backdrop-blur-xl overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-purple-100">Profile</h3>
                  <button
                    onClick={() => setShowProfile(false)}
                    className="p-2 text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 rounded-md transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full border-4 border-purple-400/30 shadow-xl shadow-purple-500/20 overflow-hidden bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      {selectedUser.avatar ? (
                        <img
                          src={selectedUser.avatar || "/placeholder.svg"}
                          alt={selectedUser.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-xl font-semibold">
                          {selectedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-purple-900 ${getStatusColor(selectedUser.status)} shadow-lg`}
                    ></div>
                  </div>
                  <h4 className="text-xl font-semibold text-purple-100 mt-3">{selectedUser.name}</h4>
                  <p className="text-purple-200/70">{selectedUser.role}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* New Group Modal */}
        {showNewGroupModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 w-full max-w-md mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-purple-100">Create New Group</h3>
                  <button
                    onClick={() => {
                      setShowNewGroupModal(false)
                      setNewGroupName("")
                      setSelectedMembers([])
                    }}
                    className="p-2 text-purple-200 hover:bg-purple-500/10 hover:text-purple-100 rounded-md transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Group Name</label>
                    <input
                      type="text"
                      placeholder="Enter group name..."
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="w-full px-3 py-2 bg-purple-950/30 border border-purple-400/30 text-purple-100 placeholder:text-purple-300/60 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 rounded-md outline-none transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-purple-200 mb-2">Add Members</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/10 transition-colors duration-200"
                        >
                          <input
                            type="checkbox"
                            id={`user-${user.id}`}
                            checked={selectedMembers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedMembers([...selectedMembers, user.id])
                              } else {
                                setSelectedMembers(selectedMembers.filter((id) => id !== user.id))
                              }
                            }}
                            className="w-4 h-4 text-purple-600 bg-purple-950/30 border-purple-400/30 rounded focus:ring-purple-500/20"
                          />
                          <div className="w-8 h-8 rounded-full border border-purple-400/30 overflow-hidden bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                            {user.avatar ? (
                              <img
                                src={user.avatar || "/placeholder.svg"}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white text-xs font-semibold">
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            )}
                          </div>
                          <label htmlFor={`user-${user.id}`} className="flex-1 text-sm text-purple-100 cursor-pointer">
                            {user.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowNewGroupModal(false)
                      setNewGroupName("")
                      setSelectedMembers([])
                    }}
                    className="flex-1 px-4 py-2 bg-purple-500/10 border border-purple-400/30 text-purple-200 hover:bg-purple-500/20 rounded-md transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newGroupName.trim() && selectedMembers.length > 0) {
                        console.log("[v0] Creating group:", newGroupName, "with members:", selectedMembers)
                        setShowNewGroupModal(false)
                        setNewGroupName("")
                        setSelectedMembers([])
                      }
                    }}
                    disabled={!newGroupName.trim() || selectedMembers.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-500/30 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatApp
