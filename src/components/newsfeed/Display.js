import React, { Component } from 'react';
import axios from 'axios';
import Article from './Article';
import { CSSGrid, layout, makeResponsive } from 'react-stonecutter';
import {calculateTextDimensions} from '../../utils/ui'

const Grid = makeResponsive(CSSGrid, { maxWidth: 1440 })

class Display extends Component {
    constructor(props) {
        super(props);

        this.tempProxy = [];

        this.state = {
            articles: [],
            album: {},
            tempPhotos: [],
            photos: [],
            colWidth: 350,
        };
        this.imageLoadComplete = this.imageLoadComplete.bind(this);
        this.calculateAspectRatioFit = this.calculateAspectRatioFit.bind(this);
    }

    componentDidMount() {
        this.getArticles(this.props.default);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({
                url: `https://newsapi.org/v2/top-headlines?sources=${nextProps.default}&apiKey=04aab5204fb74b38974c5843de3467ff`
            });
            this.getArticles(nextProps.default);
        }
    }

    getArticles(url) {
        var self = this;
        this.tempProxy = [];
        this.setState({ photos: [],  tempPhotos:[]});
        const API = '04aab5204fb74b38974c5843de3467ff';
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${url}&apiKey=${API}`)
            .then((response) => {
                const data = response.data.articles;
                this.setState({tempPhotos: data})
                for (var i in data) {
                    var img = new Image();
                    img.src = data[i].urlToImage;
                    img.onload = self.imageLoadComplete;
                }
                console.log(data);
                this.setState({ articles: data });
            })
            .catch(error => {
                console.log(error);
            })
    }

    imageLoadComplete(e) {
        console.log("imageLoadComplete")
        let self = this;
        for (var i in this.state.tempPhotos) {
            let ph = this.state.tempPhotos[i];
            if(e.target.src == this.state.tempPhotos[i].urlToImage) {
            let imageHeight = self.calculateAspectRatioFit(e.target.width, e.target.height);
              ph.height = imageHeight;
              ph.itemHeight = imageHeight + calculateTextDimensions(ph.title, ['caption']).height + calculateTextDimensions(ph.description, ['caption']).height;
                console.log(ph.title)
              ph.itemWidth = self.state.colWidth;
              this.tempProxy.push(ph);
              console.log(this.tempProxy)
            }
          
            
          }
          this.setState({photos: this.tempProxy});
        }

      calculateAspectRatioFit(srcWidth, srcHeight) {
        var ratio = srcWidth / srcHeight;
        var h = this.state.colWidth / ratio;
        return Math.round(h);
      }
    

    render() {
        const articleState = this.state.articles;
        let views = <div>Loading...</div>
       
       
        if (articleState && articleState.length > 1) {
           
        }
        return (
            <div style={{height: '100%', width: '100%'}}>
            <Grid 
                style={{zIndex: -5}}
                ref="cssgrid"
                component="ul"
                columns={3}
                columnWidth={this.state.colWidth}
                gutterWidth={5}
                gutterHeight={5}
                layout={layout.pinterest}
                duration={800}
                easing="ease-out"
            >
    
                {this.state.photos.map((photo, i) => 
                    <li key = {i} itemHeight={photo.itemHeight}>
                        <Article key={photo} details={photo} />
                    </li>
                )}
         
    
            </Grid>
            </div>
        )
        
    }
}


export default Display;