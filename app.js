const web3 = new Web3(Web3.givenProvider); // Metamask veya diğer bir tarayıcı cüzdanı için

let contractInstance; // Akıllı sözleşmemizin örneği
const contractAddress = "AKILLI_SOZLESME_ADRESINIZ"; // Buraya gerçek adresinizi eklemelisiniz
const abi = [...];  // Sözleşmenizin ABI'sini buraya ekleyin

window.onload = async () => {
    await connectToMetamask(); // Metamask ile bağlantı kurmak için
    contractInstance = new web3.eth.Contract(abi, contractAddress);
};

async function connectToMetamask() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Connected to account:", accounts[0]);
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert("Metamask is not installed. Please install it and try again.");
    }
}

async function veriEkle(veriHash, fiyat) {
    const accounts = await web3.eth.getAccounts();
    try {
        await contractInstance.methods.veriEkle(veriHash, fiyat).send({ from: accounts[0] });
        console.log("Veri başarıyla eklendi");
    } catch (error) {
        console.error("Veri eklenirken bir hata oluştu:", error);
    }
}

async function veriSatinAl(veriId, fiyat) {
    const accounts = await web3.eth.getAccounts();
    try {
        await contractInstance.methods.veriSatinAl(veriId).send({ from: accounts[0], value: fiyat });
        console.log("Veri başarıyla satın alındı");
    } catch (error) {
        console.error("Veri satın alınırken bir hata oluştu:", error);
    }
}
