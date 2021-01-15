function useSystemConfig(fStore) {
    const ref = fStore().collection('systems');
    const createSystem  = system => {
        system = generateSystemAttributes(system);
        //console.log("generated system", system);
        ref.add(system);
    };
    const readSystem = id =>  ref.doc(id).get();
    const readSystems = () => ref.get();
    const updateSystem = (id, system) => ref.doc(id).update(system);
    const deleteSystem = (id) => ref.doc(id).delete();
    
    return {createSystem, readSystem, readSystems, updateSystem, deleteSystem}
}

function generateSystemAttributes(system) { // generates random additional attributes in place of server functionality
    let userList = ["esimmonds-dt3","rparks-dt","jappleton-dt2","gcurtis-dt","arahman-dt4"];
    let fpgaImages = ["4x100G Triton (6122)", "2x100G Triton (6123)", "100G CERNE (6199)", "100G FlowProbe (6101)"];
    let statusList = ["On", "Off"];

    let shuffledUserList = userList.sort(() => 0.5 - Math.random()); // shuffles list
    let randomUserCount = Math.floor(Math.random() * (userList.length)); // generates number of users
    let selected = shuffledUserList.slice(0, randomUserCount); // gets sub-aray of shuffled user list
    
    system.fpgaImage = fpgaImages[Math.floor(Math.random() * fpgaImages.length)]; // gets random item from fpga images list
    system.fpgaTemperature = Math.floor(Math.random() * 80) + 40; // random number from 40 to 80
    system.status = statusList[Math.floor(Math.random() * statusList.length)];
    if (system.status === "On") {
        system.activeUsers = selected;
    } else {
        system.activeUsers = []
    }
    system.lastShutdown = new Date();

    return system;
}

export default useSystemConfig;