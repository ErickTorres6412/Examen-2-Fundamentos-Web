// src/App.jsx
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;