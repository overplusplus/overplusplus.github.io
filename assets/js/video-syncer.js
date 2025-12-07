(function($){

  $.fn.syncer = function(options) {
    var options = $.extend({
      reset_height: false,
      click_to_pause: true,
      hover_to_sync: true,
      fixed_height_timeout: 500,
    }, options);

    return this.each(function() {
      var container = $(this);

      function fixHeight() {
        fixed = false;
        
        videos = container.find("video").toArray();
        for (let v of videos) {
          if (v.readyState < 3) return false;
        }

        if (container.height() !== undefined) {
          container.css("height", container.height() + "px");
          fixed = fixed | true;
        }

        video_height = null;
        for (let v of videos) {
          if (v.clientHeight !== undefined) {
            // v.style.height = v.clientHeight + "px";
            // fixed = fixed & false;
            if (video_height === null) video_height = v.clientHeight;
            else video_height = Math.max(video_height, v.clientHeight);
          }
        }
        for (let v of videos) {
          if (video_height !== null) {
            v.style.height = video_height + "px";
            fixed = fixed | true;
          }
        }
        return fixed;
      }
      if (options.reset_height) {
        container.css("height", "auto");
        videos = container.find("video").toArray();
        for (let v of videos) {
          v.style.height = "auto";
        }
      }
      function tryFixHeight() {
        let fixed = fixHeight();
        if (!fixed) {
          setTimeout(tryFixHeight, options.fixed_height_timeout);
        } else {
          console.log("Fixed video container height.");
        }
      }

      setTimeout(tryFixHeight, options.fixed_height_timeout);

      async function _pauseOneVideo(v) {
        v.pause();
      }
      async function _playOneVideo(v) {
        v.play();
      }
      function playAll(_videos) {
        Promise.all(_videos.map(_playOneVideo));
      }
      function pauseAll(_videos) {
        Promise.all(_videos.map(_pauseOneVideo));
        set_time = _videos[0].currentTime;
        for (let v of _videos) {
          v.currentTime = set_time;
        }
      }

      // some video utility funnctions
      var playing = true;
      var syncVideos = function() {
        
        videos = container.find("video").toArray();
        pauseAll(videos);
        if (playing) {
          playAll(videos);
        }
        
      }

      var pauseVideosOnClick = function() {
        videos = container.find("video").toArray();
        if (playing) {
          pauseAll(videos);
          playing = false;
        } else {
          playAll(videos);
          playing = true;
        }
      }
      if (options.hover_to_sync) {
        container.on("mouseenter", syncVideos);
      }
      if (options.click_to_pause) {
        container.on("click", pauseVideosOnClick);
      }

      setTimeout(function() {
        syncVideos();
      }, 1000);
    });
  };

})(jQuery);