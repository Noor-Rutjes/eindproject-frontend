import React from "react";
import "./ContentBlock.css";

function ContentBlock({ mediaType, mediaSrc, alt, title, children, id }) {
    return (
        <section className="content-block" id={id}>
            <div className="media-container">
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
            </div>
            <article className="text-container">
                <h1>{title}</h1>
                {children}
            </article>
        </section>
    );
}

export default ContentBlock;
