import { File } from "buffer";

export type UserTypeTS = {
  HoTenKH: string;
  email: string;
  password: string;
  type?: string;
  SoDienThoai: number;
  DiaChi: string;
};

export type HangHoaTS = {
  _id?: string;
  TenHH: string;
  MoTaHH: string;
  Gia: number;
  SoLuongHang: number;
  TrongLuong: number;
  ChatLieu: string;
  PhuHopVoi: string;
  CongNgheDem: string;
  DeNgoai: string;
  GhiChu: string;
  NoiBat: string;
  HinhHH?: string[];
  HinhUpload?: File[];
};

export type HinhHH = {
  _id?: string;
  TenHinh: string;
  UrlHinh: string;
};

export type ResTS<T> = {
  statusCode: number;
  message: string;
  data?: T;
};
