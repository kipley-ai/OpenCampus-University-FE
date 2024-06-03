"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";
import { useUpdateKB } from "@/hooks/api/kb";
import { IKBDetail } from "@/hooks/api/interfaces";

interface CreateChatbotContextProps {
  createKb: ICreateKb;
  handleChangeKb: (name: string, value: any) => void;

  createNft: ICreateNft;
  handleChangeNft: (name: string, value: any) => void;

  isComingSoon: boolean;
  setIsComingSoon: ReactSetter<boolean>;

  step: string;
  setStep: ReactSetter<string>;

  twitterExist: boolean;
  setTwitterExist: ReactSetter<boolean>;

  addTwitterItem: (kb_id: string, username: string) => void;
  addMediumItem: (kb_id: string, url: string) => void;
  addYoutubeItem: (kb_id: string, url: string) => void;

  kbDetail: IKBDetail | null;
  setKbDetail: ReactSetter<IKBDetail | null>;

  successModal: boolean;
  setSuccessModal: ReactSetter<boolean>;

  errorModal: boolean;
  setErrorModal: ReactSetter<boolean>;

  errorMessage: string;
  setErrorMessage: ReactSetter<string>;
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

  const [step, setStep] = useState("data_source");
  const [isComingSoon, setIsComingSoon] = useState(false);
  const [twitterExist, setTwitterExist] = useState(false);
  const [kbDetail, setKbDetail] = useState<IKBDetail | null>(null);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  const updateKB = useUpdateKB();

  const addTwitterItem = (kb_id: string, username: string) => {
    updateKB.mutate(
      {
        kb_id,
        type: "twitter",
        username,
        medium_url: null,
        youtube_url: null,
        kb_data: null,
      },
      {
        onSuccess() {
          setSuccessModal(true);
        },
      },
    );
  };

  const addMediumItem = (kb_id: string, url: string) => {
    updateKB.mutate(
      {
        kb_id,
        type: "medium",
        username: null,
        medium_url: url,
        youtube_url: null,
        kb_data: null,
      },
      {
        onSuccess(data) {
          if(data.data.status === "failed"){
            setErrorMessage(data.data.msg);
            return;
          }
          setErrorMessage("");
          setSuccessModal(true);
        },
      },
    );
  };

  const addYoutubeItem = (kb_id: string, url: string) => {
    updateKB.mutate(
      {
        kb_id,
        type: "youtube",
        username: null,
        medium_url: null,
        youtube_url: url,
        kb_data: null,
      },
      {
        onSuccess(data) {
          if(data.data.status === "failed"){
            setErrorMessage(data.data.msg);
            return;
          }
          setErrorMessage("");
          setSuccessModal(true);
        },
      },
    );
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

        step,
        setStep,

        twitterExist,
        setTwitterExist,

        addTwitterItem,
        addMediumItem,
        addYoutubeItem,

        kbDetail,
        setKbDetail,

        successModal,
        setSuccessModal,

        errorModal,
        setErrorModal,

        errorMessage,
        setErrorMessage,
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
