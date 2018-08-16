import React, {Component} from 'react';
import DateTimePicker from 'react-datetime-picker';
//import { Button } from 'react-bootstrap';

import {FormGroup, ControlLabel, FormControl, HelpBlock, Col, Label} from 'react-bootstrap'
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from 'validator';
var opts = {};
class AddCustomerDetails extends Component{

	constructor(props){
		super(props);
		if(props.useformfor == 'showCustomerDetails'){
			this.state = {
				customerReferenceId : props.customerDetails.customerReferenceId,
				customerId : props.customerDetails.customerId,
				customerName : props.customerDetails.customerName,
				customerTitle : props.customerDetails.customerTitle,
				customerCreationDate : new Date(),
				customerStatus : props.customerDetails.customerStatus,
				customerContact : props.customerDetails.customerContact,
				customerEmail : props.customerDetails.customerEmail,
				customerAddress : props.customerDetails.customerAddress,
		        readOnly: true,
			    isToggleOn: true,
			    addCustomerComponent : true,
			    setreadonly :true
			}

		} else if(props.useformfor == 'customerDetails'){
			this.state = {
				customerReferenceId : '',
				customerId : '',
				customerName : '',
				customerTitle : '',
				customerCreationDate : new Date(),
				customerStatus : 'Prospective',
				customerContact : '',
				customerEmail : '',
				customerAddress : '',
	        	readOnly: false,
				isToggleOn: true,
				addCustomerComponent : false,
				setreadonly :false
			}
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.writeCustomerDetails = this.writeCustomerDetails.bind(this);
		this.handleRemoveCustomer = this.handleRemoveCustomer.bind(this);
		this.handleUpdateCustomer = this.handleUpdateCustomer.bind(this);
		this.editAction = this.editAction.bind(this);
	}

	handleChange(propertyName,e) {
	    this.setState({
	      [propertyName] : e.target.value
	    });
	}
	handleRemoveCustomer(customerReferenceId){
		this.props.removeCustomer(customerReferenceId);
	}
	handleUpdateCustomer(updatedCustomer,e){
		this.props.updateCustomer(updatedCustomer);
	}
	writeCustomerDetails(e){
		this.props.addDetails(this.state);
		/*console.log(e)*/
		/*this.setState ({
			customerId : '',
			customerName : '',
			customerTitle : '',
			customerCreationDate : new Date(),
			customerStatus : 'Prospective',
			customerContact : '',
			customerEmail : '',
			customerAddress : ''
		})*/
	}
	editAction(){
		opts['readOnly'] = '';

		this.setState({
	      setreadonly : false
	    });
	}
	render(){
		
		const required = (value) => {
		  if (!value.toString().trim().length) {
		    // We can return string or jsx as the 'error' prop for the validated Component
		    return <Label bsStyle="danger">Required</Label>;
		  }
		};

		const email = (value) => {
		  if (!validator.isEmail(value)) {
		    return <Label bsStyle="warning">${value} is not a valid email.</Label>
		  }
		};
		const numeric = (value) => {
		  var pattern = /^\d+$/;
		  if (!pattern.test(value)) {
		    return <Label bsStyle="warning">Enter only numbers</Label>
		  }
		};
		const alpha = (value) => {
		  var pattern = /^[a-zA-Z ]{2,30}$/;
		  if (!pattern.test(value)) {
		    return <Label bsStyle="warning">Enter valid username</Label>
		  }
		};
		if(this.state.setreadonly){
			opts['readOnly'] = 'readOnly';
		}
		else{
			opts['readOnly'] = ''	
		}
		return(
			<div>
				<Form className="form-horizontal" horizontal='true'>
					<FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Customer ID
				    </Col>
				    <Col sm={8}>
				      <Input type='text' 
				      			   validations={[required,numeric]}
								   placeholder='Customer Id' 
								   className='form-control'
								   value={this.state.customerId} 
								   onInput={this.handleChange.bind(this, 'customerId')}
								   {...opts}  />
				    </Col>
				  </FormGroup>
				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Name
				    </Col>
				    <Col sm={8}>
				      <Input type='text' 
								   placeholder='FirstName LastName' 
								   validations={[required,alpha]}
								   className='form-control'
								   value={this.state.customerName} 
								   onInput={this.handleChange.bind(this, 'customerName')} 
								   {...opts}/>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small"  className = {this.state.addCustomerComponent? 'hidefield' : 'showfield'}>
				    <Col componentClass={ControlLabel} sm={4}>
				      Creation Date
				    </Col>
				    <Col sm={8}>
					<div>
				      <DateTimePicker
				          	   onChange = {customerCreationDate => this.setState({ customerCreationDate })}
				               value={this.state.customerCreationDate} 
				              
				        />	
				    </div>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Customer Status
				    </Col>
				    <Col sm={8}>
			    	  <FormControl componentClass="select"
			    	  			   value={this.state.value}value={this.state.customerStatus} 
								   onInput={this.handleChange.bind(this, 'customerStatus')} 
			    	  			   className='form-control' {...opts} >
					        		  <option value='Prospective'>Prospective</option>
									  <option value='Current'>Current</option>
									  <option value='Non-active'>Non-active</option>
				      </FormControl>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Customer Mobile
				    </Col>
				    <Col sm={8}>
				      <Input type='text' 
								   placeholder='Phone' 
								   validations={[required,numeric]}
							       className='form-control'
							       value={this.state.customerContact} 
							       onChange={this.handleChange.bind(this, 'customerContact')}
							       {...opts}/>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Customer Email
				    </Col>
				    <Col sm={8}>
				      <Input type='text' 
								   placeholder='example@domain.com' 
								   validations={[required,email]}
							       className='form-control'
							       value={this.state.customerEmail} 
							       onChange={this.handleChange.bind(this, 'customerEmail')}
							       {...opts}/>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Contact Address
				    </Col>
				    <Col sm={8}>
				      <FormControl componentClass="textarea" 
								   value={this.state.customerAddress} 
								   className='form-control'
								   onChange={this.handleChange.bind(this, 'customerAddress')}
								   {...opts}/>
				    </Col>
				  </FormGroup>

				  <FormGroup bsSize="small">
				    <Col componentClass={ControlLabel} sm={4}>
				      Notes
				    </Col>
				    <Col sm={8}>
				      <FormControl componentClass="textarea" 
							       className='form-control' 
							       value={this.state.customerTitle} 
							       onChange={this.handleChange.bind(this, 'customerTitle')}
							       {...opts}/>
				    </Col>
				  </FormGroup>
					<div className='text-center' className={this.state.addCustomerComponent ? 'hidefield text-center' : 'showfield text-center'}>
					    <Button className='btn btn-info' onClick={this.writeCustomerDetails}> + Add Customer</Button>
					</div>

					<div className={this.state.addCustomerComponent ? 'showfield' : 'hidefield'}>
					    <div className='col-xs-6 nopadding'>
					        <button className='pull-right btn btn-info' onClick={()=> this.handleRemoveCustomer(this.state.customerReferenceId)}> Delete </button>
					    </div>

					    <div className={ this.state.setreadonly? 'showfield col-xs-6' : 'hidefield col-xs-6'}>
					        <div className="btn btn-success" onClick={this.editAction}> Edit </div>
					    </div>
					    <div className={ this.state.setreadonly? 'hidefield col-xs-6' : 'showfield col-xs-6' }>
					        <button className="btn btn-success" onClick={()=> this.handleUpdateCustomer(this.state)}> Update </button>
					    </div>
					    <div className='clear'></div>
					</div>
				  </Form>
			</div>
		)
	}
}

export default AddCustomerDetails