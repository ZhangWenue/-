async function setChanalList( ) {
    const res = await axios({
        url: '/v1_0/channels',
    })
    console.log(res);
    
}

setChanalList()