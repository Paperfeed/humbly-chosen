import React from 'react'
import ReactDOM from 'react-dom'

import { Content } from '../messages/content-messages'
import { sendMessage } from '../messages/handler'
import Options from './Options'

async function initialiseOptions() {
  const options = await sendMessage(Content.Initialize)
  console.log(options)
  ReactDOM.render(
    <Options options={options} />,
    document.getElementById('options-root'),
  )
}

initialiseOptions()
