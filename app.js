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
