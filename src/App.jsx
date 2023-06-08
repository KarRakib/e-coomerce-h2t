import './App.css'
import AuthContext from './Context/AuthContext';
import ProductContext from './Context/ProductContext'
import Router from './Router/Router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider} from 'react-query'
const queryClient = new QueryClient()
function App() {


  return (
    <div className='App.css'>
      <QueryClientProvider client={queryClient}>
      <AuthContext>
        <ProductContext>
          <Router></Router>
          <ToastContainer />
        </ProductContext>
      </AuthContext>
      </QueryClientProvider>
    </div>
  )
}

export default App
// ``   ǃ  b B