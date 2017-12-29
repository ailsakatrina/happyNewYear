var Player =
{
  isMuted: false,
  isPlaying: true,

  duration: 0,
  current: 0,

  mute: function()
  {
    this.isMuted = this.isMuted ? false : true;
    if(window.console) console.log(this.isMuted ? 'Muted' : 'Unmuted');

    return this
  },

  play: function()
  {
    this.isPlaying = this.isPlaying ? false : true;
    if (this.isPlaying){
      // window.JSInterface.continuePlayVoice();
      noticeServerCode("continuePlayVoice");
      // alert("播放");
    }
    else{
      // alert("暂停播放");
      // window.JSInterface.pauseVoice();
      noticeServerCode("pauseVoice");
    }

    //if(window.console) console.log(this.isPlaying ? 'Playing' : 'Paused');

    return this
  },

  skip: function(d)
  {
    if(window.console) console.log('Skipping', d == 'l' ? 'Backwards' : 'Forwards')

    this.current = 0;

    return this
  },
  setMusic:function(duration,singer,music)
  {
    this.setInfo(singer,music);
    this.setDuration(duration);
    this.setCurrent(0);
    setNLPoff();
    setMusicDisplay();
    return this
  },
  setInfo:function(singer,music)
  {
    $('.music-player1 > .dash1 > .info1 >label').html(singer);
    $('.music-player1 > .dash1 > .info1 >small').html(music);
    return this
  },
  setDuration: function(s)
  {
    this.duration = s;

    var m = 0;
    while(s > 60) { m ++; s -= 60 }
    while(String(s).length == 1) s = '0' + s;

    $('.music-player1 > .dash1 > .info1 > i > [name="duration"]').html(m + ':' + s);

    return this
  },

  setCurrent: function(s)
  {
    this.current = s;

    var m = 0, pct = this.current / this.duration;
    while(s > 60) { m ++; s -= 60 }
    while(String(s).length == 1) s = '0' + s;

    $('.music-player1 > .dash1 > .info1 > i > [name="current"]').html(m + ':' + s);

    $('.music-player1 > .dash1 > a[href="#seek"]:not(:active)').each(function()
    {
      var rotate = 'rotate(-' + ((pct * 180) + 90) + 'deg)';

      $(this).add('.music-player1 > .dash1 > .seeker1 > .wheel1 > .progress1').css(
      {
        '-webkit-transform': rotate,
        '-moz-transform': rotate,
        '-ms-transform': rotate,
        '-o-transform': rotate,
        'transform' : rotate
      });
    });

    return this
  },

  playing: function()
  {
    if(!this.isPlaying)
      return this;

    if(this.current > (this.duration - 1))
      this.skip('r');
    else
      this.setCurrent(this.current + 1);

    return this
  }
};

$(function()
{
  //setInterval(function(){ Player.playing() }, 1000);
  //Player.setMusic(70,'周杰伦','青花瓷');
  //Player.play();
  $('.music-player1 > .dash1 > .controls1 > a[href="#play"]').click(function()
  {
    Player.play();
    return !1;
  });
  });
