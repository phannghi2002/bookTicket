/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/config.js';

import { DefaultPage1, DefaultPage2 } from '../DefaultPage';

import Header from '../DefaultPage/Header';
import Content from './Content';
import Footer from '../DefaultPage/Footer';
import SearchRequest from '../SearchRequest';
import NotFoundFlight from '../NotFoundFlight';

const cx = classNames.bind(styles);

function Search() {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [AirportFrom, setAirportFrom] = useState('HAN');
    const [AirportTo, setAirportTo] = useState('');
    const [depart, setDepart] = useState('');
    const [return1, setReturn] = useState('');
    const [typeTrip, setTypeTrip] = useState('');
    const [compare, setCompare] = useState(false);
    const [convert, setConvert] = useState(true);

    const handleGetValueAirportFrom = (e) => {
        setAirportFrom(e.target.value);
    };
    const handleGetValueAirportTo = (e) => {
        setAirportTo(e.target.value);
    };
    const handleGetValueDepart = (e) => {
        setShow(false);
        setDepart(e.target.value);
    };
    const handleGetValueReturn = (e) => {
        setShow(false);
        setReturn(e.target.value);
    };
    const handleClick = (value) => {
        setShow(false);
        setTypeTrip(value);
    };

    const handleRadioClick = (e) => {
        setShow(false);
        // const value = e.target.value;
        setTypeTrip(e.target.value);
    };

    //Oneway
    const handleDataFromChild = (dataFromChild) => {
        if (dataFromChild === 'all' || dataFromChild === '') {
            fetch_API_Go();
        } else if (dataFromChild) {
            fetch_API_Company_Go(dataFromChild);
        }
    };

    //handle Roundtrip
    const [dataFromChild2, setDataFromChild2] = useState('all');

    const handleDataFromChild2 = (dataFromChild) => {
        setDataFromChild2(dataFromChild);
        if (dataFromChild === 'all' || dataFromChild === '') {
            fetch_API_Duration_Go(duration);
            fetch_API_Duration_Return(duration);
        } else if (dataFromChild) {
            fetch_API_Company_Duration_Go(dataFromChild, duration);
            fetch_API_Company_Duration_Return(dataFromChild, duration);
        }
    };

    const [duration, setDuration] = useState(240);
    const getDuration = (duration) => {
        setDuration(duration);
        if (dataFromChild2 === 'all' || dataFromChild2 === '') {
            fetch_API_Duration_Go(duration);
            fetch_API_Duration_Return(duration);
        } else {
            fetch_API_Company_Duration_Go(dataFromChild2, duration);
            fetch_API_Company_Duration_Return(dataFromChild2, duration);
        }
    };

    useEffect(() => {
        if (typeTrip === 'Oneway') {
            setCompare(true);
        } else if (typeTrip === 'Roundtrip') {
            setCompare(false);
        }
        console.log(typeTrip);
    }, [typeTrip, AirportFrom, AirportTo, depart, show]);

    async function fetch_API_Go() {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}`,
        );
        let data1 = await response.json();
        setData(data1.data);
        return data1;
    }
    async function fetch_API_Return() {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearch?AirportFrom=${AirportTo}&AirportTo=${AirportFrom}&DateGo=${return1}`,
        );
        let data1 = await response.json();
        setData2(data1.data);
        return data1;
    }

    async function fetch_API_Company_Go(dataFromChild) {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearchCompany?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}&AirlineCode=${dataFromChild}`,
        );
        let data1 = await response.json();
        setData(data1.data);
        return data1;
    }

    // async function fetchAPI4(dataFromChild) {

    //     let response = await fetch(
    //         `${BASE_URL}/search/getTicketBySearchCompany?AirportFrom=${AirportTo}&AirportTo=${AirportFrom}&DateGo=${return1}&AirlineCode=${dataFromChild}`,
    //     );
    //     let data1 = await response.json();
    //     setData2(data1.data);
    // console.log('in ra anh xem nao 2', data2);
    //     return data1;
    // }

    async function fetch_API_Company_Duration_Go(dataFromChild, duration) {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearchCompanyAndDuration?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}&AirlineCode=${dataFromChild}&Duration=${duration}`,
        );
        let data1 = await response.json();
        setData(data1.data);
        return data1;
    }

    async function fetch_API_Company_Duration_Return(dataFromChild, duration) {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearchCompanyAndDuration?AirportFrom=${AirportTo}&AirportTo=${AirportFrom}&DateGo=${return1}&AirlineCode=${dataFromChild}&Duration=${duration}`,
        );
        let data1 = await response.json();
        setData2(data1.data);

        return data1;
    }

    async function fetch_API_Duration_Go(duration) {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearchDuration?AirportFrom=${AirportFrom}&AirportTo=${AirportTo}&DateGo=${depart}&Duration=${duration}`,
        );
        let data1 = await response.json();
        setData(data1.data);

        return data1;
    }

    async function fetch_API_Duration_Return(duration) {
        let response = await fetch(
            `${BASE_URL}/search/getTicketBySearchDuration?AirportFrom=${AirportTo}&AirportTo=${AirportFrom}&DateGo=${return1}&Duration=${duration}`,
        );
        let data1 = await response.json();
        setData2(data1.data);

        return data1;
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.id === 'txtDate') {
            handleShowFlight();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [depart, return1]);
    const handleShowFlight = () => {
        if (!show) {
            fetch_API_Go();
            localStorage.setItem('TypeTrip', JSON.stringify(typeTrip));
        }

        if (typeTrip === 'Roundtrip') {
            fetch_API_Return();
        }

        setShow(!show);
    };

    const handleConvert = () => {
        setConvert(!convert);
    };

    const [, setSwitchPage] = useState(false);
    const handleSwitchPage = () => {
        setSwitchPage(true);
    };
    const functionNothing = () => {};
    return (
        <div className={cx('container')}>
            <Header />

            {!show && (
                <div className={cx('wrapper')}>
                    <div className={cx('radio')}>
                        <span className={cx('radio-content')}>
                            <input type="radio" id="Oneway" value="Oneway" name="typeTrip" onClick={handleRadioClick} />
                            <label htmlFor="Oneway" onClick={() => handleClick('Oneway')}>
                                Một chiều
                            </label>
                        </span>
                        <span className={cx('radio-content')}>
                            <input
                                type="radio"
                                id="Roundtrip"
                                value="Roundtrip"
                                name="typeTrip"
                                onClick={handleRadioClick}
                            />
                            <label htmlFor="Roundtrip" onClick={() => handleClick('Roundtrip')}>
                                Khứ hồi
                            </label>
                        </span>
                    </div>

                    <div className={cx('location')}>
                        <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot} />
                        <span className={cx('name-field')}>Điểm đi</span>
                        <select className={cx('location-list')} onChange={handleGetValueAirportFrom}>
                            <optgroup label="MIỀN BẮC">
                                <option value="HAN">Hà Nội (HAN) </option>
                                <option value="HPH"> Hải Phòng (HPH) </option>
                                <option value="DIN"> Điện Biên (DIN) </option>
                                <option value="THD"> Thanh Hóa (THD) </option>
                                <option value="VDO"> Quảng Ninh (VDO) </option>
                            </optgroup>
                            <optgroup label="MIỀN TRUNG">
                                <option value="VII"> Vinh (VII) </option>
                                <option value="HUI"> Huế (HUI) </option>
                                <option value="VDH"> Đồng Nai (VDH) </option>
                                <option value="DAD"> Đà Nẵng (DAD) </option>
                                <option value="PXU"> Pleiku (PXU) </option>
                                <option value="TBB"> Tuy Hòa (TBB) </option>
                            </optgroup>
                            <optgroup label="MIỀN NAM">
                                <option value="SGN"> Hồ Chí Minh (SGN) </option>
                                <option value="CXR"> Nha Trang (CXR) </option>
                                <option value="DLI"> Đà Lạt (DLI) </option>
                                <option value="PQC"> Phú Quốc (PQC) </option>
                                <option value="VCL"> Tam Kì (VCL) </option>
                                <option value="UIH"> Qui Nhơn (UIH) </option>
                                <option value="VCA"> Cần Thơ (VCA) </option>
                                <option value="VCS"> Côn Đảo (VCS) </option>
                                <option value="BMV"> Ban Mê Thuật (BMV) </option>
                                <option value="VKG"> Rạch Giá (VKG) </option>
                                <option value="CAH"> Cà Mau (CAH) </option>
                            </optgroup>
                        </select>
                    </div>
                    <div className={cx('location')}>
                        <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot} />
                        <span className={cx('name-field')}>Điểm đến</span>
                        <select className={cx('location-list')} onChange={handleGetValueAirportTo}>
                            <optgroup label="MIỀN BẮC">
                                <option value="HAN">Hà Nội (HAN) </option>
                                <option value="HPH"> Hải Phòng (HPH) </option>
                                <option value="DIN"> Điện Biên (DIN) </option>
                                <option value="THD"> Thanh Hóa (THD) </option>
                                <option value="VDO"> Quảng Ninh (VDO) </option>
                            </optgroup>
                            <optgroup label="MIỀN TRUNG">
                                <option value="VII"> Vinh (VII) </option>
                                <option value="HUI"> Huế (HUI) </option>
                                <option value="VDH"> Đồng Nai (VDH) </option>
                                <option value="DAD"> Đà Nẵng (DAD) </option>
                                <option value="PXU"> Pleiku (PXU) </option>
                                <option value="TBB"> Tuy Hòa (TBB) </option>
                            </optgroup>
                            <optgroup label="MIỀN NAM">
                                <option value="SGN"> Hồ Chí Minh (SGN) </option>
                                <option value="CXR"> Nha Trang (CXR) </option>
                                <option value="DLI"> Đà Lạt (DLI) </option>
                                <option value="PQC"> Phú Quốc (PQC) </option>
                                <option value="VCL"> Tam Kì (VCL) </option>
                                <option value="UIH"> Qui Nhơn (UIH) </option>
                                <option value="VCA"> Cần Thơ (VCA) </option>
                                <option value="VCS"> Côn Đảo (VCS) </option>
                                <option value="BMV"> Ban Mê Thuật (BMV) </option>
                                <option value="VKG"> Rạch Giá (VKG) </option>
                                <option value="CAH"> Cà Mau (CAH) </option>
                            </optgroup>
                        </select>
                    </div>
                    <div className={cx('time')}>
                        <div className={cx('time-content')}>
                            <span className={cx('name-field')}>Ngày đi</span>
                            <input
                                className={cx('input-date')}
                                type="date"
                                name="txtDate"
                                id="txtDate"
                                min="2000-01-01"
                                onChange={handleGetValueDepart}
                            />
                        </div>
                        {!compare && (
                            <div className={cx('time-content', 'left-6')}>
                                <span className={cx('name-field')}>Ngày về</span>
                                <input
                                    className={cx('input-date')}
                                    type="date"
                                    name="txtDate"
                                    id="txtDate"
                                    min="2000-01-01"
                                    onChange={handleGetValueReturn}
                                />
                            </div>
                        )}
                    </div>

                    <div className={cx('submit')}>
                        <button className={cx('submit-btn')} onClick={handleShowFlight}>
                            Tìm chuyến bay
                        </button>
                    </div>
                </div>
            )}

            {show && (
                <div className={cx('info')}>
                    {typeTrip === 'Roundtrip' && (
                        <span className={cx('roundtrip')}>
                            <div className={cx({ depart: convert, return: !convert })}>
                                <span onClick={handleConvert}> Chuyến đi</span>
                                <div className={cx({ return_0: !convert })}>
                                    <DefaultPage1
                                        data={data}
                                        handleConvert={handleConvert}
                                        handleSwitchPage={functionNothing}
                                    />

                                    {!data.length && <NotFoundFlight />}
                                </div>
                            </div>

                            <div className={cx({ depart: !convert, return: convert })}>
                                <span onClick={handleConvert}> Chuyến về</span>
                                <div className={cx({ return_0: convert })}>
                                    <DefaultPage1
                                        data={data2}
                                        handleConvert={functionNothing}
                                        handleSwitchPage={handleSwitchPage}
                                        switchPage="true"
                                    />
                                    {!data2.length && <NotFoundFlight />}
                                </div>
                            </div>

                            <SearchRequest onData2={handleDataFromChild2} getDuration={getDuration} />
                        </span>
                    )}
                    {typeTrip === 'Oneway' && (
                        <DefaultPage2
                            data={data}
                            typeTrip={typeTrip}
                            onData={handleDataFromChild}
                            AirportFrom={AirportFrom}
                            AirportTo={AirportTo}
                            depart={depart}
                        />
                    )}
                </div>
            )}

            <Content />
            <Footer />
        </div>
    );
}

export default Search;
