import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "@/components";
import generateSalt from "@/utils/generateSalt";
import generateSek from "@/utils/generateSek";
import { encodeAES, hashSHA256 } from "@/utils/encryption";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { FIREBASE_APP } from "@/config/firebase.config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { sendEmail } from "@/utils/mail";
import { generateBaseTemp } from "@/utils/generateHtml";

const Passphrase = () => {
  const [passPhrase, setPassPhrase] = useState("");

  const auth = getAuth(FIREBASE_APP);

  const handleOk = async () => {
    if (passPhrase.length > 0) {
      // create cipher passphrase for feat forget passphrase
      // generate symmetrickey
      const symmetrickeyPassPhrase = await generateSek(20);
      const passphraseEncrypted = encodeAES(symmetrickeyPassPhrase, passPhrase);
      const formatCipherTextEmail = passphraseEncrypted
        ? `${passphraseEncrypted}.${symmetrickeyPassPhrase}`
        : "";

      //generate salt
      const salt = generateSalt(20);

      //generate sek
      const sek = await generateSek(20);

      // step: hash passphrase with salt
      const hashedPassPhrase = hashSHA256(passPhrase + salt);

      // encode sek with alg AES (key: hash passphrase)
      const sekEncrypted = hashedPassPhrase
        ? encodeAES(hashedPassPhrase, sek)
        : undefined;

      // save to db
      if (sekEncrypted) {
        try {
          await saveUserToFirestore(salt, sekEncrypted);
          sendEmail(
            auth.currentUser?.email,
            "Thư Chào Mừng",
            "",
            generateBaseTemp(formatCipherTextEmail, auth.currentUser?.email)
          ).then(() => {});

          router.replace("/");
        } catch (error: any) {
          console.log(error.message);
        }
      }
    }
  };

  const saveUserToFirestore = async (salt: string, sek: string) => {
    const user = getAuth(FIREBASE_APP).currentUser;
    try {
      await setDoc(doc(getFirestore(FIREBASE_APP), "users", user?.uid), {
        sa: salt,
        se: sek,
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
            isPassword
            label="PassPhrase"
            value={passPhrase}
            cb={setPassPhrase}
            placeholder="PassPhrase"
          ></TextInput>
        </View>
        <View></View>
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
