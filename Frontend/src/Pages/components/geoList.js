import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';

import { Cancel } from '@material-ui/icons/';

const getRows = (rows, onclick) => rows.map((row, ind) => (
  <TableRow key={row.name}>
    <TableCell align="center">{row.name}</TableCell>
    <TableCell align="center">{row.country}</TableCell>
    <TableCell style={{ width: 100 }} align="center">{row.region}</TableCell>
    <TableCell style={{ width: 100 }} align="center">{row.distance_unit}</TableCell>
    <TableCell style={{ width: 100 }} align="center">{row.key}</TableCell>
    <TableCell style={{ width: 100 }} align="center">{row.region_id}</TableCell>
    <TableCell style={{ width: 100 }} align="center">{row.count}</TableCell>
    <TableCell style={{ width: 100 }} aligh="center" onClick={() => { onclick(ind); }}><Cancel /></TableCell>
  </TableRow>
));

export default (props) => {
  const { data, onClick } = props;
  const rows = data || [];

  if (rows.length === 0) {
    return <Typography>No Geolocations!</Typography>;
  }

  return (
    <Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 100 }} align="center">Name</TableCell>
            <TableCell style={{ width: 100 }} align="center">Country</TableCell>
            <TableCell style={{ width: 100 }} align="center">Region</TableCell>
            <TableCell style={{ width: 100 }} align="center">Unit</TableCell>
            <TableCell style={{ width: 100 }} align="center">Key</TableCell>
            <TableCell style={{ width: 100 }} align="center">RegionId</TableCell>
            <TableCell style={{ width: 100 }} align="center">Count</TableCell>
            <TableCell style={{ width: 100 }} align="center">Delete Item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            getRows(rows, onClick)
          }
        </TableBody>
      </Table>
    </Grid>
  );
};
