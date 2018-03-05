import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

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
    inputLabel: {
       
    },
  });

const CountrySelector =(props) => {     


// Render Method
    const {onChange, classes, country} = props;
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
            <Select
                native
                value={country}
                onChange={(e) => onChange(e)}>   
                  <option value="">
                    None
                    </option> 
                <option value={"us"}>United States</option>    
                <option value={"ar"}>Argentina</option>
                <option value={"at"}>Austria</option>   
                <option value={"au"}>Australia</option>
                <option value={"be"}>Belgium</option>
                <option value={"bg"}>Bulgaria</option>    
                <option value={"br"}>Brazil</option>   
                <option value={"ca"}>Canada</option>
                <option value={"cn"}>China</option>
                <option value={"co"}>Columbia</option>
                <option value={"cu"}>Cuba</option>    
                <option value={"cz"}>Czech Republic</option>   
                <option value={"de"}>Germany</option>
                <option value={"eg"}>Egypt</option>   
                <option value={"fr"}>France</option>
                <option value={"gb"}>United Kingdom</option>
                <option value={"gr"}>Greece</option>    
                <option value={"hk"}>Hong Kong</option>   
                <option value={"hu"}>Hungary</option>
                <option value={"id"}>Indonesia</option>
                <option value={"ie"}>Ireland</option>
                <option value={"il"}>Israel</option>    
                <option value={"in"}>India</option>   
                <option value={"it"}>Italy</option>
                <option value={"jp"}>Japan</option>   
                <option value={"kr"}>South Korea</option>
                <option value={"lt"}>Lithuania</option>
                <option value={"lv"}>Latvia</option>    
                <option value={"ma"}>Morocco</option>   
                <option value={"mx"}>Mexico</option>
                <option value={"my"}>Malaysia</option>
                <option value={"ng"}>Nigeria</option>
                <option value={"nl"}>Netherlands</option>    
                <option value={"no"}>Norway</option>   
                <option value={"nz"}>New Zealand</option>
                <option value={"ph"}>Phillipines</option>   
                <option value={"pl"}>Poland</option>
                <option value={"pt"}>Portugal</option>
                <option value={"ro"}>Romania</option>    
                <option value={"rs"}>Serbia</option>   
                <option value={"ru"}>Russia</option>
                <option value={"sa"}>Saudi Arabia</option>
                <option value={"se"}>Sweden</option>
                <option value={"sg"}>Singapore</option>    
                <option value={"si"}>Slovenia</option> 
                <option value={"sk"}>Slovakia</option>    
                <option value={"th"}>Thailand</option>   
                <option value={"tr"}>Turkey</option>
                <option value={"tw"}>Taiwan</option>
                <option value={"ua"}>Ukraine</option>
                <option value={"us"}>United States</option>    
                <option value={"ve"}>Venezuela</option> 
                <option value={"za"}>South Africa</option>
            </Select>
            <FormHelperText className={classes.formHelperText}>Select by Country</FormHelperText>
            </FormControl>
        </div>
    );
}

export default withStyles(styles)(CountrySelector);