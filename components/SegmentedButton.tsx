import * as React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";

const SegmentedButtons = () => {
  const [value, setValue] = React.useState("");
  const [active, setActive] = React.useState(1);
  const buttons = [
    {
      id: 1,
      value: "Tất cả",
      label: "Tất cả",
    },
    {
      id: 2,
      value: "Mật khẩu",
      label: "Mật khẩu",
    },
    {
      id: 3,
      value: "Mật khẩu",
      label: "Chưa có",
    },
    {
      id: 4,
      value: "Mật khẩu",
      label: "Chưa có",
    },
  ];

  return (
    <FlatList
      style={{
        paddingVertical: 10,
      }}
      horizontal={true}
      data={buttons}
      renderItem={({ item }) => (
        <View
          style={[
            {
              width: 100,
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            item.id === active && styles.activeSegment,
          ]}
        >
          <TouchableOpacity onPress={() => setActive(item.id)}>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  activeSegment: {
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 10,
  },
});

export default SegmentedButtons;
