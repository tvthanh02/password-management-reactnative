import { createContext, useState, useEffect, useContext } from "react";
import { router } from "expo-router";

type sessionProps = {
  isStartTimer: boolean;
  setStartTimer?: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: boolean;
  isSessionActive: boolean;
  startSession: () => void;
  stopSession?: () => void;
  timeRemaining: number;
  sekDecode: string;
  setSekDecode?: React.Dispatch<React.SetStateAction<string>>;
  setShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
};

// initial context
const SessionContext = createContext<sessionProps>({
  isStartTimer: false,
  showAlert: false,
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
    setStartTimer(true);
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
  const [showAlert, setShowAlert] = useState(false);
  const [isStartTimer, setStartTimer] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSessionActive && isStartTimer) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsSessionActive(false);
            //router.replace("/input-passphrase");
            return 180;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSessionActive, isStartTimer]);

  return (
    <SessionContext.Provider
      value={{
        isSessionActive,
        startSession,
        stopSession,
        timeRemaining,
        sekDecode,
        setSekDecode,
        showAlert,
        setShowAlert,
        isStartTimer,
        setStartTimer,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
