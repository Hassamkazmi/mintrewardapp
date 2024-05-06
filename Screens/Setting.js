import React from 'react';
import { StyleSheet, View ,Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMap = () => {
  // Coordinates for a location (e.g., New York City)
  const latitude = 24.862503;
  const longitude = 67.086894;

  

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={"Marker title"}
          description={"Marker description"}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMap;
