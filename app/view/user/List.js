Ext.define('AM.view.user.List', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.userlist',
  requires: 'Ext.ux.RowExpander',
  title: 'All Users',

  store: 'Users',

  initComponent: function() {
    this.columns = [{
        header: 'Name',
        dataIndex: 'name',
        flex: 1
      }, {
        header: 'Email',
        dataIndex: 'email',
        flex: 1
      }, {
        header: 'Date',
        dataIndex: 'date',
        flex: 1
      }, {
        header: 'Datetime',
        dataIndex: 'datetime',
        flex: 1
      }
    ];

    this.callParent(arguments);
  },

  plugins: [{
      ptype: 'rowexpander',
      rowBodyTpl: ['<p><b>备注:</b></p><p>{remark}</p><p><b>通知文件:</b></p>']
    }
  ]

});
