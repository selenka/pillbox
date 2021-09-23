import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { Text, Divider, List } from 'react-native-paper';
import AccordionSection from './section';
import theme from '../../utils/theme';

const AccordionList = ({ searchQuery, data, sections }) => {
  const navigation = useNavigation();

  const [listData, setListData] = useState(data);
  const [expandAll, setExpandAll] = useState(false);

  useEffect(() => {
    const filteredList = filterData(data);
    setListData(filteredList);
    setExpandAll(true);
  }, [searchQuery, data]);

  const filterData = (data) => {
    return data.filter((pill) => {
      return !pill.label.toLowerCase().search(searchQuery.toLowerCase());
    });
  };

  const getSectionItems = (id) => {
    return listData.filter((pill) => pill.groups.some((g) => g.id === id));
  };

  const getUncategorizedItems = () => {
    return listData.filter((pill) => pill.groups.length === 0);
  };

  const onListItemPress = (item) => {
    navigation.navigate('ViewPillScreen', { name: item.label, pill: item });
  };

  return (
    <>
      <List.Section>
        {sections.map((group) =>
          getSectionItems(group.id).length ? (
            <AccordionSection
              key={`accordion-${group.id}`}
              expandAll={expandAll}
              group={group}
              data={getSectionItems(group.id)}
              onListItemPress={(item) => onListItemPress(item)}
            />
          ) : null
        )}
      </List.Section>
      <List.Section>
        {getUncategorizedItems().length > 0 && <List.Subheader> Без групп</List.Subheader>}
        {getUncategorizedItems().map((item) => (
          <Pressable
            key={`pressable-uncategorized-${item.id}`}
            onPress={() => onListItemPress(item)}
          >
            <List.Item style={s.item} key={`uncategorized-${item.id}`} title={item.label} />
            <Divider key={`divider-${item.id}`} style={s.divider} />
          </Pressable>
        ))}
      </List.Section>
    </>
  );
};

export default AccordionList;

const s = StyleSheet.create({
  title: {
    paddingVertical: 10,
  },
  item: {
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
});
