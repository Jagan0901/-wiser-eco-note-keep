import { useEffect, useState } from "react";
import { NotesList } from './NotesList';
import axios from "axios";

export function GetNotes() {
  const [notesList, setNotesList] = useState(null);
  const [refresh,setRefresh] = useState(false);
  
  useEffect(() => {
      const getShows = async() => {
        setRefresh(false)
    try {
        const {data} = await axios.get("https://666f9f310900b5f87247b846.mockapi.io/users");
    setNotesList(data);
    

    return () => {
      console.log('Cleanup on unmount or before effect re-runs');}
    
    } catch (error) {
        window.alert(`Error Occurred ${error}`)
    }
  };
  getShows();
 },[refresh])
  
//   useEffect(() => getShows(), []);

  return notesList ? (
    <div>
      <div className="App-container">
        {notesList.map((ws) => (
          <NotesList key={ws.id} webSeries={ws} refresh={setRefresh}/>
        ))}
      </div>
    </div>
  ) : (
    "Loading..."
  );
}
