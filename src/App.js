
import './App.css';
import { useRef , useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faVolumeMute, faVolumeHigh, faFilm} from "@fortawesome/free-solid-svg-icons";
import vid from "./assets/sintel-short.mp4";
import logo from "./assets/logo.png"


function App() {

  const video = useRef(null);
  
  // ^ STATE
  const [play, setPlay] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [mute, setMute] = useState(false);
  

  // ^PLAY OR PAUSE FUNCTION
  const togglePlay = () => {
    setPlay(!play);
  };

  //& play or pause the video through the value of the isPlaying property
  useEffect(() => {
    play
      ? video.current.play()
      : video.current.pause();
  }, [play, video]);


  // ^ PROGRESS
  // & progress of the video
  const handleTimeUpdate = () => {
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
    video.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };


  // ^ MUTE FUNCTION 
  const toggleMute = () => {
    setMute(!mute);
  };



  //& mute or not through the value of the isMuted property
  useEffect(() => {
    mute
      ? (video.current.muted = true)
      : (video.current.muted = false);
  }, [mute, video]);

//todo  ///////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div id="App">
    <div className="container">
      <div className="container-img-text">
        <img src={logo} alt="player logo" />
        <p>The best {" "}<FontAwesomeIcon icon={faFilm} /> {" "} <span>player</span> for all video formats</p>
      </div>
      <div className="container-video">
        <video
          src={vid}
          ref={video}
          onTimeUpdate={handleTimeUpdate}
        />
        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!play ? (
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
            {!mute ? (
              <FontAwesomeIcon icon={faVolumeHigh} />
            ) : (
              <FontAwesomeIcon icon={faVolumeMute} />
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
//todo  ///////////////////////////////////////////////////////////////////////////////////////////////
export default App;
