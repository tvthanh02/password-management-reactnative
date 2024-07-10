import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextLink, Searchbar } from "@/components";
import { router } from "expo-router";
import { FIREBASE_APP } from "@/config/firebase.config";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { SvgXml } from "react-native-svg";
import { Entypo } from "@expo/vector-icons";

type url = {
  id: string;
  data: DocumentData;
};

const AddNew = () => {
  const [urls, setUrl] = useState<url[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const snapshots = await getDocs(
          collection(getFirestore(FIREBASE_APP), "urls")
        );
        setUrl(
          snapshots.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
          }}
        >
          <Searchbar />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/add-new-detail")}>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                height: 40,
                paddingVertical: 8,
                gap: 20,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="add-to-list" size={24} color="gray" />
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                Thêm mới
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              //flex: 1,
              width: "100%",
              height: "80%",
            }}
          >
            {urls?.length > 0 ? (
              <FlatList
                data={urls}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.push({
                        pathname: "/add-new-detail",
                        params: {
                          itemId: item.id,
                        },
                      })
                    }
                  >
                    <View
                      key={item.id}
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        height: 40,
                        paddingVertical: 8,
                        gap: 20,
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <SvgXml xml={item.data.icon} width="40" height="40" />
                      <View
                        style={{
                          flex: 1,
                          height: 50,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          borderTopWidth: 1,
                          borderBottomWidth: 1,

                          borderColor: "gray",
                          borderStyle: "solid",
                        }}
                      >
                        <Text
                          style={
                            {
                              //fontWeight: "bold",
                            }
                          }
                        >
                          {item.data.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text>Chưa có dữ liệu!</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddNew;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    display: "flex",
    // gap: 30,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
