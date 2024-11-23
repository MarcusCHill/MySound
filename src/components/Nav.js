import { Link } from "react-router-dom"

//Nav component returns Links to pages based on current path
//Accepts isActive and handleClick defined in hamburgerNav
export function Nav({ isActive, handleClick }) {

    const currentPath = window.location.pathname;

    //clear tokens and code when user signs out
    const handleSignOut = () => {
        localStorage.clear()
    }

    //shows all avaible pages except the current path/page
    return (
        <div id="nav" className={isActive ? "active": null}>
        <div className="opacityLayer"></div>
        <div className="verticalLinks">
            {(currentPath !== '/callback') && <Link to="/callback">Home</Link>}
            {(currentPath !== '/callback/all-time') && <Link to="/callback/all-time" onClick={handleClick}>All Time</Link>}
            {(currentPath !== '/callback/six-months') && <Link to="/callback/six-months" onClick={handleClick}>Last Six Months</Link>}
            {(currentPath !== '/callback/last-month') && <Link to="/callback/last-month" onClick={handleClick}>Last Month</Link>}
            <Link to="/" onClick={() => { handleClick(); handleSignOut(); }}>Sign Out</Link>
        </div>
        </div>
    )
}
