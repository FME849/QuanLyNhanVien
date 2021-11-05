var dsnv = new DanhSachNV();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function checkValid(nv) {
    var isValid = true;
    isValid &= validation.checkEmpty(nv.hoTen, "Tên nhân viên không được để trống", "tbTen") && validation.checkName(nv.hoTen, "Tên nhân viên không hợp lệ", "tbTen");
    isValid &= validation.checkEmpty(nv.email, "Email nhân viên không được để trống", "tbEmail") && validation.checkEmail(nv.email, "Email không hợp lệ", "tbEmail");
    isValid &= validation.checkEmpty(nv.matKhau, "Mật khẩu nhân viên không được để trống", "tbMatKhau") && validation.checkPass(nv.matKhau, "Mật khẩu không hợp lệ", "tbMatKhau");
    isValid &= validation.checkEmpty(nv.ngayLam, "Ngày làm nhân viên không được để trống", "tbNgay") && validation.checkDate(nv.ngayLam, "Ngày không hợp lệ", "tbNgay");
    isValid &= validation.checkEmpty(nv.luongCoBan, "Lương cơ bản của nhân viên không được để trống", "tbLuongCB") && validation.checkSalary(nv.luongCoBan, "Lương cơ bản không hợp lệ", "tbLuongCB");
    isValid &= validation.checkSelect("chucvu", "Chọn chức vụ cho nhân viên", "tbChucVu");
    isValid &= validation.checkEmpty(nv.gioLamThang, "Giờ làm của nhân viên không được để trống", "tbGiolam") && validation.checkHour(nv.gioLamThang, "Giờ làm không hợp lệ", "tbGiolam");
    return isValid;
}

function themNVMoi() {
    var nv = new NhanVien();
    nv.taiKhoan = (getELE("tknv").value).trim();
    nv.hoTen = getELE("name").value;
    nv.email = getELE("email").value;
    nv.matKhau = getELE("password").value;
    nv.ngayLam = getELE("datepicker").value;
    nv.luongCoBan = getELE("luongCB").value;
    nv.chucVu = getELE("chucvu").value;
    nv.gioLamThang = getELE("gioLam").value;

    var isValid = checkValid(nv);
    isValid &= validation.checkEmpty(nv.taiKhoan, "Mã nhân viên không được để trống", "tbTKNV") && validation.checkAccount(nv.taiKhoan, "Mã nhân viên đã tồn tại", "tbTKNV", dsnv.dsNhanVien);

    if (isValid) {
        nv.luongCoBan = Number(nv.luongCoBan);
        nv.gioLamThang = Number(nv.gioLamThang);
        nv.tongLuong = nv.tinhTongLuong();
        nv.loaiNhanVien = nv.xepLoaiNhanVien();
        dsnv.themNhanVien(nv);
        setLocalStorage(dsnv.dsNhanVien);
        getLocalStorage();
    }
}

function setLocalStorage(dsNhanVien) {
    localStorage.setItem("DSNV", JSON.stringify(dsNhanVien));
}

function getLocalStorage(){
    if (localStorage.getItem("DSNV") != null) {
        dsnv.dsNhanVien = JSON.parse(localStorage.getItem("DSNV"));
        hienThiDS(dsnv.dsNhanVien);
    }
}
getLocalStorage();

function resetForm() {
    document.querySelector(".modal-body form").reset();
    getELE("tknv").disabled = false;
    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbNgay").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbGiolam").style.display = "none";
    
}

function hienThiDS(dsNhanVien) {
    var content = "";
    dsNhanVien.forEach(function(nv) {
        var trNV = `<tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.loaiNhanVien}</td>
            <td>
                <button class="btn btn-danger" onclick="xoaNVCu('${nv.taiKhoan}')">Xóa</button>
                <button class="btn btn-info" onclick="xemThongTinNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Xem</button>
            </td>
        </tr>`
        content+= trNV;
    })
    getELE("tableDanhSach").innerHTML = content;
}

function xoaNVCu(taiKhoan) {
    dsnv.xoaNhanVien(taiKhoan);
    setLocalStorage(dsnv.dsNhanVien);
    getLocalStorage();
}

function xemThongTinNV(taiKhoan) {
    var viTri = dsnv.timNhanVien(taiKhoan);
    var nv = dsnv.dsNhanVien[viTri];
    getELE("tknv").value = nv.taiKhoan;
    getELE("tknv").disabled = true;
    getELE("name").value = nv.hoTen;
    getELE("email").value = nv.email;
    getELE("password").value = nv.matKhau;
    getELE("datepicker").value = nv.ngayLam;
    getELE("luongCB").value = nv.luongCoBan;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.gioLamThang;
}

function capNhatNVCu() {
    var nv = new NhanVien();
    nv.taiKhoan = getELE("tknv").value;
    nv.hoTen = getELE("name").value;
    nv.email = getELE("email").value;
    nv.matKhau = getELE("password").value;
    nv.ngayLam = getELE("datepicker").value;
    nv.luongCoBan = getELE("luongCB").value;
    nv.chucVu = getELE("chucvu").value;
    nv.gioLamThang = getELE("gioLam").value;

    var isValid = checkValid(nv);

    if (isValid) {
        nv.luongCoBan = Number(nv.luongCoBan);
        nv.gioLamThang = Number(nv.gioLamThang);
        nv.tongLuong = nv.tinhTongLuong();
        nv.loaiNhanVien = nv.xepLoaiNhanVien();
        dsnv.capNhatNV(nv);
        setLocalStorage(dsnv.dsNhanVien);
        getLocalStorage();
    }
}

getELE("btnTimNV").onclick = function() {
    var tuKhoa = getELE("searchName").value;
    var mangTuKhoa = dsnv.timLoaiNhanVien(tuKhoa);
    hienThiDS(mangTuKhoa);
}

getELE("searchName").onkeyup = function() {
    var tuKhoa = getELE("searchName").value;
    var mangTuKhoa = dsnv.timLoaiNhanVien(tuKhoa);
    hienThiDS(mangTuKhoa);
}