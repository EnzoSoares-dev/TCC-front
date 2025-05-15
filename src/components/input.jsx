import { StyledInput } from "../styles/components/input";

export const Input = ({type, placeholder, onChange, onBlur}) =>{
    return(
        <StyledInput onBlur={onBlur} type={type} onChange={onChange} placeholder={placeholder}/>
    )
}