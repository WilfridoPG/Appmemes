cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "org.devgeeks.Canvas2ImagePlugin.Canvas2ImagePlugin",
    "file": "plugins/org.devgeeks.Canvas2ImagePlugin/www/Canvas2ImagePlugin.js",
    "pluginId": "org.devgeeks.Canvas2ImagePlugin",
    "clobbers": [
      "window.canvas2ImagePlugin"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-dialogs": "2.0.1",
  "org.devgeeks.Canvas2ImagePlugin": "0.6.0"
};
// BOTTOM OF METADATA
});