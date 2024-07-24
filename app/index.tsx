import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TextInput, Button, Switch, TextLink, Alert } from "@/components/";
import { FIREBASE_APP } from "@/config/firebase.config";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider, DefaultTheme } from "react-native-paper";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [theme, setTheme] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState<string>("");

  // handle signin
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
        const { sa, se } = docSnap.data();
        try {
          await AsyncStorage.setItem(
            "userinfo",
            JSON.stringify({ salt: sa, sek: se })
          );
          router.replace("(tabs)");
        } catch (e: any) {
          console.log(e.message);
        }
      } else {
        console.log("No such document!");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  // handle forget password
  const handleForgetPassword = async () => {
    try {
      await sendPasswordResetEmail(getAuth(FIREBASE_APP), email);
      setOpenAlert(true);
      setContentAlert(
        "Reset Password Link đã được gửi. Hãy kiểm tra email của bạn!"
      );
    } catch (e: any) {
      setError(e.message);
    }
  };

  const childTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "gray",
      //accent: "green",
    },
  };

  return (
    <PaperProvider theme={childTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.switch}>
            <Text>Chế độ Sáng / Tối</Text>
            <Switch status={theme} onChange={() => setTheme((prev) => !prev)} />
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
              ></TextInput>
              <TextInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={password}
                cb={setPassword}
                isPassword={true}
              />
            </View>
            {error && (
              <Text
                style={{
                  color: "red",
                }}
              >
                {error}
              </Text>
            )}
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <TextLink
                title="Quên mật khẩu?"
                style={{ color: "blue" }}
                navigate={() => handleForgetPassword()}
              />
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
              disabled={!email || !password ? true : false}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                height: 50,
              }}
              buttonColor="red"
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
              <TextLink
                title="Tạo tài khoản"
                style={{
                  color: "blue",
                }}
                navigate={() => router.push("/register")}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Alert
        show={openAlert}
        content={contentAlert}
        cb={() => setOpenAlert((prev) => !prev)}
      />
    </PaperProvider>
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
