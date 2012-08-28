function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.DateImplementation = {"":
 ["millisecondsSinceEpoch?", "isUtc"],
 super: "Object",
 operator$eq$1: function(other) {
  if (!(typeof other === 'object' && other !== null && !!other.is$Date))
    return false;
  return $.eq(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
},
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
},
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.call$1(this.get$year());
  var m = t3.call$1(this.get$month());
  var d = t3.call$1(this.get$day());
  var h = t3.call$1(this.get$hour());
  var min = t3.call$1(this.get$minute());
  var sec = t3.call$1(this.get$second());
  var ms = t2.call$1(this.get$millisecond());
  if (this.isUtc === true)
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  else
    return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
},
 add$1: function(duration) {
  return $.DateImplementation$fromMillisecondsSinceEpoch($.add(this.millisecondsSinceEpoch, duration.get$inMilliseconds()), this.isUtc);
},
 get$year: function() {
  return $.Primitives_getYear(this);
},
 get$month: function() {
  return $.Primitives_getMonth(this);
},
 get$day: function() {
  return $.Primitives_getDay(this);
},
 get$hour: function() {
  return $.Primitives_getHours(this);
},
 get$minute: function() {
  return $.Primitives_getMinutes(this);
},
 get$second: function() {
  return $.Primitives_getSeconds(this);
},
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
},
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000))
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
  t1 = this.isUtc;
  if (t1 == null)
    throw $.captureStackTrace($.IllegalArgumentException$(t1));
},
 DateImplementation$now$0: function() {
  $.Primitives_lazyAsJsDate(this);
},
 is$Date: true
};

$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_isComplete", "_lib1_value?", "_exception", "_stackTrace", "_exceptionHandled", "_successListeners", "_exceptionHandlers", "_completionListeners"],
 super: "Object",
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib1_value;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    this._successListeners.push(onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    this._exceptionHandlers.push(onException);
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib1_value = value;
  this._complete$0();
},
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
},
 transform$1: function(transformation) {
  var completer = $.CompleterImpl$();
  this.handleException$1(new $.FutureImpl_transform_anon(this, completer));
  this.then$1(new $.FutureImpl_transform_anon0(completer, transformation));
  return completer.get$future();
},
 get$transform: function() { return new $.BoundClosure(this, 'transform$1'); }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 get$future: function() {
  return this._futureImpl;
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
}
};

$$.HashMapImplementation = {"":
 ["_keys?", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 super: "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC13 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC13 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC13)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC13)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (index < 0 || index >= t1.length)
      throw $.ioore(index);
    var t2 = t1[index] === $.CTC13;
    t1 = t2;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC13;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if (typeof index !== 'number')
    return this.operator$index$1$bailout(1, index, 0);
  if (index < 0)
    return;
  var t1 = this._values;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$index$1$bailout(2, t1, index);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  return t1[index];
},
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      index = env0;
      break;
    case 2:
      t1 = env0;
      index = env1;
      break;
  }
  switch (state) {
    case 0:
      var index = this._probeForLookup$1(key);
    case 1:
      state = 0;
      if ($.ltB(index, 0))
        return;
      var t1 = this._values;
    case 2:
      state = 0;
      return $.index(t1, index);
  }
},
 putIfAbsent$2: function(key, ifAbsent) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0))
    return $.index(this._values, index);
  var value = ifAbsent.call$0();
  this.operator$indexSet$2(key, value);
  return value;
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC13);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC13))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC13))
      f.call$2(key, $.index(this._values, i));
  }
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 clear$0: function() {
  $.clear(this._backingMap);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  if (value < 0 || value >= t1.length)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true)
    return false;
  t1.remove$1(value);
  return true;
},
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, {E: 'E'});
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_entries", "_nextValidIndex"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC13)
    this._advance$0();
  return this._nextValidIndex < t2.length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC13)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC14);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= t1.length)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC13);
},
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC13);
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["key?", "value="],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_list", "_map"],
 super: "Object",
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    if (key < 0 || key >= t1.length)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 putIfAbsent$2: function(key, ifAbsent) {
  var value = this.operator$index$1(key);
  if (this.operator$index$1(key) == null && this.containsKey$1(key) !== true) {
    value = ifAbsent.call$0();
    this.operator$indexSet$2(key, value);
  }
  return value;
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 get$length: function() {
  return $.get$length(this._map);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'KeyValuePair<K, V>'});
  this._list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_previous=", "_next=", "_element?"],
 super: "Object",
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  t1._link$2(this._previous, this);
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 get$element: function() {
  return this._element;
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_previous", "_next", "_element"],
 super: "DoubleLinkedQueueEntry",
 remove$0: function() {
  throw $.captureStackTrace($.CTC16);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 get$element: function() {
  throw $.captureStackTrace($.CTC16);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 first$0: function() {
  return this._sentinel.get$_next().get$element();
},
 get$first: function() { return new $.BoundClosure0(this, 'first$0'); },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, {E: 'E'});
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    if (f.call$1(entry.get$_element()) === true)
      other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_sentinel", "_currentEntry"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC14);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_lib1_pattern"],
 super: "Object",
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var t1 = $.get$length($.index(m, 0));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var matchEnd = matchStart + t1;
  return $._MatchImplementation$(this.get$pattern(), str, matchStart, matchEnd, m);
},
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 get$pattern: function() {
  return this._lib1_pattern;
},
 get$multiLine: function() {
  return this._multiLine;
},
 get$ignoreCase: function() {
  return this._ignoreCase;
},
 is$JSSyntaxRegExp: true,
 is$RegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_length"],
 super: "Object",
 get$length: function() {
  return this._length;
},
 isEmpty$0: function() {
  return this._length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$._MatchImplementation = {"":
 ["pattern?", "str", "_lib1_start", "_lib1_end", "_groups"],
 super: "Object",
 _lib1_start$1: function(arg0) { return this._lib1_start.call$1(arg0); },
 _lib1_end$1: function(arg0) { return this._lib1_end.call$1(arg0); },
 start$0: function() {
  return this._lib1_start;
},
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 group$1: function(index) {
  var t1 = this._groups;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.group$1$bailout(1, t1, index);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  return t1[index];
},
 group$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
},
 operator$index$1: function(index) {
  return this.group$1(index);
}
};

$$._AllMatchesIterable = {"":
 ["_re", "_str"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_re", "_str", "_next=", "_done"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC14);
  var next = this._next;
  this._next = null;
  return next;
},
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value?"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 super: "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_pattern", "_errmsg"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.CastException = {"":
 ["actualType", "expectedType"],
 super: "Object",
 toString$0: function() {
  return 'CastException: Casting value of type ' + $.S(this.actualType) + ' to' + ' incompatible type ' + $.S(this.expectedType);
}
};

$$.ListIterator = {"":
 ["i", "list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.ConstantMap = {"":
 ["length?", "_jsObject", "_lib2_keys?"],
 super: "Object",
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return this._jsObject[key];
},
 forEach$1: function(f) {
  $.forEach(this._lib2_keys, new $.ConstantMap_forEach_anon(this, f));
},
 getKeys$0: function() {
  return this._lib2_keys;
},
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib2_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC26);
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 putIfAbsent$2: function(key, ifAbsent) {
  return this._throwImmutable$0();
},
 remove$1: function(key) {
  return this._throwImmutable$0();
},
 clear$0: function() {
  return this._throwImmutable$0();
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_lib2_set?"],
 super: "Object",
 _lib2_set$3: function(arg0, arg1, arg2) { return this._lib2_set.call$3(arg0, arg1, arg2); }
};

$$.StringMatch = {"":
 ["_lib2_start", "str", "pattern?"],
 super: "Object",
 start$0: function() {
  return this._lib2_start;
},
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 operator$index$1: function(g) {
  return this.group$1(g);
},
 group$1: function(group_) {
  if (typeof group_ !== 'number')
    return this.group$1$bailout(1, group_);
  if (!(group_ === 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 group$1$bailout: function(state, group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 _lib2_start$1: function(arg0) { return this._lib2_start.call$1(arg0); }
};

$$.MapDemo = {"":
 ["_title", "_mainView", "_dlgInfos", "_container", "_creating"],
 super: "Activity",
 onCreate_$0: function() {
  var t1 = {};
  this.get$mainView().get$style().set$backgroundColor('#000000');
  this.get$mainView().get$style().set$overflow('hidden');
  var panel = $.View$();
  panel.get$profile().set$text('location: center center; width: 90%; height: 90%');
  var img = $.Image$(null);
  img.set$src('res/dutch-west-india-company-map.jpg');
  img.get$profile().set$text('location: center center');
  panel.addChild$1(img);
  this.get$mainView().addChild$1(panel);
  img.get$node().set$draggable(false);
  t1.diff_1 = null;
  t1.trans_2 = null;
  $.add$1(img.get$on().get$preLayout(), new $.MapDemo_onCreate__anon(395, panel, img, t1, 500));
  $._ZoomGesture$(this.get$mainView().get$node(), new $.MapDemo_onCreate__anon0(this, img, t1), new $.MapDemo_onCreate__anon1(img, t1), new $.MapDemo_onCreate__anon2(t1));
  $._DragGesture__DragGesture(this.get$mainView().get$node(), null, new $.MapDemo_onCreate__anon3(img, t1), new $.MapDemo_onCreate__anon4(t1));
},
 center$1: function(v) {
  var size = $.DOMQuery_DOMQuery(v).get$outerSize();
  return $.add($.DOMQuery_DOMQuery(v).get$pageOffset(), $._Offset$($.div(size.get$width(), 2), $.div(size.get$height(), 2)));
}
};

$$._Default = {"":
 [],
 super: "Object"
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
},
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
}
};

$$.FilteredElementList = {"":
 ["_lib_node", "_childNodes"],
 super: "Object",
 get$_filtered: function() {
  return $.ListFactory_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC71);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure(this, 'add$1'); },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 addLast$1: function(value) {
  this.add$1(value);
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return $.last(this.get$_filtered());
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_lib_element?", "_childElements"],
 super: "Object",
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListFactory_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 isEmpty$0: function() {
  return this._lib_element.get$$$dom_firstElementChild() == null;
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC69);
},
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
},
 addLast$1: function(value) {
  return this.add$1(value);
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC70);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  this._lib_element.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._lib_element.$dom_removeChild$1(result);
  return result;
},
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC69);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC69);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC69);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC69);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC69);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC69);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC69);
},
 last$0: function() {
  return $.last(this._nodeList);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_list", "_index"],
 super: "Object",
 _index$2: function(arg0, arg1) { return this._index.call$2(arg0, arg1); },
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC14);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC14);
      var t1 = this._lib_list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._lib_list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementAttributeMap = {"":
 ["_lib_element?"],
 super: "Object",
 containsKey$1: function(key) {
  return this._lib_element.$dom_hasAttribute$1(key);
},
 operator$index$1: function(key) {
  return this._lib_element.$dom_getAttribute$1(key);
},
 operator$indexSet$2: function(key, value) {
  this._lib_element.$dom_setAttribute$2(key, $.S(value));
},
 putIfAbsent$2: function(key, ifAbsent) {
  if (this.containsKey$1(key) !== true)
    this.operator$indexSet$2(key, ifAbsent.call$0());
  return this.operator$index$1(key);
},
 remove$1: function(key) {
  var t1 = this._lib_element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
},
 clear$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
},
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1))
    this.remove$1($.index(attributes, i).get$name());
},
 forEach$1: function(f) {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var item = attributes[i];
    f.call$2(item.get$name(), item.get$value());
  }
},
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.call$2(item.get$name(), item.get$value());
  }
},
 getKeys$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, {E: 'String'});
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var t1 = attributes[i].get$name();
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 getKeys$0$bailout: function(state, attributes) {
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, {E: 'String'});
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
},
 getValues$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))
    return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, {E: 'String'});
  for (var len = attributes.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= attributes.length)
      throw $.ioore(i);
    var t1 = attributes[i].get$value();
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 getValues$0$bailout: function(state, attributes) {
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, {E: 'String'});
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    values[i] = t1;
  }
  return values;
},
 get$length: function() {
  return $.get$length(this._lib_element.get$$$dom_attributes());
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 is$Map: function() { return true; }
};

$$._DataAttributeMap = {"":
 ["$$dom_attributes?"],
 super: "Object",
 containsKey$1: function(key) {
  return this.$$dom_attributes.containsKey$1(this._attr$1(key));
},
 operator$index$1: function(key) {
  return $.index(this.$$dom_attributes, this._attr$1(key));
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.$$dom_attributes, this._attr$1(key), $.S(value));
},
 putIfAbsent$2: function(key, ifAbsent) {
  return this.$$dom_attributes.putIfAbsent$2(this._attr$1(key), ifAbsent);
},
 remove$1: function(key) {
  return this.$$dom_attributes.remove$1(this._attr$1(key));
},
 clear$0: function() {
  for (var t1 = $.iterator(this.getKeys$0()); t1.hasNext$0() === true;)
    this.remove$1(t1.next$0());
},
 forEach$1: function(f) {
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_forEach_anon(this, f));
},
 getKeys$0: function() {
  var keys = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(keys, {E: 'String'});
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getKeys_anon(this, keys));
  return keys;
},
 getValues$0: function() {
  var values = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(values, {E: 'String'});
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getValues_anon(this, values));
  return values;
},
 get$length: function() {
  return $.get$length(this.getKeys$0());
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 _attr$1: function(key) {
  return 'data-' + $.S(key);
},
 _matches$1: function(key) {
  return $.startsWith(key, 'data-');
},
 _strip$1: function(key) {
  return $.substring$1(key, 5);
},
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_lib_element?"],
 super: "Object",
 toString$0: function() {
  return this._formatSet$1(this._read$0());
},
 iterator$0: function() {
  return $.iterator(this._read$0());
},
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
},
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
},
 get$length: function() {
  return $.get$length(this._read$0());
},
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
},
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
},
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
},
 addAll$1: function(collection) {
  this._modify$1(new $._CssClassSet_addAll_anon(collection));
},
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
},
 _modify$1: function(f) {
  var s = this._read$0();
  f.call$1(s);
  this._write$1(s);
},
 _read$0: function() {
  var s = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(s, {E: 'String'});
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true;) {
    var trimmed = $.trim(t1.next$0());
    if ($.isEmpty(trimmed) !== true)
      s.add$1(trimmed);
  }
  return s;
},
 _classname$0: function() {
  return this._lib_element.get$$$dom_className();
},
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._lib_element.set$$$dom_className(t1);
},
 _formatSet$1: function(s) {
  return $.Strings_join($.ListFactory_List$from(s), ' ');
},
 is$Collection: function() { return true; }
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
},
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
}
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._EventsImpl = {"":
 ["_ptr?"],
 super: "Object",
 operator$index$1: function(type) {
  return $._EventListenerListImpl$(this._ptr, type);
}
};

$$._EventListenerListImpl = {"":
 ["_ptr?", "_type"],
 super: "Object",
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
},
 add$1: function(listener) {
  return this.add$2(listener,false)
},
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
},
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
}
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._HttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
}
};

$$._HttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
}
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
},
 complete$1: function(arg0) { return this.get$complete().call$1(arg0); },
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._IDBVersionChangeRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._InputElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._JavaScriptAudioNodeEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl"
};

$$._MediaStreamEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MediaStreamTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 iterator$0: function() {
  return $.iterator(this._lib_list);
},
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
},
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
},
 get$length: function() {
  return $.get$length(this._lib_list);
},
 operator$index$1: function(index) {
  return $.index(this._lib_list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
},
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
},
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 clear$0: function() {
  return $.clear(this._lib_list);
},
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
},
 last$0: function() {
  return $.last(this._lib_list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib_list, start, rangeLength);
},
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._lib_list, start, rangeLength);
},
 get$first: function() {
  return $.index(this._lib_list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._lib_list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AttributeClassSet = {"":
 ["_lib_element"],
 super: "_CssClassSet",
 $dom_className$0: function() {
  return $.index(this._lib_element.get$attributes(), 'class');
},
 get$$$dom_className: function() { return new $.BoundClosure0(this, '$dom_className$0'); },
 _write$1: function(s) {
  $.indexSet(this._lib_element.get$attributes(), 'class', this._formatSet$1(s));
}
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$resize: function() {
  return this.operator$index$1('resize');
}
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$start: function() {
  return this.operator$index$1('start');
}
};

$$._TextTrackEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackCueEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._TextTrackListEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._WebSocketEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$close: function() {
  return this.operator$index$1('close');
},
 close$0: function() { return this.get$close().call$0(); },
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
},
 get$load: function() {
  return this.operator$index$1('load');
},
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
},
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
},
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
},
 get$reset: function() {
  return this.operator$index$1('reset');
},
 reset$0: function() { return this.get$reset().call$0(); },
 get$resize: function() {
  return this.operator$index$1('resize');
},
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
},
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
},
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
}
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl"
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$error: function() {
  return this.operator$index$1('error');
}
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 get$parent: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__parent(this._window));
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
},
 close$0: function() {
  return $._DOMWindowCrossFrameImpl__close(this._window);
},
 is$Window: function() { return true; }
};

$$._LocationWrapper = {"":
 ["_ptr?"],
 super: "Object",
 toString$0: function() {
  return $._LocationWrapper__toString(this._ptr);
},
 is$Location: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_array", "_pos"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC14);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC14);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$._Manager = {"":
 ["nextIsolateId=", "currentManagerId?", "nextManagerId", "currentContext=", "rootContext=", "topEventLoop?", "fromCommandLine?", "isWorker?", "supportsWorkers", "isolates?", "mainManager?", "managers?"],
 super: "Object",
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["id=", "ports?", "isolateStatics"],
 super: "Object",
 initGlobals$0: function() {
$initGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

}
};

$$._IsolateEvent = {"":
 ["isolate", "fn", "message"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 get$id: function() {
  return 0;
},
 set$id: function(i) {
  throw $.captureStackTrace($.NotImplementedException$(null));
},
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 hashCode$0: function() {
  return this._receivePort.get$_lib9_id();
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_workerId?", "_receivePortId?", "_isolateId"],
 super: "_BaseSendPort",
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_lib9_id?", "_callback?"],
 super: "Object",
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._lib9_id);
},
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._lib9_id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitSendPort$1: function(port) {
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort && port._port == null)
    this.ports.push(port.get$_futurePort());
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port._isolateId, port._receivePort.get$_lib9_id()];
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
},
 visitBufferingSendPort$1: function(port) {
  if (!(port.get$_port() == null))
    return this.visitSendPort$1(port.get$_port());
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 operator$index$1: function(object) {
  return;
},
 operator$indexSet$2: function(object, info) {
},
 reset$0: function() {
},
 cleanup$0: function() {
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  return this.visitObject$1(x);
},
 visitObject$1: function(x) {
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= copy.length)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_10 = $.index(t2, map);
  var t3 = t1.copy_10;
  if (!(t3 == null))
    return t3;
  t1.copy_10 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_10);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_10;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 visitPrimitive$1: function(x) {
  return x;
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= list.length)
      throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    if (i < 0 || i >= result.length)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      return this.deserializeObject$1(x);
  }
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    var t1 = this._deserializeHelper$1(dartList[i]);
    if (i < 0 || i >= dartList.length)
      throw $.ioore(i);
    dartList[i] = t1;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    if (i < 0 || i >= keys.length)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    if (i < 0 || i >= values.length)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 deserializeObject$1: function(x) {
  throw $.captureStackTrace('Unexpected serialized object');
}
};

$$._Timer = {"":
 ["_once", "_handle"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon3(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon2(this, callback), milliSeconds);
}
};

$$.Activity = {"":
 ["_mainView?", "_creating!"],
 super: "Object",
 get$mainView: function() {
  return this._mainView;
},
 run$1: function(containerId) {
  if (!($.activity == null))
    throw $.captureStackTrace($.CTC);
  if (!(this._mainView == null))
    throw $.captureStackTrace($.CTC0);
  $.activity = this;
  $.application()._ready$1(new $.Activity_run_anon(this, containerId));
},
 run$0: function() {
  return this.run$1('v-main')
},
 run$0: function() {
  return this.run$1('v-main')
},
 _lib4_init$1: function(containerId) {
  this._container = !(containerId == null) ? $.document().query$1('#' + $.S(containerId)) : null;
  var t1 = this._container;
  var clses = !(t1 == null) ? t1.get$classes() : $.document().get$body().get$classes();
  $.add$1(clses, 'rikulo');
  $.add$1(clses, $.browser.get$name());
  $.add$1(clses, $.browser.get$touch() === true ? 'touch' : 'desktop');
  if ($.browser.get$ios() === true)
    $.add$1(clses, 'ios');
  else if ($.browser.get$android() === true)
    $.add$1(clses, 'android');
  if (!(this._container == null))
    this.updateSize$0();
  this._mainView = $.Section$();
  t1 = $.browser.get$size().get$width();
  this._mainView.set$width(t1);
  t1 = $.browser.get$size().get$height();
  this._mainView.set$height(t1);
  t1 = this._mainView;
  var t2 = this._container;
  t1.addToDocument$2$shallLayout(!(t2 == null) ? t2 : $.document().get$body(), false);
  $.add$1($.window().get$on().get$resize(), this.get$_onResize());
  t1 = $.browser.get$touch() === true ? $.document().get$on().get$touchStart() : $.document().get$on().get$mouseDown();
  $.add$1(t1, $.Activity__onTouchStart());
},
 get$_onResize: function() {
  var t1 = {};
  if ($.browser.get$android() === true) {
    t1.old_1 = $.DOMQuery_DOMQuery($.window()).get$innerSize();
    return new $.Activity__onResize_anon(this, t1);
  } else
    return new $.Activity__onResize_anon0(this);
},
 updateSize$0: function() {
  var oldsz = $._Size$from($.browser.get$size());
  var t1 = this._container;
  var qcave = $.DOMQuery_DOMQuery(!(t1 == null) ? t1 : $.window());
  t1 = qcave.get$innerWidth();
  $.browser.get$size().set$width(t1);
  t1 = qcave.get$innerHeight();
  $.browser.get$size().set$height(t1);
  if (!$.eqB(oldsz, $.browser.get$size())) {
    t1 = this._mainView;
    if (!(t1 == null)) {
      if (t1.get$width() == null || $.eqB(this._mainView.get$width(), oldsz.width)) {
        t1 = $.browser.get$size().get$width();
        this._mainView.set$width(t1);
        var changed = true;
      } else
        changed = false;
      if (this._mainView.get$height() == null || $.eqB(this._mainView.get$height(), oldsz.height)) {
        t1 = $.browser.get$size().get$height();
        this._mainView.set$height(t1);
        changed = true;
      }
      if (changed)
        this._mainView.requestLayout$0();
    }
    for (t1 = $.iterator(this._dlgInfos); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      t2.resizeMask$0();
      t2.get$dialog().requestLayout$0();
    }
  }
},
 onCreate_$0: function() {
},
 Activity$0: function() {
  this._title = $.application().get$name();
}
};

$$.Application = {"":
 ["name=", "inSimulator", "_readyCB", "_uuid"],
 super: "Object",
 _readyCB$1: function(arg0) { return this._readyCB.call$1(arg0); },
 _ready$1: function(then) {
  if (!(this._readyCB == null))
    this._readyCB$1(then);
  else
    then.call$0();
},
 get$uuid: function() {
  if (this._uuid == null) {
    var body = $.document().get$body();
    if (body == null)
      throw $.captureStackTrace($.CTC52);
    var sval = body.$dom_getAttribute$1('data-rikuloAppCount');
    if (!(sval == null)) {
      this._uuid = $.parseInt(sval);
      body.$dom_setAttribute$2('data-rikuloAppCount', $.toString($.add(this._uuid, 1)));
    } else {
      this._uuid = 0;
      body.$dom_setAttribute$2('data-rikuloAppCount', '1');
    }
  }
  return this._uuid;
},
 toString$0: function() {
  return 'Application(' + $.S(this.name) + ', ' + $.S(this._uuid) + ')';
},
 Application$1: function(name$) {
  this.name = name$;
  $._app = this;
  this.inSimulator = !($.document().query$1('#v-simulator') == null);
  if ($.browser == null)
    $.browser = $.Browser$();
  if ($.viewConfig == null)
    $.viewConfig = $.ViewConfig$();
  if ($.layoutManager == null)
    $.layoutManager = $.LayoutManager$();
}
};

$$.SystemException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'SystemException(' + $.S(this.message) + ')';
},
 is$Exception: true
};

$$._EmptyColl = {"":
 [],
 super: "Object",
 iterator$0: function() {
  return $.CTC66;
},
 forEach$1: function(f) {
},
 filter$1: function(f) {
  return $.CTC65;
},
 isEmpty$0: function() {
  return true;
},
 get$length: function() {
  return 0;
},
 is$Collection: function() { return true; }
};

$$._EmptyIter = {"":
 [],
 super: "Object",
 next$0: function() {
  throw $.captureStackTrace($.CTC14);
},
 hasNext$0: function() {
  return false;
}
};

$$._OnDemandMap = {"":
 ["_creator", "_lib3_map"],
 super: "Object",
 _creator$0: function() { return this._creator.call$0(); },
 _init$0: function() {
  var t1 = this._lib3_map;
  if (!(t1 == null))
    ;
  else {
    t1 = this._creator$0();
    this._lib3_map = t1;
  }
  return t1;
},
 operator$index$1: function(key) {
  var t1 = this._lib3_map;
  return !(t1 == null) ? $.index(t1, key) : null;
},
 operator$indexSet$2: function(key, value) {
  $.indexSet(this._init$0(), key, value);
},
 clear$0: function() {
  var t1 = this._lib3_map;
  if (!(t1 == null))
    $.clear(t1);
},
 containsKey$1: function(key) {
  var t1 = this._lib3_map;
  return !(t1 == null) && t1.containsKey$1(key) === true;
},
 forEach$1: function(f) {
  var t1 = this._lib3_map;
  if (!(t1 == null))
    $.forEach(t1, f);
},
 getKeys$0: function() {
  var t1 = this._lib3_map;
  return !(t1 == null) ? t1.getKeys$0() : $.CTC65;
},
 getValues$0: function() {
  var t1 = this._lib3_map;
  return !(t1 == null) ? t1.getValues$0() : $.CTC65;
},
 isEmpty$0: function() {
  var t1 = this._lib3_map;
  return t1 == null || $.isEmpty(t1) === true;
},
 get$length: function() {
  var t1 = this._lib3_map;
  return !(t1 == null) ? $.get$length(t1) : 0;
},
 putIfAbsent$2: function(key, ifAbsent) {
  return this._init$0().putIfAbsent$2(key, ifAbsent);
},
 remove$1: function(key) {
  var t1 = this._lib3_map;
  return !(t1 == null) ? t1.remove$1(key) : null;
},
 is$Map: function() { return true; }
};

$$.AbstractList = {"":
 [],
 super: "Object",
 filter$1: function(f) {
  return $.Collections_filter(this, [], f);
},
 forEach$1: function(f) {
  return $.Collections_forEach(this, f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 operator$index$1: function(index) {
  if (typeof index !== 'number')
    return this.operator$index$1$bailout(1, index);
  $.ListUtil_rangeCheck(this, index, 1);
  var it = this.iterator$0();
  for (; --index, index >= 0;)
    it.next$0();
  return it.next$0();
},
 operator$index$1$bailout: function(state, index) {
  $.ListUtil_rangeCheck(this, index, 1);
  var it = this.iterator$0();
  for (; index = $.sub(index, 1), $.geB(index, 0);)
    it.next$0();
  return it.next$0();
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC73);
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC73);
},
 add$1: function(element) {
  throw $.captureStackTrace($.CTC73);
},
 addLast$1: function(element) {
  this.add$1(element);
},
 addAll$1: function(elements) {
  for (var t1 = $.iterator(elements); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
},
 indexOf$2: function(element, start) {
  var t1 = !(start == null) ? start : 0;
  return $.Arrays_indexOf(this, element, t1, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,null)
},
 clear$0: function() {
  this.removeRange$2(0, $.get$length(this));
},
 removeLast$0: function() {
  var e = this.last$0();
  this.removeRange$2($.sub($.get$length(this), 1), 1);
  return e;
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 getRange$2: function(start, length$) {
  if ($.eqB(length$, 0))
    return [];
  $.ListUtil_rangeCheck(this, start, length$);
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'T'});
  $.set$length(list, length$);
  $.Arrays_copy(this, start, list, 0, length$);
  return list;
},
 removeRange$2: function(start, length$) {
  throw $.captureStackTrace($.CTC73);
},
 toString$0: function() {
  var result = $.StringBufferImpl$('[');
  for (var t1 = $.iterator(this), comma = null; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (comma === true)
      result.add$1(', ');
    else
      comma = true;
    result.add$1(!(t2 == null) ? $.toString(t2) : 'null');
  }
  return result.toString$0();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$.RunOnceQueue = {"":
 ["_tasks?"],
 super: "Object",
 add$3: function(key, task, timeout) {
  if (!(this._tasks == null))
    this.cancel$1(key);
  else
    this._tasks = $.makeLiteralMap([]);
  $.indexSet(this._tasks, key, $.window().setTimeout$2(new $.RunOnceQueue_add_anon(key, task, this), timeout));
},
 add$2: function(key,task) {
  return this.add$3(key,task,0)
},
 cancel$1: function(key) {
  var tid = this._tasks.remove$1(key);
  if (!(tid == null))
    $.window().clearTimeout$1(tid);
}
};

$$._Offset = {"":
 ["left=", "top="],
 super: "Object",
 get$x: function() {
  return this.left;
},
 get$y: function() {
  return this.top;
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Offset)
    var t1 = $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top());
  else
    t1 = false;
  return t1;
},
 operator$sub$1: function(other) {
  return $._Offset$($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()));
},
 operator$add$1: function(other) {
  return $._Offset$($.add(this.left, other.get$left()), $.add(this.top, other.get$top()));
},
 operator$mul$1: function(scalar) {
  return $._Offset$($.mul(this.left, scalar), $.mul(this.top, scalar));
},
 operator$div$1: function(scalar) {
  return $._Offset$($.div(this.left, scalar), $.div(this.top, scalar));
},
 norm$0: function() {
  var t1 = this.left;
  if (t1 == null || this.top == null)
    t1 = null;
  else {
    t1 = $.mul(t1, t1);
    var t2 = this.top;
    var t3 = $.sqrt($.add(t1, $.mul(t2, t2)));
    t1 = t3;
  }
  return t1;
},
 unit$0: function() {
  var n = this.norm$0();
  return !(n == null) && $.gtB(n, 0) ? this.operator$div$1(n) : null;
},
 hashCode$0: function() {
  return $.toInt($.add(this.left, this.top));
},
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ')';
},
 is$Offset: true
};

$$._Offset3d = {"":
 ["zIndex?", "left", "top"],
 super: "_Offset",
 get$z: function() {
  return this.zIndex;
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Offset3d)
    var t1 = $.eqB(this.left, other.left) && $.eqB(this.top, other.top) && $.eqB(this.zIndex, other.get$zIndex());
  else
    t1 = false;
  return t1;
},
 operator$sub$1: function(other) {
  return $._Offset3d$($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()), $.sub(this.zIndex, other.get$zIndex()));
},
 operator$add$1: function(other) {
  return $._Offset3d$($.add(this.left, other.get$left()), $.add(this.top, other.get$top()), $.add(this.zIndex, other.get$zIndex()));
},
 operator$mul$1: function(scalar) {
  return $._Offset3d$($.mul(this.left, scalar), $.mul(this.top, scalar), $.mul(this.zIndex, scalar));
},
 operator$div$1: function(scalar) {
  return $._Offset3d$($.div(this.left, scalar), $.div(this.top, scalar), $.div(this.zIndex, scalar));
},
 norm$0: function() {
  var t1 = this.left;
  if (t1 == null || this.top == null || this.zIndex == null)
    t1 = null;
  else {
    t1 = $.mul(t1, t1);
    var t2 = this.top;
    t1 = $.add(t1, $.mul(t2, t2));
    var t3 = this.zIndex;
    var t4 = $.sqrt($.add(t1, $.mul(t3, t3)));
    t1 = t4;
  }
  return t1;
},
 hashCode$0: function() {
  return $.toInt($.add($.add(this.get$x(), this.get$y()), this.get$z()));
},
 toString$0: function() {
  return '(' + $.S(this.get$x()) + ', ' + $.S(this.get$y()) + ', ' + $.S(this.get$z()) + ')';
},
 is$Offset3d: true,
 is$Offset: true
};

$$.VelocityProvider = {"":
 ["_lib3_pos", "_vel", "_time"],
 super: "Object",
 snapshot$2: function(position, time) {
  var diffTime = $.sub(time, this._time);
  if ($.gtB(diffTime, 0)) {
    this._vel = $.div($.sub(position, this._lib3_pos), diffTime);
    this._time = time;
    this._lib3_pos = position;
  }
},
 VelocityProvider$2: function(position, time) {
  this._vel = $._Offset$(0, 0);
}
};

