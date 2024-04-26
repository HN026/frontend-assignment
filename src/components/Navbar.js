import React, { useContext } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { SelectedOptionContext } from '../App';
import Select from 'react-select';

const Navbar = ({ options }) => {
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);
    const matchMetrics = useMatch("/metrics");
    const matchLogs = useMatch("/logs");

    const handleSelectChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <nav className="bg-white flex items-center justify-between p-2 pl-3 pr-3 border-b-2" style={{ borderColor: '#cee0f8', position: 'sticky', top: 0, zIndex: 1000 }}>
            <div className="flex items-center justify-start">
                <div className="mr-5">
                    <img src={`${process.env.PUBLIC_URL}/tflogo.svg`} alt="Logo" className="h-8 w-auto" />
                </div>
                <div className="flex items-center justify-center">
                    <NavLink
                        className={`mr-2 p-2 flex items-center ${matchMetrics ? 'border-b-2' : ''}`}
                        style={matchMetrics ? { borderColor: '#5e03fc' } : {}}
                        to="/metrics"
                    >
                        <img src={`${process.env.PUBLIC_URL}/${matchMetrics ? 'metrics.png' : 'metrics-gray.png'}`} alt="Metrics Logo" className="h-4 w-auto mr-2" />
                        Metrics
                    </NavLink>
                    <NavLink
                        className={`p-2 flex items-center ${matchLogs ? 'border-b-2' : ''}`}
                        style={matchLogs ? { borderColor: '#5e03fc' } : {}}
                        to="/logs"
                    >
                        <img src={`${process.env.PUBLIC_URL}/${matchLogs ? 'list-active.png' : 'list.png'}`} alt="Logs Logo" className="h-4 w-auto mr-2" />
                        Logs
                    </NavLink>
                </div>
            </div>
            <div>
                <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={options}
                    isSearchable={false}
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            width: 150,
                            height: 30,
                        })
                    }}
                />
            </div>
        </nav>
    );
}

export default Navbar;