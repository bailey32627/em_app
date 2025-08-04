import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserProfile } from '../utils/types';
import { API_BASE_URL } from '@em_app/shared';

import { Navbar } from '../components/Navbar';
import { ProfilepageLinks } from '../components/LinkData';
import { MainContent } from '../components/MainContent';
import { ThemedButton } from '../components/ThemedButton';

import { useTheme } from '@em_app/shared';


const ProfilePage: React.FC = () => {
  const [ profile, setProfile ] = useState< UserProfile | null >( null );
  const { theme } = useTheme();

  useEffect( () => {
    axios.get( `${API_BASE_URL}/api/user/me`)
    .then( res => setProfile( res.data ))
    .catch( err => console.error( err ) )
  }, [] );

  const handleSubscription = () => {
    console.log( 'subscribe' );
  }

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat( 2, 1fr)',
    },
    div: {
      display: 'inline-block',
      backgroundColor: theme.surface_a10,
      width: "90%",
      padding: "10px 20px 10px 20px",
      borderRadius: '10px',
      marginTop: '10px',
    },
    text: {
      color: theme.text_color,
    },
  }


  if( !profile ) return <p>Loading...</p>

  return (
    <Navbar links={ProfilepageLinks} >
      <MainContent>
        <div style={styles.container}>

          <div style={styles.div}>
            <h2 style={styles.text}>Profile</h2>
            <p style={styles.text}><strong>Name:</strong> {profile.fullname}</p>
            <p style={styles.text}><strong>Email:</strong> {profile.email}</p>
            <p style={styles.text}><strong>Organization:</strong> { profile.organization ? profile.organization.name : "" }</p>
          </div>

          <div style={styles.div}>
            <h3 style={styles.text}>Organization</h3>
            { profile.organization ?
              profile.organization.is_owner ?
                  profile.organization.subscription_active ?
                    <p style={styles.text}>Your are the Administrator for the <strong>{profile.organization.name}</strong> Organization.</p>
                  :
                    <p style={styles.text}>The Subscription for {profile.organization.name} has expired</p>
                :
                  <p style={styles.text}>You are a member of the {profile.organization.name} Organization.</p>
              :
              <ThemedButton onClick={handleSubscription} width={200} height={50}>Subscribe an Organization</ThemedButton>
            }
          </div>

          <div style={styles.div}>
            <h3 style={styles.text}>Division Admin Of: </h3>
            { profile.admin_divisions.length > 0 ?(
                <ul style={styles.text}>
                  { profile.admin_divisions.map( (div) => (
                    <li key={div.id}>{div.name}</li>
                  ))}
                </ul>
              ) : <p style={styles.text}>None</p>
            }
          </div>

          <div style={styles.div}>
            <h3 style={styles.text} >Facility Admin Of: </h3>
            { profile.admin_facilities.length > 0 ? (
                <ul style={styles.text}>
                  { profile.admin_facilities.map( (fac) => (
                    <li key={fac.id}>{fac.name}</li>
                  ))}
                </ul>
              ) : <p style={styles.text}>None</p>
            }
          </div>

          <div style={styles.div}>
            <h3 style={styles.text}>Member of Facility:</h3>
            { profile.member_facilities.length > 0 ? (
              <ul style={styles.text}>
                { profile.member_facilities.map( (fac) => (
                  <li key={fac.id}>{fac.name}</li>
                ))}
              </ul>
            ) : <p style={styles.text}>None</p>

            }
          </div>

        </div>
      </MainContent>
    </Navbar>
  )
}

export default ProfilePage;
