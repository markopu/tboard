import * as React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { BoardColumn } from './BoardColumn'
import { initKanbanData } from '../data/InitData'
import { useState } from 'react'
import { NewBoardInput } from './NewBoardInput'
import { IItem } from './BoardItem'
import { Header } from './Header'
import { IActivity, SideBar } from './SideBar'

// Import data for board

// Import BoardColumn component

// Create styles board element properties
const BoardEl = styled.div`
    //display: flex;
    //align-items: flex-start;
    //flex-wrap: wrap;
    //padding: 0 8px;
    
    display: grid;
   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
   grid-gap: .5rem;
   align-items: flex-start;

    // justify-content: space-between;
`

const BoardHeader = styled.div`
    display: flex;
`

const Welecome = styled.div`
    margin: 8px;
`

const H1 = styled.h3`
    padding: 0 8px;
    color: #ddf1f8;
    margin: 4px;
`

const initAct = [
    {
        text1: 'Dobrodošli! Aktivnosti rada sa itemima se bilježe...',
        text2:  new Date().toLocaleDateString()+ " " + new Date().toLocaleTimeString(),
    },
] as IActivity[]

export const Board: React.FC = () => {
    // Initialize board state with board data
    const [boardState, setBoardState] = useState(initKanbanData)

    const [newBoardTitle, setNewBoardTitle] = useState('')
    const [activites, setActivities] = useState(initAct)

    const datetimeStr = () => new Date().toLocaleDateString()+ " " + new Date().toLocaleTimeString();

    // Handle drag & drop
    const onDragEnd = (result: any) => {
        const { source, destination, draggableId } = result



        // Do nothing if item is dropped outside the list
        if (!destination) {
            return
        }

        // Do nothing if the item is dropped into the same place
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        // Find column from which the item was dragged from
        const columnStart = (boardState.columns as any)[source.droppableId]

        // Find column in which the item was dropped
        const columnFinish = (boardState.columns as any)[
            destination.droppableId
        ]

        console.log(result, "<<---" )

        const activity = {
            text1: "MOVED:" + ' from "' + columnStart.title + '" to "' + columnFinish.title + '".',
            text2: datetimeStr()
        } as IActivity;
        setActivities([...activites, activity ])

        // Moving items in the same list
        if (columnStart === columnFinish) {
            // Get all item ids in currently active list
            const newItemsIds = Array.from(columnStart.itemsIds)

            // Remove the id of dragged item from its original position
            newItemsIds.splice(source.index, 1)

            // Insert the id of dragged item to the new position
            newItemsIds.splice(destination.index, 0, draggableId)

            // Create new, updated, object with data for columns
            const newColumnStart = {
                ...columnStart,
                itemsIds: newItemsIds,
            }

            // Create new board state with updated data for columns
            const newState = {
                ...boardState,
                columns: {
                    ...boardState.columns,
                    [newColumnStart.id]: newColumnStart,
                },
            }

            // Update the board state with new data
            setBoardState(newState)
        } else {
            // Moving items from one list to another
            // Get all item ids in source list
            const newStartItemsIds = Array.from(columnStart.itemsIds)

            // Remove the id of dragged item from its original position
            newStartItemsIds.splice(source.index, 1)

            // Create new, updated, object with data for source column
            const newColumnStart = {
                ...columnStart,
                itemsIds: newStartItemsIds,
            }

            // Get all item ids in destination list
            const newFinishItemsIds = Array.from(columnFinish.itemsIds)

            // Insert the id of dragged item to the new position in destination list
            newFinishItemsIds.splice(destination.index, 0, draggableId)

            // Create new, updated, object with data for destination column
            const newColumnFinish = {
                ...columnFinish,
                itemsIds: newFinishItemsIds,
            }

            // Create new board state with updated data for both, source and destination columns
            const newState = {
                ...boardState,
                columns: {
                    ...boardState.columns,
                    [newColumnStart.id]: newColumnStart,
                    [newColumnFinish.id]: newColumnFinish,
                },
            }

            // Update the board state with new data
            setBoardState(newState)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBoardTitle(e.target.value)
    }

    const hAddNewList = () => {
        const id = new Date().getTime().toString()
        let newColumn = {
            id: id,
            title: newBoardTitle,
            itemsIds: [],
        }

        setNewBoardTitle('')
        setBoardState({
            ...boardState,
            columns: { ...boardState.columns, [id]: newColumn },
            columnsOrder: [...boardState.columnsOrder, id],
        })
    }

    const hCloseColumn = (columnId: string) => {
        let columns = { ...boardState.columns }
        delete columns[columnId]

        const columnsOrder = boardState.columnsOrder.filter(
            key => key !== columnId
        )

        setBoardState({ ...boardState, columnsOrder, columns })
    }

    const hClickNewItem = (columnId: string) => {
        const key = new Date().getTime().toString()
        const newItem = { id: key, content: '' } as IItem
        const newColumnIds = [...boardState.columns[columnId].itemsIds, key]

        setBoardState({
            ...boardState,
            items: { ...boardState.items, [key]: newItem },
            columns: {
                ...boardState.columns,
                [columnId]: {
                    ...boardState.columns[columnId],
                    itemsIds: newColumnIds,
                },
            },
        })

        const activity = {
            text1: "NEW:" + ' item in "' + boardState.columns[columnId].title  + '".',
            text2: datetimeStr()
        } as IActivity;
        setActivities([...activites, activity ])

    }

    const hItemChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        itemId: string,
        columnId: string
    ) => {
        const items = {
            ...boardState.items,
            [itemId]: { ...boardState.items[itemId], content: e.target.value },
        }

        setBoardState({ ...boardState, items })
    }

    const hItemDelete = (itemId: string, columnId: string) => {
        let items = { ...boardState.items }
        delete items[itemId]

        let columns = {
            ...boardState.columns,
            [columnId]: {
                ...boardState.columns[columnId],
                itemsIds: boardState.columns[columnId].itemsIds.filter(
                    id => id !== itemId
                ),
            },
        }
        setBoardState({ ...boardState, items, columns })

        const activity = {
            text1: "DELETED:" + ' item in "' + boardState.columns[columnId].title  + '".',
            text2: datetimeStr()
        } as IActivity;
        setActivities([...activites, activity ])
    }

    console.log('board state:', boardState)
    return (
        <>
            <Header />
            <BoardHeader>
                <Welecome>
                    <H1>Welecome board</H1>
                </Welecome>
            </BoardHeader>
            <BoardEl>
                {/* Create context for drag & drop */}
                <DragDropContext onDragEnd={onDragEnd}>
                    {/* Get all columns in the order specified in 'board-initial-data.ts' */}
                    {boardState.columnsOrder.map(columnId => {
                        // Get id of the current column
                        const column = (boardState.columns as any)[columnId]

                        // Get item belonging to the current column
                        const items = column.itemsIds.map(
                            (itemId: string) =>
                                (boardState.items as any)[itemId]
                        )

                        // Render the BoardColumn component
                        return (
                            <BoardColumn
                                key={column.id}
                                column={column}
                                items={items}
                                onClose={hCloseColumn}
                                onClickNewItem={hClickNewItem}
                                onItemChange={hItemChange}
                                onItemDelete={hItemDelete}
                            />
                        )
                    })}
                </DragDropContext>
                <NewBoardInput
                    onChange={handleChange}
                    title={newBoardTitle}
                    onEnter={hAddNewList}
                />
            </BoardEl>
            <SideBar activities={activites} />
        </>
    )
}
