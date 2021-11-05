function DanhSachNV() {
    this.dsNhanVien = [],

    this.themNhanVien = function(nv) {
        return this.dsNhanVien.push(nv);
    }

    this.timNhanVien = function(taiKhoan) {
        var viTri = -1;
        this.dsNhanVien.map(function(nv, index) {
            if (taiKhoan == nv.taiKhoan) {
                viTri = index;
            }
        });
        return viTri;
    }

    this.xoaNhanVien = function(taiKhoan) {
        var viTri = this.timNhanVien(taiKhoan);
        if (viTri > -1){
            return this.dsNhanVien.splice(viTri, 1);
        }
    }

    this.capNhatNV = function(nv) {
        var viTri = this.timNhanVien(nv.taiKhoan);
        if (viTri > -1){
            this.dsNhanVien[viTri] = nv;
        }
    }
}

DanhSachNV.prototype.timLoaiNhanVien = function(loaiNV) {
    var mangTimKiem = [];
    var tuKhoa = loaiNV.trim().toLowerCase();
    this.dsNhanVien.map(function(nv) {
        var loai = nv.loaiNhanVien.toLowerCase();
        if (loai.indexOf(tuKhoa) > -1) {
            mangTimKiem.push(nv);
        }
    });
    return mangTimKiem;
}