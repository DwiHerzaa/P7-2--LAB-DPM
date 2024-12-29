import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import API_URL from "../../config/config";

export default function RegisterScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleRegister = async () => {
		try {
			await axios.post(`${API_URL}/api/auth/register`, {
				username,
				password,
				email,
			});
			Alert.alert("Registration Successful", "You can now log in");
			router.replace("/auth/LoginScreen");
		} catch (error) {
			Alert.alert("Registration Failed", (error as any).response?.data?.message || "An error occurred");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}> {/* Added a centered header view */}
				<Image
					source={require("../../assets/images/favicon1.png")}
					style={styles.image}
				/>
				<Text style={styles.title}>Create an Account</Text>
				<Text style={styles.subtitle}>Join us and get started</Text>
			</View>

			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<TouchableOpacity
				style={styles.registerButton}
				onPress={handleRegister}
			>
				<Text style={styles.registerButtonText}>Register</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => router.replace("/auth/LoginScreen")}
			>
				<Text style={styles.backButtonText}>Back to Login</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    header: {
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,
      paddingTop: 50,
    },
    image: {
      width: 120,
      height: 120,
      marginBottom: 16,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#ffffff",
      textAlign: "center",
    },
    subtitle: {
      fontSize: 18,
      color: "#e0e0e0",
      textAlign: "center",
    },
    input: {
      width: "100%",
      height: 48,
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: "#ffffff30",
      fontSize: 16,
      color: "#ffffff",
      marginBottom: 16,
    },
    registerButton: {
      width: "100%",
      height: 48,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff30",
      marginBottom: 16,
    },
    registerButtonText: {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "600",
    },
    backButton: {
      width: "100%",
      height: 48,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ffffff",
    },
    backButtonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
