import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { TextInput as PaperTextInput } from "react-native-paper";
import generateSalt from "@/utils/generateSalt";
import generateSek from "@/utils/generateSek";
import { encodeSek } from "@/utils/encryption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { FIREBASE_APP } from "@/config/firebase.config";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Passphrase = () => {
  const [passPhrase, setPassPhrase] = useState("");
  const [hide, setHide] = useState(true);

  const handleOk = async () => {
    const salt = generateSalt(10);
    const sek = await generateSek(10);
    const encryptedSek = passPhrase
      ? encodeSek(sek, passPhrase, salt)
      : undefined;
    if (encryptedSek) {
      try {
        await saveUserToFirestore(salt, encryptedSek);
        await AsyncStorage.setItem(
          "userinfo",
          JSON.stringify({ salt, sek: encryptedSek })
        );
        router.replace("(tabs)");
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const saveUserToFirestore = async (salt: string, encryptedSek: string) => {
    const user = getAuth(FIREBASE_APP).currentUser;
    try {
      await setDoc(doc(getFirestore(FIREBASE_APP), "users", user?.uid), {
        salt: salt,
        sek: encryptedSek,
      });
      console.log("Thành công", "Tài khoản của bạn đã được lưu vào Firestore.");
    } catch (error: any) {
      console.log("Lỗi", error.message);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Nhập vào PassPhrase
        </Text>
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <TextInput
            secureTextEntry={hide ? true : false}
            right={
              <PaperTextInput.Icon
                onPress={() => setHide((prev) => !prev)}
                icon={hide ? "eye-off" : "eye"}
              />
            }
            label="PassPhrase"
            value={passPhrase}
            cb={setPassPhrase}
            placeholder="PassPhrase"
          ></TextInput>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Button
            style={{
              borderRadius: 10,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
            buttonColor="red"
            textColor="white"
            mode="contained"
            cb={handleOk}
          >
            OK
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Passphrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
