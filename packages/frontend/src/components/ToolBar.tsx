import React, { ReactElement } from 'react';

// ICONS
import { FaBars } from 'react-icons/fa';
import { AiFillHome, AiFillBulb, AiOutlineClose } from 'react-icons/ai';

import { IconContext } from 'react-icons';

// routing
import { Link, useNavigate} from 'react-router-dom';


// theme
import { useTheme } from "@em_app/shared";
import { useAuth } from "@em_app/shared";

// uicontext
import { useUI } from '../context/UIContext';

// button
import { ThemedButton } from '../components/ThemedButton';


export interface ToolBarItem {
  title?: string;
  onClick: () => void;
  icon?: ReactElement;
}


type ToolBarProps = {
  items: ToolBarItem[];
  children?: React.ReactNode;
};

export const ToolBar: React.FC<ToolBarProps>= ({ items, children }) => {
  const {toggleToolbar} = useUI();
  const {isToolbarOpen} = useUI();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const {theme, toggleTheme } = useTheme();

  const styles: { [ key: string ]: React.CSSProperties } = {
    navbar: {
      backgroundColor: theme.surface_a10,
      height: '80px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      margin: '0 auto',
      color: theme.text_color,
    },
    theme_icon: {
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    home_icon: {
      position: 'relative',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      left: isToolbarOpen ? '160px' : 0,
      transition: 'left 0.3s ease',
    },
    user_name: {
      position: 'relative',
      color: theme.text_color,
      background: 'none',
      border: `1px solid ${theme.primary_a0}`,
      borderRadius: '8px',
      boxShadow: `3px 3px 5px ${theme.surface_a50}`,
      padding: '6px',
      marginLeft: '1rem',
      fontSize: '1.2rem',
      cursor: 'pointer',
      left: isToolbarOpen ? '160px' : 0,
      transition: 'left 0.3s ease',
    },
    logout: {
      color: theme.text_color,
      background: 'none',
      border: `1px solid ${theme.primary_a0}`,
      borderRadius: '8px',
      boxShadow: `3px 3px 5px ${theme.surface_a50}`,
      padding: '8px',
      margin: '2rem',
      cursor: 'pointer',
    },
    menu_bars: {
      marginLeft: '2rem',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    nav_menu: {
      backgroundColor: theme.surface_a10,
      width: '240px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: isToolbarOpen ? 0 : '-240px',
      transition: 'left 0.3s ease',
    },
    nav_text: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'left',
      padding: '8px 0 8px 0',
      listStyle: 'none',
      height: '60px',
    },
    navbar_toggle: {
      backgroundColor: theme.surface_a10,
      width: '100%',
      height: '80px',
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      fontSize: '2em',
    },
    nav_menu_item: {
      width: '100%',
      paddingLeft: '20px',
      border: 'none',
      fontSize: '1.1rem',
      justifyContent: 'start',
    },
    link_icon: {
      fontSize: '1.5rem',
      paddingLeft: '8px',
      paddingRight: '8px',
    }
  };

  const handleTheme = () => {
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
    navigate( '/login' );
  }

  const handleProfile = () => {
    navigate( '/profile' );
  }

  const handleHome = () => {
    if( user ) {
      navigate( '/dashboard' );
      return;
    }
    navigate( '/' );
  }


  return (
    <IconContext.Provider value={{ color: theme.primary_a10 }}>
      <div style={styles.navbar}>
        <button onClick={()=>toggleToolbar()} style={styles.menu_bars}><FaBars /></button>
        <button onClick={()=>handleHome()} style={styles.home_icon}><AiFillHome /></button>
        <span>
          {user && (
            <button onClick={handleProfile} style={ styles.user_name }>{user.fullname}</button>
          )}
        </span>
        <h1 style={styles.title}>EM-Ops</h1>
        <span>
          { user && (
            <button onClick={handleLogout} style={ styles.logout }>Logout</button>
          )}
          <button onClick={handleTheme} style={ styles.theme_icon}><AiFillBulb /></button>
        </span>
      </div>
      <nav style={ styles.nav_menu }>
        <ul style={styles.nav_menu_item} onClick={()=>toggleToolbar()}>
          <li style={styles.navbar_toggle}>
            <Link to="#">
              <AiOutlineClose />
            </Link>
          </li>

          { items.map( (item, index) => {
            return (
              <li key={index} style={styles.nav_text}>
                <ThemedButton
                  style={styles.nav_menu_item}
                  onClick={item.onClick}
                >
                  { item.icon && ( <span style={styles.link_icon}>{item.icon}</span> )}
                  {item.title && ( <span>{ item.title }</span>)}
                </ThemedButton>

              </li>
            );
          })}
        </ul>
      </nav>

      {/*Render passed-in children */}
      <div>{children}</div>
    </IconContext.Provider>
  )
};
