import React, { createContext, useContext, useState } from 'react'


const StoreContext = createContext(null)

export const useStore = () => {
  return useContext(StoreContext)
}

export const InitialNewPillState = {
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
  const [newPill, setNewPill] = useState(InitialNewPillState)

  const addPill = (pill) => {
    pill.id = index
    setPills([...pills, pill])
    index++
    setNewPill(InitialNewPillState)
  }

  const deletePill = (id) => {
    setPills(pills.filter(p => p.id !== id))
  }

  const addGroup = (value) => {
    const group = {
      id: groupIndex,
      checked: false,
      value
    }
    setGroups([...groups, group])
    groupIndex++
  }

  const deleteGroup = (id) => {
    setGroups(groups.filter(g => g.id !== id))
  }

  const updateGroup = (id, value) => {
    const item = groups.find(i => i.id === id)
    item.checked = value
    const newData = groups.filter(g => g.id !== id)
    newData.push(item)
    setGroups(newData)
  }

  console.log('CONTEXT pills', newPill)

  return { pills, groups, addPill, deletePill, addGroup, deleteGroup, updateGroup, newPill, setNewPill }
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
