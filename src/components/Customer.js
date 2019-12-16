import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({ id, name, address, city, state, postalCode, registered_at, phone, account_credit, movies_checked_out_count, selectCustomer }) => {
  return (
    <div>
      <h3>{name}</h3>
      <ul> 
        <li>Registration Date: {registered_at} </li>
        <li>Phone: {phone} </li>
        <li>Address: {address}, {city}, {state} {postalCode} </li>
        <li>Account Credit: {account_credit} </li>
        <li>Movies Checked Out: {movies_checked_out_count} </li>
      </ul>

      <button
        type="button"
        className="select_customer"
        onClick={() => selectCustomer(id)}>
          Select
      </button>
    </div>

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