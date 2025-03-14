import { useState } from "react";

//emoji will be preloaded with main.js file
const App = () => {
  const [showEmoji, toggleEmoji] = useState(false);
  const [emojiEle, setEmojiPickerEl] = useState();
  const handleClick = () => {
    import(/*webpackPreload: true, webpackChunkName: "emoji" */ "./Emoji")
      .then((module) => module.default)
      .then((emojiPicker) => {
        setEmojiPickerEl(emojiPicker);
        toggleEmoji(true);
      });
  };
  return (
    <div>
      <h1>Webpack PreLoad</h1>
      <button onClick={handleClick}>Show Emoji</button>
      {showEmoji && emojiEle}
    </div>
  );
};

export default App;
