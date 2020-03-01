import * as React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { BoardItemInput } from "./BoardItemInput";

export interface IItem {
    id: string
    content: string
}

interface IBoardItemProps {
    index: number
    item: IItem
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void
    onDelete : (itemId: string) => void

}

type BoardItemStylesProps = {
    isDragging: boolean
}

const BoardItemEl = styled.div<BoardItemStylesProps>`
    padding: 8px;
    background-color: ${props => (props.isDragging ? '#d3e4ee' : '#fff')};
    border-radius: 4px;
    transition: background-color 0.25s ease-out;

    &:hover {
        background-color: #f7fafc;
    }

    & + & {
        margin-top: 4px;
    }
`



export const BoardItem: React.FunctionComponent<IBoardItemProps> = props => {

    const hDelete = () => {
        props.onDelete(props.item.id)
    }
    return (
        <Draggable draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => (
                <BoardItemEl
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    {/* The content of the BoardItem */}

                    <BoardItemInput value={props.item.content} onChange={props.onChange} onDeleteItem={hDelete}/>
                </BoardItemEl>
            )}
        </Draggable>
    )
}
