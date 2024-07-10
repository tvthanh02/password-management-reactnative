import * as React from "react";
import {
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type props = {
  style?:
    | false
    | ViewStyle
    | RegisteredStyle<ViewStyle>
    | RecursiveArray<ViewStyle>
    | Falsy
    | RegisteredStyle<ViewStyle>;
  buttonColor: string;
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
    disabled={props.disabled ?? false}
    icon={props.icon}
    style={[props.style, props.disabled ? styles.disabledButton : null]}
    buttonColor={props.buttonColor}
    mode={props.mode}
    onPress={props.cb}
  >
    {props.children}
  </PaperButton>
);

const styles = StyleSheet.create({
  disabledButton: {
    backgroundColor: "red",
    opacity: 0.4,
  },
});

export default Button;
