import './App.css'
import AuthContext from './Context/AuthContext';
import ProductContext from './Context/ProductContext'
import Router from './Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
 

  return (
    <div className='App.css'>
        <AuthContext>
        <ProductContext>
          <Router></Router>
          <ToastContainer/>
        </ProductContext>
        </AuthContext>
    </div>
  )
}

export default App
// ``   ǃ  b B