import { StyledSecondary } from "../styles/components/secondary";

export const Secondary = ({onClick, content, style}) =>{
    return(
        <StyledSecondary style={style} onClick={onClick}>{content}</StyledSecondary>
    )
}