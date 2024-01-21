const Form = ({ setUrl, setIsForm }) => {
  const inputRef = React.useRef(null);
  const [isError, setIsError] = React.useState(false)

  return (
    <form onSubmit={handleFormSubmit} class="form" name="audio-form">
      <label for="audio">Insert the link</label>
      <div class="url-wrapper">
        <input
          ref={inputRef}
          type="text"
          id="audio"
          name="audio"
          placeholder="https://"
          class="url-input"
          onChange={handleOnChangeInput}
        />
        <button type="submit" class="url-button">
          <img src="assets/submit.svg" alt="Submit url input" />
        </button>
        {isError && (
          <>
            <span class="error-message">Email Field is Invalid</span>
            <img src="assets/error.svg" class="error-icon" aria-hidden></img>
          </>
        )}
      </div>
    </form>
  )

  function handleFormSubmit(event) {
    event.preventDefault()

    const isValid = validateInput()

    if (isValid) {
      setUrl(inputRef.current.value)
      setIsForm(false)
    }

    setIsError(!isValid)
  }

  function handleOnChangeInput() {
    setIsError(false)
  }

  function validateInput() {
    const regExp = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

    return regExp.test(inputRef.current.value)
  }
}

const Player = ({ url, setIsForm }) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [currentVolume, setCurrentVolume] = React.useState(0.3)
  const [duration, setDuration] = React.useState(0)
  const [loading, setLoading] = React.useState(true);

  const audioRef = React.useRef(null)

  React.useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current?.addEventListener("canplay", handleCanPlay)

    return () => {
      audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current?.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  React.useEffect(() => {
    setDuration(audioRef.current.duration);
    audioRef.current.volume = currentVolume
  }, [])

  return (
    <>
      <button class="back-button" aria-label="Back" onClick={handleBack}>← Back</button>
      <div className="player">
        {loading && (
          <div class="loading">
            <div class="loading-bar">
              <div class="loading-line"></div>
            </div>
          </div>
        )}
        <button className="player__button" aria-label="Play" onClick={handlePlayPause}>
          {isPlaying && !loading ? <img src="assets/pause.svg"></img> : <img src="assets/play.svg"></img>}
        </button>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          class="player__playback"
          style={{
            background: `linear-gradient(90deg, #FFFFFF ${currentTime}%, #ADACAD ${currentTime}%)`
          }}
        />

        <audio ref={audioRef} src={url} />
        <div class="player__data">
          <span className="player__track-duration">
            {formatDuration(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={currentVolume}
            onChange={handleVolume}
            class="player__volume"
            style={{
              background: `linear-gradient(90deg, #000000 ${currentVolume * 100}%, #FFFFFF ${currentVolume * 100}%)`
            }}
          />
        </div>
      </div>
    </>
  )

  function handlePlayPause() {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime)
  }

  function handleSeek(event) {
    audioRef.current.currentTime = event.target.value
    setCurrentTime(audioRef.current.currentTime)
  }

  function handleVolume(event) {
    audioRef.current.volume = event.target.value
    setCurrentVolume(audioRef.current.volume)
  }

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60)
    const seconds = Math.floor(durationSeconds % 60)
    const formattedSeconds = seconds.toString().padStart(2, "0")
    return `${minutes}:${formattedSeconds}`
  }

  function handleCanPlay() {
    setLoading(false)
  }

  function handleBack() {
    setIsForm(true)
  }
}

const AudioBlock = () => {
  const [url, setUrl] = React.useState('')
  const [isForm, setIsForm] = React.useState(true)

  return (
    <>
      {isForm ? (
          <Form url={url} setUrl={setUrl} setIsForm={setIsForm} />
        ) : (
          <Player url={url} setIsForm={setIsForm} />
        )
      }
    </>

  )
}

export default ReactDOM.render(<AudioBlock />, document.getElementById('audio-block'))
