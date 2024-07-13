import Button from "@/components/Button";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  DocumentData,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FIREBASE_APP } from "@/config/firebase.config";
import { getAuth } from "firebase/auth";
import { SvgXml } from "react-native-svg";
import { useSession } from "@/context/SessionContext";
import { Dialog, Searchbar, Menu } from "@/components";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { decodeAES } from "@/utils/encryption";
import * as Clipboard from "expo-clipboard";

export default function HomeScreen() {
  const [showOption, setShowOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [contentDialog, setContentDialog] = useState<string>("");

  const {
    showDialog,
    setShowDialog,
    isSessionActive,
    timeRemaining,
    startSession,
    stopSession,
    sekDecode,
  } = useSession();

  const [vaults, setVaults] = useState<
    | {
        id: string;
        data: DocumentData;
      }[]
    | []
  >([]);

  const handleViewVault = (item: { id: string; data: DocumentData }) => {
    setContentDialog(decodeAES(sekDecode, item.data.pass));
    setShowDialog && setShowDialog(true);
  };

  const handleEditVault = (id: string) => {
    // get id vault
    // redirect to screen detail with params id vault
    // update fields => update
    router.push({
      pathname: "/add-new-detail",
      params: {
        vaultId: id,
      },
    });
  };

  const handleDeleteVault = async (id: string) => {
    // get id vault
    // comfirm
    // => delete/cancel
    const docRef = doc(getFirestore(FIREBASE_APP), "vaults", id);
    try {
      await deleteDoc(docRef);
      setContentDialog("Xóa thành công!");
      setShowDialog && setShowDialog(true);
    } catch (error) {
      setContentDialog("Đã có lỗi xảy ra! Xóa thất bại.");
      setShowDialog && setShowDialog(true);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await Clipboard.setStringAsync(content);
      alert("Copy to clipboard!");
    } catch (error) {
      console.log(error);
    }
  };

  // handle session
  useEffect(() => {
    if (!isSessionActive) {
      router.replace("/input-passphrase");
    }
  }, [isSessionActive, router]);

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

  const childTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "gray",
      //accent: "green",
    },
  };

  return (
    <PaperProvider theme={childTheme}>
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
              REMPA
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
                  }}
                >
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
                    <TouchableOpacity
                      // onPress={() => {
                      //   if (sekDecode) {
                      //     if (item.data.repromptPassphrase) {
                      //       // setIsRePrompt && setIsRePrompt(true);
                      //       stopSession && stopSession();
                      //       //return;
                      //     }
                      //     //setShowDialog && setShowDialog(true);
                      //     // alert("123");
                      //     //<Dialog show={true} />;
                      //     setSelectedOption(null);
                      //     setShowOption(false);
                      //   }
                      // }}
                      onPress={() => {
                        setContentDialog(decodeAES(sekDecode, item.data.pass));
                        setSelectedOption(item.id);
                        setShowOption((prev) => !prev);
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
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(decodeAES(sekDecode, item.data.pass))
                      }
                    >
                      <View>
                        <Feather name="copy" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {item.id === selectedOption && showOption && (
                    <Menu
                      fnView={() => handleViewVault(item)}
                      fnEdit={() => handleEditVault(item.id)}
                      fnDelete={() => handleDeleteVault(item.id)}
                    />
                  )}
                </View>
              )}
            />
          ) : (
            <Text>Chưa có vault nào.</Text>
          )}
        </View>
        <Dialog
          show={showDialog}
          content={contentDialog}
          cb={() => setShowDialog && setShowDialog(false)}
        />
      </SafeAreaView>
    </PaperProvider>
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
