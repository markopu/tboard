import * as React from "react";
import styled from "styled-components";
import { TIcon } from "../icons/TIcon";

interface IHeaderProps {}

const Nav = styled.div`
    background-color: #27648b;
    border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`

const NavHeader = styled.div`
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 4px;
`
const NavLeft = styled.div`
    width: 25%;
    text-align: left;
    display: flex;
`
const NavCenter = styled.div`
    width: 25%;
    text-align: center;
`

const BoardBttn = styled.button`
    font-weight: bolder;
    padding: 4px 4px;
    border-radius: 3px;
    border: none;
    font-size: 14px;
    background-color: #4f88aa;
    color: #ddf1f8;
    letter-spacing: -0.05rem;
`

const Input = styled.input`
    font-size: 14px;
    border: none;
    color: #262626;

   
    cursor: text;
    font-weight: 300;
    text-align: center;
    background: #8BB0C4;
    &:active,
    &:focus {
        text-align: left;
    }
`
const NavRight = styled.div`
    width: 33.333%;
    text-align: right;
    svg {
        margin-right: 20px;
    }
`
const MenuLink = styled.a``

const IconTextWraper = styled.div`
    display: flex;
`

const Text = styled.div`
padding-right: 4px;
`

const SearchBox = styled.div`
  display: flex;
  margin-left: 6px;
`

export const Header: React.FunctionComponent<IHeaderProps> = props => {
    return (
        <Nav>
            <NavHeader>
                <NavLeft>
                    {' '}
                    <BoardBttn>
                        <IconTextWraper>
                            <TIcon />
                            <Text>Boards</Text>
                        </IconTextWraper>
                    </BoardBttn>
                    <SearchBox>
                        <Input/>
                    </SearchBox>
                </NavLeft>
                <NavCenter>
                </NavCenter>
                <NavRight>
                    <MenuLink href="#">{/*<Compass />*/}</MenuLink>
                    <MenuLink href="#">{/*<Explore />*/}</MenuLink>
                    <MenuLink href="#">{/*<Avatar />*/}</MenuLink>
                </NavRight>
            </NavHeader>
        </Nav>
    )
}
