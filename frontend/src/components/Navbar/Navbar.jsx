import "./Navbar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <ul className="navbar-nav d-flex flex-column">
                <li className="nav-item"><a className="nav-link" href="#">Dashboard</a></li>
                <li className="nav-item"><a className="nav-link" href="#">New Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Messages</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Reports</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Settings</a></li>
            </ul>
        </nav>
    );
};


    
