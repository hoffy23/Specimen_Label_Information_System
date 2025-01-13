import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// components
import Header from "../Component/Header";
import HeroBanner from "../Component/HeroBanner"
import SideNavBar from "../Component/SideNavBar"

/**
 * SearchLabel component allows users to search for printed labels using a Medical Record Number (MRN).
 * 
 * @component
 * 
 * @example
 * return (
 *   <SearchLabel />
 * )
 * 
 * @returns {JSX.Element} The SearchLabel component.
 * 
 * @description
 * This component fetches label data from the backend and allows users to filter and select labels based on MRN.
 * 
 * @function
 * @name SearchLabel
 * 
 * @hook
 * @name useNavigate
 * @description Used for navigation to different routes.
 * 
 * @hook
 * @name useState
 * @description Manages state for Search, FilterSearch, MRN, LabelSelected, and PressedSearchButton.
 * 
 * @hook
 * @name useEffect
 * @description Fetches label data from the backend when the component mounts.
 * 
 * @param {Object} props - React props.
 * 
 * @state {Array} Search - Stores the fetched label data.
 * @state {Array} FilterSearch - Stores the filtered label data based on MRN.
 * @state {string} MRN - Stores the input MRN value.
 * @state {string} LabelSelected - Stores the selected label ID.
 * @state {boolean} PressedSearchButton - Indicates whether the search button has been pressed.
 * 
 * @method
 * @name fetchData
 * @description Fetches label data from the backend and sets it to the Search state.
 * 
 * @method
 * @name handleSearch
 * @description Filters the Search state based on the MRN and sets the result to FilterSearch.
 * 
 * @method
 * @name handleNext
 * @description Navigates to the PrintLabel page with the selected label and MRN as query parameters.
 * 
 * @requires Header - Header component.
 * @requires HeroBanner - HeroBanner component.
 * @requires SideNavBar - SideNavBar component.
 */


const SearchLabel = () => {

    const navigate = useNavigate();
    const [Search, setSearch] = useState([]);
    const [FilterSearch, setFilterSearch] = useState([]);
    const [MRN, setMRN] = useState('');
    const [LabelSelected, setLabelSelected] = useState('');
    const [PressedSearchButton, setPressedSearchButton] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch request patient record
                const response = await fetch(`/api/label/`);
                //Check whether network is good if not error fetch resource.
                if (!response.ok) {
                    throw new Error("Could not fetch resource");
                }
                // parsed from JSON object to data variable 
                const data = await response.json();
                //all label data
                setSearch(data);
                // label data which will be used for search
                setFilterSearch(data);
            } catch (error) {
                console.error('Error fecthing Label history from Database', error);
            }
        };
        fetchData();
    }, []);



    const handleSearch = () => {
        setPressedSearchButton(true);
        const labels = Search.filter(label => {
            const labelData = JSON.parse(label.labelData);
            return labelData.mrn === MRN;
        });
        setFilterSearch(labels);

    }

    const handleNext = () => {
        if (LabelSelected && MRN) {
            console.log(`Selected label ID:, ${LabelSelected}. Selected Patient MRN: ${MRN}`);
            navigate(`/PrintLabel?selectedLabel=${LabelSelected}&selectedPatient=${MRN}`);
        } else {
            alert("Please select a label from the drop down menu.");
        }
    }

    return (
        <div className="container-main">
            <Header />
            <HeroBanner />
            <div className="container-body">
                <SideNavBar />
                <div id="SearchLabelPage" className="container-content">
                    <h1 className="title-page">Search Printed with MRN</h1>

                    <h4 id="mrn-serach-label">MRN NUMBER</h4>
                    <input type="text" value={MRN}
                        onChange={(e) => setMRN(e.target.value)} id="input-textbox-mrn-input-search"
                        maxLength={10} required />

                    <button className="btn-blue" onClick={handleSearch}> SEARCH </button>


                    {PressedSearchButton && (
                        FilterSearch.length > 0 ? (

                            <div className="Option-DropDown-container">

                                <select id="Options-Label" className="Options-Dropdown-Label" value={LabelSelected} onChange={(e) => setLabelSelected(e.target.value)}>
                                    <option value="" disabled>Select label</option>
                                    {FilterSearch.map((label) => {
                                        const labelData = typeof label.labelData === 'string' ? JSON.parse(label.labelData) : label.labelData;

                                        return (
                                            <option key={label.labelId} value={label.labelId}>
                                                Label ID: {label.labelId} - Date: {new Date(label.timestamp).toLocaleDateString('en-GB')}
                                                - Time: {new Date(label.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                                            </option>

                                        );
                                    })}
                                </select>
                                <button className="btn-blue" onClick={handleNext}>NEXT</button>
                            </div>
                        ) : (
                            <p>Enter vaild Patient MRN Number.</p>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
export default SearchLabel;