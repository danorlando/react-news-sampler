import React, { Component } from 'react';
import axios from 'axios';
import Article from './Article';
import { CSSGrid, layout, makeResponsive } from 'react-stonecutter';
import {calculateTextDimensions} from '../../utils/ui';
import $ from 'jquery';

const Grid = makeResponsive(CSSGrid, { maxWidth: 1440 })

class Display extends Component {
    constructor(props) {
        super(props);

        this.tempProxy = [];
        this.API = '04aab5204fb74b38974c5843de3467ff';
        this.state = {
            articles: [],
            album: {},
            tempPhotos: [],
            photos: [],
            colWidth: 350,
        };
        this.imageLoadComplete = this.imageLoadComplete.bind(this);
        this.calculateAspectRatioFit = this.calculateAspectRatioFit.bind(this);
        this.calculateTextDimensions = this.calculateTextDimensions.bind(this);
    }

    componentDidMount() {
        this.getArticlesBySource(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            if(nextProps.byCategory) {
                this.getArticlesByCategory(nextProps.category);
            }
            else if(nextProps.byKeyword) {
                this.getArticlesByKeyword(nextProps.keyword);
            } 
            else if(nextProps.byCountry) {
                console.log(nextProps.country)
                this.getArticlesByCountry(nextProps.country);
            }     
            else {
                this.setState({
                    url: `https://newsapi.org/v2/top-headlines?sources=${nextProps.default}&apiKey=04aab5204fb74b38974c5843de3467ff`
                });
                this.getArticlesBySource(nextProps.value);
            }
        }
    }

    getArticlesByCountry(country) {
        var self = this;
        this.tempProxy = [];
        this.setState({photos: [], tempPhotos:[]});

        axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.API}`)
            .then((response)=> {
                this.loadArticleData(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
    getArticlesByCategory(category) {
        var self = this;
        this.tempProxy = [];
        this.setState({photos: [], tempPhotos:[]});

        axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${this.API}`)
            .then((response)=> {
                this.loadArticleData(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    getArticlesByKeyword(keyword) {
        var self = this;
        this.tempProxy = [];
        this.setState({ photos: [],  tempPhotos:[]});
        
        axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${this.API}`)
            .then((response) => {
                this.loadArticleData(response);  
            })
            .catch(error => {
                console.log(error);
            })
    }

    getArticlesBySource(source) {
        var self = this;
        this.tempProxy = [];
        this.setState({ photos: [],  tempPhotos:[]});
        axios.get(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${this.API}`)
            .then((response) => {
                this.loadArticleData(response);  
            })
            .catch(error => {
                console.log(error);
            })
    }

    loadArticleData(response) {
        var self = this;
        const data = response.data.articles;
        this.setState({tempPhotos: data})
        for (var i in data) {
            var img = new Image();
            img.src = data[i].urlToImage;
            img.onload = self.imageLoadComplete;
        }
        console.log(data);
        this.setState({ articles: data });
    }
   

    calculateTextDimensions(text, classes, escape) {
        classes = classes || [];
        if (escape === undefined) {
            escape = true;
        }
        classes.push('textDimensionCalculation');
        var div = document.createElement('div');
      //  div.setAttribute('style', 'width: ' + this.state.colWidth) 
        div.setAttribute('class', classes.join(' '));
        if (escape) {
            $(div).text(text);
          //  console.log($(div).text)
        } else {
            div.innerHTML = text;
           // console.log(div.innerHTML)

      }
      document.body.appendChild(div);
      var dimensions = {
          width : jQuery(div).outerWidth(),
          height : jQuery(div).outerHeight()
      };
      div.parentNode.removeChild(div);
      return dimensions;
    };

    imageLoadComplete(e) {
        let self = this;
        for (var i in this.state.tempPhotos) {
            let ph = this.state.tempPhotos[i];
            if(e.target.src == this.state.tempPhotos[i].urlToImage) {
            let imageHeight = self.calculateAspectRatioFit(e.target.width, e.target.height);
              ph.height = imageHeight;
              ph.descTextHeight = this.calculateTextDimensions(ph.description, ['description']).height;
              ph.titleTextHeight = this.calculateTextDimensions(ph.title, ['title']).height ;
              ph.itemHeight = ph.height + ph.descTextHeight + ph.titleTextHeight;
              ph.itemWidth = self.state.colWidth;
              this.tempProxy.push(ph);
              
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
        const {classes} = this.props 
       
        if (articleState && articleState.length > 1) {
           
        }
        return (
            <div style={{height: '100%', width: '100%'}}>
                <Grid 
                    ref="cssgrid"
                    component="ul"
                    columns={3}
                    columnWidth={this.state.colWidth}
                    gutterWidth={5}
                    gutterHeight={5}
                    layout={layout.pinterest}
                    duration={800}
                    easing="ease-out">

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