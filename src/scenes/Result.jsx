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

  const detailMap = new Map([[0, "Vertigo is a type of dizziness that is characterized by a sensation of spinning or movement when there is no actual movement. Paroxysmal positional vertigo (BPPV) is a type of vertigo that is caused by changes in the position of the head."],
  [1, "AIDS (Acquired Immune Deficiency Syndrome) is a viral disease caused by the Human Immunodeficiency Virus (HIV), which weakens the immune system and leaves individuals susceptible to infections and diseases. HIV is primarily spread through unprotected sexual contact, sharing needles with an infected person, and from mother to child during childbirth or breastfeeding."],
  [2, "Acne is a common skin condition that causes pimples, blackheads, whiteheads, and other blemishes on the face, neck, chest, and back."],
  [3, "Alcoholic hepatitis is a liver inflammation caused by excessive alcohol consumption over a period of time, which can lead to liver damage and scarring (cirrhosis) if not treated."],
  [4, "Allergy is an immune system response to a foreign substance, also known as an allergen, that the body perceives as harmful. Some common allergens include pollen, dust mites, animal dander, certain foods, and medications."],
  [5, "Arthritis is a broad term used to describe joint inflammation, pain, and stiffness. There are many types of arthritis, including osteoarthritis, rheumatoid arthritis, and psoriatic arthritis."],
  [6, "Bronchial asthma is a chronic respiratory disease that causes inflammation and narrowing of the airways, leading to breathing difficulties, wheezing, coughing, and chest tightness. It is caused by a combination of genetic and environmental factors, such as allergens, air pollution, respiratory infections, and stress."],
  [7, "Cervical spondylosis is a common age-related condition in which the joints, discs, and bones of the neck deteriorate and cause pain, stiffness, and numbness in the neck, shoulders, and arms. The primary cause of cervical spondylosis is aging, which leads to wear and tear of the cervical spine, although other factors such as injuries, poor posture, and genetic factors may also contribute."],
  [8, "Chickenpox is a highly contagious viral disease caused by the varicella-zoster virus (VZV). It is characterized by a rash of itchy blisters all over the body, along with fever and general malaise."],
  [9, "Chronic cholestasis is a condition characterized by impaired bile flow from the liver, leading to the accumulation of bile in the liver and blood. The condition can be caused by a variety of factors, including liver diseases such as primary biliary cholangitis (PBC) and primary sclerosing cholangitis (PSC), genetic  disorders such as Alagille syndrome, or as a side effect of medications or toxins."],
  [10, "The common cold is a viral infection of the upper respiratory system caused by various viruses, most commonly rhinoviruses. Symptoms of the common cold include coughing, sneezing, sore throat, runny nose, nasal congestion, and mild body aches"],
  [11, "Dengue is a viral infection that is transmitted by the Aedes mosquito. It is found mainly in tropical and subtropical regions of the world. The virus has four different strains, and infection with one strain provides immunity only to that particular strain."],
  [12, "Diabetes is a chronic metabolic disorder characterized by high levels of glucose (sugar) in the blood"],
  [13, "Hemorrhoids are swollen veins in the rectum or anus that can cause pain, discomfort, and bleeding. Dimorphic hemorrhoids are a type of internal hemorrhoid that can protrude through the anus and cause external symptoms as well."],
  [14, "Drug reactions are adverse reactions that occur when a person takes a medication. They can range from mild symptoms such as nausea or a rash, to severe and potentially life-threatening conditions like anaphylaxis. Drug reactions can be caused by a variety of factors, including the individual's genetics, age, and overall health."],
  [15, "Fungal infections are caused by various types of fungi that can affect different parts of the body such as the skin, nails, hair, and mucous membranes. These infections can range from mild to severe and can becontagious if left untreated.Some common fungal infections include athlete's foot,ringworm, thrush, and vaginal yeast infections"],
  [16, "GERD stands for Gastroesophageal Reflux Disease, which is a chronic digestive disorder that occurs when stomach acid flows back into the esophagus, causing irritation and inflammation. This can lead to a range of symptoms, including heartburn, regurgitation, chest pain, difficulty swallowing, and coughing."],
  [17, "Gastroenteritis is a common condition that causes inflammation of the stomach and intestines. It is often caused by a viral or bacterial infection and is characterized by symptoms such as diarrhea, vomiting, nausea, and abdominal pain."],
  [18, "A heart attack, also known as a myocardial infarction, occurs when blood flow to the heart is blocked,often by a blood clot. This can cause damage to the heart muscle and can be life-threatening."],
  [19, "Hepatitis B is a viral infection that affects the liver. It is caused by the hepatitis B virus (HBV), which is transmitted through infected blood and body fluids. The symptoms of hepatitis B can range from mild to severe, and can include fever, fatigue, nausea, jaundice, and abdominal pain."],
  [20, "Hepatitis C is a viral infection that affects the liver, caused by the hepatitis C virus (HCV).HCV is transmitted through contact with infected blood, such as sharing needles or other drug equipment, receiving contaminated blood transfusions or organ transplants before 1992, or less commonly, through sexual contact."],
  [21, "Hepatitis D, also known as delta hepatitis, is a liver infection caused by the hepatitis D virus (HDV). It is a rare and severe form of hepatitis that can only occur in people who are already infected with the hepatitis B virus (HBV)."],
  [22, "Hepatitis E is a viral infection that affects the liver, caused by the hepatitis E virus (HEV).HEV is transmitted through contact with infected fecal matter, such as drinking contaminated water or eating contaminated food, and is more common in areas with poor sanitation."],
  [23, "Hypertension, also known as high blood pressure, is a chronic medical condition in which the force of blood against the walls of the arteries is consistently elevated. It is often called the silent killer, because  it usually has no symptoms, but over time, it can cause serious health problems such as heart disease,stroke, and kidney failure."],
  [24, "Hyperthyroidism happens when the thyroid gland makes too much thyroid hormone. This condition also is called overactive thyroid. Hyperthyroidism speeds up the body's metabolism. That can cause many symptoms, such as weight loss, hand tremors, and rapid or irregular heartbeat."],
  [25, "Hypoglycemia is a condition in which the blood sugar level drops too low, resulting in a variety of symptoms."],
  [26, "Hypothyroidism is a condition in which the thyroid gland doesn't produce enough thyroid hormones, resulting in a slower metabolism and a variety of symptoms."],
  [27, "Impetigo is a highly contagious bacterial skin infection that primarily affects young children. It is caused by the Staphylococcus aureus or Streptococcus pyogenes bacteria and can spread through direct contact with an infected person, or by sharing personal items such as towels, clothing, or bedding."],
  [28, "Jaundice is a medical condition characterized by yellowing of the skin, whites of the eyes and mucous membranes, due to an excess of bilirubin in the blood. Bilirubin is a yellow pigment formed by the breakdown of red blood cells, and it normally passes through the liver and is excreted out of the body through the feces."],
  [29, "Malaria is a serious and sometimes fatal disease caused by a parasite that is transmitted to humans through the bites of infected female mosquitoes. The parasite responsible for malaria is called Plasmodium, and there are five species of this parasite that can infect humans."],
  [30, "Migraine is a neurological condition that causes intense headaches, often accompanied by nausea, sensitivity to light and sound, and sometimes visual disturbances. Migraines can be triggered by a variety of factors, including stress, hormonal changes, certain foods or drinks, lack of sleep, and environmental factors."],
  [31, "Osteoarthritis is a degenerative joint disease that causes the cartilage between joints to break down, leading to pain, stiffness, and decreased mobility."],
  [32, "Paralysis is a condition where a person loses the ability to move one or more muscles in their body. Brain hemorrhage, also known as cerebral hemorrhage, is a type of stroke caused by bleeding in the brain, which can lead to paralysis."],
  [33, "Peptic ulcer disease is a condition in which open sores develop in the lining of the stomach or duodenum (the first part of the small intestine). The primary cause of peptic ulcers is the bacteria Helicobacter pylori (H. pylori) and the use of nonsteroidal anti-inflammatory drugs (NSAIDs) such as aspirin and ibuprofen. Other contributing factors may include excessive alcohol consumption, smoking, stress, and genetics."],
  [34, "Pneumonia is an infection that affects the lungs, causing inflammation and fluid buildup in the air sacs. It can range from mild to severe and can be life-threatening, especially in older adults or those with weakened immune systems."],
  [35, "Psoriasis is a chronic skin condition that causes red, scaly patches on the skin. It can affect any part of the body, including the scalp, nails, and joints."],
  [36, "Tuberculosis (TB) is a bacterial infection that primarily affects the lungs, but can also affect other parts of the body such as the brain, spine, and kidneys.TB is caused by the bacteria Mycobacterium tuberculosis, which is spread through the air when an infected person coughs, sneezes, or talks."],
  [37, "Typhoid fever is an infectious disease caused by the bacterium Salmonella enterica serovar Typhi. It spreads through contaminated food or water, and symptoms include fever, headache, abdominal pain, and diarrhea. If left untreated, typhoid fever can be life-threatening."],
  [38, "A urinary tract infection (UTI) is an infection that occurs in any part of the urinary system, including the kidneys, bladder, ureters, and urethra."],
  [39,"Varicose veins are enlarged, twisted, and bulging veins that typically occur in the legs and feet. They can be unsightly and uncomfortable, and can sometimes lead to more serious complications."],
  [40, "Hepatitis A is a viral infection that affects the liver. It is caused by the Hepatitis A virus (HAV) and is spread through contaminated food or water, or close contact with an infected person. The symptoms of Hepatitis A can include fatigue, nausea, vomiting, abdominal pain, dark urine, and jaundice."]
  ]);

  

  const symptomsFinal =[
    'itching',
    'skin_rash',
    'nodal_skin_eruptions',
    'continuous_sneezing',
    'shivering',
    'chills',
    'joint_pain',
    'stomach_pain',
    'acidity',
    'ulcers_on_tongue',
    'muscle_wasting',
    'vomiting',
    'burning_micturition',
    'spotting_urination',
    'fatigue',
    'weight_gain',
    'anxiety',
    'cold_hands_and_feets',
    'mood_swings',
    'weight_loss',
    'restlessness',
    'lethargy',
    'patches_in_throat',
    'irregular_sugar_level',
    'cough',
    'high_fever',
    'sunken_eyes',
    'breathlessness',
    'sweating',
    'dehydration',
    'indigestion',
    'headache',
    'yellowish_skin',
    'dark_urine',
    'nausea',
    'loss_of_appetite',
    'pain_behind_the_eyes',
    'back_pain',
    'constipation',
    'abdominal_pain',
    'diarrhoea',
    'mild_fever',
    'yellow_urine',
    'yellowing_of_eyes',
    'acute_liver_failure',
    'fluid_overload',
    'swelling_of_stomach',
    'swelled_lymph_nodes',
    'malaise',
    'blurred_and_distorted_vision',
    'phlegm',
    'throat_irritation',
    'redness_of_eyes',
    'sinus_pressure',
    'runny_nose',
    'congestion',
    'chest_pain',
    'weakness_in_limbs',
    'fast_heart_rate',
    'pain_during_bowel_movements',
    'pain_in_anal_region',
    'bloody_stool',
    'irritation_in_anus',
    'neck_pain',
    'dizziness',
    'cramps',
    'bruising',
    'obesity',
    'swollen_legs',
    'swollen_blood_vessels',
    'puffy_face_and_eyes',
    'enlarged_thyroid',
    'brittle_nails',
    'swollen_extremeties',
    'excessive_hunger',
    'extra_marital_contacts',
    'drying_and_tingling_lips',
    'slurred_speech',
    'knee_pain',
    'hip_joint_pain',
    'muscle_weakness',
    'stiff_neck',
    'swelling_joints',
    'movement_stiffness',
    'spinning_movements',
    'loss_of_balance',
    'unsteadiness',
    'weakness_of_one_body_side',
    'loss_of_smell',
    'bladder_discomfort',
    'foul_smell_of urine',
    'continuous_feel_of_urine',
    'passage_of_gases',
    'internal_itching',
    'toxic_look_typhos',
    'depression',
    'irritability',
    'muscle_pain',
    'altered_sensorium',
    'red_spots_over_body',
    'belly_pain',
    'abnormal_menstruation',
    'dischromic_patches',
    'watering_from_eyes',
    'increased_appetite',
    'polyuria',
    'family_history',
    'mucoid_sputum',
    'rusty_sputum',
    'lack_of_concentration',
    'visual_disturbances',
    'receiving_blood_transfusion',
    'receiving_unsterile_injections',
    'coma',
    'stomach_bleeding',
    'distention_of_abdomen',
    'history_of_alcohol_consumption',
    'fluid_over',
    'blood_in_sputum',
    'prominent_veins_on_calf',
    'palpitations',
    'painful_walking',
    'pus_filled_pimples',
    'blackheads',
    'scurring',
    'skin_peeling',
    'silver_like_dusting',
    'small_dents_in_nails',
    'inflammatory_nails',
    'blister',
    'red_sore_around_nose',
    'yellow_crust_ooze'];
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
    
    const reshapedTensor = tf.tensor(inputData, [1, 132]);

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
    if (user !== "guest" && percent > 80) {
      const docRef = await addDoc(collection(db, user), {
        symptoms: selSymptoms,
        disease: diseaseName,
        date: serverTimestamp()
      });
    }

  }

  console.log(disease)


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
