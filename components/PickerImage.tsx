import { useState } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

type pickerImageProps = {
  image: string;
  callback: React.Dispatch<React.SetStateAction<string>>;
  uploadImage: (file: File) => Promise<string>;
};

function PickerImage(props: pickerImageProps) {
  const [image, setImage] = useState<string | null | undefined>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    const handleUpload = async (uri: string) => {
      // Chuyển đổi uri sang Blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Tải lên Firebase Storage
      const fileName = uri.split("/").pop();
      const file = new File([blob], fileName || "image.jpg", {
        type: blob.type,
      });
      const fileUrl = await props.uploadImage(file);
      console.log("fileURL", fileUrl);
      props.callback(fileUrl);
      // const fileUrl = await uploadImage(file);
      // await saveImageInfo(fileUrl, { name: fileName || "image.jpg" });
    };

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await handleUpload(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}
export default PickerImage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
