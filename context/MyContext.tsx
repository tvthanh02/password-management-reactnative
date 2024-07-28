import React, { createContext, useState } from "react";

export const MyContext = createContext<{
  showAlert: boolean;
  selectedId: string;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
}>({
  showAlert: false,
  selectedId: "",
});

export const AlertContext = ({ children }: any): React.ReactNode => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <MyContext.Provider
      value={{
        showAlert,
        selectedId,
        setShowAlert,
        setSelectedId,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default AlertContext;
