import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"


const CompletedLabel = () => {

    const navigate = useNavigate();
    const [Print, setPrint] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch request all label 
                const response = await fetch(`/api/label/`);
                //Check whether network is good if not error fetch resource.
                if (!response.ok) {
                    throw new Error("Could not fetch resource");
                }
                // parsed from JSON object to data variable 
                const data = await response.json();
                setPrint(data);
            } catch (error) {
                console.error('Error fecthing Label history from Database', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (labelId, patientMRN) => {
        setSelectedLabel(labelId);
        setSelectedPatient(patientMRN);
        console.log('Selected row:', labelId);
    };
    //handle reprint
    const handleReprint = () => {
        if (selectedLabel && selectedPatient) {
            console.log(`Selected label ID:, ${selectedLabel}. Selected Patient MRN: ${selectedPatient}`);
            navigate(`/PrintLabel?selectedLabel=${selectedLabel}&selectedPatient=${selectedPatient}`);
        }
        else {
            alert("Please select a label to reprint.");
        }
    };
    return (
        <div className="container-main">
            <Header />
            <HeroBanner />
            <div className="container-body">
                <SideNavBar />
                <div id="CompletedLabelPage" className="container-content">
                    <h1 className="title-page">Completed Label page</h1>
                    {Print ? (
                        <table className="printed-label-table" >
                            <tr className="table-row">
                                <th className="table-heading">Label ID</th>
                                <th className="table-heading">MRN</th>
                                <th className="table-heading">DATE</th>
                                <th className="table-heading">TIME</th>
                                <th className="table-heading">WARD ID</th>
                                <th className="table-heading">LAB ID</th>
                                <th className="table-heading">Test Type</th>
                                <th className="table-heading">Staff ID</th>
                            </tr>

                            {Print.map((label) => {
                                //const labelData = JSON.parse(label.labelData);
                                
                                // Check if labelData is a string before parsing
                                const labelData = typeof label.labelData === 'string' ? JSON.parse(label.labelData) : label.labelData;
                                return (
                                    <tr key={label.labelId} onClick={() => handleClick(label.labelId, labelData.mrn)}
                                        className="table-row">
                                        <td className="table-data">{label.labelId}</td>
                                        <td className="table-data">{labelData.mrn}</td>

                                        <td className="table-data">{new Date(label.timestamp).toLocaleDateString("en-GB")}</td>
                                        <td className="table-data">{new Date(label.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</td>
                                        <td className="table-data">{labelData.wardId}</td>
                                        <td className="table-data">{labelData.labId}</td>
                                        <td className="table-data">{labelData.testType}</td>
                                        <td className="table-data">{label.userId}</td>
                                    </tr>
                                );
                            })}




                        </table>
                    ) : (
                        <p>Could not show data for the table</p>

                    )}

                    <button type="submit" className="button-cta-right"
                        onClick={handleReprint}
                    >
                        REPRINT LABEL
                    </button>
                    {selectedLabel ? (
                        <p>Selected label row with ID: {selectedLabel}</p>
                    ) : (
                        <p>No selection yet</p>
                    )}
                </div>
            </div>
        </div>

    )
}
export default CompletedLabel;