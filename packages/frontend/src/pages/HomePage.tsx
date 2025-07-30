import { MainContent } from '../components/MainContent';
import Navbar from '../components/Navbar';
import { HomePageLinks } from '../components/LinkData';

const HomePage = () => {
  return (
      <Navbar links={HomePageLinks} >
        <MainContent>
          <h1>EM-Ops Home</h1>
        </MainContent>
    </Navbar>
  )
};

export default HomePage;
