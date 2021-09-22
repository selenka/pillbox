import React, {useEffect, useState} from 'react'
import { Pressable } from 'react-native'
import { List } from "react-native-paper";

const AccordionSection = ({ group, data, expandAll, onListItemPress }) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(expandAll)
    }, [expandAll])

    const toggle = () => setExpanded(!expanded)

    return (
        <List.Accordion expanded={expanded} onPress={toggle} key={`section-list-${group.id}`} title={group.label}>
            {data.map((item) => (
                <Pressable  key={`pressable-${item.id}`} onPress={() => onListItemPress(item)}>
                    <List.Item key={item.id} title={item.label} />
                </Pressable>
            ))}
        </List.Accordion>
    )
}
export default AccordionSection