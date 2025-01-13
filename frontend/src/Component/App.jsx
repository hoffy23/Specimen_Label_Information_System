import {Routes, Route} from "react-router-dom";
import '../Style/App.css';


// pages
import MRNRequest from "../pages/MRNRequest";
import LabelCreateMRN from "../pages/LabelCreateMRN";
import CompletedLabel from "../pages/CompletedLabel";
import SearchLabel from "../pages/SearchLabel";
import EditLabel from "../pages/EditLabel";
import PrintLabel from "../pages/PrintLabel";  

/**
 * Author: Menachem H
 * 
 * App component that defines the main routes for the application.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */

const App = ()=> {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MRNRequest />} />
        <Route path="/LabelCreateMRN/:MRN" element={<LabelCreateMRN />} />
        <Route path="/CompletedLabel" element={<CompletedLabel />} />
        <Route path="/EditLabel" element={<EditLabel />} />
        <Route path="/PrintLabel" element={<PrintLabel />} />
        <Route path="/SearchLabel" element={<SearchLabel/>}/>
        

      </Routes>
    </div>
  );
}
export default App;