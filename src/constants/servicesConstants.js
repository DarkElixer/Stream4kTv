const portal = "http://tv.stream4k.cc";
const controls = [
  "play-large", // The large play button in the center
  "rewind", // Rewind by the seek time (default 10 seconds)
  "play", // Play/pause playback
  "fast-forward", // Fast forward by the seek time (default 10 seconds)
  "progress", // The progress bar and scrubber for playback and buffering
  "current-time", // The current time of playback
  "duration", // The full duration of the media
  "mute", // Toggle mute
  "volume", // Volume control
  "captions", // Toggle captions
  "settings",
  "fullscreen", // Toggle fullscreen
];
const hlsConfig = {
  maxLoadingDelay: 2,
  minAutoBitrate: 0,
  lowLatencyMode: true,
  subtitlePreference: {
    lang: "en-US",
  },
  maxBufferHole: 5, // Start fetching next segment when 3s are left
  maxBufferLength: 12, // Keep 2 full segments (6s * 2)
};

export { controls, hlsConfig, portal };
