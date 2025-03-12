"use client"

import type React from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

interface MenuBarProps {
  title?: string
  showBackButton?: boolean
  showMenuButton?: boolean
  onMenuPress?: () => void
  rightComponent?: React.ReactNode
}

export default function MenuBar({
  title = "Home",
  showBackButton = false,
  showMenuButton = true,
  onMenuPress,
  rightComponent,
}: MenuBarProps) {
  const router = useRouter()

  const handleBackPress = () => {
    router.back()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity style={styles.iconButton} onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
          )}

          {showMenuButton && (
            <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
              <Ionicons name="menu" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightSection}>
          {rightComponent || (
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    width: 80,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 80,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
})

