import * as React from "react";
import { Searchbar as PaperSearchbar } from "react-native-paper";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <PaperSearchbar
      style={{
        borderRadius: 10,
        backgroundColor: "white",
      }}
      mode="bar"
      placeholder="Tìm kiếm"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};

export default Searchbar;
