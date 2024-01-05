import React, { useEffect, useState } from "react";
import useWindowDimensions from "../../utils/windowDimensions";

const videoList = [
  {
    link: "https://www.youtube.com/embed/_qJGlMQ5XOo?si=ehSAI9v8OmoCa87q?autoplay=1&mute=1",
  },
  {
    link: "https://www.youtube.com/embed/_qJGlMQ5XOo?si=ehSAI9v8OmoCa87q",
  },
  {
    link: "https://www.youtube.com/embed/_qJGlMQ5XOo?si=ehSAI9v8OmoCa87q",
  },
  {
    link: "https://www.youtube.com/embed/_qJGlMQ5XOo?si=ehSAI9v8OmoCa87q",
  },
];
export default function NewVideoOfTSGaming() {
    const { width } = useWindowDimensions();
    const [widthToShowVideo, setWidthToShowVideo] = useState('100%');

    useEffect(() => {
        if(width < 400) {
          setWidthToShowVideo('150');
        } else if(width < 640) {
          setWidthToShowVideo('270');
        } else if (width > 640 && width < 767) {
          setWidthToShowVideo('350')
        } else {
          setWidthToShowVideo('100%')
        }
      }, [width])
  return (
    <div className="category-page mb-3">
      <div>
        <h2 className="text-blue-500 text-[32px] mb-3 font-bold px-2">Video Mới của TS Gaming</h2>
      </div>
      <div className=""> 
      {/* flex flex-wrap */}
        <div className="w-[100%]">
          {/* w-[100%] md:w-[70%] */}
          <iframe
            width="100%"
            height=""
            src={videoList[0].link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-3xl p-2 h-[300px] sm:h-[370px] md:h-[512px] lg:h-[550px]"
          ></iframe>
        </div>
        {/* <div className="w-[100%]  md:w-[30%] flex flex-row flex-wrap">
          {videoList.slice(1, videoList.length).map((item, index) => (
            <div key={index} className="w-[100%]">
              <iframe
                width="100%"
                height={widthToShowVideo}
                src={item.link}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-3xl p-2"
              ></iframe>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