$$.Matrix = {"":
 ["rows?", "columns?", "_mrs", "_en?"],
 super: "Object",
 operator$index$1: function(row) {
  var t1 = this._mrs;
  if (row !== (row | 0))
    throw $.iae(row);
  if (row < 0 || row >= t1.length)
    throw $.ioore(row);
  var mr = t1[row];
  if (mr == null) {
    mr = $._MatrixRow$(this, row);
    if (row < 0 || row >= t1.length)
      throw $.ioore(row);
    t1[row] = mr;
  }
  return mr;
},
 operator$add$1: function(m) {
  this._assertSameSize$1(m);
  return $.Matrix__generate(this.rows, this.columns, new $.Matrix_operator$add_anon(this, m));
},
 operator$sub$1: function(m) {
  this._assertSameSize$1(m);
  return $.Matrix__generate(this.rows, this.columns, new $.Matrix_operator$sub_anon(this, m));
},
 operator$mul$1: function(scalar) {
  return $.Matrix__generate(this.rows, this.columns, new $.Matrix_operator$mul_anon(this, scalar));
},
 operator$div$1: function(scalar) {
  return $.Matrix__generate(this.rows, this.columns, new $.Matrix_operator$div_anon(this, scalar));
},
 operator$mod$1: function(m) {
  if (m == null || !$.eqB(m.get$rows(), this.columns))
    throw $.captureStackTrace($.IllegalArgumentException$(m));
  var k = m.get$rows();
  var nrs = this.rows;
  if (typeof nrs !== 'number')
    return this.operator$mod$1$bailout(1, m, nrs, k, 0);
  var ncs = m.get$columns();
  if (typeof ncs !== 'number')
    return this.operator$mod$1$bailout(2, m, nrs, k, ncs);
  var res = $.Matrix$(nrs, ncs, null);
  for (var t1 = res._en, r = 0; r < nrs; ++r)
    for (var t2 = r * ncs, c = 0; c < ncs; ++c) {
      var t3 = t2 + c;
      var t4 = this._iprod$4(m, r, c, k);
      if (t3 !== (t3 | 0))
        throw $.iae(t3);
      if (t3 < 0 || t3 >= t1.length)
        throw $.ioore(t3);
      t1[t3] = t4;
    }
  return res;
},
 operator$mod$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var m = env0;
      nrs = env1;
      k = env2;
      break;
    case 2:
      m = env0;
      nrs = env1;
      k = env2;
      ncs = env3;
      break;
  }
  switch (state) {
    case 0:
      if (m == null || !$.eqB(m.get$rows(), this.columns))
        throw $.captureStackTrace($.IllegalArgumentException$(m));
      var k = m.get$rows();
      var nrs = this.rows;
    case 1:
      state = 0;
      var ncs = m.get$columns();
    case 2:
      state = 0;
      var res = $.Matrix$(nrs, ncs, null);
      for (var t1 = res._en, r = 0; $.ltB(r, nrs); ++r)
        for (var c = 0; $.ltB(c, ncs); ++c) {
          if (typeof ncs !== 'number')
            throw $.iae(ncs);
          var t2 = r * ncs + c;
          var t3 = this._iprod$4(m, r, c, k);
          if (t2 !== (t2 | 0))
            throw $.iae(t2);
          if (t2 < 0 || t2 >= t1.length)
            throw $.ioore(t2);
          t1[t2] = t3;
        }
      return res;
  }
},
 toString$0: function() {
  var sb = $.StringBufferImpl$('[[');
  var t1 = this.rows;
  if (typeof t1 !== 'number')
    return this.toString$0$bailout(1, sb, t1, 0);
  var t3 = this.columns;
  if (typeof t3 !== 'number')
    return this.toString$0$bailout(2, t3, sb, t1);
  var r = 0;
  for (; r < t1; ++r) {
    if (r > 0)
      sb.add$1('] [');
    for (var c = 0; c < t3; ++c) {
      if (c > 0)
        sb.add$1(' ');
      sb.add$1(this._lib3_get$2(r, c));
    }
  }
  return $.toString(sb.add$1(']]'));
},
 toString$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t3 = env0;
      sb = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('[[');
      var t1 = this.rows;
    case 1:
      state = 0;
      var t3 = this.columns;
    case 2:
      state = 0;
      var r = 0;
      for (; $.ltB(r, t1); ++r) {
        if (r > 0)
          sb.add$1('] [');
        for (var c = 0; $.ltB(c, t3); ++c) {
          if (c > 0)
            sb.add$1(' ');
          sb.add$1(this._lib3_get$2(r, c));
        }
      }
      return $.toString(sb.add$1(']]'));
  }
},
 _assertSameSize$1: function(m) {
  if (m == null || !$.eqB(m.get$rows(), this.rows) || !$.eqB(m.get$columns(), this.columns))
    throw $.captureStackTrace($.IllegalArgumentException$(m));
},
 _lib3_index$2: function(r, c) {
  return $.add($.mul(r, this.columns), c);
},
 _lib3_get$2: function(r, c) {
  var t1 = this._en;
  var t2 = this._lib3_index$2(r, c);
  if (t2 !== (t2 | 0))
    throw $.iae(t2);
  if (t2 < 0 || t2 >= t1.length)
    throw $.ioore(t2);
  return t1[t2];
},
 _set$3: function(r, c, v) {
  var t1 = this._en;
  var t2 = this._lib3_index$2(r, c);
  if (t2 !== (t2 | 0))
    throw $.iae(t2);
  if (t2 < 0 || t2 >= t1.length)
    throw $.ioore(t2);
  t1[t2] = v;
},
 get$_set: function() { return new $.BoundClosure2(this, '_set$3'); },
 _iprod$4: function(m1, r, c, k) {
  if (typeof k !== 'number')
    return this._iprod$4$bailout(1, m1, r, c, k, 0, 0, 0, 0, 0, 0);
  for (var t1 = this._en, t2 = r * k, sum = 0, i = 0; i < k; ++i) {
    var t3 = t2 + i;
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= t1.length)
      throw $.ioore(t3);
    t3 = t1[t3];
    if (typeof t3 !== 'number')
      return this._iprod$4$bailout(2, m1, r, c, sum, k, t1, k, t3, i, 0);
    var t5 = m1.get$_en();
    if (typeof t5 !== 'string' && (typeof t5 !== 'object' || t5 === null || t5.constructor !== Array && !t5.is$JavaScriptIndexingBehavior()))
      return this._iprod$4$bailout(3, t5, m1, c, k, r, t1, k, sum, t3, i);
    var t7 = i * k + c;
    if (t7 !== (t7 | 0))
      throw $.iae(t7);
    if (t7 < 0 || t7 >= t5.length)
      throw $.ioore(t7);
    t7 = t5[t7];
    if (typeof t7 !== 'number')
      return this._iprod$4$bailout(4, m1, r, c, k, t7, t1, t3, sum, i, 0);
    sum += t3 * t7;
  }
  return sum;
},
 _iprod$4$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var m1 = env0;
      var r = env1;
      var c = env2;
      var k = env3;
      break;
    case 2:
      m1 = env0;
      r = env1;
      c = env2;
      sum = env3;
      k = env4;
      t1 = env5;
      k = env6;
      t2 = env7;
      i = env8;
      break;
    case 3:
      t4 = env0;
      m1 = env1;
      c = env2;
      k = env3;
      r = env4;
      t1 = env5;
      k = env6;
      sum = env7;
      t2 = env8;
      i = env9;
      break;
    case 4:
      m1 = env0;
      r = env1;
      c = env2;
      k = env3;
      t4 = env4;
      t1 = env5;
      t2 = env6;
      sum = env7;
      i = env8;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = this._en;
      var sum = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, k))
                break L0;
              if (typeof k !== 'number')
                throw $.iae(k);
              var t2 = r * k + i;
              if (t2 !== (t2 | 0))
                throw $.iae(t2);
              if (t2 < 0 || t2 >= t1.length)
                throw $.ioore(t2);
              t2 = t1[t2];
            case 2:
              state = 0;
              var t4 = m1.get$_en();
            case 3:
              state = 0;
              t4 = $.index(t4, i * k + c);
            case 4:
              state = 0;
              t4 = $.mul(t2, t4);
              if (typeof t4 !== 'number')
                throw $.iae(t4);
              sum += t4;
              ++i;
          }
      return sum;
  }
},
 Matrix$3: function(rows, columns, entries) {
  if (typeof entries !== 'string' && (typeof entries !== 'object' || entries === null || entries.constructor !== Array && !entries.is$JavaScriptIndexingBehavior()))
    return this.Matrix$3$bailout(1, rows, columns, entries);
  var size = $.mul(rows, columns);
  if (typeof size !== 'number')
    return this.Matrix$3$bailout(2, entries, true, size);
  if (!(entries.length === size))
    throw $.captureStackTrace($.IllegalArgumentException$(entries));
  for (var t1 = this._en, i = 0; i < size; ++i) {
    if (i < 0 || i >= entries.length)
      throw $.ioore(i);
    var t2 = entries[i];
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
},
 Matrix$3$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var rows = env0;
      var columns = env1;
      var entries = env2;
      break;
    case 2:
      entries = env0;
      t1 = env1;
      size = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = !(entries == null);
    case 2:
      if (state === 2 || state === 0 && t1)
        switch (state) {
          case 0:
            var size = $.mul(rows, columns);
          case 2:
            state = 0;
            if (!$.eqB($.get$length(entries), size))
              throw $.captureStackTrace($.IllegalArgumentException$(entries));
            for (var t2 = this._en, i = 0; $.ltB(i, size); ++i) {
              var t3 = t1 ? $.index(entries, i) : 0;
              if (i < 0 || i >= t2.length)
                throw $.ioore(i);
              t2[i] = t3;
            }
        }
  }
}
};

$$._MatrixRow = {"":
 ["_m", "_r"],
 super: "Object",
 operator$index$1: function(column) {
  return this._m._lib3_get$2(this._r, column);
},
 operator$indexSet$2: function(column, value) {
  return this._m._set$3(this._r, column, value);
}
};

$$.Transformation = {"":
 ["rows", "columns", "_mrs", "_en"],
 super: "Matrix",
 operator$mod$1: function(m) {
  return $.Transformation$(this._iprod$4(m, 0, 0, 3), this._iprod$4(m, 0, 1, 3), this._iprod$4(m, 0, 2, 3), this._iprod$4(m, 1, 0, 3), this._iprod$4(m, 1, 1, 3), this._iprod$4(m, 1, 2, 3));
},
 get$transition: function() {
  return $._Offset$(this._lib3_get$2(0, 2), this._lib3_get$2(1, 2));
},
 originAt$1: function(origin) {
  var t1 = $.Transformation$clone(this);
  t1._set$3(0, 2, $.add($.add($.mul($.sub(this._lib3_get$2(0, 0), 1), origin.get$x()), $.mul(this._lib3_get$2(0, 1), origin.get$y())), this._lib3_get$2(0, 2)));
  t1._set$3(1, 2, $.add($.add($.mul(this._lib3_get$2(1, 0), origin.get$x()), $.mul($.sub(this._lib3_get$2(1, 1), 1), origin.get$y())), this._lib3_get$2(1, 2)));
  return t1;
}
};

$$._Size = {"":
 ["width=", "height="],
 super: "Object",
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$Size)
    var t1 = $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
  else
    t1 = false;
  return t1;
},
 hashCode$0: function() {
  return $.toInt($.add(this.width, this.height));
},
 toString$0: function() {
  return '(' + $.S(this.width) + ', ' + $.S(this.height) + ')';
},
 is$Size: true
};

$$.Browser = {"":
 ["name=", "version!", "safari", "chrome", "msie?", "firefox?", "webkit", "ios?", "android?", "mobile", "touch?", "webkitVersion", "iosVersion?", "androidVersion?", "size?"],
 super: "Object",
 toString$0: function() {
  return $.S(this.name) + '(v' + $.S(this.version) + ', ' + $.S(this.size) + ')';
},
 _initBrowserInfo$0: function() {
  var ua = $.toLowerCase($.window().get$navigator().get$userAgent());
  var bm = new $.Browser__initBrowserInfo_anon(this, ua);
  var m2 = $.CTC53.firstMatch$1(ua);
  if (!(m2 == null)) {
    this.android = true;
    this.mobile = true;
    this.touch = true;
    this.androidVersion = $.Browser__versionOf(m2.group$1(1), '.');
  } else {
    m2 = $.CTC54.firstMatch$1(ua);
    if (!(m2 == null)) {
      this.ios = true;
      this.mobile = true;
      this.touch = true;
      this.iosVersion = $.Browser__versionOf(m2.group$1(1), '_');
    }
  }
  if (bm.call$1($.CTC55) === true) {
    this.webkit = true;
    $.CSS_prefix = '-webkit-';
    this.webkitVersion = this.version;
    if (bm.call$1($.CTC56) === true)
      this.chrome = true;
    else if (bm.call$1($.CTC57) === true)
      this.safari = true;
  } else if (bm.call$1($.CTC58) === true) {
    $.CSS_prefix = '-ms-';
    this.msie = true;
    var t1 = $.ge($.indexOf$1(ua, 'IEMobile'), 0);
    this.mobile = t1;
    this.touch = t1;
  } else if ($.ltB($.indexOf$1(ua, 'compatible'), 0) && bm.call$1($.CTC59) === true) {
    $.CSS_prefix = '-moz-';
    this.name = 'firefox';
    this.firefox = true;
  } else {
    $.CSS_prefix = '';
    this.name = 'unknown';
    this.version = 1.0;
  }
  var qcave = $.DOMQuery_DOMQuery($.window());
  this.size = $._Size$(qcave.get$innerWidth(), qcave.get$innerHeight());
},
 Browser$0: function() {
  this._initBrowserInfo$0();
}
};

$$.DOMQuery = {"":
 ["node?"],
 super: "Object",
 get$innerWidth: function() {
  return this.node.get$$$dom_clientWidth();
},
 get$innerHeight: function() {
  return this.node.get$$$dom_clientHeight();
},
 get$innerSize: function() {
  return $._Size$(this.get$innerWidth(), this.get$innerHeight());
},
 get$outerWidth: function() {
  return this.node.get$$$dom_offsetWidth();
},
 get$outerHeight: function() {
  return this.node.get$$$dom_offsetHeight();
},
 get$outerSize: function() {
  return $._Size$(this.get$outerWidth(), this.get$outerHeight());
},
 get$offsetParent: function() {
  return this.node.get$offsetParent();
},
 get$offset: function() {
  var t1 = this.node;
  return $._Offset$(t1.get$$$dom_offsetLeft(), t1.get$$$dom_offsetTop());
},
 get$pageOffset: function() {
  var ofs = $._Offset$(0, 0);
  var el = this.node;
  var el0 = el;
  do {
    ofs.left = $.add(ofs.left, el0.get$$$dom_offsetLeft());
    ofs.top = $.add(ofs.top, el0.get$$$dom_offsetTop());
    if (!$.eqB(el0.get$style().get$position(), 'fixed')) {
      el0 = el0.get$offsetParent();
      var t1 = !(el0 == null);
    } else
      t1 = false;
  } while (t1);
  do {
    var txofs = $.CSS_offset3dOf(el.get$style().get$transform());
    ofs.left = $.sub(ofs.left, $.sub(el.get$$$dom_scrollLeft(), txofs.left));
    ofs.top = $.sub(ofs.top, $.sub(el.get$$$dom_scrollTop(), txofs.top));
    el = el.get$parent();
  } while (!(el == null) && !(typeof el === 'object' && el !== null && el.is$Document()));
  ofs.left = $.add(ofs.left, $.window().get$pageXOffset());
  ofs.top = $.add(ofs.top, $.window().get$pageYOffset());
  return ofs;
},
 get$computedStyle: function() {
  return $.window().$dom_getComputedStyle$2(this.node, '');
},
 isDescendantOf$1: function(parent$) {
  for (var n = this.node; !(n == null); n = n.get$parent())
    if (n == null ? parent$ == null : n === parent$)
      return true;
  return false;
},
 isInput$0: function() {
  var t1 = this.node;
  return $.eqB(t1.get$tagName(), 'INPUT') || $.eqB(t1.get$tagName(), 'TEXTAREA');
},
 get$borderWidth: function() {
  return $.CSS_intOf(this.get$computedStyle().get$borderWidth(), null);
}
};

$$._WindowQuery = {"":
 ["node"],
 super: "DOMQuery",
 get$innerWidth: function() {
  return this.node.get$innerWidth();
},
 get$innerHeight: function() {
  return this.node.get$innerHeight();
},
 get$outerWidth: function() {
  return this.node.get$outerWidth();
},
 get$outerHeight: function() {
  return this.node.get$outerHeight();
},
 get$offsetParent: function() {
  return;
},
 get$offset: function() {
  return $._Offset$(0, 0);
},
 get$pageOffset: function() {
  return this.get$offset();
},
 isDescendantOf$1: function(parent$) {
  return false;
},
 get$computedStyle: function() {
  return $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration();
}
};

$$._NullQuery = {"":
 ["node"],
 super: "_WindowQuery",
 get$innerWidth: function() {
  return 0;
},
 get$innerHeight: function() {
  return 0;
},
 get$outerWidth: function() {
  return 0;
},
 get$outerHeight: function() {
  return 0;
}
};

$$.View = {"":
 ["_id?", "_lib7_uuid", "_lib7_parent!", "_nextSibling=", "_prevSibling=", "_virtIS=", "_childInfo", "_evlInfo", "_lib7_dataAttrs!", "_mntAttrs", "_classes", "_style", "_node", "_left", "_lib7_top?", "_width", "_height", "_profile", "_layout", "_visible", "_inDoc"],
 super: "Object",
 get$className: function() {
  return 'View';
},
 _initChildInfo$0: function() {
  if (this._childInfo == null)
    this._childInfo = $._ChildInfo$();
  return this._childInfo;
},
 _initEventListenerInfo$0: function() {
  if (this._evlInfo == null)
    this._evlInfo = $._EventListenerInfo$(this);
  return this._evlInfo;
},
 get$uuid: function() {
  if (this._lib7_uuid == null) {
    var t1 = $.View__uuidNext;
    $.View__uuidNext = $.add(t1, 1);
    this._lib7_uuid = $.StringUtil_encodeId(t1, $.viewConfig.get$uuidPrefix());
  }
  return this._lib7_uuid;
},
 get$id: function() {
  return this._id;
},
 set$id: function(id) {
  if (id == null)
    id = '';
  if (!$.eqB(this._id, id)) {
    if ($.gtB($.get$length(id), 0))
      $._ViewImpl_checkIdSpaces(this, id);
    $._ViewImpl_removeFromIdSpace(this, false);
    this._id = id;
    $._ViewImpl_addToIdSpace(this, false);
  }
},
 query$1: function(selector) {
  if (selector == null)
    return;
  switch (selector) {
    case '':
      return;
    case 'parent':
      return this.get$parent();
    case 'spaceOwner':
      var so = this.get$spaceOwner();
      return typeof so === 'object' && so !== null && !!so.is$View ? so : null;
  }
  var iter = $.iterator(this.queryAll$1(selector));
  return iter.hasNext$0() === true ? iter.next$0() : null;
},
 queryAll$1: function(selector) {
  return $.ViewIterable$(this, selector);
},
 getFellow$1: function(id) {
  return this.get$spaceOwner().getFellow$1(id);
},
 get$fellows: function() {
  return this.get$spaceOwner().get$fellows();
},
 bindFellow_$2: function(id, fellow) {
  throw $.captureStackTrace($.CTC72);
},
 get$spaceOwner: function() {
  return $._ViewImpl_spaceOwner(this);
},
 isDescendantOf$1: function(parent$) {
  for (var w = this; !(w == null); w = w.get$parent())
    if (w == null ? parent$ == null : w === parent$)
      return true;
  return false;
},
 get$parent: function() {
  return this._lib7_parent;
},
 get$firstChild: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$firstChild() : null;
},
 get$lastChild: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$lastChild() : null;
},
 get$nextSibling: function() {
  return this._nextSibling;
},
 get$previousSibling: function() {
  return this._prevSibling;
},
 get$children: function() {
  var ci = this._initChildInfo$0();
  if (ci.get$children() == null)
    ci.set$children($._SubviewList$(this));
  return ci.get$children();
},
 get$childCount: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$nChild() : 0;
},
 onChildAdded_$1: function(child) {
},
 beforeChildRemoved_$1: function(child) {
},
 onChildRemoved_$1: function(child) {
},
 onParentChanged_$1: function(oldParent) {
},
 beforeParentChanged_$1: function(newParent) {
},
 onLayout_$1: function(mctx) {
  this.sendEvent$1($.LayoutEvent$(mctx, 'layout', null));
},
 onPreLayout_$1: function(mctx) {
  this.sendEvent$1($.LayoutEvent$(mctx, 'preLayout', null));
},
 isViewGroup$0: function() {
  return true;
},
 addChild$2: function(child, beforeChild) {
  this._addChild$2(child, beforeChild);
},
 addChild$1: function(child) {
  return this.addChild$2(child,null)
},
 addChild$1: function(child) {
  return this.addChild$2(child,null)
},
 _addChild$3: function(child, beforeChild, childNode) {
  if (this.isDescendantOf$1(child) === true)
    throw $.captureStackTrace($.UIException$($.S(child) + ' is an ancestor of ' + $.S(this)));
  if (this.isViewGroup$0() !== true)
    throw $.captureStackTrace($.UIException$('No child allowed in ' + $.S(this)));
  if (!(beforeChild == null))
    if (!(beforeChild.get$parent() === this))
      beforeChild = null;
    else if (child == null ? beforeChild == null : child === beforeChild)
      return;
  var oldParent = child.get$parent();
  var t1 = oldParent === this;
  var parentChanged = !t1;
  if (t1) {
    t1 = child.get$nextSibling();
    t1 = beforeChild == null ? t1 == null : beforeChild === t1;
  } else
    t1 = false;
  if (t1)
    return;
  if (parentChanged)
    child.beforeParentChanged_$1(this);
  if (!(oldParent == null))
    oldParent._removeChild$2$notifyChild(child, false);
  $._ViewImpl_link(this, child, beforeChild);
  if (this.get$inDocument() === true)
    if (!(childNode == null))
      this.insertChildToDocument_$3(child, childNode, beforeChild);
    else {
      this.insertChildToDocument_$3(child, child._asHTML$0(), beforeChild);
      child._mount$0();
    }
  this.onChildAdded_$1(child);
  if (parentChanged)
    child.onParentChanged_$1(oldParent);
},
 _addChild$2: function(child,beforeChild) {
  return this._addChild$3(child,beforeChild,null)
},
 removeFromParent$0: function() {
  if (this.get$parent() == null)
    throw $.captureStackTrace($.UIException$('Unable to remove a root view, ' + $.S(this)));
  this.get$parent()._removeChild$1(this);
},
 _removeChild$3: function(child, notifyChild, exit) {
  if (!(child.get$parent() === this))
    return;
  this.beforeChildRemoved_$1(child);
  var t1 = notifyChild === true;
  if (t1)
    child.beforeParentChanged_$1(null);
  if (this.get$inDocument() === true) {
    var childNode = child.get$node();
    if (exit === true)
      child._unmount$0();
    this.removeChildFromDocument_$2(child, childNode);
  }
  $._ViewImpl_unlink(this, child);
  if (t1)
    child.onParentChanged_$1(this);
  this.onChildRemoved_$1(child);
},
 _removeChild$1: function(child) {
  return this._removeChild$3(child,true,true)
},
 _removeChild$2$notifyChild: function(child,notifyChild) {
  return this._removeChild$3(child,notifyChild,true)
},
 insertChildToDocument_$3: function(child, childInfo, beforeChild) {
  if (!(beforeChild == null)) {
    var beforeNode = typeof beforeChild === 'object' && beforeChild !== null && !!beforeChild.is$PopupView ? beforeChild.get$refNode() : beforeChild.get$node();
    if (typeof childInfo === 'object' && childInfo !== null && childInfo.is$Element())
      beforeNode.get$parent().insertBefore$2(childInfo, beforeNode);
    else
      beforeNode.insertAdjacentHTML$2('beforeBegin', childInfo);
  } else if (typeof childInfo === 'object' && childInfo !== null && childInfo.is$Element())
    this.get$node().$dom_appendChild$1(childInfo);
  else
    this.get$node().insertAdjacentHTML$2('beforeEnd', childInfo);
},
 removeChildFromDocument_$2: function(child, childNode) {
  childNode.remove$0();
},
 get$node: function() {
  var t1 = this._node;
  return !(t1 == null) ? t1 : this.getNode$1(null);
},
 getNode$1: function(subId) {
  if (this._inDoc !== true)
    throw $.captureStackTrace($.UIException$('Not in document, ' + $.S(this) + '. Don\'t access node in Activity.onCreate_().'));
  var t1 = $.document();
  return t1.query$1(!(subId == null) && $.gtB($.get$length(subId), 0) ? '#' + $.S(this.get$uuid()) + '-' + $.S(subId) : '#' + $.S(this.get$uuid()));
},
 get$inDocument: function() {
  return this._inDoc;
},
 addToDocument$7: function(node, outer, inner, before, keepId, location$, shallLayout) {
  if (!(this.get$parent() == null) || this.get$inDocument() === true)
    throw $.captureStackTrace($.UIException$('No parent allowed, nor attached twice: ' + $.S(this)));
  this._addToDoc$7(node, outer, inner, before, keepId, location$, shallLayout);
},
 addToDocument$2$shallLayout: function(node,shallLayout) {
  return this.addToDocument$7(node,false,false,null,false,null,shallLayout)
},
 _addToDoc$7: function(node, outer, inner, before, keepId, location$, shallLayout) {
  var t1 = outer === true;
  if (t1 && keepId === true && $.isEmpty(node.get$id()) !== true)
    this._lib7_uuid = node.get$id();
  var html = this._asHTML$0();
  if (inner === true) {
    node.set$innerHTML(html);
    var nxt = null;
    var p = null;
  } else if (t1) {
    p = node.get$parent();
    nxt = node.get$nextElementSibling();
    node.remove$0();
  } else {
    p = node;
    nxt = before;
  }
  if (!(nxt == null))
    nxt.insertAdjacentHTML$2('beforeBegin', html);
  else if (!(p == null))
    p.insertAdjacentHTML$2('beforeEnd', html);
  this._mount$0();
  if (!(location$ == null))
    $.layoutManager.afterLayout$1(new $.View__addToDoc_anon(this, location$));
  if (shallLayout === true)
    this.requestLayout$1$immediate(true);
},
 _mount$0: function() {
  $.View__mntCnt = $.add($.View__mntCnt, 1);
  try {
    this._mntInit$0();
    this.mount_$0();
  } finally {
    $.View__mntCnt = $.sub($.View__mntCnt, 1);
  }
  if ($.eqB($.View__mntCnt, 0))
    if (!($.View__afters == null) && $.isEmpty($.View__afters) !== true) {
      var afters = $.ListFactory_List$from($.View__afters);
      $.clear($.View__afters);
      for (var t1 = $.iterator(afters); t1.hasNext$0() === true;) {
        var t2 = t1.next$0();
        var view = $.index(t2, 0);
        if (view.get$inDocument() === true)
          $.index(t2, 1).call$1(view);
      }
    }
},
 _unmount$0: function() {
  if (this._inDoc === true) {
    this.unmount_$0();
    this._mntClean$0();
  }
},
 mount_$0: function() {
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling()) {
    child._mntInit$0();
    child.mount_$0();
  }
  var t1 = this._evlInfo;
  if (!(t1 == null))
    t1.mount$0();
  this.sendEvent$1($.ViewEvent$('mount', null, null, null, null, null));
},
 unmount_$0: function() {
  this.sendEvent$1($.ViewEvent$('unmount', null, null, null, null, null));
  var t1 = this._evlInfo;
  if (!(t1 == null))
    t1.unmount$0();
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling()) {
    child.unmount_$0();
    child._mntClean$0();
  }
},
 _mntInit$0: function() {
  this._inDoc = true;
},
 _mntClean$0: function() {
  this._mntAttrs = null;
  this._inDoc = false;
  this._node = null;
},
 locateTo$4: function(location$, reference, x, y) {
  $.AnchorRelation_locate(this, location$, reference, x, y);
},
 locateTo$3$x$y: function(location$,x,y) {
  return this.locateTo$4(location$,null,x,y)
},
 requestLayout$2: function(immediate, descendantOnly) {
  $.layoutManager.requestLayout$3(this, immediate, descendantOnly);
},
 requestLayout$0: function() {
  return this.requestLayout$2(false,false)
},
 requestLayout$1$immediate: function(immediate) {
  return this.requestLayout$2(immediate,false)
},
 doLayout_$1: function(mctx) {
  $.layoutManager.doLayout$2(mctx, this);
},
 measureWidth_$1: function(mctx) {
  return this.isViewGroup$0() === true ? mctx.measureWidth$1(this) : mctx.measureWidthByContent$2(this, true);
},
 measureHeight_$1: function(mctx) {
  return this.isViewGroup$0() === true ? mctx.measureHeight$1(this) : mctx.measureHeightByContent$2(this, true);
},
 shallLayout_$1: function(child) {
  if (child.get$visible() !== true || typeof child === 'object' && child !== null && !!child.is$PopupView)
    return false;
  var v = child.get$style().get$position();
  if (typeof v !== 'string')
    return this.shallLayout_$1$bailout(1, v);
  return $.isEmpty(v) === true || v === 'absolute';
},
 shallLayout_$1$bailout: function(state, v) {
  return $.isEmpty(v) === true || $.eqB(v, 'absolute');
},
 draw$1: function(out) {
  var tag = this.get$domTag_();
  $.add$1(out.add$1('<'), tag);
  this.domAttrs_$1(out);
  out.add$1('>');
  this.domInner_$1(out);
  $.add$1($.add$1(out.add$1('</'), tag), '>');
},
 get$domTag_: function() {
  return 'div';
},
 _asHTML$0: function() {
  var out = $.StringBufferImpl$('');
  this.draw$1(out);
  return out.toString$0();
},
 get$visible: function() {
  return this._visible;
},
 get$left: function() {
  return this._left;
},
 set$left: function(left) {
  this._left = left;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(left);
    this.get$node().get$style().set$left(t1);
  }
},
 get$top: function() {
  return this._lib7_top;
},
 set$top: function(top$) {
  this._lib7_top = top$;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(top$);
    this.get$node().get$style().set$top(t1);
  }
},
 get$width: function() {
  return this._width;
},
 set$width: function(width) {
  this._width = width;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(width);
    this.get$node().get$style().set$width(t1);
    $.layoutManager.sizeUpdated$3(this, width, true);
  }
},
 get$height: function() {
  return this._height;
},
 set$height: function(height) {
  this._height = height;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(height);
    this.get$node().get$style().set$height(t1);
    $.layoutManager.sizeUpdated$3(this, height, false);
  }
},
 get$outerWidth: function() {
  var t1 = this._width;
  if (!(t1 == null))
    ;
  else
    t1 = this.get$inDocument() === true ? $.DOMQuery_DOMQuery(this.get$node()).get$outerWidth() : 0;
  return t1;
},
 get$outerHeight: function() {
  var t1 = this._height;
  if (!(t1 == null))
    ;
  else
    t1 = this.get$inDocument() === true ? $.DOMQuery_DOMQuery(this.get$node()).get$outerHeight() : 0;
  return t1;
},
 get$innerWidth: function() {
  if (this.get$inDocument() === true)
    var v = $.DOMQuery_DOMQuery(this.get$node()).get$innerWidth();
  else {
    var t1 = this._width;
    v = !(t1 == null) ? t1 : 0;
  }
  return $.gtB(v, 0) ? v : 0;
},
 get$innerHeight: function() {
  if (this.get$inDocument() === true)
    var v = $.DOMQuery_DOMQuery(this.get$node()).get$innerHeight();
  else {
    var t1 = this._height;
    v = !(t1 == null) ? t1 : 0;
  }
  return $.gtB(v, 0) ? v : 0;
},
 get$pageOffset: function() {
  if (this._inDoc === true)
    return $.DOMQuery_DOMQuery(this.get$node()).get$pageOffset();
  var ofs = $._Offset$(0, 0);
  for (var view = this; true;) {
    ofs.left = $.add(ofs.left, view.get$left());
    ofs.top = $.add(ofs.top, view.get$top());
    if (!$.eqB(view.get$style().get$position(), 'fixed')) {
      view = view.get$parent();
      var t1 = view == null;
    } else
      t1 = true;
    if (t1)
      return ofs;
  }
},
 get$layout: function() {
  if (this._layout == null)
    this._layout = $.LayoutDeclarationImpl$(this);
  return this._layout;
},
 get$profile: function() {
  if (this._profile == null)
    this._profile = $.ProfileDeclarationImpl$(this);
  return this._profile;
},
 get$style: function() {
  if (this._style == null)
    this._style = $.CSSStyleDeclarationImpl$(this);
  return this._style;
},
 get$classes: function() {
  return this._classes;
},
 domAttrs_$5: function(out, noId, noStyle, noClass, noVisible) {
  if (noId !== true) {
    var s = this.get$uuid();
    var t1 = $.isEmpty(s) !== true;
  } else {
    s = null;
    t1 = false;
  }
  if (t1)
    $.add$1($.add$1($.add$1(out, ' id="'), s), '"');
  if (noStyle !== true) {
    var stylesb = $.StringBufferImpl$('');
    this.domStyle_$2$noVisible(stylesb, noVisible);
    if (stylesb.isEmpty$0() !== true)
      $.add$1($.add$1($.add$1(out, ' style="'), stylesb), '"');
  }
  if (noVisible !== true && this.get$visible() !== true)
    $._visiCtrl().addHiddenAttr$1(out);
  if (noClass !== true) {
    var classsb = $.StringBufferImpl$('');
    this.domClass_$1(classsb);
    if (classsb.isEmpty$0() !== true)
      $.add$1($.add$1($.add$1(out, ' class="'), classsb), '"');
  }
},
 domAttrs_$1: function(out) {
  return this.domAttrs_$5(out,false,false,false,false)
},
 domInner_$1: function(out) {
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling())
    child.draw$1(out);
},
 domClass_$1: function(out) {
  out.add$1($.viewConfig.get$classPrefix());
  for (var t1 = $.iterator(this.get$classes()); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    $.add$1(out.add$1(' '), t2);
  }
},
 domStyle_$7: function(out, noLeft, noTop, noWidth, noHeight, noStyle, noVisible) {
  if (noLeft !== true && !$.eqB(this.get$left(), 0))
    $.add$1($.add$1($.add$1(out, 'left:'), this.get$left()), 'px;');
  if (noTop !== true && !$.eqB(this.get$top(), 0))
    $.add$1($.add$1($.add$1(out, 'top:'), this.get$top()), 'px;');
  if (noWidth !== true && !(this._width == null))
    $.add$1($.add$1($.add$1(out, 'width:'), this._width), 'px;');
  if (noHeight !== true && !(this._height == null))
    $.add$1($.add$1($.add$1(out, 'height:'), this._height), 'px;');
  if (noVisible !== true && this.get$visible() !== true)
    $._visiCtrl().addHiddenStyle$1(out);
  if (noStyle !== true) {
    var t1 = this._style;
    if (!(t1 == null)) {
      var s = t1.get$cssText();
      t1 = $.isEmpty(s) !== true;
    } else {
      s = null;
      t1 = false;
    }
  } else {
    s = null;
    t1 = false;
  }
  if (t1)
    $.add$1(out, $.StringUtil_encodeXML(s, false, 0, false));
},
 domStyle_$2$noVisible: function(out,noVisible) {
  return this.domStyle_$7(out,false,false,false,false,false,noVisible)
},
 get$on: function() {
  return this._initEventListenerInfo$0().get$on();
},
 sendEvent$2: function(event$, type) {
  if (event$.get$target() == null)
    event$.set$target(this);
  var t1 = this._evlInfo;
  return !(t1 == null) && t1.send$2(event$, type) === true;
},
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,null)
},
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,null)
},
 getDOMEventDispatcher_$1: function(type) {
  return $._ViewImpl_getDOMEventDispatcher(type);
},
 domListen_$3: function(n, type, disp) {
  var ln = disp.call$1(this);
  var ei = this._initEventListenerInfo$0();
  if (ei.get$domListeners() == null)
    ei.set$domListeners($.makeLiteralMap([]));
  $.indexSet(ei.get$domListeners(), type, ln);
  $.add$1($.index(n.get$on(), $.toLowerCase(type)), ln);
},
 domUnlisten_$2: function(n, type) {
  var t1 = this._evlInfo;
  if (!(t1 == null)) {
    var ln = t1.get$domListeners().remove$1(type);
    if (!(ln == null)) {
      t1 = n.get$on();
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
        return this.domUnlisten_$2$bailout(1, t1, type, ln);
      var t3 = $.toLowerCase(type);
      if (t3 !== (t3 | 0))
        throw $.iae(t3);
      if (t3 < 0 || t3 >= t1.length)
        throw $.ioore(t3);
      t1[t3].remove$1(ln);
    }
  }
},
 domUnlisten_$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      t1 = env0;
      var type = env1;
      ln = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._evlInfo;
    case 1:
      if (state === 1 || state === 0 && !(t1 == null))
        switch (state) {
          case 0:
            var ln = t1.get$domListeners().remove$1(type);
          case 1:
            if (state === 1 || state === 0 && !(ln == null))
              switch (state) {
                case 0:
                  t1 = n.get$on();
                case 1:
                  state = 0;
                  $.index(t1, $.toLowerCase(type)).remove$1(ln);
              }
        }
  }
},
 get$dataAttributes: function() {
  var t1 = this._lib7_dataAttrs;
  return !(t1 == null) ? t1 : $.MapUtil_onDemand(new $.View_dataAttributes_anon(this));
},
 hashCode$0: function() {
  return $.hashCode(this.get$uuid());
},
 toString$0: function() {
  var t1 = $.S(this.get$className()) + '(';
  return t1 + $.S($.isEmpty(this.get$id()) === true ? this.get$uuid() : this.get$id()) + ')';
},
 View$0: function() {
  this._classes = $._ClassSet$(this);
  $.add$1(this._classes, $.S($.viewConfig.get$classPrefix()) + $.S(this.get$className()));
},
 is$View: true
};

