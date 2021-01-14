import React from 'react'
import LazyLoad from 'react-lazyload';

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
              <LazyLoad width={48} height={48}>
                  <img class="w-auto h-12" src={originalItem.icon} alt={originalItem.name}/>
              </LazyLoad>
            </div>
            :
            <span/>
          }
          <div className="item-name">
            {originalItem.name}
            {originalItem?.variant?.length > 0 ? `, ${originalItem.variant}` : null}
            {originalItem?.baseType?.length > 0 ? `, ${originalItem.baseType}` : null}
          </div>
        </div>
      )
    }
  },
  {
    Header: 'Last 7 days',
    accessor: 'sparkline.totalChange',
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    Cell: row => {
      const { totalChange } = row.row.original.sparkline
      return (
        <div className={'item-change' + (totalChange > 0 ? ' text-green-600' : ' text-red-600')}>
          {totalChange > 0 ? '+' : null}{totalChange}%
        </div>
      )
    }
  },
  {
    Header: 'C. Value',
    accessor: 'chaosValue',
    Filter: NumberRangeColumnFilter,
    filter: 'between',
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
  },
  watchstone: {
    id: 'Watchstone',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Strongholds/IvoryWatchstone5.png?scale=1&w=1&h=1'
  },
  fossil: {
    id: 'Fossil',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Delve/SanctifiedFossil.png?w=1&h=1'
  },
  essence: {
    id: 'Essence',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/Essence/Woe7.png?scale=1&w=1&h=1'
  },
  divinationcard: {
    id: 'DivinationCard',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Divination/InventoryIcon.png?scale=1&w=1&h=1'
  },
  prophecy: {
    id: 'Prophecy',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/ProphecyOrbRed.png?scale=1&w=1&h=1'
  },
  skillgem: {
    id: 'SkillGem',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Gems/ClusterBurst.png?scale=1&scaleIndex=0&w=1&h=1'
  },
  // basetype: {
  //   id: 'BaseType',
  //   columns: defaultColumns,
  //   icon: 'https://web.poecdn.com/image/Art/2DItems/Rings/OpalRing.png?scale=1&scaleIndex=0&w=1&h=1'
  // },
  uniquemap: {
    id: 'UniqueMap',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Maps/UndeadSiege.png?scale=1&w=1&h=1'
  },
  uniquejewel: {
    id: 'UniqueJewel',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Jewels/unique7.png?scale=1&w=1&h=1'
  },
  uniqueflask: {
    id: 'UniqueFlask',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/gen/image/WzksMTQseyJmIjoiMkRJdGVtc1wvRmxhc2tzXC9UYXN0ZU9mSGF0ZSIsInciOjEsImgiOjIsInNjYWxlIjp0cnVlLCJsZXZlbCI6MX1d/4727ad7a3a/Item.png?scale=1&w=1&h=1'
  },
  beast: {
    id: 'Beast',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/BestiaryOrbFull.png?scale=1&w=1&h=1'
  },
  vial: {
    id: 'Vial',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Currency/VialTemperedFlesh.png?scale=1&w=1&h=1'
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


function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}