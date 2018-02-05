const slowAjax = (input) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('done: ' + input), 1000)
    })
}

(async function() {    
    for (i of ['one', 'two', 'three']) {
        console.log(await slowAjax(i))        
    }           
}())