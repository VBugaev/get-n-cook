import React, { Component } from 'react';


class ImagePreview extends Component {
    render() {
        return <img src={this.props.src} alt="preview" />;
    }
}

export default ImagePreview;