import React, { useState } from "react"
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MenuBar from "@/components/MenuBar"
import SideMenu from "@/components/SideMenu"

interface VaultItemProps {
  title: string
  count: number
  icon: string
  color: string
}

const VaultItem: React.FC<VaultItemProps> = ({ title, count, icon, color }) => {
  return (
    <TouchableOpacity style={styles.vaultItem}>
      <View style={[styles.vaultIcon, { backgroundColor: color }]}>
        <Ionicons name={icon as any} size={24} color="#fff" />
      </View>
      <View style={styles.vaultInfo}>
        <Text style={styles.vaultTitle}>{title}</Text>
        <Text style={styles.vaultCount}>{count} items</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  )
}

const vaultCategories = [
  { id: '1', title: 'Personal', vaults: [
    { id: '1', title: 'Photos', count: 124, icon: 'images-outline', color: '#3498db' },
    { id: '2', title: 'Documents', count: 56, icon: 'document-text-outline', color: '#2ecc71' },
    { id: '3', title: 'Passwords', count: 18, icon: 'lock-closed-outline', color: '#e74c3c' },
  ]},
  { id: '2', title: 'Work', vaults: [
    { id: '4', title: 'Projects', count: 7, icon: 'briefcase-outline', color: '#9b59b6' },
    { id: '5', title: 'Meetings', count: 12, icon: 'people-outline', color: '#f39c12' },
    { id: '6', title: 'Resources', count: 34, icon: 'folder-outline', color: '#1abc9c' },
  ]},
  { id: '3', title: 'Finance', vaults: [
    { id: '7', title: 'Receipts', count: 87, icon: 'receipt-outline', color: '#e67e22' },
    { id: '8', title: 'Investments', count: 5, icon: 'trending-up-outline', color: '#27ae60' },
    { id: '9', title: 'Expenses', count: 43, icon: 'cash-outline', color: '#c0392b' },
  ]}
]

export default function MyVaultsScreen() {
  const [menuVisible, setMenuVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('1')

  return (
    <SafeAreaView style={styles.container}>
      <MenuBar title="My Vaults" onMenuPress={() => setMenuVisible(true)} />
      <SideMenu isVisible={menuVisible} onClose={() => setMenuVisible(false)} />
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>9</Text>
          <Text style={styles.statLabel}>Vaults</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>386</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>2.4 GB</Text>
          <Text style={styles.statLabel}>Storage</Text>
        </View>
      </View>
      
      <View style={styles.categoryTabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryTabs}
        >
          {vaultCategories.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryTab, 
                activeCategory === category.id && styles.categoryTabActive
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryTabText,
                  activeCategory === category.id && styles.categoryTabTextActive
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.vaultList}>
          {vaultCategories
            .find(category => category.id === activeCategory)?.vaults
            .map(vault => (
              <VaultItem 
                key={vault.id}
                title={vault.title}
                count={vault.count}
                icon={vault.icon}
                color={vault.color}
              />
            ))}
        </View>
        
        <TouchableOpacity style={styles.createVaultButton}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.createVaultText}>Create New Vault</Text>
        </TouchableOpacity>
        
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentItems}
          >
            {[1, 2, 3, 4].map(item => (
              <TouchableOpacity key={item} style={styles.recentItem}>
                <Image 
                  source={require("@/assets/images/onepiece.jpg")} 
                  style={styles.recentItemImage} 
                />
                <Text style={styles.recentItemText}>Item {item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: "#ddd",
    alignSelf: "center",
  },
  categoryTabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryTabs: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  categoryTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
  },
  categoryTabText: {
    fontSize: 15,
    color: "#777",
  },
  categoryTabTextActive: {
    color: "#3498db",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  vaultList: {
    padding: 16,
  },
  vaultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 12,
  },
  vaultIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  vaultInfo: {
    flex: 1,
  },
  vaultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  vaultCount: {
    fontSize: 13,
    color: "#777",
  },
  createVaultButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  createVaultText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
  },
  recentSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  recentItems: {
    paddingBottom: 16,
  },
  recentItem: {
    width: 100,
    marginRight: 12,
    alignItems: "center",
  },
  recentItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  recentItemText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
})
