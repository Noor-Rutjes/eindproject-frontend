import React from "react";
import "./ContentBlock.css";

function ContentBlock({ mediaType, mediaSrc, alt, title, children, id }) {
    return (
        <article className="content-block" id={id}>
            <figure className="media-container">
                {mediaType === "image" ? (
                    <img
                        src={mediaSrc}
                        alt={alt}
                    />
                ) : mediaType === "video" ? (
                    <video width="600" controls autoPlay={true} loop={true}>
                        <source src={mediaSrc} type="video/mp4" />
                        Je browser ondersteunt de video tag niet.
                    </video>
                ) : null}
            </figure>
            <section className="text-container">
                {title && <h1>{title}</h1>}
                {children}
            </section>
        </article>
    );
}

export default ContentBlock;
