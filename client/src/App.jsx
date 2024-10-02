import { Routes, Route } from 'react-router';
import Login from './component/pages/Login';
import Register from './component/pages/Register';
import Home from './component/pages/Home';
import ProtectedRoute from './component/sequre/ProtectedRoute';
import AddEvent from './component/pages/Addevent';
import { Viewevent } from './component/pages/Viewevent';
import Manageevent from './component/pages/Manageevent';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/addevent' element={<AddEvent />} />
      <Route path='/viewevent' element={<Viewevent />} />
      <Route path='/manageevent' element={<Manageevent />} />
      <Route path='/' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
