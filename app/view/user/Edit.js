Ext.define('AM.view.user.Edit', {
  extend: 'Ext.window.Window',
  alias: 'widget.useredit',

  title: 'Edit User',
  layout: 'fit',
  autoShow: true,

  initComponent: function() {
    this.items = [{
        xtype: 'form',
        items: [{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'name'
          }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email'
          }, {
            xtype: 'datefield',
            format: 'Y-m-d',
            name: 'date',
            fieldLabel: 'date'
          }, {
            xtype: 'util_datetime_field',
            fieldLabel: '选择时间',
            needSecond: true, //需要选择秒
            name: 'datetime'
          }
        ]
      }
    ];

    this.buttons = [{
        text: 'Save',
        action: 'save'
      }, {
        text: 'Cancel',
        scope: this,
        handler: this.close
      }
    ];

    this.callParent(arguments);
  }
});
