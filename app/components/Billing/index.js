import React from 'react';
import { BillingWrapper } from './css'
import { Menu, Dropdown, Select, Table, Pagination, Modal, Button } from 'antd';
import { DatePicker, DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import moment from 'moment';
import { dataSource } from './mockData';
import ActionsOnTable from './ActionsOnTable'
import Calendar from 'assets/calendar.png';

const { Option } = Select;

const columns = [
	{
    title: '',
    key: 'action',
    width: 30,
    className: 'table-action',
    render: () => (
      <ActionsOnTable />
    ),
  },
  {
    title: 'Billing Date',
    dataIndex: 'billing_date',
    key: 'billing_date',
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number',
    key: 'invoice_number',
  },
  {
    title: 'Transaction Type',
    dataIndex: 'transaction_type',
    key: 'transaction_type',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Paid by',
    dataIndex: 'paid_by',
    key: 'paid_by',
  },
];

class Billing extends React.PureComponent {

	constructor(props){
		super(props);

		this.state = {
			from_date: null,
			to_date: null,
			clicked: null,
			visible: false,
			selectedRowKeys: [],
			showModal: false
		}
	}

	onChange = (date) => {
		let new_date = moment(date).format('L');
		if(this.state.clicked == 'to'){
			this.setState({
				to_date: new_date,
				visible: false
			})
		}
		else {
			this.setState({
				from_date: new_date,
				visible: false
			})
		}

	}

	changeClicked(field){
		this.setState({
			clicked: field,
			visible: true
		})
	}

	action = (type) => {

	}

	onSelectChange = (record, selected, selectedRows, nativeEvent) => {
		let arr = [];
		for(var x in selectedRows){
			arr.push(selectedRows[x].key)
		}
		this.setState({
			selectedRowKeys: arr
		})
	}

	onSelectAllRows = (selected, selectedRows, changeRows) => {
		let arr = [];
		for(var x in selectedRows){
			arr.push(selectedRows[x].key)
		}
		this.setState({
			selectedRowKeys: arr
		})
	}

	toggleModal = () => {
		this.setState({
			showModal: !this.state.showModal
		})
	}

	handleOk = () => {
		this.setState({
			showModal: false
		})
	}
	
	render(){
		let { visible, clicked, selectedRowKeys } = this.state;

		const menu = (
		  <Menu>
		    <Menu.Item>
		      <DatePicker onChange={this.onChange} />
		    </Menu.Item>
		  </Menu>
		)

    let rowSelection = {
      selectedRowKeys,
      fixed: false,
      hideDefaultSelections: true,
      onSelect: this.onSelectChange,
      onSelectAll: this.onSelectAllRows,
      selections: [
	      {
	        key: 'view',
	        text: 'View',
	        onSelect: this.action.bind(this, 'view'),
	      },
	      {
	        key: 'download',
	        text: 'Download',
	        onSelect: this.action.bind(this, 'download')
	      }
	    ],
    };

		return (
			<BillingWrapper>
				<Modal
          title="Purchase contact volume"
          visible={this.state.showModal}
          onCancel={this.toggleModal}
          className='upgrade-modal'
          footer={[
            <button onClick={this.toggleModal}>
              Cancel
            </button>,
            <button onClick={this.handleOk} className='manage'>
              Manage plans
            </button>,
          ]}
        >
          Upgrade to 'Professional' subscription plan to increase your contact volume.
        </Modal>

				<div className='banner'>
					Billing
					<button>
						<i className='material-icons'>
							clear
						</i>
						Close
					</button>
				</div>
				<div className='mid'>
					<div className='inner'>
						<div className='indiv'>
							<label>Users</label>
							<label>1 / 1 </label>
							<button>Add Users</button>

						</div>

						<div className='indiv'>
							<label>Next Billing</label>
							<img src={Calendar} />
							<label className='num'>28</label>
							<label className='days'>Days</label>
						</div>

						<div className='indiv'>
							<label>Current plan</label>
							<div className='plan'>
								<label>Starter</label>
								<label>Billed Monthly</label>
							</div>
							<button>Manage Plan</button>
						</div>

						<div className='indiv'>
							<label>Contact volume</label>
							<label>2,000</label>
							<button onClick={this.toggleModal}>Increase Contact Volume</button>
						</div>
					</div>
				</div>
				<div className='invoices'>
					<label>Invoices</label>
					<div className='wrapper'>
						<div className='filter'>
							<button className='from'>From</button>
							<Dropdown
								overlay={menu}
								overlayClassName='dd-calendar'
								visible={visible&&clicked=='from' ? true : false}
								onClick={this.changeClicked.bind(this, 'from')}
							>
						    <input type='text'  value={this.state.from_date}/>
						  </Dropdown>
							
							<button>To</button>
							<Dropdown
								overlay={menu}
								overlayClassName='dd-calendar'
								visible={visible&&clicked=='to' ? true : false}
								onClick={this.changeClicked.bind(this, 'to')}
							>
						    <input type='text' value={this.state.to_date}/>
						  </Dropdown>
							<button className='apply'>Apply</button>
						</div>
						<div className='type'>
							<div className='t-type'>Transaction type</div>
							<Select defaultValue="sub" style={{ width: 160 }}>
	      				<Option value="sub">Subscription plan</Option>
	      			</Select>
						</div>
					</div>
				</div>
				<div className='table'>
					<Table
						className='table-billing'
						dataSource={dataSource}
						columns={columns}
						rowSelection={rowSelection}
						pagination={false}
					/>
					<div className='pagination'>
	          <Pagination
	            size={'large'}
	          />
	          <Select defaultValue={"5"}>
	            <Option value="5">5</Option>
	            <Option value="10">10</Option>
	            <Option value="20">20</Option>
	            <Option value="30">30</Option>
	            <Option value="40">40</Option>
	            <Option value="50">50</Option>
	            <Option value="60">60</Option>
	            <Option value="70">70</Option>
	            <Option value="80">80</Option>
	            <Option value="90">90</Option>
	            <Option value="100">100</Option>
	          </Select>
	        </div>
				</div>
				
			</BillingWrapper>
		)
	}
}

export default Billing;