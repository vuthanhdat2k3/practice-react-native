"use client"

import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Modal,
  Pressable,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

interface MenuItem {
  icon: string
  label: string
  route?: string
  onPress?: () => void
}

interface SideMenuProps {
  isVisible: boolean
  onClose: () => void
}

const menuItems: MenuItem[] = [
  { icon: "home-outline", label: "Home", route: "/(tabs)" },
  { icon: "wallet-outline", label: "My Vaults", route: "/(tabs)/my-vaults" },
  { icon: "compass-outline", label: "Discover", route: "/(tabs)/discover" },
  { icon: "notifications-outline", label: "Notifications", route: "/(tabs)/notifications" },
  { icon: "calendar-outline", label: "Calendar", route: "/(tabs)/calendar" },
  { icon: "settings-outline", label: "Settings" },
  { icon: "help-circle-outline", label: "Help & Support" },
  { icon: "information-circle-outline", label: "About" },
]

export default function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const router = useRouter()
  const slideAnim = React.useRef(new Animated.Value(-300)).current
  const screenWidth = Dimensions.get("window").width
  const menuWidth = screenWidth * 0.75

  React.useEffect(() => {
    if (isVisible) {
      // Reset position to left side before animating in
      slideAnim.setValue(-menuWidth)
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: -menuWidth,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [isVisible, slideAnim, menuWidth])

  const handleMenuItemPress = (item: MenuItem) => {
    onClose()
    if (item.route) {
      router.push(item.route)
    } else if (item.onPress) {
      item.onPress()
    }
  }

  const handleSignOut = () => {
    onClose()
    router.replace("/auth/sign-in")
  }

  if (!isVisible) return null

  return (
    <Modal transparent visible={isVisible} animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.menuContainer,
            {
              width: menuWidth,
              transform: [{ translateX: slideAnim }],
              left: 0, // Explicitly position on the left
              right: undefined, // Remove any right positioning
            },
          ]}
        >
          <View style={styles.userSection}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitials}>JD</Text>
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem} onPress={() => handleMenuItemPress(item)}>
                <Ionicons name={item.icon as any} size={24} color="#555" />
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>

        <Pressable style={styles.backdrop} onPress={onClose} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    position: "absolute", // Position absolutely
    left: 0, // Ensure it's on the left side
    height: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10, // Ensure it's above the backdrop
  },
  userSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
  },
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  userInitials: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#3498db",
    borderRadius: 20,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "500",
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  signOutText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "500",
  },
})

