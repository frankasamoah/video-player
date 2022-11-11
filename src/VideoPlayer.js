import {useState, useEffect} from 'react';

const VideoPlayer = (video) => {

    const [playerState, setPlayerState] = useState({
      isPlaying: false,
      progress: 0,
      speed: 1,
      isMuted: false,
    });

    const togglePlay = () => {
      setPlayerState({
        ...playerState,
        isPlaying: !playerState.isPlaying,
      });
    };

    useEffect(() => {
      playerState.isPlaying
        ? video.current.play()
        : video.current.pause();
    }, [playerState.isPlaying, video]);

    const handleOnTimeUpdate = () => {
      const progress = (video.current.currentTime / video.current.duration) * 100;
      setPlayerState({
        ...playerState,
        progress,
      });
    };

    const handleVideoProgress = (event) => {
      const manualChange = Number(event.target.value);
      video.current.currentTime = (video.current.duration / 100) * manualChange;
      setPlayerState({
        ...playerState,
        progress: manualChange,
      });
    };

    const handleVideoSpeed = (event) => {
      const speed = Number(event.target.value);
      video.current.playbackRate = speed;
      setPlayerState({
        ...playerState,
        speed,
      });
    };

    const toggleMute = () => {
      setPlayerState({
        ...playerState,
        isMuted: !playerState.isMuted,
      });
    };

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