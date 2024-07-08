import * as React from "react";
import {
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  ViewStyle,
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { View } from "react-native";

type props = {
  style?:
    | false
    | ViewStyle
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle>
    | Falsy
    | RegisteredStyle<ViewStyle>;
  buttonColor: string;
  textColor: string;
  icon?: IconSource | undefined;
  mode:
    | "text"
    | "contained"
    | "outlined"
    | "elevated"
    | "contained-tonal"
    | undefined;
  cb: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = (props: props) => (
  <PaperButton
    disabled={props.disabled || false}
    icon={props.icon}
    style={props.style}
    buttonColor={props.buttonColor}
    mode={props.mode}
    onPress={props.cb}
  >
    {props.children}
  </PaperButton>
);

export default Button;
