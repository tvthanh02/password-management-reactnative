import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useGlobalSearchParams } from "expo-router";
import { Button } from "@/components";
import { FIREBASE_APP } from "@/config/firebase.config";
import { getAuth } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const VerifyEmail = () => {
  const [count, setCount] = useState<number>(60);
  const params = useGlobalSearchParams();
  const [isVerified, setIsVerified] = useState(false);
  const [timeRedirect, setTimeRedirect] = useState<number>(5);

  const { email } = params;

  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await getAuth(FIREBASE_APP).currentUser?.reload();
      if (getAuth(FIREBASE_APP).currentUser?.emailVerified) {
        clearInterval(interval);
        setIsVerified(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVerified) {
      timer = setInterval(() => {
        setTimeRedirect((prev) => prev - 1);
      }, 1000);
    }
    if (timeRedirect === 1) {
      router.replace("/passphrase");
    }

    return () => clearInterval(timer);
  }, [isVerified, timeRedirect]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        {isVerified ? (
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialIcons
                style={{
                  color: "green",
                }}
                name="verified"
                size={24}
                color="black"
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Email của bạn đã được xác thực.{" "}
              </Text>
            </View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>Chuyển hướng sau </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {timeRedirect}
                </Text>
                <Text>s</Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Entypo name="mail" size={30} color="black" />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  textAlign: "center",
                }}
              >
                Verification link đã được gửi.Hãy kiểm tra email của bạn. Nếu
                chưa nhận được, hãy kiểm tra hộp thư spam
              </Text>
            </View>
            <Text
              style={{
                color: "black",
                fontSize: 22,
              }}
            >
              {count}s
            </Text>
            <Text
              style={{
                color: "blue",
                fontSize: 20,
              }}
            >
              {email || "tvthanh.cod@gmail.com"}
            </Text>
            {!count && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Text>Bạn chưa nhận được email?</Text>
                <TouchableOpacity onPress={() => {}}>
                  <Text
                    style={{
                      color: "blue",
                      textDecorationLine: "underline",
                    }}
                  >
                    Gửi lại
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                width: "100%",
                marginTop: 30,
              }}
            >
              <Button
                style={{
                  borderRadius: 10,
                  height: 40,
                }}
                mode="contained"
                buttonColor="red"
                cb={() => router.push("/")}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Quay lại đăng nhập
                </Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VerifyEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
