$(document).ready(function() {
    // MODAL
    var modalText = {
      cv: {
        title: 'Computer Vision to Identify emission sources',
        tag: 'Transforming air-quality management',
        detail:
          "We've harnessed computer vision technology to analyze traffic data and address the significant issue of urban air pollution caused by traffic emissions. Our innovative approach utilizes algorithms like YOLO and SORT to detect, track, and categorize vehicles from surveillance footage. By correlating specific traffic characteristics with pollution levels, we aim to enhance land regression models for predicting future pollution. This application of computer vision represents a significant stride in understanding and managing urban air pollution.",
        link: ''
      },
      sentimentAnalysis: {
        title: 'Sentiment Analysis on Airlines data using Neo4J',
        tag: 'Airlines industry...',
        detail:
          'The purpose of this project was to understand the sentiments of travelers on airlines in the United States using sentiment analysis techniques. We extracted sentiment information from Twitter posts during the month of February 2015 and analyzed the data to gain insights into the overall emotional tone of the public towards the airline industry. Furthermore, we compared the performance of a graphical database system, specifically Neo4j, with that of a traditional relational database management system (RDBMS), such as MySQL.',
        link: ''
      }
    };
  
    $('#project-list .button').on('click', function() {
       
      fillModal(this.id);
      $('.modal-wrap').addClass('visible');
    });
  
    $('.close').on('click', function() {
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    $('.mask').on('click', function() {
      $('.modal-wrap, #modal .button').removeClass('visible');
    });
  
    var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth / 3,
      dragStart,
      dragEnd;
  
    setDimensions();
  
    $('#next').click(function() {
      shiftSlide(-1);
    });
    $('#prev').click(function() {
      shiftSlide(1);
    });
  
    carousel.on('mousedown', function() {
      if (carousel.hasClass('transition')) return;
      dragStart = event.pageX;
      $(this).on('mousemove', function() {
        dragEnd = event.pageX;
        $(this).css('transform', 'translateX(' + dragPos() + 'px)');
      });
      $(document).on('mouseup', function() {
        if (dragPos() > threshold) {
          return shiftSlide(1);
        }
        if (dragPos() < -threshold) {
          return shiftSlide(-1);
        }
        shiftSlide(0);
      });
    });
  
    function setDimensions() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        slideWidth = $(window).innerWidth();
      }
      $('.carousel-wrap, .slide').css('width', slideWidth);
      $('.modal').css('max-width', slideWidth);
      $('#carousel').css('left', slideWidth * -1);
    }
  
    function dragPos() {
      return dragEnd - dragStart;
    }
  
    function shiftSlide(direction) {
      if (carousel.hasClass('transition')) return;
      dragEnd = dragStart;
      $(document).off('mouseup');
      carousel
        .off('mousemove')
        .addClass('transition')
        .css('transform', 'translateX(' + direction * slideWidth + 'px)');
      setTimeout(function() {
        if (direction === 1) {
          $('.slide:first').before($('.slide:last'));
        } else if (direction === -1) {
          $('.slide:last').after($('.slide:first'));
        }
        carousel.removeClass('transition');
        carousel.css('transform', 'translateX(0px)');
      }, 700);
    }
  
    function fillModal(id) {
      $('#modal .title').text(modalText[id].title);
      $('#modal .detail').text(modalText[id].detail);
      $('#modal .tag').text(modalText[id].tag);
      if (modalText[id].link)
        $('#modal .button')
          .addClass('visible')
          .parent()
          .attr('href', modalText[id].link);
  
      $.each($('#modal li'), function(index, value) {
        $(this).text(modalText[id].bullets[index]);
      });
      $.each($('#modal .slide'), function(index, value) {
        $(this).css({
          background:
            "url('assets/images/" + id + '-' + index + ".png') center center/cover",
          backgroundSize: 'cover'
        });
      });
    }
  });
  