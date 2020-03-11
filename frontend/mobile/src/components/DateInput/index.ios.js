import React, { useState, useMemo } from 'react'
import { DatePickerIOS } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Icon from 'react-native-vector-icons/MaterialIcons'


import { Container, DateButton, DateText, Picker } from './styles'

function DateInput({ date, onChange }) {
    const [opend, setOpened] = useState(false)

    const dateFormatted = useMemo(
        () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
        [date])

    return (
        <Container>
            <DateButton onPres{() => setOpened(!opened)} >
                <Icon name="event" color="#fff" size={20} />
                <DateText> { dateFormatted } </DateText>
            </DateButton>

            { opend && (
                <Picker>
                    <DatePickerIOS
                        date={date}
                        onDateChange={onChange}
                        minimumDate={new Date()}
                        minuteInterval={60}
                        locale="pt"
                        mode="date"
                        />
                </Picker>
            ) }
        </Container>
        )
}

export default DateInput
