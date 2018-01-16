import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux'
import store from '../../store'
import { UpdateAUser, DeleteUser, GetUsers} from '../../store/users'
import { NavLink } from 'react-router-dom'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';



class UserTable extends Component {

  constructor(props) {
    super(props)
    this.state={
      open: false,
      selectedUser: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentWillMount(){
    if(this.props.user.isAdmin) this.props.loadUsers()
  }

  handleChange(e,id,adminStatus){
    console.log('change handler',e,id,adminStatus)
    e.preventDefault()
    this.props.AppointDemote(id,adminStatus)
  }

  handleClose(){
    this.setState({open:false, selectedUser:null})
  }

  handleDelete() {
    this.props.Remove(this.state.selectedUser)
    this.setState({ open: false, selectedUser:null})
  }

  render() {

    let actions = [
    <FlatButton
      label="Delete"
      primary={true}
      onClick={this.handleDelete}
    />,
    <FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleClose}
    />]

    if (this.props.user.isAdmin) return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Admin</TableHeaderColumn>
              <TableHeaderColumn>Delete</TableHeaderColumn>
              <TableHeaderColumn>Reset Password</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.users.map((user,i) => {
                return (
                  <TableRow key={i}>
                    <TableRowColumn>
                      {user.id}
                    </TableRowColumn>
                    <TableRowColumn>
                      {user.name}
                    </TableRowColumn>
                    <TableRowColumn>
                      {user.email}
                    </TableRowColumn>
                    <TableRowColumn>
                      <DropDownMenu
                        value={(user.isAdmin)?1:0}
                        onChange={(e,v,i)=>{
                          e.preventDefault()
                          this.handleChange(e,user.id,v)
                        }}
                        >
                        <MenuItem value={0} primaryText="False" />
                        <MenuItem value={1} primaryText="True" />
                      </DropDownMenu>
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label={'bannish'}
                        onClick={() => this.setState({ open: true,selectedUser:user.id })}
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <RaisedButton
                        label={'reset'}
                      />
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Dialog
          title="Are you sure?"
          actions={actions}
          modal={true}
          open={this.state.open}>
          Bannishing a user means they will lose their cart, and plenty of happiness
        </Dialog>
      </div>
    )
    else return <div></div>
  }
}

function mapStateToProps(storeState) {
  return {
    users: storeState.members,
    user: storeState.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadUsers:()=>{
      dispatch(GetUsers())
    },
    AppointDemote:(id,val)=>{
      dispatch(UpdateAUser(id,{isAdmin:val===1}))
    },
    Remove: (id) => {
      dispatch(DeleteUser(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable)

