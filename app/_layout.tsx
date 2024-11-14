import { Stack } from "expo-router";
import { setStatusBarStyle } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    // Prevent the splash screen from auto-hiding
    SplashScreen.preventAutoHideAsync();

    const prepareApp = async () => {
      try {
        // Set the status bar style
        setStatusBarStyle("light");

        // Perform app initialization tasks (e.g., data fetching, etc.)
        // Here, you can add any async functions needed to prepare your app
      } catch (e) {
        console.warn(e);
      } finally {
        // Set app ready to true
        setIsAppReady(true);
        // Hide the splash screen
        SplashScreen.hideAsync();
      }
    };

    prepareApp();
  }, []);

  if (!isAppReady) {
    return null; // Keep splash screen visible until app is ready
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}