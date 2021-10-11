import React, { useEffect, useState } from 'react';
import { LayoutAnimation, NativeModules, Pressable, StyleSheet } from 'react-native';
import { Divider, List } from 'react-native-paper';
import theme from '../../utils/theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const AccordionSection = ({ group, data, expandAll, onListItemPress }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      key={`section-list-${group.id}`}
      title={group.label}
      expanded={expanded}
      style={s.accordion}
      titleStyle={s.title}
      onPress={toggle}
      theme={{ colors: { text: theme.colors.background } }}
    >
      {data.map((item, index) => (
        <Pressable key={`pressable-${item.id}`} onPress={() => onListItemPress(item)}>
          <List.Item key={item.id} title={item.label} />
          {data.length !== index + 1 && <Divider key={`divider-${item.id}`} style={s.divider} />}
        </Pressable>
      ))}
    </List.Accordion>
  );
};
export default AccordionSection;

const s = StyleSheet.create({
  accordion: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 6,
    backgroundColor: theme.colors.accent,
    opacity: 0.7,
  },
  title: {
    fontWeight: 'bold',
    color: theme.colors.background,
  },
  divider: {
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: theme.colors.primary,
  },
});
