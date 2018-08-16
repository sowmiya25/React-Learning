import React, {Component} from 'react';
import './Assets/css/reset.css';
import './Assets/css/index.css';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import CustomerDetails from './CustomerDetails/CustomerDetails';
import AddCustomerDetails from './AddCustomerDetails/AddCustomerDetails';
import SearchInput, {createFilter} from 'react-search-input';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const KEYS_TO_FILTERS = ['customerName','customerStatus']


class App extends Component{
	constructor(props){
		super(props);
		this.app = firebase.initializeApp(DB_CONFIG);
		this.database = this.app.database().ref().child('customers');

		this.addDetails = this.addDetails.bind(this);
		this.removeCustomer = this.removeCustomer.bind(this);
		this.updateCustomer = this.updateCustomer.bind(this);
		this.searchUpdated = this.searchUpdated.bind(this);
		this.sort = this.sort.bind(this);
		this.filterStatus = this.filterStatus.bind(this);
		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);

		this.state = {
			customers : [],
			searchTerm: '',
			showCustomerForm: false,
			isToggleOn: true
		}
	}
	componentWillMount(){
		/* Firebase functions*/
		const prevCustomers = this.state.customers;

		this.database.on('child_added', snap => {
			prevCustomers.push({
				customerReferenceId : snap.key,
				customerId : snap.val().customerId,
				customerName : snap.val().customerName,
				customerTitle : snap.val().customerTitle,
				customerCreationDate : snap.val().customerCreationDate,
				customerStatus : snap.val().customerStatus,
				customerContact : snap.val().customerContact,
				customerEmail : snap.val().customerEmail,
				customerAddress : snap.val().customerAddress
			})
			this.setState({
				customers : prevCustomers
			})
		})

		this.database.on('child_removed', snap => {
			for(var i=0; i<prevCustomers.length; i++){
				if(prevCustomers[i].customerReferenceId === snap.key){
					prevCustomers.splice(i,1);
				}
			}
			this.setState({
				customers : prevCustomers
			})
		})

		this.database.on('child_changed', snap => {
			for(var i=0; i<prevCustomers.length; i++){
				if(prevCustomers[i].customerReferenceId === snap.key){
					prevCustomers[i].customerName = snap.val().customerName;
					prevCustomers[i].customerId = snap.val().customerId;
					prevCustomers[i].customerReferenceId = snap.val().customerReferenceId;
					prevCustomers[i].customerTitle = snap.val().customerTitle;
					prevCustomers[i].customerCreationDate = snap.val().customerCreationDate;
					prevCustomers[i].customerStatus = snap.val().customerStatus;
					prevCustomers[i].customerContact = snap.val().customerContact;
					prevCustomers[i].customerEmail = snap.val().customerEmail;
					prevCustomers[i].customerAddress = snap.val().customerAddress;
				}
			}
			
			const clonePrevcustomers = prevCustomers.slice();
			this.setState({
				customers : clonePrevcustomers
			})
		})
	}
	/*Application methods*/
	handleClose() {
	    this.setState({ show: false });
	}

	handleShow() {
	    this.setState({ show: true });
	 }

	sort(){
		var sortedCustomers = this.state.customers;
		this.setState(function(prevState) {
			return {isToggleOn: !prevState.isToggleOn};
		});
		if(this.state.isToggleOn){
			this.state.customers.sort(function(a, b){
			    if(a.customerName < b.customerName) return -1;
			    if(a.customerName > b.customerName) return 1;
			    return 0;
			})
			sortedCustomers = this.state.customers;	
		}
		else{
			this.state.customers.sort(function(a, b){
			    if(a.customerName > b.customerName) return -1;
			    if(a.customerName < b.customerName) return 1;
			    return 0;
			})
			 sortedCustomers = this.state.customers;
		}
		this.setState({
				customers : sortedCustomers
			})
	}
	filterStatus(e){
		this.setState({searchTerm: e.target.value})
	}

	searchUpdated (term) {
	    this.setState({searchTerm: term})
	}

	addDetails(customer){
		this.database.push().set({
			customerId : customer.customerId, 
			customerName : customer.customerName,
			customerTitle : customer.customerTitle,
			customerCreationDate : customer.customerCreationDate.toString(),
			customerStatus : customer.customerStatus,
			customerContact : customer.customerContact,
			customerEmail : customer.customerEmail,
			customerAddress : customer.customerAddress
		})
	}
	removeCustomer(customerReferenceId){
		this.database.child(customerReferenceId).remove();
		//console.log(customerId);
	}
	updateCustomer(updatedCustomer){
		console.log(updatedCustomer);
		this.database.child(updatedCustomer.customerReferenceId).update({
			'customerId': updatedCustomer.customerId,
		    'customerName': updatedCustomer.customerName,
		    'customerTitle': updatedCustomer.customerTitle,
		    'customerStatus': updatedCustomer.customerStatus,
		    'customerContact': updatedCustomer.customerContact,
		    'customerEmail': updatedCustomer.customerEmail,
 			'customerAddress': updatedCustomer.customerAddress,
		});
	}
	render(){
		const filteredCustomers = this.state.customers.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		const { showCustomerForm } = this.state;
		return(
			<div>
			{/*Header*/}
				<header>
					<h1 className='headerTitle'>Propellerhead</h1>
					<div className='headerSubTitle'>
						<p className='pull-left'>Customer Details</p> 
						<div className='displayCell'>
						<Button bsStyle="info" 
								className='pull-right addCustomerBtn' 
								onClick={this.handleShow}>
								<span class="glyphicons glyphicons-user-add"></span> Add Customer</Button>
						</div>
					<div className='clear'></div>
					</div>
				</header>
			{/*Filter Component*/}	
				<div className='filterCustomerholder'>
					<label className='labelStyle1 pull-left'>Select Customers</label>
					<div className='col-sm-2 col-xs-6'>
						<select onChange = {this.filterStatus} 
							className='pull-left form-control'
			                value={this.state.value}>
			                 <option value=''>All</option>
							  <option value='Prospective'>Prospective</option>
							  <option value='Current'>Current</option>
							  <option value='Non-active'>Non-active</option>
						</select>
					</div>
					<Button bsStyle="warning" className='sortBtn pull-left' onClick={this.sort} > 
						<span className={this.state.isToggleOn ? 'glyphicon glyphicon-sort-by-alphabet' : 'glyphicon glyphicon-sort-by-alphabet-alt'} aria-hidden="true"></span>
					</Button>
					<div className='col-sm-5 col-xs-6 nopadding pull-right searchComponent'>
						<SearchInput className='search-input' onChange={this.searchUpdated}/>
					</div>
				</div>
			{/*Customer Details*/}
				<div className='customerDetailsHolder'>
				{filteredCustomers.map(customer => {
		          return (

				            <CustomerDetails customerId = {customer.customerId} 
									 customerName = {customer.customerName} 
									 customerReferenceId= {customer.customerReferenceId} 
									 key = {customer.customerReferenceId} 
								 	 customerTitle = {customer.customerTitle} 
									 customerCreationDate = {customer.customerCreationDate} 
									 customerStatus = {customer.customerStatus} 
									 customerContact = {customer.customerContact} 
									 customerEmail = {customer.customerEmail} 
									 customerAddress = {customer.customerAddress} 
									 removeCustomer = {this.removeCustomer} 
									 updateCustomer = {this.updateCustomer}
									 addDetails={this.addDetails}
							/>

		          )
		        })}
				</div>
				<div>
			        <Modal show={this.state.show} onHide={this.handleClose}>
			          <Modal.Header closeButton>
			            <Modal.Title>Customer Details</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
						<AddCustomerDetails addDetails={this.addDetails} useformfor ='customerDetails' removeCustomer = {this.removeCustomer} 
									 updateCustomer = {this.updateCustomer}/>
			          </Modal.Body>
			        </Modal>
			      </div>
			</div>
		)
	}
}
export default App
