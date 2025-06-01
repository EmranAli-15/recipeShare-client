"use client"

import React, { useState } from 'react'
import Editor from '../editor/Editor'

export default function AddRecipe() {
  const [content, setContent] = useState("");
  const data = `<div></div>`

  const d = () => {
    console.log(content);
  }

  return (
    <div>
      <button onClick={d}>CLICK</button>
      <Editor data={data} setContent={setContent}></Editor>

    </div>
  )
}
