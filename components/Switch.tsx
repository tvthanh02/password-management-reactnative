import { Switch as PaperSwitch } from "react-native-paper";

type propsSwitch = {
  status: boolean;
  onChange: () => void;
};

const Switch = (props: propsSwitch) => {
  return (
    <PaperSwitch
      style={{}}
      color="green"
      value={props.status}
      onValueChange={props.onChange}
    />
  );
};

export default Switch;
