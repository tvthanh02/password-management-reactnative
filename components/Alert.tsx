import * as React from "react";
import { Button, Dialog as PaperDialog, Text } from "react-native-paper";

type props = {
  show: boolean;
  content: string;
  cb: () => void;
};

const Alert = ({ show, cb, content }: props) => {
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
      <PaperDialog.Actions>
        <Button onPress={cb}>OK</Button>
      </PaperDialog.Actions>
    </PaperDialog>
  );
};

export default Alert;
