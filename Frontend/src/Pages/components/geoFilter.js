import React, { useState } from 'react';
import {
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from '@material-ui/core';

const styles = {
  flexContainer: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
  },
};

export default (props) => {
  const { data, onClick } = props;
  const { flexContainer } = styles;
  const [state, setState] = useState({
    limit: 5,
    filters: [
    ],
    location_types: true,
    regions: true,
    cities: true,
    zips: true,
    countries: true,
  });

  const handleChange = name => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleCheck = () => (event) => {
    const { checked, value } = event.target;
    const tempState = { ...state };
    let { filters } = tempState;
    if (value && !checked) {
      filters.push(value);
    } else {
      filters = filters
        .filter(filterName => filterName !== value);
    }
    setState({ ...state, filters, [value]: checked });
  };

  const handleSubmit = () => {
    onClick({ queryParams: state });
  };

  const {
    location_types,
    regions,
    cities,
    zips,
    countries,
  } = state;
  return (
    <Grid container spacing={3} center>
      <Grid item xs={12} style={flexContainer}>
        <Typography>Filter Locations</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={flexContainer}
      >
        <FormControlLabel
          labelPlacement="start"
          value="location_types"
          control={(
            <Checkbox
              checked={location_types}
              onChange={handleCheck()}
            />
          )}
          label="Location Types"
        />
        <FormControlLabel
          labelPlacement="start"
          value="regions"
          control={(
            <Checkbox
              onChange={handleCheck()}
              checked={regions}
            />
            )}
          label="Regions"
        />
        <FormControlLabel
          labelPlacement="start"
          value="countries"
          control={(
            <Checkbox
              checked={countries}
              onChange={handleCheck()}
            />
            )}
          label="Countries"
        />

        <FormControlLabel
          labelPlacement="start"
          value="cities"
          control={(
            <Checkbox
              checked={cities}
              onChange={handleCheck()}
            />
            )}
          label="cities"
        />
        <FormControlLabel
          labelPlacement="start"
          value="zips"
          control={(
            <Checkbox
              checked={zips}
              onChange={handleCheck()}
            />
            )}
          label="Zip Codes"
        />
        <TextField
          type="number"
          defaultValue="5"
          label="Limit"
          inputProps={{ min: 0 }}
          variant="outlined"
          onChange={handleChange('limit')}
        />
      </Grid>
      <Grid item xs={12} style={flexContainer}>
        <Button
          variant="outlined"
          onClick={() => handleSubmit()}
        >
          Update Results
        </Button>
      </Grid>
    </Grid>
  );
};
