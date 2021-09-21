import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper'
import { PRIMARY_LIGHT} from '../../utils/constants';
import Checklist from "../../components/checklist";
import Prompt from "../../components/prompt";
import {useModal} from "../../store/modal";
import {useStore} from "../../store";

const updatePillGroups = (pill, item) => {
    const newPill = pill;
    let groups = newPill.groups || [];
    const itemExists = groups.some(g => g.id === item.id);
    if (itemExists) {
        if (item.checked) {
            groups.map(g => g.id === item.id && item)
        } else {
            groups = groups.filter(g => g.id !== item.id)
        }
    } else {
        groups.push(item)
    }
    return groups
}

const MedicineGroupChecklistScreen = () => {
    const { open, setVisible } = useModal()
    const { groups, addGroup, newPill, setNewPill, updateNewPillGroups } = useStore()
    return (
        <View style={s.container}>
            <View style={{ flex: 2 }}>
                <Checklist
                    data={newPill.groups}
                    list={groups}
                    onItemCheck={(item) => {
                        // const pillGroups = updatePillGroups(newPill, item)
                        // setNewPill({
                        //     ...newPill,
                        //     groups: pillGroups,
                        // })
                        updateNewPillGroups(item)
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
