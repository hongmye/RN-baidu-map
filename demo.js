import React, { Component, PropTypes } from "react";

import { MapView, MapTypes, Geolocation } from "react-native-baidu-map";

import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";

import Dimensions from "Dimensions";

export default class baidumapdemo extends Component {
  constructor() {
    super();

    this.state = {
      mayType: MapTypes.NORMAL,
      zoom: 15,
      center: {
        longitude: 114.41709193857623,
        latitude: 30.482797528493
      },
      trafficEnabled: false,
      baiduHeatMapEnabled: false,
      markers: [
        {
          longitude: 114.41709193857623,
          latitude: 30.482797528493,
          title: "我的位置"
        }
      ]
    };
  }
  componentDidMount() {
    // 获取位置
    this._getCurrentPosition();
    this._geocode();
    // this._reverseGeoCode()
    // this._reverseGeoCodeGPS()
  }
  _reverseGeoCode = (lat,lng) => {
    Geolocation.reverseGeoCode(lat,lng)
      .then(data => {
        console.log("reverseGeoCode");
        console.log(data);
      })
      .catch(error => {
        console.warn(error, "error");
      });
  };
  _reverseGeoCodeGPS = () => {
    Geolocation.reverseGeoCodeGPS(30.588422,114.359606)
      .then(data => {
        console.log("reverseGeoCodeGPS");
        console.log(data);
      })
      .catch(error => {
        console.warn(error, "error");
      });
  };
  _geocode = () => {
    Geolocation.geocode("武汉", "光谷天地")
      .then(data => {
        console.log("geocode");
        console.log(data);
      })
      .catch(error => {
        console.warn(error, "error");
      });
  };
  _getCurrentPosition = () => {
    Geolocation.getCurrentPosition()
      .then(data => {
        console.log(data);
        this.setState({
          zoom: 18,
          markers: [
            {
              latitude: data.latitude,
              longitude: data.longitude,
              title: "我的位置"
            }
          ],
          center: {
            latitude: data.latitude,
            longitude: data.longitude
          }
        });
      })
      .catch(error => {
        console.warn(error, "error");
      });
  };
  render() {
    return (
      <View>
        {/* onMapLoaded 地图加载时调用函数 
        onMapClick 点击地图时调用函数,回调经纬度 
        onMapDoubleClick 双击地图时调用,回调经纬度 
        onMarkerClick 点击标记时回调 
        onMapPoiClick 点击(标点,位置)回调,  */}
        <MapView
          trafficEnabled={this.state.trafficEnabled}
          baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
          zoom={this.state.zoom}
          mapType={this.state.mapType}
          center={this.state.center}
          marker={this.state.marker}
          markers={this.state.markers}
          style={styles.map}
          onMarkerClick={e => {
            // console.warn(JSON.stringify(e));
          }}
          onMapClick={e => {
            this._reverseGeoCode(e.latitude,e.longitude)
            console.log(e);
          }}
          onMapPoiClick={e =>{
            this._reverseGeoCode(e.latitude,e.longitude)
            console.log(e);

          }}
        />

        <View style={styles.row}>
          <Button
            title="Normal"
            onPress={() => {
              this.setState({
                mapType: MapTypes.NORMAL
              });
            }}
          />
          <Button
            style={styles.btn}
            title="Satellite"
            onPress={() => {
              this.setState({
                mapType: MapTypes.SATELLITE
              });
            }}
          />

          <Button
            style={styles.btn}
            title="Locate"
            onPress={() => {
              console.warn("center", this.state.center);
              Geolocation.getCurrentPosition()
                .then(data => {
                  console.warn(JSON.stringify(data));
                  this.setState({
                    zoom: 15,
                    marker: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      title: "Your location"
                    },
                    center: {
                      latitude: data.latitude,
                      longitude: data.longitude,
                      rand: Math.random()
                    }
                  });
                })
                .catch(e => {
                  console.warn(e, "error");
                });
            }}
          />
        </View>

        <View style={styles.row}>
          <Button
            title="Zoom+"
            onPress={() => {
              this.setState({
                zoom: this.state.zoom + 1
              });
            }}
          />
          <Button
            title="Zoom-"
            onPress={() => {
              if (this.state.zoom > 0) {
                this.setState({
                  zoom: this.state.zoom - 1
                });
              }
            }}
          />
        </View>

        <View style={styles.row}>
          <Button
            title="Traffic"
            onPress={() => {
              this.setState({
                trafficEnabled: !this.state.trafficEnabled
              });
            }}
          />

          <Button
            title="Baidu HeatMap"
            onPress={() => {
              this.setState({
                baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 200,
    marginBottom: 16
  }
});
