import { React, useState } from "react";
import AddFileForm from "./components/AddFileForm";

function App() {
  const [parsed, setParsed] = useState("");

  return (
    <div className="App">
      <h1>Welcome to expenses analyzer!</h1>
      <h2>Add file to analyze:</h2>
      <AddFileForm parsed={parsed} setParsed={setParsed}></AddFileForm>
    </div>
  );
}

export default App;
