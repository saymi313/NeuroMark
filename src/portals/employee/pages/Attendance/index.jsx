import { useState, useEffect } from "react"
import { Calendar, MapPin, Download, CheckCircle, Clock, XCircle, Map } from "lucide-react"

const getToday = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const getMonthDays = (year, month) => {
  const days = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

async function getCityName(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
    const data = await response.json()
    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.hamlet ||
      data.address.state ||
      data.display_name ||
      "Unknown"
    )
  } catch {
    return "Unknown"
  }
}

export default function Attendance() {
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('attendanceData')
    return saved ? JSON.parse(saved) : {}
  })
  const [isMarking, setIsMarking] = useState(false)
  const [geo, setGeo] = useState(null)
  const [error, setError] = useState("")
  const [month, setMonth] = useState(() => {
    const today = new Date()
    return today.getMonth()
  })
  const [year, setYear] = useState(() => {
    const today = new Date()
    return today.getFullYear()
  })
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingType, setPendingType] = useState(null)

  const todayStr = getToday()
  const monthDays = getMonthDays(year, month)

  useEffect(() => {
    localStorage.setItem('attendanceData', JSON.stringify(attendance))
  }, [attendance])

  const handleMarkAttendance = (type) => {
    // If already marked, ask for confirmation
    if (attendance[todayStr]?.[type]) {
      setPendingType(type)
      setShowConfirm(true)
      return
    }
    markAttendance(type)
  }

  const markAttendance = async (type) => {
    setIsMarking(true)
    setError("")
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.")
      setIsMarking(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setGeo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        const city = await getCityName(position.coords.latitude, position.coords.longitude)
        setAttendance((prev) => {
          const prevDay = prev[todayStr] || {}
          const newDay = {
            ...prevDay,
            [type]: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            [`${type}Geo`]: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            [`${type}City`]: city,
          }
          return { ...prev, [todayStr]: newDay }
        })
        setIsMarking(false)
        setShowConfirm(false)
        setPendingType(null)
      },
      (err) => {
        setError("Failed to get location: " + err.message)
        setIsMarking(false)
        setShowConfirm(false)
        setPendingType(null)
      }
    )
  }

  const handleConfirm = () => {
    if (pendingType) {
      markAttendance(pendingType)
    }
  }

  const handleCancel = () => {
    setShowConfirm(false)
    setPendingType(null)
  }

  const handleResetToday = () => {
    setAttendance((prev) => {
      const newData = { ...prev }
      delete newData[todayStr]
      return newData
    })
  }

  const getStatus = (day) => {
    if (day?.checkIn && day?.checkOut) return { label: "Present", icon: <CheckCircle className="text-green-500" size={16} /> }
    if (day?.checkIn && !day?.checkOut) return { label: "Checked In", icon: <Clock className="text-yellow-500" size={16} /> }
    return { label: "Absent", icon: <XCircle className="text-red-500" size={16} /> }
  }

  const getTotalHours = (day) => {
    if (day?.checkIn && day?.checkOut) {
      const [inH, inM] = day.checkIn.split(":").map(Number)
      const [outH, outM] = day.checkOut.split(":").map(Number)
      let hours = outH - inH + (outM - inM) / 60
      if (hours < 0) hours += 24
      return hours.toFixed(2)
    }
    return "-"
  }

  const handleDownload = () => {
    let csv = "Date,Status,Check In,Check Out,Check In Location,Check In City,Check Out Location,Check Out City,Total Hours\n"
    monthDays.forEach((date) => {
      const dStr = date.toISOString().split('T')[0]
      const day = attendance[dStr] || {}
      const status = getStatus(day).label
      const checkIn = day.checkIn || ""
      const checkOut = day.checkOut || ""
      const checkInLoc = day.checkInGeo ? `${day.checkInGeo.lat},${day.checkInGeo.lng}` : ""
      const checkInCity = day.checkInCity || ""
      const checkOutLoc = day.checkOutGeo ? `${day.checkOutGeo.lat},${day.checkOutGeo.lng}` : ""
      const checkOutCity = day.checkOutCity || ""
      const total = getTotalHours(day)
      csv += `${dStr},${status},${checkIn},${checkOut},${checkInLoc},${checkInCity},${checkOutLoc},${checkOutCity},${total}\n`
    })
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance_${year}_${month + 1}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
          <Download size={18} /> Download Monthly Report
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Today: {todayStr}</div>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1">{getStatus(attendance[todayStr]).icon} {getStatus(attendance[todayStr]).label}</span>
              <span className="ml-4">Check In: <b>{attendance[todayStr]?.checkIn || '-'}</b></span>
              <span className="ml-4">Check Out: <b>{attendance[todayStr]?.checkOut || '-'}</b></span>
              <span className="ml-4">Total: <b>{getTotalHours(attendance[todayStr])} h</b></span>
            </div>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {attendance[todayStr]?.checkInGeo && (
                <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={14} /> In: {attendance[todayStr].checkInGeo.lat.toFixed(4)}, {attendance[todayStr].checkInGeo.lng.toFixed(4)}</span>
              )}
              {attendance[todayStr]?.checkInCity && (
                <span className="flex items-center gap-1 text-xs text-blue-500"><Map size={14} /> {attendance[todayStr].checkInCity}</span>
              )}
              {attendance[todayStr]?.checkOutGeo && (
                <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={14} /> Out: {attendance[todayStr].checkOutGeo.lat.toFixed(4)}, {attendance[todayStr].checkOutGeo.lng.toFixed(4)}</span>
              )}
              {attendance[todayStr]?.checkOutCity && (
                <span className="flex items-center gap-1 text-xs text-blue-500"><Map size={14} /> {attendance[todayStr].checkOutCity}</span>
              )}
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => handleMarkAttendance('checkIn')}
              disabled={isMarking}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Mark Check In
            </button>
            <button
              onClick={() => handleMarkAttendance('checkOut')}
              disabled={isMarking || !attendance[todayStr]?.checkIn}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              Mark Check Out
            </button>
            <button
              onClick={handleResetToday}
              disabled={isMarking || !attendance[todayStr]}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 disabled:opacity-50"
            >
              Reset
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {showConfirm && (
          <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 flex flex-col gap-2">
            <span>
              You have already marked {pendingType === 'checkIn' ? 'Check In' : 'Check Out'} for today. Do you want to overwrite it?
            </span>
            <div className="flex gap-2">
              <button onClick={handleConfirm} className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Yes, Overwrite</button>
              <button onClick={handleCancel} className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <button onClick={() => setMonth(m => m - 1)} disabled={month === 0} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Prev</button>
            <span className="font-semibold">{new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={() => setMonth(m => m + 1)} disabled={month === 11} className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Next</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
                <th className="p-2">Check In</th>
                <th className="p-2">Check Out</th>
                <th className="p-2">Check In Location</th>
                <th className="p-2">Check In City</th>
                <th className="p-2">Check Out Location</th>
                <th className="p-2">Check Out City</th>
                <th className="p-2">Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {monthDays.map((date) => {
                const dStr = date.toISOString().split('T')[0]
                const day = attendance[dStr] || {}
                const status = getStatus(day)
                return (
                  <tr key={dStr} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="p-2">{dStr}</td>
                    <td className="p-2 flex items-center gap-1">{status.icon} {status.label}</td>
                    <td className="p-2">{day.checkIn || '-'}</td>
                    <td className="p-2">{day.checkOut || '-'}</td>
                    <td className="p-2">{day.checkInGeo ? `${day.checkInGeo.lat.toFixed(4)}, ${day.checkInGeo.lng.toFixed(4)}` : '-'}</td>
                    <td className="p-2">{day.checkInCity || '-'}</td>
                    <td className="p-2">{day.checkOutGeo ? `${day.checkOutGeo.lat.toFixed(4)}, ${day.checkOutGeo.lng.toFixed(4)}` : '-'}</td>
                    <td className="p-2">{day.checkOutCity || '-'}</td>
                    <td className="p-2">{getTotalHours(day)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
