/*
 *@author: stonelee
 *@email: istonelee@gmail.com
 *@blog: http://stonelee.info
 *@description: DatetimeField
 日期时间选择控件
 通过needHour,needMinute,needSecond调整时分秒的显示
 format为控件显示时间格式
 调用方法：
  {
    xtype:'util_datetime_field',
    fieldLabel: '选择时间',
    needSecond:true,//需要选择秒
    name:'datetime',
    value:'2011-02-14 13:24:00'
  }
*/

Ext.define('CIIS.view.util.DatetimeField', {
  extend: 'Ext.form.field.Date',
  alias: 'widget.util_datetime_field',
  requires: ['CIIS.view.util.DatetimePicker'],

  needHour: true,
  needMinute: true,
  needSecond: false,
  format: 'Y-m-d H:i:s',

  createPicker: function() {
    var me = this,
      picker = this.callParent();

    return Ext.widget('util_datetime_picker', Ext.applyIf({
      format: me.format,
      needHour: me.needHour,
      needMinute: me.needMinute,
      needSecond: me.needSecond,
      listeners: {
        scope: me,
        select: me.onSelect,
        close: me.onClose
      }
    },
      picker.initialConfig));
  },

  onExpand: function() {
    var value = this.getValue();
    this.picker.setValue(Ext.isDate(value) ? value : Ext.Date.clearTime(new Date()));
  },

  onSelect: function(m, value) {
    var me = this;
    me.setValue(value);
    me.fireEvent('select', me, value);
  },

  onClose: function(m, value) {
    this.setValue(value);
    this.collapse();
  }
});
