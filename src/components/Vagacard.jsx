export const VagaCard = ({vaga,setVagaModal, setVagaId}) => {
    const modalOpen = document.getElementById("modalOpen");


    const handleClick = () => {
        setVagaModal(vaga)
        setVagaId(vaga._id)
        modalOpen.showModal();
    }

    return(
        <div style={{backgroundColor:"#F5F5F5F5", paddingRight:"5%",paddingLeft:"5%", marginTop:"10px", marginBottom:"10px", marginRight:"50%", cursor:"pointer"}} onClick={()=>{handleClick()}}>
            <div style={{display:"flex", gap:"10px", marginBottom:"10px"}}>
                <h2>{vaga.nome}</h2>
            </div>
            <div style={{display:"flex", gap:"10px", justifyContent:"flex-start", alignItems:"baseline"}}>
                <h2>Descrição</h2>
                <p>{vaga.descricao}</p>
            </div>
        </div>
    )
}