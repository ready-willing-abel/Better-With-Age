import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { ProductsTable } from './productsTable'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

export const OrdersTable = (props) => {
  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Products</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          Object.keys(props.orders).map((order, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>
                  1
                </TableRowColumn>
                <TableRowColumn>
                  {
                    props.orders[order].map((purchase, index) => {
                      return (
                        <div key={index} className="orderPurchase">
                          <h5>
                            {purchase.cheese.name}
                          </h5>
                        </div>
                      )
                    })
                  }
                </TableRowColumn>
                <TableRowColumn>
                  {props.orders[order][0].createdAt}
                </TableRowColumn>
                <TableRowColumn>
                  <RaisedButton label="Abel is a noob"/>
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
