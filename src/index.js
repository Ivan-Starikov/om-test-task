import React from 'react'
import ReactDOM from 'react-dom/client'

import AudioBlock from './components/AudioBlock/AudioBlock'

import './global.scss'

import aws from '../public/assets/aws.svg'
import cloud from '../public/assets/cloud.svg'

const awsImg = document.getElementById('awsImg')
const cloudImg = document.getElementById('cloudImg')

awsImg.src = aws
cloudImg.src = cloud

ReactDOM.createRoot(document.getElementById("audio"),
).render(
  <React.StrictMode>
    <AudioBlock />
  </React.StrictMode>,
);
