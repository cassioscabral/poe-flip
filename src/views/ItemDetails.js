
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTable, useFilters } from 'react-table'
import poeNinjaApi from '../api/poeninja'
import { itemsMeta, poeNinjaURLBuilder } from '../utils/poeninja'
import { useParams } from 'react-router-dom'

export default function ItemDetails() {

  let { league, item } = useParams()
  const itemMeta = itemsMeta[item.toLowerCase()]
  // eslint-disable-next-line
  const itemColumns = React.useMemo(itemMeta.columns(league), [league])
  const [items, setItems] = useState([])
  // "mounted"
  useEffect(() => {
    poeNinjaApi({
      method: 'GET',
      url: poeNinjaURLBuilder(item, { league })
    }).then(res => {
      console.log('res', res);
      setItems(res.data?.lines)
      return res
    })
  }, [item, league])

  return (
        <div className="items-table">
          <Styles>
            <Table columns={itemColumns} data={items} />
          </Styles>
        </div>
  )
}




const Styles = styled.div`
  padding: 1rem;

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;

    tr {
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

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  // debugger
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useFilters)

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                  {column.render('Header')}
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
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
