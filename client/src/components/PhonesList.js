import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import PhoneItem from "./PhoneItem";
import {connect} from 'react-redux';
import {selectContacts} from "../redux/selectors";
import PhonesHeader from "./PhonesHeader";

const PhonesList = ({phones}) => {
    return (
        <>
            <PhonesHeader/>
            <ListGroup>
                {phones.map(phone => <PhoneItem key={phone._id} {...phone}/>)}
            </ListGroup>
        </>
    );
};

const mapStateToProps = state => ({
    phones: selectContacts(state)
});

export default connect(mapStateToProps)(PhonesList);