$$.UIException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'UIException(' + $.S(this.message) + ')';
},
 is$Exception: true
};

$$._SubviewList = {"":
 ["_lib7_owner"],
 super: "AbstractList",
 iterator$0: function() {
  return $._WCIterator$(this._lib7_owner);
},
 get$length: function() {
  return this._lib7_owner.get$childCount();
},
 operator$index$1: function(index) {
  if (typeof index !== 'number')
    return this.operator$index$1$bailout(1, index, 0);
  $.ListUtil_rangeCheck(this, index, 1);
  var index2 = $.sub($.sub($.get$length(this), index), 1);
  if (typeof index2 !== 'number')
    return this.operator$index$1$bailout(2, index, index2);
  var t1 = index <= index2;
  var t2 = this._lib7_owner;
  if (t1) {
    var child = t2.get$firstChild();
    for (; --index, index >= 0;)
      child = child.get$nextSibling();
    return child;
  } else {
    child = t2.get$lastChild();
    for (; --index2, index2 >= 0;)
      child = child.get$previousSibling();
    return child;
  }
},
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var index = env0;
      break;
    case 2:
      index = env0;
      index2 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.ListUtil_rangeCheck(this, index, 1);
      var index2 = $.sub($.sub($.get$length(this), index), 1);
    case 2:
      state = 0;
      var t1 = $.leB(index, index2);
      var t2 = this._lib7_owner;
      if (t1) {
        var child = t2.get$firstChild();
        for (; index = $.sub(index, 1), $.geB(index, 0);)
          child = child.get$nextSibling();
        return child;
      } else {
        child = t2.get$lastChild();
        for (; index2 = $.sub(index2, 1), $.geB(index2, 0);)
          child = child.get$previousSibling();
        return child;
      }
  }
},
 operator$indexSet$2: function(index, value) {
  if (value == null)
    throw $.captureStackTrace($.CTC74);
  var w = this.operator$index$1(index);
  if (!(w == null ? value == null : w === value)) {
    var next = w.get$nextSibling();
    w.removeFromParent$0();
    this._lib7_owner.addChild$2(value, next);
  }
},
 add$1: function(view) {
  this._lib7_owner.addChild$1(view);
},
 removeLast$0: function() {
  var w = this.last$0();
  if (!(w == null))
    w.removeFromParent$0();
  return w;
},
 last$0: function() {
  return this._lib7_owner.get$lastChild();
},
 removeRange$2: function(start, length$) {
  if (typeof length$ !== 'number')
    return this.removeRange$2$bailout(1, start, length$);
  if (length$ <= 0)
    return;
  var child = this.operator$index$1(start);
  while (true) {
    --length$;
    if (!(length$ >= 0 && !(child == null)))
      break;
    var next = child.get$nextSibling();
    child.removeFromParent$0();
    child = next;
  }
},
 removeRange$2$bailout: function(state, start, length$) {
  if ($.leB(length$, 0))
    return;
  var child = this.operator$index$1(start);
  while (true) {
    length$ = $.sub(length$, 1);
    if (!($.geB(length$, 0) && !(child == null)))
      break;
    var next = child.get$nextSibling();
    child.removeFromParent$0();
    child = next;
  }
}
};

$$._WCIterator = {"":
 ["_lib7_next="],
 super: "Object",
 hasNext$0: function() {
  return !(this._lib7_next == null);
},
 next$0: function() {
  var t1 = this._lib7_next;
  if (t1 == null)
    throw $.captureStackTrace($.CTC14);
  this._lib7_next = t1.get$nextSibling();
  return t1;
},
 _WCIterator$1: function(owner) {
  this._lib7_next = owner.get$firstChild();
}
};

$$._VisiCtrl = {"":
 [],
 super: "Object",
 addHiddenStyle$1: function(out) {
},
 addHiddenAttr$1: function(out) {
  $.add$1(out, ' hidden');
}
};

$$._IEVisiCtrl = {"":
 [],
 super: "_VisiCtrl",
 addHiddenStyle$1: function(out) {
  $.add$1(out, 'display:none;');
},
 addHiddenAttr$1: function(out) {
}
};

$$._ChildInfo = {"":
 ["firstChild=", "lastChild=", "nChild=", "children="],
 super: "Object"
};

$$._EventListenerInfo = {"":
 ["_lib7_owner", "on?", "_listeners", "domListeners="],
 super: "Object",
 isEmpty$1: function(type) {
  var t1 = this._listeners;
  if (!(t1 == null)) {
    var ls = $.index(t1, type);
    t1 = ls == null || $.isEmpty(ls) === true;
  } else
    t1 = true;
  return t1;
},
 add$2: function(type, listener) {
  var t1 = {};
  if (listener == null)
    throw $.captureStackTrace($.CTC61);
  if (this._listeners == null)
    this._listeners = $.makeLiteralMap([]);
  t1.first_10 = false;
  $.add$1(this._listeners.putIfAbsent$2(type, new $._EventListenerInfo_add_anon(t1)), listener);
  if (t1.first_10 === true) {
    t1 = this._lib7_owner;
    if (t1.get$inDocument() === true) {
      var disp = t1.getDOMEventDispatcher_$1(type);
      t1 = !(disp == null);
    } else {
      disp = null;
      t1 = false;
    }
  } else {
    disp = null;
    t1 = false;
  }
  if (t1) {
    t1 = this._lib7_owner;
    t1.domListen_$3(t1.get$node(), type, disp);
  }
},
 remove$2: function(type, listener) {
  var t1 = this._listeners;
  if (!(t1 == null)) {
    var ls = $.index(t1, type);
    t1 = !(ls == null);
  } else {
    ls = null;
    t1 = false;
  }
  if (t1) {
    var j = $.indexOf$1(ls, listener);
    if ($.geB(j, 0)) {
      $.removeRange(ls, j, 1);
      if ($.isEmpty(ls) === true) {
        t1 = this._lib7_owner;
        t1 = t1.get$inDocument() === true && !(t1.getDOMEventDispatcher_$1(type) == null);
      } else
        t1 = false;
      if (t1) {
        t1 = this._lib7_owner;
        t1.domUnlisten_$2(t1.get$node(), type);
      }
      var found = true;
    } else
      found = false;
  } else
    found = false;
  return found;
},
 send$2: function(event$, type) {
  if (type == null)
    type = event$.get$type();
  var t1 = this._listeners;
  if (!(t1 == null)) {
    var ls = $.index(t1, type);
    t1 = !(ls == null);
  } else {
    ls = null;
    t1 = false;
  }
  if (t1) {
    event$.set$currentTarget(this._lib7_owner);
    for (var t1 = $.iterator($.ListFactory_List$from(ls)), dispatched = false; t1.hasNext$0() === true;) {
      t1.next$0().call$1(event$);
      if (event$.isPropagationStopped$0() === true)
        return true;
      dispatched = true;
    }
  } else
    dispatched = false;
  return dispatched;
},
 mount$0: function() {
  if (!(this._listeners == null)) {
    var t1 = this._lib7_owner;
    var n = t1.get$node();
    for (var t2 = $.iterator(this._listeners.getKeys$0()); t2.hasNext$0() === true;) {
      var t3 = t2.next$0();
      var disp = t1.getDOMEventDispatcher_$1(t3);
      if (!(disp == null) && $.isEmpty($.index(this._listeners, t3)) !== true)
        t1.domListen_$3(n, t3, disp);
    }
  }
},
 unmount$0: function() {
  if (!(this._listeners == null)) {
    var t1 = this._lib7_owner;
    var n = t1.get$node();
    for (var t2 = $.iterator(this._listeners.getKeys$0()); t2.hasNext$0() === true;) {
      var t3 = t2.next$0();
      if (!(t1.getDOMEventDispatcher_$1(t3) == null) && $.isEmpty($.index(this._listeners, t3)) !== true)
        t1.domUnlisten_$2(n, t3);
    }
  }
},
 _EventListenerInfo$1: function(_owner) {
  this.on = $._ViewEvents$(this);
}
};

$$._ClassSet = {"":
 ["view?", "_backingMap"],
 super: "HashSetImplementation",
 add$1: function(name$) {
  $.HashSetImplementation.prototype.add$1.call(this, name$);
  var t1 = this.view;
  if (t1.get$inDocument() === true)
    $.add$1(t1.get$node().get$classes(), name$);
},
 remove$1: function(name$) {
  var removed = $.HashSetImplementation.prototype.remove$1.call(this, name$);
  if (removed === true && this.view.get$inDocument() === true)
    this.view.get$node().get$classes().remove$1(name$);
  return removed;
},
 clear$0: function() {
  $.HashSetImplementation.prototype.clear$0.call(this);
  var t1 = this.view;
  if (t1.get$inDocument() === true)
    $.clear(t1.get$node().get$classes());
}
};

$$._VirtualIdSpace = {"":
 ["_lib7_owner", "_fellows"],
 super: "Object",
 query$1: function(selector) {
  return this._lib7_owner.query$1(selector);
},
 getFellow$1: function(id) {
  var t1 = this._fellows;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.getFellow$1$bailout(1, t1, id);
  if (id !== (id | 0))
    throw $.iae(id);
  if (id < 0 || id >= t1.length)
    throw $.ioore(id);
  return t1[id];
},
 getFellow$1$bailout: function(state, t1, id) {
  return $.index(t1, id);
},
 bindFellow_$2: function(id, fellow) {
  var t1 = !(fellow == null);
  var t2 = this._fellows;
  if (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())
    return this.bindFellow_$2$bailout(1, t2, id, fellow, t1);
  if (t1) {
    if (id !== (id | 0))
      throw $.iae(id);
    if (id < 0 || id >= t2.length)
      throw $.ioore(id);
    t2[id] = fellow;
  } else
    t2.remove$1(id);
},
 bindFellow_$2$bailout: function(state, t2, id, fellow, t1) {
  if (t1)
    $.indexSet(t2, id, fellow);
  else
    t2.remove$1(id);
},
 get$fellows: function() {
  return this._fellows.getValues$0();
},
 toString$0: function() {
  return '_VirtualIdSpace(' + $.S(this._lib7_owner) + ': ' + $.S(this._fellows) + ')';
},
 is$IdSpace: true
};

$$.Section = {"":
 ["_fellows", "_id", "_lib7_uuid", "_lib7_parent", "_nextSibling", "_prevSibling", "_virtIS", "_childInfo", "_evlInfo", "_lib7_dataAttrs", "_mntAttrs", "_classes", "_style", "_node", "_left", "_lib7_top", "_width", "_height", "_profile", "_layout", "_visible", "_inDoc"],
 super: "View",
 get$className: function() {
  return 'Section';
},
 getFellow$1: function(id) {
  var t1 = this._fellows;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.getFellow$1$bailout(1, t1, id);
  if (id !== (id | 0))
    throw $.iae(id);
  if (id < 0 || id >= t1.length)
    throw $.ioore(id);
  return t1[id];
},
 getFellow$1$bailout: function(state, t1, id) {
  return $.index(t1, id);
},
 bindFellow_$2: function(id, fellow) {
  var t1 = !(fellow == null);
  var t2 = this._fellows;
  if (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())
    return this.bindFellow_$2$bailout(1, t2, id, fellow, t1);
  if (t1) {
    if (id !== (id | 0))
      throw $.iae(id);
    if (id < 0 || id >= t2.length)
      throw $.ioore(id);
    t2[id] = fellow;
  } else
    t2.remove$1(id);
},
 bindFellow_$2$bailout: function(state, t2, id, fellow, t1) {
  if (t1)
    $.indexSet(t2, id, fellow);
  else
    t2.remove$1(id);
},
 get$domTag_: function() {
  return 'section';
},
 Section$0: function() {
  this._fellows = $.makeLiteralMap([]);
},
 is$IdSpace: true
};

$$.Image = {"":
 ["_src", "_id", "_lib7_uuid", "_lib7_parent", "_nextSibling", "_prevSibling", "_virtIS", "_childInfo", "_evlInfo", "_lib7_dataAttrs", "_mntAttrs", "_classes", "_style", "_node", "_left", "_lib7_top", "_width", "_height", "_profile", "_layout", "_visible", "_inDoc"],
 super: "View",
 get$className: function() {
  return 'Image';
},
 get$src: function() {
  return this._src;
},
 set$src: function(src) {
  this._src = src;
  if (this.get$inDocument() === true) {
    var t1 = !(src == null) ? src : '';
    var t2 = this.get$node();
    $.callTypeCast(t2, 'is$ImageElement').set$src(t1);
  }
},
 domAttrs_$5: function(out, noId, noStyle, noClass, noVisible) {
  if (!(this._src == null))
    $.add$1($.add$1($.add$1(out, ' src="'), this._src), '"');
  $.View.prototype.domAttrs_$5.call(this, out, noId, noStyle, noClass, noVisible);
},
 domAttrs_$1: function(out) {
  return this.domAttrs_$5(out,false,false,false,false)
},
 get$domTag_: function() {
  return 'img';
},
 isViewGroup$0: function() {
  return false;
},
 measureWidth_$1: function(mctx) {
  return mctx.measureWidthByContent$2(this, false);
},
 measureHeight_$1: function(mctx) {
  return mctx.measureHeightByContent$2(this, false);
},
 mount_$0: function() {
  $.View.prototype.mount_$0.call(this);
  if (!(this._src == null))
    var t1 = this.get$width() == null || this.get$height() == null;
  else
    t1 = false;
  if (t1)
    $.layoutManager.waitImageLoaded$1(this._src);
},
 toString$0: function() {
  return $.S(this.get$className()) + '(\'' + $.S(this.get$src()) + '\')';
},
 Image$1: function(src) {
  this._src = src;
}
};

$$.ViewEvent = {"":
 ["_domEvt", "_lib6_type", "_stamp", "_offset", "_offsetReady", "_propStop", "target=", "currentTarget!"],
 super: "Object",
 get$timeStamp: function() {
  return this._stamp;
},
 get$type: function() {
  return this._lib6_type;
},
 isPropagationStopped$0: function() {
  return this._propStop;
},
 toString$0: function() {
  return 'ViewEvent(' + $.S(this.target) + ',' + $.S(this.get$type()) + ')';
},
 ViewEvent$6: function(type, target, pageX, pageY, offsetX, offsetY) {
  if (type == null)
    throw $.captureStackTrace($.CTC64);
  this.currentTarget = target;
  this.target = target;
  var t1 = !(pageX == null) && !(pageY == null);
  if (t1)
    this._offset = $._Offset$(pageX, pageY);
  else {
    t1 = !(offsetX == null) ? offsetX : 0;
    this._offset = $._Offset$(t1, !(offsetY == null) ? offsetY : 0);
    this._offsetReady = true;
  }
},
 ViewEvent$dom$3: function(domEvent, type, target) {
  this.currentTarget = target;
  this.target = target;
  this._offset = $._Offset$(0, 0);
}
};

$$._ViewEventListenerList = {"":
 ["_lib6_ptr?", "_lib6_type"],
 super: "Object",
 add$1: function(handler) {
  this._lib6_ptr.add$2(this._lib6_type, handler);
  return this;
},
 remove$1: function(handler) {
  this._lib6_ptr.remove$2(this._lib6_type, handler);
  return this;
},
 isEmpty$0: function() {
  return this._lib6_ptr.isEmpty$1(this._lib6_type);
}
};

$$._ViewEventListenerMap = {"":
 ["_lib6_ptr?"],
 super: "Object",
 operator$index$1: function(type) {
  return this._get$1(type);
},
 _get$1: function(type) {
  return this._lnlist.putIfAbsent$2(type, new $._ViewEventListenerMap__get_anon(this, type));
}
};

$$._ViewEvents = {"":
 ["_lib6_ptr", "_lnlist"],
 super: "_ViewEventListenerMap",
 get$mouseDown: function() {
  return this._get$1('mouseDown');
},
 get$mouseMove: function() {
  return this._get$1('mouseMove');
},
 get$mouseUp: function() {
  return this._get$1('mouseUp');
},
 get$layout: function() {
  return this._get$1('layout');
},
 get$preLayout: function() {
  return this._get$1('preLayout');
},
 preLayout$1: function(arg0) { return this.get$preLayout().call$1(arg0); },
 get$mount: function() {
  return this._get$1('mount');
},
 mount$0: function() { return this.get$mount().call$0(); },
 get$unmount: function() {
  return this._get$1('unmount');
},
 unmount$0: function() { return this.get$unmount().call$0(); }
};

$$._BroadcastEvents = {"":
 ["_lib6_ptr", "_lnlist"],
 super: "_ViewEventListenerMap"
};

$$._Broadcaster = {"":
 ["_lib6_listeners", "_on"],
 super: "Object",
 get$on: function() {
  return this._on;
},
 sendEvent$2: function(event$, type) {
  return this._lib6_listeners.send$2(event$, type);
},
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,null)
},
 _Broadcaster$0: function() {
  this._lib6_listeners = $._BroadcastListeners$(this);
  this._on = $._BroadcastEvents$(this._lib6_listeners);
}
};

$$._BroadcastListeners = {"":
 ["_lib6_owner", "_lib6_listeners"],
 super: "Object",
 isEmpty$1: function(type) {
  var t1 = this._lib6_listeners;
  if (!(t1 === null)) {
    var ls = $.index(t1, type);
    t1 = ls == null || $.isEmpty(ls) === true;
  } else
    t1 = true;
  return t1;
},
 add$2: function(type, listener) {
  if (listener == null)
    throw $.captureStackTrace($.CTC61);
  $.add$1(this._lib6_listeners.putIfAbsent$2(type, new $._BroadcastListeners_add_anon()), listener);
},
 remove$2: function(type, listener) {
  var ls = $.index(this._lib6_listeners, type);
  return !(ls == null) && $.ListUtil_remove(ls, listener);
},
 send$2: function(event$, type) {
  if (type == null)
    type = event$.get$type();
  var ls = $.index(this._lib6_listeners, type);
  if (!(ls == null))
    for (var t1 = $.iterator($.ListFactory_List$from(ls)), dispatched = false; t1.hasNext$0() === true;) {
      t1.next$0().call$1(event$);
      if (event$.isPropagationStopped$0() === true)
        return true;
      dispatched = true;
    }
  else
    dispatched = false;
  return dispatched;
}
};

$$.PopupEvent = {"":
 ["_source", "_domEvt", "_lib6_type", "_stamp", "_offset", "_offsetReady", "_propStop", "target", "currentTarget"],
 super: "ViewEvent",
 get$source: function() {
  return this._source;
},
 source$1: function(arg0) { return this.get$source().call$1(arg0); }
};

$$.LayoutEvent = {"":
 ["_context", "_domEvt", "_lib6_type", "_stamp", "_offset", "_offsetReady", "_propStop", "target", "currentTarget"],
 super: "ViewEvent",
 toString$0: function() {
  return 'LayoutEvent(' + $.S(this.target) + ')';
}
};

$$.LayoutManager = {"":
 ["_layouts", "_imgWaits", "_afters", "_inLayout", "_inCallback=", "_runQue", "_views", "_task", "_readyChecks", "_ignoreDetached", "_ignoreSubviews"],
 super: "RunOnceViewManager",
 addLayout$2: function(name$, clayout) {
  var t1 = this._layouts;
  var old = $.index(t1, name$);
  $.indexSet(t1, name$, clayout);
  return old;
},
 getLayout$1: function(name$) {
  return $.index(this._layouts, name$);
},
 getLayoutOfView$1: function(view) {
  var name$ = view.get$layout().get$type();
  var clayout = this.getLayout$1(name$);
  if (clayout == null)
    throw $.captureStackTrace($.UIException$('Unknown layout, ' + $.S(name$)));
  return clayout;
},
 requestLayout$3: function(view, immediate, descendantOnly) {
  if (descendantOnly !== true) {
    var parent$ = view.get$parent();
    if (view.get$profile().get$anchorView() == null && !(typeof view === 'object' && view !== null && !!view.is$PopupView) && !(parent$ == null) && $.isEmpty(parent$.get$layout().get$type()) !== true)
      view = parent$;
  }
  if (immediate === true)
    this.flush$1(view);
  else
    this.queue$1(view);
},
 sizeUpdated$3: function(view, value, horizontal) {
  var nm = horizontal ? 'rk.layout.w' : 'rk.layout.h';
  if (this._inLayout > 0 && $.leB(this._inCallback, 0))
    $.indexSet(view.get$dataAttributes(), nm, value);
  else
    view.get$dataAttributes().remove$1(nm);
},
 flush$1: function(view) {
  if ($.isEmpty(this._imgWaits) === true)
    $.RunOnceViewManager.prototype.flush$1.call(this, view);
  else if (!(view == null))
    this.queue$1(view);
},
 flush$0: function() {
  return this.flush$1(null)
},
 flush$0: function() {
  return this.flush$1(null)
},
 handle_$1: function(view) {
  this._inLayout = $.add(this._inLayout, 1);
  try {
    var mctx = $.MeasureContext$();
    mctx.preLayout$1(view);
    var parent$ = view.get$parent();
    if (parent$ == null)
      $.AnchorRelation__layoutRoot(mctx, view);
    else if (!(view.get$profile().get$anchorView() == null))
      $.AnchorRelation$(parent$)._layoutAnchored$3(mctx, view.get$profile().get$anchorView(), view);
    else {
      var t1 = view;
      if (typeof t1 === 'object' && t1 !== null && !!t1.is$PopupView || $.isEmpty(parent$.get$layout().get$type()) === true) {
        mctx.setWidthByProfile$2(view, new $.LayoutManager_handle__anon(parent$));
        mctx.setHeightByProfile$2(view, new $.LayoutManager_handle__anon0(parent$));
      }
    }
    this.doLayout$2(mctx, view);
  } finally {
    t1 = $.sub(this._inLayout, 1);
    this._inLayout = t1;
    if ($.leB(t1, 0) && this.isQueueEmpty$0() === true && $.isEmpty(this._afters) !== true) {
      t1 = this._afters;
      var afters = $.ListFactory_List$from(t1);
      $.clear(t1);
      for (t1 = $.iterator(afters); t1.hasNext$0() === true;) {
        var task = t1.next$0();
        task.call$0();
      }
    }
  }
},
 afterLayout$1: function(task) {
  if (this._inLayout <= 0 && this.isQueueEmpty$0() === true)
    task.call$0();
  else
    this._afters.push(task);
},
 doLayout$2: function(mctx, view) {
  if (view.get$visible() === true) {
    this.getLayoutOfView$1(view).doLayout$2(mctx, view);
    this._inCallback = $.add(this._inCallback, 1);
    try {
      view.onLayout_$1(mctx);
    } finally {
      this._inCallback = $.sub(this._inCallback, 1);
    }
  }
},
 waitImageLoaded$1: function(imgURI) {
  var t1 = this._imgWaits;
  if ($.contains$1(t1, imgURI) !== true) {
    $.add$1(t1, imgURI);
    var img = $._ElementFactoryProvider_Element$tag('img');
    var func = new $.LayoutManager_waitImageLoaded_anon(this, imgURI);
    $.add$1(img.get$on().get$load(), func);
    $.add$1(img.get$on().get$error(), func);
    img.set$src(imgURI);
  }
},
 _onImageLoaded$1: function(imgURI) {
  var t1 = this._imgWaits;
  t1.remove$1(imgURI);
  if ($.isEmpty(t1) === true)
    this.flush$0();
},
 LayoutManager$0: function() {
  this.addLayout$2('linear', $.LinearLayout$());
  this.addLayout$2('tile', $.TileLayout$());
  var freeLayout = $.FreeLayout$();
  this.addLayout$2('none', freeLayout);
  this.addLayout$2('', freeLayout);
}
};

$$.AbstractLayout = {"":
 [],
 super: "Object",
 isProfileInherited$0: function() {
  return true;
},
 isFlex$0: function() {
  return false;
},
 doLayout$2: function(mctx, view) {
  if (!(view.get$firstChild() == null)) {
    var ar = $.AnchorRelation$(view);
    for (var t1 = ar.indeps, t2 = $.iterator(t1); t2.hasNext$0() === true;)
      mctx.preLayout$1(t2.next$0());
    this.doLayout_$3(mctx, view, t1);
    ar.layoutAnchored$1(mctx);
    for (t1 = $.iterator(view.get$children()); t1.hasNext$0() === true;) {
      t2 = t1.next$0();
      if (t2.get$visible() === true)
        t2.doLayout_$1(mctx);
    }
  }
}
};

$$.MeasureContext = {"":
 ["widths?", "heights?", "_borderWds", "_dataAttrs!"],
 super: "Object",
 getBorderWidth$1: function(view) {
  var t1 = this._borderWds;
  var v = $.index(t1, view);
  if (v == null) {
    v = $.DOMQuery_DOMQuery(view.get$node()).get$borderWidth();
    $.indexSet(t1, view, v);
  }
  return v;
},
 getProfile$2: function(view, name$) {
  var v = view.get$profile().getPropertyValue$1(name$);
  if ($.isEmpty(v) === true) {
    if (!(view.get$parent() == null) && $.layoutManager.getLayoutOfView$1(view.get$parent()).isProfileInherited$0() === true)
      v = view.get$parent().get$layout().getPropertyValue$1(name$);
    if ($.isEmpty(v) === true && $.layoutManager.getLayoutOfView$1(view).isFlex$0() === true)
      v = 'flex';
  }
  return v;
},
 setWidthByProfile$2: function(view, width) {
  if (view.get$visible() === true) {
    var amt = $.LayoutAmountInfo$(this.getProfile$2(view, 'width'));
    var t1 = amt.type;
    switch (t1) {
      case $.CTC18:
        view.set$width(amt.value);
        break;
      case $.CTC19:
        view.set$width(this._minMaxWd$2(view, width.call$0()));
        break;
      case $.CTC20:
        view.set$width(this._minMaxWd$2(view, $.toInt($.round($.mul(width.call$0(), amt.value)))));
        break;
      case $.CTC21:
      case $.CTC23:
        if ($.eqB(t1, $.CTC21) && !(this.getWidthSetByApp$1(view) == null))
          break;
        var wd = view.measureWidth_$1(this);
        if (!(wd == null))
          view.set$width(wd);
        break;
    }
  }
},
 setHeightByProfile$2: function(view, height) {
  if (view.get$visible() === true) {
    var amt = $.LayoutAmountInfo$(this.getProfile$2(view, 'height'));
    var t1 = amt.type;
    switch (t1) {
      case $.CTC18:
        view.set$height(amt.value);
        break;
      case $.CTC19:
        view.set$height(this._minMaxHgh$2(view, height.call$0()));
        break;
      case $.CTC20:
        view.set$height(this._minMaxHgh$2(view, $.toInt($.round($.mul(height.call$0(), amt.value)))));
        break;
      case $.CTC21:
      case $.CTC23:
        if ($.eqB(t1, $.CTC21) && !(this.getHeightSetByApp$1(view) == null))
          break;
        var hgh = view.measureHeight_$1(this);
        if (!(hgh == null))
          view.set$height(hgh);
        break;
    }
  }
},
 _minMaxWd$2: function(view, wd) {
  return $.MeasureContext__minMax(wd, this.getProfile$2(view, 'min-width'), this.getProfile$2(view, 'max-width'));
},
 _minMaxHgh$2: function(view, hgh) {
  return $.MeasureContext__minMax(hgh, this.getProfile$2(view, 'min-height'), this.getProfile$2(view, 'max-height'));
},
 measureWidth$1: function(view) {
  return view.get$visible() === true ? $.layoutManager.getLayoutOfView$1(view).measureWidth$2(this, view) : 0;
},
 measureHeight$1: function(view) {
  return view.get$visible() === true ? $.layoutManager.getLayoutOfView$1(view).measureHeight$2(this, view) : 0;
},
 measureWidthByContent$2: function(view, autowidth) {
  var t1 = this.widths;
  var wd = $.index(t1, view);
  return !(wd == null) || t1.containsKey$1(view) === true ? wd : this._measureByContent$2(view, autowidth).get$width();
},
 measureHeightByContent$2: function(view, autowidth) {
  var t1 = this.heights;
  var hgh = $.index(t1, view);
  return !(hgh == null) || t1.containsKey$1(view) === true ? hgh : this._measureByContent$2(view, autowidth).get$height();
},
 _measureByContent$2: function(view, autowidth) {
  if (view.get$visible() !== true) {
    $.indexSet(this.widths, view, 0);
    $.indexSet(this.heights, view, 0);
    return $._Size$(0, 0);
  }
  if (autowidth) {
    var nodestyle = view.get$node().get$style();
    var pos = nodestyle.get$position();
    if (!$.eqB(pos, 'fixed') && !$.eqB(pos, 'static')) {
      var orgspace = nodestyle.get$whiteSpace();
      if (orgspace == null)
        orgspace = '';
      nodestyle.set$whiteSpace('nowrap');
    } else
      orgspace = null;
    var orgwd = nodestyle.get$width();
    var orghgh = nodestyle.get$height();
    nodestyle.set$width('');
    nodestyle.set$height('');
  } else {
    nodestyle = null;
    orghgh = null;
    orgspace = null;
    orgwd = null;
  }
  var qview = $.DOMQuery_DOMQuery(view);
  var size = $._Size$(qview.get$outerWidth(), qview.get$outerHeight());
  if (!(orgspace == null))
    nodestyle.set$whiteSpace(orgspace);
  if (!(orgwd == null) && $.isEmpty(orgwd) !== true)
    nodestyle.set$width(orgwd);
  if (!(orghgh == null) && $.isEmpty(orghgh) !== true)
    nodestyle.set$height(orghgh);
  var parentInnerWidth = new $.MeasureContext__measureByContent_anon(view);
  var parentInnerHeight = new $.MeasureContext__measureByContent_anon0(view);
  var limit = $.MeasureContext__amountOf(view.get$profile().get$maxWidth(), parentInnerWidth);
  if (!(autowidth && $.gtB(size.width, $.browser.get$size().get$width())))
    var t1 = !(limit == null) && $.gtB(size.width, limit);
  else
    t1 = true;
  if (t1) {
    nodestyle.set$width($.CSS_px(!(limit == null) ? limit : $.browser.get$size().get$width()));
    size.width = qview.get$outerWidth();
    size.height = qview.get$outerHeight();
  }
  limit = $.MeasureContext__amountOf(view.get$profile().get$maxHeight(), parentInnerHeight);
  if (!(limit == null) && $.gtB(size.height, limit))
    size.height = limit;
  limit = $.MeasureContext__amountOf(view.get$profile().get$minWidth(), parentInnerWidth);
  if (!(limit == null) && $.ltB(size.width, limit))
    size.width = limit;
  limit = $.MeasureContext__amountOf(view.get$profile().get$minHeight(), parentInnerHeight);
  if (!(limit == null) && $.ltB(size.height, limit))
    size.height = limit;
  $.indexSet(this.widths, view, size.width);
  $.indexSet(this.heights, view, size.height);
  return size;
},
 getWidthSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$(this.getProfile$2(view, 'width'));
  switch (amtInf.type) {
    case $.CTC18:
      return amtInf.value;
    case $.CTC21:
      return $.MeasureContext__getSetByApp(view, view.get$width(), 'rk.layout.w');
  }
},
 getHeightSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$(this.getProfile$2(view, 'height'));
  switch (amtInf.type) {
    case $.CTC18:
      return amtInf.value;
    case $.CTC21:
      return $.MeasureContext__getSetByApp(view, view.get$height(), 'rk.layout.h');
  }
},
 preLayout$1: function(view) {
  var t1 = $.layoutManager;
  t1.set$_inCallback($.add(t1.get$_inCallback(), 1));
  try {
    view.onPreLayout_$1(this);
  } finally {
    t1 = $.layoutManager;
    t1.set$_inCallback($.sub(t1.get$_inCallback(), 1));
  }
},
 get$preLayout: function() { return new $.BoundClosure(this, 'preLayout$1'); },
 get$dataAttributes: function() {
  var t1 = this._dataAttrs;
  return !(t1 == null) ? t1 : $.MapUtil_onDemand(new $.MeasureContext_dataAttributes_anon(this));
}
};

