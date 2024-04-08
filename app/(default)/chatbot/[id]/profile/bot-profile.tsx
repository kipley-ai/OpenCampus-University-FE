import Image from "next/image"
import YatSiuImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 1.png"
import { useParams, useRouter } from "next/navigation"
import { useChatbotDetail } from "@/hooks/api/chatbot"
import { useNftDetail } from "@/hooks/api/nft"
import { chatbotIdFromSlug } from "@/utils/utils"

export default function ChatbotProfile() {
    const { id: slug } = useParams();
    const id = chatbotIdFromSlug(slug.toString());
    const router = useRouter();

    const { data: chatbotData } = useChatbotDetail({
        chatbot_id: id as string,
    });

    console.log(chatbotData);

    return (
        <div>
            <div className="mx-6 my-3">
                <h2 className="text-2xl text-heading">Yat Siu</h2>
            </div>
            <div className="bg-[#27282D] text-heading p-6 mx-6 rounded-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/5">
                        <div className="mb-4">
                            <Image
                                src={YatSiuImage}
                                alt="Yat Siu"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className="md:w-4/5 md:pl-6 text-[#BBBBBB] flex flex-col justify-between">
                        <div className="items-start">
                            <p className="mb-4 text-base">Veteran technology entrepreneur/investor Yat Siu is the co-founder and executive chairman of Animoca Brands, a global leader in blockchain and gaming with the goal to provide property rights for virtual assets. Yat began his career at Atari Germany, then established Hong Kong Cybercity/Freenation, the first free web page and email provider in Asia. In 1998 he set up Outblaze, an award-winning pioneer of multilingual white label web services. After selling one of its business units to IBM, he pivoted Outblaze to incubate digital entertainment projects. One of those projects is Animoca Brands.</p>
                            <p className="text-base">Yat has numerous accolades, including Global Leader of Tomorrow at the World Economic Forum, Young Entrepreneur of the Year at the DHL/SCMP Awards, and recognition as one of Cointelegraph's top 100 notable people in blockchain. A classically trained musician, Yat is a member of the advisory board of BAFTA (British Academy of Film and Television Arts) and a director of the Asian Youth Orchestra.</p>
                        </div>
                        <div className="items-end">
                            <button className="bg-transparent hover:brightness-75 text-heading font-bold py-2 px-4 my-5 border border-[#00EDBE] rounded-full">
                                Chat with Yat Siu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}