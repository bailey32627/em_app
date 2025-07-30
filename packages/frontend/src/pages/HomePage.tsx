import { MainContent } from '../components/MainContent';
import {Navbar} from '../components/Navbar';
import { HomePageLinks } from '../components/LinkData';

import { ThemedCard } from '../components/ThemedCard';

const HomePage = () => {
  return (
      <Navbar links={HomePageLinks} >
        <MainContent>
          <ThemedCard zoom={true}>
            <h1>EM-Ops Home</h1>
          </ThemedCard>
        </MainContent>
    </Navbar>
  )
};

export default HomePage;
