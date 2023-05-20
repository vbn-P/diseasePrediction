import React from 'react'
import { Grid } from '@mantine/core';
import Othersymp from '../components/Othersymp';
import SelectedSymptoms from '../components/SelectedSymptoms';




function Others({body,setBody,selSymptoms,setSelSymptoms}) {
  return (
    <Grid>
    <Grid.Col md={6}><Othersymp body={body} setBody={setBody} selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms} />  </Grid.Col>
    <Grid.Col md={6}><SelectedSymptoms selSymptoms={selSymptoms} setSelSymptoms={setSelSymptoms} height="76" title="Predict" />
    </Grid.Col>
    
    </Grid>
  )
}

export default Others