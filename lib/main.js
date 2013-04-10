var menuItem = require("sdk/context-menu");
var self     = require("sdk/self");

var copyRoleItem = menuItem.Item({
    label: "Copy Moodle role settings",

    context: [menuItem.URLContext(/.*moodle.*\/admin\/roles\/define\.php\?action=.*/),
              menuItem.PageContext()],

    contentScriptFile: [self.data.url('jquery-1.9.1.min.js'),
                        self.data.url('setting_reader.js')],

    onMessage: function (roleSettings) {
        if (applyRoleItem == null) {
            applyRoleItem = menuItem.Item({
                label: 'Apply Moodle role settings',

                context: [menuItem.URLContext(/.*moodle.*\/admin\/roles\/define\.php\?action=.*/),
                          menuItem.PageContext()],

                contentScriptFile: [self.data.url('jquery-1.9.1.min.js'),
                                    self.data.url('setting_writer.js')],

                data: roleSettings,

                onMessage: function (notFoundList) {
                    resultPanel.port.emit('not-found', notFoundList);
                    resultPanel.show();
                }
            });
        }
        else {
            applyRoleItem.data = roleSettings;
        }
    }
});


var applyRoleItem = null;


var resultPanel = require('sdk/panel').Panel({
  width: 400,
  height: 300,
  contentURL: self.data.url('result_panel.html'),
  contentScriptFile: [self.data.url('jquery-1.9.1.min.js'),
                      self.data.url('result_panel.js')]
});

resultPanel.port.on('close-panel', function() {
    resultPanel.hide();
});
