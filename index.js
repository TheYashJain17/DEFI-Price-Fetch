const ethers = require('ethers');

const {routerContractAddress, firstTokenAddress, secondTokenAddress} = require('./Addresses/AddressList');

const {ERC20ABI , routerABI} = require('./ABIs/allABIs');

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");


const routerContractInstance = new ethers.Contract(

    routerContractAddress,
    routerABI,
    provider

);

const fetchPrice = async(userInput) => {

    const token1 = new ethers.Contract(

        firstTokenAddress,
        ERC20ABI,
        provider

    );

    const token2 = new ethers.Contract(

        secondTokenAddress,
        ERC20ABI,
        provider

    );

    console.log(token1);
    console.log(token2);

    const token1Decimal = await token1.decimals();

    const token2Decimal = await token2.decimals();

      console.log(token1Decimal);

      console.log(token2Decimal);

    const amountIn =  ethers.utils.parseUnits(userInput , token1Decimal).toString();

    console.log(amountIn);

    const amountProcessing = await routerContractInstance.getAmountsOut(amountIn , [

        firstTokenAddress,
        secondTokenAddress

    ]);

    const amountOut =  ethers.utils.formatUnits(amountProcessing[1], token2Decimal).toString() ;

    console.log(amountOut);

}

userInput = 1;

fetchPrice(userInput.toString());
