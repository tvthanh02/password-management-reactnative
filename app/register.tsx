import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/TextInput";
import { TextInput as PaperTextInput } from "react-native-paper";
import Button from "@/components/Button";
import { FIREBASE_APP } from "../config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(FIREBASE_APP),
        email,
        password
      );
      await sendEmailVerification(userCredential.user);

      router.replace({
        pathname: "/verify-email",
        params: { email: email },
      });
    } catch (error: any) {
      alert(`Lỗi ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            display: "flex",
            gap: 20,
          }}
        >
          <Text style={styles.title}>Bắt đầu ngay thôi!</Text>
          <TextInput
            secureTextEntry={false}
            label="Địa chỉ Email"
            placeholder="Nhập email"
            value={email}
            cb={setEmail}
          ></TextInput>
          <TextInput
            secureTextEntry={hidePassword || false}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            value={password}
            cb={setPassword}
            right={
              <PaperTextInput.Icon
                onPress={() => setHidePassword((prev) => !prev)}
                icon={hidePassword ? "eye-off" : "eye"}
              />
            }
          ></TextInput>
          <Text
            style={{
              lineHeight: 25,
            }}
          >
            Bằng việc hoàn thiện điền địa chỉ email, tôi đồng ý các{" "}
            <Link style={{ color: "blue" }} href="/register">
              điều kiện
            </Link>{" "}
            và{" "}
            <Link style={{ color: "blue" }} href="/register">
              Chính sách
            </Link>
            .Tôi muốn nhận thông báo về email, trừ khi tôi không tham gia.
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            display: "flex",
            gap: 30,
          }}
        >
          <Button
            style={{
              borderRadius: 10,
              height: 40,
            }}
            buttonColor="red"
            mode="contained"
            textColor="white"
            cb={handleSignUp}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Đăng ký
            </Text>
          </Button>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Text
                style={{
                  width: "100%",

                  color: "blue",
                }}
              >
                Quay lại đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 60,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
