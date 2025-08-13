import { MainContent } from '../components/MainContent';
import { useNavigate } from 'react-router-dom';

import { AiFillCaretRight, AiFillCaretUp} from 'react-icons/ai';

import {ToolBar, ToolBarItem } from '../components/ToolBar';

import { ThemedCard } from '../components/ThemedCard';




const HomePage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate( '/register' );
  }

  const handleLogin = () => {
    navigate( '/login' );
  }

  const toolBarItems: ToolBarItem[] = [
    {
      title: 'Register',
      onClick: handleRegister,
      icon: <AiFillCaretUp />,
    },
    {
      title: 'Login',
      onClick: handleLogin,
      icon: <AiFillCaretRight />,
    }
  ];

  return (
      <ToolBar items={toolBarItems} >
        <MainContent>
          <ThemedCard>
            <h4>EM-Ops Home</h4>
          </ThemedCard>
          <ThemedCard>
            <h4>Another</h4>
          </ThemedCard>
        </MainContent>
      </ToolBar>
  )
};

export default HomePage;
