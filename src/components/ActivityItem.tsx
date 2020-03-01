import * as React from "react";
import styled from "styled-components";
import { TIcon } from "../icons/TIcon";

interface IActivityItemProps {
  textPrimary: string;
  textSecondary: string;
};

const Hr = styled.hr`
  color: rgba(0, 0, 0, 0.65);
  width: 100%;
`
const Activity = styled.div`
display: flex;
`

const ActivityIcon = styled.div``

const ActivityText = styled.div`
padding: 2px 2px;
`

const PrimaryText = styled.div`
font-size: 14px;
`

const SecondaryText = styled.div`
font-size: 12px;
color: grey;
`

export const ActivityItem: React.FunctionComponent<IActivityItemProps> = (props) => {
  return (
    <>
      <Activity>
        <ActivityIcon>
          <TIcon size={'32px'} fill={'#27648b'} />
        </ActivityIcon>
        <ActivityText>
          <PrimaryText>{props.textPrimary}</PrimaryText>
          <SecondaryText>{props.textSecondary}</SecondaryText>
        </ActivityText>
      </Activity>
      <Hr/>

    </>
  );
};