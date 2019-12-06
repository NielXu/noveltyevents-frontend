import React from 'react';
import ImageGallery from 'react-image-gallery';
import { EVENTS_IMAGES_MOCK_FACTORY as FACTORY } from '../tools';
import Loader from '../components/Loader';
import './PastEvents.css';

export default class PastEvents extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      images: [],
      loading: true,
    }
  }

  componentDidMount() {
    FACTORY.getDataDelay(800, (data) => {
      this.setState({ images: data, loading: false });
    });
  }

  render() {
    return (
      <div>
        <Loader
          loading={this.state.loading}
          component={
            <div className="gallery-container">
              <ImageGallery items={this.state.images} />
            </div>
          }
        />
      </div>
    )
  }
}