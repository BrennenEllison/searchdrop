

function IistItem({children, href, site}) {
    return (
        <>
            <h3>{children}</h3>
            <li><a href={href} target="_blank">{site}</a></li>
        </>
    )
}

export default IistItem
