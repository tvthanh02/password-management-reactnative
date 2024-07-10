import { Text, TouchableOpacity } from "react-native";

import { type ComponentProps } from "react";

type propsTextLink = ComponentProps<typeof Text> & {
  title: string;
  navigate: () => void;
};

const TextLink = ({ title, navigate, ...rest }: propsTextLink) => {
  return (
    <TouchableOpacity onPress={navigate}>
      <Text {...rest}>{title}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;
