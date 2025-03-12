import { View, Text, StyleSheet } from "react-native"

export default function MyVaultsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Vaults</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
})

