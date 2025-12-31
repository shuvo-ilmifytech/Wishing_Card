
export interface UserInfo {
  name: string;
  userImage?: string; // Base64 string of the uploaded photo
  imageScale?: number; // Scale factor for the image (0.5 to 2.0)
}

export interface CardData {
  userInfo: UserInfo;
  wish: string;
  theme: 'midnight' | 'gold' | 'nebula';
}
