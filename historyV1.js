const axios = require('axios');
const Web3 = require('web3');

const endpoint = 'http://octet-fullhistory-test.hexlant.com:3000/v1/rpc';

const web3 = new Web3(endpoint);

//1번 블럭부터 100번 블럭까지 a가 어떤 tx를 보냈는지 조회하는 함수
(async function getHistory(startBlock,endBlock,targetAddress) {
    const checkSumAddress = web3.utils.toCheckSumAddress(targetAddress);

    let targetBlock = startBlock;

    while(targetBlock<endBlock) {
        const thisBlock = await web3.eth.getBlock(targetBlock,true);
        const transactions = thisBlock.transactions;

        for(let i =0; i<transactions.length; i+=1) {
            //from to value hash
            const{from,to,hash} = i;
            
            if(!to) {continue;}

            //EOA - getCode ->'0x'
            //CA - getCode -> '0xdsgsfdfgdf..'

            //컨트랙트인지 EOA인지 확인
            const code = await web3.eth.getCode(to);

            if(code ==='0x' && [from,to].includes[checkSumAddress]) {
                console.log('트랜잭션 존재')
            }
        //타겟+1
        targetBlock+=1;
    }
}



})(5,15,'')
