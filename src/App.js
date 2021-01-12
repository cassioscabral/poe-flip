import './App.css';
import poeNinjaApi from './api/poeninja'
import { itemsMeta, poeNinjaURLBuilder } from './utils/poeninja'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
console.log('itemsMeta', itemsMeta);
const Styles = styled.div`
  padding: 1rem;

  table {
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
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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

function App() {
  const [items, setItems] = useState({})

  // "mounted"
  useEffect(() => {
    poeNinjaApi({
      method: 'GET',
      url: poeNinjaURLBuilder('Scarab')
    }).then(res => {
      console.log('res', res);
      setItems({
        scarabs: {
          items: res.data?.lines,
        }
      })
      return res
    })
  }, [])
  // eslint-disable-next-line
  const scarabColumns = React.useMemo(itemsMeta.scarabs.columns, [])
  return (
    <div className="App container mx-auto">
      <h1>POE Flip</h1>
      <hr />
      { items?.scarabs?.items.length > 0 ?
        <div className="scarabs-table">
          <Styles>
            <Table columns={scarabColumns} data={items.scarabs.items} />
          </Styles>
        </div>
        :
        <span>Scarabs not loaded</span>
      }
    </div>
  );
}

export default App;
