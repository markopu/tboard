import * as React from 'react'
import styled from 'styled-components'
import { createRef, useEffect, useRef, useState } from 'react'

interface IBoardItemInputProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDeleteItem: () => void
}

const Input = styled.input`
    font: 14px sans-serif;
    background: #e5eff5;
    border-radius: 3px;
    border: none;
    padding: 4px;
    width: 100%;
    box-sizing: border-box;
`

const Text = styled.div`
    font: 14px sans-serif;
`

const EditBtn = styled.div`
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
    width: 1rem;
    margin-top: 4px;
    cursor: pointer;
    &:hover {
      background-color: #e5eff5;
    }
`

const WrapText = styled.div``

export const BoardItemInput: React.FunctionComponent<IBoardItemInputProps> = props => {
    const [active, setActive] = useState(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    const [inputEl, setInputEl] = useState<HTMLInputElement | null>(null)

    const hEnter = () => {
        setActive(false)
        if (props.value.length === 0) {
            props.onDeleteItem()
        }
    }
    const hKeyPress = (target: React.KeyboardEvent<HTMLInputElement>) => {
        if (target.charCode === 13) {
            console.log('... enter pressed')
            hEnter()
        }
    }

    useEffect(() => {
        if (props.value.length === 0) setActive(true)
    }, [])

    const hClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setActive(true)
    }

    useEffect(() => {

        active && inputRef.current!.focus()
    }, [active])

    return (
        <>
            {active ? (
                <Input
                    ref={inputRef}
                    onBlur={() => hEnter()}
                    value={props.value}
                    onKeyPress={hKeyPress}
                    onChange={props.onChange}
                />
            ) : (
                <WrapText>
                    <Text >{props.value}</Text>
                    <EditBtn onClick={hClick}>&#9998;</EditBtn>
                </WrapText>
            )}
        </>
    )
}
