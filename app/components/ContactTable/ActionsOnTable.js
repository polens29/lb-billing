/**
 *
 * ActionsOnTable
 *
 */

import React, { PropTypes } from 'react';
import { Dropdown, message } from 'antd';
import Menu, { MenuItem, MenuItemGroup } from 'rc-menu';
import ListBlue from 'assets/icons/list-blue.png';
import _ from 'underscore';

class ActionsOnTable extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };

  constructor(props){
    super(props);

    this.state = {
      ddOpened: false
    }
  }

  openLists(){
    if(this.props.obj.lists.length != 0){
      this.setState({
        ddOpened: !this.state.ddOpened
      })
    }
  }

  onHoverList(index, e){
    let elements = document.getElementsByClassName(index);
    for(var i=0, len=elements.length; i<len; i++)
    {
        elements[i].style.display = 'inline-flex';
    }
  }

  onMouseLeaveList(index, e){
    let elements = document.getElementsByClassName(index);
    for(var i=0, len=elements.length; i<len; i++)
    {
        elements[i].style.display = 'none';
    }
  }

  removeFromList(list, e){
    this.props.removeFromlbLists(
      [this.props.obj],
      this.props.category,
      [list],
      this.props.searchParams,
      this.props.selectAllLeads,
      this.props.total
    );
  }

  checkIfFavorite(list, index){
    if(list.name != 'favorite') {
      return (
        <div
          onMouseOver={this.onHoverList.bind(this, index)}
          onMouseLeave={this.onMouseLeaveList.bind(this, index)}
          onClick={this.removeFromList.bind(this, list)}
        >
          {list.name} <label className={index} style={{"display": "none"}}>x</label>
        </div>
      )
    }

    return null
  }

  addTo(field, e){
    message.info(`Adding 1 contact to ${field}`, 2);
    console.log(this.props.obj.leadbook_id)
  }

  render() {
    let obj = this.props.obj;

    let menu = (
      <Menu>
        <MenuItem>
          {
            this.props.category == 'Contact' ?
            <div className="listDD">
              <label>Actions</label>
              <div onClick={this.addTo.bind(this, 'Contacts')}>
                <i className='material-icons'>
                  person_add
                </i>
                Add to Contacts
              </div>
              <div onClick={this.addTo.bind(this, 'Segments')}>
                <i className='material-icons'>
                  playlist_add
                </i>
                Add to Segments
              </div>
            </div>
            :
            <div className="listDD">
              <label>Actions</label>
              <div>
                <i className='material-icons'>
                  remove_red_eye
                </i>
                View contacts
              </div>
            </div>
          }
        </MenuItem>
      </Menu>
    );


    return (
      <div>
        <Dropdown
          overlay={menu}
          placement="bottomLeft"
          trigger={['click']}
        >
          <div>
            <i className='material-icons'>
              keyboard_arrow_down
            </i>
          </div>
        </Dropdown>
      </div>
    );

    
  }
}

ActionsOnTable.propTypes = {
};

export default ActionsOnTable;
