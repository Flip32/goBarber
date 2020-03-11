import React, { useMemo } from 'react'
import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Left, Avatar, Info, Name, Time } from './styles'

function Appointment({ data, onCancel }) {
    const dateParsed = useMemo(
        () => {
            return formatRelative(parseISO(data.date), new Date(), {
                locale: pt,
                addSuffix: true
            })
        },
        [data.date]
    )

    return (
        <Container past={data.past}>
            <Left>
                <Avatar source={{
                    uri: !data.provider.avatar
                        ? 'http://10.0.2.2:3333/files/69159d266d1673cbd4e40f0815d664ec.png'
                        : `https://api.adorable.io/avatar/50/${data.provider.name}.png` }} />
                <Info>
                    <Name> { data.provider.name } </Name>
                    <Time> { dateParsed } </Time>
                </Info>
            </Left>
            { data.cancelable && !data.canceled_at && (
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={20} color="#f64c75" />
                </TouchableOpacity>

            ) }

        </Container>
        )
}

export default Appointment
