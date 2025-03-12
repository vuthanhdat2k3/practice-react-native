import React, { useState } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  FlatList,
  Image,
  ScrollView
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MenuBar from "@/components/MenuBar"
import SideMenu from "@/components/SideMenu"

interface NotificationItemProps {
  title: string
  message: string
  time: string
  type: 'activity' | 'alert' | 'info'
  read: boolean
  onPress: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  title, 
  message, 
  time, 
  type, 
  read,
  onPress
}) => {
  const getIconName = () => {
    switch (type) {
      case 'activity': return 'people-outline'
      case 'alert': return 'alert-circle-outline'
      case 'info': return 'information-circle-outline'
      default: return 'notifications-outline'
    }
  }
  
  const getIconColor = () => {
    switch (type) {
      case 'activity': return '#3498db'
      case 'alert': return '#e74c3c'
      case 'info': return '#2ecc71'
      default: return '#f39c12'
    }
  }
  
  return (
    <TouchableOpacity 
      style={[styles.notificationItem, read ? styles.notificationRead : null]} 
      onPress={onPress}
    >
      <View style={[styles.notificationIcon, { backgroundColor: getIconColor() }]}>
        <Ionicons name={getIconName()} size={20} color="#fff" />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{title}</Text>
          <Text style={styles.notificationTime}>{time}</Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>{message}</Text>
      </View>
      {!read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )
}

const notifications = [
  {
    id: '1',
    title: 'New Connection',
    message: 'Sarah Johnson accepted your connection request',
    time: '5 min ago',
    type: 'activity' as const,
    read: false
  },
  {
    id: '2',
    title: 'Vault Update',
    message: 'Your "Documents" vault has been updated with 3 new items',
    time: '1 hour ago',
    type: 'info' as const,
    read: false
  },
  {
    id: '3',
    title: 'Security Alert',
    message: 'Unusual login attempt detected from a new device. Please verify if this was you.',
    time: '3 hours ago',
    type: 'alert' as const,
    read: false
  },
  {
    id: '4',
    title: 'New Feature',
    message: 'Check out our new calendar integration feature! Plan and organize your events more efficiently.',
    time: 'Yesterday',
    type: 'info' as const,
    read: true
  },
  {
    id: '5',
    title: 'Content Shared',
    message: 'Michael Brown shared a document with you: "Project Proposal Q3"',
    time: 'Yesterday',
    type: 'activity' as const,
    read: true
  },
  {
    id: '6',
    title: 'Reminder',
    message: 'Don\'t forget about your meeting with the design team tomorrow at 10:00 AM',
    time: '2 days ago',
    type: 'info' as const,
    read: true
  },
  {
    id: '7',
    title: 'Storage Alert',
    message: 'You\'ve used 85% of your storage space. Consider upgrading your plan or removing unused items.',
    time: '3 days ago',
    type: 'alert' as const,
    read: true
  }
]

export default function NotificationsScreen() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [notificationList, setNotificationList] = useState(notifications)
  
  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    )
  }
  
  const getFilteredNotifications = () => {
    switch (activeTab) {
      case 'unread':
        return notificationList.filter(item => !item.read)
      case 'activity':
        return notificationList.filter(item => item.type === 'activity')
      case 'alerts':
        return notificationList.filter(item => item.type === 'alert')
      default:
        return notificationList
    }
  }
  
  const markAllAsRead = () => {
    setNotificationList(prev => 
      prev.map(item => ({ ...item, read: true }))
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <MenuBar 
        title="Notifications" 
        onMenuPress={() => setMenuVisible(true)} 
        rightComponent={
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        }
      />
      <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'all' && styles.activeTab]} 
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'unread' && styles.activeTab]} 
            onPress={() => setActiveTab('unread')}
          >
            <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>Unread</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationList.filter(item => !item.read).length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'activity' && styles.activeTab]} 
            onPress={() => setActiveTab('activity')}
          >
            <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'alerts' && styles.activeTab]} 
            onPress={() => setActiveTab('alerts')}
          >
            <Text style={[styles.tabText, activeTab === 'alerts' && styles.activeTabText]}>Alerts</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={getFilteredNotifications()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            message={item.message}
            time={item.time}
            type={item.type}
            read={item.read}
            onPress={() => markAsRead(item.id)}
          />
        )}
        contentContainerStyle={styles.notificationsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  markAllButton: {
    paddingHorizontal: 10,
  },
  markAllText: {
    color: "#3498db",
    fontSize: 14,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabs: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
  },
  tabText: {
    fontSize: 15,
    color: "#777",
  },
  activeTabText: {
    color: "#3498db",
    fontWeight: "600",
  },
  badge: {
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  notificationsList: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    position: "relative",
  },
  notificationRead: {
    opacity: 0.7,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  unreadDot: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3498db",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: "#999",
  },
})
