import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { ProductsTable } from '../user-page/productsTable'
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


export const OrdersTable = (props) => {

  let sorted = Object.keys(props.orders).sort((a, b) => a.createdAt > b.createdAt)
  let hash = (str) => str.split('').reverse().map((v, i) => (i !== 5) ? String.fromCharCode(66 + (v.charCodeAt(0) * 37) % 26) : '-').join('').slice(1, 10)

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
          sorted.map((order, index) => {
            return (
              <TableRow key={index}>
                <TableRowColumn>
                  {hash(props.orders[order][0].createdAt)}
                </TableRowColumn>
                <TableRowColumn>
                  {
                    props.orders[order].map((purchase, index) => {
                      return (
                        <div key={index} className="orderPurchase">
                          <h5>
                            {purchase.cheese.name + " x" + purchase.quantity}
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
                  <RaisedButton
                    label="Abel is a noob"
                  />
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
