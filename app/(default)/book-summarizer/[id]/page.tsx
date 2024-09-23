"use client";

import React, { useEffect, useState } from "react";
import { Cover } from "./cover";
import { Settings } from "./settings";
import { Result } from "./result";
import { useBookContext, BookProvider } from "./context";
import { CreditBalanceProvider } from "./credit-balance-context";

function BookSummarizer() {
  const { step, setStep } = useBookContext();

  switch (step) {
    case 1:
      return <Cover />;
    case 2:
      return <Settings />;
    case 3:
      return <Result />;
  }

  return <div>Book Summarizer</div>;
}

export default function BookSummarizerPage() {
  return (
    <BookProvider>
      <CreditBalanceProvider>
        <BookSummarizer />
      </CreditBalanceProvider>
    </BookProvider>
  );
}
