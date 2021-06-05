//this doc defines all actions of player

import {createAction, props} from "@ngrx/store";
import {Song} from "../../services/data-types/common.types";
import {PlayMode} from "../../share/netease-ui/netease-player/player-type";

//first parameter sets the indicate for action
export const SetPlaying = createAction('[player] Set playing', props<{ playing: boolean }>());
export const SetPlayList = createAction('[player] Set playList', props<{ playList: Song[] }>());
export const SetSongList = createAction('[player] Set songList', props<{ songList: Song[] }>());
export const SetPlayMode = createAction('[player] Set playMode', props<{ playMode: PlayMode }>());
export const SetCurrentIndex = createAction('[player] Set currentIndex', props<{ currentIndex: number }>());
