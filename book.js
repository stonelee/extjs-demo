Ext.Loader.setConfig({
  // 是否禁用缓存，通过添加_dc参数的时间戳值
  disableCaching: false
});

Ext.Loader.setPath({
  'Examples': 'examples'
});

Ext.require([
    'Examples.view.sms.Extension'
]);

Ext.application({
  requires: ['Ext.container.Viewport'],
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
          xtype: 'sms'
        }
      ]
    });
  }
});
