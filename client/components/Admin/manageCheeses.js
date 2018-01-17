import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import store, { GetCheeses, UpdateCheese, AddCheese } from '../../store/cheeses.js'
import { GetPurchasesAll, GetUnorderedPurchasesUser, GetOldPurchasesUser, UpdatePurchase, AddPurchase, DeletePurchase } from '../../store/purchases'
import { NavLink } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


class ManageCheeses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
      selectedCheese: {},
      changes:{}
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose() {
    this.setState({ open: false, selectedCheese: {}, changes: Object.assign({},this.state.changes,{description:this.state.selectedCheese.description})});
  };

  handleSubmit(id,changes) {
    this.props.changeCheese(id,changes)
    this.setState({ open: false, selectedCheese: {}, changes: Object.assign({}, this.state.changes, { description: this.state.selectedCheese.description }) });
  };

  componentWillMount() {
    this.props.loadCheeses();
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={()=>this.handleSubmit(this.state.selectedCheese.id,this.state.changes)}
      />,
    ]

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%' }}>Price</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Picture</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            this.props.cheeses.map(cheese=>{
              let items = []
              for (var i=0;i<501;i++) items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
              return(
                <TableRow>
                  <TableRowColumn>
                  <TextField
                      defaultValue={cheese.name}
                      onChange={(e,newName)=>{
                        this.props.changeCheese(cheese.id,{name:newName})
                      }}
                  />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '5%' }}>{cheese.price}</TableRowColumn>
                  <TableRowColumn>
                    <DropDownMenu
                      maxHeight={500}
                      value={cheese.quantity}
                      onChange={(e,i,newQuantity)=>{
                        this.props.changeCheese(cheese.id, { quantity: newQuantity })
                      }}>
                      {items}
                    </DropDownMenu>
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      defaultValue={cheese.imageUrl}
                      onChange={(e, newImageUrl) => {
                        this.props.changeCheese(cheese.id, { imageUrl: newImageUrl })
                      }}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label={"Edit Decription"}
                      onClick={()=>{
                        this.setState({selectedCheese:cheese,open:true,changes:{}})
                      }}
                    />
                  </TableRowColumn>
                </TableRow>
              )
            })
          }
          </TableBody>

        </Table>
        <Dialog
          style={{height:400}}
          title="Description"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            fullWidth={true}
            multiLine={true}
            defaultValue={this.state.selectedCheese.description}
            onChange={(e,val)=>{
              this.setState({changes:Object.assign({},this.state.changes,{description:val})})
            }}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(storeState) {
  return {
    cheeses: storeState.cheeses,
    user: storeState.user,
    reviews: storeState.reviews
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCheeses: () => {
      dispatch(GetCheeses())
    },
    changeCheese: (id, change) => {
      dispatch(UpdateCheese(id, change))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCheeses)
