
import './App.css';
import { useRef , useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import vid from "./assets/sintel-short.mp4";


function App() {

  const video = useRef(null);
  
  // ^ STATE
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  

  // ^PLAY OR PAUSE FUNCTION

  const togglePlay = () => {
    setIsPlaying(!isPlaying);

  };

  //& play or pause the video through the value of the isPlaying property

  useEffect(() => {
    isPlaying
      ? video.current.play()
      : video.current.pause();
  }, [isPlaying, video]);


  // ^ PROGRESS


  // & progress of the video
  const handleVideoProgress = () => {
    const vidProgress = (video.current.currentTime / video.current.duration) * 100;
    setProgress(vidProgress);
  };

  //& to be able to drag the progress bar
  const handleDragProgressBar = (e) => {
    const dragProgressBar = parseInt(e.target.value);
    video.current.currentTime = (video.current.duration / 100) * dragProgressBar;
    setProgress(dragProgressBar);
  };

  // ^ VIDEO SPEED
  const handleVideoSpeed = (e) => {
    const newSpeed = parseInt(e.target.value);
    video.current.playbackRate = speed;
    setSpeed(newSpeed);
  };


  // ^ MUTE FUNCTION

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  //& mute or not through the value of the isMuted property

  useEffect(() => {
    isMuted
      ? (video.current.muted = true)
      : (video.current.muted = false);
  }, [isMuted, video]);


  return (
    <div className="container">
      <div className="container-video">
        <video
          src={vid}
          ref={video}
          onTimeUpdate={handleVideoProgress}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!isPlaying ? (
                <FontAwesomeIcon icon={faPlay} />
              ) : (
                <FontAwesomeIcon icon={faPause} />
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleDragProgressBar(e)}
          />
          <select
            className="speed"
            value={speed}
            onChange={(e) => handleVideoSpeed(e)}
          >
            <option value="0.50">0.50x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="2">2x</option>
          </select>
          <button className="mute-btn" onClick={toggleMute}>
            {!isMuted ? (
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
