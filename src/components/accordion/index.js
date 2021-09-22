import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { List } from 'react-native-paper';
import AccordionSection from "./section";

const AccordionList = ({ searchQuery, data, sections }) => {
  const navigation = useNavigation()

  const [listData, setListData] = useState(data)
  const [expandAll, setExpandAll] = useState(false)

  useEffect(() => {
    const filteredList = filterData(data)
    setListData(filteredList)
    setExpandAll(true)
  }, [searchQuery, data])

  const filterData = (data) => {
    return data.filter((pill) => {
      return !pill.label.toLowerCase().search(searchQuery.toLowerCase())
    })
  }

  const getSectionItems = (id) => {
    return listData.filter((pill) => pill.groups.some((g) => g.id === id));
  };

  const onListItemPress = (item) => {
    navigation.navigate('ViewPillScreen', { name: item.label, pill: item })
  }

  return (
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
  );
};

export default AccordionList;
