interface AvatarImage {
  name: string;
  percent: number;
  size: number;
  status: string;
  type: string;
  uid: string;
  url: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean | string;
  birthday: string;
  skills: string[];
  avatar: AvatarImage[];
}
