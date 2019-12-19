import React from 'react';
import PropTypes from 'prop-types';
import './Customer.css';
import { Card, Button } from 'react-bootstrap/';

const Customer = ({ id, name, address, city, state, postalCode, registered_at, phone, account_credit, movies_checked_out_count, selectCustomer }) => {
  return (
    <Card className="customer-card-container">
      <div className="customer-card">
        <div className="customer-name">
          <h3>{ name }</h3>
          <ul>
            <li>Account Credit: {account_credit} </li>
            <li>Movies Checked Out: {movies_checked_out_count} </li>
          </ul>
        </div>
        <div className="customer-info">
          <ul> 
            <li>Registration Date: {(registered_at).substring(0,10)} </li>
            <li>Phone: {phone} </li>
            <li>Address: {address}, {city}, {state} {postalCode} </li>
          </ul>
        </div>
        <div className="customer-select-button">
          <Button
            varient="flat"
            type="button"
            className="select-customer"
            onClick={() => selectCustomer(id)}>
              Select
          </Button>
        </div>  
      </div>
    </Card>
  )
}

Customer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  registeredAt: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  postalCode: PropTypes.string,
  phone: PropTypes.string,
  accountCredit: PropTypes.string,
  moviesCheckedOutCount: PropTypes.string,
};

export default Customer;