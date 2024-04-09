import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Mousewheel,
  Keyboard,
  Pagination,
  Controller,
  HashNavigation,
} from "swiper";
import Box from "@mui/material/Box";

import LoadingOverlay from "@/components/LoadingOverlay";
import useBreakpoints from "@/hooks/useBreakpoints";
import MainCanvas from "./main-canvas";
import { useTheme } from "next-themes";
import {
  showLoadingProgress,
  showLoaderOnMobile as showLoaderOnMobileDefault,
} from "./Constants";

import "./App.css";
import "animate.css";
import { useCreateChatbotContext } from "../../create-knowledge-context";
import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";

import Pattern from "components/background/grid-opencampus-blue.svg";
import ThemeSwitcher from "@/components/theme-switcher";

let hideText = false;

function App() {
  const { setWelcomePage } = useCreateChatbotContext();
  const breakpoints = useBreakpoints();
  const { belowBreakpoint, belowXS, belowSM } = breakpoints;

  const [swiperSlideStatus, setSwiperSlideStatus] = useState({
    previousIndex: 1,
    activeIndex: 2,
    direction: "down",
    isUp: true,
    isDown: false,
  });

  const [enableSwiper, setEnableSwiper] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  // console.log("swiperSlideStatus: ", swiperSlideStatus);

  const containerRef = useRef();
  const trackingRef = useRef();
  const [hideLoadingOverlay, setHideLoadingOverlay] = useState(true);

  const { theme, setTheme } = useTheme();

  let speed = 1000;

  const checkDeviceIsMobile = () => {
    let result = false;
    if (
      window.navigator.userAgent.match(/Android/i) ||
      window.navigator.userAgent.match(/webOS/i) ||
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPod/i) ||
      window.navigator.userAgent.match(/BlackBerry/i) ||
      window.navigator.userAgent.match(/Windows Phone/i)
    ) {
      result = true;
    } else {
      result = false;
    }

    return result;
  };
  // let isMobileDevices = checkDeviceIsMobile();
  // let showLoaderOnMobile = !belowSM;
  // let showLoaderOnMobile = !isMobileDevices;
  // let enableLoader = showLoadingProgress && showLoaderOnMobile;

  const isMobileDevices = checkDeviceIsMobile();

  const hideText = true;

  // if (theme === "light") {
  //   return (
  //     <div className="App">
  //       <div
  //         className="app-wrapper relative" ref={containerRef}
  //         style={{
  //           backgroundImage: `url(${Pattern.src}), linear-gradient(180deg, #1228F3 0%, #FFFFFF 25%)`,
  //         }}
  //       >
  //         <div>
  //           <ThemeSwitcher />
  //         </div>
  //         <MainCanvas
  //           swiperSlideStatus={swiperSlideStatus}
  //           setEnableSwiper={setEnableSwiper}
  //           ref={containerRef}
  //           isMobileDevices={isMobileDevices}
  //           hideText={hideText}
  //         />
  //         <div className="absolute bottom-[8vh] min-[600px]:bottom-[20vh] lg:bottom-[10vh] xl:bottom-[12vh] flex w-full flex-row justify-center">
  //           <GetInvolvedButton
  //             buttonStyle="rounded-full bg-white px-10 py-3 w-full shadow-md border border-2 border-b-8 border-[#1228F3]"
  //             content={
  //               <span className="text-sm font-bold text-[#1227F2]">Get Started now</span>
  //             }
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   )
  // };

  return (
    <div className="App">
      <div
        className="app-wrapper relative" ref={containerRef}
        style={{
          backgroundImage: `url(${Pattern.src})`,
        }}
      >
        <div>
          <ThemeSwitcher />
        </div>
        <MainCanvas
          swiperSlideStatus={swiperSlideStatus}
          setEnableSwiper={setEnableSwiper}
          ref={containerRef}
          isMobileDevices={isMobileDevices}
          hideText={hideText}
        />
        <div className="absolute bottom-[8vh] min-[600px]:bottom-[20vh] lg:bottom-[10vh] xl:bottom-[12vh] flex w-full flex-row justify-center">
          <GetInvolvedButton
            buttonStyle="rounded-full px-10 py-3 w-full shadow-md border border-2 border-b-8 "
            content={
              <span className="text-sm font-bold">Get Started now</span>
            }
          />
        </div>
      </div>
    </div>
  )

}

export default App;
