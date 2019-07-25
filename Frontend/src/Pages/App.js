import React from 'react';
import GeoList from './components/geoList';
import GeoFilter from './components/geoFilter';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      appSetUrl: process.env.APP_SET_URL || 'http://localhost:8000/api/getAppData',
    };
    this.removeGoelocation = this.removeGoelocation.bind(this);
    this.getNewAppData = this.getNewAppData.bind(this);
  }

  componentWillMount() {
    this.getNewAppData({});
  }

  getNewAppData({ queryParams }) {
    const url = this.createRequest({ queryParams });
    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          data: [],
        });
      });
  }

  createRequest({ queryParams = {} }) {
    const { limit = 5, filters = [] } = queryParams;
    const { appSetUrl } = this.state;

    const filterQuery = filters.length ? `&filter=${filters.join('&filter=')}` : '';

    const url = `${appSetUrl}?limit=${limit}${filterQuery}`;
    console.log(url);
    return url;
  }

  removeGoelocation(ind) {
    const { data } = this.state;
    const locations = [...data];
    locations.splice(ind, 1);
    this.setState({
      data: locations,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <GeoFilter
          onClick={this.getNewAppData}
        />
        <GeoList
          data={data}
          onClick={this.removeGoelocation}
        />
      </React.Fragment>
    );
  }
}
