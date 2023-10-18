const express = require('express');
const Web3 = require('web3');

const app = express();
const PORT = 3000;

const contractAddress = "AKILLI_SOZLESME_ADRESINIZ"; 
const abi = [...];  // Sözleşmenizin ABI'sini buraya ekleyin

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); // Ganache için varsayılan
const contractInstance = new web3.eth.Contract(abi, contractAddress);

app.get('/uydu-verileri', async (req, res) => {
    try {
        const veriSayisi = await contractInstance.methods.veriSayisi().call();
        let veriler = [];
        
        for (let i = 1; i <= veriSayisi; i++) {
            const veri = await contractInstance.methods.uyduVerileri(i).call();
            veriler.push(veri);
        }

        res.json(veriler);
    } catch (error) {
        res.status(500).send("Sunucu hatası");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
