import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkLogin = async () => {
  const data = await AsyncStorage.getItem("userinfo");
  return !!data;
};
