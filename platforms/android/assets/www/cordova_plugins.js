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
    "id": "cordova-plugin-dialogs.notification_android",
    "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
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
  },
  {
    "id": "cordova-plugin-network-information.network",
    "file": "plugins/cordova-plugin-network-information/www/network.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "navigator.connection",
      "navigator.network.connection"
    ]
  },
  {
    "id": "cordova-plugin-network-information.Connection",
    "file": "plugins/cordova-plugin-network-information/www/Connection.js",
    "pluginId": "cordova-plugin-network-information",
    "clobbers": [
      "Connection"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-dialogs": "2.0.1",
  "org.devgeeks.Canvas2ImagePlugin": "0.6.0",
  "cordova-plugin-network-information": "2.0.1"
};
// BOTTOM OF METADATA
});