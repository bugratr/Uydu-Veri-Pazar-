// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UyduVeriPazari {
    struct UyduVerisi {
        string veriHash;  // IPFS gibi bir hizmette saklanan verinin hash'i
        uint256 fiyat;
        address sahip;
        bool satilik;
    }

    mapping(uint256 => UyduVerisi) public uyduVerileri;
    uint256 public veriSayisi = 0;

    event VeriEklendi(uint256 veriId, string veriHash, uint256 fiyat, address sahip);
    event VeriSatildi(uint256 veriId, address yeniSahip);

    function veriEkle(string memory _veriHash, uint256 _fiyat) public {
        veriSayisi++;
        uyduVerileri[veriSayisi] = UyduVerisi(_veriHash, _fiyat, msg.sender, true);
        emit VeriEklendi(veriSayisi, _veriHash, _fiyat, msg.sender);
    }

    function veriSatinAl(uint256 _veriId) public payable {
        UyduVerisi storage veri = uyduVerileri[_veriId];
        require(veri.satilik, "Veri satılık değil");
        require(msg.value == veri.fiyat, "Yanlış miktar gönderildi");

        veri.sahip.transfer(msg.value); 
        veri.sahip = msg.sender;
        veri.satilik = false;

        emit VeriSatildi(_veriId, msg.sender);
    }
}
