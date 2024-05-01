import React from "react";
import "./ContentBlock.css"


function ContentBlock({image,alt,title, children}) {
    return (
        <section className="content-block">
            <div className="image-container">
                <img
                    className="image-class"
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