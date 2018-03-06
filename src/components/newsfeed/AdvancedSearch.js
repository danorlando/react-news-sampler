import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display';
import { withStyles, Typography } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import Menu, { MenuItem } from 'material-ui/Menu';
import CountrySelector from '../common/CountrySelector'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 200, 
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    formHelperText: {
        fontSize: '17px'
    },
    textField: {
       padding: 0,
       margin: 0,
       width: 300,
      },
    button: {
    
    },
    inputLabel: {
       
    },
    errorText: {
      color: "#ba000d",
      textAlign: "left",
      fontSize: '17px'
    }
  });

class AdvancedSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceData: [],
            source: '',
            keyword: '',
            category: '',
            byKeyword: false,
            byCategory: false,
            country: 'us',
            sortBy: '',
            byCountry: false,
            advancedSearchSubmit: false,
            error: false,
            errorMessage: ''
        }
        this.onAdvancedSearchSubmit = this.onAdvancedSearchSubmit.bind(this);
        this.sourceListApiUrl = 'https://newsapi.org/v2/sources?language=en&apiKey=04aab5204fb74b38974c5843de3467ff'
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get(this.sourceListApiUrl)
            .then((response) => {
                console.log(response)
                let sourcesData = response.data;
                this.setState({ sourceData: sourcesData.sources });
            })
    }

    onAdvancedSearchSubmit(e) {
      //make sure we have a value for the keyword phrase first
      if(this.state.keyword.length > 0) {
        this.setState({
          error: false,
          advancedSearchSubmit: true 
        }); 
      }
      else {
        this.setState({
          error: true,
          errorMessage: "Please enter a keyword or phrase to find news for."
        })
      }
    }

    handleChange = name => event => {
      if(this.state.advancedSearchSubmit) {
        this.setState({advancedSearchSubmit: false})
      }
        this.setState({ 
          [name]: event.target.value });
      };

    // Render Method
    render() {
        const allSources = this.state.sourceData;
        const {classes} = this.props;
        return (
            <div className="row">
            <div className="col-lg-12">
            <div className={classes.root}>
              <FormControl className={classes.formControl}>
                <TextField required
                    id="keyword"
                    className={classes.textField}
                    value={this.state.keyword}
                    onChange={this.handleChange("keyword")}
                    margin="normal"
                    /> 
                    <FormHelperText className={classes.formHelperText}>Keyword or Phrase</FormHelperText>
                    <FormHelperText error className={classes.errorText}>{this.state.error ? this.state.errorMessage : ""}</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                <Select
                    native
                    defaultValue={""}
                    value={this.state.value}
                    onChange={this.handleChange("source")}>
                    <option value={""}>None</option>
                        { Object.keys(allSources).map(paper => <option key={paper} value={allSources[paper].id}>{allSources[paper].name}</option>)}
                </Select>
                <FormHelperText className={classes.formHelperText}>Limit Sources (max. 20)</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                <Select
                    native
                    value={this.state.sortBy}
                    onChange={this.handleChange("sortBy")}>   
                    <option value={"publishedAt"}>Most Recent</option>  
                    <option value={"relevancy"}>Most Relevant</option>
                    <option value={"popularity"}>Most Popular</option>    
                </Select>
                <FormHelperText className={classes.formHelperText}>Sort Function</FormHelperText>
               </FormControl>
               <Button className={classes.formHelperText} type="submit" onClick={this.onAdvancedSearchSubmit}>
                Submit
                </Button>
                </div>
           
              <br />
              <div className="row">
                    <br />
                    <Display source={this.state.source} 
                        keyword={this.state.keyword}
                        category={this.state.category}
                        country={this.state.country}
                        sortBy={this.state.sortBy}
                        byCategory={this.state.byCategory}
                        byKeyword={this.state.byKeyword}
                        byCountry={this.state.byCountry}
                        advancedSearch={true}
                        advancedSearchSubmit={this.state.advancedSearchSubmit}/>
                </div>
            </div>
            </div>
        );
    }
}

export default withStyles(styles)(AdvancedSearch);