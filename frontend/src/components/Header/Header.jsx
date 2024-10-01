import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header() {
    return (
        <div className="container-fluid bg-light">
            <div className="row py-3 d-flex align-items-center shadow">
                <div className="col-12 col-md-6 d-flex">
                    <div className="input-group rounded-pill flex-grow-1">
                        <input 
                            type="text" 
                            className="form-control rounded-pill" 
                            placeholder="Search" 
                        />
                        <span className="input-group-text border-0 bg-transparent rounded-pill"></span>
                    </div>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end align-items-center gap-3">
                    <div className="rounded-circle overflow-hidden">
                    <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="ml-2 bell-icon">
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                </div>
            </div>
        </div>
    );
};
