import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"


const LabelCreateMRN = () => {

    const navigate = useNavigate();
    //MRN
    const [Patient, setPatient] = useState(null); 
    const {MRN} = useParams();
  
    // Temp staffId value staff ID = 201
    const staffId = 201;

    // dropdown menu 
    const [testType, setTestType] = useState('');
    const [Lab, setLab] = useState('');
    const [Ward, setWard] = useState('');
    
    // testType, testDescription
    const testTypes = {
        "401" : "Complete Blood Count",
        "402" : "Tissue Typing",
        "403" : "Infectious Diease Screening",
        "404" : "Bone Marrow Biopsy",
        "405" : "Pulmonary Function Test",
    };
    // labId, labLocation
    const Labs = {
        "101" : "Westmead Lab",
        "102" : "Balmain Lab",
        "103" : "RPA Lab",
        "104" : "Liverpool Lab",
        "105" : "St George Lab",
    };
    // wardId, wardLocation
    const Wards = {
        "301" : "Westmead Hospital",
        "302" : "Balmain Hospital",
        "303" : "RPA Hospital",
        "304" : "Liverpool Hospital",
        "305" : "St George Hospital",
    };
    
   // const [patientInformation, setPatientInformation] = useState({});
   const labelDate = new Date().toISOString();
   useEffect(() => { 
    const fetchData = async () => {
        try{
            // fetch request MRN patient record
            const response = await fetch(`/api/patient/${[MRN]}`);
            //Check whether network is good if not error fetch resource.
            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }
            // parsed from JSON object to data variable 
            const data = await response.json();
            setPatient(data);
        } catch (error){
            console.error('Error fecthing MRN ID from Database', error);
        }
    };
    fetchData();
}, []);

//
    // post request handlesubmit
    // check if testType,Lab,Ward not null
    const handleSubmit = async ()  => {
        //check whether patient data is available, if condition is false then exit the function
        if(Patient === null){
            console.error('Patient data is not available.');
            return;
        }
        if(testType == ''){
            console.error('Please select a test type.');
            return;
        }
        if(Lab == ''){
            console.error('Please select a lab type.');
            return;
        }
        if(Ward == ''){
            console.error('Please select a ward type.');
            return;
        }
        // Creating the SaveLabel object
        const SaveLabel = {
            mrn: MRN,
            testType: testType,
            staffId: staffId,
            labId: Lab,
            wardId: Ward,
            createdAt: labelDate,
            };
            console.log('Save button before:',SaveLabel);
        // Post Request 
            try{
                const response = await fetch('/api/label/',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(SaveLabel)
                });
                if(response.ok){
                    const responseData = await response.json();
                    console.log('Patient label information submited success', responseData);
                    

                    navigate(`/PrintLabel?selectedLabel=${responseData.labelId}`);
                }
                else{
                    console.log('Network response not successful:', response.statusText);
                }
            }catch (error) {
                console.error('Error submitting Save Label:', error);
            }
    };
   
    return(
        <div className="container-main">
            <Header />
            <HeroBanner />
        <div className="container-body">
            <SideNavBar />
            <div className="container-content">
            <h1 className="title-page">PATHOLOGY REQUEST</h1>
            <h3 id="mrn-patient-label">PATIENT MRN NUMBER</h3>
          
            {Patient ? (
                <div id="MRN-information">
                    <h3 className="patient-data"> {Patient.mrn}</h3>
                </div>
            ):(
                <h3 className="patient-data">Patient mrn number could not be reached. </h3>
            )}
            
            {Patient ? (
                <div id="patient-information">
                    <h3 className="patient-data">First Name: {Patient.firstName}</h3>
                    <h3 className="patient-data">Last Name:{Patient.lastName}</h3>
                    <h3 className="patient-data">DOB:{new Date(Patient.dob).toLocaleDateString("en-GB")}</h3>
                    <h3 className="patient-data">Gender:{Patient.gender}</h3>
                </div>
            ):(
                <h3 className="patient-data">Patient data could be reached. </h3>
            )}
            <div id="test-type">
            <h3 className="patient-data">TEST TYPE</h3>
                <select className="Options-Dropdown-Label" value={testType} onChange={(e) => setTestType(e.target.value)}>
                    <option value="">SELECT TEST TYPE</option>
                    {Object.keys(testTypes).map((key) => (
                        <option key={key} value={key}> {testTypes[key]}</option>
                    ))}
                </select>
            </div>
            <div id="Lab-type">
            <h3 className="patient-data">LAB ID</h3>
                <select className="Options-Dropdown-Label" value={Lab} onChange={(e) => setLab(e.target.value)}>
                    <option value="">SELECT LAB</option>
                    {Object.keys(Labs).map((key) => (
                        <option key={key} value={key}> {Labs[key]}</option>
                    ))}
                </select>
            </div>
            <div id="Ward-type">
            <h3 className="patient-data">Ward ID</h3>
                <select className="Options-Dropdown-Label" value={Ward} onChange={(e) => setWard(e.target.value)}>
                    <option value="">SELECT Ward</option>
                    {Object.keys(Wards).map((key) => (
                        <option key={key} value={key}> {Wards[key]}</option>
                    ))}
                </select>
            </div>
            <button type="submit" className="button-cta-right" 
            onClick={handleSubmit} 
            >
            SAVE & PRINT
            </button>
            </div>
         </div>
        </div>
    )
}
export default LabelCreateMRN;