"use client";

import React from "react";
import { QuizProvider } from "./quiz-app-context";
import QuizCover from "../create/quiz-cover";

export default function QuizApp() {
    return (
        <QuizProvider>
            <QuizCover />
        </QuizProvider>
    )
}