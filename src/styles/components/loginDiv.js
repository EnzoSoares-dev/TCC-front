import {styled} from "styled-components";

export const StyledLoginDiv = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    align-content:row;
    flex-direction:column;
    background-color:#A9A9A9;
    margin:${(props)=>props.margin};
    padding:15px;
    gap:5px;
`