import React from 'react'
import '../css/Team.css'
import { Title, Divider, Group, Text, Image, Card, Center, Flex } from '@mantine/core';

function Team() {
    return (
        <div className='team' id='team'>
            <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap" className='title'>
                <Title order={1} size="50px">
                    MEET THE TEAM
                    <Divider size="xl" color=' #339AF0' />
                </Title>
            </Flex>
            <Group position="center" spacing={100} className='cardsgroup'>
                <Card shadow="sm" padding={0} radius="md" className='teamcard'>
                    <Center>
                        <Card.Section>
                            <Image
                                src="./images/team/rohith.jpg"
                                width={200}
                                height={200}

                                alt="Norway"
                            />
                        </Card.Section>
                    </Center>
                    <Text size="md" color="Black" weight={700} align='center' className='cardtext2' >
                        N Rohith Nair
                    </Text>
                    <Text size="xs" color="Black" weight={700} align='center'>
                        S8-CSE B
                    </Text>


                </Card>
                <Card shadow="sm" padding={0} radius="md" withBorder >
                    <Center>
                        <Card.Section>
                            <Image
                                src="./images/team/nafia.jpg"
                                width={200}
                                height={200}


                                alt="Norway"
                            />
                        </Card.Section>
                    </Center>
                    <Text size="md" color="Black" weight={700} align='center' className='cardtext2'>
                        Nafia Fathima
                    </Text>
                    <Text size="xs" color="Black" weight={700} align='center' >
                        S8-CSE B
                    </Text>

                </Card>
                <Card shadow="sm" padding={0} radius="md" >
                    <Center>
                        <Card.Section>
                            <Image
                                src="./images/team/skv.jpg"
                                width={200}
                                height={200}

                                alt="Norway"
                            />
                        </Card.Section>
                    </Center>
                    <Text size="md" color="Black" weight={700} align='center' className='cardtext2' >
                        Sreelakshmi K V
                    </Text>
                    <Text size="xs" color="Black" weight={700} align='center' >
                        S8-CSE B
                    </Text>
                </Card>
                <Card shadow="sm" padding={0} radius="md">
                    <Center>
                        <Card.Section>
                            <Image
                                src="./images/team/vibin.jpg"
                                width={200}
                                height={200}
                                alt="Norway"
                            />
                        </Card.Section>
                    </Center>
                    <Text size="md" color="Black" weight={700} align='center' className='cardtext2' >
                    Vibin P
                    </Text>
                    <Text size="xs" color="Black" weight={700} align='center' >
                    S8-CSE B
                    </Text>
                    </Card>

            </Group>
        </div>
    )
}

export default Team
