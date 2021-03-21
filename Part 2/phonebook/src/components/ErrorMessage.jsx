import React from 'react';

const ErrorMessage = (props) => {
    if (props.message === null){
        return null;
    }
    const messageStyle = {
        backgroundColor: `lightgrey`,
        borderStyle: 'solid',
        borderColor: props.messageColor,
        color: props.messageColor,
        padding: 15,
    }
    return (
        <span style={messageStyle}>
            Message: '{props.message}'
        </span>
    )
}

export default ErrorMessage;