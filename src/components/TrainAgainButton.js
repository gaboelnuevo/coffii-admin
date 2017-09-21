// in src/comments/ApproveButton.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';

import { BASE_URL, restClient } from '../rest-clients';


class TrainAgainButton extends Component {
    handleClick = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record };
        restClient('CREATE',`coffees/${record.id}/train-again`, {})
            .then(() => {
                record['trained'] = true;
                showNotification('Training completed!');
            })
            .catch((e) => {
                console.error(e);
                showNotification('Error while training', 'warning')
            });
    }

    render() {
        return <FlatButton label={"Train Again"} onClick={this.handleClick} />;
    }
}

TrainAgainButton.propTypes = {
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
})(TrainAgainButton);