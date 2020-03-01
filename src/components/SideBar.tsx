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
    onClick: () => void;
    show: boolean;
}

const RightSideBar = styled.div`
    //position: absolute;
    //top: 40px;
    //right: 0;
    //display: flex;
    //flex-direction: column;
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

type RSBWrapStyleProps = {
  show : boolean;
}
const RSBWrap = styled.div<RSBWrapStyleProps>`
    position: absolute;
    top: 40px;
    right: 0;
    display: flex;
    
    width: ${props => props.show ? "230px" : "30px"};
    transition: .5ms;
`

const ColumnWrap = styled.div`
    display: flex;
    flex-direction: column;
    color: transparent;
`
const PH1 = styled.div`
    height: 8px;
    background-color: transparent;
`

const PH2 = styled.div`
    height: 30px;
    background-color: #f0f0f0;
    width: 30px;
    border-radius: 4px 0 0 4px;
    color: gray;
    display: flex;
    justify-content: center;   
    align-items: center;
    font-size: 12px;
    cursor: pointer;
`

export const SideBar: React.FunctionComponent<ISideBarProps> = props => {
    return (
      <RSBWrap show={props.show}>
        <ColumnWrap>
          <PH1>{" "}</PH1>
          <PH2 onClick={props.onClick}>&#x25BA;</PH2>

        </ColumnWrap>
        <RightSideBar>
        <Menu>
          <MButton>Menu</MButton>
          <MenuArrow>&#9662;</MenuArrow>
        </Menu>
        <Hr/>
        <ActivityWraper>
          <Title>Activity</Title>

          {props.activities.map((activity,index) => (
            <ActivityItem
              key={index}
              textPrimary={activity.text1}
              textSecondary={activity.text2}
            />
          ))}
        </ActivityWraper>
      </RightSideBar></RSBWrap>
    )
}
