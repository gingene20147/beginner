export type UserType = {
  id: string;
  date: string;
  name: string;
  email: string;
  city: UserCity;
};

export type UserCity = "台北市" | "台中市" | "高雄市";
