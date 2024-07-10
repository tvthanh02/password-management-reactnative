import * as React from "react";
import { useState } from "react";

import { TextInput as PaperTextInput } from "react-native-paper";

type propsTextInput = {
  mode?: "outlined" | "flat";
  label?: string;
  placeholder?: string;
  right?: React.ReactNode | undefined;
  value: string;
  isPassword?: boolean;
  cb: (value: string) => void;
  onBlur?: () => void;
};

const TextInput = (props: propsTextInput) => {
  const [hide, setHide] = useState<boolean>(true);

  return (
    <PaperTextInput
      style={{
        backgroundColor: "white",
      }}
      onBlur={props.onBlur}
      mode={props.mode ?? "outlined"}
      label={props.label}
      placeholder={props.placeholder}
      value={props.value}
      secureTextEntry={props.isPassword && hide}
      onChangeText={(value) => props.cb(value)}
      right={
        props.right ??
        (props.isPassword ? (
          <PaperTextInput.Icon
            onPress={() => setHide((prev) => !prev)}
            icon={hide ? "eye-off" : "eye"}
          />
        ) : (
          <></>
        ))
      }
    />
  );
};

export default TextInput;
