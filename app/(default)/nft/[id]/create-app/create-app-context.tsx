"use client";

import { createContext, useContext, useState } from "react";
import { ReactSetter } from "@/lib/aliases";

interface Plugin {
  plugin_id: string;
  name: string;
}

interface CreateAppContextProps {
  step: string;
  setStep: ReactSetter<string>;
  plugin: Plugin | undefined;
  setPlugin: ReactSetter<Plugin | undefined>;
}

const CreateAppContext = createContext<CreateAppContextProps | undefined>(
  undefined,
);

export const CreateAppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState("");
  const [plugin, setPlugin] = useState<Plugin | undefined>();

  return (
    <CreateAppContext.Provider
      value={{
        step,
        setStep,
        plugin,
        setPlugin,
      }}
    >
      {children}
    </CreateAppContext.Provider>
  );
};

export const useCreateAppContext = () => {
  const context = useContext(CreateAppContext);
  if (!context) {
    throw new Error(
      "useCreateAppContext must be used within a CreateAppProvider",
    );
  }
  return context;
};
