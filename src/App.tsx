/** @format */
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const message = location.state;
  if (message) {
    console.log(message);
  }
  return (
    <div className="App">
      <Button type="submit">a</Button>
    </div>
  );
}

export default App;
