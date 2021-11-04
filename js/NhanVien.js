function NhanVien() {
    this.taiKhoan;
    this.hoTen;
    this.email;
    this.matKhau;
    this.ngayLam;
    this.luongCoBan;
    this.chucVu;
    this.gioLamThang;
    this.tongLuong;
    this.loaiNhanVien;

    this.tinhTongLuong = function() {
        switch (this.chucVu) {
            case "Sếp":
                this.tongLuong = this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                this.tongLuong = this.luongCoBan * 2;
                break;
            default:
                this.tongLuong = this.luongCoBan * 1;
                break;
        }
        return this.tongLuong;
    }
    this.xepLoaiNhanVien = function() {
        if (this.gioLamThang >= 192) {
            this.loaiNhanVien = "Xuất sắc";
        } else if (this.gioLamThang >= 176) {
            this.loaiNhanVien = "Giỏi";
        } else if (this.gioLamThang >= 160) {
            this.loaiNhanVien = "Khá";
        } else {
            this.loaiNhanVien = "Trung bình";
        }
        return this.loaiNhanVien;
    }
}