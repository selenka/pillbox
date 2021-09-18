import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PRIMARY_DARK, PRIMARY_LIGHT} from '../../utils/constants';
import Checklist from "../../components/checklist";
import Prompt from "../../components/prompt";
import {useModal} from "../../store/modal";
import {useStore} from "../../store";

const updatePillGroups = (pill, item) => {
    let groups = pill.groups || [];
    const itemExists = groups.some(g => g.id === item.id);
    if (itemExists) {
        groups.map(g => g.id === item.id && item)
    } else {
        groups.push(item)
    }
    return { groups }
}

const MedicineGroupScreen = ({ navigation }) => {
    const { open, setVisible } = useModal()
    const { groups, addGroup, newPill, setNewPill } = useStore()
    return (
        <View style={s.container}>
            <View style={{ flex: 2 }}>
                <Checklist
                    data={newPill.groups}
                    list={groups}
                    onItemCheck={(item) => {
                        const pillGroups = updatePillGroups(newPill, item)
                        console.log('>>>pillGroups', pillGroups)
                        setNewPill({
                            ...newPill,
                            ...pillGroups,
                        })
                    }}
                />
            </View>
            <TouchableOpacity
                style={s.button}
                onPress={() => { setVisible(true) }}
            >
                <Text style={s.text}>Создать</Text>
            </TouchableOpacity>
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
        // justifyContent: "center",
        // alignItems: "center",
        // marginTop: 22,
    },
    button: {
        width: '100%',
        height: 80,
        padding: 20,
        backgroundColor: PRIMARY_DARK,
        borderWidth: 1,
        borderColor: PRIMARY_DARK
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        textTransform: 'uppercase',
        textAlign: 'center',
        color: PRIMARY_LIGHT
    }
});

export default MedicineGroupScreen;
