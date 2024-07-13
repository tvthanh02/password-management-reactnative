import { createContext, useState, useEffect, useContext } from "react";
import { router } from "expo-router";

type sessionProps = {
  showDialog: boolean;
  isSessionActive: boolean;
  startSession: () => void;
  stopSession?: () => void;
  timeRemaining: number;
  sekDecode: string;
  setSekDecode?: React.Dispatch<React.SetStateAction<string>>;
  setShowDialog?: React.Dispatch<React.SetStateAction<boolean>>;
};

// initial context
const SessionContext = createContext<sessionProps>({
  showDialog: false,
  isSessionActive: false,
  timeRemaining: 180,
  sekDecode: "",
  startSession: () => {},
});

type props = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: props) => {
  const startSession = () => {
    setIsSessionActive(true);
    setTimeRemaining(180);
  };

  const stopSession = () => {
    setIsSessionActive(false);
    setTimeRemaining(0);
  };

  const [isSessionActive, setIsSessionActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(180); // 3 minutes in seconds
  const [sekDecode, setSekDecode] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSessionActive) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsSessionActive(false);
            router.replace("/input-passphrase");
            return 180;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSessionActive, router]);

  return (
    <SessionContext.Provider
      value={{
        isSessionActive,
        startSession,
        stopSession,
        timeRemaining,
        sekDecode,
        setSekDecode,
        showDialog,
        setShowDialog,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
