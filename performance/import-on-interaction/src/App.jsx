import { useState,lazy ,Suspense} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Message from './Message'
// import Emoji from './Emoji'


//lazy loading at component level
const Emoji= lazy(()=> import('./Emoji'));
function App() {
  
// now  we save heap memory and also prevent loading the component required in network tab
// now only when we click on Show emoji button , that emoji component is loaded in the network tab 

const [showEmoji, toggleEmoji] =useState(false);

  return (
    <>
      <Message/>
      <button onClick={(()=>toggleEmoji((prev)=>!prev))}>Show Emoji </button>
      {showEmoji && <Suspense fallback={<>Loading...</>}>
        <Emoji/>
      </Suspense>}
    </>
  )
}
// function App() {
//   //both the emoji and message component is loaded in network tab even if we don't need a emoji component it will be loaded

// const [showEmoji, toggleEmoji] =useState(false);

//   return (
//     <>
//       <Message/>
//       <button onClick={(()=>toggleEmoji((prev)=>!prev))}>Show Emoji </button>
//       {showEmoji && <Emoji/>}
//     </>
//   )
// }

export default App
