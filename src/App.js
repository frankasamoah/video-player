
import './App.css';
import { useRef , useState, useEffect} from 'react';
// import VideoPlayer from './VideoPlayer';
import vid from "./assets/sintel-short.mp4";


function App() {

  const video = useRef(null);

  // ^ STATE
  
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  // ^PLAY OR PAUSE FUNCTION

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  //& play or pause the video through the value of the isPlaying property

  useEffect(() => {
    playerState.isPlaying
      ? video.current.play()
      : video.current.pause();
  }, [playerState.isPlaying, video]);


  // ^ PROGRESS BAR

  const handleVideoDuration = () => {
    const progress = (video.current.currentTime / video.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  };

  //& to be able to drag the progress bar

  const handleDragProgressBar = (e) => {
    const dragProgressBar = parseInt(e.target.value);
    video.current.currentTime = (video.current.duration / 100) * dragProgressBar;
    setPlayerState({
      ...playerState,
      progress: dragProgressBar,
    });
  };

  // ^ VIDEO SPEED

  const handleVideoSpeed = (e) => {
    const speed = parseInt(e.target.value);
    video.current.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  };


  // ^ MUTE FUNCTION

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  //& mute or not through the value of the isMuted property

  useEffect(() => {
    playerState.isMuted
      ? (video.current.muted = true)
      : (video.current.muted = false);
  }, [playerState.isMuted, video]);



  // const {
  //   playerState,
  //   togglePlay,
  //   handleOnTimeUpdate,
  //   handleVideoProgress,
  //   handleVideoSpeed,
  //   toggleMute,
  // } = VideoPlayer(video);

  return (
    <div className="container">
      <div className="container-video">
        <video
          src={vid}
          ref={video}
          onTimeUpdate={handleVideoDuration}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <i className="bx bx-play"></i>
              ) : (
                <i className="bx bx-pause"></i>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleDragProgressBar(e)}
          />
          <select
            className="speed"
            value={playerState.speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!playerState.isMuted ? (
              <i className="bx bxs-volume-full"></i>
            ) : (
              <i className="bx bxs-volume-mute"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
