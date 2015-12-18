(function(){

  angular.module('obaui')

    .config(function($mdThemingProvider) {
      $mdThemingProvider.definePalette('SoveePrimaryPalette', {
        '50': 'eeffee',
        '100': 'e4e4e4',
        '200': 'c4c4c4',
        '300': '00B5B8',
        '400': '00A0A3',
        '500': '008A8D',
        '600': '00787A',
        '700': '006466',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'f6d602',
        'A200': 'f27606',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.definePalette('SoveeSecondaryPalette', {
        '50': 'eeffee',
        '100': '60A2C7',
        '200': '60A2C7',
        '300': '60A2C7',
        '400': '60A2C7',
        '500': '4491bd',
        '600': '38799F',
        '700': '38799F',
        '800': '38799F',
        '900': '38799F',
        'A100': 'f27606',
        'A200': 'cdd32a',
        'A400': 'dce0e1',
        'A700': 'd3ccbc',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
      });
      $mdThemingProvider.theme('default')
        .primaryPalette('SoveePrimaryPalette', {
          'default' :   '500',    // default sovee green
          'hue-1'   :   'A100',   // default sovee secondary yellow
          'hue-2'   :   'A200',   // sovee secondary orange
          'hue-3'   :   'A700'    // sovee secondary brown
        })
        .accentPalette('SoveeSecondaryPalette', {
          'default' :   '500',    // sovee primary blue
          'hue-1'   :   'A100',   // sovee primary dark blue
          'hue-2'   :   'A200',   // sovee secondary green-yellow
          'hue-3'   :   'A400'    // sovee secondary gray
        });
    });


})();

// default sovee green                 008A8D
// sovee primary dark blue             002f47
// sovee primary blue                  4491bd
// sovee secondary brown               d50000
// default sovee secondary yellow      f6d602
// sovee secondary orange              f27606
// sovee secondary green-yellow        cdd32a
// sovee secondary gray                dce0e1

