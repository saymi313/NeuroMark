"use client"
import { Search, MoreVertical, Users, Hash, Lock, Globe, ChevronDown, Bell, BellOff, Pin, PinOff } from "lucide-react"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"

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
    <div className="w-80 border-r border-purple-500/20 bg-gradient-to-b from-purple-900/20 via-slate-900/40 to-purple-900/20 backdrop-blur-xl">
      {/* Search */}
      <div className="p-4 border-b border-purple-500/10">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-purple-950/30 border-purple-400/30 text-purple-100 placeholder:text-purple-300/60 focus:border-purple-400/60 focus:ring-purple-400/20"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-full flex items-center justify-between bg-gradient-to-r from-purple-950/50 to-violet-950/50 border border-purple-400/30 text-purple-100 rounded-xl px-4 py-3 hover:from-purple-900/50 hover:to-violet-900/50 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg shadow-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30">
                {chatType === "groups" ? (
                  <Users className="w-4 h-4 text-white" />
                ) : (
                  <Hash className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="font-medium">{chatType === "groups" ? "Groups" : "Personal Chats"}</span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-purple-300 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl shadow-2xl shadow-purple-500/20 z-50 animate-in slide-in-from-right-2 duration-300">
              <div className="p-2">
                <button
                  onClick={() => {
                    setChatType("groups")
                    setShowDropdown(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    chatType === "groups"
                      ? "bg-gradient-to-r from-purple-600/30 to-violet-600/30 border border-purple-400/30 text-purple-100"
                      : "hover:bg-purple-500/10 text-purple-200"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Groups</div>
                    <div className="text-xs text-purple-300/70">Team conversations</div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setChatType("personal")
                    setShowDropdown(false)
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                    chatType === "personal"
                      ? "bg-gradient-to-r from-purple-600/30 to-violet-600/30 border border-purple-400/30 text-purple-100"
                      : "hover:bg-purple-500/10 text-purple-200"
                  }`}
                >
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg shadow-purple-500/30">
                    <Hash className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Personal Chats</div>
                    <div className="text-xs text-purple-300/70">Direct messages</div>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {chatType === "groups" ? (
        <div className="p-4">
          <h3 className="text-sm font-semibold text-purple-200 mb-3 uppercase tracking-wide">Groups</h3>
          <div className="space-y-1">
            {groups.map((group) => (
              <div
                key={group.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5 relative ${
                  activeChat === group.name
                    ? "bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                    : "hover:border hover:border-purple-500/20"
                }`}
              >
                {pinnedChats.has(group.name) && <Pin className="absolute top-1 right-1 w-3 h-3 text-purple-400" />}
                <div onClick={() => setActiveChat(group.name)} className="flex items-center gap-3 flex-1">
                  <div
                    className={`p-2 rounded-lg ${
                      activeChat === group.name
                        ? "bg-gradient-to-br from-purple-500 to-violet-500 text-white shadow-lg shadow-purple-500/30"
                        : "bg-purple-800/30 text-purple-300"
                    }`}
                  >
                    {getGroupIcon(group.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate text-purple-100">{group.name}</h4>
                        {mutedChats.has(group.name) && <BellOff className="w-3 h-3 text-purple-400" />}
                      </div>
                      <span className="text-xs text-purple-300/70">{group.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-purple-200/70 truncate">{group.lastMessage}</p>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-purple-500/20 text-purple-200 border-purple-400/30"
                      >
                        {group.members}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="relative">
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
                    <div className="absolute right-0 top-full mt-1 w-48 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-50 animate-in slide-in-from-top-2 duration-200">
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
                          {mutedChats.has(group.name) ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
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
      ) : (
        <div className="p-4">
          <h3 className="text-sm font-semibold text-purple-200 mb-3 uppercase tracking-wide">Personal Chats</h3>
          <div className="space-y-1">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5 relative ${
                  activeChat === user.name
                    ? "bg-gradient-to-r from-purple-600/20 to-violet-600/20 border border-purple-400/30 shadow-lg shadow-purple-500/10"
                    : "hover:border hover:border-purple-500/20"
                }`}
              >
                {pinnedChats.has(user.name) && <Pin className="absolute top-1 right-1 w-3 h-3 text-purple-400" />}
                <div
                  onClick={() => {
                    setActiveChat(user.name)
                    setSelectedUser(user)
                  }}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className="relative">
                    <Avatar className="w-10 h-10 border-2 border-purple-400/30 shadow-lg shadow-purple-500/20">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-purple-900 ${getStatusColor(user.status)} shadow-lg`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-purple-100 truncate">{user.name}</h4>
                        {mutedChats.has(user.name) && <BellOff className="w-3 h-3 text-purple-400" />}
                      </div>
                      <span className="text-xs text-purple-300/60">{user.lastSeen}</span>
                    </div>
                    <p className="text-sm text-purple-200/70 truncate">{user.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowChatOptions(showChatOptions === user.name ? null : user.name)
                    }}
                    className="p-1 rounded-lg hover:bg-purple-500/20 transition-colors duration-200"
                  >
                    <MoreVertical className="w-4 h-4 text-purple-300" />
                  </button>

                  {showChatOptions === user.name && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/30 rounded-lg shadow-xl shadow-purple-500/20 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-1">
                        <button
                          onClick={() => {
                            const newPinned = new Set(pinnedChats)
                            if (newPinned.has(user.name)) {
                              newPinned.delete(user.name)
                            } else {
                              newPinned.add(user.name)
                            }
                            setPinnedChats(newPinned)
                            setShowChatOptions(null)
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                        >
                          {pinnedChats.has(user.name) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
                          {pinnedChats.has(user.name) ? "Unpin Chat" : "Pin Chat"}
                        </button>
                        <button
                          onClick={() => {
                            const newMuted = new Set(mutedChats)
                            if (newMuted.has(user.name)) {
                              newMuted.delete(user.name)
                            } else {
                              newMuted.add(user.name)
                            }
                            setMutedChats(newMuted)
                            setShowChatOptions(null)
                          }}
                          className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/10 text-purple-200 text-sm transition-colors duration-200"
                        >
                          {mutedChats.has(user.name) ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                          {mutedChats.has(user.name) ? "Unmute" : "Unmute"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {chatType === "groups" && (
        <div className="p-4 border-t border-purple-500/10">
          <h3 className="text-sm font-semibold text-purple-200 mb-3 uppercase tracking-wide">Team Members</h3>
          <div className="space-y-1">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  setSelectedUser(user)
                  setShowProfile(true)
                }}
                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5 hover:border hover:border-purple-500/20"
              >
                <div className="relative">
                  <Avatar className="w-10 h-10 border-2 border-purple-400/30 shadow-lg shadow-purple-500/20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-violet-500 text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-purple-900 ${getStatusColor(user.status)} shadow-lg`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-purple-100 truncate">{user.name}</h4>
                  <p className="text-sm text-purple-200/70 truncate">{user.role}</p>
                </div>
                <span className="text-xs text-purple-300/60">{user.lastSeen}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatSidebar
