import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './pages/List/ListCustomer';
import CreateItem from './pages/CreateItem/CreateItem';
import View from './pages/View/View';
import Edit from './pages/Edit/Edit'

export default function App() { 
  return (
    <Router>
      <Routes>
        <Route path="/"                    element={<List />} />
        <Route path="/register"            element={<CreateItem />} />
        <Route path="/customer/:id"        element={<View />} />
        <Route path="/edit/customer/:id"   element={<Edit />} />
      </Routes>
    </Router>
  )
}