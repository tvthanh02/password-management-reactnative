import * as React from "react";

import { TextInput as PaperTextInput } from "react-native-paper";

type props = {
  mode?: "outlined" | "flat";
  label: string;
  placeholder: string;
  right?: React.ReactNode | undefined;
  secureTextEntry: boolean;
  value: string;
  cb: (value: string) => void;
};

const TextInput = (props: props) => {
  return (
    <PaperTextInput
      mode={props.mode ?? "outlined"}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
      onChangeText={(value) => props.cb(value)}
      right={props.right}
    />
  );
};

export default TextInput;
