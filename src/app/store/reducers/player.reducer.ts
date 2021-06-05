//定义播放器的元数据
import {PlayMode} from "../../share/netease-ui/netease-player/player-type";
import {Song} from "../../services/data-types/common.types";
import {Action, createReducer, on} from "@ngrx/store";
import {SetCurrentIndex, SetPlaying, SetPlayList, SetPlayMode, SetSongList} from "../actions/player.action";

export type PlayState = {
  //播放状态
  playing: boolean;

  //播放模式，单曲，循环等。。。
  playMode: PlayMode;

  //歌曲列表
  songList: Song[];

  //播放列表（在不同播放模式下可能和歌曲列表有所不同）
  playList: Song[];

  //当前正在播放的索引
  currentIndex: number;

}

//定义播放器初始的状态
export const initialState: PlayState = {
  playing: false,
  songList: [],
  playList: [],
  playMode: {type: 'loop', label: '循环'},
  //初始时不知道要播放歌曲的索引
  currentIndex: -1
}

const reducer = createReducer(
  initialState,
  //on regists the action functions

  //the second parameter is a function which recives a state and returns a new state
  //the playing must be the same as the playing in props in action.ts
  on(SetPlaying, (state, { playing }) => ({ ...state, playing})),
  on(SetPlayList, (state, { playList }) => ({ ...state,  playList})),
  on(SetSongList, (state, { songList }) => ({ ...state,  songList})),
  on(SetPlayMode, (state, { playMode }) => ({ ...state,  playMode})),
  on(SetCurrentIndex, (state, { currentIndex }) => ({ ...state,  currentIndex})),
)

export function playerReducer(state: PlayState | undefined, action: Action) {
  return reducer(state, action);
}













