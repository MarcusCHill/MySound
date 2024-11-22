import * as React from 'react';
import { Nav } from "./Nav";

function HamburgerNav(){

  const [isActive, setIsActive] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  React.useEffect(() => {
      document.body.classList.toggle("lockScroll", isActive);
  }, [handleClick, isActive]);

  return(
    <>
      <div id="hamburgerNav" onClick={handleClick} className={isActive ? "active": null}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Nav isActive={isActive} handleClick={handleClick}></Nav>
    </>
  )

}

export default HamburgerNav;