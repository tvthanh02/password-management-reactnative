import * as React from "react";
import { Searchbar as PaperSearchbar } from "react-native-paper";

type seachBarProps = {
  fnSearch: (key?: string) => Promise<void>;
};

const Searchbar = ({ fnSearch }: seachBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    let timeId: NodeJS.Timeout;
    if (searchQuery) {
      timeId = setTimeout(async () => {
        await fnSearch(searchQuery);
      }, 300);
    } else {
      (async () => await fnSearch())();
    }
    return () => clearTimeout(timeId);
  }, [searchQuery]);

  return (
    <PaperSearchbar
      style={{
        borderRadius: 10,
        backgroundColor: "white",
      }}
      mode="bar"
      placeholder="Tìm kiếm"
      onChangeText={(value) => setSearchQuery(value)}
      value={searchQuery}
    />
  );
};

export default Searchbar;
