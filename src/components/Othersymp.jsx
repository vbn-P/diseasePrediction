import React from 'react'
import { Paper,Title,Space,ScrollArea,Checkbox } from '@mantine/core';


function Othersymp({body,setBody,selSymptoms,setSelSymptoms}) {

    const otherSymptoms = ["anxiety","chills","cough","cramps","dehydration","depression","dizziness","extra_marital_contacts","family_history","fatigue","fluid_over","high_fever","history_of_alcohol_consumption","internal_itching","irregular_sugar_level","irritability","itching","joint_pain","lack_of_concentration","lethargy","loss_of_balance","mild_fever","mood_swings","movement_stiffness","muscle_pain","muscle_wasting","nausea","nodal_skin_eruptions","obesity","receiving_blood_transfusion","receiving_unsterile_injections","red_spots_over_body","restlessness","scurring","shivering","skin_peeling","skin_rash","spinning_movements","sweating","swelling_joints","toxic_look_typhos","unsteadiness","weakness_of_one_body_side","weight_gain","weight_loss","yellowish_skin"]

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