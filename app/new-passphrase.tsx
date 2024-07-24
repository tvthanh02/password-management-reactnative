import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "@/components";
import { decodeAES, encodeAES, hashSHA256 } from "@/utils/encryption";
import { getAuth, signOut } from "firebase/auth";
import { FIREBASE_APP } from "@/config/firebase.config";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import generateSek from "@/utils/generateSek";
import { sendEmail } from "@/utils/mail";
import { generateBaseTemp } from "@/utils/generateHtml";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NewPassphrase = () => {
  const [passPhrase, setPassPhrase] = useState("");
  const { oldPassphrase } = useGlobalSearchParams();

  const auth = getAuth(FIREBASE_APP).currentUser;

  const handleOk = async () => {
    if (passPhrase.length > 0) {
      const docRef = doc(getFirestore(FIREBASE_APP), "users", auth?.uid);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { sa, se } = docSnap.data();
          if (oldPassphrase) {
            const hashOldPassphrase = hashSHA256(oldPassphrase + sa);
            if (hashOldPassphrase) {
              const sekDecode = decodeAES(hashOldPassphrase, se);
              if (sekDecode) {
                const hashNewPassphrase = hashSHA256(passPhrase + sa);
                if (hashNewPassphrase) {
                  try {
                    const newSekEncode = encodeAES(
                      hashNewPassphrase,
                      sekDecode
                    );
                    newSekEncode &&
                      (await UpdateUserToFirestore(sa, newSekEncode));
                    // gửi mail khôi phục cụm mật khẩu mới
                    const symmetrickeyPassPhrase = await generateSek(20);
                    const passphraseEncrypted = encodeAES(
                      symmetrickeyPassPhrase,
                      passPhrase
                    );
                    const formatCipherTextEmail = passphraseEncrypted
                      ? `${passphraseEncrypted}.${symmetrickeyPassPhrase}`
                      : "";
                    sendEmail(
                      auth?.email,
                      "Mã khôi phục mới",
                      "",
                      generateBaseTemp(formatCipherTextEmail, auth?.email)
                    ).then(() => {});
                    // signout, clear Asyncstorage

                    await Promise.all([
                      AsyncStorage.clear(),
                      signOut(getAuth(FIREBASE_APP)),
                    ]);
                    router.replace("/");
                  } catch (error) {
                    console.log(error);
                  }
                }
              } else {
                console.log("sekDecode lỗi");
              }
            } else {
              console.log("hashOldPassphrase lỗi ");
            }
          } else {
            console.log("Đã có lỗi xảy ra!");
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const UpdateUserToFirestore = async (salt: string, sek: string) => {
    try {
      const docRef = doc(getFirestore(FIREBASE_APP), "users", auth?.uid);
      await updateDoc(docRef, {
        sa: salt,
        se: sek,
      });
      console.log(
        "Thành công",
        "Tài khoản của bạn đã được cập nhật vào Firestore."
      );
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
          Nhập vào cụm mật khẩu mới
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
            Xác nhận
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewPassphrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
