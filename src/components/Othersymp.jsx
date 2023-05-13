import React from 'react'
import { Paper,Title,Space,ScrollArea,Checkbox } from '@mantine/core';


function Othersymp({body,setBody,selSymptoms,setSelSymptoms}) {

    const otherSymptoms = ["itching","skin_rash","nodal_skin_eruptions","shivering","chills","joint_pain","muscle_wasting","fatigue","weight_gain","anxiety","mood_swings","weight_loss","restlessness","lethargy","irregular_sugar_level","cough","high_fever","sweating","dehydration","yellowish_skin","nausea","mild_fever","dizziness","cramps","obesity","extra_marital_contacts","swelling_joints","movement_stiffness","spinning_movements","loss_of_balance","unsteadiness","weakness_of_one_body_side","internal_itching","toxic_look_typhos","depression","irritability","muscle_pain","red_spots_over_body","family_history","lack_of_concentration","receiving_blood_transfusion","receiving_unsterile_injections","history_of_alcohol_consumption","fluid_over","scurring","skin_peeling"]

    function handlechange(event) {
        const val = event.target.value
        if (selSymptoms.includes(val)) {
            const sym=selSymptoms.filter(item => item !== val)
            setSelSymptoms(sym)
        }else{
            setSelSymptoms([val,...selSymptoms])
        }
    }
    
    return (
        <Paper shadow="md" mih="80vh" radius="md" p="md">
            <Title order={3}>SELECT THE GENERAL SYMPTOMS </Title>
            <Space h="md" />
            <ScrollArea h="66vh">
                {
                    otherSymptoms.map((value)=> {
                        return(
                            <Checkbox checked={selSymptoms.includes(value)? true:false} key={value} label={value} value={value} mb="xs"
                                onChange={(event) => handlechange(event)}

                            />
                        )
                    })
                }
            </ScrollArea>
        </Paper>
    )
}

export default Othersymp