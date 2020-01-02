class Stage extends createjs.Stage
{
  constructor (screenSize, canvasId)
  {
    super(canvasId);
    this.fillScreen = false;
    this.canvasId = canvasId;

    this.coords = new CoordsManager(coords, this.fillScreen, screenSize)

    RatioManager.GetRatio(screenSize, this.fillScreen);
    this._SetStage(screenSize);

    this.gamePlay = new gamePlay(this.coords);
    this.addChild(this.gamePlay);

    // this.rect = new createjs.Rectangle(0, 0, this.width, this.height);
    // this.addChild(this.rect);

    // this.rect.addEventListener("click", function(event) { console.log(event) })
  }

  Update ()
  {
    this.gamePlay.Update();
  }

  _SetStage({ width, height })
  {
    const coords = this.coords.GetCoords();

    if (this.fillScreen) {
      this.scaleX = width / coords.resolution.x;
      this.scaleY = height / coords.resolution.y;
    } else {
      const canvas = document.getElementById(this.canvasId);

      this.scaleX = canvas.width / coords.resolution.x;
      this.scaleY = canvas.height / coords.resolution.y;
      this.width = canvas.width;
      this.height = canvas.height;
    }
  }

  UserResize(screenSize)
  {
    RatioManager.GetRatio(screenSize, this.fillScreen, this.canvasId);
    this.coords.UpdateRatio(screenSize, this.fillScreen, this.canvasId);
    this._SetStage(screenSize);

    this.gamePlay.OnRotaion();
  }
}