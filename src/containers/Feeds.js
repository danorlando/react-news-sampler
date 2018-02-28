import React, {Component} from 'react';
import Select from '../components/newsfeed/Select'


class Feeds extends Component {

  render() {

    return (

      <div> 
        <Select default="bbc-news"/>
      </div>
    )
  }
}

export default Feeds;