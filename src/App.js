function App() {
  const onExpensesFileLoad = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files);
    console.log(file);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (event) {
      // The file's text will be printed here
      console.log(event.target.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };

  return (
    <div className="App">
      <h1>Welcome to expenses analyzer!</h1>
      <h2>Add file to analyze:</h2>
      <input onChange={onExpensesFileLoad} type="file" accept=".csv"></input>
    </div>
  );
}

export default App;
