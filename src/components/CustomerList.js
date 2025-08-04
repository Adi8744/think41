import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../api';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers()
      .then((res) => {
        setCustomers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load customers');
        setLoading(false);
      });
  }, []);

  const filteredCustomers = customers.filter((c) =>
    (c.first_name + ' ' + c.last_name + c.email).toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Order Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.first_name} {cust.last_name}</td>
              <td>{cust.email}</td>
              <td>{cust.order_count || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
