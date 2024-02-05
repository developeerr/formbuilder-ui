import './App.css'
import TemplateFormBuilder from './components/TemplateFormBuilder'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateView from './components/TemplateView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <>
            <ToastContainer />
            <TemplateFormBuilder />
          </>
        }></Route>
        <Route path='/template/:id' element={
          <TemplateView />
        }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
