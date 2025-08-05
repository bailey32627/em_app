import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';

import { Navbar } from '../components/Navbar';
import { MainContent } from '../components/MainContent';
import { DashboardPageLinks } from '../components/LinkData';

import { ThemedCard } from '../components/ThemedCard';
import { ThemedDropdown } from '../components/ThemedDropdown';

export default function DashboardPage() {
  const { user, loading, selectedDivision, selectedFacility, setSelectedDivision, setSelectedFacility } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  const styles:{ [key: string]: React.CSSProperties } = {
    menu_conatiner: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    top_menu: {
      display: 'inline-block',
    },
    dropdown_label: {
      paddingRight: "10px",
    },
  };


  return (
    <Navbar links={ DashboardPageLinks }>
      <MainContent>
        <div style={ styles.menu_conatiner }>
          <ThemedCard style={styles.top_menu}>
            <p><strong>Organization: </strong> {user && user.organization ? user.organization : 'None' }</p>
          </ThemedCard>

          <ThemedCard style={styles.top_menu}>
            <p style={ styles.dropdown_label}><strong>Division: </strong> { selectedDivision ? selectedDivision.name : "None" }</p>
            { user && (<ThemedDropdown>
              { user.member_divisions.map( (item) => (
                <span key={item.id}>{item.name}</span>
              ) )}
            </ThemedDropdown> ) }
          </ThemedCard>

          <ThemedCard style={styles.top_menu}>
            <p style={ styles.dropdown_label}><strong>Facility: </strong> { selectedFacility ? selectedFacility.name : "None" }</p>
            { user && (<ThemedDropdown>
              { user.member_facilities.map( (item) => (
                <span key={item.id}>{item.name}</span>
              ) )}
            </ThemedDropdown> ) }
          </ThemedCard>
        </div>
      </MainContent>
    </Navbar>
  );
}
