import Button from "@/components/Button";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Searchbar from "@/components/Searchbar";
import SegmentedButtons from "@/components/SegmentedButton";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FIREBASE_APP } from "@/config/firebase.config";
import { getAuth } from "firebase/auth";
import { SvgXml } from "react-native-svg";

export default function HomeScreen() {
  const [vaults, setVaults] = useState<
    | {
        id: string;
        data: DocumentData;
      }[]
    | []
  >([]);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(getFirestore(FIREBASE_APP), "vaults"),
        where("userId", "==", getAuth(FIREBASE_APP).currentUser?.uid)
      );

      const querySnapshot = await getDocs(q);
      setVaults(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Vault
          </Text>
          <View>
            <Button
              buttonColor="red"
              mode="contained"
              cb={() => router.push("/add-new")}
              style={{
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Entypo name="plus" size={24} color="white" />
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  New
                </Text>
              </View>
            </Button>
          </View>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <Searchbar></Searchbar>
        </View>
        {/* <View>
          <SegmentedButtons />
        </View> */}
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        {vaults && vaults?.length > 0 ? (
          <FlatList
            data={vaults}
            renderItem={({ item }) => (
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderStyle: "solid",
                  borderColor: "gray",
                  paddingVertical: 10,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",

                    gap: 20,
                    paddingVertical: 10,
                  }}
                >
                  <SvgXml xml={item.data.icon} width={30} height={30} />
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item.data.title}
                    </Text>
                    <Text>{item.data.account}</Text>
                  </View>
                </View>
                <View>
                  <Feather name="copy" size={24} color="black" />
                </View>
              </View>
            )}
          />
        ) : (
          <Text>Chưa có vault nào.</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: "flex",
    gap: 20,
  },
});
