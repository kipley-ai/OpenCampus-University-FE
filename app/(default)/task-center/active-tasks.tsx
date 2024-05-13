import Image from "next/image";
import Banner01 from "@/public/images/banner-tasks-1.png";
import Banner02 from "@/public/images/banner-tasks-2.png";
import OC100 from "@/public/images/oc-100.svg";
import Button from "@/components/button";
import XIcon from "@/public/images/X-icon.svg";

export const ActiveTasks = () => {
  const myArray: string[] = [
    "Connected to X with @theraymondyip", 
    "Follow @opencampus_xyz on X",
    "Follow @TinyTapAB on X",
    "Like this  Tweet on X",
    "Post on X about OC ID",
    "Invite a friend",
  ]

  return (
    <div className="space-y-10">
      <div 
        className="w-full h-52 bg-no-repeat bg-cover bg-center p-4 flex flex-row items-center justify-between text-white"
        style={{ 
          backgroundImage: `url(${Banner01.src})` 
        }}>
        <div className="flex flex-col space-y-5">
          <Image src={OC100} alt="OC100" width={150}/>
          <h1 className="text-2xl font-bold">Vote for your favorite creator on OC100 to earn daily OC Points!</h1>
        </div>
        <div className="flex flex-col items-center pr-4 space-y-3">
          <Button
            onClick={() => {}}
            disabled={false}
            className="px-6 py-4 rounded-xl"
          >
            <p className="font-semibold text-lg">Vote for Cohort 1</p>
          </Button>
          <span>
            03 March 2024
          </span>
        </div>
      </div>
      <div 
        className="w-full h-52 bg-no-repeat bg-cover bg-center flex flex-row px-10 items-center justify-between text-white"
        style={{ 
          backgroundImage: `url(${Banner02.src})` 
        }}>
          <div className="flex items-center space-x-3">
            <Image src={OC100} alt="OC100" width={130}/>
            <Image src={XIcon} alt="XIcon" width={70}/>
            <h1 className="text-2xl">Like and retweet this tweet regarding OC 100</h1>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Button
              onClick={() => {}}
              disabled={false}
              className="px-12 py-4 rounded-xl"
            >
              <p className="font-semibold text-lg">+10 Points</p>
            </Button>
            <span>
              29 February 2024
            </span>
          </div>
      </div>
      <div className="flex flex-col space-y-10">
        {
          myArray.map((task, index) => (
            <div key={index} className="flex flex-row items-center justify-between">
              <div className="flex flex-row space-x-5">
                <svg className="mt-2" width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4.5" cy="5.21436" r="4.5" fill="#141BEB"/>
                </svg>
                <div className="flex flex-col space-y-3">
                  <span className="text-lg font-bold">{task}</span>
                  {
                    index === 4 && <span className="text-sm opacity-50 w-2/3">Make sure you include @opencampus_xyz, #OCPoints and your new .edu username (e.g. yat.edu) in your post!</span>
                  }
                  {
                    index === 5 && <span className="text-sm opacity-50 w-2/3">Points will be added when your friend successfully signs up with one of your codes.</span>
                  }
                </div>
                
              </div>
              <Button
                onClick={() => {}}
                disabled={false}
                className="px-6 py-2 rounded-xl"
              >
                <p>+10 Points</p>
              </Button>
            </div>
          ))
        }
      </div>
      <div className="flex flex-row justify-center space-x-5 text-primary">
        <span className="cursor-pointer underline underline-offset-4">Load more</span>
        <span className="cursor-pointer underline underline-offset-4">See more</span>
      </div>
    </div>
  )
}

export default ActiveTasks;