import * as React from 'react';

export interface LoadingBoxProps { }

const LoadingBox: React.FC<LoadingBoxProps> = () => {
    return (
        <div className="loading">
            <i className="fa fa-spinner fa-spin"></i>
            Loading ...
        </div>
    )
}

export default LoadingBox;