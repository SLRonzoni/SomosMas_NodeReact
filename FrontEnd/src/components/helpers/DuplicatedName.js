import axiosClient from "../../configuration/axiosClient";

const DuplicatedName = async (searchName, table) => {   
    let respName, respId;   
        await axiosClient.get(`/${table}/byName/${searchName}`)
        .then(response => {
            if(response.status===200){
               respName= response.data.name  
               respId= response.data.id  
            }
        })
        .catch(error=>{
            console.log(error);
        });
return {respName,respId}
}

export default DuplicatedName;