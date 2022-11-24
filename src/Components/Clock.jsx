import React, {useEffect, useState} from "react";
import dayjs from "dayjs";

export const Clock = () => {
    const [date, setDate] = useState(dayjs().format('DD.MM.YYYY'))

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000)
    }, [])

    const tick = () => {
        setDate(dayjs().format('DD.MM.YYYY'))
    }

    return (
        <div className='clock'><img src="/calendar-icon.svg" alt=""/>{date}</div>
    )
}