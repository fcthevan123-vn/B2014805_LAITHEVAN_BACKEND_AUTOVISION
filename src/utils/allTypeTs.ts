import { File } from "buffer";

export type UserTypeTS = {
  HoTenKH: string;
  email: string;
  password: string;
  type?: string;
  SoDienThoai: string;
  DiaChi: string;
};

export type CartTS = {
  MSKH: string;
  MSHH: string;
  SoLuong: string;
  MauSac: string;
  Size: number;
};

export type HangHoaTS = {
  _id?: string;
  TenHH: string;
  MoTaHH: string;
  Gia: string;
  SoLuongHang: string;
  TrongLuong: number;
  ChatLieu: string;
  PhuHopVoi: string;
  CongNgheDem: string;
  DeNgoai: string;
  GhiChu: string;
  NoiBat: string;
  HinhHH?: string[];
  HinhUpload?: File[];
  HinhXoa?: string[];
};

export type HinhHH = {
  _id?: string;
  TenHinh: string;
  UrlHinh: string;
};

export type DatHangTS = {
  _id?: string;
  MSKH: string;
  MSNV: string;
  SodonDH: ChiTietDatHangTS[];
  NgayGH: string;
  NgayDH: string;
  DiaChi: string;
  TrangThai: string;
  HoTenNguoiNhan: string;
  SoDienThoai: string;
};

export type ChiTietDatHangTS = {
  _id?: string;
  MSKH: string;
  MSHH: HangHoaTS;
  Size: string;
  MauSac: string;
  SoLuong: string;
  GiaDatHang: number;
};

export type ResTS<T> = {
  statusCode: number;
  message: string;
  data?: T;
};
