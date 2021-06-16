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
  alias: string[];
}


export type SingerDetail = {
  artist: Singer;
  hotSongs: Song[];
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
  coverImgUrl: string;
  playCount: number;
  tracks: Song[];
  tags: string[];
  createTime: number;
  creator: { nickname: string; avatarUrl: string; };
  description: string;
  subscribedCount: number;
  shareCount: number;
  commentCount: number;
  subscribed: boolean;
  userId: number;
}

export type SongUrl = {
  id: number;
  url: string;
}

export type Lyric = {
  lyric: string;
  tlyric: string;
}

export type SheetList = {
  playlists: PersonalizedSong[],
  total: number
}
