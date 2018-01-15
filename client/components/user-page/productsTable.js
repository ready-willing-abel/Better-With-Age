import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const ProductsTable = (props) => {
  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Quantity</TableHeaderColumn>
          <TableHeaderColumn>Unit Price</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.purchases.map((purchase, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>
                  {purchase.cheeseId}
                </TableRowColumn>
                <TableRowColumn>
                  hey
                </TableRowColumn>
                <TableRowColumn>
                  there
                </TableRowColumn>
                <TableRowColumn>
                  data
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
