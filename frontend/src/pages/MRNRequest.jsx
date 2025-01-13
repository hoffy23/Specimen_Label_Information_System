import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"

/**
 * MRNRequest component fetches patient data and allows users to submit a Medical Record Number (MRN).
 * 
 * @component
 * @example
 * return (
 *   <MRNRequest />
 * )
 * 
 * @returns {JSX.Element} The MRNRequest component.
 * 
 * @description
 * - Fetches patient data from the backend on component mount.
 * - Allows users to input an MRN and checks if it exists in the fetched patient data.
 * - Navigates to the LabelCreateMRN page if the MRN is found, otherwise alerts the user.
 * 
 * @function
 * @name MRNRequest
 * 
 * @property {string} MRN - The state variable for storing the input MRN.
 * @property {function} setMRN - The state setter function for MRN.
 * @property {Array} patientData - The state variable for storing fetched patient data.
 * @property {function} setPatientData - The state setter function for patientData.
 * @property {function} navigate - The function to navigate to different routes.
 * 
 * @hook
 * @name useEffect
 * @description Fetches patient data from the backend when the component mounts.
 * 
 * @function
 * @name handleSubmit
 * @description Checks if the input MRN exists in the fetched patient data and navigates or alerts accordingly.
 */

const MRNRequest = () => {
    const [MRN, setMRN] = useState('');
    const [patientData, setPatientData] = useState([]);
    const navigate = useNavigate();
    
useEffect(() => { 
    const fetchData = async () => {
        try{
            // fetch request patient record
            const response = await fetch(`/api/patient/`);
            //Check whether network is good if not error fetch resource.
            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }
            // parsed from JSON object to data variable 
            const data = await response.json();
            setPatientData(data);
        } catch (error){
            console.error('Error fecthing MRN ID from Database', error);
        }
    };
    fetchData();
}, []);

const handleSubmit = () => {
    // checks wether mrnIdFound database patient.mrn and user input value MRN
    const mrnIdFound = patientData.some(patient => patient.mrn === MRN);

        if(mrnIdFound){
            console.log(`Paitent MRN: ${MRN} success`);              
            navigate(`/LabelCreateMRN/${MRN}`);
        }
        else{
            alert("Enter a vaid MRN Number.");
        }
    };
           

    return(
        <div className="container-main">
            <Header />
            <HeroBanner />
        <div className="container-body">
            <SideNavBar />
        <div className="container-content" id="MRNRequestPage">
            <h1 className="title-page">PATHOLOGY REQUEST</h1>
            <h4 id="mrn-request-label">MRN Request</h4>
            <input type="text" value={MRN}
            onChange={(e)=>setMRN(e.target.value)} id="input-textbox-mrn-input"
            maxLength={10}/>

        <button type="submit" className="btn-blue"
        onClick={handleSubmit} 
        >
        Submit
        </button>
        
        </div>
        </div>
        </div>

    );
}
export default MRNRequest;