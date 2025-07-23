import './App.css'
import { AuthProvider } from '@em_app/shared';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
};

export default App;
