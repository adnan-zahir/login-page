import React, { useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Auth from '../../../Auth.js'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [scndPassword, setScndPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alertText, setAlertText] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== scndPassword)
        throw new Error('Password doesn\'t match!');

      await Auth.register({ username, email, password });
    } catch (err) {
      setAlertText(err.message);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={scndPassword}
                      onChange={(e) => {
                        setScndPassword(e.target.value);
                      }}
                      required
                    />
                  </CInputGroup>
                  {alertText !== "" && (
                    <CAlert color="danger">{alertText}</CAlert>
                  )}
                  <CButton type="submit" color="success" block>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block>
                      <span>facebook</span>
                    </CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block>
                      <span>twitter</span>
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
