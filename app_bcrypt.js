const bcrypt= require('bcrypt');

const hashPassword= async()=>{
    const salt= await bcrypt.genSalt(10);
    console.log(salt);
}

hashPassword();
