abstract class TakePhoto {
  constructor(public cameraMode: string, public filter: string) {}

  abstract getSepia(): void;
  getReelTime(): number {
    //some complex calculatins
    return 8;
  }
}

class Instagram extends TakePhoto {
  constructor(
    public cameraMode: string,
    public filter: string,
    public burst: stringl
  ) {
    // super(cameraMode, filter);
  }
  getSepia(): void {
    console.log("Method not implemented.");
  }
}f

const kwame = new Instagram("ttfot", "janut", "lovia");
kwame.getReelTime