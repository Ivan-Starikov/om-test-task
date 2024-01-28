import React, { useEffect, useState, useRef } from 'react'
import play from '../../../public/assets/play.svg'
import pause from '../../../public/assets/pause.svg'

import './styles.scss'

export const Player = ({ url, setIsForm }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentVolume, setCurrentVolume] = useState(0.3)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(true)
  const audioRef = useRef(null)

  const durationProportion = (currentTime * 100) / duration

  useEffect(() => {
    audioRef.current?.addEventListener('timeupdate', handleTimeUpdate)
    audioRef.current?.addEventListener('canplay', handleCanPlay)

    return () => {
      audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate)
      audioRef.current?.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current.duration) {
      setDuration(audioRef.current.duration)
    }
    audioRef.current.volume = currentVolume
  }, [])

  return (
    <>
      <button
        className='player__back-button'
        aria-label='Back'
        onClick={handleBack}
      >
        ← Back
      </button>
      <div className='player'>
        {loading && (
          <div className='loading'>
            <div className='loading-bar'>
              <div className='loading-line'></div>
            </div>
          </div>
        )}
        <button
          className='player__button'
          aria-label='Play and pause'
          onClick={handlePlayPause}
        >
          {isPlaying && !loading ? <img src={pause} /> : <img src={play} />}
        </button>
        <input
          type='range'
          min='0'
          max={duration}
          step='0.01'
          value={currentTime}
          onChange={handleSeek}
          className='player__playback'
          style={{
            background: !loading
              ? `linear-gradient(90deg, #FFFFFF ${durationProportion}%, #ADACAD ${durationProportion}%)`
              : '#ADACAD',
          }}
        />

        <audio
          ref={audioRef}
          src={url}
          onLoadedMetadata={onLoadedMetadata}
          loop
        />
        <div className='player__data'>
          <span className='player__duration'>
            {formatDuration(currentTime)}
          </span>
          <input
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={currentVolume}
            onChange={handleVolume}
            className='player__volume'
            style={{
              background: `linear-gradient(90deg, #000000 ${
                currentVolume * 100
              }%, #FFFFFF ${currentVolume * 100}%)`,
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
    if (audioRef.current.currentTime) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function handleSeek(event) {
    audioRef.current.currentTime = event.target.value

    if (audioRef.current.currentTime) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  function handleVolume(event) {
    audioRef.current.volume = event.target.value
    setCurrentVolume(audioRef.current.volume)
  }

  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60)
    const seconds = Math.floor(durationSeconds % 60)
    const formattedSeconds = seconds.toString().padStart(2, '0')
    return `${minutes}:${formattedSeconds}`
  }

  function handleCanPlay() {
    setLoading(false)
  }

  function handleBack() {
    setIsForm(true)
  }

  function onLoadedMetadata() {
    if (audioRef.current.duration) {
      setDuration(audioRef.current.duration)
    }
  }
}