$$.FreeLayout = {"":
 [],
 super: "AbstractLayout",
 measureWidth$2: function(mctx, view) {
  var wd = $.index(mctx.get$widths(), view);
  if (!(wd == null) || mctx.get$widths().containsKey$1(view) === true)
    return wd;
  wd = mctx.getWidthSetByApp$1(view);
  if (wd == null) {
    wd = view.get$innerWidth();
    if (typeof wd !== 'number')
      return this.measureWidth$2$bailout(1, mctx, view, wd);
    for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      if (view.shallLayout_$1(t2) === true && t2.get$profile().get$anchorView() == null) {
        var subsz = t2.measureWidth_$1(mctx);
        t2 = t2.get$left();
        subsz = $.add(t2, !(subsz == null) ? subsz : 0);
        if (wd == null || $.gtB(subsz, wd))
          wd = subsz;
      }
    }
    if (!(wd == null))
      wd = $.add(wd, $.shl(mctx.getBorderWidth$1(view), 1));
  }
  $.indexSet(mctx.get$widths(), view, wd);
  return wd;
},
 measureWidth$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var mctx = env0;
      var view = env1;
      wd = env2;
      break;
  }
  switch (state) {
    case 0:
      var wd = $.index(mctx.get$widths(), view);
      if (!(wd == null) || mctx.get$widths().containsKey$1(view) === true)
        return wd;
      wd = mctx.getWidthSetByApp$1(view);
    case 1:
      if (state === 1 || state === 0 && wd == null)
        switch (state) {
          case 0:
            wd = view.get$innerWidth();
          case 1:
            state = 0;
            for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              if (view.shallLayout_$1(t2) === true && t2.get$profile().get$anchorView() == null) {
                var subsz = t2.measureWidth_$1(mctx);
                t2 = t2.get$left();
                subsz = $.add(t2, !(subsz == null) ? subsz : 0);
                if (wd == null || $.gtB(subsz, wd))
                  wd = subsz;
              }
            }
            if (!(wd == null))
              wd = $.add(wd, $.shl(mctx.getBorderWidth$1(view), 1));
        }
      $.indexSet(mctx.get$widths(), view, wd);
      return wd;
  }
},
 measureHeight$2: function(mctx, view) {
  var hgh = $.index(mctx.get$heights(), view);
  if (!(hgh == null) || mctx.get$heights().containsKey$1(view) === true)
    return hgh;
  hgh = mctx.getHeightSetByApp$1(view);
  if (hgh == null) {
    hgh = view.get$innerHeight();
    if (typeof hgh !== 'number')
      return this.measureHeight$2$bailout(1, mctx, view, hgh);
    for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      if (view.shallLayout_$1(t2) === true && t2.get$profile().get$anchorView() == null) {
        var subsz = t2.measureHeight_$1(mctx);
        t2 = t2.get$top();
        subsz = $.add(t2, !(subsz == null) ? subsz : 0);
        if (hgh == null || $.gtB(subsz, hgh))
          hgh = subsz;
      }
    }
    if (!(hgh == null))
      hgh = $.add(hgh, $.shl(mctx.getBorderWidth$1(view), 1));
  }
  $.indexSet(mctx.get$heights(), view, hgh);
  return hgh;
},
 measureHeight$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var mctx = env0;
      var view = env1;
      hgh = env2;
      break;
  }
  switch (state) {
    case 0:
      var hgh = $.index(mctx.get$heights(), view);
      if (!(hgh == null) || mctx.get$heights().containsKey$1(view) === true)
        return hgh;
      hgh = mctx.getHeightSetByApp$1(view);
    case 1:
      if (state === 1 || state === 0 && hgh == null)
        switch (state) {
          case 0:
            hgh = view.get$innerHeight();
          case 1:
            state = 0;
            for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              if (view.shallLayout_$1(t2) === true && t2.get$profile().get$anchorView() == null) {
                var subsz = t2.measureHeight_$1(mctx);
                t2 = t2.get$top();
                subsz = $.add(t2, !(subsz == null) ? subsz : 0);
                if (hgh == null || $.gtB(subsz, hgh))
                  hgh = subsz;
              }
            }
            if (!(hgh == null))
              hgh = $.add(hgh, $.shl(mctx.getBorderWidth$1(view), 1));
        }
      $.indexSet(mctx.get$heights(), view, hgh);
      return hgh;
  }
},
 isProfileInherited$0: function() {
  return false;
},
 doLayout_$3: function(mctx, view, children) {
  var innerWidth$ = new $.FreeLayout_doLayout__anon(view);
  var innerHeight$ = new $.FreeLayout_doLayout__anon0(view);
  for (var t1 = $.iterator(children); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    mctx.setWidthByProfile$2(t2, innerWidth$);
    mctx.setHeightByProfile$2(t2, innerHeight$);
  }
}
};

$$.LinearLayout = {"":
 [],
 super: "AbstractLayout",
 measureWidth$2: function(mctx, view) {
  var width = $.index(mctx.get$widths(), view);
  if (!(width == null) || mctx.get$widths().containsKey$1(view) === true)
    return width;
  var t1 = mctx.get$widths();
  var t2 = $.LinearLayout__getRealLayout(view).measureWidth$2(mctx, view);
  $.indexSet(t1, view, t2);
  return t2;
},
 measureHeight$2: function(mctx, view) {
  var height = $.index(mctx.get$heights(), view);
  if (!(height == null) || mctx.get$heights().containsKey$1(view) === true)
    return height;
  var t1 = mctx.get$heights();
  var t2 = $.LinearLayout__getRealLayout(view).measureHeight$2(mctx, view);
  $.indexSet(t1, view, t2);
  return t2;
},
 doLayout_$3: function(mctx, view, children) {
  return $.LinearLayout__getRealLayout(view).doLayout$3(mctx, view, children);
}
};

$$._HLayout = {"":
 [],
 super: "Object",
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va == null))
    return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defpwd = view.get$layout().get$width();
  for (var t1 = $.iterator(view.get$children()), prevSpacing = null, width = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true || !(t2.get$profile().get$anchorView() == null))
      continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing == null)
      var t3 = si.left;
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.left);
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    width += t3;
    prevSpacing = si.right;
    var pwd = t2.get$profile().get$width();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case $.CTC18:
        t2 = amt.value;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        width += t2;
        break;
      case $.CTC21:
      case $.CTC23:
        var wd = t2.measureWidth_$1(mctx);
        t2 = !(wd == null) ? wd : t2.get$outerWidth();
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        width += t2;
        break;
    }
  }
  t1 = $.mul(mctx.getBorderWidth$1(view), 2);
  t1 = $.add(t1, !(prevSpacing == null) ? prevSpacing : $.add(spcinf.left, spcinf.right));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  return width + t1;
},
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va == null))
    return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var defphgh = view.get$layout().get$height();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  for (var t1 = $.iterator(view.get$children()), height = null; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true || !(t2.get$profile().get$anchorView() == null))
      continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    var hgh = $.add($.add(si.top, si.bottom), borderWd);
    var phgh = t2.get$profile().get$height();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case $.CTC18:
        hgh = $.add(hgh, amt.value);
        break;
      case $.CTC21:
      case $.CTC23:
        var h = t2.measureHeight_$1(mctx);
        hgh = $.add(hgh, !(h == null) ? h : t2.get$outerHeight());
        break;
      default:
        continue;
    }
    if (height == null || $.gtB(hgh, height))
      height = hgh;
  }
  return height;
},
 doLayout$3: function(mctx, view, children) {
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defpwd = view.get$layout().get$width();
  var childspcinfs = $.HashMapImplementation$();
  var flexViews = $.ListFactory_List(null);
  var flexs = $.ListFactory_List(null);
  for (var t1 = $.iterator(children), nflex = 0, prevSpacing = null, assigned = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $._HLayout_doLayout_anon(view));
      mctx.setHeightByProfile$2(t2, new $._HLayout_doLayout_anon0(view));
      continue;
    }
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing == null)
      var t3 = si.left;
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.left);
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.right;
    var pwd = t2.get$profile().get$width();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case $.CTC18:
        t3 = amt.value;
        t2.set$width(t3);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        assigned += t3;
        break;
      case $.CTC19:
        t3 = amt.value;
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        nflex += t3;
        flexs.push(t3);
        flexViews.push(t2);
        break;
      case $.CTC20:
        t3 = $.toInt($.round($.mul(view.get$innerWidth(), amt.value)));
        t2.set$width(t3);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        assigned += t3;
        break;
      default:
        var wd = t2.measureWidth_$1(mctx);
        if (!(wd == null)) {
          t2.set$width(wd);
          if (typeof wd !== 'number')
            throw $.iae(wd);
          assigned += wd;
        } else {
          t3 = t2.get$outerWidth();
          if (typeof t3 !== 'number')
            throw $.iae(t3);
          assigned += t3;
        }
        break;
    }
    mctx.setHeightByProfile$2(t2, new $._HLayout_doLayout_anon1(view, si));
  }
  if (nflex > 0) {
    var space = $.sub($.sub(view.get$innerWidth(), assigned), prevSpacing);
    var per = $.div(space, nflex);
    for (var len = flexs.length - 1, j = 0; true; ++j) {
      if (j === len) {
        if (j < 0 || j >= flexViews.length)
          throw $.ioore(j);
        flexViews[j].set$width(space);
        break;
      }
      if (j < 0 || j >= flexs.length)
        throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      if (j < 0 || j >= flexViews.length)
        throw $.ioore(j);
      flexViews[j].set$width(delta);
      space = $.sub(space, delta);
    }
  }
  var defAlign = view.get$layout().get$align();
  for (t1 = $.iterator(children), prevSpacing = null, assigned = 0; t1.hasNext$0() === true;) {
    t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true)
      continue;
    si = childspcinfs.operator$index$1(t2);
    if (prevSpacing == null)
      t3 = si.get$left();
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.get$left());
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    t2.set$left(assigned);
    t3 = t2.get$outerWidth();
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.get$right();
    var align = t2.get$profile().get$align();
    if ($.isEmpty(align) === true)
      align = defAlign;
    space = childspcinfs.operator$index$1(t2).get$top();
    switch (align) {
      case 'center':
      case 'end':
        delta = $.sub($.sub($.sub(view.get$innerHeight(), si.get$top()), si.get$bottom()), t2.get$outerHeight());
        t2.set$top($.add(space, $.eqB(align, 'center') ? $.tdiv(delta, 2) : delta));
        break;
      default:
        t2.set$top(space);
    }
  }
}
};

$$._VLayout = {"":
 [],
 super: "Object",
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va == null))
    return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defphgh = view.get$layout().get$height();
  for (var t1 = $.iterator(view.get$children()), prevSpacing = null, height = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true || !(t2.get$profile().get$anchorView() == null))
      continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing == null)
      var t3 = si.top;
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.top);
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    height += t3;
    prevSpacing = si.bottom;
    var phgh = t2.get$profile().get$height();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case $.CTC18:
        t2 = amt.value;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        height += t2;
        break;
      case $.CTC21:
      case $.CTC23:
        var hgh = t2.measureHeight_$1(mctx);
        t2 = !(hgh == null) ? hgh : t2.get$outerHeight();
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        height += t2;
        break;
    }
  }
  t1 = $.mul(mctx.getBorderWidth$1(view), 2);
  t1 = $.add(t1, !(prevSpacing == null) ? prevSpacing : $.add(spcinf.top, spcinf.bottom));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  return height + t1;
},
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va == null))
    return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var defpwd = view.get$layout().get$width();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  for (var t1 = $.iterator(view.get$children()), width = null; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true || !(t2.get$profile().get$anchorView() == null))
      continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    var wd = $.add($.add(si.left, si.right), borderWd);
    var pwd = t2.get$profile().get$width();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case $.CTC18:
        wd = $.add(wd, amt.value);
        break;
      case $.CTC21:
      case $.CTC23:
        var w = t2.measureWidth_$1(mctx);
        wd = $.add(wd, !(w == null) ? w : t2.get$outerWidth());
        break;
      default:
        continue;
    }
    if (width == null || $.gtB(wd, width))
      width = wd;
  }
  return width;
},
 doLayout$3: function(mctx, view, children) {
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defphgh = view.get$layout().get$height();
  var childspcinfs = $.HashMapImplementation$();
  var flexViews = $.ListFactory_List(null);
  var flexs = $.ListFactory_List(null);
  for (var t1 = $.iterator(children), nflex = 0, prevSpacing = null, assigned = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $._VLayout_doLayout_anon(view));
      mctx.setHeightByProfile$2(t2, new $._VLayout_doLayout_anon0(view));
      continue;
    }
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing == null)
      var t3 = si.top;
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.top);
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.bottom;
    var phgh = t2.get$profile().get$height();
    var amt = $._LinearUtil_getLayoutAmountInfo(t2, $.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case $.CTC18:
        t3 = amt.value;
        t2.set$height(t3);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        assigned += t3;
        break;
      case $.CTC19:
        t3 = amt.value;
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        nflex += t3;
        flexs.push(t3);
        flexViews.push(t2);
        break;
      case $.CTC20:
        t3 = $.toInt($.round($.mul(view.get$innerHeight(), amt.value)));
        t2.set$height(t3);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        assigned += t3;
        break;
      default:
        var hgh = t2.measureHeight_$1(mctx);
        if (!(hgh == null)) {
          t2.set$height(hgh);
          if (typeof hgh !== 'number')
            throw $.iae(hgh);
          assigned += hgh;
        } else {
          t3 = t2.get$outerHeight();
          if (typeof t3 !== 'number')
            throw $.iae(t3);
          assigned += t3;
        }
        break;
    }
    mctx.setWidthByProfile$2(t2, new $._VLayout_doLayout_anon1(view, si));
  }
  if (nflex > 0) {
    var space = $.sub($.sub(view.get$innerHeight(), assigned), prevSpacing);
    var per = $.div(space, nflex);
    for (var len = flexs.length - 1, j = 0; true; ++j) {
      if (j === len) {
        if (j < 0 || j >= flexViews.length)
          throw $.ioore(j);
        flexViews[j].set$height(space);
        break;
      }
      if (j < 0 || j >= flexs.length)
        throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      if (j < 0 || j >= flexViews.length)
        throw $.ioore(j);
      flexViews[j].set$height(delta);
      space = $.sub(space, delta);
    }
  }
  var defAlign = view.get$layout().get$align();
  for (t1 = $.iterator(children), prevSpacing = null, assigned = 0; t1.hasNext$0() === true;) {
    t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true)
      continue;
    si = childspcinfs.operator$index$1(t2);
    if (prevSpacing == null)
      t3 = si.get$top();
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.max(prevSpacing, si.get$top());
    }
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    t2.set$top(assigned);
    t3 = t2.get$outerHeight();
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.get$bottom();
    var align = t2.get$profile().get$align();
    if ($.isEmpty(align) === true)
      align = defAlign;
    space = childspcinfs.operator$index$1(t2).get$left();
    switch (align) {
      case 'center':
      case 'end':
        delta = $.sub($.sub($.sub(view.get$innerWidth(), si.get$left()), si.get$right()), t2.get$outerWidth());
        t2.set$left($.add(space, $.eqB(align, 'center') ? $.tdiv(delta, 2) : delta));
        break;
      default:
        t2.set$left(space);
    }
  }
}
};

$$.TileLayout = {"":
 [],
 super: "AbstractLayout",
 doLayout_$3: function(mctx, view, children) {
  for (var t1 = $.iterator(children); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $.TileLayout_doLayout__anon(view));
      mctx.setHeightByProfile$2(t2, new $.TileLayout_doLayout__anon0(view));
      continue;
    }
  }
},
 measureWidth$2: function(ctx, view) {
  throw $.captureStackTrace($.CTC75);
},
 measureHeight$2: function(ctx, view) {
  throw $.captureStackTrace($.CTC75);
},
 isFlex$0: function() {
  return true;
}
};

$$.AnchorRelation = {"":
 ["indeps", "anchored", "parent?"],
 super: "Object",
 layoutAnchored$1: function(mctx) {
  this._layoutAnchored$2(mctx, this.parent);
  for (var t1 = $.iterator(this.indeps); t1.hasNext$0() === true;)
    this._layoutAnchored$2(mctx, t1.next$0());
},
 _layoutAnchored$3: function(mctx, anchor, thisOnly) {
  var views = $.index(this.anchored, anchor);
  if (!(views == null) && $.isEmpty(views) !== true) {
    for (var t1 = $.iterator(views), t2 = !(thisOnly == null); t1.hasNext$0() === true;) {
      var t3 = t1.next$0();
      if (thisOnly == null || $.eqB(t3, thisOnly)) {
        mctx.preLayout$1(t3);
        mctx.setWidthByProfile$2(t3, new $.AnchorRelation__layoutAnchored_anon(t3, anchor));
        mctx.setHeightByProfile$2(t3, new $.AnchorRelation__layoutAnchored_anon0(t3, anchor));
        $.AnchorRelation_locate(t3, t3.get$profile().get$location(), anchor, 0, 0);
        if (t2)
          return;
      }
    }
    for (t1 = $.iterator(views); t1.hasNext$0() === true;)
      this._layoutAnchored$3(mctx, t1.next$0(), thisOnly);
  }
},
 _layoutAnchored$2: function(mctx,anchor) {
  return this._layoutAnchored$3(mctx,anchor,null)
},
 AnchorRelation$1: function(view) {
  for (var t1 = $.iterator(view.get$children()), t2 = this.indeps, t3 = this.anchored; t1.hasNext$0() === true;) {
    var t4 = t1.next$0();
    var av = t4.get$profile().get$anchorView();
    if (av == null)
      t2.push(t4);
    else {
      var t5 = av.get$parent();
      if (!(t5 == null ? view == null : t5 === view) && !(av == null ? view == null : av === view))
        throw $.captureStackTrace($.UIException$('Anchor can be parent or sibling, not ' + $.S(av)));
      var deps = $.index(t3, av);
      if (deps == null) {
        deps = $.ListFactory_List(null);
        $.indexSet(t3, av, deps);
      }
      $.add$1(deps, t4);
    }
  }
}
};

$$._AnchorOfRoot = {"":
 [],
 super: "Object",
 get$outerWidth: function() {
  return $.browser.get$size().get$width();
},
 get$innerWidth: function() {
  return $.browser.get$size().get$width();
},
 get$outerHeight: function() {
  return $.browser.get$size().get$height();
},
 get$innerHeight: function() {
  return $.browser.get$size().get$height();
}
};

$$._AnchorOfPoint = {"":
 [],
 super: "Object",
 get$outerWidth: function() {
  return 0;
},
 get$innerWidth: function() {
  return 0;
},
 get$outerHeight: function() {
  return 0;
},
 get$innerHeight: function() {
  return 0;
}
};

$$.LayoutAmountType = {"":
 ["_name"],
 super: "Object",
 get$name: function() {
  return this._name;
},
 operator$eq$1: function(other) {
  return this === other;
},
 toString$0: function() {
  return this._name;
}
};

$$.LayoutAmountInfo = {"":
 ["type=", "value="],
 super: "Object",
 toString$0: function() {
  return $.S(this.type) + ':' + $.S(this.value);
},
 LayoutAmountInfo$1: function(profile) {
  if (profile == null || $.isEmpty(profile) === true)
    this.type = $.CTC21;
  else if ($.eqB(profile, 'content'))
    this.type = $.CTC23;
  else if ($.startsWith(profile, 'flex') === true) {
    this.type = $.CTC19;
    this.value = $.gtB($.get$length(profile), 4) ? $.parseInt($.trim($.substring$1(profile, 4))) : 1;
    if ($.ltB(this.value, 1))
      this.value = 1;
  } else if ($.endsWith(profile, '%') === true) {
    this.type = $.CTC20;
    this.value = $.parseDouble($.trim($.substring$2(profile, 0, $.sub($.get$length(profile), 1)))) / 100;
  } else {
    this.type = $.CTC18;
    this.value = $.CSS_intOf(profile, true);
  }
}
};

$$.LayoutSideInfo = {"":
 ["top=", "bottom?", "left=", "right?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ',' + $.S(this.top) + ':' + $.S(this.right) + ',' + $.S(this.bottom) + ')';
},
 LayoutSideInfo$3: function(profile, defaultValue, defaultInfo) {
  if (!(profile == null) && $.isEmpty(profile) !== true) {
    var wds = [];
    for (var t1 = $.iterator($.CTC22.allMatches$1(profile)); t1.hasNext$0() === true;)
      wds.push($.parseInt(t1.next$0().group$1(0)));
    t1 = wds.length;
    switch (t1) {
      case 0:
        break;
      case 1:
        if (0 >= t1)
          throw $.ioore(0);
        var t2 = wds[0];
        this.right = t2;
        this.left = t2;
        this.bottom = t2;
        this.top = t2;
        return;
      case 2:
        if (0 >= t1)
          throw $.ioore(0);
        t2 = wds[0];
        this.bottom = t2;
        this.top = t2;
        if (1 >= wds.length)
          throw $.ioore(1);
        t2 = wds[1];
        this.right = t2;
        this.left = t2;
        return;
      case 3:
        if (0 >= t1)
          throw $.ioore(0);
        this.top = wds[0];
        if (1 >= wds.length)
          throw $.ioore(1);
        t2 = wds[1];
        this.right = t2;
        this.left = t2;
        if (2 >= wds.length)
          throw $.ioore(2);
        this.bottom = wds[2];
        return;
      default:
        if (0 >= t1)
          throw $.ioore(0);
        this.top = wds[0];
        if (1 >= wds.length)
          throw $.ioore(1);
        this.right = wds[1];
        if (2 >= wds.length)
          throw $.ioore(2);
        this.bottom = wds[2];
        if (3 >= wds.length)
          throw $.ioore(3);
        this.left = wds[3];
        return;
    }
  }
  if (!(defaultInfo == null)) {
    this.top = defaultInfo.get$top();
    this.bottom = defaultInfo.get$bottom();
    this.left = defaultInfo.get$left();
    this.right = defaultInfo.get$right();
  } else if (!(defaultValue == null)) {
    this.right = defaultValue;
    this.left = defaultValue;
    this.bottom = defaultValue;
    this.top = defaultValue;
  }
}
};

$$.CSSStyleDeclarationImpl = {"":
 ["_view", "_pcss"],
 super: "Object",
 get$_css: function() {
  if (this._pcss == null)
    this._pcss = $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration();
  return this._pcss;
},
 getPropertyValue$1: function(propertyName) {
  $.CSSStyleDeclarationImpl__check(propertyName);
  var t1 = this._pcss;
  return !(t1 == null) ? this._unwrap$1(t1.getPropertyValue$1($.CSS_name(propertyName))) : '';
},
 setProperty$3: function(propertyName, value, priority) {
  $.CSSStyleDeclarationImpl__check(propertyName);
  propertyName = $.CSS_name(propertyName);
  if (priority == null) {
    this.get$_css().setProperty$2(propertyName, value);
    var t1 = this._view;
    if (!(t1 == null) && t1.get$inDocument() === true)
      t1.get$node().get$style().setProperty$2(propertyName, value);
  } else {
    this.get$_css().setProperty$3(propertyName, value, priority);
    t1 = this._view;
    if (!(t1 == null) && t1.get$inDocument() === true)
      t1.get$node().get$style().setProperty$3(propertyName, value, priority);
  }
},
 setProperty$2: function(propertyName,value) {
  return this.setProperty$3(propertyName,value,null)
},
 get$cssText: function() {
  var t1 = this._pcss;
  return !(t1 == null) ? t1.get$cssText() : '';
},
 set$cssText: function(value) {
  if (this._pcss == null)
    var t1 = !(value == null) && $.isEmpty(value) !== true;
  else
    t1 = true;
  if (t1)
    this.get$_css().set$cssText(value);
  t1 = this._view;
  if (!(t1 == null) && t1.get$inDocument() === true)
    t1.get$node().get$style().set$cssText(value);
},
 get$length: function() {
  var t1 = this._pcss;
  return !(t1 == null) ? $.get$length(t1) : 0;
},
 set$backgroundColor: function(value) {
  this.setProperty$3('background-color', value, '');
},
 get$borderWidth: function() {
  return this.getPropertyValue$1('border-width');
},
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$columns: function() {
  return this.getPropertyValue$1('columns');
},
 get$filter: function() {
  return this.getPropertyValue$1('filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 get$left: function() {
  return this.getPropertyValue$1('left');
},
 set$left: function(value) {
  this.setProperty$3('left', value, '');
},
 get$maxHeight: function() {
  return this.getPropertyValue$1('max-height');
},
 get$maxWidth: function() {
  return this.getPropertyValue$1('max-width');
},
 get$minHeight: function() {
  return this.getPropertyValue$1('min-height');
},
 get$minWidth: function() {
  return this.getPropertyValue$1('min-width');
},
 set$overflow: function(value) {
  this.setProperty$3('overflow', value, '');
},
 get$position: function() {
  return this.getPropertyValue$1('position');
},
 get$resize: function() {
  return this.getPropertyValue$1('resize');
},
 get$right: function() {
  return this.getPropertyValue$1('right');
},
 get$size: function() {
  return this.getPropertyValue$1('size');
},
 set$src: function(value) {
  this.setProperty$3('src', value, '');
},
 get$top: function() {
  return this.getPropertyValue$1('top');
},
 set$top: function(value) {
  this.setProperty$3('top', value, '');
},
 get$transform: function() {
  return this.getPropertyValue$1('transform');
},
 set$transform: function(value) {
  this.setProperty$3('transform', value, '');
},
 get$transition: function() {
  return this.getPropertyValue$1('transition');
},
 get$whiteSpace: function() {
  return this.getPropertyValue$1('white-space');
},
 set$whiteSpace: function(value) {
  this.setProperty$3('white-space', value, '');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$3('width', value, '');
},
 get$zIndex: function() {
  return this.getPropertyValue$1('z-index');
},
 _unwrap$1: function(value) {
  return !(value == null) ? value : '';
}
};

$$.DeclarationImpl = {"":
 [],
 super: "Object",
 set$text: function(text) {
  $.clear(this._props);
  for (var t1 = $.iterator($.split(text, ';')); t1.hasNext$0() === true;) {
    var pair = $.trim(t1.next$0());
    if ($.isEmpty(pair) === true)
      continue;
    var j = $.indexOf$1(pair, ':');
    if ($.gtB(j, 0)) {
      var key = $.trim($.substring$2(pair, 0, j));
      var value = $.trim($.substring$1(pair, $.add(j, 1)));
      if ($.isEmpty(key) !== true) {
        this.setProperty$2(key, value);
        continue;
      }
    }
    throw $.captureStackTrace($.UIException$('Unknown declaration: ' + $.S(pair)));
  }
},
 getPropertyValue$1: function(propertyName) {
  var value = $.index(this._props, propertyName);
  return !(value == null) ? value : '';
},
 removeProperty$1: function(propertyName) {
  this._props.remove$1(propertyName);
},
 setProperty$2: function(propertyName, value) {
  if (value == null || $.isEmpty(value) === true)
    this.removeProperty$1(propertyName);
  else
    $.indexSet(this._props, propertyName, $.trim(value));
}
};

$$.LayoutDeclarationImpl = {"":
 ["_lib0_owner", "_props"],
 super: "DeclarationImpl",
 get$type: function() {
  return this.getPropertyValue$1('type');
},
 set$type: function(value) {
  this.setProperty$2('type', value);
},
 get$orient: function() {
  return this.getPropertyValue$1('orient');
},
 get$align: function() {
  return this.getPropertyValue$1('align');
},
 get$spacing: function() {
  return this.getPropertyValue$1('spacing');
},
 get$gap: function() {
  return this.getPropertyValue$1('gap');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$2('width', value);
},
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$2('height', value);
}
};

$$.ProfileDeclarationImpl = {"":
 ["_lib0_owner", "_anchorView", "_props"],
 super: "DeclarationImpl",
 get$anchor: function() {
  return this.getPropertyValue$1('anchor');
},
 get$anchorView: function() {
  var t1 = this._anchorView;
  if (!(t1 == null))
    ;
  else {
    var anc = this.get$anchor();
    if ($.isEmpty(anc) === true)
      t1 = $.isEmpty(this.get$location()) === true ? null : this._lib0_owner.get$parent();
    else
      t1 = this._lib0_owner.query$1(anc);
  }
  return t1;
},
 get$location: function() {
  return this.getPropertyValue$1('location');
},
 get$align: function() {
  return this.getPropertyValue$1('align');
},
 get$spacing: function() {
  return this.getPropertyValue$1('spacing');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$2('width', value);
},
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$2('height', value);
},
 get$minWidth: function() {
  return this.getPropertyValue$1('min-width');
},
 get$minHeight: function() {
  return this.getPropertyValue$1('min-height');
},
 get$maxWidth: function() {
  return this.getPropertyValue$1('max-width');
},
 get$maxHeight: function() {
  return this.getPropertyValue$1('max-height');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); }
};

$$.ViewConfig = {"":
 ["classPrefix?", "uuidPrefix?"],
 super: "Object",
 ViewConfig$0: function() {
  var appid = $.application().get$uuid();
  if ($.gtB(appid, 0))
    this.uuidPrefix = $.S($.StringUtil_encodeId(appid, 'v')) + '_';
}
};

$$.RunOnceViewManager = {"":
 [],
 super: "Object",
 _task$1: function(arg0) { return this._task.call$1(arg0); },
 isQueueEmpty$0: function() {
  return $.isEmpty(this._views);
},
 queue$1: function(view) {
  $.add$1(this._views, view);
  this._runQue.add$3('', new $.RunOnceViewManager_queue_anon(this), 5);
},
 flush$1: function(view) {
  if (this._lib0_ready$1(view) !== true) {
    if (!(view == null))
      $.add$1(this._views, view);
  } else if (!(view == null))
    this._flushOne$1(view);
  else
    this._flushAll$0();
},
 flush$0: function() {
  return this.flush$1(null)
},
 handle_$1: function(view) {
  this._task$1(view);
},
 _flushAll$0: function() {
  for (var t1 = this._views, t2 = $.iterator(t1), t3 = this._ignoreDetached === true, t4 = this._ignoreSubviews === true; t2.hasNext$0() === true;) {
    var v = t2.next$0();
    if (t3 && v.get$inDocument() !== true) {
      t1.remove$1(v);
      continue;
    }
    if (t4)
      for (var v0 = v; v0 = v0.get$parent(), !(v0 == null);)
        if ($.contains$1(t1, v0) === true) {
          t1.remove$1(v);
          break;
        }
  }
  var todo = $.ListFactory_List$from(t1);
  $.clear(t1);
  for (t1 = $.iterator(todo); t1.hasNext$0() === true;)
    this.handle_$1(t1.next$0());
},
 _flushOne$1: function(view) {
  var t1 = this._views;
  t1.remove$1(view);
  if (this._ignoreDetached !== true || view.get$inDocument() === true) {
    for (var v = view; v = v.get$parent(), !(v == null);)
      if ($.contains$1(t1, v) === true)
        return;
    if (this._ignoreSubviews === true)
      for (var t2 = $.iterator(t1); t2.hasNext$0() === true;) {
        var t3 = t2.next$0();
        if (t3.isDescendantOf$1(view) === true)
          t1.remove$1(t3);
      }
    this.handle_$1(view);
  }
},
 _lib0_ready$1: function(view) {
  var t1 = this._readyChecks;
  if ($.isEmpty(t1) !== true) {
    var continueTask = new $.RunOnceViewManager__ready_anon(this, view);
    for (t1 = $.iterator(t1); t1.hasNext$0() === true;)
      if (t1.next$0().call$2(view, continueTask) !== true)
        return false;
  }
  return true;
}
};

$$._DragGestureState = {"":
 ["_gesture", "_vp", "startPosition", "startTime", "_position", "_lib5_time", "data"],
 super: "Object",
 get$position: function() {
  return this._position;
},
 get$transition: function() {
  return $.sub(this._position, this.startPosition);
},
 snapshot$2: function(position, time) {
  this._vp.snapshot$2(position, time);
  this._position = position;
  this._lib5_time = time;
}
};

$$._DragGesture = {"":
 [],
 super: "Object",
 _start$1: function(arg0) { return this._start.call$1(arg0); },
 _move$1: function(arg0) { return this._move.call$1(arg0); },
 _end$1: function(arg0) { return this._end.call$1(arg0); },
 stop$0: function() {
  this._state = null;
},
 _touchStart$3: function(touched, position, time) {
  if (this._disabled === true)
    return;
  this.stop$0();
  this._state = $._DragGestureState$(this, position, time);
  if (!(this._start == null) && this._start$1(this._state) === false)
    this.stop$0();
},
 _touchMove$2: function(position, time) {
  var t1 = this._state;
  if (!(t1 == null)) {
    t1.snapshot$2(position, time);
    if (!(this._move == null) && this._move$1(this._state) === false)
      this.stop$0();
  }
},
 _touchEnd$0: function() {
  var t1 = this._state;
  if (!(t1 == null) && !(this._end == null))
    this._end$1(t1);
  this.stop$0();
},
 _DragGesture$_init$4: function(_owner, _start, _move, _end) {
  this._listen$0();
}
};

