import "./App.css";
import Button from "./components/ui/Button";
function App() {
  return (
    <div className="App">
      <Button value="Create" />
      <Button isPrimary={false}>Show result</Button>
    </div>
  );
}

export default App;
