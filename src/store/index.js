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

  const addPill = () => {
    newPill.id = index
    setPills([...pills, newPill])
    index++
    setNewPill(InitialNewPillState)
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

  console.log('CONTEXT pills', pills)
  console.log('CONTEXT newPill', newPill)

  return { pills, groups, addPill, deletePill, addGroup, deleteGroup, newPill, setNewPill }
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
