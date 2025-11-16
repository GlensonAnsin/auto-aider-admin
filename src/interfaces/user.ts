export interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  gender: string;
  email: string | null;
  mobile_num: string;
  creation_date: string;
  profile_pic: string | null;
  role: string;
  user_initials_bg: string;
  is_deleted: boolean;
  settings_map_type: string,
  settings_push_notif: boolean,
};