import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DataTable from './components/DataTable'
import SingleData from './components/SingleData'

function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<DataTable />} />
        <Route path='/item/:id' element={<SingleData />} />
      </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
