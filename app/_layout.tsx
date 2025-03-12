"use client"

import { Tabs } from "expo-router"
import { Platform } from "react-native"

import { HapticTab } from "@/components/HapticTab"
import { IconSymbol } from "@/components/ui/IconSymbol"
import TabBarBackground from "@/components/ui/TabBarBackground"
import { Colors } from "@/constants/Colors"
import { useColorScheme } from "@/hooks/useColorScheme"
import { Stack } from "expo-router"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { StatusBar } from "react-native"

function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-vaults"
        options={{
          title: "My Vaults",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wallet.pass.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="safari.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  )
}

export default function RootLayout() {
  const router = useRouter()

  // This will redirect to the auth screen when the app starts
  useEffect(() => {
    // You can add your authentication check logic here
    // For now, we'll just redirect to the sign-in screen
    router.replace("/auth/sign-in")
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>
    </>
  )
}

