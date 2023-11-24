import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './InforFlightRoundTrip.module.scss';

const cx = classNames.bind(styles);

function InforFlightRoundTrip({ item, name }) {
    const [moneyAdult, setMoneyAdult] = useState(item.Roundtrip.BusinessClass.PriceAdult);
    const [moneyChildren, setMoneyChildren] = useState(item.Roundtrip.BusinessClass.PriceChildren);

    // const [show, setShow] = useState(true);
    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(0);
    const [total, setTotal] = useState(moneyAdult);

    //change value total when click add or subtract quantity
    useEffect(() => {
        setTotal(moneyAdult * value1 + moneyChildren * value2);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value1, value2, moneyAdult, moneyChildren]);

    const handleClickAddAdult = (value) => {
        setValue1(value + 1);
    };
    const handleClickSubtractAdult = (value) => {
        setValue1(value - 1);
    };

    const handleClickAddChildren = (value) => {
        setValue2(value + 1);
    };
    const handleClickSubtractChildren = (value) => {
        setValue2(value - 1);
    };

    const [selectedValue, setSelectedValue] = useState('Economy Class');

    //get value in element select
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        // console.log(value);
        // Perform further actions with the selected value
    };

    const handleSelect = () => {
        // Store bookedButton in localStorage
        console.log(item);
        localStorage.setItem('inforFlight', JSON.stringify({ item, selectedValue, value1, value2, total }));
    };

    const convertTime = (time) => {
        const date = new Date(time);
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const formattedDateTime = `${hour}:${minute}`;
        return formattedDateTime;
    };
    const FlightTime = convertTime(item.Roundtrip.FlightTime);
    const LandingTime = convertTime(item.Roundtrip.LandingTime);

    const duration = (FlightTime, LandingTime) => {
        const [startHour, startMinute] = FlightTime.split(':');
        const [endHour, endMinute] = LandingTime.split(':');

        // Convert the hours and minutes to numbers
        const startHourNum = parseInt(startHour, 10);
        const startMinuteNum = parseInt(startMinute, 10);
        const endHourNum = parseInt(endHour, 10);
        const endMinuteNum = parseInt(endMinute, 10);

        // Calculate the difference in minutes
        const hourDifference = endHourNum - startHourNum;
        const minuteDifference = endMinuteNum - startMinuteNum;
        const totalMinutes = hourDifference * 60 + minuteDifference;

        return totalMinutes;
    };
    const convertMinutesToHourMinute = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h${remainingMinutes}`;
    };

    //change value money adult, money children when change select other
    useEffect(() => {
        if (selectedValue === 'Economy Class') {
            setMoneyAdult(item.Oneway.EconomyClass.PriceAdult);
            setMoneyChildren(item.Oneway.EconomyClass.PriceChildren);
        } else if (selectedValue === 'Business Class') {
            setMoneyAdult(item.Oneway.BusinessClass.PriceAdult);
            setMoneyChildren(item.Oneway.BusinessClass.PriceChildren);
            // console.log(convertTime(item.Oneway.FlightTime));
        } else if (selectedValue === 'First Class') {
            setMoneyAdult(item.Oneway.FirstClass.PriceAdult);
            setMoneyChildren(item.Oneway.FirstClass.PriceChildren);
            // console.log(convertTime(item.Oneway.FlightTime));
        } else {
            setMoneyAdult(item.Oneway.PremiumClass.PriceAdult);
            setMoneyChildren(item.Oneway.PremiumClass.PriceChildren);
            // console.log(convertTime(item.Oneway.FlightTime));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValue]);

    return (
        <div className={cx('wrapper ', 'ms-8')}>
            <div className={cx('container_1', ' me-3')}>
                <div className={cx('info')}>
                    <div className={cx('time')}>{FlightTime}</div>
                    <div className={cx('duration')}>
                        {convertMinutesToHourMinute(duration(FlightTime, LandingTime))}
                    </div>
                    <div className={cx('line')}></div>
                    <div className={cx('time')}>{LandingTime}</div>
                </div>

                <div className={cx('name')}>{name}</div>
            </div>

            <div className={cx('container_3')}>
                <span className={cx('me-4', ' type_flight')}>
                    <select name="travelClass" onChange={handleSelectChange} value={selectedValue}>
                        <option value="Business Class">Business Class</option>
                        <option value="Economy Class">Economy Class</option>
                        <option value="First Class">First Class</option>
                        <option value="Premium Class">Premium Class</option>
                    </select>
                </span>
                <span className={cx('me-4', ' traveller')}>
                    <span>
                        Adult:
                        <button
                            className={cx('ms-1')}
                            disabled={!value1}
                            onClick={() => handleClickSubtractAdult(value1)}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input type="number" value={value1} readOnly />
                        <button onClick={() => handleClickAddAdult(value1)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>

                    {!!value1 && <span className={cx('money')}> {moneyAdult * value1}</span>}
                </span>
                <span className={cx('ms-4 ', 'traveller')}>
                    <span>
                        Children:
                        <button
                            className={cx('ms-1')}
                            disabled={!value2}
                            onClick={() => handleClickSubtractChildren(value2)}
                        >
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <input type="number" value={value2} readOnly />
                        <button onClick={() => handleClickAddChildren(value2)}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </span>

                    {!!value2 && <span className={cx('money')}> {moneyChildren * value2}</span>}
                </span>
                <span className={cx('total_0', ' ms-3')}>
                    <h5 className={cx('total_1')}>Total</h5>
                    <div className={cx('total_2')}>{total}</div>
                </span>

                <span className={cx('ms-3')}>
                    {/* {navigate('/searchFlightRoundtrip')} */}
                    {/* if not use Link then can use ('/searchFlightRoundtrip/check') */}
                </span>
            </div>
        </div>
    );
}

export default InforFlightRoundTrip;