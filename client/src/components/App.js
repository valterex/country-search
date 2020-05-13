import React, { Component, Fragment } from "react";
import "../styles/App.css";
import API from "../services/api";
import SearchCountries from "./SearchCountries";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      countries: [],
    };
  }

  componentDidMount() {
    this.setState(() => {
      return { loading: true };
    });

    API.getCountries().then((data) => {
      this.setState(() => {
        return { loading: false, countries: data };
      });
    });
  }

  render() {
    const { countries } = this.state;

    return (
      <Fragment>
        <div className="title-wrapper">
          <h3 className="title">Find the closest country</h3>
        </div>
        <SearchCountries countries={countries} />
      </Fragment>
    );
  }
}

export default App;
