import React, {useEffect, useState} from 'react'
import { List } from "react-native-paper";

const AccordionSection = ({ group, data, expandAll  }) => {
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(expandAll)
    }, [expandAll])

    const toggle = () => setExpanded(!expanded)

    return (
        <List.Accordion expanded={expanded} onPress={toggle} key={`section-list-${group.id}`} title={group.label}>
            {data.map((item) => (
                <List.Item key={item.id} title={item.label} />
            ))}
        </List.Accordion>
    )
}
export default AccordionSection