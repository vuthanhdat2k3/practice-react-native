import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

export default function App(){
    return(
        <View style={styles.container}>
            <Text>Hello, wellcome</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
});