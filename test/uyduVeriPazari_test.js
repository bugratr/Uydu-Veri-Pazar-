contract("UyduVeriPazari", accounts => {
    let instance;

    before(async () => {
        instance = await UyduVeriPazari.deployed();
    });

    it("Veri eklemeyi test eder", async () => {
        await instance.veriEkle("testHash123", web3.utils.toWei("0.1", "ether"), { from: accounts[0] });
        const veri = await instance.uyduVerileri(1);
        
        assert.equal(veri.veriHash, "testHash123", "Veri hash'i doğru eklenmedi");
        assert.equal(veri.fiyat, web3.utils.toWei("0.1", "ether"), "Veri fiyatı doğru eklenmedi");
        assert.equal(veri.sahip, accounts[0], "Veri sahibi doğru eklenmedi");
        assert.equal(veri.satilik, true, "Veri satılık durumu doğru eklenmedi");
    });

    // Diğer test senaryolarınızı buraya ekleyebilirsiniz, örneğin:
    // - Satın alma işleminin doğru çalıştığını test eder
    // - Veri sahibinin değişip değişmediğini kontrol eder
    // - Fiyat kontrolü yapar
    // vb.
});
