const sayMessage = (message, repeat, second) => {
    return new Promise((resolve, reject) => {
        if(typeof message !== String.name.toLowerCase()) {
            reject(new Error(`${message} is not a ${String.name.toLowerCase()}.`));
        };
        if(typeof repeat !== Number.name.toLowerCase()) {
            reject(new Error(`${repeat} is not a ${Number.name.toLowerCase()}.`));
        };
        if(typeof second !== Number.name.toLowerCase()) {
            reject(new Error(`${second} is not a ${Number.name.toLowerCase()}.`));
        };

        let outMessage = '';
        for(let i = 0; i < repeat; i++){
            if(i != 0) outMessage = outMessage.concat(' ');
            outMessage = outMessage.concat(message);
        }

        setTimeout(
            () => resolve(outMessage),
            second * 1000
        );
    });

};

console.log('Begin');
//sayMessage(1,1,0).then(message => console.log(message));
//sayMessage('miaou','ABC',0).then(message => console.log(message));

const cat = async() => {
    await sayMessage('miaou',1,1).then(message => console.log(message));
};

const dog = async() => {
    await sayMessage('waf',3,3).then(message => console.log(message));
};

const duck = async() => {
    await sayMessage('kwak',2,5).then(message => console.log(message));
};


console.log('start duck');
duck();

console.log('start cat');
cat();

console.log('start dog');
dog();

console.log('End');