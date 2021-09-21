import React from "react";
import { List}  from "react-native-paper";

const AccordionList = ({ data, sections }) => {
    console.log('groups', sections)
    const getSectionItems =  (id) => {
        return data.filter(pill => pill.groups.some(g => g.id === id))
    }
    return (
        <List.Section>
            {sections.map(group => (
                <List.Accordion key={`section-list-${group.id}`} title={group.label} >
                    {getSectionItems(group.id).map(item =>  <List.Item key={item.id} title={item.label} />)}
                </List.Accordion>
            ))}
        </List.Section>
    );
}

export default AccordionList