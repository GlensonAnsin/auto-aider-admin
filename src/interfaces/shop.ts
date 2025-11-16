export interface AutoRepairShop {
  repair_shop_id: number;
  owner_firstname: string;
  owner_lastname: string;
  gender: string;
  shop_name: string;
  mobile_num: string;
  email: string | null;
  services_offered: string[];
  longitude: string;
  latitude: string;
  creation_date: string | null;
  profile_pic: string | null;
  shop_images: string[] | null;
  number_of_ratings: number;
  average_rating: number;
  approval_status: string;
  total_score: number;
  profile_bg: string;
  availability: string;
  is_deleted: boolean;
  settings_map_type: string,
  settings_push_notif: boolean,
};