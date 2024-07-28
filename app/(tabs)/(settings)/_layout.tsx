import { Stack } from "expo-router";
import React from "react";
import AlertContext from "@/context/MyContext";

export default function SettingLayout() {
  return (
    <AlertContext>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "General",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "Profile",
          }}
        />
        <Stack.Screen
          name="add-product"
          options={{
            title: "Add Product",
          }}
        />
        <Stack.Screen
          name="product"
          options={{
            title: "Product",
            headerShown: true,
          }}
        />
      </Stack>
    </AlertContext>
  );
}
