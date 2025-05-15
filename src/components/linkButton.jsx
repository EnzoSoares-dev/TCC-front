import { StyledLinkButton } from "../styles/components/linkButton"

export const LinkButton = ({content, onClick})=>{
    return <StyledLinkButton onClick={onClick}>{content}</StyledLinkButton>
}