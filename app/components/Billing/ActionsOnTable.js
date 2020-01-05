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

  render() {

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
                View
              </div>
              <div>
                <i className='material-icons'>
                  cloud_download
                </i>
                Download
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
