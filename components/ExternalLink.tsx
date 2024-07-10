import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import React, { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  children: React.ReactNode;
  href: string;
};

export default function ExternalLink({ href, children, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          event.preventDefault();
          await openBrowserAsync(href);
        }
      }}
    >
      {children}{" "}
    </Link>
  );
}
