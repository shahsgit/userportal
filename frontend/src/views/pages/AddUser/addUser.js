import React, { useState } from 'react';
import { useAddUserMutation } from '../../../../redux/api/userApiSlice';
import {
    CContainer,
    CRow,
    CCol,
    CCardGroup,
    CCard,
    CCardBody,
    CForm,
    CInputGroup,
    CInputGroupText,
    CFormInput,
    CButton
  } from '@coreui/react';
  import CIcon from '@coreui/icons-react';
  import { cilUser, cilLockLocked } from '@coreui/icons'

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [addUser] = useAddUserMutation();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { username, password, email, isAdmin };
      await addUser(newUser).unwrap();
      alert('User added successfully!');
      setUsername('');
      setPassword('');
      setEmail('');
      setIsAdmin(false);
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleAddUser}>
                    <p className="text-body-secondary">Add Other Users</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required  />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                      type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required
                      />
                      </CInputGroup>
                      <label style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
  Admin:
  <input
    type="checkbox"
    checked={isAdmin}
    onChange={(e) => setIsAdmin(e.target.checked)}
    style={{ marginLeft: '0.5rem' }}
  />
</label>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit">Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default AddUser;
