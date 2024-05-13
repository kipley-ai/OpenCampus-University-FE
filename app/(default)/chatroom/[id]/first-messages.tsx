import { chatbotIdFromSlug } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useChatRoomChatbotId } from '@/hooks/api/chatroom'
import { useEffect } from "react";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useState } from 'react'
import { useChatbotDetailQueries } from "@/hooks/api/chatroom"
import FirstAnswer from "./first-message";

interface Message {
    sender: "bot" | "user";
    message: string;
    chunks?: string;
    created?: any;
  }

const FirstAnswers = ({messageHistory,replyStatus}:{messageHistory:Message[],replyStatus:string}) => {
    const { id: slug } = useParams();
    const id = chatbotIdFromSlug(slug.toString());
    const [chatbotIds,setChatbotIds] = useState([])

    const { data: chatroomResult, isSuccess: chatbotDetailIsSuccess } = useChatRoomChatbotId({room_id:id})
    const getChatbotDetails = useChatbotDetailQueries(chatbotIds?chatbotIds:[])

    // const { data: chatbotData, isSuccess: chatbotDetailIsSuccess } =
    //     useChatbotDetail({
    //         chatbot_id: id as string,
    //     });


    useEffect(()=> {
        setChatbotIds(chatroomResult?.data.chatbot_ids)
        

    },[chatbotDetailIsSuccess])

    // useEffect(()=> {
    //     console.log("parallel queries", getChatbotDetails)   
    // })

    return (<div className="flex">
    {
        getChatbotDetails.map((chatbotData) => {
            return <>{
                messageHistory.length <= 0 ?
                <FirstAnswer
                    chatbotName={chatbotData?.data?.data.data.name}
                    profileImage={chatbotData?.data?.data.data.profile_image}
                    sender={"bot"}
                    message={chatbotData?.data?.data.data.example_conversation as string}
                    isGenerating={replyStatus == "answering"}
                /> : <></> 
            }</>
        })
    }
    </div>)

}

export default FirstAnswers;