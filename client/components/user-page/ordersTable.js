import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

const _formatDate = (date) => {
  return date.slice(5, 7) + "/" + date.slice(8, 10) + "/" + date.slice(0, 4)
}

const _formatTime = (date) => {
  let half = " am"
  let hour = date.slice(11, 13)
  console.log(date)
  if (hour > 12) {
    half = " pm"
    console.log(hour)
    hour = hour % 12
  }
  if (hour === "00") hour = 12
  return hour + ":" + date.slice(14, 16) + half
}

const hash = (str) => str.split('').reverse().map((v,i) => (i!==5)?String.fromCharCode( 66+ (v.charCodeAt(0)*37)%26 ):'-').join('').slice(1,10)

export const OrdersTable = (props) => {
  let sorted = Object.keys(props.orders).sort((a, b) => a.updatedAt > b.updatedAt)

  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Products</TableHeaderColumn>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Price</TableHeaderColumn>
          <TableHeaderColumn>Status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          sorted.map((order, index) => {
            let totalPrice = props.orders[order].reduce((sum, purchase) => {
              return sum + purchase.priceAtTimeOfSale * purchase.quantity
            }, 0)
            let time = props.orders[order][0].updatedAt
            let formattedDate = _formatDate(time)
            let formattedTime = _formatTime(time)
            let orderId = hash(time)

            return (
              <TableRow key={index}>
                <TableRowColumn>
                  {orderId}
                </TableRowColumn>
                <TableRowColumn>
                  {
                    props.orders[order].map((purchase, index) => {
                      return (
                        <div key={index} className="orderPurchase">
                          <h5>
                            {`${purchase.cheese.name} (${purchase.quantity})`}
                          </h5>
                          <h6>
                            {`$${purchase.priceAtTimeOfSale}`}
                          </h6>
                          {index < props.orders[order].length - 1 && <Divider />}
                        </div>
                      )
                    })
                  }
                </TableRowColumn>
                <TableRowColumn>
                  <div>
                    {formattedDate}
                  </div>
                  <div>
                    {formattedTime}
                  </div>
                </TableRowColumn>
                <TableRowColumn>
                  {`$${totalPrice}`}
                </TableRowColumn>
                <TableRowColumn>
                  <h4>Completed</h4>
                </TableRowColumn>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}