$$._TouchDragGesture = {"":
 ["_elStart", "_elMove", "_elEnd", "_owner", "_start", "_move", "_end", "_state", "_disabled"],
 super: "_DragGesture",
 _listen$0: function() {
  var on = this._owner.get$on();
  var t1 = on.get$touchStart();
  var t2 = new $._TouchDragGesture__listen_anon(this);
  this._elStart = t2;
  $.add$1(t1, t2);
  t2 = on.get$touchMove();
  t1 = new $._TouchDragGesture__listen_anon0(this);
  this._elMove = t1;
  $.add$1(t2, t1);
  t1 = on.get$touchEnd();
  t2 = new $._TouchDragGesture__listen_anon1(this);
  this._elEnd = t2;
  $.add$1(t1, t2);
}
};

$$._MouseDragGesture = {"":
 ["_elStart", "_elMove", "_elEnd", "_captured", "_owner", "_start", "_move", "_end", "_state", "_disabled"],
 super: "_DragGesture",
 stop$0: function() {
  if (this._captured === true) {
    this._captured = false;
    var on = $.document().get$on();
    if (!(this._elMove == null))
      on.get$mouseMove().remove$1(this._elMove);
    if (!(this._elEnd == null))
      on.get$mouseUp().remove$1(this._elEnd);
  }
  $._DragGesture.prototype.stop$0.call(this);
},
 _capture$0: function() {
  this._captured = true;
  var on = $.document().get$on();
  var t1 = on.get$mouseMove();
  var t2 = new $._MouseDragGesture__capture_anon(this);
  this._elMove = t2;
  $.add$1(t1, t2);
  t2 = on.get$mouseUp();
  t1 = new $._MouseDragGesture__capture_anon0(this);
  this._elEnd = t1;
  $.add$1(t2, t1);
},
 _listen$0: function() {
  var t1 = this._owner.get$on().get$mouseDown();
  var t2 = new $._MouseDragGesture__listen_anon(this);
  this._elStart = t2;
  $.add$1(t1, t2);
}
};

$$._ZoomGestureState = {"":
 ["gesture", "_startPos0", "_startPos1", "_startMid", "_startDiff", "_startDir", "_scaleBase", "startTime", "data", "_pos0", "_pos1", "_lib5_time"],
 super: "Object",
 snapshot$3: function(pos0, pos1, time) {
  if ($.gtB(time, this._lib5_time)) {
    this._pos0 = pos0;
    this._pos1 = pos1;
    this._lib5_time = time;
  }
},
 get$startMidpoint: function() {
  return this._startMid;
},
 get$midpoint: function() {
  return $.div($.add(this._pos0, this._pos1), 2);
},
 get$transition: function() {
  return $.sub(this.get$midpoint(), this._startMid);
},
 get$scalar: function() {
  return $.div($.sub(this._pos1, this._pos0).norm$0(), this._scaleBase);
},
 get$rotation: function() {
  var diff = $.sub(this._pos1, this._pos0);
  var cx = diff.get$x();
  var cy = diff.get$y();
  var t1 = this._startDir;
  var ix = t1.get$x();
  var iy = t1.get$y();
  return $._Offset$($.add($.mul(cx, ix), $.mul(cy, iy)), $.sub($.mul(cy, ix), $.mul(cx, iy))).unit$0();
},
 get$transformation: function() {
  var tr = this.get$transition();
  var ro = $.mul(this.get$rotation(), this.get$scalar());
  return $.Transformation$(ro.get$x(), $.neg(ro.get$y()), tr.get$x(), ro.get$y(), ro.get$x(), tr.get$y());
},
 _ZoomGestureState$4: function(gesture, pos0, pos1, time) {
  var t1 = this._startDiff;
  this._scaleBase = t1.norm$0();
  this._startDir = $.div(t1, this._scaleBase);
}
};

$$._ZoomGesture = {"":
 ["_start", "_move", "_end", "_elStart", "_elMove", "_elEnd", "_state", "_disabled", "owner"],
 super: "Object",
 _start$1: function(arg0) { return this._start.call$1(arg0); },
 _move$1: function(arg0) { return this._move.call$1(arg0); },
 _end$1: function(arg0) { return this._end.call$1(arg0); },
 stop$0: function() {
  this._state = null;
},
 onStart$3: function(pos0, pos1, time) {
  if (this._disabled === true)
    return;
  this.stop$0();
  this._state = $._ZoomGestureState$(this, pos0, pos1, time);
  if (!(this._start == null) && this._start$1(this._state) === false)
    this.stop$0();
},
 onMove$3: function(pos0, pos1, time) {
  var t1 = this._state;
  if (!(t1 == null)) {
    t1.snapshot$3(pos0, pos1, time);
    if (!(this._move == null) && this._move$1(this._state) === false)
      this.stop$0();
  }
},
 onEnd$1: function(time) {
  var t1 = this._state;
  if (!(t1 == null) && !(this._end == null))
    this._end$1(t1);
  this.stop$0();
},
 _ZoomGesture$4: function(owner, start, move, end) {
  var on = this.owner.get$on();
  var t1 = on.get$touchStart();
  var t2 = new $.anon(this);
  this._elStart = t2;
  $.add$1(t1, t2);
  t2 = on.get$touchMove();
  t1 = new $.anon0(this);
  this._elMove = t1;
  $.add$1(t2, t1);
  t1 = on.get$touchEnd();
  t2 = new $.anon1(this);
  this._elEnd = t2;
  $.add$1(t1, t2);
}
};

$$.Token = {"":
 ["type?", "start?", "end"],
 super: "Object",
 source$1: function(src) {
  return $.substring$2(src, this.start, this.end);
},
 extend$0: function() {
  var t1 = this.end;
  if (typeof t1 !== 'number')
    return this.extend$0$bailout(1, t1);
  this.end = t1 + 1;
  return t1;
},
 extend$0$bailout: function(state, t1) {
  this.end = $.add(t1, 1);
  return t1;
},
 toString$0: function() {
  return $.S(this.type);
}
};

$$.ViewMatchContext = {"":
 ["parent?", "view?", "viewChildIndex", "_qualified?"],
 super: "Object",
 moveToNextSibling$0: function() {
  this.view = this.view.get$nextSibling();
  this.viewChildIndex = $.add(this.viewChildIndex, 1);
},
 isQualified$2: function(selectorIndex, position) {
  if (typeof selectorIndex !== 'number')
    return this.isQualified$2$bailout(1, selectorIndex, position, 0);
  if (typeof position !== 'number')
    return this.isQualified$2$bailout(1, selectorIndex, position, 0);
  if (!(selectorIndex < 0)) {
    var t1 = $.get$length(this._qualified);
    if (typeof t1 !== 'number')
      return this.isQualified$2$bailout(2, selectorIndex, position, t1);
    t1 = selectorIndex >= t1;
  } else
    t1 = true;
  if (t1)
    return false;
  t1 = this._qualified;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.isQualified$2$bailout(3, t1, position, selectorIndex);
  if (selectorIndex !== (selectorIndex | 0))
    throw $.iae(selectorIndex);
  if (selectorIndex < 0 || selectorIndex >= t1.length)
    throw $.ioore(selectorIndex);
  var posq = t1[selectorIndex];
  if (typeof posq !== 'string' && (typeof posq !== 'object' || posq === null || posq.constructor !== Array && !posq.is$JavaScriptIndexingBehavior()))
    return this.isQualified$2$bailout(4, position, posq, 0);
  if (position > -1) {
    t1 = posq.length;
    if (position < t1) {
      if (position !== (position | 0))
        throw $.iae(position);
      if (position < 0 || position >= t1)
        throw $.ioore(position);
      var t2 = posq[position] === true;
      t1 = t2;
    } else
      t1 = false;
  } else
    t1 = false;
  return t1;
},
 isQualified$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var selectorIndex = env0;
      var position = env1;
      break;
    case 2:
      selectorIndex = env0;
      position = env1;
      t1 = env2;
      break;
    case 3:
      t1 = env0;
      position = env1;
      selectorIndex = env2;
      break;
    case 4:
      position = env0;
      posq = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !$.ltB(selectorIndex, 0))
        switch (state) {
          case 0:
            var t1 = $.get$length(this._qualified);
          case 2:
            state = 0;
            t1 = $.geB(selectorIndex, t1);
        }
      else
        t1 = true;
      if (t1)
        return false;
      t1 = this._qualified;
    case 3:
      state = 0;
      var posq = $.index(t1, selectorIndex);
    case 4:
      state = 0;
      return $.gtB(position, -1) && $.ltB(position, $.get$length(posq)) && $.index(posq, position) === true;
  }
},
 qualify$3: function(selectorIndex, position, qualified) {
  var t1 = this._qualified;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.qualify$3$bailout(1, selectorIndex, position, qualified, t1);
  if (selectorIndex !== (selectorIndex | 0))
    throw $.iae(selectorIndex);
  if (selectorIndex < 0 || selectorIndex >= t1.length)
    throw $.ioore(selectorIndex);
  t1 = t1[selectorIndex];
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.qualify$3$bailout(2, t1, position, qualified, 0);
  if (position !== (position | 0))
    throw $.iae(position);
  if (position < 0 || position >= t1.length)
    throw $.ioore(position);
  t1[position] = qualified;
},
 qualify$3$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var selectorIndex = env0;
      var position = env1;
      var qualified = env2;
      t1 = env3;
      break;
    case 2:
      t1 = env0;
      position = env1;
      qualified = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._qualified;
    case 1:
      state = 0;
      t1 = $.index(t1, selectorIndex);
    case 2:
      state = 0;
      $.indexSet(t1, position, qualified);
  }
},
 qualify$2: function(selectorIndex,position) {
  return this.qualify$3(selectorIndex,position,true)
},
 qualify$2: function(selectorIndex,position) {
  return this.qualify$3(selectorIndex,position,true)
},
 isMatched$1: function(selectorIndex) {
  if (typeof selectorIndex !== 'number')
    return this.isMatched$1$bailout(1, selectorIndex, 0, 0);
  if (selectorIndex < 0) {
    var t1 = this._qualified;
    var i = 0;
    while (true) {
      var t2 = $.get$length(t1);
      if (typeof t2 !== 'number')
        return this.isMatched$1$bailout(2, i, t1, t2);
      if (!(i < t2))
        break;
      if (this.isMatched$1(i) === true)
        return true;
      ++i;
    }
    return false;
  } else {
    t1 = this._qualified;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.isMatched$1$bailout(3, selectorIndex, t1, 0);
    var t3 = t1.length;
    if (selectorIndex < t3) {
      if (selectorIndex !== (selectorIndex | 0))
        throw $.iae(selectorIndex);
      if (selectorIndex < 0 || selectorIndex >= t3)
        throw $.ioore(selectorIndex);
      t2 = $.last(t1[selectorIndex]) === true;
      t1 = t2;
    } else
      t1 = false;
    return t1;
  }
},
 isMatched$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var selectorIndex = env0;
      break;
    case 2:
      i = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 3:
      selectorIndex = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    default:
      if (state === 2 || state === 0 && $.ltB(selectorIndex, 0))
        switch (state) {
          case 0:
            var t1 = this._qualified;
            var i = 0;
          case 2:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    var t2 = $.get$length(t1);
                  case 2:
                    state = 0;
                    if (!$.ltB(i, t2))
                      break L0;
                    if (this.isMatched$1(i) === true)
                      return true;
                    ++i;
                }
            return false;
        }
      else
        switch (state) {
          case 0:
            t1 = this._qualified;
          case 3:
            state = 0;
            return $.ltB(selectorIndex, $.get$length(t1)) && $.last($.index(t1, selectorIndex)) === true;
        }
  }
},
 isMatched$0: function() {
  return this.isMatched$1(-1)
},
 match$1: function(seq) {
  if ($.ViewMatchContext_matchType(this.view, seq.get$type())) {
    var t1 = this.view;
    var t2 = seq.get$id();
    t1 = (t2 == null || $.eqB(t2, t1.get$id())) && $.ViewMatchContext_matchClasses(this.view, seq.get$classes()) && this.matchPseudoClasses$1(seq.get$pseudoClasses()) === true;
  } else
    t1 = false;
  return t1;
},
 matchPseudoClasses$1: function(pseudoClasses) {
  if (pseudoClasses == null || $.isEmpty(pseudoClasses) === true)
    return true;
  for (var t1 = $.iterator(pseudoClasses); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var accept = $.PseudoClass_getDefinition(t2.get$name());
    if (accept == null)
      throw $.captureStackTrace($.ExceptionImplementation$('Pseudo class definition not found: ' + $.S(t2.get$name())));
    if (accept.call$2(this, t2.get$parameter()) !== true)
      return false;
  }
  return true;
},
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this._qualified); t1.hasNext$0() === true;)
    sb.add$1(t1.next$0());
  return $.toString(sb.add$1(' @' + $.S(this.view)));
},
 ViewMatchContext$1: function(view) {
  this.viewChildIndex = $.ViewMatchContext_computeViewChildIndex(this.view);
},
 ViewMatchContext$root$2: function(view, selectors) {
  this.viewChildIndex = $.ViewMatchContext_computeViewChildIndex(this.view);
}
};

$$.PseudoClass = {"":
 ["name?", "parameter="],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$(':' + $.S(this.name));
  var t1 = this.parameter;
  if (!(t1 == null))
    sb.add$1('(' + $.S(t1) + ')');
  return sb.toString$0();
}
};

$$.SimpleSelectorSequence = {"":
 ["type=", "id=", "classes?", "attributes?", "pseudoClasses?", "combinator?"],
 super: "Object",
 setCombinatorByToken$1: function(token) {
  switch (token.get$type()) {
    case 7:
      this.combinator = 1;
      break;
    case 8:
      this.combinator = 2;
      break;
    case 9:
      this.combinator = 3;
      break;
    default:
  }
},
 printCombinator$0: function() {
  switch (this.combinator) {
    case 1:
      return ' >';
    case 2:
      return ' +';
    case 3:
      return ' ~';
    default:
      return '';
  }
},
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this.type;
  if (!(t1 == null))
    sb.add$1(t1);
  t1 = this.id;
  if (!(t1 == null))
    sb.add$1('#' + $.S(t1));
  for (t1 = $.iterator(this.classes); t1.hasNext$0() === true;)
    sb.add$1('.' + $.S(t1.next$0()));
  for (t1 = $.iterator(this.pseudoClasses); t1.hasNext$0() === true;)
    sb.add$1($.S(t1.next$0()));
  return sb.isEmpty$0() === true ? '*' : sb.toString$0();
}
};

$$.Selector = {"":
 ["selectorIndex?", "seqs?"],
 super: "Object",
 addCombinator$1: function(token) {
  $.last(this.seqs).setCombinatorByToken$1(token);
},
 getCombinator$1: function(index) {
  var t1 = this.seqs;
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  return t1[index].get$combinator();
},
 requiresIdSpace$1: function(index) {
  var t1 = this.seqs;
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  return !(t1[index].get$id() == null);
},
 addSequence$0: function() {
  var seq = $.SimpleSelectorSequence$();
  this.seqs.push(seq);
  return seq;
},
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this.seqs); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    sb.add$1($.S(t2) + $.S(t2.printCombinator$0()) + ' ');
  }
  return $.trim(sb.toString$0());
}
};

$$.SelectorParseException = {"":
 ["source", "token", "index"],
 super: "Object",
 source$1: function(arg0) { return this.source.call$1(arg0); },
 toString$0: function() {
  var t1 = this.token;
  if (t1 == null) {
    t1 = this.index;
    var t2 = $.ltB(t1, 0);
    var t3 = this.source;
    t1 = t2 ? 'Unexpected end of selector: ' + $.S(t3) : 'Unexpected character at ' + $.S(t1) + ' in selector ' + $.S(t3);
  } else {
    t2 = 'Unexpected token ' + $.S(t1.get$type()) + ' at ' + $.S(this.index) + ' in selector ' + $.S(this.source);
    t1 = t2;
  }
  return t1;
},
 is$Exception: true
};

$$.ViewIterator = {"":
 ["_root", "_selectors", "_posOffset", "_allIds", "_offsetRoot", "_currCtx", "_lib8_ready", "_lib8_next=", "_lib8_index"],
 super: "Object",
 _lib8_ready$1: function(arg0) { return this._lib8_ready.call$1(arg0); },
 _lib8_ready$1: function(arg0) { return this._lib8_ready.call$1(arg0); },
 _lib8_index$2: function(arg0, arg1) { return this._lib8_index.call$2(arg0, arg1); },
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  this._lib8_ready = false;
  return this._lib8_next;
},
 hasNext$0: function() {
  this._loadNext$0();
  return !(this._lib8_next == null);
},
 _loadNext$0: function() {
  if (this._lib8_ready === true)
    return;
  this._lib8_next = this._seekNext$0();
  this._lib8_ready = true;
},
 _seekNext$0: function() {
  this._currCtx = this._lib8_index < 0 ? this._buildRootCtx$0() : this._buildNextCtx$0();
  while (true) {
    var t1 = this._currCtx;
    if (!(!(t1 == null) && t1.isMatched$0() !== true))
      break;
    this._currCtx = this._buildNextCtx$0();
  }
  if (!(this._currCtx == null)) {
    this._lib8_index = this._lib8_index + 1;
    return this._currCtx.get$view();
  }
  return;
},
 _buildRootCtx$0: function() {
  var rt = this._root;
  var t1 = this._posOffset;
  if ($.gtB(t1, 0)) {
    var selector = $.index(this._selectors, 0);
    for (var i = 0; $.ltB(i, t1); ++i) {
      var seq = $.index(selector.get$seqs(), i);
      var rt2 = rt.getFellow$1(seq.get$id());
      if (rt2 == null)
        return;
      if (!$.ViewMatchContext_matchType(rt2, seq.get$type()) || !$.ViewMatchContext_matchClasses(rt2, seq.get$classes()) || $.ViewMatchContext$(rt2).matchPseudoClasses$1(seq.get$pseudoClasses()) !== true)
        return;
      if (i > 0)
        switch (selector.getCombinator$1(i - 1)) {
          case 0:
            if ($.ViewIterator_isDescendant(rt2, rt) !== true)
              return;
            break;
          case 1:
            if (!$.eqB(rt2.get$parent(), rt))
              return;
            break;
          case 3:
            if (!$.ViewIterator_isGeneralSibling(rt2, rt))
              return;
            break;
          case 2:
            if (!$.eqB(rt2.get$previousSibling(), rt))
              return;
            break;
        }
      rt = rt2;
    }
    this._offsetRoot = rt.get$parent();
  }
  var t2 = this._selectors;
  var ctx = $.ViewMatchContext$root(rt, t2);
  if ($.gtB(t1, 0))
    for (t2 = $.iterator(t2); t2.hasNext$0() === true;)
      ctx.qualify$2(t2.next$0().get$selectorIndex(), $.sub(t1, 1));
  else
    this.matchLevel0$1(ctx);
  return ctx;
},
 _buildNextCtx$0: function() {
  if (this._allIds === true)
    return;
  if (!(this._currCtx.get$view().get$firstChild() == null))
    return this._buildFirstChildCtx$1(this._currCtx);
  var t1 = this._posOffset;
  if (typeof t1 !== 'number')
    return this._buildNextCtx$0$bailout(1, t1);
  var t3 = this._root;
  t1 = t1 > 0;
  for (; this._currCtx.get$view().get$nextSibling() == null;) {
    this._currCtx = this._currCtx.get$parent();
    var t2 = this._currCtx;
    if (!(t2 == null)) {
      t2 = t2.get$view();
      t2 = $.eqB(t2, t1 ? this._offsetRoot : t3);
    } else
      t2 = true;
    if (t2)
      return;
  }
  return this._buildNextSiblingCtx$1(this._currCtx);
},
 _buildNextCtx$0$bailout: function(state, t1) {
  var t3 = this._root;
  for (; this._currCtx.get$view().get$nextSibling() == null;) {
    this._currCtx = this._currCtx.get$parent();
    var t2 = this._currCtx;
    if (!(t2 == null)) {
      t2 = t2.get$view();
      t2 = $.eqB(t2, $.gtB(t1, 0) ? this._offsetRoot : t3);
    } else
      t2 = true;
    if (t2)
      return;
  }
  return this._buildNextSiblingCtx$1(this._currCtx);
},
 _buildFirstChildCtx$1: function(parent$) {
  var ctx = $.ViewMatchContext$child(parent$.get$view().get$firstChild(), parent$);
  var t1 = this._posOffset;
  if ($.eqB(t1, 0))
    this.matchLevel0$1(ctx);
  for (var t2 = $.iterator(this._selectors); t2.hasNext$0() === true;) {
    var t3 = t2.next$0();
    var i = t3.get$selectorIndex();
    var posStart = $.gtB(t1, 0) ? $.sub(t1, 1) : 0;
    for (var j = posStart; $.ltB(j, $.sub($.get$length(t3.get$seqs()), 1)); j = $.add(j, 1))
      switch (t3.getCombinator$1(j)) {
        case 0:
          if (parent$.isQualified$2(i, j) === true && $.ViewIterator_checkIdSpace(t3, $.add(j, 1), ctx))
            ctx.qualify$2(i, j);
          if (parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true)
            ctx.qualify$2(i, $.add(j, 1));
          break;
        case 1:
          if (parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true)
            ctx.qualify$2(i, $.add(j, 1));
          break;
      }
  }
  return ctx;
},
 _buildNextSiblingCtx$1: function(ctx) {
  ctx.moveToNextSibling$0();
  for (var t1 = $.iterator(this._selectors), t2 = this._posOffset; t1.hasNext$0() === true;) {
    var t3 = t1.next$0();
    var i = t3.get$selectorIndex();
    var posEnd = $.gtB(t2, 0) ? $.sub(t2, 1) : 0;
    var len = $.get$length(t3.get$seqs());
    ctx.qualify$3(i, $.sub(len, 1), false);
    for (var j = $.sub(len, 2); $.geB(j, posEnd); j = $.sub(j, 1)) {
      var cb = t3.getCombinator$1(j);
      var parent$ = ctx.get$parent();
      switch (cb) {
        case 0:
          var parentPass = !(parent$ == null) && parent$.isQualified$2(i, j) === true;
          ctx.qualify$3(i, j, parentPass && $.ViewIterator_checkIdSpace(t3, $.add(j, 1), ctx));
          if (parentPass && this.match$3(t3, ctx, $.add(j, 1)) === true)
            ctx.qualify$2(i, $.add(j, 1));
          break;
        case 1:
          var t4 = $.add(j, 1);
          ctx.qualify$3(i, t4, !(parent$ == null) && parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true);
          break;
        case 3:
          if (ctx.isQualified$2(i, j) === true)
            ctx.qualify$3(i, $.add(j, 1), this.match$3(t3, ctx, $.add(j, 1)));
          break;
        case 2:
          t4 = $.add(j, 1);
          ctx.qualify$3(i, t4, ctx.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true);
          ctx.qualify$3(i, j, false);
      }
    }
  }
  if ($.eqB(t2, 0))
    this.matchLevel0$1(ctx);
  return ctx;
},
 matchLevel0$1: function(ctx) {
  for (var t1 = $.iterator(this._selectors); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (this.match$3(t2, ctx, 0) === true)
      ctx.qualify$2(t2.get$selectorIndex(), 0);
  }
},
 match$3: function(selector, ctx, index) {
  var t1 = selector.get$seqs();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.match$3$bailout(1, ctx, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  return ctx.match$1(t1[index]);
},
 match$3$bailout: function(state, ctx, index, t1) {
  return ctx.match$1($.index(t1, index));
},
 ViewIterator$2: function(_root, selector) {
  var t1 = this._selectors;
  this._posOffset = $.ViewIterator__getCommonSeqLength(t1);
  this._allIds = $.ViewIterator__isAllIds(t1, this._posOffset);
}
};

$$.ViewIterable = {"":
 ["_root", "_selector"],
 super: "Object",
 iterator$0: function() {
  return $.ViewIterator$(this._root, this._selector);
}
};

$$.Activity_run_anon = {"":
 ["this_1", "containerId_0"],
 super: "Closure",
 call$0: function() {
  this.this_1._lib4_init$1(this.containerId_0);
  this.this_1.onCreate_$0();
  this.this_1.set$_creating(false);
  this.this_1.get$_mainView().requestLayout$0();
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 super: "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 super: "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["findSlot_8", "readSlot_7", "writeSlot_6"],
 super: "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC10);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC11);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_8.call$1(e);
    t1.copy_1 = this.readSlot_7.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_6.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_8.call$1(e);
    var copy = this.readSlot_7.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_6.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_6.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_7.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_6.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, elementCopy, e, length$, i, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_6.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_6.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, i, copy, e, length$, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC12);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      elementCopy = env1;
      e = env2;
      length$ = env3;
      i = env4;
      slot = env5;
      break;
    case 3:
      i = env0;
      copy = env1;
      e = env2;
      length$ = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC10);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC11);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_8.call$1(e);
        t1.copy_1 = this.readSlot_7.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_6.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_8.call$1(e);
            var copy = this.readSlot_7.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_6.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_6.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_7.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_6.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_6.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_6.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC12);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0.call$1(key);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$._convertNativeToDart_AcceptStructuredClone_findSlot = {"":
 ["copies_1", "values_0"],
 super: "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_0);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_0, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_0, value);
  $.add$1(this.copies_1, null);
  return length$;
}
};

$$._convertNativeToDart_AcceptStructuredClone_readSlot = {"":
 ["copies_2"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.copies_2, i);
}
};

$$._convertNativeToDart_AcceptStructuredClone_writeSlot = {"":
 ["copies_3"],
 super: "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_3, i, x);
}
};

$$._convertNativeToDart_AcceptStructuredClone_walk = {"":
 ["findSlot_6", "readSlot_5", "writeSlot_4"],
 super: "Closure",
 call$1: function(e) {
  if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
    return this.call$1$bailout(1, e, 0, 0);
  if (e instanceof Date)
    throw $.captureStackTrace($.CTC5);
  if (e instanceof RegExp)
    throw $.captureStackTrace($.CTC6);
  if ($._isJavaScriptSimpleObject(e)) {
    var slot = this.findSlot_6.call$1(e);
    var copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    copy = $.makeLiteralMap([]);
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(2, e, slot, copy);
    this.writeSlot_4.call$2(slot, copy);
    for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      var t3 = this.call$1(e[t2]);
      if (t2 !== (t2 | 0))
        throw $.iae(t2);
      if (t2 < 0 || t2 >= copy.length)
        throw $.ioore(t2);
      copy[t2] = t3;
    }
    return copy;
  }
  if (e instanceof Array) {
    slot = this.findSlot_6.call$1(e);
    copy = this.readSlot_5.call$1(slot);
    if (!(copy == null))
      return copy;
    this.writeSlot_4.call$2(slot, e);
    var length$ = e.length;
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      e[i] = t1;
    }
    return e;
  }
  return e;
},
 call$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      e = env0;
      slot = env1;
      copy = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (e instanceof Date)
        throw $.captureStackTrace($.CTC5);
      if (e instanceof RegExp)
        throw $.captureStackTrace($.CTC6);
    case 2:
      if (state === 2 || state === 0 && $._isJavaScriptSimpleObject(e))
        switch (state) {
          case 0:
            var slot = this.findSlot_6.call$1(e);
            var copy = this.readSlot_5.call$1(slot);
            if (!(copy == null))
              return copy;
            copy = $.makeLiteralMap([]);
          case 2:
            state = 0;
            this.writeSlot_4.call$2(slot, copy);
            for (var t1 = $.iterator(Object.keys(e)); t1.hasNext$0() === true;) {
              var t2 = t1.next$0();
              $.indexSet(copy, t2, this.call$1(e[t2]));
            }
            return copy;
        }
      if (e instanceof Array) {
        slot = this.findSlot_6.call$1(e);
        copy = this.readSlot_5.call$1(slot);
        if (!(copy == null))
          return copy;
        this.writeSlot_4.call$2(slot, e);
        var length$ = $.get$length(e);
        for (var i = 0; $.ltB(i, length$); ++i)
          $.indexSet(e, i, this.call$1($.index(e, i)));
        return e;
      }
      return e;
  }
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._convertNativeToDart_IDBKey_containsDate = {"":
 [],
 super: "Closure",
 call$1: function(object) {
  if (object instanceof Date)
    return true;
  if (typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List())) {
    if (typeof object !== 'object' || object === null || object.constructor !== Array && !object.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, object);
    for (var i = 0; t1 = object.length, i < t1; ++i) {
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      if (this.call$1(object[i]) === true)
        return true;
    }
  }
  return false;
  var t1;
},
 call$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var object = env0;
      break;
  }
  switch (state) {
    case 0:
      if (object instanceof Date)
        return true;
    case 1:
      if (state === 1 || state === 0 && typeof object === 'object' && object !== null && (object.constructor === Array || object.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            for (var i = 0; $.ltB(i, $.get$length(object)); ++i)
              if (this.call$1($.index(object, i)) === true)
                return true;
        }
      return false;
  }
}
};

$$.RunOnceViewManager__ready_anon = {"":
 ["this_1", "view_0"],
 super: "Closure",
 call$0: function() {
  this.this_1.flush$1(this.view_0);
}
};

$$.RunOnceViewManager_queue_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.flush$0();
}
};

$$.RunOnceQueue_add_anon = {"":
 ["key_2", "task_1", "this_0"],
 super: "Closure",
 call$0: function() {
  this.this_0.get$_tasks().remove$1(this.key_2);
  this.task_1.call$0();
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$.LayoutManager_handle__anon = {"":
 ["parent_0"],
 super: "Closure",
 call$0: function() {
  return this.parent_0.get$innerWidth();
}
};

$$.LayoutManager_handle__anon0 = {"":
 ["parent_1"],
 super: "Closure",
 call$0: function() {
  return this.parent_1.get$innerHeight();
}
};

$$._VLayout_doLayout_anon = {"":
 ["view_0"],
 super: "Closure",
 call$0: function() {
  return this.view_0.get$innerWidth();
}
};

$$._VLayout_doLayout_anon0 = {"":
 ["view_1"],
 super: "Closure",
 call$0: function() {
  return this.view_1.get$innerHeight();
}
};

$$._VLayout_doLayout_anon1 = {"":
 ["view_3", "si_2"],
 super: "Closure",
 call$0: function() {
  return $.sub($.sub(this.view_3.get$innerWidth(), this.si_2.get$left()), this.si_2.get$right());
}
};

$$._HLayout_doLayout_anon = {"":
 ["view_0"],
 super: "Closure",
 call$0: function() {
  return this.view_0.get$innerWidth();
}
};

$$._HLayout_doLayout_anon0 = {"":
 ["view_1"],
 super: "Closure",
 call$0: function() {
  return this.view_1.get$innerHeight();
}
};

$$._HLayout_doLayout_anon1 = {"":
 ["view_3", "si_2"],
 super: "Closure",
 call$0: function() {
  return $.sub($.sub(this.view_3.get$innerHeight(), this.si_2.get$top()), this.si_2.get$bottom());
}
};

$$.TileLayout_doLayout__anon = {"":
 ["view_0"],
 super: "Closure",
 call$0: function() {
  return this.view_0.get$innerWidth();
}
};

$$.TileLayout_doLayout__anon0 = {"":
 ["view_1"],
 super: "Closure",
 call$0: function() {
  return this.view_1.get$innerHeight();
}
};

$$.FreeLayout_doLayout__anon = {"":
 ["view_0"],
 super: "Closure",
 call$0: function() {
  return this.view_0.get$innerWidth();
}
};

$$.FreeLayout_doLayout__anon0 = {"":
 ["view_1"],
 super: "Closure",
 call$0: function() {
  return this.view_1.get$innerHeight();
}
};

$$._DataAttributeMap_getKeys_anon = {"":
 ["this_1", "keys_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true)
    $.add$1(this.keys_0, this.this_1._strip$1(key));
}
};

$$._DataAttributeMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true)
    this.f_0.call$2(this.this_1._strip$1(key), value);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$1: function(key) {
  return this.f_0.call$2(key, $.index(this.this_1, key));
}
};

$$.MeasureContext_dataAttributes_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  var t1 = $.HashMapImplementation$();
  this.this_0.set$_dataAttrs(t1);
  return t1;
}
};

$$.AnchorRelation__layoutAnchored_anon = {"":
 ["view_1", "anchor_0"],
 super: "Closure",
 call$0: function() {
  return $._anchorWidth(this.anchor_0, this.view_1);
}
};

$$.AnchorRelation__layoutAnchored_anon0 = {"":
 ["view_3", "anchor_2"],
 super: "Closure",
 call$0: function() {
  return $._anchorHeight(this.anchor_2, this.view_3);
}
};

$$._anchorYHandlers_anon = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$top($.sub(offset, view.get$outerHeight()));
}
};

$$._anchorYHandlers_anon0 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$top(offset);
}
};

$$._anchorYHandlers_anon1 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, $.tdiv($.sub($._anchorHeight(anchor, view), view.get$outerHeight()), 2)));
}
};

$$._anchorYHandlers_anon2 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$top($.sub($.add(offset, $._anchorHeight(anchor, view)), view.get$outerHeight()));
}
};

$$._anchorYHandlers_anon3 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, $._anchorHeight(anchor, view)));
}
};

$$._anchorXHandlers_anon = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$left($.sub(offset, view.get$outerWidth()));
}
};

$$._anchorXHandlers_anon0 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$left(offset);
}
};

$$._anchorXHandlers_anon1 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, $.tdiv($.sub($._anchorWidth(anchor, view), view.get$outerWidth()), 2)));
}
};

$$._anchorXHandlers_anon2 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$left($.sub($.add(offset, $._anchorWidth(anchor, view)), view.get$outerWidth()));
}
};

