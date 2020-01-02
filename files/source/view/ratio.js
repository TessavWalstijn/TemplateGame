class RatioManager
{
  constructor (screenSize, fillScreen)
  {
    this._code = -1;
    this._ratio = 'none';
    this._landscape = undefined;
    this._fillScreen = fillScreen;

    this.UpdateRatio(screenSize, fillScreen);
  }

  //#region Getters
  get ratio() {
    return this._ratio;
  }

  get code() {
    return this._code;
  }

  get landscape() {
    return this._landscape;
  }
  //#endregion

  // !! Private function
  _SetValues({ code, ratio, landscape })
  {
    this._landscape = landscape;
    this._ratio = ratio;
    this._code = code;
  }

  /**
   * Updates the ratio.
   * @param {Object}  screenSize   Object of the screen size.
   * @param {Boolean} [fillScreen] Boolean for full screen fill.
   * @param {String}  [canvasId]   String of canvas id name.
   */
  UpdateRatio (screenSize, fillScreen, canvasId)
  { // Call the static function to get ratio object
    this._SetValues(RatioManager.GetRatio(screenSize, fillScreen, canvasId));
  }

  /**
   * Set the width and height for the canvas.
   * @param {Object}  screenSize   screenSize object
   * @param {Object}  ratioObject  get it from RatioManager.GetRatio()
   * @param {Boolean} [fillScreen] boolean if canvas needs to be full screen.
   * @param {String}  [canvasId]   if you use multiple canvases or custom id.   
   */
  static _SetCanvas ({ width, height }, { ratio }, fillScreen = true, canvasId = 'canvas')
  {
    const canvas = document.getElementById(canvasId);

    // TODO CHECK THIS SHIET OUT!!!
    // canvas.width = width * window.devicePixelRatio;
    // canvas.height = height * window.devicePixelRatio;

    // !! 92 LINES SAME CODE DOES NOT WORK @202
    if (fillScreen) {
      canvas.width = width;
      canvas.height = height;
      
      canvas.style.position = 'fixed';
      canvas.style.left = canvas.x = 0;
      canvas.style.top = canvas.y = 0;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    } else {
      switch (ratio) {
        case '16:9':
          if (height > width * 0.5625) {
            canvas.width = width;
            canvas.height = width * 0.5625;
    
            const difference = height - canvas.height;
          
            canvas.x = difference * 0.5;
            canvas.y = 0;

            canvas.style.position = 'fixed';
            canvas.style.left = 0;
            canvas.style.top = `${difference * 0.5}px`;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${canvas.height}px`;
          } else {
            canvas.width = height / 9 * 16;
            canvas.height = height;

            const difference = width - canvas.width;
          
            canvas.x = 0;
            canvas.y = difference * 0.5;

            canvas.style.position = 'fixed';
            canvas.style.left = `${difference * 0.5}px`;
            canvas.style.top = 0;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${height}px`;
          }
          break;
        case '9:16':
          if (width > height * 0.5625) {
            canvas.width = height * 0.5625;
            canvas.height = height;

            const difference = width - canvas.width;
          
            canvas.x = 0;
            canvas.y = difference * 0.5;

            canvas.style.position = 'fixed';
            canvas.style.left = `${difference * 0.5}px`;
            canvas.style.top = 0;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${height}px`;
          } else {
            canvas.width = width;
            canvas.height = width / 9 * 16;

            const difference = height - canvas.height;
          
            canvas.x = difference * 0.5;
            canvas.y = 0;

            canvas.style.position = 'fixed';
            canvas.style.left = 0;
            canvas.style.top = `${difference * 0.5}px`;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${canvas.height}px`;
          }
          break;
        case '4:3':
          if (height > width * 0.75) {
            canvas.width = width;
            canvas.height = width * 0.75;
    
            const difference = height - canvas.height;
          
            canvas.x = difference * 0.5;
            canvas.y = 0;

            canvas.style.position = 'fixed';
            canvas.style.left = 0;
            canvas.style.top = `${difference * 0.5}px`;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${canvas.height}px`;
          } else {
            canvas.width = height / 3 * 4;
            canvas.height = height;

            const difference = width - canvas.width;
          
            canvas.x = 0;
            canvas.y = difference * 0.5;
            
            canvas.style.position = 'fixed';
            canvas.style.left = `${difference * 0.5}px`;
            canvas.style.top = 0;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${height}px`;
          }
          break;
        case '3:4':
          if (width > height * 0.75) {
            canvas.width = height * 0.75;
            canvas.height = height;

            const difference = width - canvas.width;
          
            canvas.x = 0;
            canvas.y = difference * 0.5;

            canvas.style.position = 'fixed';
            canvas.style.left = `${difference * 0.5}px`;
            canvas.style.top = 0;
            canvas.style.width = `${canvas.width}px`;
            canvas.style.height = `${height}px`;
          } else {
            canvas.width = width;
            canvas.height = width / 3 * 4;

            const difference = height - canvas.height;
          
            canvas.x = difference * 0.5;
            canvas.y = 0;

            canvas.style.position = 'fixed';
            canvas.style.left = 0;
            canvas.style.top = `${difference * 0.5}px`;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${canvas.height}px`;
          }
          break;
      }
    }

    //#region FunctionVersion
    // TODO CHECK WHY THIS DOES NOT WORK!!!
    //   -- 137 LINES SAME CODE DOES WORK @61
    // if (fillScreen) {
    //   canvas.width = width;
    //   canvas.height = height;
      
    //   canvas.style.position = 'fixed';
    //   canvas.style.left = canvas.x = 0;
    //   canvas.style.top = canvas.y = 0;
    //   canvas.style.width = `${width}px`;
    //   canvas.style.height = `${height}px`;
    // } else {
    //     switch (ratio) {
    //     case '16:9':
    //       _Landscape(16, 9, 0.5625);
    //       break;
    //     case '9:16':
    //       _Portrait(9, 16, 0.5625);
    //       break;
    //     case '4:3':
    //       _Landscape(4, 3, 0.75);
    //       break;
    //     case '3:4':
    //       _Portrait(3, 4, 0.75);
    //       break;
    //   }
    // }

    // function _Landscape (widthNr, heightNr, fraction)
    // {
    //   if (height > width * fraction) {
    //     canvas.width = width;
    //     canvas.height = width * fraction;

    //     const difference = height - canvas.height;
      
    //     canvas.x = difference * 0.5;
    //     canvas.y = 0;

    //     canvas.style.position = 'fixed';
    //     canvas.style.left = 0;
    //     canvas.style.top = `${difference * 0.5}px`;
    //     canvas.style.width = `${width}px`;
    //     canvas.style.height = `${canvas.height}px`;
    //   } else {
    //     canvas.width = height / widthNr * heightNr;
    //     canvas.height = height;

    //     const difference = width - canvas.width;
      
    //     canvas.x = 0;
    //     canvas.y = difference * 0.5;

    //     canvas.style.position = 'fixed';
    //     canvas.style.left = `${difference * 0.5}px`;
    //     canvas.style.top = 0;
    //     canvas.style.width = `${canvas.width}px`;
    //     canvas.style.height = `${height}px`;
    //   }
    // }

    // function _Portrait (widthNr, heightNr, fraction)
    // {
    //   if (width > height * fraction) {
    //     canvas.width = height * fraction;
    //     canvas.height = height;

    //     const difference = width - canvas.width;
      
    //     canvas.x = 0;
    //     canvas.y = difference * 0.5;

    //     canvas.style.position = 'fixed';
    //     canvas.style.left = `${difference * 0.5}px`;
    //     canvas.style.top = 0;
    //     canvas.style.width = `${canvas.width}px`;
    //     canvas.style.height = `${height}px`;
    //   } else {
    //     canvas.width = width;
    //     canvas.height = width / widthNr * heightNr;

    //     const difference = height - canvas.height;
      
    //     canvas.x = difference * 0.5;
    //     canvas.y = 0;

    //     canvas.style.position = 'fixed';
    //     canvas.style.left = 0;
    //     canvas.style.top = `${difference * 0.5}px`;
    //     canvas.style.width = `${width}px`;
    //     canvas.style.height = `${canvas.height}px`;
    //   }
    // }
    //#endregion
  }

  /**
   * Returns the ratio object and sets the canvas.
   * @param {Object} [screenSize] Optional for the wrappers.
   */
  static GetRatio (screenSize, fillScreen = true, canvasId)
  {
    if (!screenSize) {
      screenSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    const width = screenSize.width;
    const height = screenSize.height;
    const ratio = width / height;

    // Set values in object
    let object = {};
    (ratio < 1 )
      ? ((ratio < 0.65) // Portrait
        ? (object = {code: 1, ratio: '9:16', landscape: false})
        : (object = {code: 3, ratio: '3:4', landscape: false}))
      : ((ratio > 1.5555) // Landscape
        ? (object = {code: 0, ratio: '16:9', landscape: true})
        : (object = {code: 2, ratio: '4:3', landscape: true}));
    
    RatioManager._SetCanvas(screenSize, object, fillScreen, canvasId);

    return object;
  }
}

 /*---
 | Coords Manager
 |
 | The coords manager is designed for multiple coord configure files.
 | This is for example if you have a large level.
 | Then you can set up a level only coords manager.
 | This will keep an overview on where things are located.
*/
class CoordsManager extends RatioManager
{
  /**
   * Set up a coords manager.
   * @param {Object}  coordObject An object like globalCoords.
   * @param {Boolean} [fillScreen] Optional default true.
   * @param {Object}  [screenSize] Optional for the wrappers.
   */
  constructor (coordObject, fillScreen, screenSize)
  {
    super(screenSize, fillScreen);

    this._coords = coordObject;
  }

  GetCoords (...names)
  {
    const max = names.length;

    // Get the correct ratio
    let object = this._coords[this._ratio];

    // Get the requested object
    for (let i = 0; i < max; i += 1)
      object = object[names[i]];

    return object;
  }
}