import React from 'react';
import { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase'
import { useSelector } from "react-redux";
import { Paper, Stack, Title, Text, Group, Divider, Space, Button  } from '@mantine/core';
import { useNavigate } from "react-router-dom"

function Result({ selSymptoms, model, setSelSymptoms }) {
  const navigate = useNavigate()
  const [disease, setDisease] = useState("");
  const [percent, setPercent] =useState(0)
  const [detail, setDetail] =useState("")
  const user = useSelector((state) => state.global.user.payload)
  const userData = useSelector((state) => state.global.userData.payload)
  const allSymptoms = {
    'itching': 0,
    'skin_rash': 0,
    'nodal_skin_eruptions': 0,
    'continuous_sneezing': 0,
    'shivering': 0,
    'chills': 0,
    'joint_pain': 0,
    'stomach_pain': 0,
    'acidity': 0,
    'ulcers_on_tongue': 0,
    'muscle_wasting': 0,
    'vomiting': 0,
    'burning_micturition': 0,
    'spotting_urination': 0,
    'fatigue': 0,
    'weight_gain': 0,
    'anxiety': 0,
    'cold_hands_and_feets': 0,
    'mood_swings': 0,
    'weight_loss': 0,
    'restlessness': 0,
    'lethargy': 0,
    'patches_in_throat': 0,
    'irregular_sugar_level': 0,
    'cough': 0,
    'high_fever': 0,
    'sunken_eyes': 0,
    'breathlessness': 0,
    'sweating': 0,
    'dehydration': 0,
    'indigestion': 0,
    'headache': 0,
    'yellowish_skin': 0,
    'dark_urine': 0,
    'nausea': 0,
    'loss_of_appetite': 0,
    'pain_behind_the_eyes': 0,
    'back_pain': 0,
    'constipation': 0,
    'abdominal_pain': 0,
    'diarrhoea': 0,
    'mild_fever': 0,
    'yellow_urine': 0,
    'yellowing_of_eyes': 0,
    'acute_liver_failure': 0,
    'fluid_overload': 0,
    'swelling_of_stomach': 0,
    'swelled_lymph_nodes': 0,
    'malaise': 0,
    'blurred_and_distorted_vision': 0,
    'phlegm': 0,
    'throat_irritation': 0,
    'redness_of_eyes': 0,
    'sinus_pressure': 0,
    'runny_nose': 0,
    'congestion': 0,
    'chest_pain': 0,
    'weakness_in_limbs': 0,
    'fast_heart_rate': 0,
    'pain_during_bowel_movements': 0,
    'pain_in_anal_region': 0,
    'bloody_stool': 0,
    'irritation_in_anus': 0,
    'neck_pain': 0,
    'dizziness': 0,
    'cramps': 0,
    'bruising': 0,
    'obesity': 0,
    'swollen_legs': 0,
    'swollen_blood_vessels': 0,
    'puffy_face_and_eyes': 0,
    'enlarged_thyroid': 0,
    'brittle_nails': 0,
    'swollen_extremeties': 0,
    'excessive_hunger': 0,
    'extra_marital_contacts': 0,
    'drying_and_tingling_lips': 0,
    'slurred_speech': 0,
    'knee_pain': 0,
    'hip_joint_pain': 0,
    'muscle_weakness': 0,
    'stiff_neck': 0,
    'swelling_joints': 0,
    'movement_stiffness': 0,
    'spinning_movements': 0,
    'loss_of_balance': 0,
    'unsteadiness': 0,
    'weakness_of_one_body_side': 0,
    'loss_of_smell': 0,
    'bladder_discomfort': 0,
    'foul_smell_of urine': 0,
    'continuous_feel_of_urine': 0,
    'passage_of_gases': 0,
    'internal_itching': 0,
    'toxic_look_typhos': 0,
    'depression': 0,
    'irritability': 0,
    'muscle_pain': 0,
    'altered_sensorium': 0,
    'red_spots_over_body': 0,
    'belly_pain': 0,
    'abnormal_menstruation': 0,
    'dischromic_patches': 0,
    'watering_from_eyes': 0,
    'increased_appetite': 0,
    'polyuria': 0,
    'family_history': 0,
    'mucoid_sputum': 0,
    'rusty_sputum': 0,
    'lack_of_concentration': 0,
    'visual_disturbances': 0,
    'receiving_blood_transfusion': 0,
    'receiving_unsterile_injections': 0,
    'coma': 0,
    'stomach_bleeding': 0,
    'distention_of_abdomen': 0,
    'history_of_alcohol_consumption': 0,
    'fluid_over': 0,
    'blood_in_sputum': 0,
    'prominent_veins_on_calf': 0,
    'palpitations': 0,
    'painful_walking': 0,
    'pus_filled_pimples': 0,
    'blackheads': 0,
    'scurring': 0,
    'skin_peeling': 0,
    'silver_like_dusting': 0,
    'small_dents_in_nails': 0,
    'inflammatory_nails': 0,
    'blister': 0,
    'red_sore_around_nose': 0,
    'yellow_crust_ooze': 0
  }

  const diseasesMap = new Map([[0, '(vertigo) Paroymsal  Positional Vertigo'],
  [1, 'AIDS'],
  [2, 'Acne'],
  [3, 'Alcoholic hepatitis'],
  [4, 'Allergy'],
  [5, 'Arthritis'],
  [6, 'Bronchial Asthma'],
  [7, 'Cervical spondylosis'],
  [8, 'Chicken pox'],
  [9, 'Chronic cholestasis'],
  [10, 'Common Cold'],
  [11, 'Dengue'],
  [12, 'Diabetes '],
  [13, 'Dimorphic hemmorhoids(piles)'],
  [14, 'Drug Reaction'],
  [15, 'Fungal infection'],
  [16, 'GERD'],
  [17, 'Gastroenteritis'],
  [18, 'Heart attack'],
  [19, 'Hepatitis B'],
  [20, 'Hepatitis C'],
  [21, 'Hepatitis D'],
  [22, 'Hepatitis E'],
  [23, 'Hypertension '],
  [24, 'Hyperthyroidism'],
  [25, 'Hypoglycemia'],
  [26, 'Hypothyroidism'],
  [27, 'Impetigo'],
  [28, 'Jaundice'],
  [29, 'Malaria'],
  [30, 'Migraine'],
  [31, 'Osteoarthristis'],
  [32, 'Paralysis (brain hemorrhage)'],
  [33, 'Peptic ulcer diseae'],
  [34, 'Pneumonia'],
  [35, 'Psoriasis'],
  [36, 'Tuberculosis'],
  [37, 'Typhoid'],
  [38, 'Urinary tract infection'],
  [39, 'Varicose veins'],
  [40, 'hepatitis A']
  ]);

  const detailMap = new Map([[0, '(vertigo) Paroymsal  Positional Vertigo'],
  [1, 'AIDS'],
  [2, 'Acne'],
  [3, 'Alcoholic hepatitis'],
  [4, 'Allergy'],
  [5, 'Arthritis'],
  [6, 'Bronchial Asthma'],
  [7, 'Cervical spondylosis'],
  [8, 'Chicken pox'],
  [9, 'Chronic cholestasis'],
  [10, 'Common Cold'],
  [11, 'Dengue'],
  [12, 'Diabetes '],
  [13, 'Dimorphic hemmorhoids(piles)'],
  [14, 'Drug Reaction'],
  [15, 'Fungal infection'],
  [16, 'GERD'],
  [17, 'Gastroenteritis'],
  [18, 'Heart attack'],
  [19, 'Hepatitis B'],
  [20, 'Hepatitis C'],
  [21, 'Hepatitis D'],
  [22, 'Hepatitis E'],
  [23, 'Hypertension '],
  [24, 'Hyperthyroidism'],
  [25, 'Hypoglycemia'],
  [26, 'Hypothyroidism'],
  [27, 'Impetigo'],
  [28, 'Jaundice'],
  [29, 'Malaria'],
  [30, 'Migraine'],
  [31, 'Osteoarthristis'],
  [32, 'Paralysis (brain hemorrhage)'],
  [33, 'Peptic ulcer diseae'],
  [34, 'Pneumonia'],
  [35, 'Psoriasis'],
  [36, 'Tuberculosis'],
  [37, 'Typhoid'],
  [38, 'Urinary tract infection'],
  [39, 'Varicose veins'],
  [40, 'hepatitis A']
  ]);


  const symptomsFinal = ['itching', 'skin_rash', 'continuous_sneezing', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'vomiting', 'burning_micturition', 'fatigue', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'cough', 'high_fever', 'breathlessness', 'sweating', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellowing_of_eyes', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'chest_pain', 'fast_heart_rate', 'neck_pain', 'dizziness', 'obesity', 'excessive_hunger', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'loss_of_balance', 'depression', 'irritability', 'muscle_pain', 'red_spots_over_body', 'family_history'];
  var percentage =0
  async function predict() {
    selSymptoms.forEach(element => {
      allSymptoms[element] = "1"
    });


    const inputData = [];

    for (let i in allSymptoms) {
      if (symptomsFinal.includes(i)) {
        inputData.push(parseInt(allSymptoms[i]));
      }
    }
    const reshapedTensor = tf.tensor(inputData, [1, 49]);

    const output = model.predict(reshapedTensor);
   await output.array().then((result) => {
      const probabilities = result[0];
      let maxIndex = 0;
       let maxProbability = probabilities[0];
      for (let i = 1; i < probabilities.length; i++) {
        if (probabilities[i] > maxProbability) {
          maxIndex = i;
          maxProbability = probabilities[i];
        }
      }

       percentage = (maxProbability * 100).toFixed(2);
      console.log(`Class ${maxIndex}: ${percentage}%`);
      setPercent(percentage)
    });

    const label = tf.argMax(output, 1).dataSync()[0];
    const diseaseName = diseasesMap.get(label);


    setDisease(diseaseName);
    setDetail(detailMap.get(label))
    if (user !== "guest") {
      const docRef = await addDoc(collection(db, user), {
        symptoms: selSymptoms,
        disease: diseaseName,
        date: serverTimestamp()
      });
    }

  }



  useEffect(() => {

    predict();

  }, [selSymptoms])
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = String(currentDate.getFullYear()).slice(2);
  const formattedDate = `${day}/${month}/${year}`;
  function calculateBMI(height, weight) {
    // Convert height from cm to meters
    const heightInMeters = height / 100;

    // Calculate BMI score
    const bmiScore = weight / (heightInMeters * heightInMeters);

    // Determine BMI level based on score
    let bmiLevel;
    if (bmiScore < 18.5) {
      bmiLevel = 'Underweight';
    } else if (bmiScore >= 18.5 && bmiScore < 25) {
      bmiLevel = 'Normal weight';
    } else if (bmiScore >= 25 && bmiScore < 30) {
      bmiLevel = 'Overweight';
    } else {
      bmiLevel = 'Obese';
    }

    // Return an object with BMI score and level
    return {
      score: bmiScore.toFixed(2),
      level: bmiLevel
    };
  }
  const result = calculateBMI(userData.height, userData.weight);
  return (
    <div>
      <Stack align="center">
        <Paper shadow="xs" p="2rem" maw="50rem" mih="36rem">
          <Title order={3} td="underline" align="center">Prediction Result</Title>

          <Group position="apart" mt="lg">
            <Text fw={700}>Name :   {
              user === 'guest' ? "Guest" : `  ${userData.firstName} ${userData.lastName}`

            }</Text>
            <Text fw={500}> Date : {formattedDate}</Text>
          </Group>
          <Group position="apart" mt="sm">
            <Text fw={500}>Age :   {
              userData.age

            }</Text>
            <Text fw={500}>Gender :   {
              userData.gender

            }</Text>
            <Text fw={500}>Height :   {
              userData.height

            }</Text>
            <Text fw={500}>Weight :   {
              userData.weight

            }</Text>
          </Group>


          <Group mt="sm">
            <Text fw={500}>BMI Status </Text>
            <Text fw={500}> Score : {result.score}</Text>
            <Text fw={500}> Level : {result.level}</Text>
          </Group>
          <Divider my="sm" />

          <Group>
            <Title order={5}> Predicted Disease : </Title>
            <Title order={percent> 80 ? 4 : 6}>{ percent > 80 ? `${disease}` : "Since probability of prediction is too low, try with more symptoms or consult a Doctor"} </Title>

          </Group>

          <Group mt="sm">
            <Title order={5}> Probabality of Prediction : </Title>
            <Title order={4}> { percent }% </Title>

          </Group>
          <Title my="sm" order={5}> Symptoms Provided : </Title>
            {
              selSymptoms.map((item, index)=>{
                return(
                  <Text>   {index}. {item}</Text>
                )
              })
            }

            {
              percent > 80 && <Title mt="sm" order={5}> Details of Predicted Disease </Title>
               }{
              percent > 80 && <Text>{detail}</Text>  
            }
            <Space h="xl" />
            <Space h="xl" />
            <Divider my="sm" />
            <Title align='center'  order={5}> The result is based on AI Prediction model, Consult a Doctor and ensure before taking remedials. </Title>

       
       
            </Paper>
            <Button size="xs" mr="xs" onClick={()=>{
              navigate("/predict/body");
              setSelSymptoms([]) 
            }}>Make another Prediction</Button>
      </Stack>

    </div>
  )
}

export default Result