$$._anchorXHandlers_anon3 = {"":
 [],
 super: "Closure",
 call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, $._anchorWidth(anchor, view)));
}
};

$$.AnchorRelation__layoutRoot_anon = {"":
 ["root_1", "anchor_0"],
 super: "Closure",
 call$0: function() {
  var t1 = this.anchor_0;
  return !(t1 == null) ? $._anchorWidth(t1, this.root_1) : $.browser.get$size().get$width();
}
};

$$.AnchorRelation__layoutRoot_anon0 = {"":
 ["root_3", "anchor_2"],
 super: "Closure",
 call$0: function() {
  var t1 = this.anchor_2;
  return !(t1 == null) ? $._anchorHeight(t1, this.root_3) : $.browser.get$size().get$height();
}
};

$$.Browser__initBrowserInfo_anon = {"":
 ["this_1", "ua_0"],
 super: "Closure",
 call$1: function(regex) {
  var m = regex.firstMatch$1(this.ua_0);
  if (!(m == null)) {
    var t1 = m.group$1(1);
    this.this_1.set$name(t1);
    t1 = $.Browser__versionOf(m.group$1(2), '.');
    this.this_1.set$version(t1);
    return true;
  }
  return false;
}
};

$$.MapDemo_onCreate__anon = {"":
 ["imgh_6", "panel_5", "img_4", "box_0", "imgw_3"],
 super: "Closure",
 call$1: function(event$) {
  var psize = $.DOMQuery_DOMQuery(this.panel_5).get$innerSize();
  if ($.ltB($.div(psize.get$width(), this.imgw_3), $.div(psize.get$height(), this.imgh_6))) {
    var t1 = $.toInt(psize.get$width());
    this.img_4.set$width(t1);
    t1 = $.toInt($.div($.mul(psize.get$width(), this.imgh_6), this.imgw_3));
    this.img_4.set$height(t1);
  } else {
    t1 = $.toInt($.div($.mul(psize.get$height(), this.imgw_3), this.imgh_6));
    this.img_4.set$width(t1);
    t1 = $.toInt(psize.get$height());
    this.img_4.set$height(t1);
  }
  var trans = $.Transformation$identity();
  this.box_0.trans_2 = trans;
  t1 = $.CSS_transform(this.box_0.trans_2);
  this.img_4.get$style().set$transform(t1);
}
};

$$.MapDemo_onCreate__anon0 = {"":
 ["this_8", "img_7", "box_0"],
 super: "Closure",
 call$1: function(state) {
  var diff = $.sub(this.this_8.center$1(this.img_7), state.get$startMidpoint());
  this.box_0.diff_1 = diff;
}
};

$$.MapDemo_onCreate__anon1 = {"":
 ["img_9", "box_0"],
 super: "Closure",
 call$1: function(state) {
  var t1 = $.CSS_transform($.mod(state.get$transformation().originAt$1(this.box_0.diff_1), this.box_0.trans_2));
  this.img_9.get$style().set$transform(t1);
}
};

$$.MapDemo_onCreate__anon2 = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(state) {
  var trans = $.mod(state.get$transformation().originAt$1(this.box_0.diff_1), this.box_0.trans_2);
  this.box_0.trans_2 = trans;
}
};

$$.MapDemo_onCreate__anon3 = {"":
 ["img_10", "box_0"],
 super: "Closure",
 call$1: function(state) {
  var t1 = $.CSS_transform($.Transformation$transit(state.get$transition()).operator$mod$1(this.box_0.trans_2));
  this.img_10.get$style().set$transform(t1);
}
};

$$.MapDemo_onCreate__anon4 = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(state) {
  var trans = $.Transformation$transit(state.get$transition()).operator$mod$1(this.box_0.trans_2);
  this.box_0.trans_2 = trans;
}
};

$$._TouchDragGesture__listen_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(event$) {
  if ($.gtB($.get$length(event$.get$touches()), 1))
    this.this_0._touchEnd$0();
  else {
    var t = $.index(event$.get$touches(), 0);
    this.this_0._touchStart$3(event$.get$target(), $._Offset$(t.get$pageX(), t.get$pageY()), event$.get$timeStamp());
    if ($.DOMQuery_DOMQuery(event$.get$target()).isInput$0() !== true)
      event$.preventDefault$0();
  }
}
};

$$._TouchDragGesture__listen_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(event$) {
  var t = $.index(event$.get$touches(), 0);
  this.this_1._touchMove$2($._Offset$(t.get$pageX(), t.get$pageY()), event$.get$timeStamp());
}
};

$$._TouchDragGesture__listen_anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$1: function(event$) {
  this.this_2._touchEnd$0();
}
};

$$._MouseDragGesture__listen_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(event$) {
  this.this_0._touchStart$3(event$.get$target(), $._Offset$(event$.get$pageX(), event$.get$pageY()), event$.get$timeStamp());
  this.this_0._capture$0();
  if ($.DOMQuery_DOMQuery(event$.get$target()).isInput$0() !== true)
    event$.preventDefault$0();
}
};

$$._MouseDragGesture__capture_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(event$) {
  this.this_0._touchMove$2($._Offset$(event$.get$pageX(), event$.get$pageY()), event$.get$timeStamp());
}
};

$$._MouseDragGesture__capture_anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(event$) {
  this.this_1._touchEnd$0();
}
};

$$.anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(event$) {
  var fingers = $.get$length(event$.get$touches());
  if ($.gtB(fingers, 2))
    this.this_0.onEnd$1(event$.get$timeStamp());
  else if ($.eqB(fingers, 2)) {
    var t00 = $.index(event$.get$touches(), 0);
    var t1 = $.index(event$.get$touches(), 1);
    if (!$.eqB(t00.get$pageX(), t1.get$pageX()) || !$.eqB(t00.get$pageY(), t1.get$pageY())) {
      this.this_0.onStart$3($._Offset$(t00.get$pageX(), t00.get$pageY()), $._Offset$(t1.get$pageX(), t1.get$pageY()), event$.get$timeStamp());
      event$.preventDefault$0();
    }
  }
}
};

$$.anon0 = {"":
 ["this_1"],
 super: "Closure",
 call$1: function(event$) {
  if ($.eqB($.get$length(event$.get$touches()), 2)) {
    var t00 = $.index(event$.get$touches(), 0);
    var t1 = $.index(event$.get$touches(), 1);
    this.this_1.onMove$3($._Offset$(t00.get$pageX(), t00.get$pageY()), $._Offset$(t1.get$pageX(), t1.get$pageY()), event$.get$timeStamp());
  }
}
};

$$.anon1 = {"":
 ["this_2"],
 super: "Closure",
 call$1: function(event$) {
  return this.this_2.onEnd$1(event$.get$timeStamp());
}
};

$$._ViewEventListenerMap__get_anon = {"":
 ["this_1", "type_0"],
 super: "Closure",
 call$0: function() {
  return $._ViewEventListenerList$(this.this_1.get$_lib6_ptr(), this.type_0);
}
};

$$._EventListenerInfo_add_anon = {"":
 ["box_0"],
 super: "Closure",
 call$0: function() {
  this.box_0.first_10 = true;
  return [];
}
};

$$._ViewImpl__domEvtDisp_anon = {"":
 ["type_0"],
 super: "Closure",
 call$1: function(target) {
  return new $._ViewImpl__domEvtDisp_anon0(this.type_0, target);
}
};

$$._ViewImpl__domEvtDisp_anon0 = {"":
 ["type_2", "target_1"],
 super: "Closure",
 call$1: function(event$) {
  var t1 = this.target_1;
  t1.sendEvent$1($.ViewEvent$dom(event$, this.type_2, t1));
}
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000))
    return $.S(n);
  if ($.geB(absN, 100))
    return sign + '0' + $.S(absN);
  if ($.geB(absN, 10))
    return sign + '00' + $.S(absN);
  return sign + '000' + $.S(absN);
}
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 100))
    return $.S(n);
  if ($.geB(n, 10))
    return '0' + $.S(n);
  return '00' + $.S(n);
}
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  if ($.geB(n, 10))
    return $.S(n);
  return '0' + $.S(n);
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$.LayoutManager_waitImageLoaded_anon = {"":
 ["this_1", "imgURI_0"],
 super: "Closure",
 call$1: function(event$) {
  this.this_1._onImageLoaded$1(this.imgURI_0);
}
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(value) {
  this.this_0.add$1(value);
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.f_0.call$1(key) === true)
    $.add$1(this.result_1, key);
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_10;
  var i = $.add(t2, 1);
  this.box_0.i_10 = i;
  $.indexSet(t1, t2, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._DataAttributeMap_getValues_anon = {"":
 ["this_1", "values_0"],
 super: "Closure",
 call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true)
    $.add$1(this.values_0, value);
}
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
}
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 super: "Closure",
 call$1: function(s) {
  return $.add$1(s, this.value_0);
}
};

$$._CssClassSet_addAll_anon = {"":
 ["collection_0"],
 super: "Closure",
 call$1: function(s) {
  return $.addAll(s, this.collection_0);
}
};

$$._CssClassSet_clear_anon = {"":
 [],
 super: "Closure",
 call$1: function(s) {
  return $.clear(s);
}
};

$$.MeasureContext__measureByContent_anon = {"":
 ["view_0"],
 super: "Closure",
 call$0: function() {
  return !(this.view_0.get$parent() == null) ? this.view_0.get$parent().get$innerWidth() : $.browser.get$size().get$width();
}
};

$$.MeasureContext__measureByContent_anon0 = {"":
 ["view_1"],
 super: "Closure",
 call$0: function() {
  return !(this.view_1.get$parent() == null) ? this.view_1.get$parent().get$innerHeight() : $.browser.get$size().get$height();
}
};

$$.PseudoClass_getDefinition_anon = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return param == null && ctx.get$view().get$previousSibling() == null;
}
};

$$.PseudoClass_getDefinition_anon0 = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return param == null && ctx.get$view().get$nextSibling() == null;
}
};

$$.PseudoClass_getDefinition_anon1 = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return param == null && ctx.get$view().get$previousSibling() == null && ctx.get$view().get$nextSibling() == null;
}
};

$$.PseudoClass_getDefinition_anon2 = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return param == null && $.eqB(ctx.get$view().get$childCount(), 0);
}
};

$$.PseudoClass_getDefinition_anon3 = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return !(param == null);
}
};

$$.PseudoClass_getDefinition_anon4 = {"":
 [],
 super: "Closure",
 call$2: function(ctx, param) {
  return !(param == null);
}
};

$$.View_dataAttributes_anon = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  var t1 = $.HashMapImplementation$();
  this.this_0.set$_lib7_dataAttrs(t1);
  return t1;
}
};

$$.Matrix_operator$add_anon = {"":
 ["this_1", "m_0"],
 super: "Closure",
 call$1: function(i) {
  return $.add($.index(this.this_1.get$_en(), i), $.index(this.m_0.get$_en(), i));
}
};

$$.Matrix_operator$sub_anon = {"":
 ["this_1", "m_0"],
 super: "Closure",
 call$1: function(i) {
  return $.sub($.index(this.this_1.get$_en(), i), $.index(this.m_0.get$_en(), i));
}
};

$$.Matrix_operator$mul_anon = {"":
 ["this_1", "scalar_0"],
 super: "Closure",
 call$1: function(i) {
  return $.mul($.index(this.this_1.get$_en(), i), this.scalar_0);
}
};

$$.Matrix_operator$div_anon = {"":
 ["this_1", "scalar_0"],
 super: "Closure",
 call$1: function(i) {
  return $.div($.index(this.this_1.get$_en(), i), this.scalar_0);
}
};

$$.Activity__onTouchStart_anon = {"":
 [],
 super: "Closure",
 call$1: function(event$) {
  $.broadcaster().sendEvent$1($.PopupEvent$(event$.get$target(), 'popup'));
}
};

$$._BroadcastListeners_add_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return [];
}
};

$$.Activity__onResize_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$1: function(event$) {
  var cur = $.DOMQuery_DOMQuery($.window()).get$innerSize();
  if (!$.eqB(this.box_0.old_1.get$width(), cur.get$width()) || $.ltB(this.box_0.old_1.get$height(), cur.get$height())) {
    this.box_0.old_1 = cur;
    this.this_2.updateSize$0();
  }
}
};

$$.Activity__onResize_anon0 = {"":
 ["this_3"],
 super: "Closure",
 call$1: function(event$) {
  this.this_3.updateSize$0();
}
};

$$.View__addToDoc_anon = {"":
 ["this_1", "location_0"],
 super: "Closure",
 call$0: function() {
  var n = this.this_1.get$node();
  var pn = n.get$parent();
  if (!(pn == null)) {
    if ($.eqB(pn.get$offsetParent(), n.get$offsetParent())) {
      var x = pn.get$$$dom_offsetLeft();
      var y = pn.get$$$dom_offsetTop();
    } else {
      y = 0;
      x = 0;
    }
    this.this_1.locateTo$3$x$y(this.location_0, x, y);
  }
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  $._TimerFactory__factory = $._timerFactory;
  return;
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_5.get$isComplete() !== true)
    this.completer_3.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_8.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
}
};

$$.FutureImpl_transform_anon = {"":
 ["this_1", "completer_0"],
 super: "Closure",
 call$1: function(e) {
  this.completer_0.completeException$2(e, this.this_1.get$stackTrace());
  return true;
}
};

$$.FutureImpl_transform_anon0 = {"":
 ["completer_3", "transformation_2"],
 super: "Closure",
 call$1: function(v) {
  var transformed = null;
  try {
    transformed = this.transformation_2.call$1(v);
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var ex = t1;
    var stackTrace = $.getTraceFromException(exception);
    this.completer_3.completeException$2(ex, stackTrace);
    return;
  }

  this.completer_3.complete$1(transformed);
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = {};
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_4.get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_10, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon2 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon3 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$0: function() { return this.self[this.target](); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$6: function(p0, p1, p2, p3, p4, p5) { return this.self[this.target](p0, p1, p2, p3, p4, p5); }
};
$$.BoundClosure2 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$3: function(p0, p1, p2) { return this.self[this.target](p0, p1, p2); }
};
$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$._ViewEvents$ = function(ptr) {
  return new $._ViewEvents(ptr, $.makeLiteralMap([]));
};

$.floor = function(receiver) {
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._convertNativeToDart_AcceptStructuredClone = function(object) {
  var values = [];
  var copies = [];
  return new $._convertNativeToDart_AcceptStructuredClone_walk(new $._convertNativeToDart_AcceptStructuredClone_findSlot(copies, values), new $._convertNativeToDart_AcceptStructuredClone_readSlot(copies), new $._convertNativeToDart_AcceptStructuredClone_writeSlot(copies)).call$1(object);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.DOMQuery$_init = function(node) {
  return new $.DOMQuery(node);
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.Token$fromChar = function(c, index) {
  var t1 = $.add(index, 1);
  return new $.Token($.Token_getTypeFromChar(c), index, t1);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_pattern, _errmsg);
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$.Matrix__generate = function(rs, cs, f) {
  var size = $.mul(rs, cs);
  if (typeof size !== 'number')
    return $.Matrix__generate$bailout(1, rs, cs, f, size);
  var m = $.Matrix$(rs, cs, null);
  for (var t1 = m._en, i = 0; i < size; ++i) {
    var t2 = f.call$1(i);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  return m;
};

$.SelectorParseException$unexpectedToken = function(source, token) {
  return new $.SelectorParseException(source, token, token.get$start());
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$.removeRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0))
    return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = receiver.length;
  if (start < 0 || start >= receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength)
    throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.JSSyntaxRegExp$ = function(pattern, multiLine, ignoreCase) {
  return new $.JSSyntaxRegExp(ignoreCase, multiLine, pattern);
};

$._Size$from = function(other) {
  return new $._Size(other.get$width(), other.get$height());
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.Selectors__isLiteral = function(c) {
  if (!($.gtB(c, 96) && $.ltB(c, 123)))
    if (!($.gtB(c, 64) && $.ltB(c, 91)))
      var t1 = $.gtB(c, 47) && $.ltB(c, 58) || $.eqB(c, 95) || $.eqB(c, 45);
    else
      t1 = true;
  else
    t1 = true;
  return t1;
};

$.LinearLayout__getRealLayout = function(view) {
  return !$.eqB(view.get$layout().get$orient(), 'vertical') ? $._HLayout$() : $._VLayout$();
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$._ViewImpl_addToIdSpaceDown = function(view, space) {
  var id = view.get$id();
  var t1 = $.get$length(id);
  if (typeof t1 !== 'number')
    return $._ViewImpl_addToIdSpaceDown$bailout(1, view, space, id, t1);
  if (t1 > 0)
    space.bindFellow_$2(id, view);
  if (!(typeof view === 'object' && view !== null && !!view.is$IdSpace)) {
    var vs = view.get$_virtIS();
    if (!(vs == null)) {
      view.set$_virtIS(null);
      for (t1 = $.iterator(vs.get$fellows()); t1.hasNext$0() === true;) {
        var t2 = t1.next$0();
        space.bindFellow_$2(t2.get$id(), t2);
      }
    } else
      for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling())
        $._ViewImpl_addToIdSpaceDown(view, space);
  }
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(_start, str, pattern);
};

$.StringUtil_encodeXML = function(txt, multiline, maxlength, pre) {
  if (typeof txt !== 'string' && (typeof txt !== 'object' || txt === null || txt.constructor !== Array && !txt.is$JavaScriptIndexingBehavior()))
    return $.StringUtil_encodeXML$bailout(1, txt, multiline, maxlength, pre, 0, 0, 0, 0);
  var tl = txt.length;
  multiline = pre || multiline;
  var t1 = !multiline;
  if (t1 && maxlength > 0 && tl > maxlength) {
    var j = maxlength;
    while (true) {
      if (j > 0) {
        t1 = j - 1;
        if (t1 < 0 || t1 >= txt.length)
          throw $.ioore(t1);
        var t2 = $.StringUtil_isChar(txt[t1], false, false, false, true, null);
        t1 = t2;
      } else
        t1 = false;
      if (!t1)
        break;
      --j;
    }
    return $.StringUtil_encodeXML($.S($.substring$2(txt, 0, j)) + '...', multiline, 0, pre);
  }
  var out = $.StringBufferImpl$('');
  if (multiline || pre)
    for (var enc = null, j = 0, k = 0; j < tl; ++j) {
      if (j < 0 || j >= txt.length)
        throw $.ioore(j);
      var cc = txt[j];
      if (typeof cc !== 'string')
        return $.StringUtil_encodeXML$bailout(2, txt, pre, out, cc, j, multiline, k, tl);
      enc = $.CTC68.operator$index$1(cc);
      if (!(enc == null)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
        var k0 = j + 1;
        k = k0;
      } else if (multiline && cc === '\n') {
        $.add$1(out.add$1($.substring$2(txt, k, j)), '<br/>\n');
        k0 = j + 1;
        k = k0;
      } else {
        if (pre)
          t1 = cc === ' ' || cc === '\x09';
        else
          t1 = false;
        if (t1) {
          $.add$1(out.add$1($.substring$2(txt, k, j)), '&nbsp;');
          if (cc === '\x09')
            out.add$1('&nbsp;&nbsp;&nbsp;');
          k = j + 1;
        }
      }
    }
  else
    for (enc = null, j = 0, k = 0; j < tl; ++j) {
      if (j < 0 || j >= txt.length)
        throw $.ioore(j);
      enc = $.CTC68.operator$index$1(txt[j]);
      if (!(enc == null)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
        k0 = j + 1;
        k = k0;
      }
    }
  if (k === 0)
    return txt;
  if (k < tl)
    out.add$1($.substring$1(txt, k));
  return out.toString$0();
};

$.ViewMatchContext$root = function(view, selectors) {
  var t1 = new $.ViewMatchContext(null, view, 0, $.ViewMatchContext__initBoolList(selectors));
  t1.ViewMatchContext$root$2(view, selectors);
  return t1;
};

$.ViewIterable$ = function(_root, _selector) {
  return new $.ViewIterable(_root, _selector);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$._DataAttributeMap$ = function($$dom_attributes) {
  return new $._DataAttributeMap($$dom_attributes);
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$.application = function() {
  if ($._app == null)
    $._app = $.Application$('');
  return $._app;
};

$.DOMQuery_DOMQuery = function(v) {
  if (typeof v === 'object' && v !== null && !!v.is$View) {
    var v0 = v.get$node();
    v = v0;
  } else if (typeof v === 'string')
    v = $.document().query$1(v);
  if (typeof v === 'object' && v !== null && v.is$Window())
    var t1 = $._WindowQuery$(v);
  else
    t1 = !(v == null) ? $.DOMQuery$_init(v) : $._NullQuery$();
  return t1;
};

$.parseInt = function(str) {
  $.checkString(str);
  if (!/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))
    throw $.captureStackTrace($.FormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2))
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  else
    t1 = false;
  if (!t1)
    if ($.gtB($.get$length(trimmed), 3))
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    else
      t1 = false;
  else
    t1 = true;
  var base = t1 ? 16 : 10;
  var ret = parseInt(trimmed, base);
  if ($.isNaN(ret) === true)
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.ViewMatchContext_computeViewChildIndex = function(view) {
  for (var index = -1; !(view == null);) {
    view = view.get$previousSibling();
    ++index;
  }
  return index;
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$._convertNativeToDart_IDBKey = function(nativeKey) {
  if (new $._convertNativeToDart_IDBKey_containsDate().call$1(nativeKey) === true)
    throw $.captureStackTrace($.CTC17);
  return nativeKey;
};

$.Selector$ = function(selectorIndex) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'SimpleSelectorSequence'});
  return new $.Selector(selectorIndex, t1);
};

$.MapDemo$ = function() {
  var t1 = new $.MapDemo('', null, [], null, true);
  t1.Activity$0();
  return t1;
};

$.StringUtil__init = function() {
  if ($.StringUtil__CC_0 == null) {
    $.StringUtil__CC_0 = $.charCodeAt('0', 0);
    $.StringUtil__CC_9 = $.add($.StringUtil__CC_0, 9);
    $.StringUtil__CC_A = $.charCodeAt('A', 0);
    $.StringUtil__CC_Z = $.add($.StringUtil__CC_A, 25);
    $.StringUtil__CC_a = $.charCodeAt('a', 0);
    $.StringUtil__CC_z = $.add($.StringUtil__CC_a, 25);
  }
};

$._TouchDragGesture$ = function(owner, start, move, end) {
  var t1 = new $._TouchDragGesture(null, null, null, owner, start, move, end, null, false);
  t1._DragGesture$_init$4(owner, start, move, end);
  return t1;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$._ViewImpl_getDOMEventDispatcher = function(type) {
  if ($._ViewImpl__domEvtDisps == null) {
    $._ViewImpl__domEvtDisps = $.makeLiteralMap([]);
    for (var t1 = $.iterator($.CTC62); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      $.indexSet($._ViewImpl__domEvtDisps, t2, $._ViewImpl__domEvtDisp(t2));
    }
  }
  return $.index($._ViewImpl__domEvtDisps, type);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  return name$;
};

$.callTypeCast = function(value, property) {
  if (!(value == null))
    var t1 = typeof value === "object" && value[property]();
  else
    t1 = true;
  if (t1)
    return value;
  $.propertyTypeCastError(value, property);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  return receiver.split(pattern);
};

$.LayoutEvent$ = function(context, type, target) {
  var t1 = new $.LayoutEvent(context, null, type, $.DateImplementation$now().millisecondsSinceEpoch, null, false, false, null, null);
  t1.ViewEvent$6(type, target, null, null, null, null);
  return t1;
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC1);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMinutes() : $.Primitives_lazyAsJsDate(receiver).getMinutes();
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.ViewMatchContext$ = function(view) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'List<bool>'});
  t1 = new $.ViewMatchContext(null, view, 0, t1);
  t1.ViewMatchContext$1(view);
  return t1;
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(false, null);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
};

$.window = function() {
return window;
};

$._MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $._MatchImplementation(pattern, str, _start, _end, _groups);
};

$._DocumentFragmentFactoryProvider_DocumentFragment = function() {
  return $.document().createDocumentFragment$0();
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.isNegative = function(receiver) {
  return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$.ViewIterator__getCommonSeqLength = function(list) {
  for (var t1 = $.iterator(list), strs = null, max = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (strs == null) {
      strs = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(strs, {E: 'String'});
      for (var t3 = $.iterator(t2.get$seqs()); t3.hasNext$0() === true;) {
        t2 = t3.next$0();
        var id = t2.get$id();
        if (!(id == null) && $.isEmpty(id) !== true) {
          strs.push($.toString(t2));
          strs.push(t2.printCombinator$0());
        } else
          break;
      }
      max = strs.length;
    } else {
      for (var t3 = $.iterator(t2.get$seqs()), i = 0; t3.hasNext$0() === true;) {
        t2 = t3.next$0();
        id = t2.get$id();
        if (!(i >= max))
          if (!(id == null))
            if ($.isEmpty(id) !== true) {
              var i0 = i + 1;
              if ($.eqB($.index(strs, i), $.toString(t2))) {
                i = i0 + 1;
                var t4 = !$.eqB($.index(strs, i0), t2.printCombinator$0());
                t2 = t4;
              } else {
                i = i0;
                t2 = true;
              }
            } else
              t2 = true;
          else
            t2 = true;
        else
          t2 = true;
        if (t2)
          break;
      }
      i0 = i - 1;
      if (i < max)
        max = i0;
    }
  }
  return $.toInt((max + 1) / 2);
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(_list, 0);
};

$.ViewIterator$ = function(_root, selector) {
  var t1 = new $.ViewIterator(_root, $.Selectors_parse(selector), null, null, null, null, false, null, -1);
  t1.ViewIterator$2(_root, selector);
  return t1;
};

$.Transformation$clone = function(t) {
  var t1 = [t._lib3_get$2(0, 0), t._lib3_get$2(0, 1), t._lib3_get$2(0, 2), t._lib3_get$2(1, 0), t._lib3_get$2(1, 1), t._lib3_get$2(1, 2), 0, 0, 1];
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, {E: 'MatrixRow'});
  var t3 = $.ListFactory_List(9);
  $.setRuntimeTypeInfo(t3, {E: 'num'});
  t3 = new $.Transformation(3, 3, t2, t3);
  t3.Matrix$3(3, 3, t1);
  return t3;
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(isolate, fn, message);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.Transformation$identity = function() {
  var t1 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, {E: 'MatrixRow'});
  var t3 = $.ListFactory_List(9);
  $.setRuntimeTypeInfo(t3, {E: 'num'});
  t3 = new $.Transformation(3, 3, t2, t3);
  t3.Matrix$3(3, 3, t1);
  return t3;
};

$.Browser__versionOf = function(version, separator) {
  var j = $.indexOf$1(version, separator);
  if ($.geB(j, 0)) {
    var j0 = $.indexOf$2(version, separator, $.add(j, 1));
    if ($.geB(j0, 0))
      version = $.substring$2(version, 0, j0);
  }
  try {
    return $.parseDouble(version);
  } catch (exception) {
    $.unwrapException(exception);
    return 1.0;
  }

};

$.MeasureContext$ = function() {
  return new $.MeasureContext($.HashMapImplementation$(), $.HashMapImplementation$(), $.HashMapImplementation$(), null);
};

$.View$ = function() {
  var t1 = new $.View('', null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, null, null, null, null, true, false);
  t1.View$0();
  return t1;
};

$._anchorWidth = function(anchor, view) {
  var t1 = view.get$parent();
  return (anchor == null ? t1 == null : anchor === t1) ? anchor.get$innerWidth() : anchor.get$outerWidth();
};

$.Matrix$ = function(rows, columns, entries) {
  var t1 = $.ListFactory_List(rows);
  $.setRuntimeTypeInfo(t1, {E: 'MatrixRow'});
  var t2 = $.ListFactory_List($.mul(rows, columns));
  $.setRuntimeTypeInfo(t2, {E: 'num'});
  t2 = new $.Matrix(rows, columns, t1, t2);
  t2.Matrix$3(rows, columns, entries);
  return t2;
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(true, null);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$._visiCtrl = function() {
  if ($._$visiCtrl == null)
    $._$visiCtrl = $.browser.get$msie() === true ? $._IEVisiCtrl$() : $._VisiCtrl$();
  return $._$visiCtrl;
};

$.Primitives_getYear = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCFullYear() : $.Primitives_lazyAsJsDate(receiver).getFullYear();
};

$._Manager$ = function() {
  var t1 = new $._Manager(0, 0, 1, null, null, null, null, null, null, null, null, null);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'E'});
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true;)
    result.push(iterator.next$0());
  return result;
};

