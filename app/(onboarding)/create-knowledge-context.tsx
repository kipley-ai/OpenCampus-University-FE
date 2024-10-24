"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";
import { useChatSession, useChatboxWS } from "@/hooks/api/chatbox";
import { ChatPayload, LastMessagePayload } from "@/hooks/api/chatbox/schema";
import { useNftDetail } from "@/hooks/api/nft";

interface Plugin {
  plugin_id: string;
  name: string;
}

interface CreateChatbotContextProps {
  createKb: ICreateKb;
  handleChangeKb: (name: string, value: any) => void;

  createNft: ICreateNft;
  handleChangeNft: (name: string, value: any) => void;

  isComingSoon: boolean;
  setIsComingSoon: ReactSetter<boolean>;

  step: string;
  setStep: ReactSetter<string>;

  sftId: string;
  setSftId: ReactSetter<string>;

  kbId: string;
  setKbId: ReactSetter<string>;

  plugin: Plugin | undefined;
  setPlugin: ReactSetter<Plugin | undefined>;

  createChatbot: any;
  handleChangeChatbot: any;

  welcomePage: string;
  setWelcomePage: ReactSetter<string>;
}

interface ICreateKb {
  type: string;
  kb_data: any[];
  username: string;
  youtube_url: string;
  medium_url: string;
}

interface ICreateNft {
  name: string;
  description: string;
  contract_address: string;
  wallet_address: string;
  supply: string;
  category: string;
  token_symbol: string;
  price_per_query: string;
  query_royalties: string;
  url: string;
}

const CreateChatbotContext = createContext<
  CreateChatbotContextProps | undefined
>(undefined);

export const CreateChatbotProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [createKb, setCreateKb] = useState<ICreateKb>({
    type: "",
    kb_data: [],
    username: "",
    youtube_url: "",
    medium_url: "",
  });

  const [createNft, setCreateNft] = useState<ICreateNft>({
    name: "",
    description: "",
    contract_address: "",
    wallet_address: "",
    supply: "",
    category: "",
    token_symbol: "",
    price_per_query: "",
    query_royalties: "",
    url: "",
  });

  const [plugin, setPlugin] = useState<Plugin | undefined>();

  const [createChatbot, setCreateChatbot] = useState({
    type: "",
    kb_data: [],
    username: "",
  });

  const [step, setStep] = useState("invite_code");
  const [sftId, setSftId] = useState("");
  const [kbId, setKbId] = useState("");
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [welcomePage, setWelcomePage] = useState("");

  // const nftDetail = useNftDetail({
  // 	sft_id: "SFTID11",
  // });

  const handleChangeKb = (name: string, value: any) => {
    setCreateKb((prevData: any) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleChangeNft = (name: string, value: any) => {
    setCreateNft((prevData: any) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleChangeChatbot = (name: string, value: any) => {
    setCreateChatbot((prevData: any) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <CreateChatbotContext.Provider
      value={{
        createKb,
        handleChangeKb,

        createNft,
        handleChangeNft,

        isComingSoon,
        setIsComingSoon,

        createChatbot,
        handleChangeChatbot,

        step,
        setStep,

        sftId,
        setSftId,

        kbId,
        setKbId,

        plugin,
        setPlugin,

        welcomePage,
        setWelcomePage,
      }}
    >
      {children}
    </CreateChatbotContext.Provider>
  );
};

export const useCreateChatbotContext = () => {
  const context = useContext(CreateChatbotContext);
  if (!context) {
    throw new Error(
      "useCreateChatbotContext must be used within a CreateChatbotProvider",
    );
  }
  return context;
};
