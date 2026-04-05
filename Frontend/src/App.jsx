
import Editor from '@monaco-editor/react';


function App() {

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
/>



      </section>
    </main>
  )
}

export default App
