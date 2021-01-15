import React from 'react'
import LazyLoad from 'react-lazyload';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

// const alternateGems = ['anomalous', 'divergente', 'phantasmal']
// const isAlternatequality = (detailsId) => {
//   const res =  alternateGems.some(v => detailsId.indexOf(v) > -1)
//   return res
// }
// const getAlternateQualityGemInfo = (gemItem) => {
//   // AlternateType == option
//   // Anomalous     == 1
//   // Divergent     == 2
//   // Phantasmal    == 3

//   // detailsId Example: "phantasmal-cyclone-20-20"
//   const { detailsId } = gemItem
//   const alternateGemName = detailsId.split('-')[0].toLowerCase()
//   return {
//     option: String(alternateGems.indexOf(alternateGemName) + 1)
//   }
// }
export const searchQueryBuilder = (item, {
  minPrice = 0, maxPrice = 99999
} = {}) => {
  const { name, type, itemType: itemIdentifier } = item
  // Not working yet
  // watchstone
  // skillgem
  // uniquemap
  // uniquejewel
  // uniqueflask
  let queryObject = {
    "query": {
      "filters": {
        "trade_filters": {
          "disabled": false,
          "filters": {
            "price": {
              "min": minPrice,
              "max": maxPrice
            }
          }
        }
      },
      "status": {
        "option": "online"
      },
      // "stats": [
      //   {
      //     "type": "and",
      //     "filters": []
      //   }
      // ],
      "type": type || name
    },
    "sort": {
      "price": "asc"
    }
  }

  // Prophecies special case
  if (itemIdentifier === 'prophecy') {
    delete queryObject.query.type
    queryObject.query.name = name
    queryObject.query.filters['type_filters'] = {
      filters: {
        category: {
          option: 'prophecy'
        }
      }
    }
  }

  // SkillGems special case
//   if (itemIdentifier === 'skillgem') {
//     // regular gem search
//     // https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{{misc_filters{:{{filters{:{{gem_level{:{{min{:21,{max{:21},{corrupted{:{{option{:true},{quality{:{{min{:20,{max{:20}}}},{type{:{Hatred{}}

//     // Anomalous gem search
//     // https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{{misc_filters{:{{filters{:{{gem_level{:{{min{:20,{max{:20},{corrupted{:{{option{:false},{gem_alternate_quality{:{{option{:{1{},{quality{:{{min{:20,{max{:20}}}},{type{:{Archmage%20Support{}}

//     // Divergent gem search
//     // https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{{misc_filters{:{{filters{:{{gem_level{:{{min{:20,{max{:20},{corrupted{:{{option{:false},{gem_alternate_quality{:{{option{:{2{},{quality{:{{min{:20,{max{:20}}}},{type{:{Arcane%20Surge%20Support{}}

//     // Phantasmal gem search
// // https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{{misc_filters{:{{filters{:{{gem_level{:{{min{:21,{max{:21},{corrupted{:{{option{:true},{gem_alternate_quality{:{{option{:{3{},{quality{:{{min{:20,{max{:20}}}},{type{:{Toxic%20Rain{}}

// // https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{{trade_filters{:{{disabled{:false,{filters{:{{price{:{{min{:0,{max{:99999}}},{misc_filters{:{{filters{:{{gem_level{:{{min{:1,{max{:1},{corrupted{:{{option{:false},{quality{:{{min{:20,{max{:20},{gem_alternate_quality{:{{option{:1}}}},{status{:{{option{:{online{},{type{:{Anomalous%20Vile%20Toxins%20Support{},{sort{:{{price{:{asc{}}
//     // console.log('item', item);
//     queryObject.query.filters['misc_filters'] = {
//       filters: {
//         'gem_level': { min: item.gemLevel, max: item.gemLevel },
//         corrupted: { option: item.corrupted },
//         quality: { min: item.gemQuality, max: item.gemQuality}
//       }
//     }
//     if (isAlternatequality(item.detailsId)) {
//       queryObject.query.filters['misc_filters'].filters['gem_alternate_quality'] = getAlternateQualityGemInfo(item)
//     }
//   }

  return queryObject
}

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
                  <img className="w-auto h-12" src={originalItem.icon} alt={originalItem.name}/>
              </LazyLoad>
            </div>
            :
            <span/>
          }
          <div className="item-name">
            {originalItem.name}
            {originalItem?.variant?.length > 0 ? `, ${originalItem.variant}` : null}
            {originalItem?.baseType?.length > 0 ? `, ${originalItem.baseType}` : null}
            <br />
            {originalItem.corrupted ? <span className="text-red-700">Corrupted</span> : null}
          </div>
        </div>
      )
    }
  },
  {
    Header: 'Last 7 days',
    accessor: 'sparkline.totalChange',
    sortType: "basic",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
    Cell: row => {
      const { totalChange, data } = row.row.original.sparkline
      return (
        <div className={'item-change' + (totalChange > 0 ? ' text-green-600' : ' text-red-600')}>
          {/* <Sparklines data={data} limit={7} width={100} height={20} margin={5} color="blue"/> */}
          <Sparklines data={data}>
            <SparklinesLine color="blue" />
            <SparklinesReferenceLine type="mean" />
          </Sparklines>
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
{/* https://www.pathofexile.com/trade/search/Standard?q={{query{:{{filters{:{},{type{:{Winged%20Bestiary%20Scarab{}} */}
          <a
            className="border-aqua border-2 p-2 rounded"
            target="_blank"
            rel="noreferrer"
            href={`https://www.pathofexile.com/trade/search/${league}?q=${JSON.stringify(searchQueryBuilder(row.row.original))}`}>
          Search
        </a>
      </div>
      )
    }
  }
]

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
  basetype: {
    id: 'BaseType',
    columns: defaultColumns,
    icon: 'https://web.poecdn.com/image/Art/2DItems/Rings/OpalRing.png?scale=1&scaleIndex=0&w=1&h=1'
  },
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
      className="flex w-full justify-between"
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        className="rounded border-2 border-gray-500 p-1"
        style={{
          width: '120px',
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
        className="rounded border-2 border-gray-500 p-1"
        style={{
          width: '120px',
        }}
      />
    </div>
  )
}