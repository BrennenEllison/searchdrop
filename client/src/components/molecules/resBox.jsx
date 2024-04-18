import { useState } from "react";
import ImageCard from '../atoms/imageCard.jsx';
import listItem from '../atoms/listItem.jsx';



function resBox() {
    const [loading, setLoading] = useState(false);
    const [isList, setIsList]  = useState(false);
    const [results, setResults] =useState();
    //false = imageCard, true = listitems
    const fakeImgData = [{
        img: "idk.com",
        title: 'dumb title',
        price: '69.99'
    }];
    const fakeListData = [{
        url: "clickbait.",
        context: " idk"
    }]

    return (
        <div>
            {isList === false ? fakeImgData.map(data => {<ImageCard
                src={data.img}
                title={data.title}
                price={data.prices} />}) : 
                fakeListData.map(data => {
                <listItem 
                href={data.url}
                children={data.context}
                site={data.context}
                />})}
        </div>
    )
}

export default resBox
