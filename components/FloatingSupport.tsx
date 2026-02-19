import React from "react";
import { Pressable, StyleSheet, Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";
import Colors from "@/constants/colors";

export function FloatingSupport() {
  const insets = useSafeAreaInsets();

  const handlePress = async () => {
    const url = "https://appmyjantes.mytoolsgroup.eu/support";
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Linking.openURL(url);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.fab,
        {
          bottom: Platform.OS === "web" ? 34 + 70 : insets.bottom + 70,
        },
        pressed && styles.fabPressed,
      ]}
      onPress={handlePress}
    >
      <Ionicons name="chatbubble-ellipses" size={22} color="#fff" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
  fabPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.95 }],
  },
});
