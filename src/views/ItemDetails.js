
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTable, useFilters, useSortBy, useRowSelect } from 'react-table'
import poeNinjaApi from '../api/poeninja'
import { itemsMeta, poeNinjaURLBuilder, searchQueryBuilder } from '../utils/poeninja'
import { useParams } from 'react-router-dom'

export default function ItemDetails() {

  let { league, item } = useParams()
  const itemObjectIDProperty = item.toLowerCase()
  const itemMeta = itemsMeta[itemObjectIDProperty]
  // eslint-disable-next-line
  const itemColumns = React.useMemo(itemMeta.columns(league), [league])
  const [items, setItems] = useState([])
  // "mounted"
  useEffect(() => {
    poeNinjaApi({
      method: 'GET',
      url: poeNinjaURLBuilder(item, { league })
    }).then(res => {
      let items = res.data?.lines
      if (items.length > 500) {
        items = items.filter(i => i.sparkline.totalChange > 0).slice(0, 500)
      }

      const normalizedItems = items.map(i => ({...i, itemType: itemObjectIDProperty}))
      setItems(normalizedItems)
      return res
    })
  }, [item, league, itemObjectIDProperty])

  return items.length > 0 ?
        <div className="items-table">
          <Styles>
            <Table columns={itemColumns} data={items} league={league}/>
          </Styles>
        </div>
        :
        <span className="loading"> Loading... </span>
}



const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
      cursor: pointer;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data, league }) {
  // Use the state and functions returned from useTable to build your UI
  // debugger
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({
    columns,
    data,
    initialState: {
      sortBy: [
        {
          id: 'sparkline.totalChange',
          desc: true
        }
      ]
    }
  },
    useFilters,
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  const openListOfURLs = (listOfURLs = [], target = '_blank') => {
    listOfURLs.forEach(url => window.open(url, target))
  }

  const poeTradeMultiSearch = (listOfItems = [], league = 'Standard') => {
    const listOfURLs = listOfItems.map(item => {
      return `https://www.pathofexile.com/trade/search/${league}?q=${JSON.stringify(searchQueryBuilder(item))}`
    })
    openListOfURLs(listOfURLs)
  }

  // Render the UI for your table
  return (
  <>
    <div className="bulk-actions">
        <button
          disabled={selectedFlatRows.length === 0}
          onClick={() => poeTradeMultiSearch(selectedFlatRows.map(r => r.original), league)}
          className="button border-2 border-green-700 rounded p-3 bg-green-500 text-white">
          Multi-search
      </button>
    </div>
    <table {...getTableProps()} className="mt-4">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                  </span>
                {/* Render the columns filter UI */}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} onClick={row.toggleRowSelected}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  </>
  )
}


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)
