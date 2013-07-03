Ext.Loader.setConfig({
  // 是否禁用缓存，通过添加_dc参数的时间戳值
  disableCaching: false
});

Ext.Loader.setPath({
  'Ext.ux': 'extjs/ux',
  'CIIS': 'app'
});

Ext.require([
    'CIIS.view.util.DatetimePicker',
    'CIIS.view.util.DatetimeField'
]);

Ext.application({
  requires: ['Ext.container.Viewport'],
  name: 'AM',
  appFolder: 'app',

  controllers: [
      'Users'
  ],

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
          xtype: 'userlist'
        }
      ]
    });
  }
});
Ext.onReady(function() {
  var timeUrl = 'data/time.json';
  Ext.override(CIIS.view.util.DatetimePicker, {
    url: timeUrl
  });

  Ext.override(Ext.picker.Date, {
    selectToday: function() {
      var me = this,
        btn = me.todayBtn,
        handler = me.handler;

      if (btn && !btn.disabled) {
        Ext.Ajax.request({
          url: timeUrl,
          success: function(response) {
            var data = response.responseText;
            data = Ext.JSON.decode(data);
            var time = new Date(data.time);

            me.setValue(Ext.Date.clearTime(time));
            me.fireEvent('select', me, me.value);
            if (handler) {
              handler.call(me.scope || me, me, me.value);
            }
            me.onSelect();
          }
        });
      }
      return me;
    }
  });

  Ext.override(Ext.picker.Date, {
    onRender: function(container, position) {
      var me = this;
      this.callOverridden(arguments);

      me.clearBtn = Ext.create('Ext.button.Button', {
        renderTo: me.footerEl,
        text: '清空',
        tooltip: '清空',
        handler: me.clearDay,
        scope: me
      });
    },

    clearDay: function() {
      var me = this,
        btn = me.clearBtn;

      if (btn && !btn.disabled) {
        me.fireEvent('select', me, '');
      }
      return me;
    },

  });
});
