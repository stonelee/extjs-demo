/*
 *@author: stonelee
 *@email: istonelee@gmail.com
 *@blog: http://stonelee.info
 *@description: DatetimePicker
 */

Ext.define('CIIS.view.util.DatetimePicker', {
  extend: 'Ext.picker.Date',
  alias: 'widget.util_datetime_picker',

  needHour: true,
  needMinute: true,
  needSecond: true,
  todayText: '当前时间',
  ariaTitle: '',
  longDayFormat: 'Y-m-d',

  initComponent: function() {
    this.callParent();
    this.value = this.value || Ext.Date.clearTime(new Date());
    this.addEvents('close');
  },

  onRender: function(container, position) {
    var me = this,
      timeContainer, closeBtn;

    this.callParent(arguments);

    timeContainer = this.createTimeContainer();
    timeContainer.getEl().insertBefore(this.todayBtn.getEl());
    me.timeField = timeContainer.down('displayfield');
    me.hourSlider = timeContainer.down('sliderfield[name=hour]');
    me.minuteSlider = timeContainer.down('sliderfield[name=minute]');
    me.secondSlider = timeContainer.down('sliderfield[name=second]');

    closeBtn = Ext.create('Ext.button.Button', {
      renderTo: document.body,
      text: 'close',
      handler: function() {
        me.fireEvent('close', me, me.value);
      }
    });
    closeBtn.getEl().insertAfter(this.todayBtn.getEl());
  },

  setValue: function(value) {
    this.value = value;
    this.updateTime();
    return this.update(this.value);
  },

  createMonthPicker: function() {
    this.callParent();

    var me = this,
      picker = me.monthPicker;
    if (me.zIndexManager) {
      me.zIndexManager.register(me.monthPicker);
      me.zIndexManager.bringToFront(me.monthPicker);
    }
    return picker;
  },

  onOkClick: function(picker, value) {
    this.callParent(arguments);

    var me = this,
      date = me.getActive();

    if (me.needHour) {
      date.setHours(me.value.getHours());
    }
    if (me.needMinute) {
      date.setMinutes(me.value.getMinutes());
    }
    if (me.needSecond) {
      date.setSeconds(me.value.getSeconds());
    }
    me.setValue(date);
    me.fireEvent('select', me, me.value);
  },

  handleDateClick: function(e, t) {
    var me = this,
      hour = me.value.getHours(),
      minute = me.value.getMinutes(),
      second = me.value.getSeconds(),
      datetime,
      handler = me.handler;

    e.stopEvent();
    if (!me.disabled && t.dateValue && !Ext.fly(t.parentNode).hasCls(me.disabledCellCls)) {
      me.cancelFocus = me.focusOnSelect === false;

      datetime = new Date(t.dateValue);
      datetime = Ext.Date.add(datetime, Ext.Date.HOUR, hour);
      datetime = Ext.Date.add(datetime, Ext.Date.MINUTE, minute);
      datetime = Ext.Date.add(datetime, Ext.Date.SECOND, second);
      me.setValue(datetime);

      delete me.cancelFocus;
      me.fireEvent('select', me, me.value);
      if (handler) {
        handler.call(me.scope || me, me, me.value);
      }
      // event handling is turned off on hide
      // when we are using the picker in a field
      // therefore onSelect comes AFTER the select
      // event.
      me.onSelect();
    }
  },

  selectToday: function() {
    var me = this,
      time = new Date(),
      btn = me.todayBtn,
      handler = me.handler;

    if (btn && !btn.disabled) {
      if (!me.needHour) {
        time.setHours(0);
      }
      if (!me.needMinute) {
        time.setMinutes(0);
      }
      if (!me.needSecond) {
        time.setSeconds(0);
      }
      me.setValue(time);
      me.fireEvent('select', me, me.value);
      if (handler) {
        handler.call(me.scope || me, me, me.value);
      }
      me.onSelect();
    }
    return me;
  },

  selectedUpdate: function(date, active) {
    var me = this,
      t = Ext.Date.clearTime(date, true).getTime(),
      cells = me.cells,
      cls = me.selectedCls;

    cells.removeCls(cls);
    cells.each(function(c) {
      if (c.dom.firstChild.dateValue === t) {
        me.el.dom.setAttribute('aria-activedescendent', c.dom.id);
        c.addCls(cls);
        if (me.isVisible() && !me.cancelFocus) {
          Ext.fly(c.dom.firstChild).focus(50);
        }
        return false;
      }
    },
      this);
  },

  updateTime: function() {
    var me = this,
      hour = me.value.getHours(),
      minute = me.value.getMinutes(),
      second = me.value.getSeconds(),
      time = me.value.toLocaleTimeString();

    if (me.rendered) {
      me.timeField.setValue(time);
      if (me.needHour) {
        me.hourSlider.setValue(hour);
      }
      if (me.needMinute) {
        me.minuteSlider.setValue(minute);
      }
      if (me.needSecond) {
        me.secondSlider.setValue(second);
      }
    }
  },

  createTimeContainer: function() {
    var container = Ext.create('Ext.container.Container', {
      renderTo: document.body,
      defaults: {
        labelWidth: 40,
        labelAlign: 'right',
        width: 150
      },
      items: [{
          xtype: 'displayfield',
          name: 'time',
          fieldLabel: '时间',
          value: '00:00:00'
        }
      ]
    });

    if (this.needHour) {
      container.add(this.createHour());
    }
    if (this.needMinute) {
      container.add(this.createMinute());
    }
    if (this.needSecond) {
      container.add(this.createSecond());
    }

    return container;
  },

  createHour: function() {
    var me = this;
    return {
      xtype: 'sliderfield',
      name: 'hour',
      fieldLabel: '时',
      increment: 1,
      minValue: 0,
      maxValue: 23,
      listeners: {
        change: function(slider, value) {
          me.value.setHours(value);
          me.changeTime();
        }
      }
    };
  },

  createMinute: function() {
    var me = this;
    return {
      xtype: 'sliderfield',
      name: 'minute',
      fieldLabel: '分',
      increment: 1,
      minValue: 0,
      maxValue: 59,
      listeners: {
        change: function(slider, value) {
          me.value.setMinutes(value);
          me.changeTime();
        }
      }
    };
  },

  createSecond: function() {
    var me = this;
    return {
      xtype: 'sliderfield',
      name: 'second',
      fieldLabel: '秒',
      increment: 1,
      minValue: 0,
      maxValue: 59,
      listeners: {
        change: function(slider, value) {
          me.value.setSeconds(value);
          me.changeTime();
        }
      }
    };
  },

  changeTime: function() {
    var me = this,
      time = me.value.toLocaleTimeString();

    me.timeField.setValue(time);
    me.fireEvent('select', me, me.value);
  }

});