$.main = function() {
  $.MapDemo$().run$0();
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(set_.get$_backingMap().get$_keys(), -1);
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ViewMatchContext_matchClasses = function(view, classes) {
  if (classes == null || $.isEmpty(classes) === true)
    return true;
  for (var t1 = $.iterator(classes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if ($.contains$1(view.get$classes(), t2) !== true)
      return false;
  }
  return true;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator($.JSSyntaxRegExp__globalVersionOf(re), _str, null, false);
};

$.propertyTypeCastError = function(value, property) {
  throw $.captureStackTrace($.CastException$($.Primitives_objectTypeName(value), $.substring$2(property, 3, $.get$length(property))));
};

$.FutureImpl$ = function() {
  return new $.FutureImpl(false, null, null, null, false, [], [], []);
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isInfinite = function(receiver) {
  return receiver == Infinity || receiver == -Infinity;
};

$._VLayout$ = function() {
  return new $._VLayout();
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'Match'});
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$.ViewMatchContext$child = function(view, parent$) {
  return new $.ViewMatchContext(parent$, view, 0, $.ViewMatchContext__initBoolListFromParent(parent$));
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.Section$ = function() {
  var t1 = new $.Section(null, '', null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, null, null, null, null, true, false);
  t1.View$0();
  t1.Section$0();
  return t1;
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element, element.get$$$dom_children());
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds() : $.Primitives_lazyAsJsDate(receiver).getMilliseconds();
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(0, list);
};

$._DocumentFragmentFactoryProvider_DocumentFragment$html = function(html) {
  var fragment = $._DocumentFragmentFactoryProvider_DocumentFragment();
  fragment.set$innerHTML(html);
  return fragment;
};

$.Activity__onTouchStart = function() {
  return new $.Activity__onTouchStart_anon();
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.TileLayout$ = function() {
  return new $.TileLayout();
};

$.CSS_intOf = function(value, reportError) {
  try {
    var t1 = value;
    if (!(t1 == null) && $.isEmpty(t1) !== true) {
      var m = $.CTC24.firstMatch$1(value);
      t1 = m;
      if (!(t1 == null))
        return $.parseInt(t1.group$1(0));
    }
  } catch (exception) {
    t1 = $.unwrapException(exception);
    var e = t1;
    t1 = reportError;
    if (!(t1 == null) && t1 === true)
      throw $.captureStackTrace(e);
  }

  return 0;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.ViewEvent$ = function(type, target, pageX, pageY, offsetX, offsetY) {
  var t1 = new $.ViewEvent(null, type, $.DateImplementation$now().millisecondsSinceEpoch, null, false, false, null, null);
  t1.ViewEvent$6(type, target, pageX, pageY, offsetX, offsetY);
  return t1;
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._Size$ = function(width, height) {
  return new $._Size(width, height);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.ViewIterator_isGeneralSibling = function(c1, c2) {
  for (; !(c1 == null);) {
    if ($.eqB(c1, c2))
      return true;
    c1 = c1.get$previousSibling();
  }
  return false;
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$._DragGestureState$ = function(gesture, position, time) {
  return new $._DragGestureState(gesture, $.VelocityProvider$(position, time), position, time, position, time, null);
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.Primitives_getSeconds = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCSeconds() : $.Primitives_lazyAsJsDate(receiver).getSeconds();
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._ViewImpl_checkIdSpaces = function(view, newId) {
  var space = view.get$spaceOwner();
  if (!(space.getFellow$1(newId) == null))
    throw $.captureStackTrace($.UIException$('Not unique in the ID space of ' + $.S(space) + ': ' + $.S(newId)));
  if (!!view.is$IdSpace) {
    var parent$ = view.get$parent();
    var t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  if (t1) {
    space = parent$.get$spaceOwner();
    if (!(space.getFellow$1(newId) == null))
      throw $.captureStackTrace($.UIException$('Not unique in the ID space of ' + $.S(space) + ': ' + $.S(newId)));
  }
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCHours() : $.Primitives_lazyAsJsDate(receiver).getHours();
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$._Broadcaster$ = function() {
  var t1 = new $._Broadcaster(null, null);
  t1._Broadcaster$0();
  return t1;
};

$._globalState = function() {
return $globalState;
};

$._globalState0 = function(val) {
$globalState = val;
};

$.CSS_px = function(val) {
  return !(val == null) ? $.S(val) + 'px' : '';
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.ViewMatchContext_matchType = function(view, type) {
  return type == null || $.eqB(type, view.get$className());
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$._MediaStreamTrackListEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackListEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.toInt$0();
  if ($.isNaN(receiver) === true)
    throw $.captureStackTrace($.FormatException$('NaN'));
  if ($.isInfinite(receiver) === true)
    throw $.captureStackTrace($.FormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return truncated == -0.0 ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: '_IsolateEvent'});
  return new $._EventLoop(t1);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(key, value);
};

$._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration$css = function(css) {
  var style = $._ElementFactoryProvider_Element$tag('div').get$style();
  style.set$cssText(css);
  return style;
};

$._EventListenerInfo$ = function(_owner) {
  var t1 = new $._EventListenerInfo(_owner, null, null, null);
  t1._EventListenerInfo$1(_owner);
  return t1;
};

$._VisiCtrl$ = function() {
  return new $._VisiCtrl();
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$._NullQuery$ = function() {
  return new $._NullQuery(null);
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC79)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Browser$ = function() {
  var t1 = new $.Browser(null, null, false, false, false, false, false, false, false, false, false, null, null, null, null);
  t1.Browser$0();
  return t1;
};

$._LinearUtil_getLayoutAmountInfo = function(view, value) {
  var amt = $.LayoutAmountInfo$(value);
  if ($.eqB(amt.type, $.CTC21) && $.layoutManager.getLayoutOfView$1(view).isFlex$0() === true) {
    amt.type = $.CTC19;
    amt.value = 1;
  }
  return amt;
};

$.broadcaster = function() {
  if ($._broadcaster == null)
    $._broadcaster = $._Broadcaster$();
  return $._broadcaster;
};

$.ListUtil_rangeCheck = function(a, start, length$) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('negative length ' + $.S(length$)));
  if ($.ltB(start, 0) || $.geB(start, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if ($.gtB($.add(start, length$), $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$($.add(start, length$)));
};

$._MatrixRow$ = function(_m, _r) {
  return new $._MatrixRow(_m, _r);
};

$.AnchorRelation$ = function(view) {
  var t1 = new $.AnchorRelation($.ListFactory_List(null), $.HashMapImplementation$(), view);
  t1.AnchorRelation$1(view);
  return t1;
};

$.ViewMatchContext__initBoolListFromParent = function(parent$) {
  var plist = parent$.get$_qualified();
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'List<bool>'});
  for (var t1 = $.iterator(plist), sublist = null; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    sublist = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(sublist, {E: 'bool'});
    list.push(sublist);
    for (var i = 0; $.ltB(i, $.get$length(t2)); ++i)
      sublist.push(false);
  }
  return list;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.MeasureContext__minMax = function(v, vmin, vmax) {
  if ($.isEmpty(vmin) !== true) {
    var w = $.CSS_intOf(vmin, null);
    if ($.ltB(v, w))
      v = w;
  }
  if ($.isEmpty(vmax) !== true) {
    w = $.CSS_intOf(vmax, null);
    if (w > 0 && $.gtB(v, w))
      v = w;
  }
  return v;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.trim$0();
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_lib2_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.Token_getTypeFromChar = function(c) {
  var code = $.charCodeAt(c, 0);
  if ($.Token_isLiteral(code))
    return 1;
  if ($.Token_isWhitespace(code))
    return 3;
  switch (c) {
    case '*':
      return 2;
    case ',':
      return 5;
    case '>':
      return 7;
    case '+':
      return 8;
    case '~':
      return 9;
    case '#':
      return 10;
    case '.':
      return 11;
    case ':':
      return 12;
    case '=':
      return 13;
    case '\'':
      return 17;
    case '"':
      return 18;
    case '[':
      return 19;
    case ']':
      return 20;
    case '(':
      return 21;
    case ')':
      return 22;
    default:
      return -1;
  }
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1)
    return w;
  else
    return $._DOMWindowCrossFrameImpl$(w);
};

$.LayoutAmountInfo$ = function(profile) {
  var t1 = new $.LayoutAmountInfo(null, null);
  t1.LayoutAmountInfo$1(profile);
  return t1;
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC2;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._ViewImpl_addToIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0))
    return;
  if (!skipFirst)
    view.get$spaceOwner().bindFellow_$2(id, view);
  if (typeof view === 'object' && view !== null && !!view.is$IdSpace) {
    var parent$ = view.get$parent();
    var t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  if (t1)
    parent$.get$spaceOwner().bindFellow_$2(id, view);
};

$.SimpleSelectorSequence$ = function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  var t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, {E: 'Attribute'});
  var t3 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t3, {E: 'PseudoClass'});
  return new $.SimpleSelectorSequence(null, null, t1, t2, t3, 0);
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.Strings_join = function(strings, separator) {
  return $.StringBase_join(strings, separator);
};

$.StringBase_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), separator);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$._SubviewList$ = function(_owner) {
  return new $._SubviewList(_owner);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
return document;
};

$.LayoutSideInfo$ = function(profile, defaultValue, defaultInfo) {
  var t1 = new $.LayoutSideInfo(null, null, null, null);
  t1.LayoutSideInfo$3(profile, defaultValue, defaultInfo);
  return t1;
};

$._FileWriterEventsImpl$ = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$._HttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._HttpRequestUploadEventsImpl(_ptr);
};

$.ViewConfig$ = function() {
  var t1 = new $.ViewConfig('v-', 'v_');
  t1.ViewConfig$0();
  return t1;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$ = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.FreeLayout$ = function() {
  return new $.FreeLayout();
};

$._anchorHeight = function(anchor, view) {
  var t1 = view.get$parent();
  return (anchor == null ? t1 == null : anchor === t1) ? anchor.get$innerHeight() : anchor.get$outerHeight();
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$._isJavaScriptSimpleObject = function(value) {
  return Object.getPrototypeOf(value) === Object.prototype;
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$._LocationWrapper$ = function(_ptr) {
  return new $._LocationWrapper(_ptr);
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$._BroadcastEvents$ = function(ptr) {
  return new $._BroadcastEvents(ptr, $.makeLiteralMap([]));
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation($.Primitives_dateNow(), false);
  t1.DateImplementation$now$0();
  return t1;
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.Token_isWhitespace = function(c) {
  return $.eqB(c, 32) || $.eqB(c, 9) || $.eqB(c, 10) || $.eqB(c, 13);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.Transformation$ = function(m00, m01, m02, m10, m11, m12) {
  var t1 = [m00, m01, m02, m10, m11, m12, 0, 0, 1];
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, {E: 'MatrixRow'});
  var t3 = $.ListFactory_List(9);
  $.setRuntimeTypeInfo(t3, {E: 'num'});
  t3 = new $.Transformation(3, 3, t2, t3);
  t3.Matrix$3(3, 3, t1);
  return t3;
};

$.ViewIterator_checkIdSpace = function(selector, index, ctx) {
  if (selector.requiresIdSpace$1(index) === true) {
    var t1 = ctx.get$view();
    var t2 = !(typeof t1 === 'object' && t1 !== null && !!t1.is$IdSpace);
    t1 = t2;
  } else
    t1 = true;
  return t1;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.Image$ = function(src) {
  var t1 = new $.Image(null, '', null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, null, null, null, null, true, false);
  t1.View$0();
  t1.Image$1(src);
  return t1;
};

$.SelectorParseException$unexpectedEnding = function(source) {
  return new $.SelectorParseException(source, null, -1);
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return a;
      if (a < b)
        return b;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return a + b;
        if ($.isNaN(b) === true)
          return b;
        return a;
      }
      if (b === 0 && $.isNegative(a) === true)
        return b;
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$._VirtualIdSpace$ = function(_owner) {
  return new $._VirtualIdSpace(_owner, $.makeLiteralMap([]));
};

$.sqrt = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.MeasureContext__amountOf = function(profile, parentInner) {
  var ai = $.LayoutAmountInfo$(profile);
  switch (ai.type) {
    case $.CTC18:
      return ai.value;
    case $.CTC19:
      return parentInner.call$0();
    case $.CTC20:
      return $.toInt($.round($.mul(parentInner.call$0(), ai.value)));
  }
  return;
};

$.CSS_name = function(propertyName) {
  if ($.CSS__nsnms == null) {
    $.CSS__nsnms = $.HashSetImplementation$();
    if (!($.browser.get$ios() === true && $.ltB($.browser.get$iosVersion(), 5)))
      var t1 = $.browser.get$android() === true && $.ltB($.browser.get$androidVersion(), 2.4) || $.browser.get$firefox() === true;
    else
      t1 = true;
    if (t1)
      $.add$1($.CSS__nsnms, 'box-sizing');
    for (t1 = $.iterator($.CTC76); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      $.add$1($.CSS__nsnms, t2);
    }
  }
  return $.contains$1($.CSS__nsnms, propertyName) === true ? $.S($.CSS_prefix) + $.S(propertyName) : propertyName;
};

$._DOMApplicationCacheEventsImpl$ = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration = function() {
  return $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration$css('');
};

$.AnchorRelation__getHandlers = function(loc) {
  if ($.isEmpty(loc) === true)
    loc = 'top left';
  var handlers = $.CTC50.operator$index$1(loc);
  if (!(handlers == null))
    return handlers;
  var j = $.indexOf$1(loc, ' ');
  if ($.gtB(j, 0)) {
    handlers = $.CTC50.operator$index$1($.S($.substring$1(loc, $.add(j, 1))) + ' ' + $.S($.substring$2(loc, 0, j)));
    if (!(handlers == null))
      return handlers;
  }
  throw $.captureStackTrace($.UIException$('Unknown loation ' + $.S(loc)));
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._DOMWindowCrossFrameImpl__close = function(win) {
win.close()
};

$.JSSyntaxRegExp__globalVersionOf = function(other) {
  var re = $.JSSyntaxRegExp$(other.get$pattern(), other.get$multiLine(), other.get$ignoreCase());
  $.regExpAttachGlobalNative(re);
  return re;
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$._ViewImpl_removeFromIdSpaceDown = function(view, space) {
  var id = view.get$id();
  var t1 = $.get$length(id);
  if (typeof t1 !== 'number')
    return $._ViewImpl_removeFromIdSpaceDown$bailout(1, view, space, id, t1);
  if (t1 > 0)
    space.bindFellow_$2(id, null);
  if (!(typeof view === 'object' && view !== null && !!view.is$IdSpace))
    for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling())
      $._ViewImpl_removeFromIdSpaceDown(view, space);
};

$._ViewImpl_link = function(view, child, beforeChild) {
  var ci = view._initChildInfo$0();
  if (beforeChild == null) {
    var p = ci.get$lastChild();
    if (!(p == null)) {
      p.set$_nextSibling(child);
      child.set$_prevSibling(p);
      ci.set$lastChild(child);
    } else {
      ci.set$lastChild(child);
      ci.set$firstChild(child);
    }
  } else {
    p = beforeChild.get$_prevSibling();
    if (!(p == null)) {
      child.set$_prevSibling(p);
      p.set$_nextSibling(child);
    } else
      ci.set$firstChild(child);
    beforeChild.set$_prevSibling(child);
    child.set$_nextSibling(beforeChild);
  }
  child.set$_lib7_parent(view);
  var t1 = view._childInfo;
  t1.set$nChild($.add(t1.get$nChild(), 1));
  if (typeof child === 'object' && child !== null && !!child.is$IdSpace)
    $._ViewImpl_addToIdSpace(child, true);
  else
    $._ViewImpl_addToIdSpaceDown(child, child.get$spaceOwner());
};

$.CastException$ = function(actualType, expectedType) {
  return new $.CastException(actualType, expectedType);
};

$.Primitives_getDay = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCDate() : $.Primitives_lazyAsJsDate(receiver).getDate();
};

$._EventsImpl$ = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$._IDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$._ViewEventListenerList$ = function(_ptr, _type) {
  return new $._ViewEventListenerList(_ptr, _type);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$._MediaStreamTrackEventsImpl$ = function(_ptr) {
  return new $._MediaStreamTrackEventsImpl(_ptr);
};

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$.Application$ = function(name$) {
  var t1 = new $.Application(null, false, null, null);
  t1.Application$1(name$);
  return t1;
};

$.regExpExec = function(regExp, str) {
  var result = $.regExpGetNative(regExp).exec(str);
  if (result === null)
    return;
  return result;
};

$._LocationWrapper__toString = function(p) {
return p.toString();
};

$.Primitives_getMonth = function(receiver) {
  return receiver.isUtc === true ? $.Primitives_lazyAsJsDate(receiver).getUTCMonth() + 1 : $.Primitives_lazyAsJsDate(receiver).getMonth() + 1;
};

$.Selectors__isWhitespace = function(c) {
  return $.eqB(c, 32) || $.eqB(c, 9) || $.eqB(c, 10) || $.eqB(c, 13);
};

$.ViewIterator__isAllIds = function(list, offset) {
  if (typeof offset !== 'number')
    return $.ViewIterator__isAllIds$bailout(1, list, offset);
  for (var t1 = $.iterator(list); t1.hasNext$0() === true;)
    if ($.gtB($.get$length(t1.next$0().get$seqs()), offset))
      return false;
  return true;
};

$._WindowQuery$ = function(v) {
  return new $._WindowQuery(v);
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.LinearLayout$ = function() {
  return new $.LinearLayout();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.VelocityProvider$ = function(position, time) {
  var t1 = new $.VelocityProvider(position, null, time);
  t1.VelocityProvider$2(position, time);
  return t1;
};

$._ViewImpl_spaceOwner = function(view) {
  var p = view;
  var top$ = null;
  do {
    if (typeof p === 'object' && p !== null && !!p.is$IdSpace)
      return p;
    top$ = p;
  } while (p = p.get$parent(), !(p == null));
  if (top$.get$_virtIS() == null)
    top$.set$_virtIS($._VirtualIdSpace$(top$));
  return top$.get$_virtIS();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$._DragGesture__DragGesture = function(owner, start, move, end) {
  return $.browser.get$touch() === true ? $._TouchDragGesture$(owner, start, move, end) : $._MouseDragGesture$(owner, start, move, end);
};

$._ZoomGestureState$ = function(gesture, pos0, pos1, time) {
  var t1 = new $._ZoomGestureState(gesture, pos0, pos1, $.div($.add(pos0, pos1), 2), $.sub(pos1, pos0), null, null, time, null, pos0, pos1, time);
  t1._ZoomGestureState$4(gesture, pos0, pos1, time);
  return t1;
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$._ZoomGesture$ = function(owner, start, move, end) {
  var t1 = new $._ZoomGesture(start, move, end, null, null, null, null, false, owner);
  t1._ZoomGesture$4(owner, start, move, end);
  return t1;
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.AnchorRelation_locate = function(view, location$, anchor, x, y) {
  if (!(anchor == null)) {
    var handlers = $.AnchorRelation__getHandlers(location$);
    if ($.eqB(view.get$style().get$position(), 'fixed'))
      var offset = anchor.get$pageOffset();
    else {
      var t1 = view.get$parent();
      if (anchor == null ? t1 == null : anchor === t1) {
        t1 = $._Offset$(0, 0);
        offset = t1;
      } else {
        t1 = anchor.get$parent();
        var t2 = view.get$parent();
        t1 = (t1 == null ? t2 == null : t1 === t2) ? $._Offset$(anchor.get$left(), anchor.get$top()) : $.sub(anchor.get$pageOffset(), view.get$pageOffset());
        offset = t1;
      }
    }
    $.index($._anchorXHandlers(), $.index(handlers, 0)).call$3(offset.get$left(), anchor, view);
    $.index($._anchorYHandlers(), $.index(handlers, 1)).call$3(offset.get$top(), anchor, view);
  } else if (location$ == null || $.isEmpty(location$) === true) {
    view.set$left(x);
    view.set$top(y);
  } else {
    handlers = $.AnchorRelation__getHandlers(location$);
    $.index($._anchorXHandlers(), $.index(handlers, 0)).call$3(x, $.CTC27, view);
    $.index($._anchorYHandlers(), $.index(handlers, 1)).call$3(y, $.CTC27, view);
  }
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0))
    receiver.date = new Date(receiver.millisecondsSinceEpoch);
  return receiver.date;
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.ViewEvent$dom = function(domEvent, type, target) {
  var t1 = !(type == null) ? type : domEvent.get$type();
  t1 = new $.ViewEvent(domEvent, t1, domEvent.get$timeStamp(), null, false, false, null, null);
  t1.ViewEvent$dom$3(domEvent, type, target);
  return t1;
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b);
};

$.ViewIterator_isDescendant = function(c1, c2) {
  if ($.eqB(c1, c2))
    return true;
  for (; c1 = c1.get$parent(), !(c1 == null);) {
    if ($.eqB(c1, c2))
      return true;
    if (typeof c1 === 'object' && c1 !== null && !!c1.is$IdSpace)
      return $.eq(c1, c2);
  }
  return false;
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._Offset3d$ = function(x, y, z) {
  return new $._Offset3d(z, x, y);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.CSS_transform = function(t) {
  return 'matrix(' + $.S($.index($.index(t, 0), 0)) + ', ' + $.S($.index($.index(t, 1), 0)) + ', ' + $.S($.index($.index(t, 0), 1)) + ', ' + $.S($.index($.index(t, 1), 1)) + ', ' + $.S($.index($.index(t, 0), 2)) + ', ' + $.S($.index($.index(t, 1), 2)) + ')';
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.RunOnceQueue$ = function() {
  return new $.RunOnceQueue(null);
};

$.AnchorRelation__layoutRoot = function(mctx, root) {
  var anchor = root.get$profile().get$anchorView();
  mctx.setWidthByProfile$2(root, new $.AnchorRelation__layoutRoot_anon(root, anchor));
  mctx.setHeightByProfile$2(root, new $.AnchorRelation__layoutRoot_anon0(root, anchor));
  var loc = root.get$profile().get$location();
  if ($.isEmpty(loc) !== true) {
    var handlers = $.AnchorRelation__getHandlers(loc);
    var t1 = $.index($._anchorXHandlers(), $.index(handlers, 0));
    var t2 = !(anchor == null);
    t1.call$3(0, t2 ? anchor : $.CTC51, root);
    t1 = $.index($._anchorYHandlers(), $.index(handlers, 1));
    t1.call$3(0, t2 ? anchor : $.CTC51, root);
  }
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_workerId, _receivePortId, isolateId);
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$._MediaElementEventsImpl$ = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$ = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$ = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._ViewImpl__domEvtDisp = function(type) {
  return new $._ViewImpl__domEvtDisp_anon(type);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.isNaN = function(receiver) {
  return isNaN(receiver);
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.round$0();
  if (receiver < 0)
    return -Math.round(-receiver);
  else
    return Math.round(receiver);
};

$.CSSStyleDeclarationImpl$ = function(_view) {
  return new $.CSSStyleDeclarationImpl(_view, null);
};

$.ListUtil_remove = function(list, obj) {
  if (!(list == null)) {
    var j = $.indexOf$1(list, obj);
    if ($.geB(j, 0)) {
      $.removeRange(list, j, 1);
      return true;
    }
  }
  return false;
};

$._HLayout$ = function() {
  return new $._HLayout();
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_re, _str);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof srcStart !== 'number')
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || (dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number')
    return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart < dstStart)
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0))
        throw $.iae(i);
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t1 = src[i];
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t1;
    }
  else
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0))
        throw $.iae(i);
      if (i < 0 || i >= src.length)
        throw $.ioore(i);
      var t2 = src[i];
      if (j < 0 || j >= dst.length)
        throw $.ioore(j);
      dst[j] = t2;
    }
};

$._ViewImpl_removeFromIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0))
    return;
  if (!skipFirst)
    view.get$spaceOwner().bindFellow_$2(id, null);
  if (typeof view === 'object' && view !== null && !!view.is$IdSpace) {
    var parent$ = view.get$parent();
    var t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  if (t1)
    parent$.get$spaceOwner().bindFellow_$2(id, null);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t1, t2, t3).call$1(value);
  t4.call$0();
  return copy;
};

$.LayoutManager$ = function() {
  var t1 = $.RunOnceQueue$();
  var t2 = $.HashSetImplementation$();
  var t3 = $.ListFactory_List(null);
  t3 = new $.LayoutManager($.makeLiteralMap([]), $.HashSetImplementation$(), [], 0, 0, t1, t2, null, t3, true, true);
  t3.LayoutManager$0();
  return t3;
};

$.ProfileDeclarationImpl$ = function(owner) {
  return new $.ProfileDeclarationImpl(owner, null, $.HashMapImplementation$());
};

$.CSS_offset3dOf = function(value) {
  if (value == null || $.isEmpty(value) === true)
    return $._Offset3d$(0, 0, 0);
  var ary = [0, 0, 0];
  var i = $.indexOf$1(value, '(');
  if ($.geB(i, 0))
    value = $.substring$1(value, $.add(i, 1));
  for (var t1 = $.iterator($.split(value, ',')), i = 0; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    var i0 = i + 1;
    t2 = $.CSS_intOf(t2, null);
    if (i < 0 || i >= ary.length)
      throw $.ioore(i);
    ary[i] = t2;
    if (i0 === 3)
      break;
    i = i0;
  }
  t1 = ary.length;
  if (0 >= t1)
    throw $.ioore(0);
  t2 = ary[0];
  if (1 >= t1)
    throw $.ioore(1);
  var t3 = ary[1];
  if (2 >= t1)
    throw $.ioore(2);
  return $._Offset3d$(t2, t3, ary[2]);
};

$._DOMWindowCrossFrameImpl__top = function(win) {
return win.top;
};

$.Selectors__getTokenClass = function(c) {
  if ($.Selectors__isWhitespace(c))
    var t1 = 1;
  else
    t1 = $.Selectors__isLiteral(c) ? 0 : 2;
  return t1;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._MouseDragGesture$ = function(owner, start, move, end) {
  var t1 = new $._MouseDragGesture(null, null, null, false, owner, start, move, end, null, false);
  t1._DragGesture$_init$4(owner, start, move, end);
  return t1;
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node, node.get$nodes());
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$.Selectors_parse = function(source) {
  var tokens = $.Selectors_tokenize(source);
  var selectors = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(selectors, {E: 'Selector'});
  for (var t1 = $.iterator(tokens), curr = null, currSeq = null, state = 1; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if ($.eqB(t2.get$type(), 5)) {
      switch (state) {
        case 9:
        case 14:
        case 8:
        case 3:
        case 9:
          break;
        default:
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
      }
      curr = null;
      currSeq = null;
      state = 17;
      continue;
    }
    if (currSeq == null && $.Selectors__requireSequence(state, t2.get$type())) {
      if (curr == null) {
        curr = $.Selector$(selectors.length);
        selectors.push(curr);
      }
      currSeq = curr.addSequence$0();
    }
    switch (state) {
      case 17:
        if ($.eqB(t2.get$type(), 3)) {
          state = 1;
          continue;
        }
        break;
      case 3:
        switch (t2.get$type()) {
          case 7:
          case 9:
          case 8:
            if (curr == null)
              throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
            curr.addCombinator$1(t2);
            state = 2;
            continue;
        }
        break;
      case 8:
        if ($.eqB(t2.get$type(), 21)) {
          state = 15;
          continue;
        }
        break;
      case 15:
        if (!$.eqB(t2.get$type(), 1))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        t2 = t2.source$1(source);
        $.last(currSeq.get$pseudoClasses()).set$parameter(t2);
        state = 16;
        continue;
      case 16:
        if (!$.eqB(t2.get$type(), 22))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        state = 9;
        continue;
    }
    switch (state) {
      case 17:
      case 3:
      case 1:
        switch (t2.get$type()) {
          case 1:
            currSeq.set$type(t2.source$1(source));
            state = 9;
            continue;
          case 2:
            currSeq = null;
            state = 14;
            continue;
        }
        break;
      case 8:
      case 9:
        if ($.eqB(t2.get$type(), 3)) {
          currSeq = null;
          state = 3;
          continue;
        }
        break;
      case 5:
      case 6:
      case 7:
        if (!$.eqB(t2.get$type(), 1))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        break;
    }
    switch (state) {
      case 2:
        if (!$.eqB(t2.get$type(), 3))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        state = 1;
        break;
      case 17:
      case 3:
      case 8:
      case 1:
      case 9:
        switch (t2.get$type()) {
          case 10:
            state = 5;
            break;
          case 11:
            state = 6;
            break;
          case 12:
            state = 7;
            break;
          default:
            throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        }
        break;
      case 14:
        if (!$.eqB(t2.get$type(), 3))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        state = 3;
        break;
      case 5:
        if (!(currSeq.get$id() == null))
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        currSeq.set$id(t2.source$1(source));
        state = 9;
        break;
      case 6:
        $.add$1(currSeq.get$classes(), t2.source$1(source));
        state = 9;
        break;
      case 7:
        $.add$1(currSeq.get$pseudoClasses(), $.PseudoClass$(t2.source$1(source)));
        state = 8;
        break;
      default:
        throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
    }
  }
  switch (state) {
    case 5:
    case 6:
    case 7:
    case 17:
    case 2:
    case 1:
    case 15:
    case 16:
      throw $.captureStackTrace($.SelectorParseException$unexpectedEnding(source));
  }
  return selectors;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), array, 0);
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$ = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.PopupEvent$ = function(source, type) {
  var t1 = new $.PopupEvent(source, null, type, $.DateImplementation$now().millisecondsSinceEpoch, null, false, false, null, null);
  t1.ViewEvent$6(type, null, null, null, null, null);
  return t1;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(_sentinel, null);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC1));
  return object;
};

$.StringUtil_addCharCodes = function(src, diff) {
  if (typeof diff !== 'number')
    return $.StringUtil_addCharCodes$bailout(1, src, diff);
  var j = src.length;
  var dst = $.ListFactory_List(j);
  for (; --j, j >= 0;) {
    var t1 = $.add($.charCodeAt(src, j), diff);
    if (j < 0 || j >= dst.length)
      throw $.ioore(j);
    dst[j] = t1;
  }
  return $.Strings_String$fromCharCodes(dst);
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.PseudoClass_getDefinition = function(name$) {
  switch (name$) {
    case 'first-child':
      return new $.PseudoClass_getDefinition_anon();
    case 'last-child':
      return new $.PseudoClass_getDefinition_anon0();
    case 'only-child':
      return new $.PseudoClass_getDefinition_anon1();
    case 'empty':
      return new $.PseudoClass_getDefinition_anon2();
    case 'nth-child':
      return new $.PseudoClass_getDefinition_anon3();
    case 'last-nth-child':
      return new $.PseudoClass_getDefinition_anon4();
    default:
      return;
  }
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$ = function(_ptr, _type) {
  return new $._EventListenerListImpl(_ptr, _type);
};

$._Offset$ = function(left, top$) {
  return new $._Offset(left, top$);
};

$.ViewMatchContext__initBoolList = function(selectors) {
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, {E: 'List<bool>'});
  for (var t1 = $.iterator(selectors), sublist = null; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    sublist = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(sublist, {E: 'bool'});
    list.push(sublist);
    for (var i = 0; $.ltB(i, $.get$length(t2.get$seqs())); ++i)
      sublist.push(false);
  }
  return list;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.Token_isLiteral = function(c) {
  if (!($.gtB(c, 96) && $.ltB(c, 123)))
    if (!($.gtB(c, 64) && $.ltB(c, 91)))
      var t1 = $.gtB(c, 47) && $.ltB(c, 58) || $.eqB(c, 95) || $.eqB(c, 45);
    else
      t1 = true;
  else
    t1 = true;
  return t1;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$._ChildInfo$ = function() {
  return new $._ChildInfo(null, null, 0, null);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$._IEVisiCtrl$ = function() {
  return new $._IEVisiCtrl();
};

$._anchorXHandlers = function() {
  if ($._$anchorXHandlers == null)
    $._$anchorXHandlers = [new $._anchorXHandlers_anon(), new $._anchorXHandlers_anon0(), new $._anchorXHandlers_anon1(), new $._anchorXHandlers_anon2(), new $._anchorXHandlers_anon3()];
  return $._$anchorXHandlers;
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(t1, null);
  t1._ReceivePortImpl$0();
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$._HttpRequestEventsImpl$ = function(_ptr) {
  return new $._HttpRequestEventsImpl(_ptr);
};

$.UIException$ = function(message) {
  return new $.UIException(message);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
};

$.StringUtil_encodeId = function(v, prefix) {
  if (typeof v !== 'number')
    return $.StringUtil_encodeId$bailout(1, v, prefix);
  var sb = $.StringBufferImpl$('');
  if (!(prefix == null))
    sb.add$1(prefix);
  do {
    var v2 = $.mod(v, 37);
    if (v2 <= 9)
      sb.add$1($.StringUtil_addCharCodes('0', v2));
    else
      sb.add$1(v2 === 36 ? '_' : $.StringUtil_addCharCodes('a', v2 - 10));
  } while (v = $.tdiv(v, 37), v >= 1);
  return sb.toString$0();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ClassSet$ = function(view) {
  var t1 = new $._ClassSet(view, null);
  t1.HashSetImplementation$0();
  return t1;
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$._MediaStreamEventsImpl$ = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.LayoutDeclarationImpl$ = function(owner) {
  return new $.LayoutDeclarationImpl(owner, $.HashMapImplementation$());
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation(millisecondsSinceEpoch, isUtc);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!(typeof t2 === 'number' && t2 === (t2 | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  return name$;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.Selectors_tokenize = function(source) {
  var tokens = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(tokens, {E: 'Token'});
  var len = $.get$length(source);
  if (typeof len !== 'number')
    return $.Selectors_tokenize$bailout(1, source, len, tokens);
  for (var curr = null, pclz = 2, i = 0; i < len; ++i) {
    var c = $.substring$2(source, i, i + 1);
    var clz = $.Selectors__getTokenClass($.charCodeAt(source, i));
    if (!(curr == null) && clz === pclz && !(clz === 2))
      curr.extend$0();
    else {
      curr = $.Token$fromChar(c, i);
      tokens.push(curr);
    }
    pclz = clz;
  }
  return tokens;
};

$._DOMWindowCrossFrameImpl__parent = function(win) {
return win.parent;
};

$._WCIterator$ = function(owner) {
  var t1 = new $._WCIterator(null);
  t1._WCIterator$1(owner);
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$._WindowImpl__isDartLocation = function(thing) {
  try {
    var t1 = thing;
    return typeof t1 === 'object' && t1 !== null && t1.is$Location();
  } catch (exception) {
    $.unwrapException(exception);
    return false;
  }

};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if (!$.isJsArray(charCodes))
    charCodes = $.ListFactory_List$from(charCodes);
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$.CSSStyleDeclarationImpl__check = function(propertyName) {
  if ($.CSSStyleDeclarationImpl__illnms == null) {
    $.CSSStyleDeclarationImpl__illnms = $.HashSetImplementation$();
    for (var t1 = $.iterator($.CTC77); t1.hasNext$0() === true;) {
      var t2 = t1.next$0();
      $.add$1($.CSSStyleDeclarationImpl__illnms, t2);
    }
  }
  if ($.contains$1($.CSSStyleDeclarationImpl__illnms, propertyName) === true)
    throw $.captureStackTrace($.UIException$($.S(propertyName) + ' not allowed. Please use View\'s API instead, such as left and width.'));
  if ($.startsWith(propertyName, 'margin') === true)
    throw $.captureStackTrace($.CTC78);
};

$.PseudoClass$ = function(name$) {
  return new $.PseudoClass(name$, null);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$._ViewImpl_unlink = function(view, child) {
  if (typeof child === 'object' && child !== null && !!child.is$IdSpace)
    $._ViewImpl_removeFromIdSpace(child, true);
  else
    $._ViewImpl_removeFromIdSpaceDown(child, child.get$spaceOwner());
  var p = child.get$_prevSibling();
  var n = child.get$_nextSibling();
  if (!(p == null))
    p.set$_nextSibling(n);
  else
    view._childInfo.set$firstChild(n);
  if (!(n == null))
    n.set$_prevSibling(p);
  else
    view._childInfo.set$lastChild(p);
  child.set$_lib7_parent(null);
  child.set$_prevSibling(null);
  child.set$_nextSibling(null);
  var t1 = view._childInfo;
  t1.set$nChild($.sub(t1.get$nChild(), 1));
};

$.parseDouble = function(str) {
  $.checkString(str);
  var ret = parseFloat(str);
  if (ret === 0)
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  else
    t1 = false;
  if (t1)
    ret = parseInt(str);
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN'))
    throw $.captureStackTrace($.FormatException$(str));
  return ret;
};

$.Transformation$transit = function(offset) {
  var t1 = [1, 0, offset.get$x(), 0, 1, offset.get$y(), 0, 0, 1];
  var t2 = $.ListFactory_List(3);
  $.setRuntimeTypeInfo(t2, {E: 'MatrixRow'});
  var t3 = $.ListFactory_List(9);
  $.setRuntimeTypeInfo(t3, {E: 'num'});
  t3 = new $.Transformation(3, 3, t2, t3);
  t3.Matrix$3(3, 3, t1);
  return t3;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver))
    return $.Arrays_indexOf(receiver, element, 0, receiver.length);
  else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$._anchorYHandlers = function() {
  if ($._$anchorYHandlers == null)
    $._$anchorYHandlers = [new $._anchorYHandlers_anon(), new $._anchorYHandlers_anon0(), new $._anchorYHandlers_anon1(), new $._anchorYHandlers_anon2(), new $._anchorYHandlers_anon3()];
  return $._$anchorYHandlers;
};

$._BroadcastListeners$ = function(_owner) {
  return new $._BroadcastListeners(_owner, $.HashMapImplementation$());
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.MeasureContext__getSetByApp = function(view, val, nm) {
  return !(val == null) && !$.eqB(val, $.index(view.get$dataAttributes(), nm)) ? val : null;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._OnDemandMap$ = function(_creator) {
  return new $._OnDemandMap(_creator, null);
};

$.MapUtil_onDemand = function(creator) {
  return $._OnDemandMap$(creator);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC1);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC1);
      else if ($.contains$1(message, ' is not a function') === true || $.contains$1(message, 'doesn\'t support property or method') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$.StringUtil_isChar = function(cc, digit, upper, lower, whitespace, match) {
  $.StringUtil__init();
  var v = $.isEmpty(cc) === true ? 0 : $.charCodeAt(cc, 0);
  if (!(digit && $.geB(v, $.StringUtil__CC_0) && $.leB(v, $.StringUtil__CC_9)))
    if (!(upper && $.geB(v, $.StringUtil__CC_A) && $.leB(v, $.StringUtil__CC_Z)))
      if (!(lower && $.geB(v, $.StringUtil__CC_a) && $.leB(v, $.StringUtil__CC_z))) {
        if (whitespace)
          var t1 = $.eqB(cc, ' ') || $.eqB(cc, '\x09') || $.eqB(cc, '\n') || $.eqB(cc, '\r');
        else
          t1 = false;
        if (!t1)
          t1 = !(match == null) && $.geB($.indexOf$1(match, cc), 0);
        else
          t1 = true;
      } else
        t1 = true;
    else
      t1 = true;
  else
    t1 = true;
  return t1;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.Selectors__requireSequence = function(state, type) {
  if (!$.eqB(type, 1) && !$.eqB(type, 2))
    return false;
  switch (state) {
    case 17:
    case 3:
    case 1:
    case 5:
    case 6:
    case 7:
    case 10:
      return true;
    default:
      return false;
  }
};

$.StringUtil_encodeId$bailout = function(state, v, prefix) {
  var sb = $.StringBufferImpl$('');
  if (!(prefix == null))
    sb.add$1(prefix);
  do {
    var v2 = $.mod(v, 37);
    if ($.leB(v2, 9))
      sb.add$1($.StringUtil_addCharCodes('0', v2));
    else
      sb.add$1($.eqB(v2, 36) ? '_' : $.StringUtil_addCharCodes('a', $.sub(v2, 10)));
  } while (v = $.tdiv(v, 37), $.geB(v, 1));
  return sb.toString$0();
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.StringUtil_addCharCodes$bailout = function(state, src, diff) {
  var j = src.length;
  var dst = $.ListFactory_List(j);
  for (; --j, j >= 0;) {
    var t1 = $.add($.charCodeAt(src, j), diff);
    if (j < 0 || j >= dst.length)
      throw $.ioore(j);
    dst[j] = t1;
  }
  return $.Strings_String$fromCharCodes(dst);
};

$._ViewImpl_addToIdSpaceDown$bailout = function(state, view, space, id, t1) {
  if ($.gtB(t1, 0))
    space.bindFellow_$2(id, view);
  if (!(typeof view === 'object' && view !== null && !!view.is$IdSpace)) {
    var vs = view.get$_virtIS();
    if (!(vs == null)) {
      view.set$_virtIS(null);
      for (t1 = $.iterator(vs.get$fellows()); t1.hasNext$0() === true;) {
        var t2 = t1.next$0();
        space.bindFellow_$2(t2.get$id(), t2);
      }
    } else
      for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling())
        $._ViewImpl_addToIdSpaceDown(view, space);
  }
};

$.StringUtil_encodeXML$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var txt = env0;
      var multiline = env1;
      var maxlength = env2;
      var pre = env3;
      break;
    case 2:
      txt = env0;
      pre = env1;
      out = env2;
      cc = env3;
      j = env4;
      multiline = env5;
      k = env6;
      tl = env7;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if (txt == null)
        return;
      var tl = $.get$length(txt);
      multiline = pre || multiline;
      var t1 = !multiline;
      if (t1 && maxlength > 0 && $.gtB(tl, maxlength)) {
        var j = maxlength;
        while (true) {
          if (!(j > 0 && $.StringUtil_isChar($.index(txt, j - 1), false, false, false, true, null)))
            break;
          --j;
        }
        return $.StringUtil_encodeXML($.S($.substring$2(txt, 0, j)) + '...', multiline, 0, pre);
      }
      var out = $.StringBufferImpl$('');
    case 2:
      if (state === 2 || state === 0 && (multiline || pre))
        switch (state) {
          case 0:
            var enc = null;
            j = 0;
            var k = 0;
          case 2:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!$.ltB(j, tl))
                      break L0;
                    var cc = $.index(txt, j);
                  case 2:
                    state = 0;
                    enc = $.CTC68.operator$index$1(cc);
                    if (!(enc == null)) {
                      $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
                      var k0 = j + 1;
                      k = k0;
                    } else if (multiline && $.eqB(cc, '\n')) {
                      $.add$1(out.add$1($.substring$2(txt, k, j)), '<br/>\n');
                      k0 = j + 1;
                      k = k0;
                    } else {
                      if (pre)
                        t1 = $.eqB(cc, ' ') || $.eqB(cc, '\x09');
                      else
                        t1 = false;
                      if (t1) {
                        $.add$1(out.add$1($.substring$2(txt, k, j)), '&nbsp;');
                        if ($.eqB(cc, '\x09'))
                          out.add$1('&nbsp;&nbsp;&nbsp;');
                        k = j + 1;
                      }
                    }
                    ++j;
                }
        }
      else
        for (enc = null, j = 0, k = 0; $.ltB(j, tl); ++j) {
          enc = $.CTC68.operator$index$1($.index(txt, j));
          if (!(enc == null)) {
            $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
            k0 = j + 1;
            k = k0;
          }
        }
      if (k === 0)
        return txt;
      if ($.ltB(k, tl))
        out.add$1($.substring$1(txt, k));
      return out.toString$0();
  }
};

$.Matrix__generate$bailout = function(state, rs, cs, f, size) {
  var m = $.Matrix$(rs, cs, null);
  for (var t1 = m._en, i = 0; $.ltB(i, size); ++i) {
    var t2 = f.call$1(i);
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    t1[i] = t2;
  }
  return m;
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC1);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$._ViewImpl_removeFromIdSpaceDown$bailout = function(state, view, space, id, t1) {
  if ($.gtB(t1, 0))
    space.bindFellow_$2(id, null);
  if (!(typeof view === 'object' && view !== null && !!view.is$IdSpace))
    for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling())
      $._ViewImpl_removeFromIdSpaceDown(view, space);
};

$.Arrays_copy$bailout = function(state, src, srcStart, dst, dstStart, count) {
  if (srcStart == null)
    srcStart = 0;
  if ($.ltB(srcStart, dstStart)) {
    var i = $.sub($.add(srcStart, count), 1);
    if (typeof count !== 'number')
      throw $.iae(count);
    var j = dstStart + count - 1;
    for (; $.geB(i, srcStart); i = $.sub(i, 1), --j)
      $.indexSet(dst, j, $.index(src, i));
  } else
    for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), ++j)
      $.indexSet(dst, j, $.index(src, i));
};

$.Selectors_tokenize$bailout = function(state, source, len, tokens) {
  for (var curr = null, pclz = 2, i = 0; $.ltB(i, len); ++i) {
    var c = $.substring$2(source, i, i + 1);
    var clz = $.Selectors__getTokenClass($.charCodeAt(source, i));
    if (!(curr == null) && clz === pclz && !(clz === 2))
      curr.extend$0();
    else {
      curr = $.Token$fromChar(c, i);
      tokens.push(curr);
    }
    pclz = clz;
  }
  return tokens;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    accumulator.push($.index(a, i));
  return accumulator;
};

$.ViewIterator__isAllIds$bailout = function(state, list, offset) {
  for (var t1 = $.iterator(list); t1.hasNext$0() === true;)
    if ($.gtB($.get$length(t1.next$0().get$seqs()), offset))
      return false;
  return true;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC1 = Isolate.makeConstantList([]);
$.CTC25 = new Isolate.$isolateProperties.ConstantMap(0, {}, Isolate.$isolateProperties.CTC1);
$.CTC24 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '([-]?[0-9]+)');
$.CTC11 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC28 = Isolate.makeConstantList([1, 0]);
$.CTC29 = Isolate.makeConstantList([2, 0]);
$.CTC30 = Isolate.makeConstantList([3, 0]);
$.CTC32 = Isolate.makeConstantList([2, 4]);
$.CTC31 = Isolate.makeConstantList([1, 4]);
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC12 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC13 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC35 = Isolate.makeConstantList([0, 2]);
$.CTC33 = Isolate.makeConstantList([3, 4]);
$.CTC73 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot modify');
$.CTC37 = Isolate.makeConstantList([4, 1]);
$.CTC34 = Isolate.makeConstantList([0, 1]);
$.CTC39 = Isolate.makeConstantList([4, 3]);
$.CTC41 = Isolate.makeConstantList([2, 1]);
$.CTC18 = new Isolate.$isolateProperties.LayoutAmountType('fixed');
$.CTC38 = Isolate.makeConstantList([4, 2]);
$.CTC45 = Isolate.makeConstantList([3, 2]);
$.CTC42 = Isolate.makeConstantList([3, 1]);
$.CTC43 = Isolate.makeConstantList([1, 2]);
$.CTC57 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(safari)[ /]([\\w.]+)');
$.CTC67 = Isolate.makeConstantList(['<', '>', '&', '"']);
$.CTC68 = new Isolate.$isolateProperties.ConstantMap(4, {'<': 'lt', '>': 'gt', '&': 'amp', '"': 'quot'}, Isolate.$isolateProperties.CTC67);
$.CTC40 = Isolate.makeConstantList([1, 1]);
$.CTC47 = Isolate.makeConstantList([2, 3]);
$.CTC46 = Isolate.makeConstantList([1, 3]);
$.CTC36 = Isolate.makeConstantList([0, 3]);
$.CTC64 = new Isolate.$isolateProperties.UIException('type required');
$.CTC79 = new Isolate.$isolateProperties.Object();
$.CTC63 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeRange on immutable List.');
$.CTC44 = Isolate.makeConstantList([2, 2]);
$.CTC49 = Isolate.makeConstantList(['north start', 'north center', 'north end', 'south start', 'south center', 'south end', 'west start', 'west center', 'west end', 'east start', 'east center', 'east end', 'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right']);
$.CTC55 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(webkit)[ /]([\\w.]+)');
$.CTC26 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC2 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC1);
$.CTC14 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC3 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC16 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC70 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC52 = new Isolate.$isolateProperties.SystemException('document not ready yet');
$.CTC61 = new Isolate.$isolateProperties.UIException('listener required');
$.CTC75 = new Isolate.$isolateProperties.UIException('\'content\' not allowed in tile layout');
$.CTC72 = new Isolate.$isolateProperties.UnsupportedOperationException('Not IdSpace');
$.CTC69 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC48 = Isolate.makeConstantList([3, 3]);
$.CTC54 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'os[ /]([\\w_]+) like mac os');
$.CTC71 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC59 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(mozilla)(?:.*? rv:([\\w.]+))?');
$.CTC62 = Isolate.makeConstantList(['blur', 'click', 'focus', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'mouseWheel', 'scroll']);
$.CTC56 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(chrome)[ /]([\\w.]+)');
$.CTC58 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(msie) ([\\w.]+)');
$.CTC50 = new Isolate.$isolateProperties.ConstantMap(21, {'north start': Isolate.$isolateProperties.CTC28, 'north center': Isolate.$isolateProperties.CTC29, 'north end': Isolate.$isolateProperties.CTC30, 'south start': Isolate.$isolateProperties.CTC31, 'south center': Isolate.$isolateProperties.CTC32, 'south end': Isolate.$isolateProperties.CTC33, 'west start': Isolate.$isolateProperties.CTC34, 'west center': Isolate.$isolateProperties.CTC35, 'west end': Isolate.$isolateProperties.CTC36, 'east start': Isolate.$isolateProperties.CTC37, 'east center': Isolate.$isolateProperties.CTC38, 'east end': Isolate.$isolateProperties.CTC39, 'top left': Isolate.$isolateProperties.CTC40, 'top center': Isolate.$isolateProperties.CTC41, 'top right': Isolate.$isolateProperties.CTC42, 'center left': Isolate.$isolateProperties.CTC43, 'center center': Isolate.$isolateProperties.CTC44, 'center right': Isolate.$isolateProperties.CTC45, 'bottom left': Isolate.$isolateProperties.CTC46, 'bottom center': Isolate.$isolateProperties.CTC47, 'bottom right': Isolate.$isolateProperties.CTC48}, Isolate.$isolateProperties.CTC49);
$.CTC60 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC22 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\w+)');
$.CTC77 = Isolate.makeConstantList(['left', 'top', 'right', 'bottom', 'width', 'height']);
$.CTC23 = new Isolate.$isolateProperties.LayoutAmountType('content');
$.CTC0 = new Isolate.$isolateProperties.UIException('run() called twice?');
$.CTC27 = new Isolate.$isolateProperties._AnchorOfPoint();
$.CTC51 = new Isolate.$isolateProperties._AnchorOfRoot();
$.CTC53 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'android[ /]([\\w.]+)');
$.CTC = new Isolate.$isolateProperties.UIException('Only one activity is allowed');
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC17 = new Isolate.$isolateProperties.NotImplementedException('IDBKey containing Date');
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC20 = new Isolate.$isolateProperties.LayoutAmountType('ratio');
$.CTC76 = Isolate.makeConstantList(['animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backface-visibility', 'background-composite', 'border-after', 'border-after-color', 'border-after-style', 'border-after-width', 'border-before', 'border-before-color', 'border-before-style', 'border-before-width', 'border-end', 'border-end-color', 'border-end-style', 'border-end-width', 'border-fit', 'border-horizontal-spacing', 'border-start', 'border-start-color', 'border-start-style', 'border-start-width', 'border-vertical-spacing', 'box-align', 'box-direction', 'box-flex', 'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-reflect', 'color-correction', 'column-break-after', 'column-break-before', 'column-break-inside', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'filter', 'flex-align', 'flex-flow', 'flex-order', 'flex-pack', 'flow-from', 'flow-into', 'font-feature-settings', 'font-size-delta', 'font-smoothing', 'highlight', 'hyphenate-character', 'hyphenate-limit-after', 'hyphenate-limit-before', 'hyphenate-limit-lines', 'hyphens', 'line-box-contain', 'line-break', 'line-clamp', 'locale', 'logical-height', 'logical-width', 'margin-after', 'margin-after-collapse', 'margin-before', 'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse', 'margin-end', 'margin-start', 'margin-top-collapse', 'marquee', 'marquee-direction', 'marquee-increment', 'marquee-repetition', 'marquee-speed', 'marquee-style', 'mask', 'mask-attachment', 'mask-box-image', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice', 'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-position', 'mask-position-x', 'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size', 'match-nearest-mail-blockquote-color', 'max-logical-height', 'max-logical-width', 'min-logical-height', 'min-logical-width', 'nbsp-mode', 'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective', 'perspective-origin', 'perspective-origin-x', 'perspective-origin-y', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-overflow', 'rtl-ordering', 'tap-highlight-color', 'text-combine', 'text-decorations-in-effect', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-fill-color', 'text-orientation', 'text-security', 'text-size-adjust', 'text-stroke', 'text-stroke-color', 'text-stroke-width', 'transform', 'transform-origin', 'transform-origin-x', 'transform-origin-y', 'transform-origin-z', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'user-drag', 'user-modify', 'user-select', 'wrap-shape', 'writing-mode']);
$.CTC15 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.CTC78 = new Isolate.$isolateProperties.UIException('You can\'t change margin');
$.CTC4 = new Isolate.$isolateProperties._Default();
$.CTC19 = new Isolate.$isolateProperties.LayoutAmountType('flex');
$.CTC65 = new Isolate.$isolateProperties._EmptyColl();
$.CTC66 = new Isolate.$isolateProperties._EmptyIter();
$.CTC74 = new Isolate.$isolateProperties.IllegalArgumentException('null');
$.CTC21 = new Isolate.$isolateProperties.LayoutAmountType('none');
$.StringUtil__CC_a = null;
$._$anchorXHandlers = null;
$.View__afters = null;
$.CSS__nsnms = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$.View__mntCnt = 0;
$._TimerFactory__factory = null;
$.StringUtil__CC_z = null;
$._ViewImpl__domEvtDisps = null;
$._ReceivePortImpl__nextFreeId = 1;
$._broadcaster = null;
$.StringUtil__CC_Z = null;
$.CSS_prefix = null;
$.CSSStyleDeclarationImpl__illnms = null;
$.browser = null;
$.StringUtil__CC_0 = null;
$.StringUtil__CC_A = null;
$._$anchorYHandlers = null;
$.activity = null;
$._$visiCtrl = null;
$._app = null;
$.StringUtil__CC_9 = null;
$.View__uuidNext = 0;
$.layoutManager = null;
$.viewConfig = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$FileList: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$Element: function() { return false; },
 is$Location: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$Window: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$Collection: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$ImageData: function() { return false; },
 is$Document: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$ImageElement: function() { return false; },
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$File: function() { return false; },
 is$Blob: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; }
});

$.$defineNativeClass('AbstractWorker', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._AbstractWorkerEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLAnchorElement', ["name=", "target=", "type="], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["align?", "height=", "name=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["target="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Attr', ["name?", "value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$(this);
}
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["name?", "value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('BarInfo', ["visible?"], {
});

$.$defineNativeClass('HTMLBaseElement', ["target="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["size?", "type?"], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["name=", "type=", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CSSFontFaceRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframeRule', ["style?"], {
});

$.$defineNativeClass('WebKitCSSKeyframesRule', ["name="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSPageRule', ["style?"], {
});

$.$defineNativeClass('CSSRule', ["cssText=", "type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["cssText=", "length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
},
 setProperty$2: function(propertyName,value) {
  return this.setProperty(propertyName,value);
},
 set$backgroundColor: function(value) {
  this.setProperty$3('background-color', value, '');
},
 get$borderWidth: function() {
  return this.getPropertyValue$1('border-width');
},
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$columns: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'columns');
},
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); },
 get$height: function() {
  return this.getPropertyValue$1('height');
},
 set$height: function(value) {
  this.setProperty$3('height', value, '');
},
 get$left: function() {
  return this.getPropertyValue$1('left');
},
 set$left: function(value) {
  this.setProperty$3('left', value, '');
},
 get$maxHeight: function() {
  return this.getPropertyValue$1('max-height');
},
 get$maxWidth: function() {
  return this.getPropertyValue$1('max-width');
},
 get$minHeight: function() {
  return this.getPropertyValue$1('min-height');
},
 get$minWidth: function() {
  return this.getPropertyValue$1('min-width');
},
 set$overflow: function(value) {
  this.setProperty$3('overflow', value, '');
},
 get$position: function() {
  return this.getPropertyValue$1('position');
},
 get$resize: function() {
  return this.getPropertyValue$1('resize');
},
 get$right: function() {
  return this.getPropertyValue$1('right');
},
 get$size: function() {
  return this.getPropertyValue$1('size');
},
 set$src: function(value) {
  this.setProperty$3('src', value, '');
},
 get$top: function() {
  return this.getPropertyValue$1('top');
},
 set$top: function(value) {
  this.setProperty$3('top', value, '');
},
 get$transform: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transform');
},
 set$transform: function(value) {
  this.setProperty$3($.S($._browserPrefix()) + 'transform', value, '');
},
 get$transition: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transition');
},
 get$whiteSpace: function() {
  return this.getPropertyValue$1('white-space');
},
 set$whiteSpace: function(value) {
  this.setProperty$3('white-space', value, '');
},
 get$width: function() {
  return this.getPropertyValue$1('width');
},
 set$width: function(value) {
  this.setProperty$3('width', value, '');
},
 get$zIndex: function() {
  return this.getPropertyValue$1('z-index');
}
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValue', ["cssText="], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', [], {
 transform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.transform(m11,m12,m21,m22,dx,dy);
},
 get$transform: function() { return new $.BoundClosure1(this, 'transform$6'); }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["bottom?", "height?", "left?", "right?", "top?", "width?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.timeStamp$1 = function(arg) {
  return this.timeStamp(arg);
};
_ConsoleImpl.get$timeStamp = function() { return new $.BoundClosure(this, 'timeStamp$1'); };
_ConsoleImpl.profile$1 = function(title) {
  return this.profile(title);
};
_ConsoleImpl.get$profile = function() { return new $.BoundClosure(this, 'profile$1'); };
_ConsoleImpl.group$1 = function(arg) {
  return this.group(arg);
};
_ConsoleImpl.error$1 = function(arg) {
  return this.error(arg);
};
_ConsoleImpl.get$error = function() { return new $.BoundClosure(this, 'error$1'); };
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMFileSystem', ["name?"], {
});

$.$defineNativeClass('DOMFileSystemSync', ["name?"], {
});

$.$defineNativeClass('DOMMimeType', ["type?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?", "name?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 contains$1: function(string) {
  return this.contains(string);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 remove$1: function(token) {
  return this.remove(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', ["body?"], {
 get$on: function() {
  return $._DocumentEventsImpl$(this);
},
 createDocumentFragment$0: function() {
  return this.createDocumentFragment();
},
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 query$1: function(selectors) {
  if ($.CTC60.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 is$Document: function() { return true; },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$elements: function() {
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListFactory_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 _insertAdjacentNode$2: function(where, node) {
  switch ($.toLowerCase(where)) {
    case 'beforebegin':
      return;
    case 'afterend':
      return;
    case 'afterbegin':
      this.insertBefore$2(node, this.get$nodes().get$first());
      return node;
    case 'beforeend':
      $.add$1(this.get$nodes(), node);
      return node;
    default:
      throw $.captureStackTrace($.IllegalArgumentException$('Invalid position ' + where));
  }
},
 insertAdjacentHTML$2: function(where, text) {
  this._insertAdjacentNode$2(where, $._DocumentFragmentFactoryProvider_DocumentFragment$html(text));
},
 get$id: function() {
  return '';
},
 get$tagName: function() {
  return '';
},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$nextElementSibling: function() {
  return;
},
 get$offsetParent: function() {
  return;
},
 get$parent: function() {
  return;
},
 get$attributes: function() {
  return $.CTC25;
},
 get$classes: function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  return t1;
},
 get$dataAttributes: function() {
  return $.CTC25;
},
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
},
 set$draggable: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Draggable can\'t be set for document fragments.'));
},
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));
},
 get$on: function() {
  return $._ElementEventsImpl$(this);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["draggable!", "id=", "innerHTML!", "nextElementSibling?", "offsetParent?", "style?", "tagName?"], {
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
},
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
  {
  return $._CssClassSet$(this);
}
  } else {
    return Object.prototype.get$classes.call(this);
  }

},
 get$dataAttributes: function() {
  return $._DataAttributeMap$(this.get$attributes());
},
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._ElementEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 get$$$dom_children: function() {
return this.children;
},
 insertAdjacentHTML$2: function(where, html) {
  return this.insertAdjacentHTML(where,html);
},
 get$$$dom_className: function() {
return this.className;
},
 set$$$dom_className: function(value) {
this.className = value;
},
 get$$$dom_clientHeight: function() {
return this.clientHeight;
},
 get$$$dom_clientWidth: function() {
return this.clientWidth;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 get$$$dom_offsetHeight: function() {
return this.offsetHeight;
},
 get$$$dom_offsetLeft: function() {
return this.offsetLeft;
},
 get$$$dom_offsetTop: function() {
return this.offsetTop;
},
 get$$$dom_offsetWidth: function() {
return this.offsetWidth;
},
 get$$$dom_scrollLeft: function() {
return this.scrollLeft;
},
 get$$$dom_scrollTop: function() {
return this.scrollTop;
},
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
},
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
},
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["align?", "height=", "name=", "src!", "type=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('Event', ["target?", "timeStamp?", "type?"], {
 preventDefault$0: function() {
  return this.preventDefault();
}
});

