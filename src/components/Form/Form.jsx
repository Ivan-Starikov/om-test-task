import React, { useState, useRef } from 'react'
import submit from '../../../public/assets/submit.svg'
import error from '../../../public/assets/error.svg'

import './styles.scss'

export const Form = ({ setUrl, setIsForm }) => {
  const inputRef = useRef(null)
  const [isError, setIsError] = useState(false)

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
          name='audio'
          placeholder='https://'
          className={`form__input ${isError && 'error-input'}`}
          onChange={handleOnChangeInput}
        />
        <button type='submit' className='form__submit'>
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
    const regExp =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

    return regExp.test(inputRef.current.value)
  }
}
