import { Link } from "react-router-dom";

export default function() {
    return (
        <div className="nav-main">
            <div className="nav-brand">
                <Link to="/">SGAIR</Link>
            </div>
            <div className="nav-items">
                <Link to="/data">Data</Link>
            </div>
        </div>
    )
}