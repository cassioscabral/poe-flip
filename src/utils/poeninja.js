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

const defaultColumns = (otherColumns = [], { league = 'Standard'} = {}) => [
  ...[
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
  }
  ],
  ...otherColumns,
  {
    Header: 'Actions',
    Cell: row => {
      return (
        <div className="actions">
{/* https://www.pathofexile.com/trade/search/Standard?q={%22query%22:{%22filters%22:{},%22type%22:%22Winged%20Bestiary%20Scarab%22}} */}
          <button
            className="border-aqua border-2 p-2 rounded"
            onClick={() => window.open(`https://www.pathofexile.com/trade/search/${league}?q={"query":{"filters":{},"type":"${row.row.original.name}"}}`, '_blank')}>
          Search
        </button>
      </div>
      )
    }
  }
]

const itemsMeta = {
  currency: {
    id: 'Currency',
    endpoint: 'currencyoverview'
  },
  fragment: {
    id: 'Fragment',
    endpoint: 'currencyoverview'
  },
  oil: {
    id: 'Oil',
  },
  incubators: {
    id: 'Incubators'
  },
  scarabs: {
    id: 'Scarabs',
    columns: defaultColumns
  }
}
const poeNinjaURLBuilder = (objectType, endpoint = 'itemoverview', league = 'Standard' ) => {
  return `${endpoint}?league=${league}&type=${objectType}`
}

export {
  poeNinjaURLBuilder,
  itemsMeta
}