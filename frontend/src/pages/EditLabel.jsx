import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"


const EditLabel = () => {

    // sending data 
    const navigate = useNavigate()
    const location = useLocation();

    // Incoming Data  
    const queryParams = new URLSearchParams(location.search);
    const selectedLabel = queryParams.get('selectedLabel');
    const selectedPatient = queryParams.get('selectedPatient');
    // selectedLabel string to selectedLabelNum which is int
    const selectedLabelNum = parseInt(selectedLabel, 10);

     //Label
     const [Label, setLabel] = useState(null);


    useEffect(() => { 
        const fetchData = async () => {
            try{
                // fetch request MRN patient record
                const response = await fetch(`/api/labelhistory/${[selectedLabelNum]}`);
                //Check whether network is good if not error fetch resource.
                if(!response.ok) {
                    throw new Error("Could not fetch resource");
                }
                // parsed from JSON object to data variable 
                const data = await response.json();
                setLabel(data);
                
            } catch (error){
                console.error('Error fecthing Label History from Database', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async ()  => {

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
                const response = await fetch('/api/labelhistory/',{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(SaveLabel)
                });
                if(response.ok){
                    const responseData = await response.json();
                    console.log('Patient label information submited success', responseData);
                    // Go to MRNRequest page 
                    // Please change to serach MRN page when created
                    navigate(`/PrintLabel`);
                }
                else{
                    console.log('Network response not successful:', response.statusText);
                }
            }catch (error) {
                console.error('Error submitting Save Label:', error);
            }
    };
    
 
    return (
        <div className="container-main">
        <Header />
        <HeroBanner />
        <div className="container-body">
            <SideNavBar />
            <div id="EditLabelPage" className="container-content">
                <h1 className="title-page">Edit Label</h1>
                <button className="btn-blue" onClick={handleSubmit}>SAVE</button>
        </div>
        </div>
        </div>
    )

}
export default EditLabel;