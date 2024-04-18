

function ImageCard({src, title, price}) {
    return (
        <div>
            <img src={src} alt="reference-image" />
            <h3>{title}</h3>
            <h5>{price}</h5>
        </div>
    )
}

export default ImageCard
