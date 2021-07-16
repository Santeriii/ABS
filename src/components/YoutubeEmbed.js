import React from "react";
import "../css/YoutubeEmbed.css";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

const YoutubeEmbed = ({ url }) => (
    <div>
        <BrowserView>
            <div className="youtube-embed">
                <iframe
                width="853"
                height="480"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>
        </BrowserView>
        <MobileView>
            <div className="youtube-embed__mobile">
                <iframe
                width="100%"
                height="200"
                src={url}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                />
            </div>
        </MobileView>
    </div>
);

export default YoutubeEmbed;