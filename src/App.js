import logo from './logo.svg';
import './App.css';
import { AddNotes } from './Components/AddNotes';
import { GetNotes } from './Components/GetNotes';

function App() {
  return (
    <div className="App">
      <GetNotes/>
      <br/>
      <br/>
      <br/>
      <AddNotes/>
      
  
    </div>
  );
}

export default App;
