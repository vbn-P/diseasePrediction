import React from 'react'
import { Title, Flex, Text, Card, Image, Center, Group,Divider } from '@mantine/core';
import '../css/About.css'

function About() {
  return (
    <div id='about'>


        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap" className='title'>
          <Title order={1} size="50px">
            ABOUT
            <Divider size="xl" color=' #339AF0'/>
          </Title>
          </Flex>
          <Group spacing="sm">
          <Image width={400} height={400} fit="contain" src="/images/about.png" />
          <Text className='abtxt' align='justify'>
          Welcome to MED.ai, the innovative web application that leverages the power of machine learning to predict diseases based on symptoms. With MED.ai, you can now gain valuable insights and early detection, revolutionizing the way healthcare is approached. Using advanced machine learning algorithms trained on extensive medical data, including symptom profiles and disease outcomes, MED.ai accurately assesses the likelihood of various diseases based on reported symptoms. By analyzing this information, MED.ai empowers individuals and healthcare professionals alike to make informed decisions and take proactive measures for better health outcomes.
          MED.ai provides a seamless user experience, making it easy to input symptoms or choose them from a comprehensive database. The system then processes this data, cross-referencing it with its extensive knowledge base to generate a list of potential diseases ranked by their probability.<br /> This valuable information helps users and healthcare professionals alike in making timely and informed decisions.
          What sets MED.ai apart is its continuous learning capability. Through ongoing feedback from users and the incorporation of new medical data, the system continually improves its predictions over time. This adaptive learning process ensures that MED.ai stays up-to-date and offers increasingly accurate disease predictions.
          </Text>

          </Group>

        <Group position="center" spacing={300} className='cardsgroup'>
          <Card shadow="sm" padding="lg" radius="md" withBorder className='card'>
            <Center>
              <Card.Section>
                <Image
                  src="./images/female-doctor-using-her-digital-tablet-free-vector.jpg"
                  width={120}
                  alt="Norway"
                />
              </Card.Section>
            </Center>
            <Text size="sm" color="Black" weight={700} className='cardtext'  align='center' >
              Predicts disease on the basis of symptoms provided.
            </Text>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className='card'>
            <Center>
              <Card.Section>
                <Image
                  src="./images/img_491409.png"
                  width={100}
                  
                  alt="Norway"
                />
              </Card.Section>
            </Center>
            <Text size="sm" color="Black" weight={700} align='center' className='cardtext'>
              Keeps history of past predictions
            </Text>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder className='card'>
            <Center>
              <Card.Section>
                <Image
                  src="./images/Machine-Learning-Icon-Graphics-14022625-1-1-580x387.jpg"
                  width={120}

                  alt="Norway"
                />
              </Card.Section>
            </Center>
            <Text size="sm" color="Black" weight={700} className='cardtext'  align='center' >
              Uses Machine Learning model with an accuracy of 98.5
            </Text>
          </Card>

        </Group>

    </div>
  )
}

export default About