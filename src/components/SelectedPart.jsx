import React, { useState, useEffect } from 'react'
import { Paper, Title, Checkbox, Space, ScrollArea } from '@mantine/core';
function SelectedPart({ body, selSymptoms, setSelSymptoms }) {


    const legSymptoms = ["blister","brittle_nails","cold_hands_and_feets","inflammatory_nails","knee_pain","muscle_weakness","painful_walking","prominent_veins_on_calf","small_dents_in_nails","swollen_blood_vessels","swollen_extremeties","swollen_legs","weakness_in_limbs"]
    const handSymptoms = ["blister","brittle_nails","cold_hands_and_feets","dischromic_patches","inflammatory_nails","malaise","muscle_weakness","small_dents_in_nails","swelled_lymph_nodes","swollen_blood_vessels","swollen_extremeties","weakness_in_limbs"]
    const chestSymptoms = ["blood_in_sputum","breathlessness","chest_pain","fast_heart_rate","mucoid_sputum","palpitations","phlegm","rusty_sputum"]
    const headSymptoms = ["altered_sensorium","blackheads","blurred_and_distorted_vision","coma","congestion","continuous_sneezing","dischromic_patches","drying_and_tingling_lips","enlarged_thyroid","headache","malaise","neck_pain","pain_behind_the_eyes","patches_in_throat","phlegm","puffy_face_and_eyes","pus_filled_pimples","red_sore_around_nose","redness_of_eyes","runny_nose","silver_like_dusting","sinus_pressure","stiff_neck","sunken_eyes","swelled_lymph_nodes","throat_irritation","ulcers_on_tongue","visual_disturbances","watering_from_eyes","yellow_crust_ooze","yellowing_of_eyes"]
    const stomachSymptoms = ["abdominal_pain","abnormal_menstruation","acidity","acute_liver_failure","back_pain","belly_pain","bladder_discomfort","bloody_stool","burning_micturition","constipation","continuous_feel_of_urine","dark_urine","diarrhoea","distention_of_abdomen","fluid_overload","foul_smell_of_urine","hip_joint_pain","increased_appetite","indigestion","irritation_in_anus","loss_of_appetite","mucoid_sputum","pain_during_bowel_movements","pain_in_anal_region","passage_of_gases","polyuria","spotting_urination","stomach_bleeding","stomach_pain","swelling_of_stomach","vomiting","yellow_urine"]

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