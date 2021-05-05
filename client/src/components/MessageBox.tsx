import * as React from 'react';

export interface MessageBoxProps {
    variant: any
}

const MessageBox: React.FC<MessageBoxProps> = (props) => {
    return (
        <div className={`alert alert-${props.variant || "info"}`}>
            {props.children}
        </div>
    );
}

export default MessageBox;