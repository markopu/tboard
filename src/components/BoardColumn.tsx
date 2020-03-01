import * as React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { BoardItem } from './BoardItem'

// Import BoardItem component

// Define types for board column element properties
type BoardColumnProps = {
    key: string
    column: any
    items: any
    onClose: (columnId: string) => void
    onClickNewItem: (columnId: string) => void
    onItemDelete: (itemId: string, columnId: string) => void
    onItemChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        itemId: string,
        columnId: string
    ) => void
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
    isDraggingOver: boolean
}

// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
   // flex: 1;
  
    padding: 8px;
    background-color: #DBDBDB;
    border-radius: 4px;

    //& + & {
    //    margin-left: 12px;
    //}
`
const BoardColumnTitleWraper = styled.div`
    display: flex;
    
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.div`
    font: 14px sans-serif;
    font-weight: bold;
    margin: 8px;
    flex-grow: 1;
`

const CloseColumnBtn = styled.div`
    font: 10px monospace ;
    font-weight: bold;
    background-color: #DBDBDB;
    border: none;
    padding: 2px;
    cursor: pointer;
`

const AddNewItemBtn = styled.div`
    padding: 12px 4px 4px;
    font: 14px sans-serif;
    color: grey;
    cursor: pointer;
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
    min-height: 20px;
    background-color: ${props => (props.isDraggingOver ? '#aecde0' : null)};
    border-radius: 4px;
`

// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = props => {
    return (
        <BoardColumnWrapper>
            <BoardColumnTitleWraper>
                <BoardColumnTitle>{props.column.title}</BoardColumnTitle>
                <CloseColumnBtn onClick={() => props.onClose(props.column.id)}>
                  &#10005;
                </CloseColumnBtn>
            </BoardColumnTitleWraper>

            <Droppable droppableId={props.column.id}>
                {(provided, snapshot) => (
                    <BoardColumnContent
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {/* All board items belong into specific column. */}
                        {props.items.map((item: any, index: number) => (
                            <BoardItem
                                key={item.id}
                                item={item}
                                index={index}
                                onDelete={itemId => props.onItemDelete(itemId, props.column.id)}
                                onChange={e =>
                                    props.onItemChange(
                                        e,
                                        item.id,
                                        props.column.id
                                    )
                                }
                            />
                        ))}
                        {provided.placeholder}
                    </BoardColumnContent>
                )}
            </Droppable>
            <AddNewItemBtn
                onClick={() => props.onClickNewItem(props.column.id)}
            >
                Add a card...
            </AddNewItemBtn>
        </BoardColumnWrapper>
    )
}
