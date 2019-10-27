import React, {useState} from 'react';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import EditContact from "./EditContact";
import {connect} from 'react-redux';
import {putContact} from "../redux/action";

const PhonesHeader = ({savePhone}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [dialogPending, setDialogPending] = useState(false);

    return (
        <>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setShowDialog(true)}>+ Contact</Button>
            </ButtonToolbar>
            <EditContact name='' number=''
                         show={showDialog}
                         pending={dialogPending}
                         onApply={async ({name, number}) => {
                             setDialogPending(true);
                             try {
                                 await savePhone({name, number});
                                 setShowDialog(false);
                             } catch (e) {
                             }
                             setDialogPending(false);
                         }}
                         onHide={() => setShowDialog(false)}/>

        </>
    );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    savePhone: ({number, name}) => dispatch(putContact({number, name}))
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonesHeader);
