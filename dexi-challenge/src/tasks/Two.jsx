import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './../index.css'; // Import your CSS file
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ChallengeTwo() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiUrl = `https://randomuser.me/api/?seed=dexi-interview&page=${currentPage}&results=5`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        setUsers(prevUsers => [...prevUsers, ...data.results]);
        setCurrentPage(prevPage => prevPage + 1);
      })
      .catch(error => console.error("Error fetching data:", error));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(users[index].name.first + ' ' + users[index].name.last);
    setEditEmail(users[index].email);
    setEditPhone(users[index].phone);
    setShowModal(true);
  };

  const handleConfirmEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = {
      ...updatedUsers[editIndex],
      name: {
        first: editName.split(' ')[0],
        last: editName.split(' ')[1]
      },
      email: editEmail,
      phone: editPhone
    };

    setUsers(updatedUsers);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <div className="app">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name.first} {user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <button className="btn btn-primary" onClick={() => handleConfirmEdit()}>Confirm</button>
                  </>
                ) : (
                  <button className="btn btn-warning" onClick={() => handleEdit(index)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="editName">Name:</label>
          <input type="text" id="editName" value={editName} onChange={(e) => setEditName(e.target.value)} className="form-control" required />
          <label htmlFor="editEmail">Email:</label>
          <input type="email" id="editEmail" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="form-control" required />
          <label htmlFor="editPhone">Phone:</label>
          <input type="text" id="editPhone" value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className="form-control" required />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleConfirmEdit()}>Confirm Edit</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Close</Button>
        </Modal.Footer>
      </Modal>

      <button className="btn btn-info" onClick={() => fetchData()}>Load More</button>
    </div>
  );
}

export default ChallengeTwo;

