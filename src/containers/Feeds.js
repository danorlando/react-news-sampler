import React, {Component} from 'react';
import FeedSelect from '../components/newsfeed/FeedSelect'


class Feeds extends Component {

  render() {

    return (

      <div> 
        <FeedSelect value="bbc-news"/>
      </div>
    )
  }
}

export default Feeds;