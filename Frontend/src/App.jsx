
import Editor from '@monaco-editor/react';
import * as Y from 'yjs'
import { MonacoBinding } from "y-monaco"
import { SocketIOProvider } from 'y-socket.io'
import { useEffect, useMemo, useRef, useState } from 'react';


function App() {
  const editref = useRef(null)
  const [user, setuser] = useState([])
  const [username, setusername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || "";
  });

  const ydoc = useMemo(() => new Y.Doc(), []);
  const yText = useMemo(() => ydoc.getText("monaco"), [ydoc])


  const handlemount = (editor) => {
    editref.current = editor
    const monacobinding = new MonacoBinding(
      yText,
      editref.current.getModel(),
      new Set([editref.current]),

    )
  }
  const handleUsername = (e) => {
    e.preventDefault()
    setusername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value)
  }

  useEffect(() => {
    if (username) {
      const provider = new SocketIOProvider("/", "monaco", ydoc, {
        autoConnect: true
      })
      provider.awareness.setLocalStateField("user", { username })



      provider.awareness.on("change", () => {
        const states = Array.from(provider.awareness.getStates().values())
        setuser(states.filter(state => state.user && state.user.username)   // only keep valid users
          .map(state => state.user))
      })
      function handlebeforeunload() {
        provider.awareness.setLocalStateField("user", null)
      }
      window.addEventListener("beforeunload", handlebeforeunload)

      return () => {

        provider.destroy()
        window.removeEventListener("beforeunload", handlebeforeunload)
      }
    }

  }, [username])


  if (!username) {
    return (
      <div className='flex justify-center items-center  h-screen bg-gray-700'>
        <main className='h-2/4 w-1/4 flex gap-4 flex-col p-4 items-center justify-center bg-gray-800 rounded-xl'>
          <h3 className='text-white'>Welcome To CollabCode!!</h3>
          <form onSubmit={handleUsername}
            className='flex flex-col gap-4'>
            <input
              className='bg-gray-950 text-white rounded-lg p-2'
              type="text"
              placeholder='Enter your name'
              name='username'
            />
            <button
              className='bg-white text-gray-950 rounded-lg p-2 '
            >Join</button>
          </form>
        </main>
      </div>
    )
  }
  return (
    <main className=" h-screen w-full bg-gray-950 p-4 flex gap-2">
      <aside className='h-full w-1/4 bg-amber-500 border-white rounded-lg'>
        <h2 className=' text-gray-950 font-bold border-b border-gray-400 text-2xl p-4 '>Users</h2>
        <ul className='p-4'>
          {user.map((users, index) => (
            <li key={index} className='p-2 bg-gray-950 text-white rounded mb-2'>
              {users.username}
            </li>
          ))}
        </ul>
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
