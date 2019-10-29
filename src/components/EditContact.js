import React, {useState} from "react";
import FormControl from "react-bootstrap/FormControl";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export default ({name, number, pending, onHide, onApply, ...dialogProps}) => {
    const [nameState, setNameState] = useState(name);
    const [numberState, setNumberState] = useState(number);

    const pendingSpinner = (
        <>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span>Saving...</span>
        </>
    );

    const onCancel = () => {
        setNameState('');
        setNumberState('');
        onHide();
    };

    return (
        <Modal {...dialogProps} onHide={onCancel}>
            <Modal.Header closeButton={!pending}>
                <Modal.Title>Edit contact</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormControl
                    placeholder="Name"
                    aria-label="Name"
                    aria-describedby="basic-addon1"
                    value={nameState}
                    onChange={event => setNameState(event.target.value)}/>
                <FormControl
                    placeholder="Number"
                    aria-label="Number"
                    aria-describedby="basic-addon1"
                    value={numberState}
                    onChange={event => setNumberState(event.target.value)}/>
            </Modal.Body>

            <Modal.Footer>
                <Button disabled={pending} variant="secondary" onClick={() => onCancel()}>Cancel</Button>
                <Button disabled={pending} variant="primary"
                        onClick={() => onApply({name: nameState, number: numberState})}>
                    {pending ? pendingSpinner : 'Save'}</Button>
            </Modal.Footer>
        </Modal>
    )
};