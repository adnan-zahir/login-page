import { useState, useEffect } from "react";
import { CRow, CCol, CCard, CCardHeader, CCardBody, CImg, CCardText, CCardTitle, CCollapse, CForm, CFormGroup, CInput, CLabel, CTextarea, CAlert, CButton } from "@coreui/react";
import Auth from '../../Auth';
import CIcon from "@coreui/icons-react";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    email: '',
    token: '',
    mobile_no: '',
    full_name: '',
    address: '',
    city: '',
  });
  const [alertText, setAlertText] = useState({ message: '', color: 'danger' });

  const [inputMobileNo, setInputMobileNo] = useState('');
  const [inputFullName, setInputFullName] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputRePassword, setInputRePassword] = useState('');
  const [inputBio, setInputBio] = useState('');

  const showAlert = (text, color = 'danger') => {
    setAlertText({ message: text, color });
    const alertTimeout = setTimeout(() => {
      setAlertText({ message: '', color});
      clearTimeout(alertTimeout);
    }, 10000);
  }

  const handleChange = (e) => {
    const { name: stateName, value } = e.target;
    switch (stateName.toUpperCase()) {
      case 'INPUTMOBILENO':
        setInputMobileNo(value);
        break;
      case 'INPUTFULLNAME':
        setInputFullName(value);
        break;
      case 'INPUTADDRESS':
        setInputAddress(value);
        break;
      case 'INPUTCITY':
        setInputCity(value);
        break;
      case 'INPUTPASSWORD':
        setInputPassword(value);
        break;
      case 'INPUTREPASSWORD':
        setInputRePassword(value);
        break;
      case 'INPUTBIO':
        setInputBio(value);
        break;
      default:
        return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputPassword !== inputRePassword) {
      showAlert('Password doesn\'t match');
      return;
    }
    const dataToSubmit = {
      mobile_no: inputMobileNo,
      full_name: inputFullName,
      address: inputAddress,
      city: inputCity,
      password: inputPassword,
      bio: inputBio,
    }

    try {
      const credentials = await Auth.updateProfile(dataToSubmit);
      setUserInfo(credentials);
      showAlert('Success!', 'success');
    } catch (err) {
      showAlert(err.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = await Auth.getCredentials();

        setUserInfo(credentials);
      } catch (err) {
        showAlert(err.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setInputMobileNo(userInfo.mobile_no);
    setInputFullName(userInfo.full_name);
    setInputAddress(userInfo.address);
    setInputCity(userInfo.city);
    setInputPassword(userInfo.password);
    setInputRePassword(userInfo.password);
    setInputBio(userInfo.bio);
  }, [userInfo]);

  return (
    <div>
      <CRow>
        <CCol md="4">
          <CRow>
            <CCol lg="12">
              <CCard
                style={{
                  backgroundImage: "linear-gradient(to bottom, rgba(94,45,255,1) 0%, rgba(118,54,227,1) 36%, rgba(210,25,222,1) 100%)",
                  color: "white",
                  boxShadow: "0px 20px 5px -10px rgba(155,101,204,0.49)",
                }}
              >
                <CCardBody>
                  <CImg
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.commissionit.co.uk%2Fwp-content%2Fuploads%2F2019%2F02%2F1-5.jpg&f=1&nofb=1"
                    width="100%"
                    className="mb-2"
                    style={{
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      maxWidth: "200px",
                      margin: "0 auto",
                      borderRadius: "1.5rem",
                    }}
                    block
                  />
                  <h4 className="card-title text-center d-block">Nama</h4>
                  <h5 className="card-subtitle text-center d-block">User</h5>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol lg="12">
              <CCard style={{ boxShadow: "10px 10px 5px 0px rgba(220,107,0,0.3)" }}>
                <CRow className="no-gutters">
                  <CCol md="4" className="d-flex align-items-center justify-content-center">
                    <CCardHeader className="text-center border-0 bg-transparent">
                      <CIcon name="cil-user" size={"4xl"} style={{ color: "rgb(220, 107, 21)" }} />
                    </CCardHeader>
                  </CCol>
                  <CCol md="8" className="d-flex align-items-center">
                    <CCardBody>
                      <CCardText>{userInfo.bio}</CCardText>
                    </CCardBody>
                  </CCol>
                </CRow>
              </CCard>
            </CCol>
          </CRow>
        </CCol>

        <CCol md="8">
          <CCard className="mb-0" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,62,45,1) 0%, rgba(233,37,67,1) 29%, rgba(222,25,194,1) 100%)' }}>
            <CCardHeader className="bg-transparent">
              <CCardTitle>Profil</CCardTitle>
            </CCardHeader>
          </CCard>
          <CCard className="mb-0">
            <CCardHeader>
              <CCardTitle>Informasi</CCardTitle>
            </CCardHeader>
            <CCollapse show={!isEditMode}>
              <CCardBody>
                <CRow>
                  <CCol sm="6" className="d-flex flex-column justify-content-between">
                    <div>
                      <h4>Username</h4>
                      <h5 className="font-weight-normal">{userInfo.username}</h5>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <h5 className="font-weight-normal">{userInfo.email}</h5>
                    </div>
                    <div>
                      <h4>No. Tlp</h4>
                      <h5 className="font-weight-normal">{userInfo.mobile_no}</h5>
                    </div>
                  </CCol>
                  <CCol sm="6" className="d-flex flex-column justify-content-between">
                    <div>
                      <h4>Nama Lengkap</h4>
                      <h5 className="font-weight-normal">{userInfo.full_name}</h5>
                    </div>
                    <div>
                      <h4>Alamat</h4>
                      <h5 className="font-weight-normal">{userInfo.address}</h5>
                    </div>
                    <div>
                      <h4>Kota</h4>
                      <h5 className="font-weight-normal">{userInfo.city}</h5>
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCollapse>
          </CCard>
          <CCard>
            <CCollapse show={isEditMode}>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CRow>
                    <CCol sm="6" className="d-flex flex-column g-2">
                      <CFormGroup>
                        <CLabel>Username</CLabel>
                        <CInput type="text" value={userInfo.username} disabled />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Email</CLabel>
                        <CInput type="email" value={userInfo.email} disabled />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>No. Tlp</CLabel>
                        <CInput type="text" name="inputMobileNo" value={inputMobileNo} onChange={handleChange} />
                      </CFormGroup>
                    </CCol>
                    <CCol sm="6">
                      <CFormGroup>
                        <CLabel>Nama Lengkap</CLabel>
                        <CInput type="text" name="inputFullName" value={inputFullName} onChange={handleChange} />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Alamat</CLabel>
                        <CInput type="text" name="inputAddress" value={inputAddress} onChange={handleChange} />
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel>Kota</CLabel>
                        <CInput type="text" name="inputCity" value={inputCity} onChange={handleChange} />
                      </CFormGroup>
                    </CCol>
                    <CCol lg="12">
                      <CRow>
                        <CCol md="6">
                          <CFormGroup>
                            <CLabel>Password</CLabel>
                            <CInput type="password" name="inputPassword" value={inputPassword} onChange={handleChange} />
                          </CFormGroup>
                        </CCol>
                        <CCol md="6">
                          <CFormGroup>
                            <CLabel>Re-type Password</CLabel>
                            <CInput type="password" name="inputRePassword" value={inputRePassword} onChange={handleChange} />
                          </CFormGroup>
                        </CCol>
                        <CCol xs="12">
                          <CTextarea value={inputBio} name="inputBio" onChange={handleChange}></CTextarea>
                        </CCol>
                        <CCol>
                          {alertText.message !== '' && <CAlert color={alertText.color}>{alertText.message}</CAlert>
}
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCollapse>
            <CCardHeader>
              {isEditMode ? (
                <>
                  <CButton size="lg" color="danger" className="mr-2" onClick={() => setIsEditMode(false)}>
                    Cancel
                  </CButton>
                  <CButton size="lg" color="info" onClick={handleSubmit}>
                    Submit
                  </CButton>
                </>
              ) : (
                <CButton size="lg" color="success" onClick={() => setIsEditMode(true)}>
                  Edit
                </CButton>
              )}
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default Profile;
