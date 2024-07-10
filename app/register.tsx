import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, ExternalLink, TextLink } from "@/components";
import { FIREBASE_APP } from "../config/firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const signUpSchema = Yup.object().shape({
    email: Yup.string()
      .email("Không phải là email")
      .required("Phải nhập vào email!"),
    password: Yup.string()
      .min(8, "Mật khẩu đạt độ dài tối thiểu 8 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường, một chữ số và một ký tự đặc biệt"
      )
      .required("Phải nhập vào mật khẩu!"),
  });

  const handleSignUp = async (email: string, password: string) => {
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
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={(values) => {
        handleSignUp(values.email, values.password);
      }}
    >
      {({
        values,
        touched,
        errors,
        setFieldTouched,
        handleSubmit,
        isValid,
        handleChange,
      }) => (
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
              <View
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <TextInput
                  label="Địa chỉ Email"
                  placeholder="Nhập email"
                  value={values.email}
                  cb={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && errors.email && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.email}
                  </Text>
                )}
              </View>
              <View
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <TextInput
                  isPassword
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  value={values.password}
                  cb={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
                {touched.password && errors.password && (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  lineHeight: 25,
                }}
              >
                Bằng việc hoàn thiện điền địa chỉ email, tôi đồng ý các{" "}
                <ExternalLink style={{ color: "blue" }} href="google.com">
                  điều kiện
                </ExternalLink>{" "}
                và{" "}
                <ExternalLink style={{ color: "blue" }} href="google.com">
                  Chính sách
                </ExternalLink>
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
                disabled={!isValid}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  height: 50,
                }}
                buttonColor="red"
                mode="contained"
                cb={handleSubmit}
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
                <TextLink
                  title="Quay lại đăng nhập"
                  style={{
                    color: "blue",
                  }}
                  navigate={() => router.back()}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
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
