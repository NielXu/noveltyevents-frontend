import React from 'react';
import ImageGallery from 'react-image-gallery';
import './PastEvents.css';

export default class PastEvents extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      images: [
        {
          original: 'https://picsum.photos/id/1018/1000/600/',
          thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/600/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/600/',
          thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <ImageGallery items={this.state.images} />
      </div>
    )
  }
}