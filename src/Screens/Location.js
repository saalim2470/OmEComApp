import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Location = () => {
  const [marker, setMarker] = useState({
    latitude: 21.7679,
    longitude: 78.8718,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [map, setMap] = useState(null);
  const [snap, setSnap] = useState("");
  const takeSnapshot = () => {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = map.takeSnapshot({
      width: 300, // optional, when omitted the view-width is used
      height: 300, // optional, when omitted the view-height is used
      //   region: {..},    // iOS only, optional region to render
      format: "png", // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: "file", // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      //   this.setState({ mapSnapshot: uri });
      setSnap(uri);
      console.log(uri);
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        ref={(map) => {
          setMap(map);
        }}
        style={{ width: 500, height: 400 }}
        provider={PROVIDER_GOOGLE}
        onRegionChange={(region) => {
          setMarker(region);
        }}
        initialRegion={marker}
      >
        <Marker
          draggable
          onDragEnd={(e) => {
            console.log(e.nativeEvent);
          }}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
      <TouchableOpacity
        style={{ alignSelf: "center", borderWidth: 1, padding: 10 }}
        onPress={() => {
          takeSnapshot();
        }}
      >
        <Text>Snap shot</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          width: 300,
          height: 300,
          alignSelf: "center",
          marginTop: 20,
        }}
      >
        <Image
          source={{
            uri: snap,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Location;
