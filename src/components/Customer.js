import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({ id, name, address }) => {
  return (
    <div>
      <h3>Customer </h3>
      <p> {id}, {name}, {address} </p>
    </div>

  )
}

export default Customer;