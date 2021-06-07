import {Lyric} from "../../../../services/data-types/common.types";
import {from, Subject, Subscription, timer, zip} from "rxjs";
import {skip} from "rxjs/operators";

export interface BaseLyricLine {
  txt: string,
  txtCn: string,
}

interface LyricLine extends BaseLyricLine {
  time: number
}


interface Handler extends BaseLyricLine {
  lineNum: number
}
// type LyricLine = {
//   txt: string,
//   txtCn: string,
//   time: number
// }

const timeExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export class NeteaseLyric {
  private lrc: Lyric;
  lines: LyricLine[] = [];
  private playing = false;
  private curNum: number = 0;
  private startTime: number = 0;
  private startStamp: number = 0;
  private pauseStamp: number = 0;
  handler = new Subject<Handler>();
  // @ts-ignore
  private timer$: Subscription;

  constructor(lrc: Lyric) {
    this.lrc = lrc;
    this.init();
  }

  //initiate the lyric
  private init() {
    if (this.lrc.tlyric) {
      //it is a song in foreign language
      this.generTLyric();
    } else {
      this.generLyric();
    }
  }

  private generLyric() {
    const lines = this.lrc.lyric.split('\n');
    lines.forEach(line => this.makeLine(line));
    // console.log('lines:', this.lines);
  }

  private generTLyric() {
    const lines = this.lrc.lyric.split('\n'); //lyric in foreign language
    const tlines = this.lrc.tlyric.split('\n')
    // console.log('tlines:', tempArr);
      .filter(item => timeExp.exec(item) !== null); //filter the sentence that doesnot have time
    const moreLine = lines.length - tlines.length; //the lines that the lyric has but its tlyric not

    let tempArr = [lines, tlines];
    console.log('tempArr:', tempArr);

    // @ts-ignore
    const min = timeExp.exec(tempArr[1][0])[1];
    // @ts-ignore
    const sec = timeExp.exec(tempArr[1][0])[2];
    // @ts-ignore
    const milisec = timeExp.exec(tempArr[1][0])[3];

    //find out the index of line on which the tlyric equals lyric
    const skipIndex = tempArr[0].findIndex(item => {
      const exec = timeExp.exec(item);

      if (exec) {
        return exec[1] === min && exec[2] === sec && Number(exec[3]) === Number(milisec);
      } else {
        return false;
      }
    })
    // console.log('skipIndex:', skipIndex);
    //save the lines that lyric more has than tlyric
    const skipItems = tempArr[0].slice(0, skipIndex);
    if (skipItems.length) {
      skipItems.forEach(line => this.makeLine(line));
    }
    // console.log('lines:', this.lines);

    //make a stream from lines and tlines
    let zipLines$ = zip(from(lines).pipe(skip(skipIndex)), from(tlines));
    zipLines$.subscribe(([line, tline]) => this.makeLine(line, tline));
  }

  private makeLine(line: string, tline: string = '') {
    const result = timeExp.exec(line);
    // console.log('res:', result);
    if (result) {
      const txt = line.replace(timeExp, '').trim();
      const txtCn = tline ? tline.replace(timeExp, '').trim() : '';
      if (txt) {
        let thirdResult = result[3] || '0';
        const len = thirdResult.length;
        const _thirdResult = len > 2 ? parseInt(thirdResult) : parseInt(thirdResult) * 10;
        const time = Number(result[1]) * 60 * 1000 +
          Number(result[2]) * 1000 + _thirdResult;
        this.lines.push({ txt, txtCn, time });
        // console.log('res:', { txt, txtCn, time });
        // console.log('res lines:', this.lines);

      }
    }
    // if (result) {
    //   console.log('lyric:', line.replace(timeExp, '').trim());
    // }
  }

  play(startTime = 0, skip = false) {
    if (!this.lines.length) return;
    if (!this.playing) {
      this.playing = true;
    }

    this.curNum = this.findCurNum(startTime);
    // console.log('this.curNum', this.curNum);
    this.startStamp = Date.now() - startTime;
    // console.log('this.startStamp', this.startStamp);

    //skip this step only when togglePlay() called
    if (!skip) {
      this.callHandler(this.curNum - 1);
    }

    //not in the end of the song lyric
    if (this.curNum < this.lines.length) {
      //clear timer before every time play
      this.clearTime();
      // clearTimeout(this.timer);
      this.playReset();
    }
  }

  private playReset() {
    let line = this.lines[this.curNum];
    //delay is the time for lyric line lines[this.curNum - 1]
    const delay = (line.time - (Date.now() - this.startStamp) - 900);

    this.timer$ = timer(delay).subscribe(() => {
      //the index of lyric line gonna to be played will be emitted outside
      this.callHandler(this.curNum ++);

      if (this.curNum < this.lines.length && this.playing) {
        this.playReset();
      }
    })
    // this.timer = setTimeout(() => {
    //   //the index of lyric line gonna to be played will be emitted outside
    //   this.callHandler(this.curNum ++);
    //
    //   if (this.curNum < this.lines.length && this.playing) {
    //     this.playReset();
    //   }
    // }, delay);
  }

  private clearTime() {
    this.timer$ && this.timer$.unsubscribe();
  }


  private callHandler(i: number) {
    if (i > 0) {
      this.handler.next({
        txt: this.lines[i].txt,
        txtCn: this.lines[i].txtCn,
        lineNum: i
      });
    }
  }

  private findCurNum(time: number): number {
    return this.lines.findIndex(item => time <= item.time)
  }

  togglePlay(playing: boolean) {
    const now = Date.now();
    this.playing = playing;
    if (playing) {
      const startTime = this.pauseStamp - this.startStamp;
      this.play(startTime, true);
    } else {
      this.stop();
      this.pauseStamp = now;
    }
  }

  stop() {
    if (this.playing) {
      this.playing = false;
    }
    this.clearTime();
  }

  seek(time: number) {
    this.play(time);
  }
}
