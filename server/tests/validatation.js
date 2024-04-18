const validateUrl = (list) => {
    //confirm https
    const x = /^https:\/\//;
    //is a google maps url
    const y = /^https:\/\/maps\.google\.com/;
    // const z = /^(?:https?:\/\/).+/i;
    let r = [];
    //confirm https
    for (let i = 0; i < list.length; i++) {
        if((!y.test(list[i].link)) && x.test(list[i].link)){
            r.push(list[i]);
        }
    }

    return r;
}


const urlList = [
    {
      title: '2024 New Rain Fire Flame Novedades Humidifier - Tendarstores',
      link: 'https://maps.google.com/maps%3Fq%3DCJJD1921588%26um%3D1%26ie%3DUTF-8&opi=89978449'
    },
    {
      title: '2024 New Products Rain Cloud Fire Humidifier Water Drip ...',
      link: '/search%3Fq%3DCJJD1921588%26sca_esv%3D3248254e93e9ddf0%26ie%3DUTF-8%26tbm%3Dshop%26source%3Dlnms&opi=89978449'
    },
    {
      title: '2024 New Products Rain Cloud Fire Humidifier Water ... - Vincentvolt',
      link: 'https://tendarstores.com/product/2024-new-rain-fire-flame-novedades-humidifier/'
    },
    {
      title: '2024 New Products Rain Cloud Fire Humidifier ... - IsraelExpressStore',
      link: 'https://www.bonanza.com/listings/2024-New-Products-Rain-Cloud-Fire-Humidifier-Water-Drip-Novedades-2024-Rain-Wate/1598762158%3Fgoog_pla%3D1%26variation_id%3D1834576941'
    },
    {
      title: 'Meadw Store',
      link: 'https://vincentvolt.com/product/2024-new-products-rain-cloud-fire-humidifier-water-drip-novedades-2024-rain-water-diffuser-fire-flame-humidifier-aroma-diffuser/'       
    },
    {
      title: '2024 New Products Rain Cloud Fire Humidifier Water ... - Deshehut',
      link: 'https://israelexpressstore.com/product/2024-new-products-rain-cloud-fire-humidifier-water-drip-novedades-2024-rain-water-diffuser-fire-flame-humidifier-aroma-diffuser/'
    }
  ];

const bitch = [
  {
    title: 'DSDecor Garden Solar Lights Outdoor Decorative Resin Owl Solar ...',
    link: '/search%3Fq%3DSolar%2BResin%2BOwl%2BDecorative%2BProducts%2BLED%2BLights%2BCreative%2BOutdoor%2BCourtyard%2BDecoration%2BGifts%2BCJLS1489631%26sca_esv%3Ddbd91de441e8abd6%26ie%3DUTF-8%26tbm%3Dshop%26source%3Dlnms&opi=89978449'
  },
  {
    title: 'XURLEQ Garden Solar Light Outdoor Decor, Resin Owl Solar LED ...',
    link: 'https://maps.google.com/maps%3Fq%3DSolar%2BResin%2BOwl%2BDecorative%2BProducts%2BLED%2BLights%2BCreative%2BOutdoor%2BCourtyard%2BDecoration%2BGifts%2BCJLS1489631%26um%3D1%26ie%3DUTF-8&opi=89978449'
  },
  {
    title: 'Garden Solar Lights Outdoor Decorative Resin Owl Solar LED ...',
    link: 'https://www.amazon.com/DSDecor-Outdoor-Decorative-Pathway-Decortions/dp/B085TM191R'
  },
  {
    title: 'Powiller Garden Solar Lights Outdoor Decorative Resin ... - Walmart',
    link: 'https://www.amazon.com/Outdoor-Waterproof-Passage-Courtyard-Decoration/dp/B09H5QQD6P'
  },
  {
    title: 'Solar Owl Led Light Outdoor Decorative Light Courtyard ... - eBay',
    link: 'https://www.walmart.com/ip/Garden-Solar-Lights-Outdoor-Decorative-Resin-Owl-Solar-LED-Lights-with-Stake-for-Garden-Lawn-Pathway-Yard-Decortions/737786556'
  },
  {
    title: 'Garden Solar Light Outdoor Decor Resin Owl Solar LED Light with ...',
    link: 'https://www.walmart.com/ip/Powiller-Garden-Solar-Lights-Outdoor-Decorative-Resin-Owl-Solar-LED-Lights-with-Stake-for-Garden-Lawn-Pathway-Yard-Decortions-White/528229918'
  },
  {
    title: 'Resin Owl Solar Light Garden Decoration - Cutemarts',
    link: 'https://www.ebay.com/itm/404520925437'
  },
  {
    title: 'Garden Solar Light Resin Owl Design Solar Led Light Stake ... - Temu',
    link: 'https://a.aliexpress.com/_EHvXEl3'
  }
];


const newList = validateUrl(bitch);
console.log(newList);