'use client'
import React from 'react'

export const Firstsample = () => {

async function call(){

let data = await fetch(`http://localhost:5001/message/Raj`)
data = await data.json()
alert(data)


}

  return (
    <div>
        <button onClick={call}>
            SampleButton
        </button>
    </div>
  )
}