$.$defineNativeClass('EventException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('EventSource', [], {
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('EventTarget', [], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._EventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('HTMLFieldSetElement', ["elements?", "name=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["error?"], {
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriter', ["error?", "length?", "position?"], {
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('FileWriterSync', ["length?", "position?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?", "name=", "target="], {
 reset$0: function() {
  return this.reset();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["height?", "location?", "name=", "src!", "width?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', ["rows?"], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', ["align?", "size?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 remove$1: function(index) {
  return this.remove(index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', ["profile?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequest', [], {
 get$on: function() {
  return $._HttpRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('XMLHttpRequestException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 get$on: function() {
  return $._HttpRequestUploadEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBCursor', [], {
 get$key: function() {
  return $._convertNativeToDart_IDBKey(this.get$_key());
},
 get$_key: function() {
return this.key;
},
 source$1: function(arg0) { return this.source.call$1(arg0); }
});

$.$defineNativeClass('IDBCursorWithValue', [], {
 get$value: function() {
  return $._convertNativeToDart_AcceptStructuredClone(this.get$_lib_value());
},
 get$_lib_value: function() {
return this.value;
}
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBDatabaseException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 add$2: function(value, key) {
  if (!($.CTC4 === key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC4)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBRequest', ["error?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._IDBRequestEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 source$1: function(arg0) { return this.source.call$1(arg0); },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('IDBTransaction', ["error?"], {
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLIFrameElement', ["align?", "height=", "name=", "src!", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["height?", "width?"], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["align?", "height=", "name=", "src!", "width=", "x?", "y?"], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); },
 is$ImageElement: function() { return true; },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["align?", "height=", "name=", "pattern?", "size?", "src!", "type=", "value=", "width="], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["name=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["type=", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["target=", "type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
},
 is$Location: function() { return true; }
});

$.$defineNativeClass('HTMLMapElement', ["name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["height=", "width="], {
 start$0: function() {
  return this.start();
},
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMediaElement', ["error?", "src!"], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
},
 load$0: function() {
  return this.load();
},
 get$load: function() { return new $.BoundClosure0(this, 'load$0'); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaSource', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStream', [], {
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
  {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }

},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
  {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }

}
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrack', [], {
 get$on: function() {
  return $._MediaStreamTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 get$on: function() {
  return $._MediaStreamTrackListEventsImpl$(this);
},
 add$1: function(track) {
  return this.add(track);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 remove$1: function(track) {
  return this.remove(track);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
 source$1: function(arg0) { return this.source.call$1(arg0); }
});

$.$defineNativeClass('MessagePort', [], {
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 start$0: function() {
  return this.start();
},
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); }
});

$.$defineNativeClass('HTMLMetaElement', ["name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Metadata', ["size?"], {
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["x?", "y?"], {
});

$.$defineNativeClass('MutationRecord', ["nextSibling?", "previousSibling?", "target?", "type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 get$$$dom_attributes: function() {
return this.attributes;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 set$text: function(value) {
this.textContent = value;
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 insertBefore$2: function(newChild, refChild) {
  return this.insertBefore(newChild,refChild);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["_parent!", "length?"], {
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    this._parent.$dom_appendChild$1(t2);
  }
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', [], {
 get$on: function() {
  return $._NotificationEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLOListElement', ["start?", "type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["align?", "height=", "name=", "type=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type="], {
});

$.$defineNativeClass('HTMLOutputElement', ["name=", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OverflowEvent', ["orient?"], {
});

$.$defineNativeClass('HTMLParagraphElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["name=", "type=", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["x?", "y?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["target?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["position?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RTCPeerConnection', [], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('Rect', ["bottom?", "left?", "right?", "top?"], {
});

$.$defineNativeClass('SQLResultSet', ["rows?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', ["target?", "transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Document: function() { return true; },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$classes: function() {
  if (this.get$_cssClassSet() == null)
    this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
},
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 get$id: function() {
return this.id;
},
 set$id: function(value) {
this.id = value;
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', ["firstChild?", "lastChild?", "nextSibling?", "previousSibling?"], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["type?", "height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["type?", "height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["height?", "width?", "x?", "y?", "transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["height?", "width?", "x?", "y?", "transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x?"], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y?"], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y?"], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPatternElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["x?", "y?"], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPreserveAspectRatio', ["align?"], {
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["height=", "width=", "x?", "y?"], {
});

$.$defineNativeClass('SVGRectElement', ["height?", "width?", "x?", "y?", "transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["height?", "width?", "x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', ["spacing?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["x?", "y?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', ["height?", "width?", "x?", "y?", "transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewSpec', ["transform?"], {
});

$.$defineNativeClass('Screen', ["height?", "width?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["src!", "type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ScriptProfileNode', ["visible?"], {
 children$0: function() {
  return this.children();
},
 get$children: function() { return new $.BoundClosure0(this, 'children$0'); }
});

$.$defineNativeClass('HTMLSelectElement', ["length=", "name=", "size?", "type?", "value="], {
 add$2: function(element, before) {
  return this.add(element,before);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
}
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('HTMLSourceElement', ["src!", "type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammar', ["src!"], {
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 start$0: function() {
  return this.start();
},
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 putIfAbsent$2: function(key, ifAbsent) {
  if (this.containsKey$1(key) !== true)
    this.operator$indexSet$2(key, ifAbsent.call$0());
  return this.operator$index$1(key);
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["align?", "height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["align?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["align?", "rows?", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', ["align?", "rows?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["name=", "rows?", "type?", "value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCue', ["align?", "id=", "position?", "size?", "text!"], {
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
},
 get$start: function() { return new $.BoundClosure(this, 'start$1'); }
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Touch', ["pageX?", "pageY?", "target?"], {
});

$.$defineNativeClass('TouchEvent', ["touches?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', ["src!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); },
 firstChild$0: function() {
  return this.firstChild();
},
 get$firstChild: function() { return new $.BoundClosure0(this, 'firstChild$0'); },
 lastChild$0: function() {
  return this.lastChild();
},
 get$lastChild: function() { return new $.BoundClosure0(this, 'lastChild$0'); },
 nextSibling$0: function() {
  return this.nextSibling();
},
 get$nextSibling: function() { return new $.BoundClosure0(this, 'nextSibling$0'); },
 previousSibling$0: function() {
  return this.previousSibling();
},
 get$previousSibling: function() { return new $.BoundClosure0(this, 'previousSibling$0'); }
});

$.$defineNativeClass('UIEvent', ["pageX?", "pageY?", "view?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC3);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC3);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC15);
},
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC63);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["height=", "width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["name?", "size?", "type?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 flush$0: function() {
  return this.flush();
}
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('WebSocket', [], {
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
}
});

$.$defineNativeClass('DOMWindow', ["innerHeight?", "innerWidth?", "length?", "name=", "navigator?", "outerHeight?", "outerWidth?", "pageXOffset?", "pageYOffset?", "parent?"], {
 get$_top: function() {
return this.top;
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
},
 get$location: function() {
  return this._get_location$0();
},
 _get_location$0: function() {
  var result = this.get$_location();
  if ($._WindowImpl__isDartLocation(result) === true)
    return result;
  if (null == this._location_wrapper)
    this._location_wrapper = $._LocationWrapper$(result);
  return this._location_wrapper;
},
 get$_location: function() {
return this.location
},
 get$on: function() {
  return $._WindowEventsImpl$(this);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
},
 close$0: function() {
  return this.close();
},
 $dom_getComputedStyle$2: function(element, pseudoElement) {
  return this.getComputedStyle(element,pseudoElement);
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 is$Window: function() { return true; }
});

$.$defineNativeClass('Worker', [], {
 get$on: function() {
  return $._WorkerEventsImpl$(this);
},
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', ["location?", "navigator?"], {
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
  {
  return $._WorkerContextEventsImpl$(this);
}
  } else {
    return Object.prototype.get$on.call(this);
  }

},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
},
 close$0: function() {
  return this.close();
},
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', ["name?"], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 get$id: function() {
return this.id;
},
 set$id: function(i) {
this.id = i;
},
 postMessage$1: function(msg) {
return this.postMessage(msg);
}
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 359 dynamic classes.
// 413 classes
// 37 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_MouseEventImpl)*/ = 'MouseEvent|WheelEvent|WheelEvent';
  var v3/*class(_CSSValueListImpl)*/ = 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue';
  var v4/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v5/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v6/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v7/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v8/*class(_SVGElementImpl)*/ = [v4/*class(_SVGTextContentElementImpl)*/,v5/*class(_SVGGradientElementImpl)*/,v6/*class(_SVGComponentTransferFunctionElementImpl)*/,v7/*class(_SVGAnimationElementImpl)*/,v4/*class(_SVGTextContentElementImpl)*/,v5/*class(_SVGGradientElementImpl)*/,v6/*class(_SVGComponentTransferFunctionElementImpl)*/,v7/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v9/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v10/*class(_UIEventImpl)*/ = [v2/*class(_MouseEventImpl)*/,v2/*class(_MouseEventImpl)*/,'UIEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent|TouchEvent|TextEvent|SVGZoomEvent|KeyboardEvent|CompositionEvent'].join('|');
  var v11/*class(_ElementImpl)*/ = [v8/*class(_SVGElementImpl)*/,v9/*class(_MediaElementImpl)*/,v8/*class(_SVGElementImpl)*/,v9/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v12/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v13/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v14/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v15/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v16/*class(_NodeImpl)*/ = [v11/*class(_ElementImpl)*/,v12/*class(_DocumentFragmentImpl)*/,v13/*class(_DocumentImpl)*/,v14/*class(_CharacterDataImpl)*/,v11/*class(_ElementImpl)*/,v12/*class(_DocumentFragmentImpl)*/,v13/*class(_DocumentImpl)*/,v14/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v17/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v18/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest';
  var v19/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v4/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v19/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['MouseEvent', v2/*class(_MouseEventImpl)*/],
    ['UIEvent', v10/*class(_UIEventImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['WorkerContext', v15/*class(_WorkerContextImpl)*/],
    ['CSSValueList', v3/*class(_CSSValueListImpl)*/],
    ['CSSValue', [v3/*class(_CSSValueListImpl)*/,v3/*class(_CSSValueListImpl)*/,'CSSValue|SVGColor|SVGPaint|SVGPaint|CSSPrimitiveValue|SVGColor|SVGPaint|SVGPaint|CSSPrimitiveValue'].join('|')],
    ['CharacterData', v14/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v13/*class(_DocumentImpl)*/],
    ['DocumentFragment', v12/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v5/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v6/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v7/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v8/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v9/*class(_MediaElementImpl)*/],
    ['Element', v11/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v10/*class(_UIEventImpl)*/,v10/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamTrackEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|IDBUpgradeNeededEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v16/*class(_NodeImpl)*/],
    ['MediaStream', v17/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v18/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v15/*class(_WorkerContextImpl)*/,v16/*class(_NodeImpl)*/,v17/*class(_MediaStreamImpl)*/,v18/*class(_IDBRequestImpl)*/,v19/*class(_AbstractWorkerImpl)*/,v15/*class(_WorkerContextImpl)*/,v16/*class(_NodeImpl)*/,v17/*class(_MediaStreamImpl)*/,v18/*class(_IDBRequestImpl)*/,v19/*class(_AbstractWorkerImpl)*/,'EventTarget|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext|DOMWindow|WebSocket|WebKitNamedFlow|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|SourceBufferList|SVGElementInstance|RTCPeerConnection|Performance|PeerConnection00|Notification|MessagePort|MediaStreamTrackList|MediaStreamTrack|MediaSource|MediaController|IDBTransaction|IDBDatabase|XMLHttpRequestUpload|XMLHttpRequest|FileWriter|FileReader|EventSource|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
