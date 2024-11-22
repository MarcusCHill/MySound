import { Link } from "react-router-dom"

export function Nav({ isActive, handleClick }) {

    const currentPath = window.location.pathname;

    const handleSignOut = () => {
        localStorage.clear()
    }

    return (
        <div id="nav" className={isActive ? "active": null}>
        <div className="opacityLayer"></div>
        <div className="verticalLinks">
            {(currentPath !== '/callback') && <Link to="/callback">Home</Link>}
            {(currentPath !== '/callback/all-time') && <Link to="/callback/all-time" onClick={handleClick}>All Time</Link>}
            {(currentPath !== '/callback/six-months') && <Link to="/callback/six-months" onClick={handleClick}>Last Six Months</Link>}
            {(currentPath !== '/callback/last-month') && <Link to="/callback/last-month" onClick={handleClick}>Last Month</Link>}
            <Link to="/" onClick={[handleClick, handleSignOut]}>Sign Out</Link>
        </div>
        </div>
    )
}
