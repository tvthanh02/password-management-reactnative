import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "@/components";
import generateSalt from "@/utils/generateSalt";
import { decodeAES } from "@/utils/encryption";
import { getAuth } from "firebase/auth";
import { FIREBASE_APP } from "@/config/firebase.config";
import { checkConfirmEmail, sendEmail } from "@/utils/mail";
import { generateBaseTemp } from "@/utils/generateHtml";

const ForgetPassphrase = () => {
  const [cipherText, setCipherText] = useState("");
  const [error, setError] = useState<string>();

  const generatelinkConfirm = () => {
    const code = generateSalt(8);
    return {
      url: `<a href="https://mail-server-lzj6.onrender.com/api/v1/confirm-email?code=${code}&d=${Date.now()}">Nhấp vào link để xác nhận quá trình khôi phục/tạo cụm mật khẩu</a>`,
      code,
    };
  };

  const handleOk = async () => {
    // xác minh mã cipherPassPhrase hợp lệ
    // gửi mail xác nhận => xác nhận => chuyển qua màn hình cấp passphrase mới
    // mã hóa lại sek với passphrase mới
    // update user info lên server

    const [cipherPassphrase, symmetrickeyPassPhrase] = cipherText
      .trim()
      .split(".");
    if (cipherPassphrase && symmetrickeyPassPhrase) {
      const passphrase = decodeAES(symmetrickeyPassPhrase, cipherPassphrase);
      if (!passphrase) {
        setError("Mã khôi phục không hợp lệ!");
        return;
      }
      const userEmail = getAuth(FIREBASE_APP).currentUser?.email;
      const { code, url } = generatelinkConfirm();
      sendEmail(
        userEmail,
        "Xác nhận khôi phục cụm mật khẩu",
        "",
        generateBaseTemp(url, userEmail)
      ).then(() => {
        const interval = setInterval(async () => {
          try {
            const status = await checkConfirmEmail(code);
            console.log(status);
            if (status) {
              clearInterval(interval);
              router.replace({
                pathname: "/new-passphrase",
                params: {
                  oldPassphrase: passphrase,
                },
              });
            }
          } catch (error) {
            console.log(error);
            clearInterval(interval);
            setError("Đá có lỗi xảy ra phía máy chủ!");
          }
        }, 1000);
      });
    } else {
      setError("Mã khôi phục không hợp lệ!");
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
          Nhập vào Mã khôi phục
        </Text>
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <TextInput
            isPassword
            label="Mã khôi phục"
            value={cipherText}
            cb={setCipherText}
            placeholder="Nhập mã khôi phục"
          ></TextInput>
        </View>
        {error && <Text>{error}</Text>}
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
            Xác minh
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassphrase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
});
