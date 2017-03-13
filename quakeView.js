import React, { Component } from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';

export default class QuakeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quakeData: [],
      error: false,
    };
  }

  getRecentQuakes() {
    // For earthquakes in the last hour, use: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson
    // For earthquakes in the last day, use: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson
    // For other options, see the links to the right hand side here: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
    fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson")
    .then(response => response.json())
    .then(json => {
      this.setState({
        quakeData: json.features,
        error: false,
      });
      console.log('Whole response: ', json);
      console.log('Entire features property: ', json.features);
      /*
      for (var i = 0; i < json.features.length; i++) {
        console.log('Item #', i, ' in the array is: ', json.features[i]);
      }
      */
    })
    .catch(err => {
      this.setState({error: true});
      console.warn(err);
    });
  }

  renderError() {
    return (
      <View style={styles.errorContainer}>
        <Button
          title="Retry loading quakes!"
          onPress={() => this.getRecentQuakes()}
          style={styles.button}
        />
        <Text style={styles.errorText}>We found an error fetching the quakes!  Check debugger for details</Text>
      </View>
    );
  }

  renderQuakes() {
    if (this.state.quakeData.length > 0) {
      buttonTitle = "Reload";
    }
    else {
      buttonTitle = "Load Recent Quakes!"
    }

    return (
      <View style={styles.container}>
        <Button
          title={buttonTitle}
          onPress={() => this.getRecentQuakes()}
          style={styles.button}
        />
        <ScrollView>
          {this.state.quakeData.map((quake, i) => (
            <Text
              key={quake.id}
              style={styles.quake}
            >
              {quake.properties.title}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }

  render () {
    if (this.state.error) {
      return this.renderError();
    }
    else {
      return this.renderQuakes();
    }
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
  },
  errorText: {
    color: 'red',
  },
  container: {
    flex: 1,
  },
  button: {
    height: 40,
  },
  quake: {
    textAlign: 'center',
    margin: 1,
  },
});
