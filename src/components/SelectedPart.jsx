import React, { useState, useEffect } from 'react'
import { Paper, Title, Checkbox, Space, ScrollArea } from '@mantine/core';
function SelectedPart({ body, selSymptoms, setSelSymptoms }) {


    const legSymptoms = ["cold_hands_and_feets","blister","inflammatory_nails","small_dents_in_nails","painful_walking","prominent_veins_on_calf","weakness_in_limbs","swollen_legs","swollen_blood_vessels","brittle_nails","swollen_extremeties","knee_pain","muscle_weakness"]
    const handSymptoms = ["cold_hands_and_feets","blister","inflammatory_nails","small_dents_in_nails","swell,ed_lymph_nodes","malaise","weakness_in_limbs","dischromic_patches","swollen_blood_vessels","brittle_nails","swollen_extremeties","muscle_weakness"]
    const chestSymptoms = ["palpitations","blood_in_sputum","rusty_sputum","breathlessness","mucoid_sputum","phlegm","chest_pain","fast_heart_rate"]
    const headSymptoms = ["yellow_crust_ooze","red_sore_around_nose","silver_like_dusting","blackheads","pus_filled_pimples","coma","visual_disturbances","stiff_neck","malaise","puffy_face_and_eyes","watering_from_eyes","altered_sensorium","dischromic_patches","drying_and_tingling_lips","enlarged_thyroid","continuous_sneezing","neck_pain","congestion","runny_nose","sinus_pressure","redness_of_eyes","throat_irritation","ulcers_on_tongue","patches_in_throat","sunken_eyes","headache","pain_behind_the_eyes","yellowing_of_eyes","swelled_lymph_nodes","blurred_and_distorted_vision","phlegm"]
    const stomachSymptoms = ["distention_of_abdomen","stomach_bleeding","polyuria","mucoid_sputum","increased_appetite","hip_joint_pain","bladder_discomfort","belly_pain","abnormal_menstruation","continuous_feel_of_urine","passage_of_gases","foul_smell_of urine","stomach_pain","bloody_stool","irritation_in_anus","pain_in_anal_region","pain_during_bowel_movements","acidity","vomiting","burning_micturition","spotting_urination","indigestion","dark_urine","loss_of_appetite","back_pain","constipation","abdominal_pain","diarrhoea","yellow_urine","acute_liver_failure","fluid_overload","swelling_of_stomach"]

    var [symptoms, setSymptoms] = useState([])

    useEffect(() => {


        if (body === "LEG") {
            setSymptoms(legSymptoms)
        } else if (body === "HAND") {
            setSymptoms(handSymptoms)
        } else if (body === "STOMACH & LOWERBACK") {
            setSymptoms(stomachSymptoms)
        } else if (body === "HEAD") {
            setSymptoms(headSymptoms)
        } else if (body === "CHEST & UPPERBACK") {
            setSymptoms(chestSymptoms)
        }

    }, [body])

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
        <Paper mb="xl" shadow="md" mih="37vh" radius="md" p="md">
            <Title order={3}>SELECTED BODY PART : {body} </Title>
            <Space h="md" />
            <ScrollArea h="26vh">
                {
                    symptoms.map((value) => {
                        return (
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

export default SelectedPart