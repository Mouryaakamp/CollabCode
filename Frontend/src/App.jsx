
import Editor from '@monaco-editor/react';
import * as Y from 'yjs'
import { MonacoBinding } from "y-monaco"
import { SocketIOProvider } from 'y-socket.io'
import { useMemo, useRef } from 'react';


function App() {
  const editref = useRef(null)
  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])



  const handlemount = (editor) => {
    editref.current = editor

    const provider = new SocketIOProvider("http://localhost:8000/", "monaco", ydoc, {
      autoConnect: true
    })
const monacobinding=new MonacoBinding(
  yText,
  editref.current.getModel(),
  new Set([editref.current]),
  provider.awareness
)

  }
  return (
    <main className=" h-screen w-full bg-gray-950 p-4 flex gap-2">
      <aside className='h-full w-1/4 bg-amber-500 border-white rounded-lg'>


      </aside>
      <section className='w-3/4 h-full bg-cyan-900 border-white rounded-lg overflow-hidden'>
        <Editor
          height="101%"
          defaultLanguage="javascript"
          defaultValue='//Some code '
          theme='vs-dark'
          onMount={handlemount}
        />



      </section>
    </main>
  )
}

export default App
