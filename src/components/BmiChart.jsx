import { Stack, Text, Title } from '@mantine/core';
import React from 'react'
import GaugeChart from 'react-gauge-chart'
function BmiChart({ weight, height }) {
    const heightInMeters = height / 100;


    const bmi = weight / (heightInMeters * heightInMeters);

    const roundedBMI = parseFloat(bmi.toFixed(2));

    var val;
    var c;

    if (bmi < 18.5) {
        val = "Underweight";
        c = 0.125
    } else if (bmi >= 18.5 && bmi < 25) {
        val = "Normal weight";
        c = 0.375
    } else if (bmi >= 25 && bmi < 30) {
        val = "Overweight";
        c = 0.625
    } else {
        val = "Obese";
        c = 0.875
    }
    return (
        <div><GaugeChart id="gauge-chart1"
            nrOfLevels={4}
            hideText
            colors={["#A5D6A7", "#4CAF50", "#FBC02D", "#E65100",]}
            percent={c} />
            <Stack align="center">
                <Text>Your BMI: {roundedBMI}</Text>
                <Title order={3}>{val}</Title>
            </Stack>
        </div>
    )
}

export default BmiChart