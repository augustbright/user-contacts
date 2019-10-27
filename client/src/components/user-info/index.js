import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { selectUserDisplayName } from '../../redux/selectors';

const UserInfo = ({ displayName }) => {
    return (
        <div>
            <h6>{displayName}</h6>
            <Button href='/auth/logout'>Logout</Button>
        </div>
    );
};

const mapStateToProps = state => ({
    displayName: selectUserDisplayName(state)
});

export default connect(mapStateToProps)(UserInfo);
