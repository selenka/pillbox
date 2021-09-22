import React, { useEffect, useState } from 'react';
import { List } from 'react-native-paper';
import AccordionSection from "./section";

const AccordionList = ({ searchQuery, data, sections }) => {
  const [listData, setListData] = useState(data)
  const [expandAll, setExpandAll] = useState(false)

  useEffect(() => {
    const filteredList = filterData(data)
    setListData(filteredList)
    setExpandAll(true)
  }, [searchQuery])

  const filterData = (data) => {
    return data.filter((pill) => {
      return !pill.label.toLowerCase().search(searchQuery.toLowerCase())
    })
  }

  const getSectionItems = (id) => {
    return listData.filter((pill) => pill.groups.some((g) => g.id === id));
  };

  return (
    <List.Section>
      {sections.map((group) =>
        getSectionItems(group.id).length ? (
            <AccordionSection expandAll={expandAll} group={group} data={getSectionItems(group.id)}/>
        ) : null
      )}
    </List.Section>
  );
};

export default AccordionList;
