import * as React from "react";

import { Button, Dialog, Text } from "react-native-paper";

type confirmProps = {
  title: string;
  content: string;
  isShow: boolean;
  cbShow: () => void;
  cbCancel: () => void;
  cbOk: () => void;
};

const ComfirmDialog = ({
  title,
  content,
  isShow,
  cbCancel,
  cbOk,
  cbShow,
}: confirmProps) => {
  return (
    <Dialog
      style={{
        backgroundColor: "white",
      }}
      visible={isShow}
      onDismiss={cbShow}
    >
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{content}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={cbCancel}>Hủy</Button>
        <Button onPress={cbOk}>OK</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default ComfirmDialog;
