import Image from "next/image";
import Logo from "components/ui/logo";
import WelcomeToLight from "components/logo/welcome-to-light.svg";
import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";

const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo />
      <div className="mx-auto max-w-3xl md:px-4 md:py-8">
        <div className="flex flex-col items-center p-6 ">
          <div className="flex flex-col items-center pb-6">
            <Image
              src={WelcomeToLight}
              alt="Welcome!"
              className="w-[180px] self-center md:w-[266px]"
            />
            <h1 className="text-center text-2xl font-bold xs:text-3xl md:text-4xl lg:text-5xl">
              OCU
            </h1>
          </div>
          <div className="w-4/5 text-center text-sm font-medium xs:text-base">
            <div className="mb-6 md:mt-6">
              OCU represents the forefront of Web3 education
              and innovation.
            </div>
            <div className="">
              Powered by KIP Protocol, OCU unlocks true
              digital property rights of educators’ Knowledge Keys, and
              transforms education through blockchain + AI technology.
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <GetInvolvedButton
            buttonStyle="button bg-container rounded-full px-10 py-2 border-b-4"
            content={
              <span className="text-sm font-medium">Get Started Now</span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
