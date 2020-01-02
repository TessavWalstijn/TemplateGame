const eventResize = (()=> {
  let screenSize = {};

  function _RefreshScreenSize ()
  {
    screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  function Call (callback)
  {
    setTimeout(() => {
      _RefreshScreenSize();
      callback && callback(screenSize);
    }, 30);
  }

  function GetScreenSize () { return screenSize }

  _RefreshScreenSize();

  return {
    GetScreenSize: GetScreenSize,
    Call: Call,
  }
})();
  
eve.add.Module(eventResize, 'eventResize');