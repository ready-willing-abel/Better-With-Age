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
import Slider from 'material-ui/Slider';


class ManageCheeses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newopen: false,
      newopen2: false,
      open: false,
      open2: false,
      selectedCheese: {},
      changes:{},
      newCheese:{}
    };
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitNew = this.handleSubmitNew.bind(this)
  }

  handleClose() {
    this.setState({ newopen2: false, newopen: false, open2: false, open: false, selectedCheese: {}, changes: {} })
  };

  handleSubmit(id,changes) {
    this.props.changeCheese(id,changes)
    this.setState({ open2: false,open: false, selectedCheese: {}, changes: {} })
  };

  handleSubmitNew() {
    this.props.createCheese(this.state.newCheese)
    this.setState({ newopen2: false, newopen: false, newCheese: {},})
  };

  componentWillMount() {
    this.props.loadCheeses();
  }

  render() {

    let itemsfornewcheese = []
    for (var i = 0; i < 401; i++) itemsfornewcheese.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)

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

    const newactions = [
      <FlatButton
        label="Update"
        primary={true}
        onClick={this.handleClose}
      />
    ]

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: '19%' }}>Name</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '12%' }}>Price</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '12%' }}>Quantity</TableHeaderColumn>
              <TableHeaderColumn>Picture</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            this.props.cheeses.map(cheese=>{
              let items = []
              for (var i=0;i<401;i++) items.push(<MenuItem value={i} key={i} primaryText={`${i}`} />)
              return(
                <TableRow>
                  <TableRowColumn style={{ width: '19%' }}>
                  <TextField
                      defaultValue={cheese.name}
                      onChange={(e,newName)=>{
                        this.props.changeCheese(cheese.id,{name:newName})
                      }}
                  />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '12%' }}>
                    <FlatButton
                      label={`$${cheese.price}`}
                      primary={true}
                      onClick={(e) => {
                        e.preventDefault()
                        this.setState({ open2: true, selectedCheese:cheese})
                      }}
                    />

                  </TableRowColumn>
                  <TableRowColumn style={{ width: '12%' }}>
                    <DropDownMenu
                      maxHeight={400}
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

            <TableRow>
              <TableRowColumn style={{ width: '19%' }}>
                <TextField
                  hintText={'New Cheese'}
                  onChange={(e, name) => {
                    this.setState({newCheese:Object.assign({},this.state.newCheese,{name})})
                  }}
                />
              </TableRowColumn>
              <TableRowColumn style={{ width: '12%' }}>
                <FlatButton
                  label={(this.state.newCheese.price) ? `$${this.state.newCheese.price}`:`$`}
                  primary={true}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({ newopen2: true})
                  }}
                />

              </TableRowColumn>
              <TableRowColumn style={{ width: '12%' }}>
                <DropDownMenu
                  maxHeight={400}
                  value={(this.state.newCheese.quantity) ? this.state.newCheese.quantity:'stock'}
                  onChange={(e, i, newQuantity) => {
                    this.setState({ newCheese: Object.assign({}, this.state.newCheese, { quantity: newQuantity }) })
                  }}>
                  {itemsfornewcheese}
                </DropDownMenu>
              </TableRowColumn>
              <TableRowColumn>
                <TextField
                  hintText={'newcheese.img.url'}
                  onChange={(e, newImageUrl) => {
                    this.setState({ newCheese: Object.assign({}, this.state.newCheese, { imageUrl: newImageUrl }) })
                  }}
                />
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton
                  label={(this.state.newCheese.description) ? "Edit Decription" : "Add Description"}
                  onClick={() => {
                    this.setState({newopen: true })
                  }}
                />
              </TableRowColumn>
            </TableRow>

          </TableBody>

        </Table>
        <RaisedButton
          label={
            !(this.state.newCheese.name &&
              this.state.newCheese.price &&
              this.state.newCheese.quantity &&
              this.state.newCheese.imageUrl &&
              this.state.newCheese.description) ? "New Cheese Needs More Info" : "Submit New Cheese"
          }
          disabled={
            !(this.state.newCheese.name &&
            this.state.newCheese.price &&
            this.state.newCheese.quantity &&
            this.state.newCheese.imageUrl &&
            this.state.newCheese.description)
            }
          onClick={this.handleSubmitNew}
        />
        <Dialog
          style={{ height: 400 }}
          title="Description"
          actions={newactions}
          modal={false}
          open={this.state.newopen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            fullWidth={true}
            multiLine={true}
            hintText={'Describe this glorious dairy'}
            value={(this.state.newCheese.description) ? this.state.newCheese.description:''}
            onChange={(e, val) => {
              this.setState({ newCheese: Object.assign({}, this.state.newCheese, { description: val }) })
            }}
          />
        </Dialog>
        <Dialog
          style={{ height: 70 }}
          title="Price"
          actions={newactions}
          modal={false}
          open={this.state.newopen2}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Slider
            min={0}
            max={7}
            defaultValue={(this.state.newCheese.price) ? Math.round(Math.log(3, this.state.newCheese.price), 2):3}
            value={Math.round(Math.log(3, this.state.newCheese.price), 2)}
            onChange={(e, val) => {
              this.setState({ newCheese: Object.assign({}, this.state.newCheese, { price: Math.round(Math.pow(3, val), 2) }) })
            }}
          />
          <p>
            <span>{(this.state.newCheese.price) ? `$${this.state.newCheese.price}` : `set a price`}</span>
          </p>
        </Dialog>


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
        <Dialog
          style={{ height: 70 }}
          title="Price"
          actions={actions}
          modal={false}
          open={this.state.open2}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Slider
            min={0}
            max={7}
            defaultValue={Math.round(Math.log(3, this.state.selectedCheese.price), 2)}
            value={Math.round(Math.log(3, this.state.selectedCheese.price),2)}
            onChange={(e, val) => {
              this.setState({ changes: Object.assign({}, this.state.changes, {price: Math.round(Math.pow(3,val),2)}) })
            }}
          />
          <p>
            <span>{(this.state.changes.price) ? `$${this.state.changes.price}` : `$${this.state.selectedCheese.price}`}</span>
          </p>
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
    },
    createCheese: (cheese) => {
      dispatch(AddCheese(cheese))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCheeses)
