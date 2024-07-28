import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { TextInput } from "@/components";
import { FIREBASE_APP } from "@/config/firebase.config";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PickerImage from "@/components/PickerImage";
import { router } from "expo-router";

const AddProduct = () => {
  const [maHang, setMaHang] = useState<string>("");
  const [tenHang, setTenHang] = useState<string>("");
  const [donGia, setDonGia] = useState<string>("");
  const [soLuong, setSoLuong] = useState<string>("");
  const [anh, setAnh] = useState<string>("");
  const [mota, setMota] = useState<string>("");

  const handleOK = async () => {
    if (!tenHang || !maHang || !donGia) {
      // validate
      return;
    }

    const rand = (): string => {
      return Math.random() + "";
    };

    const newProduct = doc(getFirestore(FIREBASE_APP), "product", rand());

    try {
      await setDoc(newProduct, {
        maHang,
        tenHang,
        donGia,
        soLuong,
        anh,
        mota,
      });
      alert("lưu thành công");
    } catch (error) {
      console.log(error);
    }
  };
  async function uploadImage(file: File) {
    const storage = getStorage(FIREBASE_APP);
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);
    return fileUrl;
  }

  return (
    <SafeAreaView>
      <View>
        <Text>AddProduct</Text>
        <View
          style={{
            display: "flex",
            gap: 20,
          }}
        ></View>
        <TextInput
          label="Mã Hàng"
          placeholder="Nhập Mã Hàng"
          value={maHang}
          cb={setMaHang}
        />
        <TextInput
          label="Tên Hàng"
          placeholder="Nhập Tên Hàng"
          value={tenHang}
          cb={setTenHang}
        />
        <TextInput
          label="Đơn Gía"
          placeholder="Nhập đơn giá"
          value={donGia}
          cb={setDonGia}
        />
        <TextInput
          label="Số lượng"
          placeholder="Nhập Số lượng"
          value={soLuong}
          cb={setSoLuong}
        />
        <TextInput
          label="Mô tả"
          placeholder="Nhập Mô tả"
          value={mota}
          cb={setMota}
        />
        <View>
          <PickerImage
            image={anh}
            callback={setAnh}
            uploadImage={uploadImage}
          />
        </View>
        <Button title="OK" onPress={() => handleOK()} />
        <Button title="Xem SP" onPress={() => router.push("/product")} />
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
