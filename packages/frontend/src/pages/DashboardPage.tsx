
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';
import { useTheme } from '@em_app/shared';

import { ToolBar, ToolBarItem } from '../components/ToolBar';
import { MainContent } from '../components/MainContent';

import { ThemedCard } from '../components/ThemedCard';
import { ThemedDropdown } from '../components/ThemedDropdown';
import { ThemedButton } from '../components/ThemedButton';

import { AiOutlineSetting } from 'react-icons/ai';



export default function DashboardPage() {
  const { user, selectedDivision, selectedFacility, setSelectedDivision, setSelectedFacility } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  if( !user ) {
    navigate( '/login' );
    return (
      <p>Please login</p>
    );
  }

  const styles:{ [key: string]: React.CSSProperties } = {
    menu_conatiner: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    top_menu: {
      display: 'inline-block',
      fontSize: '1.1rem',
    },
    title: {
      fontSize: '1.1rem',
    },
    org_button: {
      fontSize: '1.5rem',
      width: '90%',
      boxShadow: `2px 2px 5px 1px ${theme.primary_a50}`,
      padding: '5px',
      color: theme.primary_a10,
    },
  };


  const handleManageOrg = () => {
    if( user.organization.is_owner ){
      navigate( '/organization_management' );
    }
  }

  const handleManageDivision = () => {
    navigate( '/division_management' );
  }

  const handleManageFacility = () => {
    navigate( '/facility_management' );
  }

  const handleMemberFacility = () => {
    navigate( '/member_facility' );
  }

  const handleCreateOrg = () => {
    navigate( '/create_organization');
  }

  const tools = {
    org_admin: [
      {
        title: 'Manage Organization',
        onClick: handleManageOrg,
      },
      {
        title: 'Manage Division',
        onClick: handleManageDivision,
      },
      {
        title: 'Manage Facility',
        onClick: handleManageFacility,
      },
    ],
    division_admin: [
      {
        title: 'Manage Division',
        onClick: handleManageDivision,
      },
      {
        title: 'Manage Facility',
        onClick: handleManageFacility,
      },
    ],
    facility_admin: [
      {
        title: 'View Facility',
        onClick: handleMemberFacility,
      },
    ],
    facility_member: [
      {
        title: 'View Facility',
        onClick: handleMemberFacility,
      },
    ],
    none: [
      {
        title: 'Create Organization',
        onClick: handleCreateOrg,
      },
    ],
  }

  const role = user.is_organization_admin ? 'org_admin' : user.is_division_admin ? 'division_admin' : user.is_facility_admin ? 'facility_admin' : 'facility_member';

  const toolBarItems: ToolBarItem[] = tools[ role ];


  return (
    <ToolBar items={ toolBarItems }>
      <MainContent>
        <div style={ styles.menu_conatiner }>

          <ThemedCard style={styles.top_menu}>
            <div style={{ display: 'inline-block' }}>
              <p style={ styles.title}><strong>Organization: </strong> { user.organization ? user.organization.name : 'None' }</p>
              <p style={ styles.title}><strong>Role: </strong> { user && user.is_organization_admin ? 'Administrator' : 'Member' }</p>
            </div>
            <div style={{display:'inline-block', float: 'right'}}>
              { user.organization.is_owner && (
                <ThemedButton style={styles.org_button} onClick={handleManageOrg}><AiOutlineSetting /></ThemedButton>
              )}
            </div>

          </ThemedCard>


          <ThemedCard style={styles.top_menu}>
            <p style={ styles.dropdown_label}><strong>Division: </strong> { selectedDivision ? selectedDivision.name : "None" }</p>

          </ThemedCard>

          <ThemedCard style={styles.top_menu}>
            <p style={ styles.dropdown_label}><strong>Facility: </strong> { selectedFacility ? selectedFacility.name : "None" }</p>

          </ThemedCard>

        </div>

      </MainContent>
    </ToolBar>
  );
}
