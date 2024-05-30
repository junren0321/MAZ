$( document ).ready( function() {

    var entries = [ 

        { image: './img/search.png', width: '50', height: '50', url: './search.html', target: '_top', tooltip: 'Explore' },

        { label: 'Friendship', url: './search.html?theme=theme-1', target: '_top', tooltip: 'Theme' },
        { label: 'Adventure', url: './search.html?theme=theme-2', target: '_top', tooltip: 'Theme' },
        { label: 'Character', url: './search.html?theme=theme-3', target: '_top', tooltip: 'Theme' },
        { label: 'Life Lessons', url: './search.html?theme=theme-4', target: '_top', tooltip: 'Theme'},
        { label: 'History', url: './search.html?theme=theme-5', target: '_top', tooltip: 'Theme' },
        { label: 'Imagination', url: './search.html?theme=theme-6', target: '_top', tooltip: 'Theme' },
        { label: 'Emotions', url: './search.html?theme=theme-7', target: '_top', tooltip: 'Theme' },
        { label: 'Nature', url: './search.html?theme=theme-8', target: '_top', tooltip: 'Theme' },
        { label: 'Art', url: './search.html?theme=theme-9', target: '_top', tooltip: 'Theme' },
        { label: 'Science Fiction', url: './search.html?theme=theme-10', target: '_top', tooltip: 'Theme' },
        { label: 'Inspirational', url: './search.html?theme=theme-11', target: '_top', tooltip: 'Theme' },
        { label: 'Others', url: './search.html?theme=theme-12', target: '_top', tooltip: 'Theme' },
        { label: 'Chinese', url: './search.html?language=Chinese', target: '_top', tooltip: 'Language' },
        { label: 'English', url: './search.html?language=English', target: '_top', tooltip: 'Language' },
        { label: 'Others', url: './search.html?language=Others', target: '_top', tooltip: 'Language' },

    ];

    var settings = {

        entries: entries,
        width: 580,
        height: 580,
        radius: '75%',
        radiusMin: 75,
        bgDraw: true,
        bgColor: 'rgba(254,248,230,255)',
        opacityOver: 1.00,
        opacityOut: 0.05,
        opacitySpeed: 6,
        fov: 800,
        speed: 1.5,
        fontFamily: 'Oswald, Arial, sans-serif',
        fontSize: '20',
        fontColor: '#000',
        fontWeight: 'bold',//bold
        fontStyle: 'normal',//italic 
        fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        fontToUpperCase: true,
        tooltipFontFamily: 'Oswald, Arial, sans-serif',
        tooltipFontSize: '13',
        tooltipFontColor: '#000',
        tooltipFontWeight: 'normal',//bold
        tooltipFontStyle: 'normal',//italic 
        tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
        tooltipFontToUpperCase: false,
        tooltipTextAnchor: 'middle',
        tooltipDiffX: 0,
        tooltipDiffY: 20

    };

    //var svg3DTagCloud = new SVG3DTagCloud( document.getElementById( 'holder'  ), settings );
    $( '#tagcloud' ).svg3DTagCloud( settings );

} );