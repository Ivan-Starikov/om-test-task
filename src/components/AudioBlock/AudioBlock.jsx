import React, { useState } from 'react'
import { Form } from '../Form/Form'
import { Player } from '../Player/Player'

const AudioBlock = () => {
  const [url, setUrl] = useState('')
  const [isForm, setIsForm] = useState(true)
  const [isError, setIsError] = useState(false)

  return (
    <>
      {isForm ? (
        <Form
          url={url}
          setUrl={setUrl}
          setIsForm={setIsForm}
          isError={isError}
          setIsError={setIsError}
        />
      ) : (
        <Player url={url} setUrl={setUrl} setIsForm={setIsForm} />
      )}
    </>
  )
}

export default AudioBlock
