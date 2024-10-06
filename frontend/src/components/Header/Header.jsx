import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { useState, useEffect } from 'react';
import { getUserLocation } from "./locationService"; // Importing the location service

export default function Header() {
    const [countryCode, setCountryCode] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocation = async () => {
            const locationCode = await getUserLocation();
            if (locationCode) {
                setCountryCode(locationCode);
            }
        };
        fetchLocation();
    }, []);

    return (
        <div className="container-fluid bg-light">
            <div className="row py-3 d-flex align-items-center">
                <div className="col-12 col-md-6 d-flex">
                <FontAwesomeIcon icon={faGlobe} className="globe-icon" />           
                    <h2 className='header-title'>Terracast</h2>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end align-items-center gap-3">
                    {countryCode && (
                        <div className="flag-icon">
                            <Flag code={countryCode} alt="User location" width="32" />
                        </div>
                    )}
                    <div className="rounded-circle overflow-hidden">
                        <FontAwesomeIcon icon={faUser} onClick={() => navigate("/users/signin")} />
                    </div>
                  
                </div>
            </div>
        </div>
    );
}
