import { MainContent } from '../components/MainContent';
import {Navbar } from '../components/Navbar';
import { HomePageLinks } from '../components/LinkData';
import { ThemedCard } from '../components/ThemedCard';



const HomePage = () => {

  return (
      <Navbar links={HomePageLinks} >
        <MainContent>
          <ThemedCard zoom={true}>
            <h4>EM-Ops Home</h4>
          </ThemedCard>
          <ThemedCard zoom={true}>
            <h4>Another</h4>
          </ThemedCard>
        </MainContent>
    </Navbar>
  )
};

export default HomePage;
