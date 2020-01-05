/**
 *
 * ContactTable
 *
 */

import React, { PropTypes } from 'react';
import { message, Table } from 'antd';
import { toLocaleValue } from 'utils/helper';
import styled from 'styled-components';
import _ from 'underscore';

import { TableWrapper, SelectionWrapper } from './css';

export const StyledTableWrapper = styled(TableWrapper)`
  
  .deliver{
    font-size:12px;
    top:2px !important;
    left:0px !important;
    position: relative !important;
  }

  
`;



class ContactTable extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };


  constructor(props){
    super(props);

    this.state = {
      selection: 10,
      selectedAll: false,
      selected: null,
      num_contacts: null
    }
  }

  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  onChangeRoute = (route) => {
    const {
      searchParams,
      category,
      keywords,
      activeSpecialFilter,
    } = this.props;
    const { router } = this.context;
    router.push({
      pathname: router.location.pathname,
      state: { searchParams, category, keywords, activeSpecialFilter },
    });
    router.push({
      pathname: route,
    });
  };

  handleAddition = (tag) => {
    if (!tag) {
      return;
    }
    const tagType = tag.type || 'and_keywords';
    let selectedKeyword = {
      category: this.props.category,
      filters: tagType,
      name: tag.name,
      mode: '',
    };

    // Case when no suggestion is selected
    if (tagType === 'and_keywords') {
      selectedKeyword = {
        type: 'Keyword',
        ...selectedKeyword,
      };
    }

    // if (tagType === 'department') {
    //   selectedKeyword = {
    //     type: 'Contact',
    //     id: tag.leadbook_id,
    //     ...selectedKeyword,
    //     mode: 'Contact',
    //   };
    // }

    if (tagType === 'employee_size') {
      selectedKeyword = {
        type: 'Employee Size',
        code: tag.value.code,
        id: Object.values(tag.value)[0],
        ...selectedKeyword,
      };
    }

    // Case when job_title suggestion is selected
    if (tagType === 'job_title') {
      selectedKeyword = {
        type: 'JOB',
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when location suggestion is selected
    if (tagType === 'location') {
      selectedKeyword.filters = 'locations';
      selectedKeyword = {
        type: 'Location',
        code: tag.value,
        id: Object.values(tag.value)[0].toString(),
        ...selectedKeyword,
      };
    }

    // Case when industry suggestion is selected
    if (tagType === 'industry') {
      selectedKeyword = {
        type: 'Industry',
        industry_code: tag.value,
        id: Object.values(tag.value)[0],
        ...selectedKeyword,
      };
    }

    if (tagType === 'technologies') {
      selectedKeyword = {
        type: 'Technologies',
        code: tag.value,
        id: `primary-${Object.values(tag.value)[0]}`,
        ...selectedKeyword,
      };
    }

    // Case when company name suggestion is selected
    if (tagType === 'company_name') {
      selectedKeyword = {
        type: 'Company',
        id: tag.leadbook_id,
        ...selectedKeyword,
      };
    }

    // Case when contact name suggestion is selected
    if (tagType === 'contact_name') {
      selectedKeyword = {
        type: 'Contact',
        id: tag.leadbook_id,
        ...selectedKeyword,
        mode: 'Contact',
      };
    }

    // Case when tag suggestion is selected
    if (tagType === 'tag') {
      selectedKeyword = {
        type: 'Tag',
        ...selectedKeyword,
      };
    }
    this.props.addKeyword(selectedKeyword);
  };

  updateDimensions = () => {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const height =
      w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ height });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { updateSearchParams } = this.props;

    if (!Object.prototype.hasOwnProperty.call(sorter, 'order')) {
      updateSearchParams('order_by', '');
      return;
    }

    const { order } = sorter;
    const { sortKey } = sorter.column;

    if (order === 'descend') {
      updateSearchParams('order_by', `-${sortKey}`);
      return;
    }
    updateSearchParams('order_by', sortKey);
  };

  rowClassName = (contact) => contact.status === 'expired' && 'expired-row';

  selectionChange = (e) => {
    this.setState({
      selection: e.target.value
    })
  }

  onSelectAllRows = (selected, selectedRows, changeRows) => {
    if(!selected ){
      this.setState({
        selectedAll: false,
        showOptions: false
      })

      this.props.updateSelectedRows([], [])
    }

    else {
      this.setState({
        selectedAll: true,
        showOptions: !this.state.showOptions
      })
    }
    
  }

  onSelectChange = (record, selected, selectedRows, nativeEvent) => {
    if (selectedRows.length) {
      message.info(
        `Selected ${selectedRows.length} lead${
          selectedRows.length > 1 ? 's' : ''
        }`,
        1.5
      );
    }
    let list = this.props.list;
    let arr = []
    for(var x in selectedRows){
      arr.push(_.findIndex(list, selectedRows[x]))
    }
    this.props.selectAllLeadFunc(false);
    this.props.updateSelectedRows(arr, selectedRows);
  };


  handleSelection(field, e){
    if(field == 'page' || field == 'all' || field == 'contacts') {
      this.setState({
        selected: field
      });
    }

    if(field == 'num_contacts'){
      this.setState({
        num_contacts: e.target.value
      })
    }

  }

  applySelection = () => {
    this.setState({
      showOptions: false
    })

    let {
      searchParams,
      list,
      category,
      total,
      selectAllLeadFunc
    } = this.props;

    let {
      selected,
      num_contacts
    } = this.state;

    let arr = [];
    let selectedRows = [];
    let limit = searchParams.limit;

    switch(selected){
      case 'page':
        
        for(let i=0; i<limit; i++){
          arr.push(i)
          selectedRows.push(list[i])
        }
        this.props.selectAllLeadFunc(false);
        this.props.updateSelectedRows(arr, selectedRows);

        message.info(`Selected All ${arr.length} ${category}s`, 2);
        break;

      case 'all':
        for(let i=0; i<limit; i++){
          arr.push(i)
        }
        this.props.updateSelectedRows(arr, list);
        message.info(`Selected All ${total} ${category}s`, 2);
        this.props.selectAllLeadFunc(true);
        break;

      case 'contacts':
        for(let i=0; i<num_contacts; i++){
          arr.push(i)
          selectedRows.push(list[i])
        }
        this.props.selectAllLeadFunc(false);
        this.props.updateSelectedRows(arr, selectedRows);
        message.info(`Selected All ${arr.length} ${category}s`, 2);
        break;
    }
  }

  onSelectAllInvert = () => {
    this.props.updateSelectedRows([], []);
  }

  addTo(field, e) {
    let { selectedRows, category, selectAllLeads } = this.props;

    if(selectAllLeads) {
      message.info(`Adding all contacts to ${field}`, 2);
      console.log('Adding all contacts')
    }
    else {
      let arr = []
      for(var x in selectedRows){
        arr.push(this.props.selectedRows[x].leadbook_id)
      }
      message.info(`Adding ${arr.length} contacts to ${field}`, 2);
      console.log(arr)
    }
    
  }

  render() {
    let {
      list,
      loading,
      category,
      selectedRowKeys,
      tableColumns,
      total,
      selectAllLeadFunc,
      selectAllLeads,
      keywords,
    } = this.props;

    let selections = [];
    if(category == 'Contact') {
      selections = [
        {
          key: 'add',
          text: 'Add to Contacts',
          onSelect: this.addTo.bind(this, 'Contacts'),
        },
        {
          key: 'segments',
          text: 'Add to Segments',
          onSelect: this.addTo.bind(this, 'Segments')
        }
      ]
    }
    else {
      selections = [
        {
          key: 'view',
          text: 'View Contacts',
          onSelect: null,
        }
      ]
    }

    let rowSelection = {
      selectedRowKeys,
      fixed: false,
      hideDefaultSelections: true,
      onSelectAll: this.onSelectAllRows,
      onSelect: this.onSelectChange,
      onSelectInvert: this.onSelectAllInvert,
      selections: selections,
    };
    const cols = tableColumns(this.props, this.onChangeRoute);
    const width = cols.reduce((accu, col) => accu + col.width, 50);

    let { selected } = this.state;

    return (
      <StyledTableWrapper>
        {
          this.state.showOptions && (
            <SelectionWrapper>
              <label style={{color:'rgba(66,66,66,0.5)'}}>Selection</label>
              <div>
                <input
                  type='radio'
                  className='radio'
                  name='radio'
                  onClick={this.handleSelection.bind(this,'page')}
                  checked={selected=='page'? true:false}
                />
                <label>Select Page</label>
              </div>
              <div>
                <input
                  type='radio'
                  className='radio'
                  name='radio'
                  onClick={this.handleSelection.bind(this,'all')}
                  checked={selected=='all'? true:false}
                />
                <label>Select all</label>
              </div>
              <div>
                <input
                  type='radio'
                  className='radio'
                  name='radio'
                  onClick={this.handleSelection.bind(this,'contacts')}
                  checked={selected=='contacts'? true:false}
                />
                <label>Select</label>
                <input 
                  type='text'
                  className='text'
                  onChange={this.handleSelection.bind(this,'num_contacts')}
                  value={this.state.num_contacts}
                />
                <label>{category}s</label>
              </div>
              <div>
                <button onClick={this.applySelection}>Apply</button>
              </div>
            </SelectionWrapper>
          )
        }
        
        <Table
          className='table-contact'
          bordered
          loading={loading}
          rowSelection={rowSelection}
          rowClassName={this.rowClassName}
          columns={tableColumns(
            this.props,
            this.onChangeRoute,
            this.handleAddition
          )}
          dataSource={list}
          pagination={false}
          scroll={{
            x: width,
            y: this.state.height - (keywords.length > 5 ? 255 : 235),
          }}
          onChange={this.handleTableChange}
          locale={{
            emptyText: `No ${category.toLowerCase()}s found.`,
            filterConfirm: 'Ok',
            filterReset: 'Cancel',
            filterTitle: 'Options',
          }}
        />
      </StyledTableWrapper>
    );
  }
}

ContactTable.propTypes = {
  activeSpecialFilter: PropTypes.string,
  updateSearchParams: PropTypes.func,
  updateSelectedRows: PropTypes.func,
  tableColumns: PropTypes.func,
  addKeyword: PropTypes.func,
  list: PropTypes.array,
  selectedRowKeys: PropTypes.array,
  keywords: PropTypes.array,
  loading: PropTypes.bool,
  category: PropTypes.string,
  searchParams: PropTypes.object,
  total: PropTypes.number,
  selectAllLeadFunc: PropTypes.func,
  selectAllLeads: React.PropTypes.oneOfType([
    React.PropTypes.func,
    React.PropTypes.bool,
  ]),
  handleShowListDropDown: PropTypes.func,
  selectedRows: PropTypes.array,
};

export default ContactTable;
