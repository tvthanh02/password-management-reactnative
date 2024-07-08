import { useState } from "react";
import { Switch as PaperSwitch } from "react-native-paper";

const Switch = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return <PaperSwitch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default Switch;
