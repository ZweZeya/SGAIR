import Navbar from "./components/Navbar";

export default function({ children }) {
    return (
        <div>
            <Navbar />
            <div className="layout-body">
                { children }
            </div>    
        </div>
    )
}