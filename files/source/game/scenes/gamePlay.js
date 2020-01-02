class gamePlay extends Scene
{
  constructor (coords)
  {
    super();

    
    this.coords = coords;
    const currentCoords = coords.GetCoords();

    this.player = new Player(currentCoords.center);
    this.addChild(this.player);
  }

  Update ()
  {
    // Update children
  }

  OnRotaion ()
  {
    const coords = this.coords.GetCoords();

    eve.utils.RotateObject(this.player, coords.center);
  }
}