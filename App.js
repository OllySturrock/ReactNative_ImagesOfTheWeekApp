import React from 'react'
import { FlatList, Text, View, Button, Image, StyleSheet } from 'react-native'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      imageData: null,
    };
  }
  componentDidMount() {
    return fetch('https://demo3594172.mockable.io/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          imageData: responseJson.images,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <Text>loading</Text>
        </View>
      )
    }

    return(
      <View style={styles.base_container}>
        <Text style={{textAlign: 'center'}}>Images of the Week!</Text>
        <FlatList
          data={this.state.imageData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            <View>
              <View style={styles.ImageContainer}>
                <Image
                  style={{width: undefined, height: 300}}
                  source={{uri: item.url}}
                  resizeMode={"contain"}
                />
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base_container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column'
  },
  ImageContainer : {
        flex: 1,
        justifyContent: 'space-between',
        alignSelf: 'stretch'
  }
})
