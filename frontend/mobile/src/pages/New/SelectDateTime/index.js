import React, { useEffect, useState } from 'react'

import api from "~/services/api";

import Backgound from '~/components/Background'
import DateInput from '~/components/DateInput'

import { Container, HourList, Hour, Title } from './styles'

function SelectDateTime({ route, navigation }) {
    const [date, setDate] = useState(new Date())
    const [hours, setHours] = useState([])

    const { provider } = route.params


    useEffect(
        () => {
            async function loadAvailable() {
                const response = await api.get(`providers/${provider.id}/available`, {
                    params: {
                        date: date.getTime() //retornar o valor em timeStamp
                    }
                })

                setHours(response.data)
            }

            loadAvailable()
        }, [date, provider.id])


    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            provider,
            time,
        })
    }

    return (
        <Backgound>
            <Container>
                <DateInput date={date} onChange={setDate} />
                <HourList
                    data={hours}
                    keyExtractor={item => item.time}
                    renderItem={({ item: hour }) => (
                        <Hour onPress={() => handleSelectHour(hour.value)} enabled={hour.available}>
                            <Title> { hour.time } </Title>
                        </Hour>
                    )}
                />
            </Container>
        </Backgound>
        )
}

export default SelectDateTime
