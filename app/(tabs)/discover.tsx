import type React from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, TextInput } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

interface CategoryItemProps {
  title: string
  imageSource: any
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, imageSource }) => {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={imageSource} style={styles.categoryImage} />
      <View style={styles.categoryOverlay} />
      <Text style={styles.categoryTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default function DiscoverScreen() {
    return (
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#777" />
        </View>
  
       {/* Tab Selector */}
       <View style={styles.tabSelectorContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tabActive}>
              <Text style={styles.tabTextActive}>Interest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Location</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {/* Categories Grid */}
        <ScrollView style={styles.scrollView}>
          <View style={styles.categoriesGrid}>
            <CategoryItem title="Fitness" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Gaming" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Brand" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Business" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Entertainment" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Technology" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Finance" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Cultural" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Cause" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Career" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Travel" imageSource={require("@/assets/images/onepiece.jpg")} />
            <CategoryItem title="Fashion" imageSource={require("@/assets/images/onepiece.jpg")} />
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
    categoriesGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 8,
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
    bottomNav: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderTopColor: "#eee",
      paddingVertical: 10,
    },
    navItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    navText: {
      fontSize: 12,
      color: "#777",
      marginTop: 4,
    },
    navTextActive: {
      fontSize: 12,
      color: "#3498db",
      marginTop: 4,
    },
  })

