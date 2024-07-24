import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "@/components";
import { useSession } from "@/context/SessionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodeAES, hashSHA256 } from "@/utils/encryption";
import { router } from "expo-router";

const EnterCodeScreen = () => {
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");

  const { startSession, setSekDecode } = useSession();

  const handleSubmit = async () => {
    const userInfo = await AsyncStorage.getItem("userinfo");

    if (userInfo) {
      const { salt, sek } = JSON.parse(userInfo);
      const passphraseHash = hashSHA256(passphrase + salt);

      if (passphraseHash) {
        try {
          const sekDecode = decodeAES(passphraseHash, sek);
          if (sekDecode) {
            if (setSekDecode) {
              setSekDecode(sekDecode);
            }
            startSession();
            router.replace("(home)");
          } else {
            setError("invalid value");
            console.log("passphrase sai!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      alert("Mã không hợp lệ, vui lòng thử lại.");
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
            isPassword
            label="PassPhrase"
            value={passphrase}
            cb={setPassphrase}
            placeholder="PassPhrase"
          ></TextInput>
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
            mode="contained"
            cb={handleSubmit}
          >
            OK
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});

export default EnterCodeScreen;
