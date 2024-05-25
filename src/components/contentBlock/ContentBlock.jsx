import React from "react";
import "./ContentBlock.css"

function ContentBlock({image, alt, title, children, id}) {
    return (
        <section className="content-block" id={id}>
            <div className="image-container">
                <img
                    src={image}
                    alt={alt}
                />
            </div>
            <article className="text-container">
                <h1>{title}</h1>
                {children}
            </article>
        </section>
    );
}

export default ContentBlock;