import * as React from "react";
import { Button, Dialog as PaperDialog, Text } from "react-native-paper";

type props = {
  show: boolean;
  content: string;
  cbOk: () => void;
  cbCancle: () => void;
};

const Alert = ({ show, cbCancle, cbOk, content }: props) => {
  return (
    <PaperDialog
      style={{
        backgroundColor: "white",
      }}
      visible={show}
    >
      <PaperDialog.Title>Thông báo</PaperDialog.Title>
      <PaperDialog.Content>
        <Text variant="bodyMedium">{content}</Text>
      </PaperDialog.Content>
      <PaperDialog.Actions
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Button onPress={cbCancle}>Hủy</Button>

        <Button onPress={cbOk}>OK</Button>
      </PaperDialog.Actions>
    </PaperDialog>
  );
};

export default Alert;
