import React, { useEffect, useState } from 'react';
import Autocomplete from 'react-native-autocomplete-input';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, List, TextInput } from 'react-native-paper';
import { Styles } from '../utils/styles';

const filterData = (data, query) => {
  if (!data.length || query === '') {
    return [];
  }
  return data.filter((item) => {
    return !item.label.toLowerCase().search(query.toLowerCase());
  });
};

const compareQuery = (item, text) => {
  if (!item.length) {
    return [];
  }
  return item[0].label.toLowerCase() === text.toLowerCase().trim();
};

const AutocompleteInput = ({ data, setSelectedItem, placeholder }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(filterData(data, query));
  }, [query]);

  useEffect(() => {
    return () => {
      setQuery('');
      setFilteredData([]);
    };
  }, []);

  return (
    <Autocomplete
      autoCorrect={false}
      placeholder={placeholder}
      inputContainerStyle={s.inputContainerStyle}
      data={
        filteredData.length === 1 && compareQuery(filteredData, query)
          ? [] // Close suggestion list in case pill title matches query
          : filteredData
      }
      value={query}
      onChangeText={(text) => setQuery(text)}
      renderTextInput={(props) => (
        <TextInput
          {...props}
          mode="flat"
          underlineColor="transparent"
          outlineColor="transparent"
          returnKeyType="done"
          enablesReturnKeyAutomatically
          style={Styles.input}
        />
      )}
      flatListProps={{
        keyboardShouldPersistTaps: 'always',
        keyExtractor: (pill) => String(pill.id),
        renderItem: ({ item }) => (
          <Pressable
            key={`pressable-${item.id}`}
            onPress={() => {
              setQuery(item.label);
              setSelectedItem(item);
            }}
          >
            <List.Item key={item.id} title={item.label} />
            <Divider key={`divider-${item.id}`} style={s.divider} />
          </Pressable>
        ),
      }}
    />
  );
};

export default AutocompleteInput;

const s = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 0,
  },
});
