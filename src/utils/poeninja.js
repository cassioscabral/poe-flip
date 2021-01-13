import React from 'react'
// Category	API
// Currency	https://poe.ninja/api/data/currencyoverview?league=Blight&type=Currency
// Fragment	https://poe.ninja/api/data/currencyoverview?league=Blight&type=Fragment
// Oils	https://poe.ninja/api/data/itemoverview?league=Blight&type=Oil
// Incubators	https://poe.ninja/api/data/itemoverview?league=Blight&type=Incubator
// Scarabs	https://poe.ninja/api/data/itemoverview?league=Blight&type=Scarab
// Fossils	https://poe.ninja/api/data/itemoverview?league=Blight&type=Fossil
// Resonators	https://poe.ninja/api/data/itemoverview?league=Blight&type=Resonator
// Essence	https://poe.ninja/api/data/itemoverview?league=Blight&type=Essence
// Divination Cards	https://poe.ninja/api/data/itemoverview?league=Blight&type=DivinationCard
// Prophecies	https://poe.ninja/api/data/itemoverview?league=Blight&type=Prophecy
// Skill Gems	https://poe.ninja/api/data/itemoverview?league=Blight&type=SkillGem
// Base Types	https://poe.ninja/api/data/itemoverview?league=Blight&type=BaseType
// Helmet Enchants	https://poe.ninja/api/data/itemoverview?league=Blight&type=HelmetEnchant
// Unique Maps	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueMap
// Maps	https://poe.ninja/api/data/itemoverview?type=Map&league=Standard
// Unique Jewels	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueJewel
// Unique Flasks	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueFlask
// Unique Weapons	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueWeapon
// Unique Armours	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueArmour
// Unique Accessories	https://poe.ninja/api/data/itemoverview?league=Blight&type=UniqueAccessory
// Beasts	https://poe.ninja/api/data/itemoverview?league=Blight&type=Beast


// const itemNormalizer = {
//   currency: (item) => ({

//   }),
//   scarabs: (item) => ({

//   })
// }

const defaultColumns = (league = 'Standard') => () => [
  {
    Header: 'Name',
    // accessor: 'name',
    Cell: row => {
      const originalItem = row.row.original
      return (
        <div className="item-name flex items-center justify-left">
          { originalItem?.icon.length > 0 ?
            <div className="item-icon mr-2">
              <img src={originalItem.icon} alt={originalItem.name} />
            </div>
            :
            <span/>
          }
          <div className="item-name">
            { originalItem.name }
          </div>
        </div>
      )
    }
  },
  {
    Header: 'Last 7 days',
    accessor: 'sparkline.totalChange',
    Cell: row => {
      const { totalChange } = row.row.original.sparkline
      return (
        <div className={'item-change' + (totalChange > 0 ? ' text-green-600' : ' text-red-600')}>
          {totalChange}
        </div>
      )
    }
  },
  {
    Header: 'C. Value',
    Cell: row => {
      return (
        <div className="item-value flex justify-end items-center">
          {row.row.original.chaosValue > 100 ? <div className="exalted-value mr-2">{row.row.original.exaltedValue}ex</div> : <span />}
          <div className="chaos-value flex-auto justify-end flex items-center">
            {row.row.original.chaosValue}
            <img src="https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1" alt="Chaos Orb"/>
          </div>
        </div>
      )
    }
  },
  {
    Header: 'Actions',
    Cell: row => {
      return (
        <div className="actions">
{/* https://www.pathofexile.com/trade/search/Standard?q={%22query%22:{%22filters%22:{},%22type%22:%22Winged%20Bestiary%20Scarab%22}} */}
          <a
            className="border-aqua border-2 p-2 rounded"
            target="_blank"
            rel="noreferrer"
            href={`https://www.pathofexile.com/trade/search/${league}?q={"query":{"filters":{},"type":"${row.row.original.name}"}}`}>
          Search
        </a>
      </div>
      )
    }
  }
]
// ICONS URLs
//  https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Delirium/DeliriumOrbScarabs.png?w=1&h=1&scale=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Strongholds/IvoryWatchstone5.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/blight/items/OpalescentOil.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Incubation/IncubationAbyss.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Scarabs/GreaterScarabBreach.png?scale=1&scaleIndex=0&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Delve/SanctifiedFossil.png?w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Delve/Reroll2x2A.png?w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/Essence/Woe7.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Divination/InventoryIcon.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/ProphecyOrbRed.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Gems/Portal.png?scale=1&scaleIndex=0&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Rings/OpalRing.png?scale=1&scaleIndex=0&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Gems/ClusterBurst.png?scale=1&scaleIndex=0&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Maps/UndeadSiege.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/Gorge3.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Jewels/unique7.png?scale=1&w=1&h=1
//  https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtc1wvRmxhc2tzXC9UYXN0ZU9mSGF0ZSIsInciOjEsImgiOjIsInNjYWxlIjp0cnVlLCJsZXZlbCI6MX1d/4727ad7a3a/Item.png
//  https://web.poecdn.com/image/Art/2DItems/Weapons/OneHandWeapons/OneHandSwords/Varunastra.png?scale=1&w=2&h=3
//  https://web.poecdn.com/image/Art/2DItems/Armours/Boots/Skyforth.png?scale=1&w=2&h=2
//  https://web.poecdn.com/image/Art/2DItems/Amulets/AgateAmuletUnique.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/BestiaryOrbFull.png?scale=1&w=1&h=1
//  https://web.poecdn.com/image/Art/2DItems/Currency/VialTemperedFlesh.png?scale=1&w=1&h=1
const itemsMeta = {
  // currency: {
  //   disabled: true,
  //   id: 'Currency',
  //   columns: defaultColumns,
  //   endpoint: 'CurrencyOverview',
  //   icon:  'https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1'
  // },
  // fragment: {
  //   disabled: true,
  //   id: 'Fragment',
  //   columns: defaultColumns,
  //   endpoint: 'CurrencyOverview',
  //   icon: 'https://web.poecdn.com/image/Art/2DItems/Maps/AtlasMaps/FragmentPhoenix.png?scale=1&w=1&h=1'
  // },
  oil: {
    id: 'Oil',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/blight/items/OpalescentOil.png?scale=1&w=1&h=1'
  },
  incubator: {
    id: 'Incubator',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Incubation/IncubationAbyss.png?scale=1&w=1&h=1'
  },
  scarab: {
    id: 'Scarab',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Scarabs/GreaterScarabBreach.png?scale=1&scaleIndex=0&w=1&h=1'
  }
}
const poeNinjaURLBuilder = (objectType, { league = 'Standard' } = {} ) => {
  const thisItemMetaInfo = itemsMeta[objectType.toLowerCase()]
  console.log('thisItemMetaInfo', thisItemMetaInfo);
  const endpoint = thisItemMetaInfo?.endpoint?.length > 0 ? thisItemMetaInfo.endpoint : 'ItemOverview'
  return `${endpoint}?league=${league}&type=${objectType}`
}

export {
  poeNinjaURLBuilder,
  itemsMeta
}