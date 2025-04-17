import React, { useEffect, useState } from 'react'
import { Retool } from '@tryretool/custom-component-support'
import Editor from '@monaco-editor/react'

export const CodeEditor = () => {
  // Retool state to hold the code string
  const [codeValue, setCodeValue] = Retool.useStateString({
    name: 'codeValue',
    defaultValue: '// Start typing code here...',
  })

  // Internal editor value fallback in case Retool hasn't loaded yet
  const [localValue, setLocalValue] = useState('// Start typing code here...')

  // Ensure Retool value gets set on mount if empty
  useEffect(() => {
    if (!codeValue || codeValue.trim() === '') {
      setCodeValue(localValue)
    } else {
      setLocalValue(codeValue)
    }
  }, [codeValue, setCodeValue])

  // Handle editor content changes
  const handleEditorChange = (value: string | undefined) => {
    const newValue = value ?? ''
    setLocalValue(newValue)
    setCodeValue(newValue)
  }

  return (
    <div style={{ fontFamily: 'Lexend, sans-serif', height: '100%' }}>
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={localValue}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontFamily: 'Lexend',
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  )
}