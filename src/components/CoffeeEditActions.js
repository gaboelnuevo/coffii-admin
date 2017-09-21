// in src/comments/CommentEditActions.js
import React from 'react';
import { CardActions } from 'material-ui/Card';
import { ListButton, DeleteButton } from 'admin-on-rest';
import TrainAgainButton from './TrainAgainButton';

import FlatButton from 'material-ui/FlatButton';

import { BASE_URL } from '../rest-clients';


class OpenImageButton extends React.Component {
    handleClick = () => {
        const { record } = this.props;
        window.open(`${BASE_URL}/coffees/${record.id}/thumbnail?size=original`);
    }

    render() {
        return <FlatButton label={"Open image"} onClick={this.handleClick} />;
    }
}

const CoffeeEditActions = ({ basePath, data }) => (
    <CardActions style={{ float: 'right' }}>
        <TrainAgainButton record={data} />
        <OpenImageButton record={data} />
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
    </CardActions>
);

export default CoffeeEditActions;