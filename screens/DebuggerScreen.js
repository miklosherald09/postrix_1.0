import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { List, ListItem } from "react-native-elements";

export default class DebuggerScreen extends React.Component {
  state = {
    data: [],
    page: 0,
    loading: false
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    console.log('fetching data')
    this.setState({ loading: true });
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users`
    );
    
    const json = await response.json();
    console.log(json)
    json.forEach((v, i) => {
      json[i].page = this.state.page 
    })
    this.setState(state => ({
      data: [...state.data, ...json],
      loading: false
    }));
  };

  handleEnd = () => {
    this.setState(state => ({ page: state.page + 1 }), () => this.fetchData());
  };

  render() {
    return (
      <View>
          <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => String(i)}
            onEndReached={() => this.handleEnd()}
            onEndReachedThreshold={0}
            ListFooterComponent={() =>
              this.state.loading
                ? null
                : <ActivityIndicator size="large" animating />}
            renderItem={({ item }) =>
              <ListItem
                roundAvatar
                // avatar={{ uri: item.picture.thumbnail }}
                title={`${item.id} ${item.page} ${item.name}`}
              />}
          />
      </View>
    );
  }
}