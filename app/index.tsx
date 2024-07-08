import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Switch from "@/components/Switch";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { TextInput as PaperTextInput } from "react-native-paper";
import { FIREBASE_APP } from "@/config/firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hide, setHide] = useState<boolean>(true);

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(FIREBASE_APP),
        email,
        password
      );
      const docRef = doc(
        getFirestore(FIREBASE_APP),
        "users",
        userCredential.user.uid
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { salt, sek } = docSnap.data();
        try {
          await AsyncStorage.setItem("userinfo", JSON.stringify({ salt, sek }));
          router.replace("(tabs)");
        } catch (e: any) {
          console.log(e.message);
        }
      } else {
        console.log("No such document!");
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.switch}>
          <Text>Chế độ Sáng / Tối</Text>
          <Switch></Switch>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <View style={styles.appName}>
            <Text style={styles.title}>App Name</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              label="Email"
              placeholder="Nhập email"
              value={email}
              cb={setEmail}
              secureTextEntry={false}
            ></TextInput>
            <TextInput
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              cb={setPassword}
              secureTextEntry={hide ? true : false}
              right={
                <PaperTextInput.Icon
                  onPress={() => setHide((prev) => !prev)}
                  icon={hide ? "eye-off" : "eye"}
                />
              }
            />
          </View>
          <View style={{ width: "100%", alignItems: "flex-end" }}>
            <Text
              style={{
                color: "blue",
              }}
            >
              Quên mật khẩu?
            </Text>
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <Button
            style={{
              borderRadius: 10,
              height: 40,
            }}
            buttonColor="red"
            textColor="white"
            mode="text"
            cb={handleSignIn}
          >
            <Text style={{ color: "white" }}>Đăng nhập</Text>
          </Button>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={{ color: "blue" }}>Tạo tài khoản</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
  },
  switch: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
  },
  appName: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  form: {
    // borderWidth: 1,
    // borderColor: "red",
    // borderStyle: "solid",
    width: "100%",
    display: "flex",
    gap: 20,
  },
});
