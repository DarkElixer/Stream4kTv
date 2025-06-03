import { getSeriesLiveLink } from "../../services/apiVod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import "../../styles/player.css";

import ReactJwPlayer from "react-jw-player";
import Loader from "../../ui/Loader";
import { useEffect } from "react";

function SeriesJwPlayer() {
  const { seriesName, seasonNo, episodeNo } = useParams();
  const seriesIdFromURL = seriesName.split("-").pop();
  const seasonIdFromURL = seasonNo.split("-").pop();
  const episodeIdFromURL = episodeNo.split("-").pop();
  const seriesNoFromURL = episodeNo.split("-")[1];
  const { data: seriesLink, isLoading } = useQuery({
    queryKey: [
      "seriesLink",
      { seriesIdFromURL, episodeIdFromURL, seasonIdFromURL },
    ],
    queryFn: () =>
      getSeriesLiveLink({
        movieId: seriesIdFromURL,
        seasonId: seasonIdFromURL,
        episodeId: episodeIdFromURL,
        seriesNo: seriesNoFromURL,
      }),
    cacheTime: Infinity,
  });
  useEffect(() => {
    document.title = `${seriesName
      .replace(/[^a-zA-Z-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .split("-")
      .join(" ")
      .toUpperCase()} | ${seasonNo
      .slice(0, seasonNo.lastIndexOf("-"))
      .split("-")
      .join(" ")
      .toUpperCase()} | ${episodeNo
      .slice(0, episodeNo.lastIndexOf("-"))
      .split("-")
      .join(" ")
      .toUpperCase()}`;
    return () => (document.title = "Live TV");
  }, [seasonNo, seriesName, episodeNo]);
  if (isLoading) return <Loader />;
  return (
    <div className="player">
      <ReactJwPlayer
        playerId="my-unique-id"
        playerScript="https://content.jwplatform.com/libraries/IDzF9Zmk.js"
        file={seriesLink}
        image={
          "https://www.tellyupdates.com/wp-content/uploads/2021/08/opinion-the-seasonal-shows-hit-formula-on-indian-tv-920x51801-1.jpg"
        }
        privacy={true}
        customProps={{
          skin: {
            name: "netflix",
          },
          preload: "auto", // Preload content to minimize buffering delays
          bufferLength: 2, // Reduce buffer length for faster playback
          adaptiveStreaming: true, // Enable dynamic bitrate adjustment
          hlsjsConfig: {
            liveSyncDuration: 1,
            maxLoadingDelay: 2,
            minAutoBitrate: 0,
            lowLatencyMode: true,
            subtitlePreference: {
              lang: "en-US",
            },
            maxBufferHole: 5, // Start fetching next segment when 3s are left
            maxBufferLength: 12, // Keep 2 full segments (6s * 2)
          }, // Optimize HLS streaming for minimal latency
          startparam: "starttime", // Ensure fast start for VOD playback
        }}
      />
    </div>
  );
}

export default SeriesJwPlayer;
