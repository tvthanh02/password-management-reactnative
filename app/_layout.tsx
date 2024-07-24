import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

//import { useColorScheme } from "@/hooks/useColorScheme";
import { checkLogin } from "@/utils/checkLogin";
import { router } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    (async () => {
      if (loaded) {
        let login = await checkLogin();
        SplashScreen.hideAsync();
        if (login) {
          router.replace("(tabs)");
        }
      }
    })();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    //   <Stack>
    //     <Stack.Screen name="index" options={{ headerShown: false }} />
    //     <Stack.Screen name="register" options={{ headerShown: false }} />
    //     <Stack.Screen name="verify-email" options={{ headerShown: false }} />
    //     <Stack.Screen name="passphrase" options={{ headerShown: false }} />

    //     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    //     <Stack.Screen name="+not-found" />
    //   </Stack>
    // </ThemeProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="verify-email" options={{ headerShown: false }} />
      <Stack.Screen name="passphrase" options={{ headerShown: false }} />
      <Stack.Screen name="forget-passphrase" options={{ headerShown: false }} />
      <Stack.Screen name="new-passphrase" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
