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

const getIssPosition = async() => {
    await sayMessage('miaou',1,1).then(message => console.log(message));
};

do {
    var data = getIssPosition();
    setTimeout(
        () => {
            console.log(data)
        },
        second * 1000
    );
} while (true);

console.log('End');