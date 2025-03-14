import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";
import Message from "./Message";
import Emoji from "./Emoji";
import { useEffect } from "react";
function App() {
  const { ref, inView } = useInView();
  useEffect(() => {
    console.log("inview", inView);
  }, [inView]);
  return (
    <>
      <Message />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div ref={ref}>
        <Suspense fallback="Loading">
          {/* only when emoji is in view port it will load it in network tab */}

          {inView && <Emoji />}
        </Suspense>
      </div>
    </>
  );
}

export default App;
