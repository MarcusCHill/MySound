import * as React from 'react';
import { Nav } from "./Nav";

//HamburgerNav is a component maily for style of 3 lines for a nav fit for mobile and larger.
function HamburgerNav(){
  //isActive useState to change className when the user opens the navigation
  const [isActive, setIsActive] = React.useState(false);

  //toggle for isActive 
  const handleClick = React.useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  //when handleClick or isActive changes we toggle lockScroll classname. (user cannot scroll on the current page while navigation is open)
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