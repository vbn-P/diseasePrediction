import { AppShell, Header, } from '@mantine/core';

import TopNavbar from '../components/TopNavbar';

import { Outlet } from "react-router-dom";


function Layout({setSelSymptoms}) {



    return (
        <AppShell
            padding="xl"
            header={<Header height={70} p="xs"> <TopNavbar setSelSymptoms={setSelSymptoms} /> </Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
        >
        <Outlet/>
        </AppShell>
    );
}

export default Layout