class Player extends GameObject
{
  constructor (coords)
  {
    super(coords);

    this.sprite = eve.create.SpriteSheet('ParrotFly', 2, 2, 4, 0.5, true);
    this.addChild(this.sprite);
  }
}