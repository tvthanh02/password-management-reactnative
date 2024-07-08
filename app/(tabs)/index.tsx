import Button from "@/components/Button";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Searchbar from "@/components/Searchbar";
import SegmentedButtons from "@/components/SegmentedButton";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
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
              textColor="white"
              mode="contained"
              cb={() => {}}
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
        <View>
          <SegmentedButtons />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 20,
        }}
      >
        <FlatList
          data={[
            {
              id: 1,
              icon: (
                <FontAwesome name="facebook-square" size={35} color="blue" />
              ),
              section: "Facebook",
              account: "0342566774",
            },
            {
              id: 2,
              icon: <Feather name="instagram" size={35} color="black" />,
              section: "Instagram",
              account: "0342566774",
            },
            {
              id: 3,
              icon: <FontAwesome name="telegram" size={35} color="black" />,
              section: "Telegram",
              account: "0342566774",
            },
            {
              id: 4,
              icon: <Entypo name="mail" size={35} color="black" />,
              section: "gmail.com",
              account: "0342566774",
            },
          ]}
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
                {item.icon}
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.section}
                  </Text>
                  <Text>{item.account}</Text>
                </View>
              </View>
              <View>
                <Feather name="copy" size={24} color="black" />
              </View>
            </View>
          )}
        />
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
