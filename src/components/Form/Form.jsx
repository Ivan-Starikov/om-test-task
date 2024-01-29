import React, { useEffect, useRef, useState } from 'react'
import submit from '../../../public/assets/submit.svg'
import error from '../../../public/assets/error.svg'

import './styles.scss'

export const Form = ({ url, setUrl, setIsForm, isError, setIsError }) => {
  const inputRef = useRef(null)

  useEffect(() => {
    if (url) {
      validateAudioUrl(url)
    }
  }, [url])

  return (
    <form onSubmit={handleFormSubmit} className='form' name='audio-form'>
      <label htmlFor='audio' className='form__title'>
        Insert the link
      </label>
      <div className='form__action'>
        <input
          ref={inputRef}
          type='text'
          id='audio'
          name='form-input'
          placeholder='https://'
          className={`form__input ${isError && 'error-input'}`}
          onChange={handleOnChangeInput}
        />
        <button className='form__submit'>
          <img src={submit} alt='Submit url input' />
        </button>
        {isError && (
          <>
            <span className='error-message'>This link is invalid</span>
            <img src={error} className='error-icon' aria-hidden></img>
          </>
        )}
      </div>
    </form>
  )

  async function handleFormSubmit(event) {
    event.preventDefault()
    const isValid = checkUrlTypo()

    if (isValid) {
      setUrl(event.target[0].value)
    } else {
      setIsError(true)
    }
  }

  function handleOnChangeInput() {
    setUrl('')
    setIsError(false)
  }

  function checkUrlTypo() {
    const regExp =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

    return regExp.test(inputRef.current.value)
  }

  async function validateAudioUrl(url) {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
      })

      if (res.ok && res.headers.get('content-type').startsWith('audio')) {
        setIsForm(false)
      } else {
        setIsError(true)
      }
    } catch {
      setIsError(true)
    }
  }
}
