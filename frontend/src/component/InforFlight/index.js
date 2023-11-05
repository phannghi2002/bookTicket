import "./InforFlight.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function InforFlight({ item, name }) {
  // const navigate = useNavigate();
  const [moneyAdult, setMoneyAdult] = useState(
    item.Oneway.BusinessClass.PriceAdult
  );
  const [moneyChildren, setMoneyChildren] = useState(
    item.Oneway.BusinessClass.PriceChildren
  );

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

  const [selectedValue, setSelectedValue] = useState("business");

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
    localStorage.setItem(
      "inforFlight",
      JSON.stringify({ item, selectedValue, value1, value2, total })
    );
  };

  //change value money adult, money children when change select other
  useEffect(() => {
    if (selectedValue === "economy") {
      setMoneyAdult(item.Oneway.EconomyClass.PriceAdult);
      setMoneyChildren(item.Oneway.EconomyClass.PriceChildren);

      console.log("he");
    } else {
      setMoneyAdult(item.Oneway.BusinessClass.PriceAdult);
      setMoneyChildren(item.Oneway.BusinessClass.PriceChildren);
      console.log("ngu");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue]);

  return (
    <div className="wrapper ms-3">
      <div className="container_1 me-3">
        <div className="info">
          <div className="time">12h30</div>
          <div className="duration">{item.Duration}</div>
          <div className="line"></div>
          <div className="time">14h30</div>
        </div>

        <div className="name">{name}</div>
      </div>

      <div className="container_3">
        <span className="me-4 type_flight">
          <select
            name="travelClass"
            onChange={handleSelectChange}
            value={selectedValue}
          >
            <option value="business">Business Class</option>
            <option value="economy">Economy Class</option>
          </select>
        </span>
        <span className="me-4 traveller">
          <span>
            Adult:
            <button
              className="ms-1"
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

          {!!value1 && <span className="money"> {moneyAdult * value1}</span>}
        </span>
        <span className="ms-4 traveller">
          <span>
            Children:
            <button
              className="ms-1"
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

          {!!value2 && <span className="money"> {moneyChildren * value2}</span>}
        </span>
        <span className="total ms-3">
          <h5 className="total_1">Total</h5>
          <div className="total_2">{total}</div>
        </span>

        <span className="ms-3">
          {/* {navigate("/searchFlightRoundtrip")} */}
          {/* if not use Link then can use ("/searchFlightRoundtrip/check") */}
          <Link to="check">
            <Button className="select" onClick={handleSelect}>
              Select <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default InforFlight;