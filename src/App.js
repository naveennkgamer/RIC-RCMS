// import './App.css';
// import Loginpage from './page/forgotpinpage'


// function App() {
//   return (
//     <Loginpage />
//   );
// }

// export default App;

import './App.css';
import Loginpage from './page/loginpage';
import Forgotpinpage from './page/forgotpinpage';
import Otpverification from './page/otpverification';
import Resetpin from './page/Resetpin';
import Setpin from './page/Setnewpin';
import RegisterPage from './page/registerpage';
import RegisterPage2 from './page/RegisterPage2';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegistrationProvider } from './context/RegistrationContext';

function App() {
  return (
    <RegistrationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/Forgotpinpage" element={<Forgotpinpage />} />
          <Route path="/otpverification" element={<Otpverification />} />
          <Route path='/resetpin' element={<Resetpin />} />
          <Route path='/setpin' element={<Setpin />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register2" element={<RegisterPage2 />} />
        </Routes>
      </Router>
    </RegistrationProvider>
  );
}

export default App;

