import React, { createContext, useContext, useState } from 'react'


const StoreContext = createContext(null)

export const useStore = () => {
  return useContext(StoreContext)
}

const InitialNewPillState = {
  label: '',
  type: 'pill',
  groups: [],
  quantity: 0,
  quantityType: 'pill',
  expirationDate: new Date()
}
let index = 0;
let groupIndex = 0;
const useProvideStore = () => {
  const [pills, setPills] = useState([])
  const [groups, setGroups] = useState([])
  const [newPill, setNewPill] = useState({ ...InitialNewPillState})

  console.log('InitialNewPillState', InitialNewPillState)
  console.log('index', index)
  console.log('groupIndex', groupIndex)

  const addPill = (pill) => {
    pill.id = index
    setPills([...pills, pill])
    index++
    // setNewPill(InitialNewPillState)
  }

  const deletePill = (id) => {
    setPills(pills.filter(p => p.id !== id))
  }

  const addGroup = (value) => {
    const group = {
      id: groupIndex,
      label: value,
      checked: false
    }
    setGroups([...groups, group])
    groupIndex++
  }

  const deleteGroup = (id) => {
    setGroups(groups.filter(g => g.id !== id))
  }

  const updateNewPillGroups = (item) => {
    const newPillState = newPill
    let pillGroups = newPillState.groups || [];
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


    setNewPill({
      ...newPill,
      groups: pillGroups
    })
  }

  console.log('CONTEXT pills', pills)
  console.log('CONTEXT newPill', newPill)

  return { pills, groups, addPill, deletePill, addGroup, deleteGroup, newPill, setNewPill, updateNewPillGroups }
}

// Use it to wrap content with Store
export const ProvideStore = ({ children }) => {
  const store = useProvideStore()
  return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
  )
}
