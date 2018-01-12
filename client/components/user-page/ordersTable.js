import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export const OrdersTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {

        }
      </TableBody>
    </Table>
  )
}
