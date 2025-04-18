import React, { useMemo } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { Retool } from '@tryretool/custom-component-support';

const defaultEditorOptions: EditorProps['options'] = {
  fontFamily: 'Lexend, sans-serif',
  fontSize: 14,
  minimap: { enabled: false },
  wordWrap: 'on',
  automaticLayout: true,
  scrollBeyondLastLine: false,
};

export const CodeEditor: React.FC = () => {
  // Event callback for changes
  const onChangeEvent = Retool.useEventCallback({ name: 'change' });

  // Default component size
  Retool.useComponentSettings({ defaultHeight: 50, defaultWidth: 80 });

  // Retool state for code content
  const [code, setCode] = Retool.useStateString({
    name: 'code',
    initialValue: '',
    inspector: 'text',
    label: 'Code',
    description: 'Content of the Monaco Editor',
  });

  // Retool state for theme/language/height/options
  const [theme] = Retool.useStateString({
    name: 'theme',
    initialValue: '',
    inspector: 'text',
    label: 'Theme',
    description: 'Theme for the Monaco Editor (e.g., vs, vs-dark, hc-black)',
  });
  const [language] = Retool.useStateString({
    name: 'language',
    initialValue: '',
    inspector: 'text',
    label: 'Language',
    description: 'Language for syntax highlighting (e.g., javascript, python)',
  });
  const [height] = Retool.useStateString({
    name: 'height',
    initialValue: '',
    inspector: 'text',
    label: 'Height',
    description: 'Height of the editor in pixels or percentage (e.g., 100px, 50%)',
  });
  const [options] = Retool.useStateString({
    name: 'options',
    initialValue: '',
    inspector: 'text',
    label: 'Options',
    description: 'Monaco Editor options in JSON format',
  });

  // Effective fallback values
  const effectiveTheme = theme.trim() ? theme : 'vs-dark';
  const effectiveLanguage = language.trim() ? language : 'javascript';
  const effectiveHeight = height.trim() ? height : '100%';
  // Parse additional options JSON
  const parsedOptions = useMemo<EditorProps['options']>(() => {
    try {
      const obj = JSON.parse(options);
      return obj && typeof obj === 'object' ? obj : {};
    } catch {
      return {};
    }
  }, [options]);

  // Merge default + parsed options
  const mergedOptions = useMemo(
    () => ({ ...defaultEditorOptions, ...parsedOptions }),
    [parsedOptions]
  );

  // Handle editor changes: update Retool state and fire event
  const handleEditorChange = (value: string | undefined) => {
    const newValue = value ?? '';
    setCode(newValue);
    onChangeEvent();
  };

  return (
    <Editor
      height={effectiveHeight}
      width="100%"
      language={effectiveLanguage}
      theme={effectiveTheme}
      value={code}
      onChange={handleEditorChange}
      options={mergedOptions}
    />
  );
};

export default CodeEditor;