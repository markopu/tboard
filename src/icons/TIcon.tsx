import * as React from 'react'
import styled from 'styled-components'

interface ITIconProps {
  size?: string;
  fill?: string;
}

type TIconStyleProps = {
  size?: string
  fill?: string
}
const TI = styled.svg<TIconStyleProps>`
    width: ${props => props.size ? props.size : "16px"};
    height: ${props => props.size ? props.size : "16px"};
    padding-right: 6px;
    fill: ${props => props.fill ? props.fill : "#DDF1F8"};
`
export const TIcon: React.FunctionComponent<ITIconProps> = props => {
    return (
        <>
            <TI size ={props.size} fill={props.fill} viewBox="0 0 17 17">
                <path
                    d="M14.52,2.469H5.482c-1.664,0-3.013,1.349-3.013,3.013v9.038c0,1.662,1.349,3.012,3.013,3.012h9.038c1.662,0,3.012-1.35,3.012-3.012V5.482C17.531,3.818,16.182,2.469,14.52,2.469 M13.012,4.729h2.26v2.259h-2.26V4.729z M10,6.988c1.664,0,3.012,1.349,3.012,3.012c0,1.664-1.348,3.013-3.012,3.013c-1.664,0-3.012-1.349-3.012-3.013C6.988,8.336,8.336,6.988,10,6.988 M16.025,14.52c0,0.831-0.676,1.506-1.506,1.506H5.482c-0.831,0-1.507-0.675-1.507-1.506V9.247h1.583C5.516,9.494,5.482,9.743,5.482,10c0,2.497,2.023,4.52,4.518,4.52c2.494,0,4.52-2.022,4.52-4.52c0-0.257-0.035-0.506-0.076-0.753h1.582V14.52z"
                />
            </TI>
        </>
    )
}
