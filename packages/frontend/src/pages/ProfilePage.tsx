import React from 'react';

import { ToolBar, ToolBarItem } from '../components/ToolBar';

import { HiOutlineShare, HiOutlineSupport, HiOutlineOfficeBuilding, HiOutlineUser } from 'react-icons/hi';

import { MainContent } from '../components/MainContent';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedCard } from '../components/ThemedCard';
import { Navigate, useNavigate } from 'react-router-dom';

import { useTheme } from '@em_app/shared';
import { useAuth } from '@em_app/shared';


const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  if( !user ){
    // redirect to login
    return <Navigate to="/login" replace />
  }

  const handleCreateOrg = () => {
    navigate( '/create_organization' );
  }

  const handleManageOrg = () => {
    navigate( '/organization_management' );
  }

  const handleManageDivision = () => {
    navigate( '/division_management' );
  }

  const handleManageFacility = () => {
    navigate( '/facility_management' );
  }

  const handleDivisionView = () => {
    navigate( '/division_member' );
  }

  const handleFacilityView = () => {
    navigate( '/facliity_member' );
  }

  const toolConfig = {
    org_admin: [
      {
        title: "Manage Organization",
        onClick: handleManageOrg,
        icon: <HiOutlineShare />,
      },
      {
        title: "Manage Division",
        onClick: handleManageDivision,
        icon: <HiOutlineSupport />,
      },
      {
        title: "Manage Facility",
        onClick: handleManageFacility,
        icon: <HiOutlineOfficeBuilding />,
      },
    ],
    division_admin: [
      {
        title: "Manage Division",
        onClick: handleManageDivision,
        icon: <HiOutlineSupport />,
      },
      {
        title: "Manage Facility",
        onClick: handleManageFacility,
        icon: <HiOutlineOfficeBuilding />,
      },
    ],
    facility_admin: [
      {
        title: "Manage Facility",
        onClick: handleManageFacility,
        icon: <HiOutlineOfficeBuilding />,
      },
    ],
    division_member: [

    ],
    facliity_member: [

    ],
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat( 2, 1fr)',
    },
    user: {
      display: 'inline-block',
      fontSize: '3rem',
    },
    div: {
      display: 'inline-block',
      fontSize: '1.1rem',
      paddingLeft: '1.5rem',
      paddingTop: '1rem',
    },
    text: {
      color: theme.text_color,
    },
    button: {
      padding: '10px',
      boxShadow: `2px 2px 5px 1px ${theme.primary_a50}`,
    },
  }


  const toolBarItems: ToolBarItem[] = [

  ];


  return (
    <ToolBar items={toolBarItems} >
      <MainContent>
        <div style={styles.container}>

          <ThemedCard style={styles.div}>
            <HiOutlineUser style={styles.user} />
            <p style={styles.text}><strong>Name:</strong> {user.fullname}</p>
            <p style={styles.text}><strong>Email:</strong> {user.email}</p>
            <p style={styles.text}><strong>Organization:</strong> { user.organization ? user.organization.name : "" }</p>
          </ThemedCard>


          <ThemedCard style={styles.div}>
            <h3 style={styles.text}>Organization</h3>
            { user.organization ?
              user.organization.is_owner ?
                    <p style={styles.text}>Your are the Administrator for the <strong>{user.organization.name}</strong> Organization.</p>
                :
                    <p style={styles.text}>You are a member of the {user.organization.name} Organization.</p>
              :
              <p>You are not part of an Organization</p>
            }
            { user.organization.is_owner ? <ThemedButton onClick={handleManageOrg} style={styles.button}>Manage Organization</ThemedButton> :
              <ThemedButton onClick={handleCreateOrg} style={styles.button}>Create An Organization</ThemedButton>
            }
          </ThemedCard>

          <ThemedCard style={styles.div}>
            <h3 style={styles.text}>Division Admin Of: </h3>
            { user.admin_divisions.length > 0 ?(
                <ul style={styles.text}>
                  { user.admin_divisions.map( (div) => (
                    <li key={div.id}>{div.name}</li>
                  ))}
                </ul>
              ) : <p style={styles.text}>None</p>
            }
          </ThemedCard>

          <ThemedCard style={styles.div}>
            <h3 style={styles.text} >Facility Admin Of: </h3>
            { user.admin_facilities.length > 0 ? (
                <ul style={styles.text}>
                  { user.admin_facilities.map( (fac) => (
                    <li key={fac.id}>{fac.name}</li>
                  ))}
                </ul>
              ) : <p style={styles.text}>None</p>
            }
          </ThemedCard>

          <ThemedCard style={styles.div}>
            <h3 style={styles.text}>Member of Facility:</h3>
            { user.member_facilities.length > 0 ? (
              <ul style={styles.text}>
                { user.member_facilities.map( (fac) => (
                  <li key={fac.id}>{fac.name}</li>
                ))}
              </ul>
            ) : <p style={styles.text}>None</p>

            }
          </ThemedCard>

        </div>
      </MainContent>
    </ToolBar>
  )
}

export default ProfilePage;
