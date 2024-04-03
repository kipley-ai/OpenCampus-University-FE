import Image from "next/image"
import YatSiuImage from "components/images/michael-dziedzic-D6FMtY6XCyM-unsplash 2.png"

export default function SFTDetail() {
    return (
        <div>
            <div className="bg-[#27282D] text-white p-6 mx-6 rounded-xl">
                <div className="flex flex-col-reverse md:flex-row">
                    <div className="md:w-4/5 md:pl-6 text-[#BBBBBB] text-sm">
                        <div className="md:w-3/4">
                            <h1 className="text-6xl text-white">Knowledge Assets SFT</h1>
                            <p className="mb-4 text-base">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Amet minim mollit non deserunt  dolor do amet sint.</p>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    )
}