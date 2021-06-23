import {
  CContainer,
  CForm,
  CLabel,
  CInput,
  CFormText,
  CFormGroup,
  CRow,
  CCard,
  CCardBody,
  CButton,
  CAlert,
} from "@coreui/react";
import { useState } from "react";
import Auth from "src/Auth";

const LockAccount = ({ setIsAccountLocked }) => {
  // STATES
  const [inputPassword, setInputPassword] = useState("");
  const [alertText, setAlertText] = useState("");

  // METHODS
  const handleUnlock = async (e) => {
    e.preventDefault();
    try {
      const credentials = await Auth.getCredentials();
      if (inputPassword !== credentials.password) {
        throw new Error("Invalid password");
      } else {
        setIsAccountLocked(false);
      }
    } catch (err) {
      setAlertText(err.message);
    }
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCard>
            <CCardBody>
              <CForm onSubmit={(e) => e.preventDefault()}>
                <CFormGroup>
                  <CLabel htmlFor="inputPassword">Password</CLabel>
                  <CInput
                    type="password"
                    aria-describedby="inputPassword"
                    autoComplete="password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                  />
                  <CFormText>
                    Insert your password to unlock your account
                  </CFormText>
                </CFormGroup>
                {alertText !== "" && (
                  <CAlert color="danger">{alertText}</CAlert>
                )}
                <CButton color="success" onClick={handleUnlock}>
                  Unlock
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LockAccount;
