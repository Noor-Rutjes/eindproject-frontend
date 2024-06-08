import React from "react";
import {Link} from "react-router-dom";
import "./NotFound.css";
import image from '../../assets/404.png';
import ContentBlock from "../../components/contentBlock/ContentBlock.jsx";

function NotFound() {
    return (
        <ContentBlock
            title="Sorry! Deze pagina bestaat niet (meer)."
            mediaType="image"
            mediaSrc={image}
            alt={"melding pagina niet gevonden"}
            id={"not-found-page"}
        >
            <p>Ga terug naar de <a href="javascript:history.back()">vorige pagina, </a>
                ga naar de <Link to="/">homepagina </Link>
                of neem <a href="mailto:rijksbling@gmail.com">contact </a>met ons op.</p>
        < /ContentBlock>
    )
}

export default NotFound;