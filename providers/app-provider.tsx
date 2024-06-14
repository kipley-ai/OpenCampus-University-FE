"use client";

import { AuthenticationStatus } from "@rainbow-me/rainbowkit";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";
import { parseJWT } from "@/utils/utils";

interface ContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  headerTitle: string;
  setHeaderTitle: Dispatch<SetStateAction<string>>;
  modalLogin: boolean;
  setModalLogin: Dispatch<SetStateAction<boolean>>;
  modalTopUp: boolean;
  setModalTopUp: Dispatch<SetStateAction<boolean>>;
  topUpStatus: string;
  setTopUpStatus: Dispatch<SetStateAction<string>>;
  modalTopUpSuccessful: boolean;
  setModalTopUpSuccessful: Dispatch<SetStateAction<boolean>>;
  modalTopUpFailed: boolean;
  setModalTopUpFailed: Dispatch<SetStateAction<boolean>>;
  topUpAmount: number;
  setTopUpAmount: Dispatch<SetStateAction<number>>;
  toast: any;
  setToast: Dispatch<SetStateAction<any>>;
  verifStatus: AuthenticationStatus;
  setVerifStatus: any;
  session: any;
  setSession: any;
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  headerTitle: "",
  setHeaderTitle: (): string => "",
  modalLogin: false,
  setModalLogin: (): boolean => false,
  modalTopUp: false,
  setModalTopUp: (): boolean => false,
  topUpStatus: "UNDEFINED",
  setTopUpStatus: () => "UNDEFINED",
  modalTopUpSuccessful: false,
  setModalTopUpSuccessful: () => false,
  modalTopUpFailed: false,
  setModalTopUpFailed: () => false,
  topUpAmount: 0,
  setTopUpAmount: () => 0,
  toast: {},
  setToast: () => {},
  verifStatus: "unauthenticated",
  setVerifStatus: () => "unauthenticated",
  session: {},
  setSession: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [modalLogin, setModalLogin] = useState(false);
  const [modalTopUp, setModalTopUp] = useState(false);
  const [topUpStatus, setTopUpStatus] = useState("UNDEFINED");
  const [modalTopUpSuccessful, setModalTopUpSuccessful] = useState(false);
  const [modalTopUpFailed, setModalTopUpFailed] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [toast, setToast] = useState(false);
  const [verifStatus, setVerifStatus] =
    useState<AuthenticationStatus>("unauthenticated");
  const [session, setSession] = useState({});

  useEffect(() => {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const user = parseJWT(idToken);
      if (user) {
        if ("eth_address" in user) {
          user["address"] = user["eth_address"];
          delete user["eth_address"];
        }
        setSession(user);
      }
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        headerTitle,
        setHeaderTitle,
        modalLogin,
        setModalLogin,
        modalTopUp,
        setModalTopUp,
        topUpStatus,
        setTopUpStatus,
        modalTopUpSuccessful,
        setModalTopUpSuccessful,
        modalTopUpFailed,
        setModalTopUpFailed,
        topUpAmount,
        setTopUpAmount,
        toast,
        setToast,
        verifStatus,
        setVerifStatus,
        session,
        setSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppProvider = () => useContext(AppContext);
