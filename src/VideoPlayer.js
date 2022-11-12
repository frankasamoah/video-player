import {useState, useEffect} from 'react';

const VideoPlayer = (video) => {

// const [isPlaying, setIsPlaying] = useState(false);
// const [speed, setSpeed] = useState(1);
// const [progress, setProgress] = useState(0);
// const [isMuted, setIsMuted] = useState(false);


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

    const handleOnTimeUpdate = () => {
      const progress = (video.current.currentTime / video.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress,
      });
    };

    

    const handleVideoProgress = (e) => {
      const manualChange = parseInt(e.target.value);
      video.current.currentTime = (video.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
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

  return (
    {
      playerState,
      togglePlay,
      handleOnTimeUpdate,
      handleVideoProgress,
      handleVideoSpeed,
      toggleMute,
    }
  )
}

export default VideoPlayer

// const [player, setPlayer] = useState({
//  isPlaying: false,
// isMute: flase,
// speed : 1,
// progress: 0
// });

// const togglePlay = () => {
// setPlayer ({
// ...player, isPlaying : !player.isPlaying
// })
// }