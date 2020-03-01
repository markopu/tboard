import * as React from 'react'
import styled from 'styled-components'
import { TIcon } from '../icons/TIcon'
import { ActivityItem } from './ActivityItem'
import { act } from 'react-dom/test-utils'

export interface IActivity {
    text1: string
    text2: string
}
interface ISideBarProps {
    activities: IActivity[]
}

const RightSideBar = styled.div`
    position: absolute;
    top: 48px;
    right: 0;
    display: flex;
    flex-direction: column;
    border-radius: 4px 0 0 4px;
    justify-content: space-around;
    width: 200px;
    background: #f0f0f0;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 10;
`

const Menu = styled.div`
    display: flex;
`

const MButton = styled.div`
    background-color: #dbdbdb;
    border: none;
    width: 100%;
    padding: 4px;
    font-weight: bold;
    text-align: left;
    font-size: 14px;
    flex-grow: 1;
`
const MenuArrow = styled.div`
    background-color: #dbdbdb;
    padding: 4px;
`

const Members = styled.div``

const AddMembers = styled.div``

const ActivityWraper = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.h4`
    margin: 8px 4px;
`
const Hr = styled.hr`
    color: rgba(0, 0, 0, 0.65);
    width: 100%;
`

export const SideBar: React.FunctionComponent<ISideBarProps> = props => {
    return (
        <RightSideBar>
            <Menu>
                <MButton>Menu</MButton>
                <MenuArrow>&#9662;</MenuArrow>
            </Menu>
            <Hr />
            <ActivityWraper>
                <Title>Activity</Title>

                {props.activities.map(activity => (
                    <ActivityItem
                        textPrimary={activity.text1}
                        textSecondary={activity.text2}
                    />
                ))}
            </ActivityWraper>
        </RightSideBar>
    )
}
