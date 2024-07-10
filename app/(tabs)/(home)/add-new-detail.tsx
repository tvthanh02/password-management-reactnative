import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, TextInput, TextLink } from "@/components";
import { router, useGlobalSearchParams } from "expo-router";
import { getDoc, doc, setDoc, getFirestore } from "firebase/firestore";
import { FIREBASE_APP } from "@/config/firebase.config";
import { SvgXml } from "react-native-svg";
import { getAuth } from "firebase/auth";

const AddNew = () => {
  const { itemId } = useGlobalSearchParams();

  const lockSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" 
  height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor"
  stroke-linecap="round" stroke-width="1.5" d="M12 10v4m-1.732-3l3.464
  2m0-2l-3.465 2m-3.535-3v4M5 11l3.464 2m0-2L5 13m12.268-3v4m-1.732-3L19
  13m0-2l-3.465 2M22 12c0 3.771 0 5.657-1.172 6.828C19.657 20 17.771 20 14
  20h-4c-3.771 0-5.657 0-6.828-1.172C2 17.657 2 15.771 2 12c0-3.771 0-5.657
  1.172-6.828C4.343 4 6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172c.654.653.943
  1.528 1.07 2.828"/></svg>`;

  const [title, setTitle] = useState<string>("");
  const [thumb, setThumb] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState({
    autoFill: true,
    repromptPassphrase: false,
  });

  const handleSaveVault = async (
    url: string,
    account: string,
    pass: string,
    note: string,
    title: string,
    icon: string = lockSvg,
    autoFill: boolean,
    repromptPassphrase: boolean
  ) => {
    const setDocRef = doc(getFirestore(FIREBASE_APP), "vaults", "iaysafy");

    try {
      await setDoc(setDocRef, {
        account,
        url,
        pass,
        note,
        title,
        autoFill,
        repromptPassphrase,
        icon,
        userId: getAuth(FIREBASE_APP).currentUser?.uid,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (itemId) {
      (async () => {
        const docRef = doc(getFirestore(FIREBASE_APP), "urls", itemId);
        const item = await getDoc(docRef);

        if (item.exists()) {
          setUrl(item.data().url);
          setTitle(item.data().name);
          setThumb(item.data().icon);
        } else {
          console.log("No such document!");
        }
      })();
    }
  }, []);

  const options = [
    {
      id: 1,
      name: "Autofill",
      description:
        "Tự động điền tài khoản và mật khẩu khi sử dụng tiện ích này",
    },
    {
      id: 2,
      name: "Nhập lại Passphrase",
      description:
        "Yêu cầu nhập Passphrase khi điền, copy, hoặc sửa tài khoản hoặc mật khẩu",
    },
  ];

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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          <TextLink
            style={{
              fontSize: 16,

              fontWeight: "500",
            }}
            title="Trở lại"
            navigate={() => router.back()}
          />
          <TextLink
            style={{
              fontSize: 16,
              color: "blue",
              fontWeight: "500",
            }}
            title="Lưu"
            navigate={() =>
              (async () => {
                await handleSaveVault(
                  url,
                  username,
                  password,
                  note,
                  title,
                  thumb,
                  selectedOptions.autoFill,
                  selectedOptions.repromptPassphrase
                );
                alert("save vault success!");
                router.replace("(home)");
              })()
            }
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
          }}
        >
          <SvgXml xml={thumb || lockSvg} width={80} height={80} />
          {/* {title ? (
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {title}
            </Text>
          ) : ( */}
          <View
            style={{
              flex: 1,
            }}
          >
            <TextInput mode="outlined" value={title} cb={setTitle} />
          </View>
          {/* )} */}
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <TextInput
            mode="flat"
            value={url}
            label="URL"
            placeholder="Nhập url"
            cb={setUrl}
          />
          <TextInput
            mode="flat"
            value={username}
            label="Tài khoản"
            placeholder="Nhập tài khoản"
            cb={setUsername}
          />
          <TextInput
            isPassword
            mode="flat"
            value={password}
            label="Mật Khẩu"
            placeholder="Nhập mật khẩu"
            cb={setPassword}
          />
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <TextInput
            mode="flat"
            value={note}
            label="Ghi Chú"
            placeholder="Nhập ghi chú"
            cb={setNote}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            gap: 10,
          }}
        >
          <Text>Options</Text>
          <View
            style={{
              width: "100%",
              height: "90%",
            }}
          >
            <FlatList
              data={options}
              renderItem={({ item }) => (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        maxWidth: "90%",
                        //fontWeight: "bold",
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <Switch
                    status={
                      item.id === 1
                        ? selectedOptions.autoFill
                        : selectedOptions.repromptPassphrase
                    }
                    onChange={() =>
                      setSelectedOptions((prev) => {
                        return item.id === 1
                          ? { ...prev, autoFill: !prev.autoFill }
                          : {
                              ...prev,
                              repromptPassphrase: !prev.repromptPassphrase,
                            };
                      })
                    }
                  />
                </View>
              )}
            />
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
    gap: 30,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
