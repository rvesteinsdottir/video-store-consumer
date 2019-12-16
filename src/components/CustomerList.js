import React from 'react';
import PropTypes from 'prop-types';
import Customer from './Customer';

const CustomerList = ({ customerList }) => {
  const buildCustomers = () => {
    const customerElements = customerList.map((customer) => {
      return <Customer 
        key={customer.id}
        { ...customer }
      />
    });

    return customerElements;
  }

  return (
    <div>
      <h3>CustomerList</h3>
      {buildCustomers()}
    </div>
  )
}

export default CustomerList;