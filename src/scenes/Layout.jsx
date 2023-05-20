import { AppShell, Header, } from '@mantine/core';

import TopNavbar from '../components/TopNavbar';

import { Outlet } from "react-router-dom";


function Layout({setSelSymptoms}) {

    const customStyles = {
        backgroundColor: '#ccd0d9',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        borderBottom: '0rem solid black',

      };


    return (
        <AppShell
            padding="xl"
            header={<Header height={70} p="xs" style={customStyles}> <TopNavbar setSelSymptoms={setSelSymptoms} /> </Header>}
            styles={(theme) => ({
                main: { backgroundColor: '#e4e6eb' },
            })}
        >
        <Outlet/>
        </AppShell>
    );
}

export default Layout