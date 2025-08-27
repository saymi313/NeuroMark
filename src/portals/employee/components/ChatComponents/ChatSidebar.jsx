"use client"
import {
  Search,
  MoreVertical,
  Users,
  Hash,
  Lock,
  Globe,
  ChevronDown,
  ChevronRight,
  Bell,
  BellOff,
  Pin,
  PinOff,
} from "lucide-react"
import { useState } from "react"

const ChatSidebar = ({
  users,
  groups,
  activeChat,
  setActiveChat,
  searchTerm,
  setSearchTerm,
  chatType,
  setChatType,
  showDropdown,
  setShowDropdown,
  setShowNewGroupModal,
  setSelectedUser,
  setShowProfile,
  showChatOptions,
  setShowChatOptions,
  mutedChats,
  setMutedChats,
  pinnedChats,
  setPinnedChats,
}) => {
  const [showTeamMembers, setShowTeamMembers] = useState(true)
  const [showGroups, setShowGroups] = useState(false)

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

  const getGroupIcon = (type) => {
    switch (type) {
      case "team":
        return <Users className="w-4 h-4" />
      case "department":
        return <Hash className="w-4 h-4" />
      case "project":
        return <Lock className="w-4 h-4" />
      case "company":
        return <Globe className="w-4 h-4" />
      default:
        return <Hash className="w-4 h-4" />
    }
  }

  return (
    <div className="w-80 h-full border-r border-purple-500/20 bg-gradient-to-b from-purple-900/20 via-slate-900/40 to-purple-900/20 backdrop-blur-xl flex flex-col overflow-hidden">
      {/* Search */}
      <div className="p-4 border-b border-purple-500/10 flex-shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
          <input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-purple-950/30 border border-purple-400/30 text-purple-100 placeholder:text-purple-300/60 focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 rounded-lg outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-purple-900/20 via-slate-900/40 to-purple-900/20 custom-scrollbar">
        <div className="border-b border-purple-500/10">
          <button
            onClick={() => setShowTeamMembers(!showTeamMembers)}
            className="w-full flex items-center justify-between p-4 hover:bg-purple-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/40 transition-all duration-300 flex-shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-purple-200 uppercase tracking-wide truncate">Team Members</h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs bg-purple-500/20 text-purple-200 border border-purple-400/30 px-2 py-1 rounded-full">
                {users.length}
              </span>
              {showTeamMembers ? (
                <ChevronDown className="w-4 h-4 text-purple-300 transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-purple-300 transition-transform duration-300" />
              )}
            </div>
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showTeamMembers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 space-y-1 max-h-80 overflow-y-auto overflow-x-hidden">
              {users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user)
                    setActiveChat(user.name)
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5 hover:border hover:border-purple-500/20 min-w-0 ${
                    activeChat === user.name
                      ? "bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                      : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 border-2 border-purple-400/30 shadow-lg shadow-purple-500/20 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-medium">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      )}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-purple-900 ${getStatusColor(user.status)} shadow-lg`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between min-w-0">
                      <h4 className="text-sm font-medium text-purple-100 truncate flex-1 min-w-0">{user.name}</h4>
                      <span className="text-xs text-purple-300/60 flex-shrink-0 ml-2">{user.lastSeen}</span>
                    </div>
                    <p className="text-xs text-purple-200/70 truncate">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-purple-500/10">
          <button
            onClick={() => setShowGroups(!showGroups)}
            className="w-full flex items-center justify-between p-4 hover:bg-purple-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/40 transition-all duration-300 flex-shrink-0">
                <Hash className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-semibold text-purple-200 uppercase tracking-wide truncate">Groups</h3>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs bg-violet-500/20 text-purple-200 border border-violet-400/30 px-2 py-1 rounded-full">
                {groups.length}
              </span>
              {showGroups ? (
                <ChevronDown className="w-4 h-4 text-purple-300 transition-transform duration-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-purple-300 transition-transform duration-300" />
              )}
            </div>
          </button>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              showGroups ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 space-y-1 max-h-80 overflow-y-auto overflow-x-hidden">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5 relative min-w-0 ${
                    activeChat === group.name
                      ? "bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                      : "hover:border hover:border-purple-500/20"
                  }`}
                >
                  {pinnedChats.has(group.name) && <Pin className="absolute top-1 right-1 w-3 h-3 text-purple-400" />}
                  <div
                    onClick={() => setActiveChat(group.name)}
                    className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden"
                  >
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        activeChat === group.name
                          ? "bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30"
                          : "bg-purple-800/30 text-purple-300"
                      }`}
                    >
                      {getGroupIcon(group.type)}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center justify-between min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <h4 className="text-sm font-medium truncate text-purple-100 flex-1 min-w-0">{group.name}</h4>
                          {mutedChats.has(group.name) && <BellOff className="w-3 h-3 text-purple-400 flex-shrink-0" />}
                        </div>
                        <span className="text-xs text-purple-300/70 flex-shrink-0 ml-2">{group.time}</span>
                      </div>
                      <div className="flex items-center justify-between min-w-0">
                        <p className="text-xs text-purple-200/70 truncate flex-1 min-w-0">{group.lastMessage}</p>
                        <span className="text-xs bg-purple-500/20 text-purple-200 border border-purple-400/30 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                          {group.members}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowChatOptions(showChatOptions === group.name ? null : group.name)
                      }}
                      className="p-1 rounded-lg hover:bg-purple-500/20 transition-colors duration-200"
                    >
                      <MoreVertical className="w-4 h-4 text-purple-300" />
                    </button>

                    {showChatOptions === group.name && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-gradient-to-br from-slate-900/95 to-purple-950/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="p-1">
                          <button
                            onClick={() => {
                              const newPinned = new Set(pinnedChats)
                              if (newPinned.has(group.name)) {
                                newPinned.delete(group.name)
                              } else {
                                newPinned.add(group.name)
                              }
                              setPinnedChats(newPinned)
                              setShowChatOptions(null)
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                          >
                            {pinnedChats.has(group.name) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                            {pinnedChats.has(group.name) ? "Unpin Chat" : "Pin Chat"}
                          </button>
                          <button
                            onClick={() => {
                              const newMuted = new Set(mutedChats)
                              if (newMuted.has(group.name)) {
                                newMuted.delete(group.name)
                              } else {
                                newMuted.add(group.name)
                              }
                              setMutedChats(newMuted)
                              setShowChatOptions(null)
                            }}
                            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                          >
                            {mutedChats.has(group.name) ? (
                              <Bell className="w-4 h-4" />
                            ) : (
                              <BellOff className="w-4 h-4" />
                            )}
                            {mutedChats.has(group.name) ? "Unmute" : "Mute"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 mt-auto flex-shrink-0">
          <button
            onClick={() => setShowNewGroupModal(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 hover:scale-105"
          >
            <Hash className="w-4 h-4" />
            Create New Group
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar
