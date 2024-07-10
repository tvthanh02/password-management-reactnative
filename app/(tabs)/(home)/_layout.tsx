import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="add-new"
        options={{
          headerShown: true,
          title: "Thêm Mật Khẩu",
        }}
      />
      <Stack.Screen name="add-new-detail" />
    </Stack>
  );
}
