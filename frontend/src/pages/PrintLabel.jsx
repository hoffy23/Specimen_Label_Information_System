import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";


// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"


const PrintLabel = () => {

    // Mabye remove as no data is being sent to another page 
    // next 2 lines
    const navigate = useNavigate();
    const location = useLocation();
    // incoming  
    const queryParams = new URLSearchParams(location.search);
    
    const selectedLabel = queryParams.get('selectedLabel');
    const selectedPatient = queryParams.get('selectedPatient');
    // selectedLabel string to selectedLabelNum which is int
    const selectedLabelNum = parseInt(selectedLabel, 10);
    // Never used selectedPatient
    
    // Label QTY
    const [LabelQTY,setLabelQTY] = useState('');
    const LabelQTYs = ['1','2','3','4','5'];
    
    
    //Label
    const [Label, setLabel] = useState('');
    
    const [SelectedOption, setSelectedOption] = useState(false);

    useEffect(() => { 
        const fetchData = async () => {
            try{
                // fetch request MRN patient record
                const response = await fetch(`/api/label/${[selectedLabelNum]}`);
                //Check whether network is good if not error fetch resource.
                if(!response.ok) {
                    throw new Error("Could not fetch resource");
                }
                // parsed from JSON object to data variable 
                const data = await response.json();
                
                setLabel(data);
                //console.log('label ID',Label);
            } catch (error){
                console.error('Error fecthing Label ID from Database', error);
            }
        };
        fetchData();
    }, []);
    
    const handleDropDown = (e) => {
        setSelectedOption(true);
        setLabelQTY(e.target.value)
    }
    const handleButton = () => {
        
        if(SelectedOption) {
            alert(`Printing ${LabelQTY} Labels ...
                Label ID: ${Label.labelId}
                Patient Name: ${Label.patient.firstName} ${Label.patient.lastName}
                Patient DOB: ${new Date(Label.patient.dob).toLocaleDateString("en-GB")}
                Staff ID: ${Label.staffId}
                Date:  ${new Date(Label.createdAt).toLocaleDateString('en-GB')}
                Time: ${new Date(Label.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false}) }`);
        }else{
            alert(`Select an Label QTY`);
        }
            
    }
   return(
    <div className="container-main">
        <Header />
        <HeroBanner />
    <div className="container-body">
        <SideNavBar />
        <div id="PrintLabelPage" className="container-content">
        <h1 className="title-page">Search Printed Label </h1>

        {Label ? (
            <div id="Print-information">
                <h3 className="patient-data">MRN NUMBER: {Label.mrn}</h3>
                <h3 className="patient-data">First Name: {Label.patient.firstName}</h3>
                    <h3 className="patient-data">Last Name:{Label.patient.lastName}</h3>
                    <h3 className="patient-data">DOB:{new Date(Label.patient.dob).toLocaleDateString("en-GB")}</h3>
                    <h3 className="patient-data">Gender:{Label.patient.gender}</h3>
                    <h3 className="patient-data">Test Type:{Label.testType}</h3>
                    <h3 className="patient-data">Lab ID:{Label.labId}</h3>
                    <h3 className="patient-data">Ward ID:{Label.wardId}</h3>
                    <h3 className="patient-data">Label ID:{Label.labelId}</h3>
                
                </div>
        ): (
            <p>Error could not find Patient Label information.</p>
        )}
        {Label ? (
            <div className="Print-information-below">
            <h3>Label QTY</h3>
            <select id="Options-PrintLabel" className="Options-Dropdown-Label" value={LabelQTY} onChange={handleDropDown}>
            <option value="">Label QTY</option>
                {LabelQTYs.map((item) => (
            <option key={item} value={item}> {item}</option>
        ))}
        </select>
        <button className="btn-blue" onClick={handleButton} disabled={!SelectedOption}>PRINT</button>
        

            </div>
        ): (
            <p>Error could not find Label QTY information.</p>
        )}
      
    </div>
    </div>
    </div>
   )
} 
export default PrintLabel;
           
 