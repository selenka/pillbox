import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'
import { PRIMARY_LIGHT} from '../../utils/constants';
import Checklist from "../../components/checklist";
import Prompt from "../../components/prompt";
import {useModal} from "../../store/modal";
import {useStore} from "../../store";

const updatePillGroups = (pill, item) => {
    let pillGroups = pill.groups.concat([]) || [];
    const itemExists = pillGroups.some(g => g.id === item.id);
    if (itemExists) {
        if (item.checked) {
            pillGroups.map(g => g.id === item.id && item)
        } else {
            pillGroups.filter(g => g.id !== item.id)
        }
    } else {
        pillGroups.push(item)
    }
    return pillGroups
}

const MedicineGroupChecklistScreen = () => {
    const { open, setVisible } = useModal()
    const { groups, addGroup, newPill, setNewPill } = useStore()
    const pillGroups = newPill.groups
    return (
        <View style={s.container}>
            <View style={{ flex: 2 }}>
                <Checklist
                    data={pillGroups}
                    list={groups}
                    onItemCheck={(item) => {
                        setNewPill({
                            ...newPill,
                            groups: updatePillGroups(newPill, item),
                        })
                    }}
                />
            </View>
            <Button mode="contained" style={s.button} onPress={() => { setVisible(true) }} contentStyle={s.buttonContent}>
                Создать
            </Button>
            <Prompt
                open={open}
                setVisible={setVisible}
                title="Введите название группы:"
                onConfirm={(value) => { addGroup(value) }}
            />
        </View>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        borderRadius: 0,
    },
    buttonContent: {
      padding: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: PRIMARY_LIGHT
    }
});

export default MedicineGroupChecklistScreen;
