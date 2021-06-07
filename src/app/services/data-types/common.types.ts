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


export type Singer = {
  id: number;
  name: string;
  picUrl: string;
  albumSize: number;
}

export type Song = {
  id: number;
  name: string;
  url: string;
  ar: Singer[]; //歌手信息
  al: {id: number; name: string; picUrl: string};
  dt: number;
}

export type PersonalizedSong = {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  tracks: Song[];
}

export type SongUrl = {
  id: number;
  url: string;
}

export type Lyric = {
  lyric: string;
  tlyric: string;
}
