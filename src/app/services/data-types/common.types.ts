export type Banner = {
  targetId: number;
  url: string;
  imageUrl: string;
}

export type HotTag = {
  id: number;
  name: string;
  position: number;
}

export type PersonalizedSong = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}

export type Singer = {
  id: number;
  name: string;
  picUrl: string;
  albumSize: number;
}
