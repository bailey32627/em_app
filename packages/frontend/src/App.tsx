
import { AuthProvider } from '@em_app/shared';
import { ThemeProvider } from '@em_app/shared';

import Navigation from './components/Navigation';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ThemeProvider>
  )
};

export default App;
