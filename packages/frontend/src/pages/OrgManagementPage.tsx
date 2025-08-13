import React, { useState } from 'react';

import { useAuth } from '@em_app/shared';
import { useNavigate } from 'react-router-dom';

// icons
import { BsBuildingFillAdd, BsBuildingFillGear } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

// components
import { MainContent } from '../components/MainContent';
import { ToolBar, ToolBarItem } from '../components/ToolBar';
import { ThemedCard } from '../components/ThemedCard';
import { ThemedScrollableVertical } from '../components/ThemedScrollableContainer';
import { ThemedButton } from '../components/ThemedButton';
import { AddDivisionPopup } from '../components/AddDivisionPopup';
import { DeleteDivisionPopup } from '../components/DeleteDivisionPopup';

import { useTheme } from '@em_app/shared';


const OrgManagementPage: React.FC = () => {
  const { user, selectedDivision, setSelectedDivision, selectedFacility, setSelectedFacility } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [ isAddDivisionOpen, setIsAddDivisionOpen ] = useState( false );
  const [ isDeleteDivisionOpen, setIsDeleteDivisionOpen ] = useState( false );

  if( !user ){
    navigate( '/login' );
    return <p>Please login</p>
  }

  if( !user.organization || !user.organization.is_owner ){
    navigate( '/dashboard' );
    return <p>Reload Dashboard</p>
  }

  const styles:{ [key: string]: React.CSSProperties } = {
    title: {
      textAlign: 'center',
    },
    text: {
      marginLeft: '20px',
    },
    container:{
      display: 'grid',
      gridTemplateColumns: 'repeat( 2, 1fr)'
    },
    button: {
      display:'inline-block',
      width: '35px',
      height: '35px',
      float: 'right',
      fontSize: '1.5rem',
      textAlign: 'center',
      padding: '5px',
      marginLeft: '5px',
    },
    ul: {
      listStyleType: 'none',
    },
    div_li: {
      fontSize: '1.1rem',
      padding: '5px',
    },

  };

  const addDivision = () => {
    setIsAddDivisionOpen( true );
  }

  const deleteDivision = () => {
    if( selectedDivision ) {
      setIsDeleteDivisionOpen( true );
    }
  }

  const deleteDivsionOnClose = () => {
    setIsDeleteDivisionOpen( false );
    window.location.reload();
  }

  const addFacility = () => {

  }

  const addDivisionOnClose = () => {
    setIsAddDivisionOpen( false );
    window.location.reload();
  }

  const handleAddFacility = () => {

  }

  const handleDivisionClick = (item_id: number ) => {
    const found = user.admin_divisions.find( i => i.id === item_id );
    if( found ) {
      setSelectedDivision( found );
    }
  }

  const handleFacilityClick = ( item_id: number ) => {
    const found = user.admin_facilities.find( i => i.id === item_id );
    if( found ) {
      setSelectedFacility( found );
    }
  }


  const tools: ToolBarItem[] = [
    {
      title: 'Add Division',
      onClick: addDivision,
      icon: <BsBuildingFillGear />,
    },
    {
      title: 'Add Facility',
      onClick: handleAddFacility,
      icon: <BsBuildingFillAdd />,
    },
  ];

  console.log( user.admin_divisions );

  return (
      <ToolBar items={tools}>
        <MainContent>

          <AddDivisionPopup isOpen={isAddDivisionOpen} onClose={addDivisionOnClose} />
          <DeleteDivisionPopup isOpen={isDeleteDivisionOpen} onClose={deleteDivsionOnClose} />

          <ThemedCard style={styles.title}>
            <h1>{ user.organization.name }</h1>
            <p>Number of Facilities: <span><strong>{user.organization.facility_count}</strong></span></p>
            <p style={{...styles.text} }>Subscription: $<strong>{ user.organization.facility_count * 3.99 }</strong></p>
          </ThemedCard>

          <div style={styles.container}>

            <ThemedCard>
              <div style={styles.container}>
                <p style={styles.text}><strong>Divisions:</strong></p>
                <div>
                  <ThemedButton style={styles.button} onClick={addDivision}><IoMdAdd /></ThemedButton>
                  <ThemedButton
                    style={styles.button}
                    disabled={ selectedDivision ? false : true }
                    onClick={deleteDivision}
                  >
                    <MdOutlineDeleteForever/>
                  </ThemedButton>
                </div>
                  <p style={styles.text}>Current: <span style={{marginLeft:'10px'}}>{selectedDivision ? selectedDivision.name : ""}</span></p>
              </div>
              <ThemedScrollableVertical height={100} >
                {user.admin_divisions.length > 0 ? (
                  <ul style={styles.ul}>
                    {user.admin_divisions.map( (item, idx) =>(
                      <li
                        key={item.id}
                        onClick={()=> handleDivisionClick( item.id ) }
                        style={{
                          backgroundColor: idx % 2 === 0 ? theme.surface_a10 : theme.surface_a20,
                          cursor: 'pointer',
                          ...styles.div_li,
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{marginLeft:"10px",}}>No Divisions in this Organization</p>
                )

                }
              </ThemedScrollableVertical>
            </ThemedCard>

            <ThemedCard>
              <div style={styles.container}>
                <p style={styles.text}><strong>Facilities:</strong></p>
                <div>
                  <ThemedButton style={styles.button} onClick={addFacility}><IoMdAdd /></ThemedButton>
                  <ThemedButton style={styles.button}><MdOutlineDeleteForever/></ThemedButton>
                </div>
                  <p style={styles.text}>Current: <span style={{marginLeft:'10px'}}>{selectedFacility ? selectedFacility.name : ""}</span></p>
              </div>
              <ThemedScrollableVertical height={100} >
                {user.admin_facilities.length > 0 ? (
                  <ul style={styles.ul}>
                    {user.admin_facilities.map( (item, idx) =>(
                      <li
                        key={item.id}
                        onClick={()=> handleFacilityClick( item.id ) }
                        style={{
                          backgroundColor: idx % 2 === 0 ? theme.surface_a10 : theme.surface_a20,
                          cursor: 'pointer',
                          ...styles.div_li,
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{marginLeft:"10px",}}>No Facilities in this Organization</p>
                )

                }
              </ThemedScrollableVertical>
            </ThemedCard>
          </div>
      </MainContent>
      </ToolBar>
  )
};

export default OrgManagementPage;
