import React, { useState } from 'react'
import { Form } from '../Form/Form'
import { Player } from '../Player/Player'

const AudioBlock = () => {
  const [url, setUrl] = useState('')
  const [isForm, setIsForm] = useState(true)

  return (
    <>
      {isForm ? (
        <Form url={url} setUrl={setUrl} setIsForm={setIsForm} />
      ) : (
        <Player url={url} isForm={isForm} setIsForm={setIsForm} />
      )}
    </>
  )
}

export default AudioBlock
