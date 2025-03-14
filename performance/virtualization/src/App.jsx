import { FixedSizeList as List } from "react-window";
const Row = ({ index, style }) => <div style={style}>Row {index}</div>;

function App() {
  return (
    //1000 elements , but we only see few elements depending upon size
    // each item has height of 35 pixel , with is 300
    // automatically renders how many items can fit in the size of 150 section 
    
    <>
      <List height={150} itemCount={1000} itemSize={35} width={300}>
        {Row}
      </List>
    </>
  );
}

export default App;
