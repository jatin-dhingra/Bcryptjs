const bcrypt= require('bcrypt');

const hashPassword= async(pw)=>{
    const salt= await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(pw,salt);
    console.log(salt);
    console.log(hash);
}

const login= async(pw,hashedpw)=>{
    const result=await bcrypt.compare(pw,hashedpw);
    if(result)
    {
        console.log("logged in");

    }
    else{
        console.log("incorrect");
    }
}



// hashPassword('jatin');
login('jatin','$2b$10$1erT//ispreEEEoJRlyNkest2.jHayieHxJjrNtDrHLRRJeKHzQ5u');
