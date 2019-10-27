import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import EditContact from "./EditContact";
import {deleteContact, updateContact} from "../redux/action";
import {connect} from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PhoneItem = ({id, number, name, updatePhone, deletePhone}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogPending, setDialogPending] = useState(false);

    return (
        <>
            <ListGroup.Item>
                <h6>{name}</h6>
                <span>{number}</span>
                <Container>
                    <Row>
                        <Col/>
                        <Col md='auto'>
                            <ButtonGroup size="sm">
                                <Button variant="primary" onClick={() => setShowDialog(true)}>Edit</Button>
                                <Button variant="danger" onClick={() => deletePhone(id)}>Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>

            <EditContact show={showDialog}
                         pending={dialogPending} {...{name, number}}
                         onApply={async ({name, number}) => {
                             setDialogPending(true);
                             try {
                                 await updatePhone({id, name, number})
                                 setShowDialog(false);
                             } catch (e) {
                             }
                             setDialogPending(false);
                         }}
                         onHide={() => {
                             setShowDialog(false)
                         }}
            />
        </>
    );
};

const mapStateToProps = (state, {_id: id, number, name}) => ({id, number, name});
const mapDispatchToProps = dispatch => ({
    updatePhone: ({id, name, number}) => dispatch(updateContact({id, name, number})),
    deletePhone: id => dispatch(deleteContact(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneItem);
