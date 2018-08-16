import React, {Component} from 'react'
import PropTypes from 'prop-types'
import avatar from './../Assets/images/avatar.png' 
import AddCustomerDetails from '../AddCustomerDetails/AddCustomerDetails';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {Popover} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';


class CustomerDetails extends Component{
	constructor(props){
		super(props)

		this.state = {
			customer : {
				customerReferenceId : props.customerReferenceId,
				customerId : props.customerId,
				customerName : props.customerName,
				customerTitle : props.customerTitle,
				customerCreationDate : props.customerCreationDate.substring(0, 25),
				customerStatus : props.customerStatus,
				customerContact : props.customerContact,
				customerEmail : props.customerEmail,
				customerAddress : props.customerAddress,
			},
			readOnly: true,
			isToggleOn: true,
			updateCustomer:props.updateCustomer,
			removeCustomer:props.removeCustomer,
			addDetails:props.addDetails,
			show:false,
		}
		
		//this.handleChange = this.handleChange.bind(this);

		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);

		
	}
	handleClose() {
	    this.setState({ show: false });
	  }

	  handleShow() {
	    this.setState({ show: true });
	  }
	render(props){
		const popoverBottom = (
		  <Popover id="popover-positioned-bottom" title="Notes">
		    {this.state.customer.customerTitle}
		  </Popover>
		);

		return(
			<div className='col-xs-12 col-sm-6 col-md-3'>
			    <div className={this.state.loading ? 'showfield' : 'hidefield'}>
			        <div id="app" className="loader"></div>
			    </div>
			    <div className='customerCard'>
			        <div className='displayCell text-center nopadding'>{<img src={avatar}/>}</div>
			        <div className='pull-left'>
			            <div><span className='text-bold'>ID</span> {this.state.customer.customerId}</div>
			            <div>{this.state.customer.customerName}</div>
			            <div className='fontstyle2'>{this.state.customer.customerCreationDate}</div>
			            <div className='fontstyle1'><span className="glyphicon glyphicon-earphone" aria-hidden="true"></span> {this.state.customer.customerContact}</div>
			            <div className='fontstyle1'><span className="glyphicon glyphicon-envelope" aria-hidden="true"></span> {this.state.customer.customerEmail}</div>
			        </div>
			        {/*pop customer details*/}
			        <div className='clear'>
			            <button onClick={this.handleShow} title='view details' className='pull-right viewInfo'><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
			            <OverlayTrigger trigger={[ 'hover', 'focus']} placement="bottom" overlay={popoverBottom}>
			                <button className='pull-right viewNotes'><span className="glyphicon glyphicon-tags" aria-hidden="true"></span></button>
			            </OverlayTrigger>
			        </div>
			        <Modal show={this.state.show} onHide={this.handleClose}>
			            <Modal.Header closeButton>
			                <Modal.Title>Customer Details</Modal.Title>
			            </Modal.Header>
			            <Modal.Body>
			                <div className="CustomerDetails">
			                    <AddCustomerDetails customerDetails={ this.state.customer} useformfor='showCustomerDetails' removeCustomer={ this.state.removeCustomer} updateCustomer={ this.state.updateCustomer} addDetails={this.state.addDetails}/>
			                </div>
			            </Modal.Body>
			        </Modal>
			    </div>
			</div>
		)
	}
}
CustomerDetails.propTypes = {
	customerId : PropTypes.string,
	customerName : PropTypes.string,
	customerTitle : PropTypes.string,
	customerCreationDate : PropTypes.string,
	customerStatus : PropTypes.string,
	customerContact : PropTypes.string,
	customerEmail : PropTypes.string,
	customerAddress : PropTypes.string
}
export default CustomerDetails