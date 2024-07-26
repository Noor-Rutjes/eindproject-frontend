import React from "react";
import "./Hamburger.css";
import Button from "../../button/Button.jsx";

function Hamburger({ isOpen }) {
    return (
        <Button
            type="button"
            id="hamburger-button"
            text=""
        >
            <div className={isOpen ? "burger burger-top" : "burger"}></div>
            <div className={isOpen ? "burger burger-center" : "burger"}></div>
            <div className={isOpen ? "burger burger-bottom" : "burger"}></div>
        </Button>
    );
}

export default Hamburger;
