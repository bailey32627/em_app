import React from 'react';

// ICONS
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { IconContext } from 'react-icons';

// routing
import { Link, useNavigate} from 'react-router-dom';

// Styles
import { ThemedLink } from "./ThemedLink";

// theme
import { useTheme } from "@em_app/shared";
import { useAuth } from "@em_app/shared";

// uicontext
import { useUI } from '../context/UIContext';

// data
import { LinkItem } from './LinkData';


type NavLinkProps = {
  links: LinkItem[];
  children?: React.ReactNode;
};

export const Navbar: React.FC<NavLinkProps>= ({ links, children }) => {
  const {toggleNavbar} = useUI();
  const {isNavbarOpen} = useUI();
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
    },
    user_name: {
      color: theme.text_color,
      background: 'none',
      border: 'none',
      marginRight: '1rem',
      fontSize: '1.2rem',
    },
    logout: {
      color: theme.text_color,
      background: 'none',
      borderColor: theme.surface_a50,
      padding: '0.5rem',
      margin: '2rem',
      borderRadius: '4px',
    },
    menu_bars: {
      marginLeft: '2rem',
      fontSize: '2rem',
      background: 'none',
      border: 'none',
    },
    nav_menu: {
      backgroundColor: theme.surface_a10,
      width: '240px',
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'fixed',
      top: 0,
      left: isNavbarOpen ? 0 : '-240px',
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


  return (
    <IconContext.Provider value={{ color: theme.primary_a10 }}>
      <div style={styles.navbar}>
        <button onClick={()=>toggleNavbar()} style={styles.menu_bars}><FaIcons.FaBars /></button>
        { user && (
          <button onClick={handleProfile} style={ styles.user_name }>{user.fullname}</button>
        )}
        { user && (
          <button onClick={handleLogout} style={ styles.logout }>Logout</button>
        )}
        <button onClick={handleTheme} style={ styles.theme_icon}><AiIcons.AiFillBulb /></button>
      </div>
      <nav style={ styles.nav_menu }>
        <ul style={styles.nav_menu_item} onClick={()=>toggleNavbar()}>
          <li style={styles.navbar_toggle}>
            <Link to="#">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>

          { links.map( (item, index) => {
            return (
              <li key={index} style={styles.nav_text}>
                <ThemedLink
                  path={item.path}
                  icon={item.icon}
                  label={item.title}
                ></ThemedLink>

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
