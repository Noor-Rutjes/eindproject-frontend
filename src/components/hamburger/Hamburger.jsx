import React from "react";
import "./Hamburger.css"

function Hamburger({isOpen}) {
    return (
        <button className="hamburger">
            <div className={isOpen ? "burger burger-top" : "burger"}></div>
            <div className={isOpen ? "burger burger-center" : "burger"}></div>
            <div className={isOpen ? "burger burger-bottom" : "burger"}></div>
        </button>
    );
}
export default Hamburger;