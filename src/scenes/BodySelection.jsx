import React from 'react'
import Body from '../components/Body';
import SelectedPart from '../components/SelectedPart';
import SelectedSymptoms from '../components/SelectedSymptoms';
import { Grid } from '@mantine/core';


function BodySelection({body,setBody,selSymptoms,setSelSymptoms}) {

  

  return (
    <Grid >
                <Grid.Col md={6}><Body body={body} setBody={setBody} /></Grid.Col>
                <Grid.Col md={6}> 
                <SelectedPart body={body}  selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms}   />
                <SelectedSymptoms selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms} height="37" title="Proceed" />
                </Grid.Col>
            </Grid>
  )
}

export default BodySelection