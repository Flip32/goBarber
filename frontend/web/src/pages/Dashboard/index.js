import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, setHours, setMilliseconds,
        setMinutes, setSeconds, isBefore, isEqual, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import pt from 'date-fns/locale/pt'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import api from "~/services/api";

import { Container, Time } from "./styles";

const range = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]


export default function Dashboard() {
    const [schedule, setSchedule] = useState([])
    const [date, setDate] = useState(new Date())


    // Data mostrada no schedule do Dashboar
    const dateFormatted = useMemo(
        () => format(date, "d 'de' MMMM", { locale: pt }),
        [date]
    )

    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get('schedule', {
                params: { date }
            })


            //Pegando a zona(local) do browser para transformar as datas
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone


            const data = range.map(hour => {

                //Set o array de horas como formato de horas
                const checkDate = setMilliseconds(setSeconds(setMinutes(setHours(date, hour), 0), 0), 0)

                //Transforma a data de hoje (CheckDate) para a data do local acessado pelo Browser
                const compareDate = utcToZonedTime(checkDate, timezone)


                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        isEqual(parseISO(a.date), compareDate)
                    )
                }
            })

            setSchedule(data)
            console.tron.log('appointments', schedule)
        }
        loadSchedule()
    }, [date])


    function handlePrevDay() {
        setDate(subDays(date, 1))
    }

    function handleNextvDay() {
        setDate(addDays(date, 1))
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevDay}>
                    <MdChevronLeft size={36} color="#FFF"/>
                </button>
                <strong> { dateFormatted } </strong>
                <button type="button" onClick={handleNextvDay}>
                    <MdChevronRight size={36} color="#FFF"/>
                </button>
            </header>
            <ul>
                { schedule.map(time => (
                    <Time key={time.time} past={time.past} available={time.appointment}>
                        <strong> { time.time } </strong>
                        <span>{ time.appointment ? time.appointment.user.name : 'Em Aberto' }</span>
                    </Time>
                ))}
            </ul>
        </Container>
    )
}
