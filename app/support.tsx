import React, { useEffect } from "react";
import { View, ActivityIndicator, Linking } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import Colors from "@/constants/colors";

export default function SupportRedirectScreen() {
  useEffect(() => {
    const redirect = async () => {
      const url = "https://appmyjantes.mytoolsgroup.eu/support";
      try {
        await WebBrowser.openBrowserAsync(url);
      } catch {
        Linking.openURL(url);
      }
      router.back();
    };
    redirect();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
