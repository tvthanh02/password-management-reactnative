import * as React from "react";
import { View } from "react-native";
import { Menu as PaperMenu } from "react-native-paper";

type props = {
  fnEdit: () => void;
  fnView: () => void;
  fnDelete: () => void;
};

const Menu = ({ fnEdit, fnView, fnDelete }: props) => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <PaperMenu.Item
      titleStyle={{
        color: "gray",
      }}
      leadingIcon="eye"
      onPress={fnView}
      title="Xem"
    />
    <PaperMenu.Item
      titleStyle={{
        color: "gray",
      }}
      leadingIcon="pencil"
      onPress={fnEdit}
      title="Sửa"
    />
    <PaperMenu.Item
      titleStyle={{
        color: "gray",
      }}
      leadingIcon="delete"
      onPress={fnDelete}
      title="Xóa"
    />
  </View>
);

export default Menu;
