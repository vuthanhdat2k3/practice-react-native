"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Link, router } from "expo-router"

export default function SignUpScreen() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignUp = () => {
    // Implement your sign up logic here
    console.log("Sign up with:", name, email, password)
    // Navigate to home screen after successful sign up
    router.replace("/")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/onepiece.jpg")}
              style={styles.logo}
              defaultSource={require("@/assets/images/onepiece.jpg")}
            />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#777" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity style={styles.checkbox}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={20} color="#4267B2" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="./sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: "#f9f9f9",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#777",
  },
  termsLink: {
    color: "#3498db",
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "#3498db",
    borderRadius: 12,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  footerText: {
    color: "#777",
    fontSize: 14,
  },
  footerLink: {
    color: "#3498db",
    fontSize: 14,
    fontWeight: "bold",
  },
})

