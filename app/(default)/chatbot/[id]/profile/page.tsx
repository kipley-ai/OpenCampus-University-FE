import ChatbotProfile from "./bot-profile"
import SFTDetail from "./sft-detail"

export default function Profile() {
    return (
        <div >
            <ChatbotProfile />
            <div className="my-4" />
            <SFTDetail />
        </div>
    )
}