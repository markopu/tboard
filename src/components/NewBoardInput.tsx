import * as React from 'react'
import styled from 'styled-components'

interface INewBoardInputProps {
    title: string
    onEnter: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

interface INewBoardInputStyleProps {
    inputColor?: string
}

const Input = styled.input<INewBoardInputStyleProps>`
    padding: 4px;
    margin: 0 0.5rem 1rem;
    background: #27648b;
    border: none;
    color: white;
    font-size: 14px;
    width: 200px;
    &::-webkit-input-placeholder {
        color: #ddf1f8;
    }
`

export const NewBoardInput: React.FunctionComponent<INewBoardInputProps> = props => {
    const hKeyPress = (target: React.KeyboardEvent<HTMLInputElement>) => {
        if (target.charCode === 13) {
            console.log('... enter pressed')
            props.onEnter()
        }
    }

    return (
        <Input
            value={props.title}
            onKeyPress={hKeyPress}
            onChange={props.onChange}
            placeholder={'Add new list ...'}
        />
    )
}
