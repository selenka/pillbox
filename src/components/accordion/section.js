import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';
import theme from '../../utils/theme';

const AccordionSection = ({ group, data, expandAll, onListItemPress }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  const toggle = () => setExpanded(!expanded);

  return (
    <List.Accordion
      key={`section-list-${group.id}`}
      title={group.label}
      expanded={expanded}
      style={s.accordion}
      titleStyle={s.title}
      onPress={toggle}
    >
      {data.map((item) => (
        <Pressable key={`pressable-${item.id}`} onPress={() => onListItemPress(item)}>
          <List.Item key={item.id} title={item.label} />
          <Divider key={`divider-${item.id}`} style={s.divider} />
        </Pressable>
      ))}
    </List.Accordion>
  );
};
export default AccordionSection;

const s = StyleSheet.create({
  accordion: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.accent,
  },
  title: {
    fontWeight: 'bold',
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
});
