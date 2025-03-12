"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MenuBar from "@/components/MenuBar"
import SideMenu from "@/components/SideMenu"

// Helper to generate dates for the calendar
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay()
}

interface CalendarDayProps {
  day: number | null
  isToday?: boolean
  isSelected?: boolean
  hasEvents?: boolean
  onPress?: () => void
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isToday, isSelected, hasEvents, onPress }) => {
  if (day === null) {
    return <View style={styles.calendarDay} />
  }

  return (
    <TouchableOpacity
      style={[styles.calendarDay, isToday && styles.calendarDayToday, isSelected && styles.calendarDaySelected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.calendarDayText,
          isToday && styles.calendarDayTextToday,
          isSelected && styles.calendarDayTextSelected,
        ]}
      >
        {day}
      </Text>
      {hasEvents && <View style={styles.eventDot} />}
    </TouchableOpacity>
  )
}

interface EventItemProps {
  title: string
  time: string
  location?: string
  color: string
}

const EventItem: React.FC<EventItemProps> = ({ title, time, location, color }) => {
  return (
    <TouchableOpacity style={styles.eventItem}>
      <View style={[styles.eventColor, { backgroundColor: color }]} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventTime}>{time}</Text>
        {location && <Text style={styles.eventLocation}>{location}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  )
}

// Sample events data
const events = [
  {
    id: "1",
    title: "Team Meeting",
    time: "09:00 - 10:30 AM",
    location: "Conference Room A",
    color: "#3498db",
    date: new Date(2023, 6, 15),
  },
  {
    id: "2",
    title: "Lunch with Sarah",
    time: "12:30 - 01:30 PM",
    location: "Cafe Bistro",
    color: "#2ecc71",
    date: new Date(2023, 6, 15),
  },
  {
    id: "3",
    title: "Project Review",
    time: "03:00 - 04:00 PM",
    location: "Meeting Room 3",
    color: "#e74c3c",
    date: new Date(2023, 6, 15),
  },
  {
    id: "4",
    title: "Dentist Appointment",
    time: "10:00 - 11:00 AM",
    location: "Dental Clinic",
    color: "#9b59b6",
    date: new Date(2023, 6, 17),
  },
  {
    id: "5",
    title: "Gym Session",
    time: "06:00 - 07:30 PM",
    location: "Fitness Center",
    color: "#f39c12",
    date: new Date(2023, 6, 18),
  },
]

export default function CalendarScreen() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  const today = new Date()
  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    )
  }

  const hasEvents = (day: number) => {
    return events.some(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentMonth &&
        event.date.getFullYear() === currentYear,
    )
  }

  const getSelectedDateEvents = () => {
    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const renderCalendarDays = () => {
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<CalendarDay key={`empty-${i}`} day={null} />)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <CalendarDay
          key={`day-${day}`}
          day={day}
          isToday={isToday(day)}
          isSelected={isSelected(day)}
          hasEvents={hasEvents(day)}
          onPress={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
        />,
      )
    }

    return days
  }

  return (
    <SafeAreaView style={styles.container}>
      <MenuBar
        title="Calendar"
        onMenuPress={() => setMenuVisible(true)}
        rightComponent={
          <TouchableOpacity
            style={styles.todayButton}
            onPress={() => {
              setCurrentDate(new Date())
              setSelectedDate(new Date())
            }}
          >
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
        }
      />
      <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />

      <View style={styles.calendarHeader}>
        <TouchableOpacity onPress={previousMonth}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.calendarTitle}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={nextMonth}>
          <Ionicons name="chevron-forward" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDaysContainer}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>{renderCalendarDays()}</View>

      <View style={styles.eventsContainer}>
        <View style={styles.eventsHeader}>
          <Text style={styles.eventsTitle}>
            Events for {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
          </Text>
          <TouchableOpacity style={styles.addEventButton}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={getSelectedDateEvents()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <EventItem title={item.title} time={item.time} location={item.location} color={item.color} />
          )}
          contentContainerStyle={styles.eventsList}
          ListEmptyComponent={
            <View style={styles.emptyEventsContainer}>
              <Ionicons name="calendar-outline" size={60} color="#ccc" />
              <Text style={styles.emptyEventsText}>No events for this day</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todayButton: {
    paddingHorizontal: 10,
  },
  todayButtonText: {
    color: "#3498db",
    fontSize: 14,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  weekDaysContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  calendarDay: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  calendarDayToday: {
    backgroundColor: "#f0f8ff",
    borderRadius: 20,
  },
  calendarDaySelected: {
    backgroundColor: "#3498db",
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 16,
    color: "#333",
  },
  calendarDayTextToday: {
    color: "#3498db",
    fontWeight: "bold",
  },
  calendarDayTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  eventDot: {
    position: "absolute",
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3498db",
  },
  eventsContainer: {
    flex: 1,
    padding: 16,
  },
  eventsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addEventButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  eventsList: {
    paddingBottom: 20,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  eventColor: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: "#777",
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 13,
    color: "#999",
  },
  emptyEventsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyEventsText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
})

