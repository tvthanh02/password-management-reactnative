import { Tabs } from "expo-router";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Setting",
          tabBarIcon: () => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
