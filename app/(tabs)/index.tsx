"use client"

import type React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import MenuBar from "@/components/MenuBar"
import SideMenu from "@/components/SideMenu"

interface CategoryItemProps {
  title: string
  imageSource: any
  subtitle?: string
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, imageSource, subtitle }) => {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={imageSource} style={styles.categoryImage} />
      <View style={styles.categoryOverlay} />
      <Text style={styles.categoryTitle}>{title}</Text>
      {subtitle && <Text style={styles.categorySubtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  )
}

interface FeaturedItemProps {
  title: string
  imageSource: any
  description: string
}

const FeaturedItem: React.FC<FeaturedItemProps> = ({ title, imageSource, description }) => {
  return (
    <TouchableOpacity style={styles.featuredItem}>
      <Image source={imageSource} style={styles.featuredImage} />
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{title}</Text>
        <Text style={styles.featuredDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const featuredData = [
  {
    id: "1",
    title: "Summer Collection",
    description: "Explore our latest summer collection with exclusive discounts",
    imageSource: require("@/assets/images/onepiece.jpg"),
  },
  {
    id: "2",
    title: "Tech Showcase",
    description: "The newest gadgets and innovations in technology",
    imageSource: require("@/assets/images/onepiece.jpg"),
  },
  {
    id: "3",
    title: "Fitness Challenge",
    description: "Join our 30-day fitness challenge and win exciting prizes",
    imageSource: require("@/assets/images/onepiece.jpg"),
  },
]

const recentCategories = [
  { id: "1", title: "Recently Viewed", subtitle: "5 items", imageSource: require("@/assets/images/onepiece.jpg") },
  { id: "2", title: "Your Favorites", subtitle: "12 items", imageSource: require("@/assets/images/onepiece.jpg") },
  {
    id: "3",
    title: "Trending Now",
    subtitle: "Popular this week",
    imageSource: require("@/assets/images/onepiece.jpg"),
  },
  { id: "4", title: "New Arrivals", subtitle: "Just added", imageSource: require("@/assets/images/onepiece.jpg") },
]

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("for-you")

  return (
    <SafeAreaView style={styles.container}>
      <MenuBar title="Home" onMenuPress={() => setMenuVisible(true)} />

      <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#777" />
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSelectorContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={activeTab === "for-you" ? styles.tabActive : styles.tab}
            onPress={() => setActiveTab("for-you")}
          >
            <Text style={activeTab === "for-you" ? styles.tabTextActive : styles.tabText}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === "following" ? styles.tabActive : styles.tab}
            onPress={() => setActiveTab("following")}
          >
            <Text style={activeTab === "following" ? styles.tabTextActive : styles.tabText}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Welcome Banner */}
        <View style={styles.welcomeBanner}>
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>Discover what's new today</Text>
        </View>

        {/* Featured Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={featuredData}
            renderItem={({ item }) => (
              <FeaturedItem title={item.title} imageSource={item.imageSource} description={item.description} />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Recent Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            {recentCategories.map((item) => (
              <CategoryItem key={item.id} title={item.title} subtitle={item.subtitle} imageSource={item.imageSource} />
            ))}
          </View>
        </View>

        {/* Popular Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoriesGrid}>
            <CategoryItem title="Fitness" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Gaming" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Brand" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Business" imageSource={require("@/assets/images/onepiece.jpg")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tabSelectorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  tabActive: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#000",
  },
  tabText: {
    fontSize: 16,
    color: "#000",
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  welcomeBanner: {
    backgroundColor: "#3498db",
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    fontSize: 14,
    color: "#3498db",
  },
  featuredList: {
    paddingRight: 16,
  },
  featuredItem: {
    width: 280,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  featuredImage: {
    width: "100%",
    height: 150,
  },
  featuredContent: {
    padding: 12,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  featuredDescription: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  categoryItem: {
    width: "48%",
    aspectRatio: 1.5,
    marginBottom: 16,
    marginHorizontal: "1%",
    position: "relative",
  },
  categoryImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  categoryTitle: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  categorySubtitle: {
    position: "absolute",
    bottom: 5,
    left: 20,
    color: "white",
    fontSize: 14,
    opacity: 0.9,
  },
})

