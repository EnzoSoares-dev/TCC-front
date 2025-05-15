import { StyledPrimary } from "../styles/components/primary"
export const Primary = ({onClick,content, styles})=>{
    return(
        <StyledPrimary style={styles} onClick={onClick}>{content}</StyledPrimary>
    )
}