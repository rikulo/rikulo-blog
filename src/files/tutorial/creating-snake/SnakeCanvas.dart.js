function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
 }
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_value", "_isComplete"],
 super: "Object",
 transform$1: function(transformation) {
  var completer = $.CompleterImpl$();
  this.handleException$1(new $.FutureImpl_transform_anon(this, completer));
  this.then$1(new $.FutureImpl_transform_anon0(completer, transformation));
  return completer.get$future();
 },
 get$transform: function() { return new $.BoundClosure(this, 'transform$1'); },
 _setException$2: function(exception, stackTrace) {
  if (exception == null) throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  try {
    var t1 = this._exception;
    if (!(t1 == null)) {
      for (t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true; ) {
        var handler = t1.next$0();
        if ($.eqB(handler.$call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    }
    if (this.get$hasValue() === true) {
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true; ) {
        var listener = t1.next$0();
        listener.$call$1(this.get$value());
      }
    } else {
      if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0)) throw $.captureStackTrace(this._exception);
    }
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true; ) {
      var listener0 = t1.next$0();
      try {
        listener0.$call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null)) this._exceptionHandled = onException.$call$1(t1);
  } else $.add$1(this._exceptionHandlers, onException);
 },
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true) onSuccess.$call$1(this.get$value());
  else {
    if (this.get$isComplete() !== true) $.add$1(this._successListeners, onSuccess);
    else {
      if (this._exceptionHandled !== true) throw $.captureStackTrace(this._exception);
    }
  }
 },
 get$hasValue: function() {
  if (this.get$isComplete() === true) {
    var t1 = this._exception;
    t1 = t1 == null;
  } else t1 = false;
  return t1;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$stackTrace: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
 },
 get$exception: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._exception;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null)) throw $.captureStackTrace(t1);
  return this._value;
 }
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
 },
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.i_10 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    !(key == null) && !(key === $.CTC3) && f.$call$2(key, $.index(this._values, i));
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if (typeof index !== 'number') return this.remove$1$bailout(1, index, 0, 0);
  if (index >= 0) {
    var t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.remove$1$bailout(2, index, t1, 0);
    this._numberOfEntries = t1 - 1;
    var t2 = this._values;
    if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.remove$1$bailout(3, index, t2, 0);
    if (index !== (index | 0)) throw $.iae(index);
    var t3 = t2.length;
    if (index < 0 || index >= t3) throw $.ioore(index);
    var t4 = t2[index];
    if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this.remove$1$bailout(4, t4, index, t2);
    var t5 = t2.length;
    if (index < 0 || index >= t5) throw $.ioore(index);
    t2[index] = null;
    t2 = this._keys;
    if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this.remove$1$bailout(5, t4, index, t2);
    var t6 = t2.length;
    if (index < 0 || index >= t6) throw $.ioore(index);
    t2[index] = $.CTC3;
    t2 = this._numberOfDeleted;
    if (typeof t2 !== 'number') return this.remove$1$bailout(6, t2, t4, 0);
    this._numberOfDeleted = t2 + 1;
    return t4;
  }
  return;
 },
 remove$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      index = env0;
      break;
    case 2:
      index = env0;
      t1 = env1;
      break;
    case 3:
      index = env0;
      t2 = env1;
      break;
    case 4:
      value = env0;
      index = env1;
      t2 = env2;
      break;
    case 5:
      value = env0;
      index = env1;
      t2 = env2;
      break;
    case 6:
      t2 = env0;
      value = env1;
      break;
  }
  switch (state) {
    case 0:
      var index = this._probeForLookup$1(key);
    case 1:
      state = 0;
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      if (state == 2 || state == 3 || state == 4 || state == 5 || state == 6 || (state == 0 && $.geB(index, 0))) {
        switch (state) {
          case 0:
            var t1 = this._numberOfEntries;
          case 2:
            state = 0;
            this._numberOfEntries = $.sub(t1, 1);
            var t2 = this._values;
          case 3:
            state = 0;
            var value = $.index(t2, index);
            t2 = this._values;
          case 4:
            state = 0;
            $.indexSet(t2, index, null);
            t2 = this._keys;
          case 5:
            state = 0;
            $.indexSet(t2, index, $.CTC3);
            t2 = this._numberOfDeleted;
          case 6:
            state = 0;
            this._numberOfDeleted = $.add(t2, 1);
            return value;
        }
      }
      return;
  }
 },
 putIfAbsent$2: function(key, ifAbsent) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) return $.index(this._values, index);
  var value = ifAbsent.$call$0();
  this.operator$indexSet$2(key, value);
  return value;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if (typeof index !== 'number') return this.operator$index$1$bailout(1, index, 0);
  if (index < 0) return;
  var t1 = this._values;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(2, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
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
      if ($.ltB(index, 0)) return;
      var t1 = this._values;
    case 2:
      state = 0;
      return $.index(t1, index);
  }
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  var t3 = t1[index];
  if (!(t3 == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t2 = t1.length;
    if (index < 0 || index >= t2) throw $.ioore(index);
    t1 = t1[index];
    t1 = t1 === $.CTC3;
  } else t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number') return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  t3 = t1.length;
  if (index < 0 || index >= t3) throw $.ioore(index);
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
      t1 = $.index(t1, index);
    case 2:
      if (state == 2 || (state == 0 && !(t1 == null))) {
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            t1 = $.index(t1, index);
            t1 = t1 === $.CTC3;
        }
      } else {
        t1 = true;
      }
    case 3:
      if (state == 3 || (state == 0 && t1)) {
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
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
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
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
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || (oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || (oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))) return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t1 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
  for (var i = 0; i < capacity; ++i) {
    t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 == null || t2 === $.CTC3) continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t3 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t3);
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
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t1 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t1, ({E: 'V'}));
      this._values = t1;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC3) continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  $.gtB(this._numberOfDeleted, numberOfFree) && this._grow$1($.get$length(this._keys));
 },
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  for (var numberOfProbes = 1; true; ) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null) return -1;
    if ($.eqB(existingKey, key)) return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true; ) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t2 = t1.length;
    if (hash < 0 || hash >= t2) throw $.ioore(hash);
    t1 = t1[hash];
    if (t1 == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    if ($.eqB(t1, key)) return hash;
    if (insertionIndex < 0 && $.CTC3 === t1) insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
 },
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    case 2:
    case 3:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!true) break L0;
            var t1 = this._keys;
          case 2:
            state = 0;
            var existingKey = $.index(t1, hash);
            if (existingKey == null) {
              if ($.ltB(insertionIndex, 0)) return hash;
              return insertionIndex;
            }
            if ($.eqB(existingKey, key)) return hash;
            if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) insertionIndex = hash;
            var numberOfProbes0 = numberOfProbes + 1;
            hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
          case 3:
            state = 0;
            numberOfProbes = numberOfProbes0;
        }
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, ({E: 'V'}));
  this._values = t1;
 },
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var result = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  $.forEach(this._backingMap, new $.HashSetImplementation_filter__(result, f));
  return result;
 },
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.HashSetImplementation_addAll__(this));
 },
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true) return false;
  t1.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0)) throw $.iae(value);
  var t2 = t1.length;
  if (value < 0 || value >= t2) throw $.ioore(value);
  t1[value] = value;
 },
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
 },
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$) break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0)) throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
    entry = t1[t2];
  } while ((entry == null || entry === $.CTC3));
 },
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$)) break;
    entry = $.index(t1, this._nextValidIndex);
  } while ((entry == null || entry === $.CTC3));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC4);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._nextValidIndex;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  t2 = t1[t2];
  this._advance$0();
  return t2;
 },
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || (t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))) return this.hasNext$0$bailout(2, t1, t2);
  var t3 = t2.length;
  if (t1 >= t3) return false;
  if (t1 !== (t1 | 0)) throw $.iae(t1);
  if (t1 < 0 || t1 >= t3) throw $.ioore(t1);
  t1 = t2[t1];
  t1 === $.CTC3 && this._advance$0();
  t1 = this._nextValidIndex;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(3, t1, t2);
  return t1 < t2.length;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
    case 3:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._nextValidIndex;
    case 1:
      state = 0;
      var t2 = this._entries;
    case 2:
      state = 0;
      if ($.geB(t1, $.get$length(t2))) return false;
      t1 = $.index(t2, this._nextValidIndex);
      t1 === $.CTC3 && this._advance$0();
      t1 = this._nextValidIndex;
    case 3:
      state = 0;
      return $.lt(t1, $.get$length(t2));
  }
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
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
 },
 getValues$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t1.index_10 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
 },
 getKeys$0: function() {
  var t1 = ({});
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  var value = this.operator$index$1(key);
  var t1 = this.operator$index$1(key);
  if (t1 == null && this.containsKey$1(key) !== true) {
    value = ifAbsent.$call$0();
    this.operator$indexSet$2(key, value);
  }
  return value;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null) return;
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var t1 = this._map;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, key, t1);
  if (key !== (key | 0)) throw $.iae(key);
  var t2 = t1.length;
  if (key < 0 || key >= t2) throw $.ioore(key);
  t1 = t1[key];
  if (t1 == null) return;
  return t1.get$element().get$value();
 },
 operator$index$1$bailout: function(state, key, t1) {
  var entry = $.index(t1, key);
  if (entry == null) return;
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0)) throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2) throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0)) throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3) throw $.ioore(key);
    t1[key] = t2;
  }
 },
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true) $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: 'KeyValuePair<K, V>'}));
  this._list = t1;
 },
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
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
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  t1._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
 }
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC5);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC5);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
 },
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  return t1;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element()) === true && other.addLast$1(entry.get$_element());
    entry = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1); ) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry = nextEntry;
  }
 },
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
 },
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
 },
 get$length: function() {
  var t1 = ({});
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
 },
 first$0: function() {
  return this._sentinel.get$_next().get$element();
 },
 get$first: function() { return new $.BoundClosure0(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, ({E: 'E'}));
  this._sentinel = t1;
 },
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC4);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  var t1 = $.get$length(this._buffer);
  if (t1 === 0) return '';
  t1 = $.get$length(this._buffer);
  if (t1 === 1) return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  this._buffer = t1;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true) return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number') return this.add$1$bailout(1, str, t1);
  var t2 = $.get$length(str);
  if (typeof t2 !== 'number') return this.add$1$bailout(2, t1, t2);
  this._length = t1 + t2;
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
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true) return this;
      $.add$1(this._buffer, str);
      var t1 = this._length;
    case 1:
      state = 0;
      var t2 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t2);
      return this;
  }
 },
 isEmpty$0: function() {
  var t1 = this._length;
  return t1 === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null) return;
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_lib5_end", "_lib5_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  var t1 = this._groups;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.group$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 group$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 start$0: function() {
  return this._lib5_start;
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); }
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
 }
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true) return false;
  var t1 = this._next;
  if (!(t1 == null)) return true;
  this._next = this._re.firstMatch$1(this._str);
  t1 = this._next;
  if (t1 == null) {
    this._done = true;
    return false;
  }
  return true;
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC4);
  var next = this._next;
  this._next = null;
  return next;
 }
};

$$.DateImplementation = {"":
 ["isUtc?", "millisecondsSinceEpoch?"],
 super: "Object",
 _asJs$0: function() {
  return $.Primitives_lazyAsJsDate(this);
 },
 add$1: function(duration) {
  var ms = this.millisecondsSinceEpoch;
  if (typeof ms !== 'number') return this.add$1$bailout(1, duration, ms);
  var t1 = duration.get$inMilliseconds();
  if (typeof t1 !== 'number') return this.add$1$bailout(2, ms, t1);
  return $.DateImplementation$fromMillisecondsSinceEpoch(ms + t1, this.isUtc);
 },
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var duration = env0;
      ms = env1;
      break;
    case 2:
      ms = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var ms = this.millisecondsSinceEpoch;
    case 1:
      state = 0;
      var t1 = duration.get$inMilliseconds();
    case 2:
      state = 0;
      return $.DateImplementation$fromMillisecondsSinceEpoch($.add(ms, t1), this.isUtc);
  }
 },
 toString$0: function() {
  var t1 = new $.DateImplementation_toString_fourDigits();
  var t2 = new $.DateImplementation_toString_threeDigits();
  var t3 = new $.DateImplementation_toString_twoDigits();
  var y = t1.$call$1(this.get$year());
  var m = t3.$call$1(this.get$month());
  var d = t3.$call$1(this.get$day());
  var h = t3.$call$1(this.get$hour());
  var min = t3.$call$1(this.get$minute());
  var sec = t3.$call$1(this.get$second());
  var ms = t2.$call$1(this.get$millisecond());
  if (this.isUtc === true) return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms) + 'Z';
  return $.S(y) + '-' + $.S(m) + '-' + $.S(d) + ' ' + $.S(h) + ':' + $.S(min) + ':' + $.S(sec) + '.' + $.S(ms);
 },
 get$millisecond: function() {
  return $.Primitives_getMilliseconds(this);
 },
 get$second: function() {
  return $.Primitives_getSeconds(this);
 },
 get$minute: function() {
  return $.Primitives_getMinutes(this);
 },
 get$hour: function() {
  return $.Primitives_getHours(this);
 },
 get$day: function() {
  return $.Primitives_getDay(this);
 },
 get$month: function() {
  return $.Primitives_getMonth(this);
 },
 get$year: function() {
  return $.Primitives_getYear(this);
 },
 hashCode$0: function() {
  return this.millisecondsSinceEpoch;
 },
 compareTo$1: function(other) {
  return $.compareTo(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$ge$1: function(other) {
  return $.ge(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$gt$1: function(other) {
  return $.gt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$le$1: function(other) {
  return $.le(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$lt$1: function(other) {
  return $.lt(this.millisecondsSinceEpoch, other.get$millisecondsSinceEpoch());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object' && other !== null) && !!other.is$DateImplementation)) return false;
  return $.eq(this.millisecondsSinceEpoch, other.millisecondsSinceEpoch);
 },
 DateImplementation$fromMillisecondsSinceEpoch$2: function(millisecondsSinceEpoch, isUtc) {
  var t1 = this.millisecondsSinceEpoch;
  if ($.gtB($.abs(t1), 8640000000000000)) throw $.captureStackTrace($.IllegalArgumentException$(t1));
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  var value = (this.list[this.i]);
  this.i = this.i + 1;
  return value;
 },
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1);
  return t1 < (this.list.length);
 },
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, (this.list.length));
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
 ["_lib1_keys?", "_jsObject", "length?"],
 super: "Object",
 clear$0: function() {
  return this._throwImmutable$0();
 },
 remove$1: function(key) {
  return this._throwImmutable$0();
 },
 putIfAbsent$2: function(key, ifAbsent) {
  return this._throwImmutable$0();
 },
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
 },
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC29);
 },
 toString$0: function() {
  return $.Maps_mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var result = [];
  $.forEach(this._lib1_keys, new $.ConstantMap_getValues_anon(this, result));
  return result;
 },
 getKeys$0: function() {
  return this._lib1_keys;
 },
 forEach$1: function(f) {
  $.forEach(this._lib1_keys, new $.ConstantMap_forEach_anon(this, f));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) return;
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) return false;
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib1_start"],
 super: "Object",
 group$1: function(group_) {
  if (typeof group_ !== 'number') return this.group$1$bailout(1, group_);
  if (!(group_ === 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 group$1$bailout: function(state, group_) {
  if (!$.eqB(group_, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._lib1_start;
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); }
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
 }
};

$$.IndexOutOfRangeException = {"":
 ["_index"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._index);
 }
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(1, sb, t1);
  var i = 0;
  for (; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.toString$0$bailout(2, t1, sb);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    i > 0 && sb.add$1(', ');
    t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
 },
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      sb = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      sb = env1;
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
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null) return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      var actualParameters = sb.toString$0();
      sb = $.StringBufferImpl$('');
      for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
        i > 0 && sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      var formalParameters = sb.toString$0();
      t1 = this._functionName;
      return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
  }
 }
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
 }
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
 }
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
 }
};

$$.BadNumberFormatException = {"":
 ["_s"],
 super: "Object",
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.S(this._s) + '\'';
 }
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null) return this.get$exceptionName();
  return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
 }
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
 }
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
 }
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
 }
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
 }
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
 }
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
 }
};

$$.SnakeCanvas = {"":
 ["right?", "left=", "down", "up", "canvas?", "ctx2d?", "_score", "scoreBar", "environment?", "lastCycle=", "width?", "height?", "UPDATE?", "_container", "_dlgInfos", "_mainView", "_title"],
 super: "Activity",
 onKeyDown$1: function(event$) {
  if ($.eqB(event$.get$keyCode(), 37)) this.environment.get$snake().set$direction(-1);
  else {
    if ($.eqB(event$.get$keyCode(), 39)) this.environment.get$snake().set$direction(1);
    else {
      if ($.eqB(event$.get$keyCode(), 38)) this.environment.get$snake().set$direction(-2);
      else {
        $.eqB(event$.get$keyCode(), 40) && this.environment.get$snake().set$direction(2);
      }
    }
  }
  event$.preventDefault$0();
 },
 get$onKeyDown: function() { return new $.BoundClosure(this, 'onKeyDown$1'); },
 gameOverDialog$0: function() {
  var dlg = $.TextView$('Game Over, your score was ' + $.S(this.get$score()));
  dlg.get$style().set$cssText('text-align: center; padding-top: 20px');
  dlg.get$profile().set$text('location: center center;width:30%;height:20%');
  $.add$1(dlg.get$classes(), 'v-dialog');
  $.add$1(dlg.get$on().get$click(), new $.SnakeCanvas_gameOverDialog_anon(this));
  this.addDialog$1(dlg);
 },
 startGame$0: function() {
  this.set$score(0);
  this.environment = $.SnakeEnvironment$(this.height, this.width);
  $._Animator$().add$1(new $.SnakeCanvas_startGame_anon(this));
 },
 _gestureEnd$0: function() {
  return new $.SnakeCanvas__gestureEnd_anon();
 },
 _gestureMove$0: function() {
  return new $.SnakeCanvas__gestureMove_anon(this);
 },
 onCreate_$0: function() {
  this.set$title('Snake');
  this.get$mainView().set$width(572);
  this.get$mainView().set$height(396);
  this.get$mainView().get$style().set$backgroundImage('url(\'http://blog.rikulo.org/static/files/tutorial/creating-snake/res/snake_bg.png\')');
  var vlayout = $.View$();
  vlayout.get$layout().set$type('linear');
  vlayout.get$layout().set$orient('vertical');
  var t1 = this.get$mainView();
  vlayout.get$profile().set$anchorView(t1);
  vlayout.get$profile().set$location('center center');
  this.canvas = $.Canvas$();
  t1 = 'width: ' + $.S(this.width) + '; height: ' + $.S(this.height);
  this.canvas.get$profile().set$text(t1);
  this.canvas.get$style().set$border('1px solid black');
  vlayout.addChild$1(this.canvas);
  this.scoreBar = $.TextView$('Your score is: ' + $.S(this.get$score()));
  this.scoreBar.get$profile().set$width('flex');
  this.scoreBar.get$profile().set$height('30');
  vlayout.addChild$1(this.scoreBar);
  this.get$mainView().addChild$1(vlayout);
  this.ctx2d = this.canvas.get$context2D();
  t1 = this.canvas.get$node();
  var t2 = this._gestureMove$0();
  $._DragGesture__DragGesture(t1, null, false, null, -1, null, this._gestureEnd$0(), t2);
  $.add$1($.document().get$on().get$keyDown(), this.get$onKeyDown());
  this.startGame$0();
 },
 set$score: function(score) {
  this._score = score;
  var t1 = 'Your score is: ' + $.S(score);
  this.scoreBar.set$text(t1);
 },
 get$score: function() {
  return this._score;
 }
};

$$.SnakePoint = {"":
 ["y=", "x="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.x) + ', ' + $.S(this.y) + ')';
 }
};

$$.SnakeEnvironment = {"":
 ["food", "snake?", "width=", "height="],
 super: "Object",
 draw$1: function(context) {
  var t1 = this.food;
  t1.draw$1(context);
  var t2 = this.snake;
  var grown = t2.act$2(context, t1);
  var head = t2.head$0();
  var t3 = head.get$x();
  if (typeof t3 !== 'number') return this.draw$1$bailout(1, head, t1, t2, t3, grown, 0);
  var t4 = this.width;
  if (typeof t4 !== 'number') return this.draw$1$bailout(2, grown, head, t1, t2, t3, t4);
  if (!(t3 >= t4)) {
    t3 = head.get$x();
    if (typeof t3 !== 'number') return this.draw$1$bailout(3, head, t1, t2, t3, grown, 0);
    t3 = t3 < 0;
  } else t3 = true;
  if (!t3) {
    t3 = head.get$y();
    if (typeof t3 !== 'number') return this.draw$1$bailout(4, head, t3, t1, t2, grown, 0);
    t4 = this.height;
    if (typeof t4 !== 'number') return this.draw$1$bailout(5, t4, t3, grown, head, t1, t2);
    if (!(t3 >= t4)) {
      t3 = head.get$y();
      if (typeof t3 !== 'number') return this.draw$1$bailout(6, t1, t2, t3, grown, 0, 0);
      t3 = t3 < 0;
    } else t3 = true;
  } else t3 = true;
  if (t3) return 1;
  if (grown === true) {
    t1.relocate$1(t2.body);
    return 0;
  }
  return 2;
 },
 draw$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      head = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      grown = env4;
      break;
    case 2:
      grown = env0;
      head = env1;
      t1 = env2;
      t2 = env3;
      t3 = env4;
      t4 = env5;
      break;
    case 3:
      head = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      grown = env4;
      break;
    case 4:
      head = env0;
      t3 = env1;
      t1 = env2;
      t2 = env3;
      grown = env4;
      break;
    case 5:
      t4 = env0;
      t3 = env1;
      grown = env2;
      head = env3;
      t1 = env4;
      t2 = env5;
      break;
    case 6:
      t1 = env0;
      t2 = env1;
      t3 = env2;
      grown = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.food;
      t1.draw$1(context);
      var t2 = this.snake;
      var grown = t2.act$2(context, t1);
      var head = t2.head$0();
      var t3 = head.get$x();
    case 1:
      state = 0;
      var t4 = this.width;
    case 2:
      state = 0;
    case 3:
      if (state == 3 || (state == 0 && !$.geB(t3, t4))) {
        switch (state) {
          case 0:
            t3 = head.get$x();
          case 3:
            state = 0;
            t3 = $.ltB(t3, 0);
        }
      } else {
        t3 = true;
      }
    case 4:
    case 5:
    case 6:
      if (state == 4 || state == 5 || state == 6 || (state == 0 && !t3)) {
        switch (state) {
          case 0:
            t3 = head.get$y();
          case 4:
            state = 0;
            t4 = this.height;
          case 5:
            state = 0;
          case 6:
            if (state == 6 || (state == 0 && !$.geB(t3, t4))) {
              switch (state) {
                case 0:
                  t3 = head.get$y();
                case 6:
                  state = 0;
                  t3 = $.ltB(t3, 0);
              }
            } else {
              t3 = true;
            }
        }
      } else {
        t3 = true;
      }
      if (t3) return 1;
      if (grown === true) {
        t1.relocate$1(t2.get$body());
        return 0;
      }
      return 2;
  }
 },
 SnakeEnvironment$2: function(height, width) {
  var t1 = this.height;
  if (typeof t1 !== 'number') return this.SnakeEnvironment$2$bailout(1, t1);
  t1 = $.mod(t1, 10);
  if (t1 === 0) {
    t1 = this.width;
    if (typeof t1 !== 'number') return this.SnakeEnvironment$2$bailout(2, t1);
    t1 = $.mod(t1, 10);
    var t2 = !(t1 === 0);
    t1 = t2;
  } else t1 = true;
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$('Height & Width must be divisble by the adjustment (10) without a remainder'));
  this.snake = $.Snake$(this);
  this.food = $.Food$(this);
  this.food.relocate$1(this.snake.body);
 },
 SnakeEnvironment$2$bailout: function(state, env0) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this.height;
    case 1:
      state = 0;
    case 2:
      if (state == 2 || (state == 0 && $.eqB($.mod(t1, 10), 0))) {
        switch (state) {
          case 0:
            t1 = this.width;
          case 2:
            state = 0;
            var t2 = !$.eqB($.mod(t1, 10), 0);
            t1 = t2;
        }
      } else {
        t1 = true;
      }
      if (t1) throw $.captureStackTrace($.IllegalArgumentException$('Height & Width must be divisble by the adjustment (10) without a remainder'));
      this.snake = $.Snake$(this);
      this.food = $.Food$(this);
      this.food.relocate$1(this.snake.get$body());
  }
 }
};

$$.Food = {"":
 ["snakeEnvironment", "redraw", "_y", "_x"],
 super: "Object",
 toString$0: function() {
  return $.S(this._x) + ', ' + $.S(this._y);
 },
 draw$1: function(context) {
  context.beginPath$0();
  context.set$fillStyle('black');
  var t1 = this._x;
  if (typeof t1 !== 'number') return this.draw$1$bailout(1, context, t1, 0);
  context.rect$4(t1 + 3.3333333333333335, this._y, 3.3333333333333335, 3.3333333333333335);
  var t2 = this._x;
  var t3 = this._y;
  if (typeof t3 !== 'number') return this.draw$1$bailout(2, context, t3, t2);
  context.rect$4(t2, t3 + 3.3333333333333335, 3.3333333333333335, 3.3333333333333335);
  t2 = this._x;
  if (typeof t2 !== 'number') return this.draw$1$bailout(3, context, t2, 0);
  t2 += 6.666666666666667;
  var t4 = this._y;
  if (typeof t4 !== 'number') return this.draw$1$bailout(4, context, t2, t4);
  context.rect$4(t2, t4 + 3.3333333333333335, 3.3333333333333335, 3.3333333333333335);
  t2 = this._x;
  if (typeof t2 !== 'number') return this.draw$1$bailout(5, context, t2, 0);
  t2 += 3.3333333333333335;
  var t5 = this._y;
  if (typeof t5 !== 'number') return this.draw$1$bailout(6, context, t2, t5);
  context.rect$4(t2, t5 + 6.666666666666667, 3.3333333333333335, 3.3333333333333335);
  context.closePath$0();
  context.fill$0();
 },
 draw$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var context = env0;
      t1 = env1;
      break;
    case 2:
      context = env0;
      t3 = env1;
      t2 = env2;
      break;
    case 3:
      context = env0;
      t2 = env1;
      break;
    case 4:
      context = env0;
      t2 = env1;
      t4 = env2;
      break;
    case 5:
      context = env0;
      t2 = env1;
      break;
    case 6:
      context = env0;
      t2 = env1;
      t5 = env2;
      break;
  }
  switch (state) {
    case 0:
      context.beginPath$0();
      context.set$fillStyle('black');
      var t1 = this._x;
    case 1:
      state = 0;
      context.rect$4($.add(t1, 3.3333333333333335), this._y, 3.3333333333333335, 3.3333333333333335);
      var t2 = this._x;
      var t3 = this._y;
    case 2:
      state = 0;
      context.rect$4(t2, $.add(t3, 3.3333333333333335), 3.3333333333333335, 3.3333333333333335);
      t2 = this._x;
    case 3:
      state = 0;
      t2 = $.add(t2, 6.666666666666667);
      var t4 = this._y;
    case 4:
      state = 0;
      context.rect$4(t2, $.add(t4, 3.3333333333333335), 3.3333333333333335, 3.3333333333333335);
      t2 = this._x;
    case 5:
      state = 0;
      t2 = $.add(t2, 3.3333333333333335);
      var t5 = this._y;
    case 6:
      state = 0;
      context.rect$4(t2, $.add(t5, 6.666666666666667), 3.3333333333333335, 3.3333333333333335);
      context.closePath$0();
      context.fill$0();
  }
 },
 relocate$1: function(avoid) {
  var t1 = $.Math_random();
  if (typeof t1 !== 'number') return this.relocate$1$bailout(1, avoid, t1, 0, 0);
  var t2 = this.snakeEnvironment;
  var t3 = t2.get$width();
  if (typeof t3 !== 'number') return this.relocate$1$bailout(2, avoid, t1, t2, t3);
  var suggestedX = t1 * (t3 / 10 - 1);
  t1 = $.Math_random();
  if (typeof t1 !== 'number') return this.relocate$1$bailout(3, avoid, t1, t2, suggestedX);
  t2 = t2.get$height();
  if (typeof t2 !== 'number') return this.relocate$1$bailout(4, avoid, t1, t2, suggestedX);
  var suggestedY = t1 * (t2 / 10 - 1);
  t1 = $.floor(suggestedX);
  if (typeof t1 !== 'number') return this.relocate$1$bailout(5, avoid, suggestedY, t1, 0);
  suggestedX = t1 * 10;
  t1 = $.floor(suggestedY);
  if (typeof t1 !== 'number') return this.relocate$1$bailout(6, avoid, suggestedX, t1, 0);
  suggestedY = t1 * 10;
  for (t1 = $.iterator(avoid); has = false, t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    t3 = t2.get$x();
    if (suggestedX === t3) {
      t2 = t2.get$y();
      t2 = suggestedY === t2;
    } else t2 = false;
    if (t2) {
      has = true;
      break;
    }
  }
  if (has) this.relocate$1(avoid);
  else {
    this.set$x($.toInt(suggestedX));
    this.set$y($.toInt(suggestedY));
  }
  var has;
 },
 relocate$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var avoid = env0;
      t1 = env1;
      break;
    case 2:
      avoid = env0;
      t1 = env1;
      t2 = env2;
      t3 = env3;
      break;
    case 3:
      avoid = env0;
      t1 = env1;
      t2 = env2;
      suggestedX = env3;
      break;
    case 4:
      avoid = env0;
      t1 = env1;
      t2 = env2;
      suggestedX = env3;
      break;
    case 5:
      avoid = env0;
      suggestedY = env1;
      t1 = env2;
      break;
    case 6:
      avoid = env0;
      suggestedX = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.Math_random();
    case 1:
      state = 0;
      var t2 = this.snakeEnvironment;
      var t3 = t2.get$width();
    case 2:
      state = 0;
      var suggestedX = $.mul(t1, $.sub($.div(t3, 10), 1));
      t1 = $.Math_random();
    case 3:
      state = 0;
      t2 = t2.get$height();
    case 4:
      state = 0;
      var suggestedY = $.mul(t1, $.sub($.div(t2, 10), 1));
      t1 = $.floor(suggestedX);
    case 5:
      state = 0;
      suggestedX = $.mul(t1, 10);
      t1 = $.floor(suggestedY);
    case 6:
      state = 0;
      suggestedY = $.mul(t1, 10);
      for (t1 = $.iterator(avoid); has = false, t1.hasNext$0() === true; ) {
        t2 = t1.next$0();
        if ($.eqB(suggestedX, t2.get$x()) && $.eqB(suggestedY, t2.get$y())) {
          has = true;
          break;
        }
      }
      if (has) this.relocate$1(avoid);
      else {
        this.set$x($.toInt(suggestedX));
        this.set$y($.toInt(suggestedY));
      }
      var has;
  }
 },
 set$y: function(value) {
  this._y = value;
  this.redraw = true;
 },
 get$y: function() {
  return this._y;
 },
 set$x: function(value) {
  this._x = value;
  this.redraw = true;
 },
 get$x: function() {
  return this._x;
 }
};

$$.Snake = {"":
 ["snakeEnvironment", "initial", "body?", "_direction"],
 super: "Object",
 drawSnake$3: function(context, point, removed) {
  context.beginPath$0();
  context.set$fillStyle('black');
  !(removed == null) && context.clearRect$4(removed.get$x(), removed.get$y(), 10, 10);
  context.beginPath$0();
  context.moveTo$2($.add(point.get$x(), 3), point.get$y());
  context.lineTo$2($.sub($.add(point.get$x(), 10), 3), point.get$y());
  context.quadraticCurveTo$4($.add(point.get$x(), 10), point.get$y(), $.add(point.get$x(), 10), $.add(point.get$y(), 3));
  context.lineTo$2($.add(point.get$x(), 10), $.sub($.add(point.get$y(), 10), 3));
  context.quadraticCurveTo$4($.add(point.get$x(), 10), $.add(point.get$y(), 10), $.sub($.add(point.get$x(), 10), 3), $.add(point.get$y(), 10));
  context.lineTo$2($.add(point.get$x(), 3), $.add(point.get$y(), 10));
  context.quadraticCurveTo$4(point.get$x(), $.add(point.get$y(), 10), point.get$x(), $.sub($.add(point.get$y(), 10), 3));
  context.lineTo$2(point.get$x(), $.add(point.get$y(), 3));
  context.quadraticCurveTo$4(point.get$x(), point.get$y(), $.add(point.get$x(), 3), point.get$y());
  context.closePath$0();
  context.fill$0();
 },
 draw$2: function(context, removed) {
  this.drawSnake$3(context, $.last(this.body), removed);
 },
 act$2: function(context, food) {
  if (this.initial === true) {
    $.forEach(this.body, new $.Snake_act_anon(context, this));
    this.initial = false;
    return false;
  }
  var moveTo$ = this.nextMove$0();
  var grow = $.eqB(moveTo$.get$x(), food.get$x()) && $.eqB(moveTo$.get$y(), food.get$y());
  this.draw$2(context, this.move$2(moveTo$, grow));
  return grow;
 },
 move$2: function(to, grow) {
  if (grow !== true) {
    var t1 = this.body;
    var t2 = t1.length;
    if (0 < 0 || 0 >= t2) throw $.ioore(0);
    var removed = t1[0];
    $.removeRange(t1, 0, 1);
  } else removed = null;
  $.add$1(this.body, to);
  return removed;
 },
 nextMove$0: function() {
  var snakeHead = $.SnakePoint$(this.head$0().get$x(), this.head$0().get$y());
  switch (this._direction) {
    case -2:
      snakeHead.y = snakeHead.y - 10;
      break;
    case 2:
      snakeHead.y = snakeHead.y + 10;
      break;
    case -1:
      snakeHead.x = snakeHead.x - 10;
      break;
    case 1:
      snakeHead.x = snakeHead.x + 10;
      break;
  }
  return snakeHead;
 },
 head$0: function() {
  return $.last(this.body);
 },
 length$0: function() {
  return this.body.length;
 },
 get$length: function() { return new $.BoundClosure0(this, 'length$0'); },
 set$direction: function(value) {
  var t1 = this._direction;
  if (typeof value !== 'number') throw $.iae(value);
  t1 += value;
  if (!(t1 === 0)) this._direction = value;
 },
 Snake$1: function(snakeEnvironment) {
  this._direction = 1;
  this.body = [];
  for (var t1 = this.body, i = 0; i < 3; ++i) {
    $.addLast(t1, $.SnakePoint$(i * 10, 0));
  }
 }
};

$$._AbstractWorkerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AudioContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
};

$$._BatteryManagerEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._BodyElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$resize: function() {
  return this.operator$index$1('resize');
 },
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DOMApplicationCacheEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._DedicatedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DeprecatedPeerConnectionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._DocumentEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$.FilteredElementList = {"":
 ["_childNodes", "_lib_node"],
 super: "Object",
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  var t1 = this.get$_filtered();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, index, t1) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && result.remove$0();
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC46);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
 },
 addLast$1: function(value) {
  this.add$1(value);
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.BoundClosure(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) return;
  if ($.ltB(newLength, 0)) throw $.captureStackTrace($.CTC47);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element()) return t2;
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.ListFactory_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$.EmptyElementRect = {"":
 ["clientRects", "bounding", "scroll", "offset?", "client"],
 super: "Object"
};

$$._ChildrenElementList = {"":
 ["_childElements", "_lib_element?"],
 super: "Object",
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._lib_element.$dom_removeChild$1(result);
  return result;
 },
 clear$0: function() {
  this._lib_element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC46);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC46);
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._lib_element; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 addLast$1: function(value) {
  return this.add$1(value);
 },
 add$1: function(value) {
  this._lib_element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC45);
 },
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  var t1 = this._lib_element.get$$$dom_firstElementChild();
  return t1 == null;
 },
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
 },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this._toList$0$bailout(1, t1);
  var output = $.ListFactory_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    var t2 = t1.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = t1[i];
    var t4 = output.length;
    if (i < 0 || i >= t4) throw $.ioore(i);
    output[i] = t3;
  }
  return output;
 },
 _toList$0$bailout: function(state, t1) {
  var output = $.ListFactory_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    var t3 = output.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    output[i] = t2;
  }
  return output;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC45);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC45);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.CTC45);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC45);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC45);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC45);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC45);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC45);
 },
 operator$index$1: function(index) {
  var t1 = this._nodeList;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && out.add$1(t2);
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t1 = this.iterator$0(); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_lib_index", "_lib_list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this._lib_index;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = $.get$length(this._lib_list);
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 < t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_index;
    case 1:
      state = 0;
      var t2 = $.get$length(this._lib_list);
    case 2:
      state = 0;
      return $.lt(t1, t2);
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC4);
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._lib_index;
  this._lib_index = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, t1) {
  var t2 = this._lib_index;
  this._lib_index = t2 + 1;
  return $.index(t1, t2);
 }
};

$$._ElementList = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ElementAttributeMap = {"":
 ["_lib_element?"],
 super: "Object",
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._lib_element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getValues$0$bailout(1, attributes);
  var values = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$value();
    var t3 = values.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    values[i] = t2;
  }
  return values;
 },
 getValues$0$bailout: function(state, attributes) {
  var values = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    values[i] = t1;
  }
  return values;
 },
 getKeys$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.getKeys$0$bailout(1, attributes);
  var keys = $.ListFactory_List(attributes.length);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i].get$name();
    var t3 = keys.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    keys[i] = t2;
  }
  return keys;
 },
 getKeys$0$bailout: function(state, attributes) {
  var keys = $.ListFactory_List($.get$length(attributes));
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var t1 = $.index(attributes, i).get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
 },
 forEach$1: function(f) {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.forEach$1$bailout(1, f, attributes);
  for (var len = attributes.length, i = 0; i < len; ++i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = attributes[i];
    f.$call$2(t2.get$name(), t2.get$value());
  }
 },
 forEach$1$bailout: function(state, f, attributes) {
  for (var len = $.get$length(attributes), i = 0; $.ltB(i, len); ++i) {
    var item = $.index(attributes, i);
    f.$call$2(item.get$name(), item.get$value());
  }
 },
 clear$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object' || attributes === null || (attributes.constructor !== Array && !attributes.is$JavaScriptIndexingBehavior()))) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; --i) {
    var t1 = attributes.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, attributes) {
  for (var i = $.sub($.get$length(attributes), 1); $.geB(i, 0); i = $.sub(i, 1)) {
    this.remove$1($.index(attributes, i).get$name());
  }
 },
 remove$1: function(key) {
  var t1 = this._lib_element;
  var value = t1.$dom_getAttribute$1(key);
  t1.$dom_removeAttribute$1(key);
  return value;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  this.containsKey$1(key) !== true && this.operator$indexSet$2(key, ifAbsent.$call$0());
  return this.operator$index$1(key);
 },
 operator$indexSet$2: function(key, value) {
  this._lib_element.$dom_setAttribute$2(key, $.S(value));
 },
 operator$index$1: function(key) {
  return this._lib_element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._lib_element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
};

$$._DataAttributeMap = {"":
 ["$$dom_attributes?"],
 super: "Object",
 _strip$1: function(key) {
  return $.substring$1(key, 5);
 },
 _matches$1: function(key) {
  return $.startsWith(key, 'data-');
 },
 _attr$1: function(key) {
  return 'data-' + $.S(key);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this.getKeys$0());
 },
 getValues$0: function() {
  var values = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getValues_anon(this, values));
  return values;
 },
 getKeys$0: function() {
  var keys = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_getKeys_anon(this, keys));
  return keys;
 },
 forEach$1: function(f) {
  $.forEach(this.$$dom_attributes, new $._DataAttributeMap_forEach_anon(this, f));
 },
 clear$0: function() {
  for (var t1 = $.iterator(this.getKeys$0()); t1.hasNext$0() === true; ) {
    this.remove$1(t1.next$0());
  }
 },
 remove$1: function(key) {
  return this.$$dom_attributes.remove$1(this._attr$1(key));
 },
 putIfAbsent$2: function(key, ifAbsent) {
  return this.$$dom_attributes.putIfAbsent$2(this._attr$1(key), ifAbsent);
 },
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.$$dom_attributes, this._attr$1(key), $.S(value));
 },
 operator$index$1: function(key) {
  var t1 = this.$$dom_attributes;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, key, t1);
  var t2 = this._attr$1(key);
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 operator$index$1$bailout: function(state, key, t1) {
  return $.index(t1, this._attr$1(key));
 },
 containsKey$1: function(key) {
  return this.$$dom_attributes.containsKey$1(this._attr$1(key));
 },
 is$Map: function() { return true; }
};

$$._CssClassSet = {"":
 ["_lib_element?"],
 super: "Object",
 _formatSet$1: function(s) {
  return $.Strings_join($.ListFactory_List$from(s), ' ');
 },
 _write$1: function(s) {
  var t1 = this._formatSet$1(s);
  this._lib_element.set$$$dom_className(t1);
 },
 _classname$0: function() {
  return this._lib_element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t1 = $.iterator($.split(this._classname$0(), ' ')); t1.hasNext$0() === true; ) {
    var trimmed = $.trim(t1.next$0());
    $.isEmpty(trimmed) !== true && s.add$1(trimmed);
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $._CssClassSet_clear_anon());
 },
 addAll$1: function(collection) {
  this._modify$1(new $._CssClassSet_addAll_anon(collection));
 },
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
 },
 add$1: function(value) {
  this._modify$1(new $._CssClassSet_add_anon(value));
 },
 contains$1: function(value) {
  return $.contains$1(this._read$0(), value);
 },
 get$length: function() {
  return $.get$length(this._read$0());
 },
 isEmpty$0: function() {
  return $.isEmpty(this._read$0());
 },
 filter$1: function(f) {
  return $.filter(this._read$0(), f);
 },
 forEach$1: function(f) {
  $.forEach(this._read$0(), f);
 },
 iterator$0: function() {
  return $.iterator(this._read$0());
 },
 toString$0: function() {
  return this._formatSet$1(this._read$0());
 },
 is$Collection: function() { return true; }
};

$$._SimpleClientRect = {"":
 ["height?", "width?", "top?", "left?"],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ', ' + $.S(this.width) + ', ' + $.S(this.height) + ')';
 },
 operator$eq$1: function(other) {
  return !(other == null) && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
 },
 get$bottom: function() {
  return $.add(this.top, this.height);
 },
 get$right: function() {
  return $.add(this.left, this.width);
 }
};

$$._ElementRectImpl = {"":
 ["_clientRects", "_boundingClientRect", "scroll", "offset?", "client"],
 super: "Object"
};

$$._ElementEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._EventSourceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
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
 ["_lib_type", "_ptr?"],
 super: "Object",
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._lib_type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._lib_type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
};

$$._FileReaderEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FileWriterEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._FrameSetElementEventsImpl = {"":
 ["_ptr"],
 super: "_ElementEventsImpl",
 get$resize: function() {
  return this.operator$index$1('resize');
 },
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._IDBDatabaseEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._IDBTransactionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$complete: function() {
  return this.operator$index$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
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

$$._MessagePortEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 operator$index$1: function(index) {
  var t1 = this._this.get$$$dom_childNodes();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, index, t1) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._this.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true; ) {
    t2.$dom_appendChild$1(t1.next$0());
  }
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 get$first: function() {
  return $.index(this._lib_list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 insertRange$3: function(start, rangeLength, initialValue) {
  return $.insertRange$3(this._lib_list, start, rangeLength, initialValue);
 },
 removeRange$2: function(start, rangeLength) {
  return $.removeRange(this._lib_list, start, rangeLength);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._lib_list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._lib_list);
 },
 removeLast$0: function() {
  return $.removeLast(this._lib_list);
 },
 clear$0: function() {
  return $.clear(this._lib_list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._lib_list, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 addAll$1: function(collection) {
  return $.addAll(this._lib_list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._lib_list, value);
 },
 add$1: function(value) {
  return $.add$1(this._lib_list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._lib_list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._lib_list, index, value);
 },
 operator$index$1: function(index) {
  var t1 = this._lib_list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, t1, index);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index];
 },
 operator$index$1$bailout: function(state, t1, index) {
  return $.index(t1, index);
 },
 get$length: function() {
  return $.get$length(this._lib_list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._lib_list);
 },
 filter$1: function(f) {
  return $.filter(this._lib_list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._lib_list, f);
 },
 iterator$0: function() {
  return $.iterator(this._lib_list);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_lib_list"],
 super: "_ListWrapper",
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._lib_list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._lib_list, f));
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NotificationEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._PeerConnection00EventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._AttributeClassSet = {"":
 ["_lib_element"],
 super: "_CssClassSet",
 _write$1: function(s) {
  $.indexSet(this._lib_element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._lib_element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.BoundClosure0(this, '$dom_className$0'); }
};

$$._SVGElementInstanceEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$resize: function() {
  return this.operator$index$1('resize');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._SharedWorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_WorkerContextEventsImpl"
};

$$._SpeechRecognitionEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
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
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._WindowEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl",
 get$touchStart: function() {
  return this.operator$index$1('touchstart');
 },
 get$touchMove: function() {
  return this.operator$index$1('touchmove');
 },
 get$touchEnd: function() {
  return this.operator$index$1('touchend');
 },
 get$resize: function() {
  return this.operator$index$1('resize');
 },
 get$reset: function() {
  return this.operator$index$1('reset');
 },
 reset$0: function() { return this.get$reset().$call$0(); },
 get$mouseUp: function() {
  return this.operator$index$1('mouseup');
 },
 get$mouseMove: function() {
  return this.operator$index$1('mousemove');
 },
 get$mouseDown: function() {
  return this.operator$index$1('mousedown');
 },
 get$message: function() {
  return this.operator$index$1('message');
 },
 get$keyDown: function() {
  return this.operator$index$1('keydown');
 },
 get$deviceOrientation: function() {
  return this.operator$index$1('deviceorientation');
 },
 get$click: function() {
  return this.operator$index$1('click');
 }
};

$$._WorkerEventsImpl = {"":
 ["_ptr"],
 super: "_AbstractWorkerEventsImpl",
 get$message: function() {
  return this.operator$index$1('message');
 }
};

$$._WorkerContextEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._XMLHttpRequestUploadEventsImpl = {"":
 ["_ptr"],
 super: "_EventsImpl"
};

$$._MeasurementRequest = {"":
 ["exception=", "value=", "completer?", "computeValue"],
 super: "Object",
 computeValue$0: function() { return this.computeValue.$call$0(); }
};

$$._DOMWindowCrossFrameImpl = {"":
 ["_window"],
 super: "Object",
 postMessage$3: function(message, targetOrigin, messagePorts) {
  var t1 = messagePorts == null;
  var t2 = this._window;
  if (t1) $._DOMWindowCrossFrameImpl__postMessage2(t2, message, targetOrigin);
  else $._DOMWindowCrossFrameImpl__postMessage3(t2, message, targetOrigin, messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,null)
},
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__top(this._window));
 },
 get$parent: function() {
  return $._DOMWindowCrossFrameImpl__createSafe($._DOMWindowCrossFrameImpl__parent(this._window));
 },
 is$Window: function() { return true; }
};

$$._IDBOpenDBRequestEventsImpl = {"":
 ["_ptr"],
 super: "_IDBRequestEventsImpl"
};

$$._LocationWrapper = {"":
 ["_ptr?"],
 super: "Object",
 toString$0: function() {
  return $._LocationWrapper__toString(this._ptr);
 },
 is$_LocationWrapper: true,
 is$Location: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t1, t2);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t2 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.CTC4);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.next$0$bailout(1, t1);
  var t2 = this._pos;
  this._pos = t2 + 1;
  if (t2 !== (t2 | 0)) throw $.iae(t2);
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
  return t1[t2];
 },
 next$0$bailout: function(state, t1) {
  var t2 = this._pos;
  this._pos = t2 + 1;
  return $.index(t1, t2);
 },
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number') return this.hasNext$0$bailout(1, t1, 0);
  var t2 = this._pos;
  if (typeof t2 !== 'number') return this.hasNext$0$bailout(2, t2, t1);
  return t1 > t2;
 },
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t2 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t2 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t2);
  }
 }
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
 },
 reset$0: function() {
 },
 operator$indexSet$2: function(object, info) {
 },
 operator$index$1: function(object) {
  return;
 }
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List())) return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map()) return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort) return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync) return this.visitSendPortSync$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
 },
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x) === true) return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
 }
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = ({});
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null)) return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  $.forEach(map, new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null)) return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
 },
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null)) return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || (list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))) return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    result[i] = t2;
  }
  return result;
 },
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null)) return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || (keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || (values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))) return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
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
      for (var i = 0; $.ltB(i, len); ++i) {
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      }
      return result;
  }
 },
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || ((dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())) return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
 },
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i) {
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  }
  return dartList;
 },
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
 },
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
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
      throw $.captureStackTrace('Unexpected serialized object');
  }
 },
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x) === true) return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
 }
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  $.isEmpty(this.isolates) === true && this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
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
 ["isolateStatics", "ports?", "id="],
 super: "Object",
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.$call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    !(t1 == null) && t1._setGlobals$0();
  }
  return result;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
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
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) this._runHelper$0();
  else {
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }
  }
 },
 _runHelper$0: function() {
  var t1 = $._window();
  if (!(t1 == null)) new $._EventLoop__runHelper_next(this).$call$0();
  else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true) $._globalState().maybeCloseWorker$0();
    else {
      var t1 = $._globalState().get$rootContext();
      if (!(t1 == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true) throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    }
    return false;
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true) return;
  return t1.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
 }
};

$$._IsolateEvent = {"":
 ["message?", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 set$id: function(i) {
  throw $.captureStackTrace($.NotImplementedException$(null));
 },
 get$id: function() {
  return 0;
 }
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_NativeJsSendPort) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_WorkerSendPort) && !((typeof replyTo === 'object' && replyTo !== null) && !!replyTo.is$_BufferingSendPort)) throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
 },
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_lib8_id();
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
 },
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId?", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  var t1 = this._workerId << 16 ^ this._isolateId << 8;
  var t2 = this._receivePortId;
  if (typeof t2 !== 'number') throw $.iae(t2);
  return (t1 ^ t2) >>> 0;
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort && $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other.get$_isolateId()) && $.eqB(this._receivePortId, other.get$_receivePortId());
 },
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
 },
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  if (typeof port === 'object' && port !== null && !!port.is$_BufferingSendPort) {
    var t1 = port.get$_port();
    t1 = t1 == null;
  } else t1 = false;
  t1 && $.add$1(this.ports, port.get$_futurePort());
 },
 visitMap$1: function(map) {
  var t1 = this._visited;
  var seen = $.index(t1, map);
  if (!(seen == null)) return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
 },
 visitList$1: function(list) {
  var t1 = this._visited;
  var seen = $.index(t1, list);
  if (!(seen == null)) return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
 },
 visitPrimitive$1: function(x) {
 },
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  var t1 = port.get$_port();
  if (!(t1 == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_lib8_id()];
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
 },
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
 }
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  var t1 = port.get$_port();
  if (!(t1 == null)) return this.visitSendPort$1(port.get$_port());
  throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port.get$_receivePort(), port.get$_isolateId());
 },
 visitSendPort$1: function(x) {
  if (typeof x === 'object' && x !== null && !!x.is$_NativeJsSendPort) return this.visitNativeJsSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_WorkerSendPort) return this.visitWorkerSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$_BufferingSendPort) return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
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
    if (isolate == null) return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  }
  return $._WorkerSendPort$(managerId, isolateId, receivePortId);
 }
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number') return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i) {
    this._clearAttachedInfo$1($.index(this.tagged, i));
  }
  this.tagged = null;
 },
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
 },
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
 },
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
 }
};

$$.Activity = {"":
 ["_mainView?"],
 super: "Object",
 onCreate_$0: function() {
 },
 set$title: function(title) {
  var t1 = !(title == null) ? title : '';
  this._title = t1;
  $.document().set$title(t1);
 },
 updateSize$0: function() {
  var t1 = this._container;
  var qcave = $.DOMQuery_DOMQuery(!(t1 == null) ? t1 : $.window());
  t1 = qcave.get$innerWidth();
  $.browser.get$size().set$width(t1);
  t1 = qcave.get$innerHeight();
  $.browser.get$size().set$height(t1);
  t1 = this.get$mainView();
  if (!(t1 == null)) {
    t1 = !$.eqB(this.get$mainView().get$width(), $.browser.get$size().get$width()) || !$.eqB(this.get$mainView().get$height(), $.browser.get$size().get$height());
  } else t1 = false;
  if (t1) {
    t1 = $.browser.get$size().get$width();
    this.get$mainView().set$width(t1);
    t1 = $.browser.get$size().get$height();
    this.get$mainView().set$height(t1);
    this.get$mainView().requestLayout$0();
  }
  for (t1 = $.iterator(this._dlgInfos); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    t2.resizeMask$0();
    t2.get$dialog().requestLayout$0();
  }
 },
 _init$1: function(containerId) {
  this._container = !(containerId == null) ? $.document().query$1('#' + $.S(containerId)) : null;
  var t1 = this._container;
  var clses = !(t1 == null) ? t1.get$classes() : $.document().get$body().get$classes();
  $.add$1(clses, 'rikulo');
  $.add$1(clses, $.browser.get$name());
  if ($.browser.get$ios() === true) $.add$1(clses, 'ios');
  else {
    $.browser.get$android() === true && $.add$1(clses, 'android');
  }
  t1 = this._container;
  !(t1 == null) && this.updateSize$0();
  this._mainView = $.Section$();
  t1 = $.browser.get$size().get$width();
  this._mainView.set$width(t1);
  t1 = $.browser.get$size().get$height();
  this._mainView.set$height(t1);
  this._mainView.get$style().set$overflow('hidden');
  t1 = this._mainView;
  var t2 = this._container;
  t1.addToDocument$1(!(t2 == null) ? t2 : $.document().get$body());
  t1 = $.browser.get$mobile() === true || $.application().get$inSimulator() === true ? $.window().get$on().get$deviceOrientation() : $.window().get$on().get$resize();
  $.add$1(t1, new $.Activity__init_anon(this));
  t1 = $.browser.get$touch() === true ? $.document().get$on().get$touchStart() : $.document().get$on().get$mouseDown();
  $.add$1(t1, new $.Activity__init_anon0());
 },
 run$1: function(containerId) {
  var t1 = $.activity;
  if (!(t1 == null)) throw $.captureStackTrace($.CTC);
  t1 = this._mainView;
  if (!(t1 == null)) throw $.captureStackTrace($.CTC0);
  $.activity = this;
  $.application()._ready$1(new $.Activity_run_anon(this, containerId));
 },
 run$0: function() {
  return this.run$1('v-main')
},
 run$0: function() {
  return this.run$1('v-main')
},
 get$container: function() {
  return this._container;
 },
 removeDialog$2: function(dialog, effect) {
  if (dialog == null) {
    var t1 = this._dlgInfos;
    if ($.isEmpty(t1) === true) throw $.captureStackTrace($.CTC52);
    var t2 = t1.length;
    if (0 < 0 || 0 >= t2) throw $.ioore(0);
    var dlgInfo = t1[0];
    $.removeRange(t1, 0, 1);
  } else {
    t1 = this._dlgInfos;
    var j = t1.length;
    for (dlgInfo = null; true; ) {
      --j;
      if (j < 0) return false;
      t2 = t1.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      dlgInfo = t1[j];
      if ($.eqB(dialog, dlgInfo.get$dialog())) {
        $.removeRange(t1, j, 1);
        break;
      }
    }
  }
  var parent$ = dlgInfo.get$dialog().get$node().get$parent();
  dlgInfo.get$dialog().removeFromDocument$0();
  dlgInfo.removeMask$0();
  parent$.remove$0();
  $.broadcaster().sendEvent$1($.PopupEvent$(null, 'popup'));
  return true;
 },
 removeDialog$0: function() {
  return this.removeDialog$2(null,null)
},
 addDialog$3: function(dialog, effect, maskClass) {
  if (dialog.get$inDocument() === true) throw $.captureStackTrace($.UIException$('Can\'t be in document: ' + $.S(dialog)));
  var dlgInfo = $._DialogInfo$(dialog, maskClass);
  $.insertRange$3(this._dlgInfos, 0, 1, dlgInfo);
  var parent$ = $._Elements_DivElement();
  parent$.get$style().set$position('relative');
  $.add$1(this._mainView.get$node().get$parent().get$nodes(), parent$);
  dlgInfo.createMask$1(parent$);
  dlgInfo.dialog.addToDocument$1(parent$);
  $.broadcaster().sendEvent$1($.PopupEvent$(dialog, 'popup'));
 },
 addDialog$1: function(dialog) {
  return this.addDialog$3(dialog,null,'v-mask')
},
 get$mainView: function() {
  return this._mainView;
 },
 Activity$0: function() {
  this._title = $.application().get$name();
 }
};

$$._DialogInfo = {"":
 ["_maskNode", "maskClass", "dialog?"],
 super: "Object",
 removeMask$0: function() {
  var t1 = this._maskNode;
  !(t1 == null) && t1.remove$0();
 },
 resizeMask$0: function() {
  var t1 = this._maskNode;
  if (!(t1 == null)) {
    t1 = $.CSS_px($.browser.get$size().get$width());
    this._maskNode.get$style().set$width(t1);
    t1 = $.CSS_px($.browser.get$size().get$height());
    this._maskNode.get$style().set$height(t1);
  }
 },
 createMask$1: function(parent$) {
  var t1 = this.maskClass;
  if (!(t1 == null)) {
    this._maskNode = $._ElementFactoryProvider_Element$html('<div class="v- ' + $.S(t1) + '" style="width:' + $.S($.browser.get$size().get$width()) + 'px;height:' + $.S($.browser.get$size().get$height()) + 'px"></div>');
    t1 = $.activity.get$container();
    !(t1 == null) && this._maskNode.get$style().set$position('absolute');
    parent$.$dom_appendChild$1(this._maskNode);
  }
 }
};

$$.Application = {"":
 ["_uuid", "_readyCB", "inSimulator?", "name="],
 super: "Object",
 toString$0: function() {
  return 'Application(' + $.S(this.name) + ', ' + $.S(this._uuid) + ')';
 },
 get$uuid: function() {
  var t1 = this._uuid;
  if (t1 == null) {
    var body = $.document().get$body();
    if (body == null) throw $.captureStackTrace($.CTC34);
    var sval = body.$dom_getAttribute$1('data-rikuloAppCount');
    if (!(sval == null)) {
      this._uuid = $.Math_parseInt(sval);
      body.$dom_setAttribute$2('data-rikuloAppCount', $.toString($.add(this._uuid, 1)));
    } else {
      this._uuid = 0;
      body.$dom_setAttribute$2('data-rikuloAppCount', '1');
    }
  }
  return this._uuid;
 },
 onCreate_$0: function() {
 },
 _ready$1: function(then) {
  var t1 = this._readyCB;
  if (!(t1 == null)) this._readyCB$1(then);
  else then.$call$0();
 },
 _readyCB$1: function(arg0) { return this._readyCB.$call$1(arg0); },
 Application$1: function(name$) {
  this.name = name$;
  $._app = this;
  var t1 = $.document().query$1('#v-simulator');
  this.inSimulator = !(t1 == null);
  t1 = $.browser;
  if (t1 == null) $.browser = $.Browser$();
  t1 = $.viewConfig;
  if (t1 == null) $.viewConfig = $.ViewConfig$();
  t1 = $.layoutManager;
  if (t1 == null) $.layoutManager = $.LayoutManager$();
  this.onCreate_$0();
 }
};

$$.SystemException = {"":
 ["message?"],
 super: "Object",
 toString$0: function() {
  return 'SystemException(' + $.S(this.message) + ')';
 }
};

$$._EmptyColl = {"":
 [],
 super: "Object",
 get$length: function() {
  return 0;
 },
 isEmpty$0: function() {
  return true;
 },
 filter$1: function(f) {
  return $.CTC66;
 },
 forEach$1: function(f) {
 },
 iterator$0: function() {
  return $.CTC67;
 },
 is$Collection: function() { return true; }
};

$$._EmptyIter = {"":
 [],
 super: "Object",
 hasNext$0: function() {
  return false;
 },
 next$0: function() {
  throw $.captureStackTrace($.CTC4);
 }
};

$$._OnDemandMap = {"":
 ["_lib7_map", "_creator"],
 super: "Object",
 remove$1: function(key) {
  var t1 = this._lib7_map;
  return !(t1 == null) ? t1.remove$1(key) : null;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  return this._lib7_init$0().putIfAbsent$2(key, ifAbsent);
 },
 get$length: function() {
  var t1 = this._lib7_map;
  return !(t1 == null) ? $.get$length(t1) : 0;
 },
 isEmpty$0: function() {
  var t1 = this._lib7_map;
  return t1 == null || $.isEmpty(t1) === true;
 },
 getValues$0: function() {
  var t1 = this._lib7_map;
  return !(t1 == null) ? t1.getValues$0() : $.CTC66;
 },
 getKeys$0: function() {
  var t1 = this._lib7_map;
  return !(t1 == null) ? t1.getKeys$0() : $.CTC66;
 },
 forEach$1: function(f) {
  var t1 = this._lib7_map;
  !(t1 == null) && $.forEach(t1, f);
 },
 containsKey$1: function(key) {
  var t1 = this._lib7_map;
  return !(t1 == null) && t1.containsKey$1(key) === true;
 },
 clear$0: function() {
  var t1 = this._lib7_map;
  !(t1 == null) && $.clear(t1);
 },
 operator$indexSet$2: function(key, value) {
  $.indexSet(this._lib7_init$0(), key, value);
 },
 operator$index$1: function(key) {
  var t1 = this._lib7_map;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.operator$index$1$bailout(1, key, t1);
  if (key !== (key | 0)) throw $.iae(key);
  var t2 = t1.length;
  if (key < 0 || key >= t2) throw $.ioore(key);
  t1 = t1[key];
  return t1;
 },
 operator$index$1$bailout: function(state, key, t1) {
  return !(t1 == null) ? $.index(t1, key) : null;
 },
 _lib7_init$0: function() {
  var t1 = this._lib7_map;
  if (!!(t1 == null)) {
    t1 = this._creator$0();
    this._lib7_map = t1;
  }
  return t1;
 },
 _creator$0: function() { return this._creator.$call$0(); },
 is$Map: function() { return true; }
};

$$.AbstractList = {"":
 [],
 super: "Object",
 toString$0: function() {
  var result = $.StringBufferImpl$('[');
  for (var t1 = this.iterator$0(), comma = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (comma === true) result.add$1(', ');
    else comma = true;
    result.add$1(!(t2 == null) ? $.toString(t2) : 'null');
  }
  return result.toString$0();
 },
 insertRange$3: function(start, length$, initialValue) {
  throw $.captureStackTrace($.CTC59);
 },
 removeRange$2: function(start, length$) {
  throw $.captureStackTrace($.CTC59);
 },
 getRange$2: function(start, length$) {
  if ($.eqB(length$, 0)) return [];
  $.ListUtil_rangeCheck(this, start, length$);
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'E'}));
  $.set$length(list, length$);
  $.Arrays_copy(this, start, list, 0, length$);
  return list;
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 removeLast$0: function() {
  var e = this.last$0();
  this.removeRange$2($.sub($.get$length(this), 1), 1);
  return e;
 },
 clear$0: function() {
  this.removeRange$2(0, $.get$length(this));
 },
 indexOf$2: function(element, start) {
  var t1 = !(start == null) ? start : 0;
  return $.Arrays_indexOf(this, element, t1, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,null)
},
 addAll$1: function(elements) {
  for (var t1 = $.iterator(elements); t1.hasNext$0() === true; ) {
    this.add$1(t1.next$0());
  }
 },
 addLast$1: function(element) {
  this.add$1(element);
 },
 add$1: function(element) {
  throw $.captureStackTrace($.CTC59);
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC59);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC59);
 },
 operator$index$1: function(index) {
  if (typeof index !== 'number') return this.operator$index$1$bailout(1, index);
  $.ListUtil_rangeCheck(this, index, 1);
  var it = this.iterator$0();
  for (; --index, index >= 0; ) {
    it.next$0();
  }
  return it.next$0();
 },
 operator$index$1$bailout: function(state, index) {
  $.ListUtil_rangeCheck(this, index, 1);
  var it = this.iterator$0();
  for (; index = $.sub(index, 1), $.geB(index, 0); ) {
    it.next$0();
  }
  return it.next$0();
 },
 iterator$0: function() {
  return;
 },
 isEmpty$0: function() {
  var t1 = $.get$length(this);
  return t1 === 0;
 },
 forEach$1: function(f) {
  $.Collections_forEach(this, f);
 },
 filter$1: function(f) {
  return $.Collections_filter(this, [], f);
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$.RunOnceQueue = {"":
 ["_tasks?"],
 super: "Object",
 cancel$1: function(key) {
  var tid = this._tasks.remove$1(key);
  !(tid == null) && $.window().clearTimeout$1(tid);
 },
 add$3: function(key, task, timeout) {
  var t1 = this._tasks;
  if (!(t1 == null)) this.cancel$1(key);
  else this._tasks = $.makeLiteralMap([]);
  $.indexSet(this._tasks, key, $.window().setTimeout$2(new $.RunOnceQueue_add_anon(key, task, this), timeout));
 },
 add$2: function(key,task) {
  return this.add$3(key,task,0)
}
};

$$._Offset = {"":
 ["top=", "left="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ', ' + $.S(this.top) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add(this.left, this.top));
 },
 operator$div$1: function(scalar) {
  return $._Offset$($.div(this.left, scalar), $.div(this.top, scalar));
 },
 operator$mul$1: function(scalar) {
  return $._Offset$($.mul(this.left, scalar), $.mul(this.top, scalar));
 },
 operator$add$1: function(other) {
  return $._Offset$($.add(this.left, other.get$left()), $.add(this.top, other.get$top()));
 },
 operator$sub$1: function(other) {
  return $._Offset$($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$Offset && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top());
 },
 set$y: function(y) {
  this.top = y;
 },
 get$y: function() {
  return this.top;
 },
 set$x: function(x) {
  this.left = x;
 },
 get$x: function() {
  return this.left;
 },
 is$Offset: true
};

$$._Offset3d = {"":
 ["zIndex?", "top", "left"],
 super: "_Offset",
 toString$0: function() {
  return '(' + $.S(this.get$x()) + ', ' + $.S(this.get$y()) + ', ' + $.S(this.get$z()) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add($.add(this.get$x(), this.get$y()), this.get$z()));
 },
 operator$div$1: function(scalar) {
  return $._Offset3d$($.div(this.left, scalar), $.div(this.top, scalar), $.div(this.zIndex, scalar));
 },
 operator$mul$1: function(scalar) {
  return $._Offset3d$($.mul(this.left, scalar), $.mul(this.top, scalar), $.mul(this.zIndex, scalar));
 },
 operator$add$1: function(other) {
  return $._Offset3d$($.add(this.left, other.get$left()), $.add(this.top, other.get$top()), $.add(this.zIndex, other.get$zIndex()));
 },
 operator$sub$1: function(other) {
  return $._Offset3d$($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()), $.sub(this.zIndex, other.get$zIndex()));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$Offset3d && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.zIndex, other.get$zIndex());
 },
 get$z: function() {
  return this.zIndex;
 },
 is$Offset3d: true,
 is$Offset: true
};

$$._Size = {"":
 ["height=", "width="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.width) + ', ' + $.S(this.height) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add(this.width, this.height));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$Size && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
 },
 is$Size: true
};

$$._Animator = {"":
 ["_prevTime=", "_callback?", "_tmpRemoved", "_anims?"],
 super: "Object",
 remove$1: function(animate) {
  var t1 = this._tmpRemoved;
  if (!(t1 == null)) $.add$1(t1, animate);
  else $.ListUtil_remove(this._anims, animate);
 },
 add$1: function(animate) {
  var t1 = this._anims;
  t1.push(animate);
  t1 = t1.length;
  if (t1 === 1) {
    this._prevTime = $._Animator__now();
    $.window().requestAnimationFrame$1(this._callback);
  }
 },
 _isRemoved$1: function(index) {
  if (typeof index !== 'number') return this._isRemoved$1$bailout(1, index);
  if ($.isEmpty(this._tmpRemoved) !== true) {
    var t1 = this._anims;
    if (index !== (index | 0)) throw $.iae(index);
    var t2 = t1.length;
    if (index < 0 || index >= t2) throw $.ioore(index);
    var t3 = t1[index];
    for (t2 = $.iterator(this._tmpRemoved), cnt = 0; t2.hasNext$0() === true; ) {
      if ($.eqB(t2.next$0(), t3)) ++cnt;
    }
    if (cnt > 0) {
      for (var j = 0; j < index; ++j) {
        t2 = t1.length;
        if (j < 0 || j >= t2) throw $.ioore(j);
        if ($.eqB(t1[j], t3)) {
          --cnt;
          t2 = cnt === 0;
        } else t2 = false;
        if (t2) return false;
      }
      return true;
    }
  }
  return false;
  var cnt;
 },
 _isRemoved$1$bailout: function(state, index) {
  if ($.isEmpty(this._tmpRemoved) !== true) {
    var t1 = this._anims;
    if (index !== (index | 0)) throw $.iae(index);
    var t2 = t1.length;
    if (index < 0 || index >= t2) throw $.ioore(index);
    var t3 = t1[index];
    for (t2 = $.iterator(this._tmpRemoved), cnt = 0; t2.hasNext$0() === true; ) {
      if ($.eqB(t2.next$0(), t3)) ++cnt;
    }
    if (cnt > 0) {
      for (var j = 0; j < index; ++j) {
        t2 = t1.length;
        if (j < 0 || j >= t2) throw $.ioore(j);
        if ($.eqB(t1[j], t3)) {
          --cnt;
          t2 = cnt === 0;
        } else t2 = false;
        if (t2) return false;
      }
      return true;
    }
  }
  return false;
  var cnt;
 },
 _afterCallback$0: function() {
  var removed = this._tmpRemoved;
  this._tmpRemoved = null;
  for (var t1 = $.iterator(removed); t1.hasNext$0() === true; ) {
    this.remove$1(t1.next$0());
  }
 },
 _beforeCallback$0: function() {
  this._tmpRemoved = $.ListFactory_List(null);
 },
 _callback$2: function(arg0, arg1) { return this._callback.$call$2(arg0, arg1); },
 _Animator$0: function() {
  this._callback = new $.anon(this);
 }
};

$$.Browser = {"":
 ["size?", "androidVersion?", "iosVersion?", "webkitVersion", "touch?", "mobile?", "android?", "ios?", "webkit", "firefox?", "msie", "chrome", "safari", "version!", "name="],
 super: "Object",
 _initBrowserInfo$0: function() {
  var ua = $.toLowerCase($.window().get$navigator().get$userAgent());
  var bm = new $.Browser__initBrowserInfo_anon(this, ua);
  var m2 = $.CTC35.firstMatch$1(ua);
  if (!(m2 == null)) {
    this.android = true;
    this.mobile = true;
    this.touch = true;
    this.androidVersion = $.Browser__versionOf(m2.group$1(1), '.');
  } else {
    m2 = $.CTC36.firstMatch$1(ua);
    if (!(m2 == null)) {
      this.ios = true;
      this.mobile = true;
      this.touch = true;
      this.iosVersion = $.Browser__versionOf(m2.group$1(1), '_');
    }
  }
  if (bm.$call$1($.CTC37) === true) {
    this.webkit = true;
    $.CSS_prefix = '-webkit-';
    this.webkitVersion = this.version;
    if (bm.$call$1($.CTC38) === true) this.chrome = true;
    else {
      if (bm.$call$1($.CTC39) === true) this.safari = true;
    }
  } else {
    if (bm.$call$1($.CTC40) === true) {
      $.CSS_prefix = '-ms-';
      this.msie = true;
      var t1 = $.ge($.indexOf$1(ua, 'IEMobile'), 0);
      this.mobile = t1;
      this.touch = t1;
    } else {
      if ($.ltB($.indexOf$1(ua, 'compatible'), 0) && bm.$call$1($.CTC41) === true) {
        $.CSS_prefix = '-moz-';
        this.name = 'firefox';
        this.firefox = true;
      } else {
        $.CSS_prefix = '';
        this.name = 'unknown';
        this.version = 1.0;
      }
    }
  }
  var qcave = $.DOMQuery_DOMQuery($.window());
  this.size = $._Size$(qcave.get$innerWidth(), qcave.get$innerHeight());
 },
 toString$0: function() {
  return $.S(this.name) + '(v' + $.S(this.version) + ', ' + $.S(this.size) + ')';
 },
 Browser$0: function() {
  this._initBrowserInfo$0();
 }
};

$$.DOMQuery = {"":
 ["node?"],
 super: "Object",
 get$borderWidth: function() {
  return $.CSS_intOf(this.get$computedStyle().get$borderWidth(), null);
 },
 isDescendantOf$1: function(parent$) {
  for (var n = this.node; !(n == null); n = n.get$parent()) {
    if (n == null ? parent$ == null : n === parent$) return true;
  }
  return false;
 },
 get$computedStyle: function() {
  return $.window().$dom_getComputedStyle$2(this.node, '');
 },
 get$documentOffset: function() {
  var ofs = $._Offset$(0, 0);
  var el = this.node;
  do {
    ofs.left = $.add(ofs.left, el.get$$$dom_offsetLeft());
    ofs.top = $.add(ofs.top, el.get$$$dom_offsetTop());
    if (!$.eqB(el.get$style().get$position(), 'fixed')) {
      el = el.get$offsetParent();
      var t1 = !(el == null);
    } else t1 = false;
  } while (t1);
  return ofs;
 },
 get$offset: function() {
  var t1 = this.node;
  return $._Offset$(t1.get$$$dom_offsetLeft(), t1.get$$$dom_offsetTop());
 },
 get$offsetParent: function() {
  return this.node.get$offsetParent();
 },
 get$outerHeight: function() {
  return this.node.get$$$dom_offsetHeight();
 },
 get$outerWidth: function() {
  return this.node.get$$$dom_offsetWidth();
 },
 get$innerHeight: function() {
  return this.node.get$$$dom_clientHeight();
 },
 get$innerWidth: function() {
  return this.node.get$$$dom_clientWidth();
 }
};

$$._WindowQuery = {"":
 ["node"],
 super: "DOMQuery",
 get$computedStyle: function() {
  return $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration();
 },
 isDescendantOf$1: function(parent$) {
  return false;
 },
 get$documentOffset: function() {
  return this.get$offset();
 },
 get$offset: function() {
  return $._Offset$(0, 0);
 },
 get$offsetParent: function() {
  return;
 },
 get$outerHeight: function() {
  return this.node.get$outerHeight();
 },
 get$outerWidth: function() {
  return this.node.get$outerWidth();
 },
 get$innerHeight: function() {
  return this.node.get$innerHeight();
 },
 get$innerWidth: function() {
  return this.node.get$innerWidth();
 }
};

$$._NullQuery = {"":
 ["node"],
 super: "_WindowQuery",
 get$outerHeight: function() {
  return 0;
 },
 get$outerWidth: function() {
  return 0;
 },
 get$innerHeight: function() {
  return 0;
 },
 get$innerWidth: function() {
  return 0;
 }
};

$$._DragGestureState = {"":
 ["_time!", "_moved=", "data", "_pending=", "_touched=", "_dragged=", "_range", "_initTxOfs=", "_ofs", "_velocity?", "_delta", "_initPgOfs?", "_ownerOfs?", "_gesture"],
 super: "Object",
 _setDelta$2: function(x, y) {
  var t1 = this._delta;
  t1.set$x(x);
  t1.set$y(y);
 },
 _setOfs$2: function(x, y) {
  var t1 = this._ofs;
  t1.set$x(x);
  t1.set$y(y);
 },
 get$range: function() {
  var t1 = this._range;
  if (t1 == null) {
    t1 = this._gesture.get$_fnRange();
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  if (t1) this._range = this._gesture._fnRange$0();
  return this._range;
 },
 get$delta: function() {
  return this._delta;
 },
 get$offset: function() {
  return this._ofs;
 },
 _DragGestureState$3: function(gesture, pageX, pageY) {
  this._ofs = $.sub(this._initPgOfs, this._ownerOfs);
 }
};

$$._DragGesture = {"":
 ["_fnRange?"],
 super: "Object",
 _constraint$2: function(x, y) {
  var range = this._state.get$range();
  var off = $._Offset$(x, y);
  return !(range == null) ? range.snap$1(off) : off;
 },
 _moveBy$6: function(ofsX, ofsY, deltaX, deltaY, time, callback) {
  var initofs = this._state.get$_initTxOfs();
  var move = this._constraint$2($.add(deltaX, initofs.get$x()), $.add(deltaY, initofs.get$y()));
  if (!(callback == null)) {
    this._state._setOfs$2(ofsX, ofsY);
    this._state._setDelta$2($.sub(move.get$x(), initofs.get$x()), $.sub(move.get$y(), initofs.get$y()));
    this._state.set$_time(time);
    var t1 = this._state.get$_moved() === true || !$.eqB(deltaX, 0) || !$.eqB(deltaY, 0);
    this._state.set$_moved(t1);
    var done = callback.$call$1(this._state);
    if (!(done == null) && done === true) return;
  }
  if (this._transform === true) {
    t1 = $.CSS_translate3d(move.get$x(), move.get$y(), null);
    this._state.get$_dragged().get$style().set$transform(t1);
  } else {
    t1 = $.CSS_px(move.get$x());
    this._state.get$_dragged().get$style().set$left(t1);
    t1 = $.CSS_px(move.get$y());
    this._state.get$_dragged().get$style().set$top(t1);
  }
 },
 _touchEnd$3: function(pageX, pageY, time) {
  var t1 = this._state;
  if (!(t1 == null)) {
    t1 = this._snapTime;
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  if (t1 && !(time == null)) {
    var diffTime = $.sub(time, this._snapTime);
    t1 = $.gtB(diffTime, 250) ? 0 : $.div($.sub(pageX, this._snapX), diffTime);
    this._state.get$_velocity().set$x(t1);
    t1 = $.gtB(diffTime, 250) ? 0 : $.div($.sub(pageY, this._snapY), diffTime);
    this._state.get$_velocity().set$y(t1);
    this._snapY = null;
    this._snapX = null;
    this._snapTime = null;
  }
  t1 = this._state;
  if (!(t1 == null)) {
    t1 = t1.get$_touched();
    t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  t1 && this._moveBy$6($.sub(pageX, this._state.get$_ownerOfs().get$x()), $.sub(pageY, this._state.get$_ownerOfs().get$y()), $.sub(pageX, this._state.get$_initPgOfs().get$x()), $.sub(pageY, this._state.get$_initPgOfs().get$y()), time, this._end);
  this._stop$0();
 },
 _touchMove$3: function(pageX, pageY, time) {
  var t1 = this._state;
  if (!(t1 == null)) {
    var initPgOfs = t1.get$_initPgOfs();
    t1 = this._state.get$_pending();
    if (!(t1 == null)) {
      var v = $.sub(pageX, initPgOfs.get$x());
      t1 = this._movement;
      if (!($.gtB(v, t1) || $.ltB(v, $.neg(t1)))) {
        v = $.sub(pageY, initPgOfs.get$y());
        var t2 = $.gtB(v, t1);
      } else t2 = true;
      (t2 || $.ltB(v, $.neg(t1))) && this._activate$0();
    }
    t1 = this._state;
    if (!(t1 == null) && !(time == null)) {
      t1 = this._snapTime;
      if (!(t1 == null)) {
        var diffTime = $.sub(time, t1);
        t1 = $.gtB(diffTime, 250) ? 0 : $.div($.sub(pageX, this._snapX), diffTime);
        this._state.get$_velocity().set$x(t1);
        t1 = $.gtB(diffTime, 250) ? 0 : $.div($.sub(pageY, this._snapY), diffTime);
        this._state.get$_velocity().set$y(t1);
      } else diffTime = null;
      t1 = this._snapTime;
      if (t1 == null || $.gtB(diffTime, 250)) {
        this._snapTime = time;
        this._snapX = pageX;
        this._snapY = pageY;
      }
    }
    t1 = this._state.get$_touched();
    !(t1 == null) && this._moveBy$6($.sub(pageX, this._state.get$_ownerOfs().get$x()), $.sub(pageY, this._state.get$_ownerOfs().get$y()), $.sub(pageX, initPgOfs.get$x()), $.sub(pageY, initPgOfs.get$y()), time, this._moving);
  }
 },
 _activate$0: function() {
  var t1 = this._state.get$_pending();
  this._state.set$_touched(t1);
  this._state.set$_pending(null);
  t1 = this._start;
  var dragged = !(t1 == null) ? this._start$1(this._state) : this.get$owner();
  this._state.set$_dragged(dragged);
  if (dragged == null) {
    this._stop$0();
    return;
  }
  t1 = this._transform === true ? $.CSS_offset3dOf(dragged.get$style().get$transform()) : $.DOMQuery_DOMQuery(dragged).get$offset();
  this._state.set$_initTxOfs(t1);
 },
 _touchStart$4: function(touched, pageX, pageY, time) {
  this._stop$0();
  this._state = $._DragGestureState$(this, pageX, pageY);
  this._state.set$_pending(touched);
  $.ltB(this._movement, 0) && this._activate$0();
 },
 _stop$0: function() {
  this._state = null;
 },
 get$handle: function() {
  return this._handle;
 },
 get$owner: function() {
  return this._lib4_owner;
 },
 _fnRange$0: function() { return this._fnRange.$call$0(); },
 _start$1: function(arg0) { return this._start.$call$1(arg0); },
 _DragGesture$_init$8: function(_owner, _handle, _transform, _fnRange, _movement, _start, _end, _moving) {
  this._listen$0();
 }
};

$$._TouchDragGesture = {"":
 ["_pgy=", "_pgx=", "_elEnd", "_elMove", "_elStart", "_snapTime", "_snapY", "_snapX", "_transform", "_state", "_movement", "_fnRange", "_moving", "_end", "_start", "_handle", "_lib4_owner"],
 super: "_DragGesture",
 _listen$0: function() {
  var on = this.get$handle().get$on();
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
 ["_captured", "_elEnd", "_elMove", "_elStart", "_snapTime", "_snapY", "_snapX", "_transform", "_state", "_movement", "_fnRange", "_moving", "_end", "_start", "_handle", "_lib4_owner"],
 super: "_DragGesture",
 _listen$0: function() {
  var t1 = this.get$handle().get$on().get$mouseDown();
  var t2 = new $._MouseDragGesture__listen_anon(this);
  this._elStart = t2;
  $.add$1(t1, t2);
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
 _stop$0: function() {
  if (this._captured === true) {
    this._captured = false;
    var on = $.document().get$on();
    var t1 = this._elMove;
    !(t1 == null) && on.get$mouseMove().remove$1(this._elMove);
    t1 = this._elEnd;
    !(t1 == null) && on.get$mouseUp().remove$1(this._elEnd);
  }
  $._DragGesture.prototype._stop$0.call(this);
 }
};

$$.View = {"":
 ["_inDoc", "_hidden", "_layout", "_profile", "_height", "_width", "_lib3_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs!", "_evlInfo", "_childInfo?", "_virtIS=", "_prevSibling=", "_nextSibling=", "_lib3_parent!", "_lib3_uuid", "_id?"],
 super: "Object",
 toString$0: function() {
  var t1 = $.S(this.get$className()) + '(';
  return t1 + $.S($.isEmpty(this.get$id()) === true ? this.get$uuid() : this.get$id()) + ')';
 },
 hashCode$0: function() {
  return $.hashCode(this.get$uuid());
 },
 get$dataAttributes: function() {
  var t1 = this._dataAttrs;
  return !(t1 == null) ? t1 : $.MapUtil_onDemand(new $.View_dataAttributes_anon(this));
 },
 domUnlisten_$2: function(n, type) {
  var t1 = this._evlInfo;
  if (!(t1 == null)) {
    var ln = t1.get$domListeners().remove$1(type);
    if (!(ln == null)) {
      t1 = n.get$on();
      if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.domUnlisten_$2$bailout(1, type, ln, t1);
      var t2 = $.toLowerCase(type);
      if (t2 !== (t2 | 0)) throw $.iae(t2);
      var t3 = t1.length;
      if (t2 < 0 || t2 >= t3) throw $.ioore(t2);
      t1[t2].remove$1(ln);
    }
  }
 },
 domUnlisten_$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var type = env0;
      ln = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._evlInfo;
    case 1:
      if (state == 1 || (state == 0 && !(t1 == null))) {
        switch (state) {
          case 0:
            var ln = t1.get$domListeners().remove$1(type);
          case 1:
            if (state == 1 || (state == 0 && !(ln == null))) {
              switch (state) {
                case 0:
                  t1 = n.get$on();
                case 1:
                  state = 0;
                  $.index(t1, $.toLowerCase(type)).remove$1(ln);
              }
            }
        }
      }
  }
 },
 domListen_$3: function(n, type, disp) {
  var ln = disp.$call$1(this);
  var ei = this._initEventListenerInfo$0();
  var t1 = ei.get$domListeners();
  t1 == null && ei.set$domListeners($.makeLiteralMap([]));
  $.indexSet(ei.get$domListeners(), type, ln);
  $.add$1($.index(n.get$on(), $.toLowerCase(type)), ln);
 },
 getDOMEventDispatcher_$1: function(type) {
  return $._ViewImpl_getDOMEventDispatcher(type);
 },
 sendEvent$2: function(event$, type) {
  var t1 = event$.get$target();
  t1 == null && event$.set$target(this);
  t1 = this._evlInfo;
  return !(t1 == null) && t1.send$2(event$, type) === true;
 },
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,null)
},
 get$on: function() {
  return this._initEventListenerInfo$0().get$on();
 },
 domStyle_$7: function(out, noLeft, noTop, noWidth, noHeight, noHidden, noStyle) {
  noLeft !== true && !$.eqB(this.get$left(), 0) && $.add$1($.add$1($.add$1(out, 'left:'), this.get$left()), 'px;');
  noTop !== true && !$.eqB(this.get$top(), 0) && $.add$1($.add$1($.add$1(out, 'top:'), this.get$top()), 'px;');
  if (noWidth !== true) {
    var t1 = this._width;
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  t1 && $.add$1($.add$1($.add$1(out, 'width:'), this._width), 'px;');
  if (noHeight !== true) {
    t1 = this._height;
    t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  t1 && $.add$1($.add$1($.add$1(out, 'height:'), this._height), 'px;');
  noHidden !== true && this.get$hidden() === true && $.add$1(out, 'display:none;');
  if (noStyle !== true) {
    t1 = this._style;
    t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  if (t1) {
    var s = this._style.get$cssText();
    t1 = $.isEmpty(s) !== true;
  } else {
    s = null;
    t1 = false;
  }
  t1 && $.add$1(out, $.StringUtil_encodeXML(s, false, 0, false));
 },
 domStyle_$1: function(out) {
  return this.domStyle_$7(out,false,false,false,false,false,false)
},
 domClass_$1: function(out) {
  $.add$1(out, $.viewConfig.get$classPrefix());
  for (var t1 = $.iterator(this.get$classes()); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    $.add$1($.add$1(out, ' '), t2);
  }
 },
 domInner_$1: function(out) {
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling()) {
    child.draw$1(out);
  }
 },
 domAttrs_$4: function(out, noId, noStyle, noClass) {
  if (noId !== true) {
    var s = this.get$uuid();
    var t1 = $.isEmpty(s) !== true;
  } else {
    s = null;
    t1 = false;
  }
  t1 && $.add$1($.add$1($.add$1(out, ' id="'), s), '"');
  if (noStyle !== true) {
    var stylesb = $.StringBufferImpl$('');
    this.domStyle_$1(stylesb);
    stylesb.isEmpty$0() !== true && $.add$1($.add$1($.add$1(out, ' style="'), stylesb), '"');
  }
  if (noClass !== true) {
    var classsb = $.StringBufferImpl$('');
    this.domClass_$1(classsb);
    classsb.isEmpty$0() !== true && $.add$1($.add$1($.add$1(out, ' class="'), classsb), '"');
  }
 },
 domAttrs_$1: function(out) {
  return this.domAttrs_$4(out,false,false,false)
},
 get$classes: function() {
  return this._classes;
 },
 get$style: function() {
  var t1 = this._style;
  if (t1 == null) this._style = $.CSSStyleDeclarationImpl$(this);
  return this._style;
 },
 get$profile: function() {
  var t1 = this._profile;
  if (t1 == null) this._profile = $.ProfileDeclarationImpl$(this);
  return this._profile;
 },
 get$layout: function() {
  var t1 = this._layout;
  if (t1 == null) this._layout = $.LayoutDeclarationImpl$(this);
  return this._layout;
 },
 get$documentOffset: function() {
  var ofs = $._Offset$(0, 0);
  for (var view = this; true; ) {
    ofs.left = $.add(ofs.left, view.get$left());
    ofs.top = $.add(ofs.top, view.get$top());
    if ($.eqB(view.get$style().get$position(), 'fixed')) break;
    var p = view.get$parent();
    if (p == null) {
      var nofs = $.DOMQuery_DOMQuery(view.get$node()).get$documentOffset();
      ofs.left = $.add(ofs.left, nofs.get$left());
      ofs.top = $.add(ofs.top, nofs.get$top());
      break;
    }
    view = p;
  }
  return ofs;
 },
 get$innerHeight: function() {
  if (this.get$inDocument() === true) var v = $.DOMQuery_DOMQuery(this.get$node()).get$innerHeight();
  else {
    var t1 = this._height;
    v = !(t1 == null) ? t1 : 0;
  }
  return $.gtB(v, 0) ? v : 0;
 },
 get$innerWidth: function() {
  if (this.get$inDocument() === true) var v = $.DOMQuery_DOMQuery(this.get$node()).get$innerWidth();
  else {
    var t1 = this._width;
    v = !(t1 == null) ? t1 : 0;
  }
  return $.gtB(v, 0) ? v : 0;
 },
 get$outerHeight: function() {
  var t1 = this._height;
  if (!!(t1 == null)) {
    t1 = this.get$inDocument() === true ? $.DOMQuery_DOMQuery(this.get$node()).get$outerHeight() : 0;
  }
  return t1;
 },
 get$outerWidth: function() {
  var t1 = this._width;
  if (!!(t1 == null)) {
    t1 = this.get$inDocument() === true ? $.DOMQuery_DOMQuery(this.get$node()).get$outerWidth() : 0;
  }
  return t1;
 },
 set$height: function(height) {
  this._height = height;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(height);
    this.get$node().get$style().set$height(t1);
    $.layoutManager.sizeUpdated$3(this, height, false);
  }
 },
 get$height: function() {
  return this._height;
 },
 set$width: function(width) {
  this._width = width;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(width);
    this.get$node().get$style().set$width(t1);
    $.layoutManager.sizeUpdated$3(this, width, true);
  }
 },
 get$width: function() {
  return this._width;
 },
 set$top: function(top$) {
  this._lib3_top = top$;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(top$);
    this.get$node().get$style().set$top(t1);
  }
 },
 get$top: function() {
  return this._lib3_top;
 },
 set$left: function(left) {
  this._left = left;
  if (this._inDoc === true) {
    var t1 = $.CSS_px(left);
    this.get$node().get$style().set$left(t1);
  }
 },
 get$left: function() {
  return this._left;
 },
 get$hidden: function() {
  return this._hidden;
 },
 _asHTML$0: function() {
  var out = $.StringBufferImpl$('');
  this.draw$1(out);
  return out.toString$0();
 },
 get$domTag_: function() {
  return 'div';
 },
 draw$1: function(out) {
  var tag = this.get$domTag_();
  $.add$1($.add$1(out, '<'), tag);
  this.domAttrs_$1(out);
  $.add$1(out, '>');
  this.domInner_$1(out);
  $.add$1($.add$1($.add$1(out, '</'), tag), '>');
 },
 shallLayout_$1: function(child) {
  if (child.get$hidden() === true) return false;
  var v = child.get$style().get$position();
  if (typeof v !== 'string') return this.shallLayout_$1$bailout(1, v);
  return $.isEmpty(v) === true || v === 'absolute';
 },
 shallLayout_$1$bailout: function(state, v) {
  return $.isEmpty(v) === true || $.eqB(v, 'absolute');
 },
 measureHeight_$1: function(mctx) {
  return this.isViewGroup$0() === true ? mctx.measureHeight$1(this) : mctx.measureHeightByContent$2(this, true);
 },
 measureWidth_$1: function(mctx) {
  return this.isViewGroup$0() === true ? mctx.measureWidth$1(this) : mctx.measureWidthByContent$2(this, true);
 },
 doLayout_$1: function(mctx) {
  $.layoutManager.doLayout$2(mctx, this);
 },
 requestLayout$2: function(immediate, descendantOnly) {
  $.layoutManager.requestLayout$3(this, immediate, descendantOnly);
 },
 requestLayout$0: function() {
  return this.requestLayout$2(false,false)
},
 requestLayout$1$descendantOnly: function(descendantOnly) {
  return this.requestLayout$2(false,descendantOnly)
},
 _mntClean$0: function() {
  this._mntAttrs = null;
  this._inDoc = false;
  this._node = null;
 },
 _mntInit$0: function() {
  this._inDoc = true;
 },
 unmount_$0: function() {
  this.sendEvent$1($.ViewEvent$('unmount', null, null, null, null, null));
  var t1 = this._evlInfo;
  !(t1 == null) && t1.unmount$0();
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling()) {
    child.unmount_$0();
    child._mntClean$0();
  }
 },
 mount_$0: function() {
  for (var child = this.get$firstChild(); !(child == null); child = child.get$nextSibling()) {
    child._mntInit$0();
    child.mount_$0();
  }
  var t1 = this._evlInfo;
  !(t1 == null) && t1.mount$0();
  this.sendEvent$1($.ViewEvent$('mount', null, null, null, null, null));
 },
 _unmount$0: function() {
  if (this._inDoc === true) {
    this.unmount_$0();
    this._mntClean$0();
  }
 },
 _mount$0: function() {
  $.View__mntCnt = $.add($.View__mntCnt, 1);
  try {
    this._mntInit$0();
    this.mount_$0();
    this.requestLayout$1$descendantOnly(true);
  } finally {
    $.View__mntCnt = $.sub($.View__mntCnt, 1);
  }
  if ($.eqB($.View__mntCnt, 0)) {
    var t1 = $.View__afters;
    if (!(t1 == null) && $.isEmpty($.View__afters) !== true) {
      var afters = $.ListFactory_List$from($.View__afters);
      $.clear($.View__afters);
      for (t1 = $.iterator(afters); t1.hasNext$0() === true; ) {
        var t2 = t1.next$0();
        var view = $.index(t2, 0);
        view.get$inDocument() === true && $.index(t2, 1).$call$1(view);
      }
    }
    $.eqB($.View__mntCnt, 0) && $.layoutManager.flush$0();
  }
 },
 removeFromDocument$0: function() {
  var t1 = this.get$parent();
  if (!(t1 == null) || this.get$inDocument() !== true) throw $.captureStackTrace($.UIException$('No parent allowed, nor detached twice: ' + $.S(this)));
  var n = this.get$node();
  this._unmount$0();
  n.remove$0();
 },
 _addToDoc$6: function(node, outer, inner, before, keepId, location$) {
  var t1 = outer === true;
  if (t1 && keepId === true && $.isEmpty(node.get$id()) !== true) this._lib3_uuid = node.get$id();
  var html = this._asHTML$0();
  if (inner === true) {
    node.set$innerHTML(html);
    var nxt = null;
    var p = null;
  } else {
    if (t1) {
      p = node.get$parent();
      nxt = node.get$nextElementSibling();
      node.remove$0();
    } else {
      p = node;
      nxt = before;
    }
  }
  if (!(nxt == null)) nxt.insertAdjacentHTML$2('beforeBegin', html);
  else {
    !(p == null) && p.insertAdjacentHTML$2('beforeEnd', html);
  }
  this._mount$0();
  !(location$ == null) && $.layoutManager.afterLayout$1(new $.View__addToDoc_anon(this, location$));
 },
 addToDocument$6: function(node, outer, inner, before, keepId, location$) {
  var t1 = this.get$parent();
  if (!(t1 == null) || this.get$inDocument() === true) throw $.captureStackTrace($.UIException$('No parent allowed, nor attached twice: ' + $.S(this)));
  this._addToDoc$6(node, outer, inner, before, keepId, location$);
 },
 addToDocument$1: function(node) {
  return this.addToDocument$6(node,false,false,null,false,null)
},
 get$inDocument: function() {
  return this._inDoc;
 },
 getNode$1: function(subId) {
  if (this._inDoc !== true) throw $.captureStackTrace($.UIException$('Not in document, ' + $.S(this) + '. Don\'t access node in Activity.onCreate_().'));
  var t1 = $.document();
  return t1.query$1(!(subId == null) && $.gtB($.get$length(subId), 0) ? '#' + $.S(this.get$uuid()) + '-' + $.S(subId) : '#' + $.S(this.get$uuid()));
 },
 get$node: function() {
  var t1 = this._node;
  return !(t1 == null) ? t1 : this.getNode$1(null);
 },
 removeChildFromDocument_$2: function(child, childNode) {
  childNode.remove$0();
 },
 insertChildToDocument_$3: function(child, childInfo, beforeChild) {
  if (!(beforeChild == null)) {
    if (typeof childInfo === 'object' && childInfo !== null && childInfo.is$Element()) {
      var before = beforeChild.get$node();
      before.get$parent().insertBefore$2(childInfo, before);
    } else beforeChild.get$node().insertAdjacentHTML$2('beforeBegin', childInfo);
  } else {
    if (typeof childInfo === 'object' && childInfo !== null && childInfo.is$Element()) this.get$node().$dom_appendChild$1(childInfo);
    else this.get$node().insertAdjacentHTML$2('beforeEnd', childInfo);
  }
 },
 _removeChild$3: function(child, notifyChild, exit) {
  var t1 = child.get$parent();
  if (!(t1 === this)) return;
  this.beforeChildRemoved_$1(child);
  t1 = notifyChild === true;
  t1 && child.beforeParentChanged_$1(null);
  if (this.get$inDocument() === true) {
    var childNode = child.get$node();
    exit === true && child._unmount$0();
    this.removeChildFromDocument_$2(child, childNode);
  }
  $._ViewImpl_unlink(this, child);
  t1 && child.onParentChanged_$1(this);
  this.onChildRemoved_$1(child);
 },
 _removeChild$1: function(child) {
  return this._removeChild$3(child,true,true)
},
 _removeChild$2$notifyChild: function(child,notifyChild) {
  return this._removeChild$3(child,notifyChild,true)
},
 removeFromParent$0: function() {
  var t1 = this.get$parent();
  if (t1 == null) throw $.captureStackTrace($.UIException$('Unable to remove a root view, ' + $.S(this)));
  this.get$parent()._removeChild$1(this);
 },
 _addChild$3: function(child, beforeChild, childNode) {
  if (this.isDescendantOf$1(child) === true) throw $.captureStackTrace($.UIException$($.S(child) + ' is an ancestor of ' + $.S(this)));
  if (this.isViewGroup$0() !== true) throw $.captureStackTrace($.UIException$('No child allowed in ' + $.S(this)));
  if (!(beforeChild == null)) {
    var t1 = beforeChild.get$parent();
    if (!(t1 === this)) beforeChild = null;
    else {
      if (child == null ? beforeChild == null : child === beforeChild) return;
    }
  }
  var oldParent = child.get$parent();
  t1 = oldParent === this;
  var parentChanged = !t1;
  if (t1) {
    t1 = child.get$nextSibling();
    t1 = beforeChild == null ? t1 == null : beforeChild === t1;
  } else t1 = false;
  if (t1) return;
  parentChanged && child.beforeParentChanged_$1(this);
  !(oldParent == null) && oldParent._removeChild$2$notifyChild(child, false);
  $._ViewImpl_link(this, child, beforeChild);
  if (this.get$inDocument() === true) {
    if (!(childNode == null)) this.insertChildToDocument_$3(child, childNode, beforeChild);
    else {
      this.insertChildToDocument_$3(child, child._asHTML$0(), beforeChild);
      child._mount$0();
    }
  }
  this.onChildAdded_$1(child);
  parentChanged && child.onParentChanged_$1(oldParent);
 },
 _addChild$2: function(child,beforeChild) {
  return this._addChild$3(child,beforeChild,null)
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
 isViewGroup$0: function() {
  return true;
 },
 onPreLayout_$0: function() {
  this.sendEvent$1($.ViewEvent$('preLayout', null, null, null, null, null));
 },
 onLayout_$0: function() {
  this.sendEvent$1($.ViewEvent$('layout', null, null, null, null, null));
 },
 beforeParentChanged_$1: function(newParent) {
 },
 onParentChanged_$1: function(oldParent) {
 },
 onChildRemoved_$1: function(child) {
 },
 beforeChildRemoved_$1: function(child) {
 },
 onChildAdded_$1: function(child) {
 },
 get$childCount: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$nChild() : 0;
 },
 get$children: function() {
  var ci = this._initChildInfo$0();
  var t1 = ci.get$children();
  t1 == null && ci.set$children($._SubviewList$(this));
  return ci.get$children();
 },
 get$previousSibling: function() {
  return this._prevSibling;
 },
 get$nextSibling: function() {
  return this._nextSibling;
 },
 get$lastChild: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$lastChild() : null;
 },
 get$firstChild: function() {
  var t1 = this._childInfo;
  return !(t1 == null) ? t1.get$firstChild() : null;
 },
 get$parent: function() {
  return this._lib3_parent;
 },
 isDescendantOf$1: function(parent$) {
  for (var w = this; !(w == null); w = w.get$parent()) {
    if (w == null ? parent$ == null : w === parent$) return true;
  }
  return false;
 },
 get$spaceOwner: function() {
  return $._ViewImpl_spaceOwner(this);
 },
 bindFellow_$2: function(id, fellow) {
  throw $.captureStackTrace($.CTC58);
 },
 get$fellows: function() {
  return this.get$spaceOwner().get$fellows();
 },
 getFellow$1: function(id) {
  return this.get$spaceOwner().getFellow$1(id);
 },
 queryAll$1: function(selector) {
  return $.ViewIterable$(this, selector);
 },
 query$1: function(selector) {
  if (selector == null) return;
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
 set$id: function(id) {
  if (id == null) id = '';
  if (!$.eqB(this._id, id)) {
    $.gtB($.get$length(id), 0) && $._ViewImpl_checkIdSpaces(this, id);
    $._ViewImpl_removeFromIdSpace(this, false);
    this._id = id;
    $._ViewImpl_addToIdSpace(this, false);
  }
 },
 get$id: function() {
  return this._id;
 },
 get$uuid: function() {
  var t1 = this._lib3_uuid;
  if (t1 == null) {
    t1 = $.View__uuidNext;
    $.View__uuidNext = $.add(t1, 1);
    this._lib3_uuid = $.StringUtil_encodeId(t1, $.viewConfig.get$uuidPrefix());
  }
  return this._lib3_uuid;
 },
 _initEventListenerInfo$0: function() {
  var t1 = this._evlInfo;
  if (t1 == null) this._evlInfo = $._EventListenerInfo$(this);
  return this._evlInfo;
 },
 _initChildInfo$0: function() {
  var t1 = this._childInfo;
  if (t1 == null) this._childInfo = $._ChildInfo$();
  return this._childInfo;
 },
 get$className: function() {
  return 'View';
 },
 View$0: function() {
  this._classes = $._ClassSet$(this);
  $.add$1(this._classes, $.S($.viewConfig.get$classPrefix()) + $.S(this.get$className()));
 },
 is$View: true
};

$$.UIException = {"":
 ["message?"],
 super: "Object",
 toString$0: function() {
  return 'UIException(' + $.S(this.message) + ')';
 }
};

$$._SubviewList = {"":
 ["_owner"],
 super: "AbstractList",
 insertRange$3: function(start, length$, initialValue) {
  if (!$.eqB(length$, 1)) throw $.captureStackTrace($.CTC61);
  if (initialValue == null) throw $.captureStackTrace($.CTC62);
  if ($.eqB(start, $.get$length(this))) this.add$1(initialValue);
  else {
    var w = this.operator$index$1(start);
    this._owner.addChild$2(initialValue, w);
  }
 },
 removeRange$2: function(start, length$) {
  if (typeof length$ !== 'number') return this.removeRange$2$bailout(1, start, length$);
  if (length$ <= 0) return;
  var child = this.operator$index$1(start);
  while (true) {
    --length$;
    if (!(length$ >= 0 && !(child == null))) break;
    var next = child.get$nextSibling();
    child.removeFromParent$0();
    child = next;
  }
 },
 removeRange$2$bailout: function(state, start, length$) {
  if ($.leB(length$, 0)) return;
  var child = this.operator$index$1(start);
  while (true) {
    length$ = $.sub(length$, 1);
    if (!($.geB(length$, 0) && !(child == null))) break;
    var next = child.get$nextSibling();
    child.removeFromParent$0();
    child = next;
  }
 },
 last$0: function() {
  return this._owner.get$lastChild();
 },
 removeLast$0: function() {
  var w = this.last$0();
  !(w == null) && w.removeFromParent$0();
  return w;
 },
 add$1: function(view) {
  this._owner.addChild$1(view);
 },
 operator$indexSet$2: function(index, value) {
  if (value == null) throw $.captureStackTrace($.CTC60);
  var w = this.operator$index$1(index);
  if (!(w == null ? value == null : w === value)) {
    var next = w.get$nextSibling();
    w.removeFromParent$0();
    this._owner.addChild$2(value, next);
  }
 },
 operator$index$1: function(index) {
  if (typeof index !== 'number') return this.operator$index$1$bailout(1, index, 0);
  $.ListUtil_rangeCheck(this, index, 1);
  var t1 = $.get$length(this);
  if (typeof t1 !== 'number') return this.operator$index$1$bailout(2, index, t1);
  var index2 = t1 - index - 1;
  t1 = index <= index2;
  var t2 = this._owner;
  if (t1) {
    var child = t2.get$firstChild();
    for (; --index, index >= 0; ) {
      child = child.get$nextSibling();
    }
    return child;
  }
  child = t2.get$lastChild();
  for (; --index2, index2 >= 0; ) {
    child = child.get$previousSibling();
  }
  return child;
 },
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var index = env0;
      break;
    case 2:
      index = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.ListUtil_rangeCheck(this, index, 1);
      var t1 = $.get$length(this);
    case 2:
      state = 0;
      var index2 = $.sub($.sub(t1, index), 1);
      t1 = $.leB(index, index2);
      var t2 = this._owner;
      if (t1) {
        var child = t2.get$firstChild();
        for (; index = $.sub(index, 1), $.geB(index, 0); ) {
          child = child.get$nextSibling();
        }
        return child;
      }
      child = t2.get$lastChild();
      for (; index2 = $.sub(index2, 1), $.geB(index2, 0); ) {
        child = child.get$previousSibling();
      }
      return child;
  }
 },
 get$length: function() {
  return this._owner.get$childCount();
 },
 iterator$0: function() {
  return $._WCIterator$(this._owner);
 }
};

$$._WCIterator = {"":
 ["_lib3_next="],
 super: "Object",
 next$0: function() {
  var t1 = this._lib3_next;
  if (t1 == null) throw $.captureStackTrace($.CTC4);
  this._lib3_next = t1.get$nextSibling();
  return t1;
 },
 hasNext$0: function() {
  var t1 = this._lib3_next;
  return !(t1 == null);
 },
 _WCIterator$1: function(owner) {
  this._lib3_next = owner.get$firstChild();
 }
};

$$._ChildInfo = {"":
 ["children=", "nChild=", "lastChild=", "firstChild="],
 super: "Object"
};

$$._EventListenerInfo = {"":
 ["domListeners=", "_lib3_listeners", "on?", "_owner"],
 super: "Object",
 unmount$0: function() {
  var t1 = this._lib3_listeners;
  if (!(t1 == null)) {
    t1 = this._owner;
    var n = t1.get$node();
    for (var t2 = $.iterator(this._lib3_listeners.getKeys$0()); t2.hasNext$0() === true; ) {
      var t3 = t2.next$0();
      var t4 = t1.getDOMEventDispatcher_$1(t3);
      !(t4 == null) && $.isEmpty($.index(this._lib3_listeners, t3)) !== true && t1.domUnlisten_$2(n, t3);
    }
  }
 },
 mount$0: function() {
  var t1 = this._lib3_listeners;
  if (!(t1 == null)) {
    t1 = this._owner;
    var n = t1.get$node();
    for (var t2 = $.iterator(this._lib3_listeners.getKeys$0()); t2.hasNext$0() === true; ) {
      var t3 = t2.next$0();
      var disp = t1.getDOMEventDispatcher_$1(t3);
      !(disp == null) && $.isEmpty($.index(this._lib3_listeners, t3)) !== true && t1.domListen_$3(n, t3, disp);
    }
  }
 },
 send$2: function(event$, type) {
  if (type == null) type = event$.get$type();
  var t1 = this._lib3_listeners;
  if (!(t1 == null)) {
    var ls = $.index(t1, type);
    t1 = !(ls == null);
  } else {
    ls = null;
    t1 = false;
  }
  if (t1) {
    event$.set$currentTarget(this._owner);
    for (t1 = $.iterator($.ListFactory_List$from(ls)), dispatched = false; t1.hasNext$0() === true; ) {
      t1.next$0().$call$1(event$);
      if (event$.isPropagationStopped$0() === true) return true;
      dispatched = true;
    }
  } else dispatched = false;
  return dispatched;
  var dispatched;
 },
 remove$2: function(type, listener) {
  var t1 = this._lib3_listeners;
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
      if ($.isEmpty(ls) === true && this._owner.get$inDocument() === true) {
        t1 = this._owner.getDOMEventDispatcher_$1(type);
        var t2 = !(t1 == null);
        t1 = t2;
      } else t1 = false;
      if (t1) {
        t1 = this._owner;
        t1.domUnlisten_$2(t1.get$node(), type);
      }
      var found = true;
    } else found = false;
  } else found = false;
  return found;
 },
 add$2: function(type, listener) {
  var t1 = ({});
  if (listener == null) throw $.captureStackTrace($.CTC44);
  var t2 = this._lib3_listeners;
  if (t2 == null) this._lib3_listeners = $.makeLiteralMap([]);
  t1.first_10 = false;
  $.add$1(this._lib3_listeners.putIfAbsent$2(type, new $._EventListenerInfo_add_anon(t1)), listener);
  if (t1.first_10 === true && this._owner.get$inDocument() === true) {
    var disp = this._owner.getDOMEventDispatcher_$1(type);
    t1 = !(disp == null);
  } else {
    disp = null;
    t1 = false;
  }
  if (t1) {
    t1 = this._owner;
    t1.domListen_$3(t1.get$node(), type, disp);
  }
 },
 isEmpty$1: function(type) {
  var t1 = this._lib3_listeners;
  if (!(t1 == null)) {
    var ls = $.index(t1, type);
    t1 = ls == null;
  } else {
    ls = null;
    t1 = true;
  }
  return t1 || $.isEmpty(ls) === true;
 },
 _EventListenerInfo$1: function(_owner) {
  this.on = $._ViewEvents$(this);
 }
};

$$._ClassSet = {"":
 ["view?", "_backingMap"],
 super: "HashSetImplementation",
 clear$0: function() {
  $.HashSetImplementation.prototype.clear$0.call(this);
  var t1 = this.view;
  t1.get$inDocument() === true && $.clear(t1.get$node().get$classes());
 },
 remove$1: function(name$) {
  var removed = $.HashSetImplementation.prototype.remove$1.call(this, name$);
  removed === true && this.view.get$inDocument() === true && this.view.get$node().get$classes().remove$1(name$);
  return removed;
 },
 add$1: function(name$) {
  $.HashSetImplementation.prototype.add$1.call(this, name$);
  var t1 = this.view;
  t1.get$inDocument() === true && $.add$1(t1.get$node().get$classes(), name$);
 }
};

$$._VirtualIdSpace = {"":
 ["_fellows", "_owner"],
 super: "Object",
 toString$0: function() {
  return '_VirtualIdSpace(' + $.S(this._owner) + ': ' + $.S(this._fellows) + ')';
 },
 get$fellows: function() {
  return this._fellows.getValues$0();
 },
 bindFellow_$2: function(id, fellow) {
  var t1 = !(fellow == null);
  var t2 = this._fellows;
  if (typeof t2 !== 'object' || t2 === null || ((t2.constructor !== Array || !!t2.immutable$list) && !t2.is$JavaScriptIndexingBehavior())) return this.bindFellow_$2$bailout(1, id, fellow, t1, t2);
  if (t1) {
    if (id !== (id | 0)) throw $.iae(id);
    t1 = t2.length;
    if (id < 0 || id >= t1) throw $.ioore(id);
    t2[id] = fellow;
  } else t2.remove$1(id);
 },
 bindFellow_$2$bailout: function(state, id, fellow, t1, t2) {
  if (t1) $.indexSet(t2, id, fellow);
  else t2.remove$1(id);
 },
 getFellow$1: function(id) {
  var t1 = this._fellows;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.getFellow$1$bailout(1, t1, id);
  if (id !== (id | 0)) throw $.iae(id);
  var t2 = t1.length;
  if (id < 0 || id >= t2) throw $.ioore(id);
  return t1[id];
 },
 getFellow$1$bailout: function(state, t1, id) {
  return $.index(t1, id);
 },
 query$1: function(selector) {
  return this._owner.query$1(selector);
 },
 is$IdSpace: true
};

$$.Section = {"":
 ["_fellows", "_inDoc", "_hidden", "_layout", "_profile", "_height", "_width", "_lib3_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib3_parent", "_lib3_uuid", "_id"],
 super: "View",
 get$domTag_: function() {
  return 'section';
 },
 bindFellow_$2: function(id, fellow) {
  var t1 = !(fellow == null);
  var t2 = this._fellows;
  if (t1) $.indexSet(t2, id, fellow);
  else t2.remove$1(id);
 },
 getFellow$1: function(id) {
  return $.index(this._fellows, id);
 },
 get$className: function() {
  return 'Section';
 },
 Section$0: function() {
  this._fellows = $.makeLiteralMap([]);
 },
 is$IdSpace: true
};

$$.TextView = {"":
 ["_html", "_text", "_inDoc", "_hidden", "_layout", "_profile", "_height", "_width", "_lib3_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib3_parent", "_lib3_uuid", "_id"],
 super: "View",
 toString$0: function() {
  return $.S(this.get$className()) + '(\'' + $.S(this.get$text()) + $.S(this.get$html()) + '\')';
 },
 isViewGroup$0: function() {
  return false;
 },
 domInner_$1: function(out) {
  $.add$1(out, this.get$innerHTML_());
 },
 get$encodedText: function() {
  return $.StringUtil_encodeXML(this.get$text(), true, 0, false);
 },
 get$innerHTML_: function() {
  return $.S(this.get$encodedText()) + $.S(this.get$html());
 },
 updateInner_$0: function() {
  if (this.get$inDocument() === true) {
    var t1 = this.get$innerHTML_();
    this.get$node().set$innerHTML(t1);
  }
 },
 get$html: function() {
  return this._html;
 },
 set$text: function(text) {
  this._text = !(text == null) ? text : '';
  this.updateInner_$0();
 },
 get$text: function() {
  return this._text;
 },
 get$className: function() {
  return 'TextView';
 },
 TextView$1: function(text) {
  this._text = !(text == null) ? text : '';
  this._html = '';
 }
};

$$.Canvas = {"":
 ["_inDoc", "_hidden", "_layout", "_profile", "_height", "_width", "_lib3_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib3_parent", "_lib3_uuid", "_id"],
 super: "View",
 get$domTag_: function() {
  return 'canvas';
 },
 domAttrs_$4: function(out, noId, noStyle, noClass) {
  var t1 = this.get$width();
  !(t1 == null) && $.add$1($.add$1($.add$1(out, '  width="'), this.get$width()), '"');
  t1 = this.get$height();
  !(t1 == null) && $.add$1($.add$1($.add$1(out, '  height="'), this.get$height()), '"');
  $.View.prototype.domAttrs_$4.call(this, out, noId, noStyle, noClass);
 },
 domAttrs_$1: function(out) {
  return this.domAttrs_$4(out,false,false,false)
},
 set$height: function(height) {
  $.View.prototype.set$height.call(this, height);
  this.get$inDocument() === true && this.get$canvasNode().set$height(height);
 },
 set$width: function(width) {
  $.View.prototype.set$width.call(this, width);
  this.get$inDocument() === true && this.get$canvasNode().set$width(width);
 },
 get$canvasNode: function() {
  return this.get$node();
 },
 get$context2D: function() {
  return this.get$canvasNode().getContext$1('2d');
 },
 get$className: function() {
  return 'Canvas';
 }
};

$$.ViewEvent = {"":
 ["currentTarget!", "target=", "_propStop", "_offsetReady", "_offset", "_stamp", "_type", "_domEvt"],
 super: "Object",
 toString$0: function() {
  return 'ViewEvent(' + $.S(this.target) + ',' + $.S(this.get$type()) + ')';
 },
 isPropagationStopped$0: function() {
  return this._propStop;
 },
 get$type: function() {
  return this._type;
 },
 get$timeStamp: function() {
  return this._stamp;
 },
 get$domEvent: function() {
  return this._domEvt;
 },
 get$offset: function() {
  if (this._offsetReady !== true) {
    this._offsetReady = true;
    try {
      var t1 = this.get$domEvent();
      if (!(t1 == null)) {
        t1 = this.get$domEvent();
        if (!((typeof t1 === 'object' && t1 !== null) && t1.is$UIEvent())) return this._offset;
        var uievt = this.get$domEvent();
        t1 = uievt.get$pageX();
        var t2 = this._offset;
        t2.set$x(t1);
        t2.set$y(uievt.get$pageY());
      }
      var ofs = $.DOMQuery_DOMQuery(this.target).get$documentOffset();
      t1 = this._offset;
      t1.set$left($.sub(t1.get$left(), ofs.get$left()));
      t1.set$top($.sub(t1.get$top(), ofs.get$top()));
    } catch (exception) {
      t1 = $.unwrapException(exception);
      var e = t1;
      $.print('Faile to get offset for ' + $.S(this) + ', ' + $.S(e));
    }
  }
  return this._offset;
 },
 ViewEvent$dom$3: function(domEvent, type, target) {
  this.currentTarget = target;
  this.target = target;
  this._offset = $._Offset$(0, 0);
 },
 ViewEvent$6: function(type, target, pageX, pageY, offsetX, offsetY) {
  if (type == null) throw $.captureStackTrace($.CTC43);
  this.currentTarget = target;
  this.target = target;
  var t1 = !(pageX == null) && !(pageY == null);
  if (t1) this._offset = $._Offset$(pageX, pageY);
  else {
    t1 = !(offsetX == null) ? offsetX : 0;
    this._offset = $._Offset$(t1, !(offsetY == null) ? offsetY : 0);
    this._offsetReady = true;
  }
 }
};

$$._ViewEventListenerList = {"":
 ["_type", "_lib2_ptr?"],
 super: "Object",
 isEmpty$0: function() {
  return this._lib2_ptr.isEmpty$1(this._type);
 },
 remove$1: function(handler) {
  this._lib2_ptr.remove$2(this._type, handler);
  return this;
 },
 add$1: function(handler) {
  this._lib2_ptr.add$2(this._type, handler);
  return this;
 }
};

$$._ViewEventListenerMap = {"":
 ["_lib2_ptr?"],
 super: "Object",
 _get$1: function(type) {
  return this._lnlist.putIfAbsent$2(type, new $._ViewEventListenerMap__get_anon(this, type));
 },
 operator$index$1: function(type) {
  return this._get$1(type);
 }
};

$$._ViewEvents = {"":
 ["_lnlist", "_lib2_ptr"],
 super: "_ViewEventListenerMap",
 get$unmount: function() {
  return this._get$1('unmount');
 },
 unmount$0: function() { return this.get$unmount().$call$0(); },
 get$mount: function() {
  return this._get$1('mount');
 },
 mount$0: function() { return this.get$mount().$call$0(); },
 get$layout: function() {
  return this._get$1('layout');
 },
 get$mouseUp: function() {
  return this._get$1('mouseUp');
 },
 get$mouseMove: function() {
  return this._get$1('mouseMove');
 },
 get$mouseDown: function() {
  return this._get$1('mouseDown');
 },
 get$keyDown: function() {
  return this._get$1('keyDown');
 },
 get$click: function() {
  return this._get$1('click');
 }
};

$$._BroadcastEvents = {"":
 ["_lnlist", "_lib2_ptr"],
 super: "_ViewEventListenerMap"
};

$$._Broadcaster = {"":
 ["_on", "_listeners"],
 super: "Object",
 sendEvent$2: function(event$, type) {
  return this._listeners.send$2(event$, type);
 },
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,null)
},
 get$on: function() {
  return this._on;
 },
 _Broadcaster$0: function() {
  this._listeners = $._BroadcastListeners$(this);
  this._on = $._BroadcastEvents$(this._listeners);
 }
};

$$._BroadcastListeners = {"":
 ["_listeners", "_lib2_owner"],
 super: "Object",
 send$2: function(event$, type) {
  if (type == null) type = event$.get$type();
  var ls = $.index(this._listeners, type);
  if (!(ls == null)) {
    for (var t1 = $.iterator($.ListFactory_List$from(ls)), dispatched = false; t1.hasNext$0() === true; ) {
      t1.next$0().$call$1(event$);
      if (event$.isPropagationStopped$0() === true) return true;
      dispatched = true;
    }
  } else dispatched = false;
  return dispatched;
 },
 remove$2: function(type, listener) {
  var ls = $.index(this._listeners, type);
  return !(ls == null) && $.ListUtil_remove(ls, listener) === true;
 },
 add$2: function(type, listener) {
  if (listener == null) throw $.captureStackTrace($.CTC44);
  $.add$1(this._listeners.putIfAbsent$2(type, new $._BroadcastListeners_add_anon()), listener);
 },
 isEmpty$1: function(type) {
  var t1 = this._listeners;
  if (!(t1 === null)) {
    var ls = $.index(t1, type);
    t1 = ls == null;
  } else {
    ls = null;
    t1 = true;
  }
  return t1 || $.isEmpty(ls) === true;
 }
};

$$.PopupEvent = {"":
 ["_source", "currentTarget", "target", "_propStop", "_offsetReady", "_offset", "_stamp", "_type", "_domEvt"],
 super: "ViewEvent",
 get$source: function() {
  return this._source;
 },
 source$1: function(arg0) { return this.get$source().$call$1(arg0); }
};

$$.LayoutManager = {"":
 ["_inLayout", "_afters", "_imgWaits", "_layouts", "_ignoreSubviews", "_ignoreDetached", "_readyChecks", "_task", "_views", "_runQue"],
 super: "RunOnceViewManager",
 doLayout$2: function(mctx, view) {
  if (view.get$hidden() !== true) {
    var t1 = view.get$parent();
    if (t1 == null) {
      t1 = view.get$profile().get$anchorView();
      t1 = t1 == null;
    } else t1 = false;
    if (t1) {
      mctx.setWidthByProfile$2(view, new $.LayoutManager_doLayout_anon());
      mctx.setHeightByProfile$2(view, new $.LayoutManager_doLayout_anon0());
      $.AnchorRelation__positionRoot(view);
    }
    view.onPreLayout_$0();
    this.getLayoutOfView$1(view).doLayout$2(mctx, view);
    view.onLayout_$0();
  }
 },
 afterLayout$1: function(task) {
  if ($.leB(this._inLayout, 0) && this.isQueueEmpty$0() === true) task.$call$0();
  else $.add$1(this._afters, task);
 },
 handle_$1: function(view) {
  this._inLayout = this._inLayout + 1;
  try {
    this.doLayout$2($.MeasureContext$(), view);
  } finally {
    var t1 = this._inLayout - 1;
    this._inLayout = t1;
    if ($.leB(t1, 0) && this.isQueueEmpty$0() === true && $.isEmpty(this._afters) !== true) {
      t1 = this._afters;
      var afters = $.ListFactory_List$from(t1);
      $.clear(t1);
      for (t1 = $.iterator(afters); t1.hasNext$0() === true; ) {
        var task = t1.next$0();
        task.$call$0();
      }
    }
  }
 },
 flush$1: function(view) {
  if ($.isEmpty(this._imgWaits) === true) $.RunOnceViewManager.prototype.flush$1.call(this, view);
  else {
    !(view == null) && this.queue$1(view);
  }
 },
 flush$0: function() {
  return this.flush$1(null)
},
 sizeUpdated$3: function(view, value, horizontal) {
  var nm = horizontal === true ? 'rk.layout.w' : 'rk.layout.h';
  if ($.gtB(this._inLayout, 0)) $.indexSet(view.get$dataAttributes(), nm, value);
  else view.get$dataAttributes().remove$1(nm);
 },
 requestLayout$3: function(view, immediate, descendantOnly) {
  if (descendantOnly !== true) {
    var parent$ = view.get$parent();
    if (!(parent$ == null)) {
      var t1 = view.get$profile().get$anchorView();
      if (!(!(t1 == null) || $.isEmpty(parent$.get$layout().get$type()) !== true)) {
        t1 = $.MeasureContext__getSetByApp(view, view.get$width(), 'rk.layout.w');
        t1 = t1 == null;
      } else t1 = true;
      if (!t1) {
        t1 = $.MeasureContext__getSetByApp(view, view.get$height(), 'rk.layout.h');
        t1 = t1 == null;
      } else t1 = true;
    } else t1 = false;
    if (t1) view = parent$;
  }
  if (immediate === true) this.flush$1(view);
  else this.queue$1(view);
 },
 getLayoutOfView$1: function(view) {
  var name$ = view.get$layout().get$type();
  var clayout = this.getLayout$1(name$);
  if (clayout == null) throw $.captureStackTrace($.UIException$('Unknown layout, ' + $.S(name$)));
  return clayout;
 },
 getLayout$1: function(name$) {
  return $.index(this._layouts, name$);
 },
 addLayout$2: function(name$, clayout) {
  var t1 = this._layouts;
  var old = $.index(t1, name$);
  $.indexSet(t1, name$, clayout);
  return old;
 },
 LayoutManager$0: function() {
  this.addLayout$2('linear', $.LinearLayout$());
  var freeLayout = $.FreeLayout$();
  this.addLayout$2('none', freeLayout);
  this.addLayout$2('', freeLayout);
 }
};

$$.MeasureContext = {"":
 ["_borderWds", "heights?", "widths?"],
 super: "Object",
 getHeightSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$(this.getProfile$2(view, 'height'));
  switch (amtInf.type) {
    case 1:
      return amtInf.value;
    case 0:
      return $.MeasureContext__getSetByApp(view, view.get$height(), 'rk.layout.h');
  }
 },
 getWidthSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$(this.getProfile$2(view, 'width'));
  switch (amtInf.type) {
    case 1:
      return amtInf.value;
    case 0:
      return $.MeasureContext__getSetByApp(view, view.get$width(), 'rk.layout.w');
  }
 },
 _measureByContent$2: function(view, autowidth) {
  if (view.get$hidden() === true) {
    $.indexSet(this.widths, view, 0);
    $.indexSet(this.heights, view, 0);
    return $._Size$(0, 0);
  }
  var t1 = autowidth === true;
  if (t1) {
    var nodestyle = view.get$node().get$style();
    var pos = nodestyle.get$position();
    if (!$.eqB(pos, 'fixed') && !$.eqB(pos, 'static')) {
      var orgspace = nodestyle.get$whiteSpace();
      if (orgspace == null) orgspace = '';
      nodestyle.set$whiteSpace('nowrap');
    } else orgspace = null;
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
  !(orgspace == null) && nodestyle.set$whiteSpace(orgspace);
  !(orgwd == null) && $.isEmpty(orgwd) !== true && nodestyle.set$width(orgwd);
  !(orghgh == null) && $.isEmpty(orghgh) !== true && nodestyle.set$height(orghgh);
  var parentInnerWidth = new $.MeasureContext__measureByContent_anon(view);
  var parentInnerHeight = new $.MeasureContext__measureByContent_anon0(view);
  var limit = $.MeasureContext__amountOf(view.get$profile().get$maxWidth(), parentInnerWidth);
  if (!(t1 && $.gtB(size.width, $.browser.get$size().get$width()))) {
    t1 = !(limit == null) && $.gtB(size.width, limit);
  } else t1 = true;
  if (t1) {
    nodestyle.set$width($.CSS_px(!(limit == null) ? limit : $.browser.get$size().get$width()));
    size.width = qview.get$outerWidth();
    size.height = qview.get$outerHeight();
  }
  limit = $.MeasureContext__amountOf(view.get$profile().get$maxHeight(), parentInnerHeight);
  if (!(limit == null) && $.gtB(size.height, limit)) size.height = limit;
  limit = $.MeasureContext__amountOf(view.get$profile().get$minWidth(), parentInnerWidth);
  if (!(limit == null) && $.ltB(size.width, limit)) size.width = limit;
  limit = $.MeasureContext__amountOf(view.get$profile().get$minHeight(), parentInnerHeight);
  if (!(limit == null) && $.ltB(size.height, limit)) size.height = limit;
  $.indexSet(this.widths, view, size.width);
  $.indexSet(this.heights, view, size.height);
  return size;
 },
 measureHeightByContent$2: function(view, autowidth) {
  var t1 = this.heights;
  var hgh = $.index(t1, view);
  return !(hgh == null) || t1.containsKey$1(view) === true ? hgh : this._measureByContent$2(view, autowidth).get$height();
 },
 measureWidthByContent$2: function(view, autowidth) {
  var t1 = this.widths;
  var wd = $.index(t1, view);
  return !(wd == null) || t1.containsKey$1(view) === true ? wd : this._measureByContent$2(view, autowidth).get$width();
 },
 measureHeight$1: function(view) {
  return view.get$hidden() === true ? 0 : $.layoutManager.getLayoutOfView$1(view).measureHeight$2(this, view);
 },
 measureWidth$1: function(view) {
  return view.get$hidden() === true ? 0 : $.layoutManager.getLayoutOfView$1(view).measureWidth$2(this, view);
 },
 setHeightByProfile$2: function(view, height) {
  if (view.get$hidden() !== true) {
    var amt = $.LayoutAmountInfo$(this.getProfile$2(view, 'height'));
    var t1 = amt.type;
    switch (t1) {
      case 1:
        view.set$height(amt.value);
        break;
      case 2:
        view.set$height(height.$call$0());
        break;
      case 3:
        view.set$height($.toInt($.round($.mul(height.$call$0(), amt.value))));
        break;
      case 0:
      case 4:
        if ($.eqB(t1, 0)) {
          t1 = this.getHeightSetByApp$1(view);
          var t2 = !(t1 == null);
          t1 = t2;
        } else t1 = false;
        if (t1) break;
        var hgh = view.measureHeight_$1(this);
        !(hgh == null) && view.set$height(hgh);
        break;
    }
  }
 },
 setWidthByProfile$2: function(view, width) {
  if (view.get$hidden() !== true) {
    var amt = $.LayoutAmountInfo$(this.getProfile$2(view, 'width'));
    var t1 = amt.type;
    switch (t1) {
      case 1:
        view.set$width(amt.value);
        break;
      case 2:
        view.set$width(width.$call$0());
        break;
      case 3:
        view.set$width($.toInt($.round($.mul(width.$call$0(), amt.value))));
        break;
      case 0:
      case 4:
        if ($.eqB(t1, 0)) {
          t1 = this.getWidthSetByApp$1(view);
          var t2 = !(t1 == null);
          t1 = t2;
        } else t1 = false;
        if (t1) break;
        var wd = view.measureWidth_$1(this);
        !(wd == null) && view.set$width(wd);
        break;
    }
  }
 },
 getProfile$2: function(view, name$) {
  var v = view.get$profile().getPropertyValue$1(name$);
  if ($.isEmpty(v) === true) {
    var t1 = view.get$parent();
    t1 = t1 == null;
  } else t1 = true;
  return t1 || $.layoutManager.getLayoutOfView$1(view.get$parent()).isProfileInherited$0() !== true ? v : view.get$parent().get$layout().getPropertyValue$1(name$);
 },
 getBorderWidth$1: function(view) {
  var t1 = this._borderWds;
  var v = $.index(t1, view);
  if (v == null) {
    v = $.DOMQuery_DOMQuery(view.get$node()).get$borderWidth();
    $.indexSet(t1, view, v);
  }
  return v;
 }
};

$$.FreeLayout = {"":
 [],
 super: "Object",
 doLayout$2: function(mctx, view) {
  var t1 = view.get$firstChild();
  if (!(t1 == null)) {
    var ar = $.AnchorRelation$(view);
    var innerWidth$ = new $.FreeLayout_doLayout_anon(view);
    var innerHeight$ = new $.FreeLayout_doLayout_anon0(view);
    for (t1 = $.iterator(ar.indeps); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      mctx.setWidthByProfile$2(t2, innerWidth$);
      mctx.setHeightByProfile$2(t2, innerHeight$);
    }
    ar.layoutAnchored$1(mctx);
    for (t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
      t2 = t1.next$0();
      t2.get$hidden() !== true && t2.doLayout_$1(mctx);
    }
  }
 },
 isProfileInherited$0: function() {
  return false;
 },
 measureHeight$2: function(mctx, view) {
  var hgh = $.index(mctx.get$heights(), view);
  if (!(hgh == null) || mctx.get$heights().containsKey$1(view) === true) return hgh;
  hgh = mctx.getHeightSetByApp$1(view);
  if (hgh == null) {
    hgh = view.get$innerHeight();
    if (typeof hgh !== 'number') return this.measureHeight$2$bailout(1, mctx, view, hgh);
    for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      if (view.shallLayout_$1(t2) === true) {
        var t3 = t2.get$profile().get$anchorView();
        t3 = t3 == null;
      } else t3 = false;
      if (t3) {
        var subsz = t2.measureHeight_$1(mctx);
        t2 = t2.get$top();
        subsz = $.add(t2, !(subsz == null) ? subsz : 0);
        if (hgh == null || $.gtB(subsz, hgh)) hgh = subsz;
      }
    }
    if (!(hgh == null)) hgh = $.add(hgh, $.shl(mctx.getBorderWidth$1(view), 1));
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
      if (!(hgh == null) || mctx.get$heights().containsKey$1(view) === true) return hgh;
      hgh = mctx.getHeightSetByApp$1(view);
    case 1:
      if (state == 1 || (state == 0 && hgh == null)) {
        switch (state) {
          case 0:
            hgh = view.get$innerHeight();
          case 1:
            state = 0;
            for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
              var t2 = t1.next$0();
              if (view.shallLayout_$1(t2) === true) {
                var t3 = t2.get$profile().get$anchorView();
                t3 = t3 == null;
              } else t3 = false;
              if (t3) {
                var subsz = t2.measureHeight_$1(mctx);
                t2 = t2.get$top();
                subsz = $.add(t2, !(subsz == null) ? subsz : 0);
                if (hgh == null || $.gtB(subsz, hgh)) hgh = subsz;
              }
            }
            if (!(hgh == null)) hgh = $.add(hgh, $.shl(mctx.getBorderWidth$1(view), 1));
        }
      }
      $.indexSet(mctx.get$heights(), view, hgh);
      return hgh;
  }
 },
 measureWidth$2: function(mctx, view) {
  var wd = $.index(mctx.get$widths(), view);
  if (!(wd == null) || mctx.get$widths().containsKey$1(view) === true) return wd;
  wd = mctx.getWidthSetByApp$1(view);
  if (wd == null) {
    wd = view.get$innerWidth();
    if (typeof wd !== 'number') return this.measureWidth$2$bailout(1, mctx, view, wd);
    for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      if (view.shallLayout_$1(t2) === true) {
        var t3 = t2.get$profile().get$anchorView();
        t3 = t3 == null;
      } else t3 = false;
      if (t3) {
        var subsz = t2.measureWidth_$1(mctx);
        t2 = t2.get$left();
        subsz = $.add(t2, !(subsz == null) ? subsz : 0);
        if (wd == null || $.gtB(subsz, wd)) wd = subsz;
      }
    }
    if (!(wd == null)) wd = $.add(wd, $.shl(mctx.getBorderWidth$1(view), 1));
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
      if (!(wd == null) || mctx.get$widths().containsKey$1(view) === true) return wd;
      wd = mctx.getWidthSetByApp$1(view);
    case 1:
      if (state == 1 || (state == 0 && wd == null)) {
        switch (state) {
          case 0:
            wd = view.get$innerWidth();
          case 1:
            state = 0;
            for (var t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
              var t2 = t1.next$0();
              if (view.shallLayout_$1(t2) === true) {
                var t3 = t2.get$profile().get$anchorView();
                t3 = t3 == null;
              } else t3 = false;
              if (t3) {
                var subsz = t2.measureWidth_$1(mctx);
                t2 = t2.get$left();
                subsz = $.add(t2, !(subsz == null) ? subsz : 0);
                if (wd == null || $.gtB(subsz, wd)) wd = subsz;
              }
            }
            if (!(wd == null)) wd = $.add(wd, $.shl(mctx.getBorderWidth$1(view), 1));
        }
      }
      $.indexSet(mctx.get$widths(), view, wd);
      return wd;
  }
 }
};

$$.LinearLayout = {"":
 [],
 super: "Object",
 doLayout$2: function(mctx, view) {
  var t1 = view.get$firstChild();
  if (!(t1 == null)) {
    var ar = $.AnchorRelation$(view);
    $.LinearLayout__getRealLayout(view).doLayout$3(mctx, view, ar.indeps);
    ar.layoutAnchored$1(mctx);
    for (t1 = $.iterator(view.get$children()); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      t2.get$hidden() !== true && t2.doLayout_$1(mctx);
    }
  }
 },
 isProfileInherited$0: function() {
  return true;
 },
 measureHeight$2: function(mctx, view) {
  var height = $.index(mctx.get$heights(), view);
  if (!(height == null) || mctx.get$heights().containsKey$1(view) === true) return height;
  var t1 = mctx.get$heights();
  var t2 = $.LinearLayout__getRealLayout(view).measureHeight$2(mctx, view);
  $.indexSet(t1, view, t2);
  return t2;
 },
 measureWidth$2: function(mctx, view) {
  var width = $.index(mctx.get$widths(), view);
  if (!(width == null) || mctx.get$widths().containsKey$1(view) === true) return width;
  var t1 = mctx.get$widths();
  var t2 = $.LinearLayout__getRealLayout(view).measureWidth$2(mctx, view);
  $.indexSet(t1, view, t2);
  return t2;
 }
};

$$._HLayout = {"":
 [],
 super: "Object",
 doLayout$3: function(mctx, view, children) {
  var innerWidth$ = new $._HLayout_doLayout_anon(view);
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defpwd = view.get$layout().get$width();
  var childspcinfs = $.HashMapImplementation$();
  var flexViews = $.ListFactory_List(null);
  var flexs = $.ListFactory_List(null);
  for (var t1 = $.iterator(children), nflex = 0, prevSpacing = null, assigned = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $._HLayout_doLayout_anon0(view));
      mctx.setHeightByProfile$2(t2, new $._HLayout_doLayout_anon1(view));
      continue;
    }
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing == null) var t3 = si.left;
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.left);
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.right;
    var pwd = t2.get$profile().get$width();
    var amt = $.LayoutAmountInfo$($.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case 1:
        t3 = amt.value;
        t2.set$width(t3);
        if (typeof t3 !== 'number') throw $.iae(t3);
        assigned += t3;
        break;
      case 2:
        t3 = amt.value;
        if (typeof t3 !== 'number') throw $.iae(t3);
        nflex += t3;
        flexs.push(t3);
        flexViews.push(t2);
        break;
      case 3:
        t3 = $.toInt($.round($.mul(innerWidth$.$call$0(), amt.value)));
        t2.set$width(t3);
        if (typeof t3 !== 'number') throw $.iae(t3);
        assigned += t3;
        break;
      default:
        var wd = t2.measureWidth_$1(mctx);
        if (!(wd == null)) {
          t2.set$width(wd);
          if (typeof wd !== 'number') throw $.iae(wd);
          assigned += wd;
        } else {
          t3 = t2.get$outerWidth();
          if (typeof t3 !== 'number') throw $.iae(t3);
          assigned += t3;
        }
        break;
    }
    mctx.setHeightByProfile$2(t2, new $._HLayout_doLayout_anon2(view, si));
  }
  if (nflex > 0) {
    var space = $.sub($.sub(innerWidth$.$call$0(), assigned), prevSpacing);
    var per = $.div(space, nflex);
    for (var len = flexs.length - 1, j = 0; true; ++j) {
      if (j === len) {
        t1 = flexViews.length;
        if (j < 0 || j >= t1) throw $.ioore(j);
        flexViews[j].set$width(space);
        break;
      }
      t1 = flexs.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      t2 = flexViews.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      flexViews[j].set$width(delta);
      space = $.sub(space, delta);
    }
  }
  var defAlign = view.get$layout().get$align();
  for (t1 = $.iterator(children), prevSpacing = null, assigned = 0; t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) continue;
    si = childspcinfs.operator$index$1(t2);
    if (prevSpacing == null) t3 = si.get$left();
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.get$left());
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    t2.set$left(assigned);
    t3 = t2.get$outerWidth();
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.get$right();
    var align = t2.get$profile().get$align();
    if ($.isEmpty(align) === true) align = defAlign;
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
 },
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va == null)) return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var defphgh = view.get$layout().get$height();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  for (var t1 = $.iterator(view.get$children()), height = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) === true) {
      var t3 = t2.get$profile().get$anchorView();
      var t4 = !(t3 == null);
      t3 = t4;
    } else t3 = true;
    if (t3) continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    var hgh = $.add($.add(si.top, si.bottom), borderWd);
    var phgh = t2.get$profile().get$height();
    var amt = $.LayoutAmountInfo$($.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case 1:
        hgh = $.add(hgh, amt.value);
        break;
      case 0:
      case 4:
        var h = t2.measureHeight_$1(mctx);
        hgh = $.add(hgh, !(h == null) ? h : t2.get$outerHeight());
        break;
      default:
        continue;
    }
    if (height == null || $.gtB(hgh, height)) height = hgh;
  }
  return height;
 },
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va == null)) return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defpwd = view.get$layout().get$width();
  for (var t1 = $.iterator(view.get$children()), prevSpacing = null, width = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) === true) {
      var t3 = t2.get$profile().get$anchorView();
      var t4 = !(t3 == null);
      t3 = t4;
    } else t3 = true;
    if (t3) continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing == null) t3 = si.left;
    else {
      t3 = gapinf.left;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.left);
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    width += t3;
    prevSpacing = si.right;
    var pwd = t2.get$profile().get$width();
    var amt = $.LayoutAmountInfo$($.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case 1:
        t2 = amt.value;
        if (typeof t2 !== 'number') throw $.iae(t2);
        width += t2;
        break;
      case 0:
      case 4:
        var wd = t2.measureWidth_$1(mctx);
        t2 = !(wd == null) ? wd : t2.get$outerWidth();
        if (typeof t2 !== 'number') throw $.iae(t2);
        width += t2;
        break;
    }
  }
  t1 = $.mul(mctx.getBorderWidth$1(view), 2);
  t1 = $.add(t1, !(prevSpacing == null) ? prevSpacing : $.add(spcinf.left, spcinf.right));
  if (typeof t1 !== 'number') throw $.iae(t1);
  return width + t1;
 }
};

$$._VLayout = {"":
 [],
 super: "Object",
 doLayout$3: function(mctx, view, children) {
  var innerHeight$ = new $._VLayout_doLayout_anon(view);
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defphgh = view.get$layout().get$height();
  var childspcinfs = $.HashMapImplementation$();
  var flexViews = $.ListFactory_List(null);
  var flexs = $.ListFactory_List(null);
  for (var t1 = $.iterator(children), nflex = 0, prevSpacing = null, assigned = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $._VLayout_doLayout_anon0(view));
      mctx.setHeightByProfile$2(t2, new $._VLayout_doLayout_anon1(view));
      continue;
    }
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing == null) var t3 = si.top;
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.top);
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.bottom;
    var phgh = t2.get$profile().get$height();
    var amt = $.LayoutAmountInfo$($.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case 1:
        t3 = amt.value;
        t2.set$height(t3);
        if (typeof t3 !== 'number') throw $.iae(t3);
        assigned += t3;
        break;
      case 2:
        t3 = amt.value;
        if (typeof t3 !== 'number') throw $.iae(t3);
        nflex += t3;
        flexs.push(t3);
        flexViews.push(t2);
        break;
      case 3:
        t3 = $.toInt($.round($.mul(innerHeight$.$call$0(), amt.value)));
        t2.set$height(t3);
        if (typeof t3 !== 'number') throw $.iae(t3);
        assigned += t3;
        break;
      default:
        var hgh = t2.measureHeight_$1(mctx);
        if (!(hgh == null)) {
          t2.set$height(hgh);
          if (typeof hgh !== 'number') throw $.iae(hgh);
          assigned += hgh;
        } else {
          t3 = t2.get$outerHeight();
          if (typeof t3 !== 'number') throw $.iae(t3);
          assigned += t3;
        }
        break;
    }
    mctx.setWidthByProfile$2(t2, new $._VLayout_doLayout_anon2(view, si));
  }
  if (nflex > 0) {
    var space = $.sub($.sub(innerHeight$.$call$0(), assigned), prevSpacing);
    var per = $.div(space, nflex);
    for (var len = flexs.length - 1, j = 0; true; ++j) {
      if (j === len) {
        t1 = flexViews.length;
        if (j < 0 || j >= t1) throw $.ioore(j);
        flexViews[j].set$height(space);
        break;
      }
      t1 = flexs.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      t2 = flexViews.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      flexViews[j].set$height(delta);
      space = $.sub(space, delta);
    }
  }
  var defAlign = view.get$layout().get$align();
  for (t1 = $.iterator(children), prevSpacing = null, assigned = 0; t1.hasNext$0() === true; ) {
    t2 = t1.next$0();
    if (view.shallLayout_$1(t2) !== true) continue;
    si = childspcinfs.operator$index$1(t2);
    if (prevSpacing == null) t3 = si.get$top();
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.get$top());
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    t2.set$top(assigned);
    t3 = t2.get$outerHeight();
    if (typeof t3 !== 'number') throw $.iae(t3);
    assigned += t3;
    prevSpacing = si.get$bottom();
    var align = t2.get$profile().get$align();
    if ($.isEmpty(align) === true) align = defAlign;
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
 },
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va == null)) return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var defpwd = view.get$layout().get$width();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  for (var t1 = $.iterator(view.get$children()), width = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) === true) {
      var t3 = t2.get$profile().get$anchorView();
      var t4 = !(t3 == null);
      t3 = t4;
    } else t3 = true;
    if (t3) continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    var wd = $.add($.add(si.left, si.right), borderWd);
    var pwd = t2.get$profile().get$width();
    var amt = $.LayoutAmountInfo$($.isEmpty(pwd) === true ? defpwd : pwd);
    switch (amt.type) {
      case 1:
        wd = $.add(wd, amt.value);
        break;
      case 0:
      case 4:
        var w = t2.measureWidth_$1(mctx);
        wd = $.add(wd, !(w == null) ? w : t2.get$outerWidth());
        break;
      default:
        continue;
    }
    if (width == null || $.gtB(wd, width)) width = wd;
  }
  return width;
 },
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va == null)) return va;
  var spcinf = $.LayoutSideInfo$(view.get$layout().get$spacing(), 3, null);
  var gapinf = $.LayoutSideInfo$(view.get$layout().get$gap(), null, null);
  var defphgh = view.get$layout().get$height();
  for (var t1 = $.iterator(view.get$children()), prevSpacing = null, height = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (view.shallLayout_$1(t2) === true) {
      var t3 = t2.get$profile().get$anchorView();
      var t4 = !(t3 == null);
      t3 = t4;
    } else t3 = true;
    if (t3) continue;
    var si = $.LayoutSideInfo$(t2.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing == null) t3 = si.top;
    else {
      t3 = gapinf.top;
      t3 = !(t3 == null) ? t3 : $.Math_max(prevSpacing, si.top);
    }
    if (typeof t3 !== 'number') throw $.iae(t3);
    height += t3;
    prevSpacing = si.bottom;
    var phgh = t2.get$profile().get$height();
    var amt = $.LayoutAmountInfo$($.isEmpty(phgh) === true ? defphgh : phgh);
    switch (amt.type) {
      case 1:
        t2 = amt.value;
        if (typeof t2 !== 'number') throw $.iae(t2);
        height += t2;
        break;
      case 0:
      case 4:
        var hgh = t2.measureHeight_$1(mctx);
        t2 = !(hgh == null) ? hgh : t2.get$outerHeight();
        if (typeof t2 !== 'number') throw $.iae(t2);
        height += t2;
        break;
    }
  }
  t1 = $.mul(mctx.getBorderWidth$1(view), 2);
  t1 = $.add(t1, !(prevSpacing == null) ? prevSpacing : $.add(spcinf.top, spcinf.bottom));
  if (typeof t1 !== 'number') throw $.iae(t1);
  return height + t1;
 }
};

$$.AnchorRelation = {"":
 ["parent?", "anchored", "indeps"],
 super: "Object",
 _layoutAnchored$2: function(mctx, anchor) {
  var views = this.anchored.operator$index$1(anchor);
  if (!(views == null) && $.isEmpty(views) !== true) {
    for (var t1 = $.iterator(views); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      mctx.setWidthByProfile$2(t2, new $.AnchorRelation__layoutAnchored_anon(t2, anchor));
      mctx.setHeightByProfile$2(t2, new $.AnchorRelation__layoutAnchored_anon0(t2, anchor));
      var handlers = $.AnchorRelation__getHandlers(t2.get$profile().get$location());
      if (typeof handlers !== 'string' && (typeof handlers !== 'object' || handlers === null || (handlers.constructor !== Array && !handlers.is$JavaScriptIndexingBehavior()))) return this._layoutAnchored$2$bailout(1, mctx, anchor, handlers, views, t2, t1, 0, 0);
      var offset = $.AnchorRelation__getOffset(anchor, t2);
      var t3 = $._anchorXHandlers();
      if (typeof t3 !== 'string' && (typeof t3 !== 'object' || t3 === null || (t3.constructor !== Array && !t3.is$JavaScriptIndexingBehavior()))) return this._layoutAnchored$2$bailout(2, mctx, anchor, handlers, offset, t3, views, t2, t1);
      var t4 = handlers.length;
      if (0 >= t4) throw $.ioore(0);
      var t5 = handlers[0];
      if (t5 !== (t5 | 0)) throw $.iae(t5);
      var t6 = t3.length;
      if (t5 < 0 || t5 >= t6) throw $.ioore(t5);
      t3[t5].$call$3(offset.get$left(), anchor, t2);
      var t7 = $._anchorYHandlers();
      if (typeof t7 !== 'string' && (typeof t7 !== 'object' || t7 === null || (t7.constructor !== Array && !t7.is$JavaScriptIndexingBehavior()))) return this._layoutAnchored$2$bailout(3, mctx, anchor, handlers, offset, views, t2, t1, t7);
      var t8 = handlers.length;
      if (1 >= t8) throw $.ioore(1);
      var t9 = handlers[1];
      if (t9 !== (t9 | 0)) throw $.iae(t9);
      var t10 = t7.length;
      if (t9 < 0 || t9 >= t10) throw $.ioore(t9);
      t7[t9].$call$3(offset.get$top(), anchor, t2);
    }
    for (t1 = $.iterator(views); t1.hasNext$0() === true; ) {
      this._layoutAnchored$2(mctx, t1.next$0());
    }
  }
 },
 _layoutAnchored$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var mctx = env0;
      var anchor = env1;
      handlers = env2;
      views = env3;
      t2 = env4;
      t1 = env5;
      break;
    case 2:
      mctx = env0;
      anchor = env1;
      handlers = env2;
      offset = env3;
      t3 = env4;
      views = env5;
      t2 = env6;
      t1 = env7;
      break;
    case 3:
      mctx = env0;
      anchor = env1;
      handlers = env2;
      offset = env3;
      views = env4;
      t2 = env5;
      t1 = env6;
      t4 = env7;
      break;
  }
  switch (state) {
    case 0:
      var views = $.index(this.anchored, anchor);
    case 1:
    case 2:
    case 3:
      if (state == 1 || state == 2 || state == 3 || (state == 0 && (!(views == null) && $.isEmpty(views) !== true))) {
        switch (state) {
          case 0:
            var t1 = $.iterator(views);
          case 1:
          case 2:
          case 3:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!(t1.hasNext$0() === true)) break L0;
                  var t2 = t1.next$0();
                  mctx.setWidthByProfile$2(t2, new $.AnchorRelation__layoutAnchored_anon(t2, anchor));
                  mctx.setHeightByProfile$2(t2, new $.AnchorRelation__layoutAnchored_anon0(t2, anchor));
                  var handlers = $.AnchorRelation__getHandlers(t2.get$profile().get$location());
                case 1:
                  state = 0;
                  var offset = $.AnchorRelation__getOffset(anchor, t2);
                  var t3 = $._anchorXHandlers();
                case 2:
                  state = 0;
                  $.index(t3, $.index(handlers, 0)).$call$3(offset.get$left(), anchor, t2);
                  var t4 = $._anchorYHandlers();
                case 3:
                  state = 0;
                  $.index(t4, $.index(handlers, 1)).$call$3(offset.get$top(), anchor, t2);
              }
            }
            for (t1 = $.iterator(views); t1.hasNext$0() === true; ) {
              this._layoutAnchored$2(mctx, t1.next$0());
            }
        }
      }
  }
 },
 layoutAnchored$1: function(mctx) {
  this._layoutAnchored$2(mctx, this.parent);
  for (var t1 = $.iterator(this.indeps); t1.hasNext$0() === true; ) {
    this._layoutAnchored$2(mctx, t1.next$0());
  }
 },
 AnchorRelation$1: function(view) {
  for (var t1 = $.iterator(view.get$children()), t2 = this.indeps, t3 = this.anchored; t1.hasNext$0() === true; ) {
    var t4 = t1.next$0();
    var av = t4.get$profile().get$anchorView();
    if (av == null) t2.push(t4);
    else {
      var t5 = av.get$parent();
      if (!(t5 == null ? view == null : t5 === view) && !(av == null ? view == null : av === view)) throw $.captureStackTrace($.UIException$('Anchor can be parent or sibling, not ' + $.S(av)));
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
 get$innerHeight: function() {
  return $.browser.get$size().get$height();
 },
 get$outerHeight: function() {
  return $.browser.get$size().get$height();
 },
 get$innerWidth: function() {
  return $.browser.get$size().get$width();
 },
 get$outerWidth: function() {
  return $.browser.get$size().get$width();
 }
};

$$._AnchorOfPoint = {"":
 [],
 super: "Object",
 get$innerHeight: function() {
  return 0;
 },
 get$outerHeight: function() {
  return 0;
 },
 get$innerWidth: function() {
  return 0;
 },
 get$outerWidth: function() {
  return 0;
 }
};

$$.LayoutAmountInfo = {"":
 ["value=", "type="],
 super: "Object",
 toString$0: function() {
  return $.S(this.type) + ':' + $.S(this.value);
 },
 LayoutAmountInfo$1: function(profile) {
  if (profile == null || $.isEmpty(profile) === true) this.type = 0;
  else {
    if ($.eqB(profile, 'content')) this.type = 4;
    else {
      if ($.startsWith(profile, 'flex') === true) {
        this.type = 2;
        this.value = $.gtB($.get$length(profile), 4) ? $.Math_parseInt($.trim($.substring$1(profile, 4))) : 1;
        if ($.ltB(this.value, 1)) this.value = 1;
      } else {
        if ($.endsWith(profile, '%') === true) {
          this.type = 3;
          this.value = $.div($.Math_parseDouble($.trim($.substring$2(profile, 0, $.sub($.get$length(profile), 1)))), 100);
        } else {
          this.type = 1;
          this.value = $.CSS_intOf(profile, true);
        }
      }
    }
  }
 }
};

$$.LayoutSideInfo = {"":
 ["right?", "left=", "bottom?", "top="],
 super: "Object",
 toString$0: function() {
  return '(' + $.S(this.left) + ',' + $.S(this.top) + ':' + $.S(this.right) + ',' + $.S(this.bottom) + ')';
 },
 LayoutSideInfo$3: function(profile, defaultValue, defaultInfo) {
  if (!(profile == null) && $.isEmpty(profile) !== true) {
    var wds = [];
    for (var t1 = $.iterator($.CTC31.allMatches$1(profile)); t1.hasNext$0() === true; ) {
      $.add$1(wds, $.Math_parseInt(t1.next$0().group$1(0)));
    }
    t1 = wds.length;
    switch (t1) {
      case 0:
        break;
      case 1:
        if (0 >= t1) throw $.ioore(0);
        var t2 = wds[0];
        this.right = t2;
        this.left = t2;
        this.bottom = t2;
        this.top = t2;
        return;
      case 2:
        if (0 >= t1) throw $.ioore(0);
        t2 = wds[0];
        this.bottom = t2;
        this.top = t2;
        t2 = wds.length;
        if (1 >= t2) throw $.ioore(1);
        var t3 = wds[1];
        this.right = t3;
        this.left = t3;
        return;
      case 3:
        if (0 >= t1) throw $.ioore(0);
        this.top = wds[0];
        t2 = wds.length;
        if (1 >= t2) throw $.ioore(1);
        t3 = wds[1];
        this.right = t3;
        this.left = t3;
        t3 = wds.length;
        if (2 >= t3) throw $.ioore(2);
        this.bottom = wds[2];
        return;
      default:
        if (0 >= t1) throw $.ioore(0);
        this.top = wds[0];
        t2 = wds.length;
        if (1 >= t2) throw $.ioore(1);
        this.right = wds[1];
        t3 = wds.length;
        if (2 >= t3) throw $.ioore(2);
        this.bottom = wds[2];
        var t4 = wds.length;
        if (3 >= t4) throw $.ioore(3);
        this.left = wds[3];
        return;
    }
  }
  if (!(defaultInfo == null)) {
    this.top = defaultInfo.get$top();
    this.bottom = defaultInfo.get$bottom();
    this.left = defaultInfo.get$left();
    this.right = defaultInfo.get$right();
  } else {
    if (!(defaultValue == null)) {
      this.right = defaultValue;
      this.left = defaultValue;
      this.bottom = defaultValue;
      this.top = defaultValue;
    }
  }
 }
};

$$.CSSStyleDeclarationImpl = {"":
 ["_pcss", "_view"],
 super: "Object",
 _unwrap$1: function(value) {
  return !(value == null) ? value : '';
 },
 get$zIndex: function() {
  return this.getPropertyValue$1('z-index');
 },
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$whiteSpace: function(value) {
  this.setProperty$3('white-space', value, '');
 },
 get$whiteSpace: function() {
  return this.getPropertyValue$1('white-space');
 },
 set$transform: function(value) {
  this.setProperty$3('transform', value, '');
 },
 get$transform: function() {
  return this.getPropertyValue$1('transform');
 },
 set$top: function(value) {
  this.setProperty$3('top', value, '');
 },
 get$top: function() {
  return this.getPropertyValue$1('top');
 },
 get$size: function() {
  return this.getPropertyValue$1('size');
 },
 get$right: function() {
  return this.getPropertyValue$1('right');
 },
 get$resize: function() {
  return this.getPropertyValue$1('resize');
 },
 set$position: function(value) {
  this.setProperty$3('position', value, '');
 },
 get$position: function() {
  return this.getPropertyValue$1('position');
 },
 set$overflow: function(value) {
  this.setProperty$3('overflow', value, '');
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
 set$left: function(value) {
  this.setProperty$3('left', value, '');
 },
 get$left: function() {
  return this.getPropertyValue$1('left');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$filter: function() {
  return this.getPropertyValue$1('filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 set$direction: function(value) {
  this.setProperty$3('direction', value, '');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
 },
 get$borderWidth: function() {
  return this.getPropertyValue$1('border-width');
 },
 set$border: function(value) {
  this.setProperty$3('border', value, '');
 },
 set$backgroundImage: function(value) {
  this.setProperty$3('background-image', value, '');
 },
 get$length: function() {
  var t1 = this._pcss;
  return !(t1 == null) ? $.get$length(t1) : 0;
 },
 set$cssText: function(value) {
  var t1 = this._pcss;
  if (t1 == null) {
    t1 = !(value == null) && $.isEmpty(value) !== true;
  } else t1 = true;
  t1 && this.get$_css().set$cssText(value);
  t1 = this._view;
  !(t1 == null) && t1.get$inDocument() === true && t1.get$node().get$style().set$cssText(value);
 },
 get$cssText: function() {
  var t1 = this._pcss;
  return !(t1 == null) ? t1.get$cssText() : '';
 },
 setProperty$3: function(propertyName, value, priority) {
  $.CSSStyleDeclarationImpl__check(propertyName);
  propertyName = $.CSS_name(propertyName);
  if (priority == null) {
    this.get$_css().setProperty$2(propertyName, value);
    var t1 = this._view;
    !(t1 == null) && t1.get$inDocument() === true && t1.get$node().get$style().setProperty$2(propertyName, value);
  } else {
    this.get$_css().setProperty$3(propertyName, value, priority);
    t1 = this._view;
    !(t1 == null) && t1.get$inDocument() === true && t1.get$node().get$style().setProperty$3(propertyName, value, priority);
  }
 },
 setProperty$2: function(propertyName,value) {
  return this.setProperty$3(propertyName,value,null)
},
 getPropertyValue$1: function(propertyName) {
  $.CSSStyleDeclarationImpl__check(propertyName);
  var t1 = this._pcss;
  return !(t1 == null) ? this._unwrap$1(t1.getPropertyValue$1($.CSS_name(propertyName))) : '';
 },
 get$_css: function() {
  var t1 = this._pcss;
  if (t1 == null) this._pcss = $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration();
  return this._pcss;
 }
};

$$.DeclarationImpl = {"":
 [],
 super: "Object",
 setProperty$2: function(propertyName, value) {
  if (value == null || $.isEmpty(value) === true) this.removeProperty$1(propertyName);
  else $.indexSet(this._props, propertyName, $.trim(value));
 },
 removeProperty$1: function(propertyName) {
  this._props.remove$1(propertyName);
 },
 getPropertyValue$1: function(propertyName) {
  var value = $.index(this._props, propertyName);
  return !(value == null) ? value : '';
 },
 set$text: function(text) {
  $.clear(this._props);
  for (var t1 = $.iterator($.split(text, ';')); t1.hasNext$0() === true; ) {
    var pair = $.trim(t1.next$0());
    if ($.isEmpty(pair) === true) continue;
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
 }
};

$$.LayoutDeclarationImpl = {"":
 ["_lib0_owner", "_props"],
 super: "DeclarationImpl",
 set$height: function(value) {
  this.setProperty$2('height', value);
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 set$width: function(value) {
  this.setProperty$2('width', value);
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 get$gap: function() {
  return this.getPropertyValue$1('gap');
 },
 get$spacing: function() {
  return this.getPropertyValue$1('spacing');
 },
 get$align: function() {
  return this.getPropertyValue$1('align');
 },
 set$orient: function(value) {
  this.setProperty$2('orient', value);
 },
 get$orient: function() {
  return this.getPropertyValue$1('orient');
 },
 set$type: function(value) {
  this.setProperty$2('type', value);
 },
 get$type: function() {
  return this.getPropertyValue$1('type');
 }
};

$$.ProfileDeclarationImpl = {"":
 ["_anchorView", "_lib0_owner", "_props"],
 super: "DeclarationImpl",
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
 set$height: function(value) {
  this.setProperty$2('height', value);
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 set$width: function(value) {
  this.setProperty$2('width', value);
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 get$spacing: function() {
  return this.getPropertyValue$1('spacing');
 },
 get$align: function() {
  return this.getPropertyValue$1('align');
 },
 set$location: function(value) {
  this.setProperty$2('location', value);
 },
 get$location: function() {
  return this.getPropertyValue$1('location');
 },
 set$anchorView: function(view) {
  var t1 = view == null;
  if (t1) var av = '';
  else {
    var t2 = this._lib0_owner;
    var t3 = t2.get$parent();
    if (view == null ? t3 == null : view === t3) av = 'parent';
    else {
      if (!t1) {
        t1 = view.get$parent();
        t3 = !(t1 == null);
        t1 = t3;
      } else t1 = false;
      if (t1) {
        t1 = t2.get$parent();
        t3 = !(t1 == null);
        t1 = t3;
      } else t1 = false;
      if (t1) {
        t1 = view.get$parent();
        t3 = t2.get$parent();
        var t4 = !(t1 == null ? t3 == null : t1 === t3);
        t1 = t4;
      } else t1 = false;
      if (t1) throw $.captureStackTrace($.UIException$('Only parent or sibling allowed for an anchor, not ' + $.S(view)));
      if (view == null ? t2 == null : view === t2) throw $.captureStackTrace($.CTC63);
      av = $.isEmpty(view.get$id()) === true ? '' : '#' + $.S(view.get$id());
    }
  }
  this.setProperty$2('anchor', av);
  this._anchorView = view;
 },
 get$anchorView: function() {
  var t1 = this._anchorView;
  return !(t1 == null) ? t1 : this._lib0_owner.query$1(this.get$anchor());
 },
 get$anchor: function() {
  return this.getPropertyValue$1('anchor');
 }
};

$$.ViewConfig = {"":
 ["uuidPrefix?", "classPrefix?"],
 super: "Object",
 ViewConfig$0: function() {
  var appid = $.application().get$uuid();
  if ($.gtB(appid, 0)) this.uuidPrefix = $.S($.StringUtil_encodeId(appid, 'v')) + '_';
 }
};

$$.RunOnceViewManager = {"":
 [],
 super: "Object",
 _lib0_ready$1: function(view) {
  var t1 = this._readyChecks;
  if ($.isEmpty(t1) !== true) {
    var continueTask = new $.RunOnceViewManager__ready_anon(this, view);
    for (t1 = $.iterator(t1); t1.hasNext$0() === true; ) {
      if (t1.next$0().$call$2(view, continueTask) !== true) return false;
    }
  }
  return true;
 },
 _flushOne$1: function(view) {
  var t1 = this._views;
  t1.remove$1(view);
  if (this._ignoreDetached !== true || view.get$inDocument() === true) {
    for (var v = view; v = v.get$parent(), !(v == null); ) {
      if ($.contains$1(t1, v) === true) return;
    }
    if (this._ignoreSubviews === true) {
      for (var t2 = $.iterator(t1); t2.hasNext$0() === true; ) {
        var t3 = t2.next$0();
        t3.isDescendantOf$1(view) === true && t1.remove$1(t3);
      }
    }
    this.handle_$1(view);
  }
 },
 _flushAll$0: function() {
  for (var t1 = this._views, t2 = $.iterator(t1), t3 = this._ignoreDetached === true, t4 = this._ignoreSubviews === true; t2.hasNext$0() === true; ) {
    var v = t2.next$0();
    if (t3 && v.get$inDocument() !== true) {
      t1.remove$1(v);
      continue;
    }
    if (t4) {
      for (var v0 = v; v0 = v0.get$parent(), !(v0 == null); ) {
        if ($.contains$1(t1, v0) === true) {
          t1.remove$1(v);
          break;
        }
      }
    }
  }
  var todo = $.ListFactory_List$from(t1);
  $.clear(t1);
  for (t1 = $.iterator(todo); t1.hasNext$0() === true; ) {
    this.handle_$1(t1.next$0());
  }
 },
 handle_$1: function(view) {
  this._task$1(view);
 },
 flush$1: function(view) {
  if (this._lib0_ready$1(view) !== true) {
    !(view == null) && $.add$1(this._views, view);
  } else {
    if (!(view == null)) this._flushOne$1(view);
    else this._flushAll$0();
  }
 },
 flush$0: function() {
  return this.flush$1(null)
},
 queue$1: function(view) {
  $.add$1(this._views, view);
  this._runQue.add$3('', new $.RunOnceViewManager_queue_anon(this), 5);
 },
 isQueueEmpty$0: function() {
  return $.isEmpty(this._views);
 },
 _task$1: function(arg0) { return this._task.$call$1(arg0); }
};

$$.Token = {"":
 ["end", "start?", "type?"],
 super: "Object",
 toString$0: function() {
  return $.S(this.type);
 },
 extend$0: function() {
  var t1 = this.end;
  this.end = t1 + 1;
  return t1;
 },
 source$1: function(src) {
  return $.substring$2(src, this.start, this.end);
 }
};

$$.ViewMatchContext = {"":
 ["_qualified?", "viewChildIndex", "view?", "parent?"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this._qualified); t1.hasNext$0() === true; ) {
    sb.add$1(t1.next$0());
  }
  return $.toString(sb.add$1(' @' + $.S(this.view)));
 },
 matchPseudoClasses$1: function(pseudoClasses) {
  if (pseudoClasses == null || $.isEmpty(pseudoClasses) === true) return true;
  for (var t1 = $.iterator(pseudoClasses); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var accept = $.PseudoClass_getDefinition(t2.get$name());
    if (accept == null) throw $.captureStackTrace($.ExceptionImplementation$('Pseudo class definition not found: ' + $.S(t2.get$name())));
    if (accept.$call$2(this, t2.get$parameter()) !== true) return false;
  }
  return true;
 },
 match$1: function(seq) {
  return $.ViewMatchContext_matchType(this.view, seq.get$type()) === true && $.ViewMatchContext_matchID(this.view, seq.get$id()) === true && $.ViewMatchContext_matchClasses(this.view, seq.get$classes()) === true && this.matchPseudoClasses$1(seq.get$pseudoClasses()) === true;
 },
 isMatched$1: function(selectorIndex) {
  if (typeof selectorIndex !== 'number') return this.isMatched$1$bailout(1, selectorIndex);
  if (selectorIndex < 0) {
    for (var t1 = this._qualified, i = 0; i < t1.length; ++i) {
      if (this.isMatched$1(i) === true) return true;
    }
    return false;
  }
  t1 = this._qualified;
  var t2 = t1.length;
  if (selectorIndex < t2) {
    if (selectorIndex !== (selectorIndex | 0)) throw $.iae(selectorIndex);
    if (selectorIndex < 0 || selectorIndex >= t2) throw $.ioore(selectorIndex);
    var t3 = $.last(t1[selectorIndex]) === true;
    t1 = t3;
  } else t1 = false;
  return t1;
 },
 isMatched$1$bailout: function(state, selectorIndex) {
  if ($.ltB(selectorIndex, 0)) {
    for (var t1 = this._qualified, i = 0; i < t1.length; ++i) {
      if (this.isMatched$1(i) === true) return true;
    }
    return false;
  }
  t1 = this._qualified;
  if ($.ltB(selectorIndex, t1.length)) {
    if (selectorIndex !== (selectorIndex | 0)) throw $.iae(selectorIndex);
    var t2 = t1.length;
    if (selectorIndex < 0 || selectorIndex >= t2) throw $.ioore(selectorIndex);
    var t3 = $.last(t1[selectorIndex]) === true;
    t1 = t3;
  } else t1 = false;
  return t1;
 },
 isMatched$0: function() {
  return this.isMatched$1(-1)
},
 qualify$3: function(selectorIndex, position, qualified) {
  var t1 = this._qualified;
  if (selectorIndex !== (selectorIndex | 0)) throw $.iae(selectorIndex);
  var t2 = t1.length;
  if (selectorIndex < 0 || selectorIndex >= t2) throw $.ioore(selectorIndex);
  t1 = t1[selectorIndex];
  if (typeof t1 !== 'object' || t1 === null || ((t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())) return this.qualify$3$bailout(1, t1, position, qualified);
  if (position !== (position | 0)) throw $.iae(position);
  var t3 = t1.length;
  if (position < 0 || position >= t3) throw $.ioore(position);
  t1[position] = qualified;
 },
 qualify$3$bailout: function(state, t1, position, qualified) {
  $.indexSet(t1, position, qualified);
 },
 qualify$2: function(selectorIndex,position) {
  return this.qualify$3(selectorIndex,position,true)
},
 isQualified$2: function(selectorIndex, position) {
  if (typeof selectorIndex !== 'number') return this.isQualified$2$bailout(1, selectorIndex, position);
  if (typeof position !== 'number') return this.isQualified$2$bailout(1, selectorIndex, position);
  if (selectorIndex < 0 || selectorIndex >= this._qualified.length) return false;
  var t1 = this._qualified;
  if (selectorIndex !== (selectorIndex | 0)) throw $.iae(selectorIndex);
  var t2 = t1.length;
  if (selectorIndex < 0 || selectorIndex >= t2) throw $.ioore(selectorIndex);
  t1 = t1[selectorIndex];
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.isQualified$2$bailout(2, position, t1);
  if (position > -1 && position < t1.length) {
    if (position !== (position | 0)) throw $.iae(position);
    t2 = t1.length;
    if (position < 0 || position >= t2) throw $.ioore(position);
    var t3 = t1[position] === true;
    t1 = t3;
  } else t1 = false;
  return t1;
 },
 isQualified$2$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      var selectorIndex = env0;
      var position = env1;
      break;
    case 1:
      selectorIndex = env0;
      position = env1;
      break;
    case 2:
      position = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.ltB(selectorIndex, 0) || $.geB(selectorIndex, this._qualified.length)) return false;
      var t1 = this._qualified;
      if (selectorIndex !== (selectorIndex | 0)) throw $.iae(selectorIndex);
      var t2 = t1.length;
      if (selectorIndex < 0 || selectorIndex >= t2) throw $.ioore(selectorIndex);
      t1 = t1[selectorIndex];
    case 2:
      state = 0;
      return $.gtB(position, -1) && $.ltB(position, $.get$length(t1)) && $.index(t1, position) === true;
  }
 },
 moveToNextSibling$0: function() {
  this.view = this.view.get$nextSibling();
  this.viewChildIndex = this.viewChildIndex + 1;
 },
 ViewMatchContext$1: function(view) {
  this.viewChildIndex = $.ViewMatchContext_computeViewChildIndex(this.view);
 },
 ViewMatchContext$root$2: function(view, selectors) {
  this.viewChildIndex = $.ViewMatchContext_computeViewChildIndex(this.view);
 }
};

$$.PseudoClass = {"":
 ["parameter=", "name?"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$(':' + $.S(this.name));
  var t1 = this.parameter;
  !(t1 == null) && sb.add$1('(' + $.S(t1) + ')');
  return sb.toString$0();
 }
};

$$.SimpleSelectorSequence = {"":
 ["combinator?", "pseudoClasses?", "attributes?", "classes?", "id=", "type="],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this.type;
  !(t1 == null) && sb.add$1(t1);
  t1 = this.id;
  !(t1 == null) && sb.add$1('#' + $.S(t1));
  for (t1 = $.iterator(this.classes); t1.hasNext$0() === true; ) {
    sb.add$1('.' + $.S(t1.next$0()));
  }
  for (t1 = $.iterator(this.pseudoClasses); t1.hasNext$0() === true; ) {
    sb.add$1($.S(t1.next$0()));
  }
  return sb.isEmpty$0() === true ? '*' : sb.toString$0();
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
 }
};

$$.Selector = {"":
 ["seqs?", "selectorIndex?"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  for (var t1 = $.iterator(this.seqs); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    sb.add$1($.S(t2) + $.S(t2.printCombinator$0()) + ' ');
  }
  return $.trim(sb.toString$0());
 },
 addSequence$0: function() {
  var seq = $.SimpleSelectorSequence$();
  this.seqs.push(seq);
  return seq;
 },
 requiresIdSpace$1: function(index) {
  var t1 = this.seqs;
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  var t3 = t1[index].get$id();
  return !(t3 == null);
 },
 getCombinator$1: function(index) {
  var t1 = this.seqs;
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return t1[index].get$combinator();
 },
 addCombinator$1: function(token) {
  $.last(this.seqs).setCombinatorByToken$1(token);
 }
};

$$.SelectorParseException = {"":
 ["index", "token", "source"],
 super: "Object",
 toString$0: function() {
  var t1 = this.token;
  if (t1 == null) {
    t1 = this.index;
    var t2 = t1 < 0;
    var t3 = this.source;
    t1 = t2 ? 'Unexpected end of selector: ' + $.S(t3) : 'Unexpected character at ' + $.S(t1) + ' in selector ' + $.S(t3);
  } else {
    t2 = 'Unexpected token ' + $.S(t1.get$type()) + ' at ' + $.S(this.index) + ' in selector ' + $.S(this.source);
    t1 = t2;
  }
  return t1;
 },
 source$1: function(arg0) { return this.source.$call$1(arg0); }
};

$$.ViewIterator = {"":
 ["_lib6_index", "_lib6_next=", "_lib6_ready", "_currCtx", "_offsetRoot", "_allIds", "_posOffset", "_selectors", "_root"],
 super: "Object",
 match$3: function(selector, ctx, index) {
  var t1 = selector.get$seqs();
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))) return this.match$3$bailout(1, ctx, index, t1);
  if (index !== (index | 0)) throw $.iae(index);
  var t2 = t1.length;
  if (index < 0 || index >= t2) throw $.ioore(index);
  return ctx.match$1(t1[index]);
 },
 match$3$bailout: function(state, ctx, index, t1) {
  return ctx.match$1($.index(t1, index));
 },
 matchLevel0$1: function(ctx) {
  for (var t1 = $.iterator(this._selectors); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    this.match$3(t2, ctx, 0) === true && ctx.qualify$2(t2.get$selectorIndex(), 0);
  }
 },
 _buildNextSiblingCtx$1: function(ctx) {
  ctx.moveToNextSibling$0();
  for (var t1 = $.iterator(this._selectors), t2 = this._posOffset; t1.hasNext$0() === true; ) {
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
          ctx.qualify$3(i, j, parentPass && $.ViewIterator_checkIdSpace(t3, $.add(j, 1), ctx) === true);
          parentPass && this.match$3(t3, ctx, $.add(j, 1)) === true && ctx.qualify$2(i, $.add(j, 1));
          break;
        case 1:
          var t4 = $.add(j, 1);
          ctx.qualify$3(i, t4, !(parent$ == null) && parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true);
          break;
        case 3:
          ctx.isQualified$2(i, j) === true && ctx.qualify$3(i, $.add(j, 1), this.match$3(t3, ctx, $.add(j, 1)));
          break;
        case 2:
          t4 = $.add(j, 1);
          ctx.qualify$3(i, t4, ctx.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true);
          ctx.qualify$3(i, j, false);
      }
    }
  }
  $.eqB(t2, 0) && this.matchLevel0$1(ctx);
  return ctx;
 },
 _buildFirstChildCtx$1: function(parent$) {
  var ctx = $.ViewMatchContext$child(parent$.get$view().get$firstChild(), parent$);
  var t1 = this._posOffset;
  $.eqB(t1, 0) && this.matchLevel0$1(ctx);
  for (var t2 = $.iterator(this._selectors); t2.hasNext$0() === true; ) {
    var t3 = t2.next$0();
    var i = t3.get$selectorIndex();
    var posStart = $.gtB(t1, 0) ? $.sub(t1, 1) : 0;
    for (var j = posStart; $.ltB(j, $.sub($.get$length(t3.get$seqs()), 1)); j = $.add(j, 1)) {
      switch (t3.getCombinator$1(j)) {
        case 0:
          parent$.isQualified$2(i, j) === true && $.ViewIterator_checkIdSpace(t3, $.add(j, 1), ctx) === true && ctx.qualify$2(i, j);
          parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true && ctx.qualify$2(i, $.add(j, 1));
          break;
        case 1:
          parent$.isQualified$2(i, j) === true && this.match$3(t3, ctx, $.add(j, 1)) === true && ctx.qualify$2(i, $.add(j, 1));
          break;
      }
    }
  }
  return ctx;
 },
 _buildNextCtx$0: function() {
  if (this._allIds === true) return;
  var t1 = this._currCtx.get$view().get$firstChild();
  if (!(t1 == null)) return this._buildFirstChildCtx$1(this._currCtx);
  for (t1 = this._posOffset, t2 = this._root; t3 = this._currCtx.get$view().get$nextSibling(), t3 == null; ) {
    this._currCtx = this._currCtx.get$parent();
    t3 = this._currCtx;
    if (!(t3 == null)) {
      t3 = t3.get$view();
      t3 = $.eqB(t3, $.gtB(t1, 0) ? this._offsetRoot : t2);
    } else t3 = true;
    if (t3) return;
  }
  return this._buildNextSiblingCtx$1(this._currCtx);
  var t3, t2;
 },
 _buildRootCtx$0: function() {
  var rt = this._root;
  var t1 = this._posOffset;
  if ($.gtB(t1, 0)) {
    var selector = $.index(this._selectors, 0);
    for (var i = 0; $.ltB(i, t1); ++i) {
      var seq = $.index(selector.get$seqs(), i);
      var rt2 = rt.getFellow$1(seq.get$id());
      if (rt2 == null) return;
      if ($.ViewMatchContext_matchType(rt2, seq.get$type()) !== true || $.ViewMatchContext_matchClasses(rt2, seq.get$classes()) !== true || $.ViewMatchContext$(rt2).matchPseudoClasses$1(seq.get$pseudoClasses()) !== true) return;
      if (i > 0) {
        switch (selector.getCombinator$1(i - 1)) {
          case 0:
            if ($.ViewIterator_isDescendant(rt2, rt) !== true) return;
            break;
          case 1:
            if (!$.eqB(rt2.get$parent(), rt)) return;
            break;
          case 3:
            if ($.ViewIterator_isGeneralSibling(rt2, rt) !== true) return;
            break;
          case 2:
            if (!$.eqB(rt2.get$previousSibling(), rt)) return;
            break;
        }
      }
      rt = rt2;
    }
    this._offsetRoot = rt.get$parent();
  }
  var t2 = this._selectors;
  var ctx = $.ViewMatchContext$root(rt, t2);
  if ($.gtB(t1, 0)) {
    for (t2 = $.iterator(t2); t2.hasNext$0() === true; ) {
      ctx.qualify$2(t2.next$0().get$selectorIndex(), $.sub(t1, 1));
    }
  } else this.matchLevel0$1(ctx);
  return ctx;
 },
 _seekNext$0: function() {
  this._currCtx = $.ltB(this._lib6_index, 0) ? this._buildRootCtx$0() : this._buildNextCtx$0();
  while (true) {
    var t1 = this._currCtx;
    if (!(!(t1 == null) && t1.isMatched$0() !== true)) break;
    this._currCtx = this._buildNextCtx$0();
  }
  t1 = this._currCtx;
  if (!(t1 == null)) {
    this._lib6_index = this._lib6_index + 1;
    return this._currCtx.get$view();
  }
  return;
 },
 _loadNext$0: function() {
  if (this._lib6_ready === true) return;
  this._lib6_next = this._seekNext$0();
  this._lib6_ready = true;
 },
 hasNext$0: function() {
  this._loadNext$0();
  var t1 = this._lib6_next;
  return !(t1 == null);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) throw $.captureStackTrace($.NoMoreElementsException$());
  this._lib6_ready = false;
  return this._lib6_next;
 },
 _lib6_ready$1: function(arg0) { return this._lib6_ready.$call$1(arg0); },
 ViewIterator$2: function(_root, selector) {
  var t1 = this._selectors;
  this._posOffset = $.ViewIterator__getCommonSeqLength(t1);
  this._allIds = $.ViewIterator__isAllIds(t1, this._posOffset);
 }
};

$$.ViewIterable = {"":
 ["_selector", "_root"],
 super: "Object",
 iterator$0: function() {
  return $.ViewIterator$(this._root, this._selector);
 }
};

$$.Activity_run_anon = {"":
 ["this_1", "containerId_0"],
 super: "Closure",
 $call$0: function() {
  this.this_1._init$1(this.containerId_0);
  this.this_1.onCreate_$0();
  this.this_1.get$_mainView().requestLayout$0();
 }
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 $call$2: function(k, v) {
  this.box_0.first_1 !== true && $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
 }
};

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key);
 }
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 $call$1: function(entry) {
  this.f_0.$call$2(entry.get$key(), entry.get$value());
 }
};

$$.RunOnceViewManager__ready_anon = {"":
 ["this_1", "view_0"],
 super: "Closure",
 $call$0: function() {
  this.this_1.flush$1(this.view_0);
 }
};

$$.RunOnceViewManager_queue_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  this.this_0.flush$0();
 }
};

$$.RunOnceQueue_add_anon = {"":
 ["key_2", "task_1", "this_0"],
 super: "Closure",
 $call$0: function() {
  this.this_0.get$_tasks().remove$1(this.key_2);
  this.task_1.$call$0();
 }
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 $call$0: function() {
  return this.closure_0.$call$0();
 }
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 $call$0: function() {
  return this.closure_2.$call$1(this.arg1_1);
 }
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 $call$0: function() {
  return this.closure_5.$call$2(this.arg1_4, this.arg2_3);
 }
};

$$.LayoutManager_doLayout_anon = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.browser.get$size().get$width();
 }
};

$$.LayoutManager_doLayout_anon0 = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.browser.get$size().get$height();
 }
};

$$.AnchorRelation__layoutAnchored_anon = {"":
 ["view_1", "anchor_0"],
 super: "Closure",
 $call$0: function() {
  return $._anchorWidth(this.anchor_0, this.view_1);
 }
};

$$.AnchorRelation__layoutAnchored_anon0 = {"":
 ["view_3", "anchor_2"],
 super: "Closure",
 $call$0: function() {
  return $._anchorHeight(this.anchor_2, this.view_3);
 }
};

$$._anchorYHandlers_anon = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$top($.sub(offset, view.get$outerHeight()));
 }
};

$$._anchorYHandlers_anon0 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$top(offset);
 }
};

$$._anchorYHandlers_anon1 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, $.tdiv($.sub($._anchorHeight(anchor, view), view.get$outerHeight()), 2)));
 }
};

$$._anchorYHandlers_anon2 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$top($.sub($.add(offset, $._anchorHeight(anchor, view)), view.get$outerHeight()));
 }
};

$$._anchorYHandlers_anon3 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, $._anchorHeight(anchor, view)));
 }
};

$$._anchorXHandlers_anon = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$left($.sub(offset, view.get$outerWidth()));
 }
};

$$._anchorXHandlers_anon0 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$left(offset);
 }
};

$$._anchorXHandlers_anon1 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, $.tdiv($.sub($._anchorWidth(anchor, view), view.get$outerWidth()), 2)));
 }
};

$$._anchorXHandlers_anon2 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$left($.sub($.add(offset, $._anchorWidth(anchor, view)), view.get$outerWidth()));
 }
};

$$._anchorXHandlers_anon3 = {"":
 [],
 super: "Closure",
 $call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, $._anchorWidth(anchor, view)));
 }
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 $call$1: function(key) {
  return this.f_0.$call$2(key, $.index(this.this_1, key));
 }
};

$$._VLayout_doLayout_anon = {"":
 ["view_0"],
 super: "Closure",
 $call$0: function() {
  return this.view_0.get$innerHeight();
 }
};

$$._VLayout_doLayout_anon0 = {"":
 ["view_1"],
 super: "Closure",
 $call$0: function() {
  return this.view_1.get$innerWidth();
 }
};

$$._VLayout_doLayout_anon1 = {"":
 ["view_2"],
 super: "Closure",
 $call$0: function() {
  return this.view_2.get$innerHeight();
 }
};

$$._VLayout_doLayout_anon2 = {"":
 ["view_4", "si_3"],
 super: "Closure",
 $call$0: function() {
  return $.sub($.sub(this.view_4.get$innerWidth(), this.si_3.get$left()), this.si_3.get$right());
 }
};

$$._HLayout_doLayout_anon = {"":
 ["view_0"],
 super: "Closure",
 $call$0: function() {
  return this.view_0.get$innerWidth();
 }
};

$$._HLayout_doLayout_anon0 = {"":
 ["view_1"],
 super: "Closure",
 $call$0: function() {
  return this.view_1.get$innerWidth();
 }
};

$$._HLayout_doLayout_anon1 = {"":
 ["view_2"],
 super: "Closure",
 $call$0: function() {
  return this.view_2.get$innerHeight();
 }
};

$$._HLayout_doLayout_anon2 = {"":
 ["view_4", "si_3"],
 super: "Closure",
 $call$0: function() {
  return $.sub($.sub(this.view_4.get$innerHeight(), this.si_3.get$top()), this.si_3.get$bottom());
 }
};

$$.FreeLayout_doLayout_anon = {"":
 ["view_0"],
 super: "Closure",
 $call$0: function() {
  return this.view_0.get$innerWidth();
 }
};

$$.FreeLayout_doLayout_anon0 = {"":
 ["view_1"],
 super: "Closure",
 $call$0: function() {
  return this.view_1.get$innerHeight();
 }
};

$$._DataAttributeMap_getKeys_anon = {"":
 ["this_1", "keys_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.this_1._matches$1(key) === true && $.add$1(this.keys_0, this.this_1._strip$1(key));
 }
};

$$._DataAttributeMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.this_1._matches$1(key) === true && this.f_0.$call$2(this.this_1._strip$1(key), value);
 }
};

$$.Browser__initBrowserInfo_anon = {"":
 ["this_1", "ua_0"],
 super: "Closure",
 $call$1: function(regex) {
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

$$.SnakeCanvas_startGame_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$2: function(time, elapsed) {
  if ($.gtB($.sub(time, this.this_0.get$lastCycle()), this.this_0.get$UPDATE())) {
    var ret = true;
    switch (this.this_0.get$environment().draw$1(this.this_0.get$ctx2d())) {
      case 1:
        this.this_0.gameOverDialog$0();
        ret = false;
        break;
      case 0:
        var t1 = this.this_0;
        t1.set$score($.add(t1.get$score(), 1));
        ret = true;
        break;
    }
    this.this_0.set$lastCycle(time);
  } else ret = true;
  return ret;
 }
};

$$.DateImplementation_toString_fourDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  var absN = $.abs(n);
  var sign = $.ltB(n, 0) ? '-' : '';
  if ($.geB(absN, 1000)) return $.S(n);
  if ($.geB(absN, 100)) return sign + '0' + $.S(absN);
  if ($.geB(absN, 10)) return sign + '00' + $.S(absN);
  if ($.geB(absN, 1)) return sign + '000' + $.S(absN);
  throw $.captureStackTrace($.IllegalArgumentException$(n));
 }
};

$$.DateImplementation_toString_threeDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 100)) return $.S(n);
  if ($.geB(n, 10)) return '0' + $.S(n);
  return '00' + $.S(n);
 }
};

$$.DateImplementation_toString_twoDigits = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  if ($.geB(n, 10)) return $.S(n);
  return '0' + $.S(n);
 }
};

$$.anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(now) {
  if ($.isEmpty(this.this_0.get$_anims()) !== true) {
    var inow = now == null ? $._Animator__now() : $.toInt(now);
    var diff = $.sub(inow, this.this_0.get$_prevTime());
    var t1 = inow;
    this.this_0.set$_prevTime(t1);
    this.this_0._beforeCallback$0();
    try {
      for (j = 0; $.ltB(j, $.get$length(this.this_0.get$_anims())); j = $.add(j, 1)) {
        if (this.this_0._isRemoved$1(j) !== true && $.index(this.this_0.get$_anims(), j).$call$2(inow, diff) !== true) {
          $.removeRange(this.this_0.get$_anims(), j, 1);
          j = $.sub(j, 1);
        }
      }
    } finally {
      this.this_0._afterCallback$0();
    }
    $.isEmpty(this.this_0.get$_anims()) !== true && $.window().requestAnimationFrame$1(this.this_0.get$_callback());
  }
  var j;
 }
};

$$.SnakeCanvas_gameOverDialog_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  this.this_0.removeDialog$0();
  this.this_0.get$ctx2d().save$0();
  this.this_0.get$ctx2d().setTransform$6(1, 0, 0, 1, 0, 0);
  this.this_0.get$ctx2d().clearRect$4(0, 0, this.this_0.get$canvas().get$width(), this.this_0.get$canvas().get$height());
  this.this_0.get$ctx2d().restore$0();
  this.this_0.startGame$0();
 }
};

$$._ViewEventListenerMap__get_anon = {"":
 ["this_1", "type_0"],
 super: "Closure",
 $call$0: function() {
  return $._ViewEventListenerList$(this.this_1.get$_lib2_ptr(), this.type_0);
 }
};

$$._BroadcastListeners_add_anon = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return [];
 }
};

$$.View__addToDoc_anon = {"":
 ["this_1", "location_0"],
 super: "Closure",
 $call$0: function() {
  var n = this.this_1.get$node();
  var pn = n.get$parent();
  if (!(pn == null)) {
    if ($.eqB(pn.get$offsetParent(), n.get$offsetParent())) {
      var x = pn.get$$$dom_offsetLeft();
      var y = pn.get$$$dom_offsetTop();
    } else {
      x = 0;
      y = 0;
    }
    $.ViewUtil_position(this.this_1, x, y, this.location_0);
  }
 }
};

$$.HashSetImplementation_addAll__ = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 $call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
 }
};

$$.HashSetImplementation_filter__ = {"":
 ["result_1", "f_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.f_0.$call$1(key) === true && $.add$1(this.result_1, key);
 }
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 $call$1: function(element) {
  this.f_1.$call$1(element) === true && $.add$1(this.output_0, element);
 }
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 $call$1: function(el) {
  return el.remove$0();
 }
};

$$._CssClassSet_add_anon = {"":
 ["value_0"],
 super: "Closure",
 $call$1: function(s) {
  return $.add$1(s, this.value_0);
 }
};

$$._CssClassSet_addAll_anon = {"":
 ["collection_0"],
 super: "Closure",
 $call$1: function(s) {
  return $.addAll(s, this.collection_0);
 }
};

$$._CssClassSet_clear_anon = {"":
 [],
 super: "Closure",
 $call$1: function(s) {
  return $.clear(s);
 }
};

$$.Snake_act_anon = {"":
 ["context_1", "this_0"],
 super: "Closure",
 $call$1: function(element) {
  return this.this_0.drawSnake$3(this.context_1, element, null);
 }
};

$$._ElementImpl_rect_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  return $._ElementRectImpl$(this.this_0);
 }
};

$$._maybeScheduleMeasurementFrame_anon = {"":
 [],
 super: "Closure",
 $call$1: function(e) {
  return $._completeMeasurementFutures();
 }
};

$$._DocumentFragmentImpl_rect_anon = {"":
 [],
 super: "Closure",
 $call$0: function() {
  return $.CTC56;
 }
};

$$._EventListenerInfo_add_anon = {"":
 ["box_0"],
 super: "Closure",
 $call$0: function() {
  this.box_0.first_10 = true;
  return [];
 }
};

$$._ViewImpl__domEvtDisp_anon = {"":
 ["type_0"],
 super: "Closure",
 $call$1: function(target) {
  return new $._ViewImpl__domEvtDisp_anon0(this.type_0, target);
 }
};

$$._ViewImpl__domEvtDisp_anon0 = {"":
 ["type_2", "target_1"],
 super: "Closure",
 $call$1: function(event$) {
  var t1 = this.target_1;
  t1.sendEvent$1($.ViewEvent$dom(event$, this.type_2, t1));
 }
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
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
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
 }
};

$$.SnakeCanvas__gestureEnd_anon = {"":
 [],
 super: "Closure",
 $call$1: function(state) {
  return true;
 }
};

$$._TouchDragGesture__listen_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(event$) {
  var t = $.index(event$.get$touches(), 0);
  var t1 = $.gtB($.get$length(event$.get$touches()), 1);
  var t2 = this.this_0;
  if (t1) t2._touchEnd$3(t.get$pageX(), t.get$pageY(), event$.get$timeStamp());
  else {
    t2._touchStart$4(event$.get$target(), t.get$pageX(), t.get$pageY(), event$.get$timeStamp());
    t1 = t.get$pageX();
    this.this_0.set$_pgx(t1);
    t1 = t.get$pageY();
    this.this_0.set$_pgy(t1);
    event$.preventDefault$0();
  }
 }
};

$$._TouchDragGesture__listen_anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$1: function(event$) {
  var t = $.index(event$.get$touches(), 0);
  this.this_1._touchMove$3(t.get$pageX(), t.get$pageY(), event$.get$timeStamp());
  var t1 = t.get$pageX();
  this.this_1.set$_pgx(t1);
  t1 = t.get$pageY();
  this.this_1.set$_pgy(t1);
 }
};

$$._TouchDragGesture__listen_anon1 = {"":
 ["this_2"],
 super: "Closure",
 $call$1: function(event$) {
  var t = $.index(event$.get$touches(), 0);
  var t1 = this.this_2;
  var t2 = t == null;
  var t3 = t2 ? t1.get$_pgx() : t.get$pageX();
  t2 = t2 ? this.this_2.get$_pgy() : t.get$pageY();
  t1._touchEnd$3(t3, t2, event$.get$timeStamp());
  this.this_2.set$_pgy(null);
  this.this_2.set$_pgx(null);
 }
};

$$.FutureImpl_transform_anon = {"":
 ["this_1", "completer_0"],
 super: "Closure",
 $call$1: function(e) {
  this.completer_0.completeException$2(e, this.this_1.get$stackTrace());
  return true;
 }
};

$$.FutureImpl_transform_anon0 = {"":
 ["completer_3", "transformation_2"],
 super: "Closure",
 $call$1: function(v) {
  var transformed = null;
  try {
    transformed = this.transformation_2.$call$1(v);
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

$$._MouseDragGesture__listen_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(event$) {
  this.this_0._touchStart$4(event$.get$target(), event$.get$pageX(), event$.get$pageY(), event$.get$timeStamp());
  this.this_0._capture$0();
 }
};

$$._MouseDragGesture__capture_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(event$) {
  this.this_0._touchMove$3(event$.get$pageX(), event$.get$pageY(), event$.get$timeStamp());
 }
};

$$._MouseDragGesture__capture_anon0 = {"":
 ["this_1"],
 super: "Closure",
 $call$1: function(event$) {
  this.this_1._touchEnd$3(event$.get$pageX(), event$.get$pageY(), event$.get$timeStamp());
 }
};

$$.SnakeCanvas__gestureMove_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(state) {
  $.print($.S(state.get$delta().get$x()) + ', ' + $.S(state.get$delta().get$x()));
  if ($.gtB($.abs(state.get$delta().get$x()), $.abs(state.get$delta().get$y())) && $.gtB($.abs(state.get$delta().get$x()), 5)) {
    var t1 = $.gtB(state.get$delta().get$x(), 0);
    var t2 = this.this_0;
    if (t1) t2.get$environment().get$snake().set$direction(1);
    else t2.get$environment().get$snake().set$direction(-1);
  } else {
    if ($.gtB($.abs(state.get$delta().get$y()), 5)) {
      t1 = $.gtB(state.get$delta().get$y(), 0);
      t2 = this.this_0;
      if (t1) t2.get$environment().get$snake().set$direction(2);
      else t2.get$environment().get$snake().set$direction(-2);
    }
  }
  return true;
 }
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 $call$2: function(key, value) {
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
 $call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_10;
  var index = $.add(t2, 1);
  this.box_0.index_10 = index;
  $.indexSet(t1, t2, entry.get$value());
 }
};

$$.ConstantMap_getValues_anon = {"":
 ["this_1", "result_0"],
 super: "Closure",
 $call$1: function(key) {
  return $.add$1(this.result_0, $.index(this.this_1, key));
 }
};

$$._DataAttributeMap_getValues_anon = {"":
 ["this_1", "values_0"],
 super: "Closure",
 $call$2: function(key, value) {
  this.this_1._matches$1(key) === true && $.add$1(this.values_0, value);
 }
};

$$.PseudoClass_getDefinition_anon = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  if (param == null) {
    var t1 = ctx.get$view().get$previousSibling();
    t1 = t1 == null;
  } else t1 = false;
  return t1;
 }
};

$$.PseudoClass_getDefinition_anon0 = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  if (param == null) {
    var t1 = ctx.get$view().get$nextSibling();
    t1 = t1 == null;
  } else t1 = false;
  return t1;
 }
};

$$.PseudoClass_getDefinition_anon1 = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  if (param == null) {
    var t1 = ctx.get$view().get$previousSibling();
    t1 = t1 == null;
  } else t1 = false;
  if (t1) {
    t1 = ctx.get$view().get$nextSibling();
    t1 = t1 == null;
  } else t1 = false;
  return t1;
 }
};

$$.PseudoClass_getDefinition_anon2 = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  return param == null && $.eqB(ctx.get$view().get$childCount(), 0);
 }
};

$$.PseudoClass_getDefinition_anon3 = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  return !(param == null);
 }
};

$$.PseudoClass_getDefinition_anon4 = {"":
 [],
 super: "Closure",
 $call$2: function(ctx, param) {
  return !(param == null);
 }
};

$$.MeasureContext__measureByContent_anon = {"":
 ["view_0"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.view_0.get$parent();
  return !(t1 == null) ? this.view_0.get$parent().get$innerWidth() : $.browser.get$size().get$width();
 }
};

$$.MeasureContext__measureByContent_anon0 = {"":
 ["view_1"],
 super: "Closure",
 $call$0: function() {
  var t1 = this.view_1.get$parent();
  return !(t1 == null) ? this.view_1.get$parent().get$innerHeight() : $.browser.get$size().get$height();
 }
};

$$.View_dataAttributes_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  var t1 = $.HashMapImplementation$();
  this.this_0.set$_dataAttrs(t1);
  return t1;
 }
};

$$.Activity__init_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(event$) {
  this.this_0.updateSize$0();
 }
};

$$.Activity__init_anon0 = {"":
 [],
 super: "Closure",
 $call$1: function(event$) {
  $.broadcaster().sendEvent$1($.PopupEvent$(event$.get$target(), 'popup'));
 }
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 $call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true) $._globalState().get$mainManager().postMessage$1(workerMessage);
  else $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
 }
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 $call$1: function(_) {
  return this.callback_0.$call$0();
 }
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 $call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  $.eqB(remaining, 0) && this.result_5.get$isComplete() !== true && this.completer_3.complete$1(this.values_2);
 }
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 $call$1: function(exception) {
  this.result_8.get$isComplete() !== true && this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
 }
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 $call$0: function() {
  var t1 = ({});
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null) return;
  var t2 = this.this_4.get$_receivePort().get$_lib8_callback();
  if (t2 == null) return;
  t2 = $._globalState().get$currentContext();
  var shouldSerialize = !(t2 == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
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
 $call$0: function() {
  var t1 = this.this_7.get$_receivePort().get$_lib8_callback();
  if (!(t1 == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._lib8_callback$2(t2.msg_1, t2.reply_2);
  }
 }
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) return;
  $._window().setTimeout$2(this, 0);
 }
};

Isolate.$defineClass('BoundClosure', 'Closure', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
Isolate.$defineClass('BoundClosure0', 'Closure', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('BoundClosure1', 'Closure', ['self', 'target'], {
$call$6: function(p0, p1, p2, p3, p4, p5) { return this.self[this.target](p0, p1, p2, p3, p4, p5); }
});
$._ViewEvents$ = function(ptr) {
  return new $._ViewEvents($.makeLiteralMap([]), ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.floor$0();
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      var t1 = a.operator$eq$1(b);
      return t1 === true;
    }
  }
  return a === b;
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref) return true;
  }
  return false;
};

$.DOMQuery$_init = function(node) {
  return new $.DOMQuery(node);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length;
  return receiver.get$length();
};

$.Token$fromChar = function(c, index) {
  return new $.Token($.add(index, 1), index, $.Token_getTypeFromChar(c));
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$._IDBOpenDBRequestEventsImpl$ = function(_ptr) {
  return new $._IDBOpenDBRequestEventsImpl(_ptr);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.SelectorParseException$unexpectedToken = function(source, token) {
  return new $.SelectorParseException(token.get$start(), token, source);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) return $.truncate((a) / (b));
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.removeRange$2(start, length$);
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = start + length$;
  if (t1 > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(t1));
  var t2 = receiverLength - length$;
  $.Arrays_copy(receiver, t1, receiver, start, t2 - start);
  $.set$length(receiver, t2);
};

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') return 'DOMWindow';
  if (name$ === 'CanvasPixelArray') return 'Uint8ClampedArray';
  return name$;
};

$.NotImplementedException$ = function(message) {
  return new $.NotImplementedException(message);
};

$.Selectors__isLiteral = function(c) {
  if (!($.gtB(c, 96) && $.ltB(c, 123))) {
    var t1 = $.gtB(c, 64) && $.ltB(c, 91);
  } else t1 = true;
  if (!t1) {
    t1 = $.gtB(c, 47) && $.ltB(c, 58);
  } else t1 = true;
  return t1 || $.eqB(c, 95) || $.eqB(c, 45);
};

$.LinearLayout__getRealLayout = function(view) {
  return !$.eqB(view.get$layout().get$orient(), 'vertical') ? $._HLayout$() : $._VLayout$();
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31) return 0;
      return a >>> b;
    }
    if (b > 31) b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$2(startIndex, endIndex);
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null) endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex)) throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$)) throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$._ViewImpl_addToIdSpaceDown = function(view, space) {
  var id = view.get$id();
  var t1 = $.get$length(id);
  if (typeof t1 !== 'number') return $._ViewImpl_addToIdSpaceDown$bailout(1, view, space, id, t1);
  t1 > 0 && space.bindFellow_$2(id, view);
  if (!((typeof view === 'object' && view !== null) && !!view.is$IdSpace)) {
    var vs = view.get$_virtIS();
    if (!(vs == null)) {
      view.set$_virtIS(null);
      for (t1 = $.iterator(vs.get$fellows()); t1.hasNext$0() === true; ) {
        var t2 = t1.next$0();
        space.bindFellow_$2(t2.get$id(), t2);
      }
    } else {
      for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling()) {
        $._ViewImpl_addToIdSpaceDown(view, space);
      }
    }
  }
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) {
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
  return new $.StringMatch(pattern, str, _start);
};

$.StringUtil_encodeXML = function(txt, multiline, maxlength, pre) {
  if (typeof txt !== 'string' && (typeof txt !== 'object' || txt === null || (txt.constructor !== Array && !txt.is$JavaScriptIndexingBehavior()))) return $.StringUtil_encodeXML$bailout(1, txt, multiline, maxlength, pre, 0, 0, 0, 0);
  if (typeof maxlength !== 'number') return $.StringUtil_encodeXML$bailout(1, txt, multiline, maxlength, pre, 0, 0, 0, 0);
  var tl = txt.length;
  var t1 = pre === true;
  multiline = t1 || multiline === true;
  var t2 = !multiline;
  if (t2 && maxlength > 0 && tl > maxlength) {
    var j = maxlength;
    while (true) {
      if (j > 0) {
        t1 = j - 1;
        if (t1 !== (t1 | 0)) throw $.iae(t1);
        t2 = txt.length;
        if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
        var t3 = $.StringUtil_isChar(txt[t1], false, false, false, true, null) === true;
        t1 = t3;
      } else t1 = false;
      if (!t1) break;
      --j;
    }
    return $.StringUtil_encodeXML($.S($.substring$2(txt, 0, j)) + '...', multiline, 0, pre);
  }
  var out = $.StringBufferImpl$('');
  if (multiline || t1) {
    for (var enc = null, j = 0, k = 0; j < tl; ++j) {
      t2 = txt.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      t3 = txt[j];
      if (typeof t3 !== 'string') return $.StringUtil_encodeXML$bailout(2, txt, t1, out, t3, j, multiline, k, tl);
      enc = $.CTC54.operator$index$1(t3);
      if (!(enc == null)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
        var k0 = j + 1;
        k = k0;
      } else {
        if (multiline && t3 === '\n') {
          $.add$1(out.add$1($.substring$2(txt, k, j)), '<br/>\n');
          k0 = j + 1;
          k = k0;
        } else {
          if (t1) {
            t2 = t3 === ' ' || t3 === '\x09';
          } else t2 = false;
          if (t2) {
            $.add$1(out.add$1($.substring$2(txt, k, j)), '&nbsp;');
            t3 === '\x09' && out.add$1('&nbsp;&nbsp;&nbsp;');
            k = j + 1;
          }
        }
      }
    }
  } else {
    for (enc = null, j = 0, k = 0; j < tl; ++j) {
      t1 = txt.length;
      if (j < 0 || j >= t1) throw $.ioore(j);
      enc = $.CTC54.operator$index$1(txt[j]);
      if (!(enc == null)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
        k0 = j + 1;
        k = k0;
      }
    }
  }
  if (k === 0) return txt;
  k < tl && out.add$1($.substring$1(txt, k));
  return out.toString$0();
};

$.ViewMatchContext$root = function(view, selectors) {
  var t1 = new $.ViewMatchContext($.ViewMatchContext__initBoolList(selectors), 0, view, null);
  t1.ViewMatchContext$root$2(view, selectors);
  return t1;
};

$.ViewIterable$ = function(_root, _selector) {
  return new $.ViewIterable(_selector, _root);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.Strings_String$fromCharCodes = function(charCodes) {
  return $.StringBase_createFromCharCodes(charCodes);
};

$._createMeasurementFuture = function(computeValue, completer) {
  var t1 = $._pendingRequests;
  if (t1 == null) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$(computeValue, completer));
  return completer.get$future();
};

$._DataAttributeMap$ = function($$dom_attributes) {
  return new $._DataAttributeMap($$dom_attributes);
};

$._DOMWindowCrossFrameImpl__postMessage2 = function(win, message, targetOrigin) {
      win.postMessage(message, targetOrigin);
;
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) return receiver.filter$1(predicate);
  return $.Collections_filter(receiver, [], predicate);
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    f.$call$1(t2) === true && $.add$1(destination, t2);
  }
  return destination;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || (inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || (tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))) return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
};

$.application = function() {
  var t1 = $._app;
  if (t1 == null) $._app = $.Application$('');
  return $._app;
};

$.DOMQuery_DOMQuery = function(v) {
  if (typeof v === 'object' && v !== null && !!v.is$View) v = v.get$node();
  else {
    if (typeof v === 'string') v = $.document().query$1(v);
  }
  if (typeof v === 'object' && v !== null && v.is$Window()) var t1 = $._WindowQuery$(v);
  else {
    t1 = !(v == null) ? $.DOMQuery$_init(v) : $._NullQuery$();
  }
  return t1;
};

$.Math_parseInt = function(str) {
  return $.MathNatives_parseInt(str);
};

$.MathNatives_parseInt = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) throw $.captureStackTrace($.BadNumberFormatException$(str));
  var trimmed = $.trim(str);
  if ($.gtB($.get$length(trimmed), 2)) {
    var t1 = $.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X');
  } else t1 = false;
  if (!t1) {
    if ($.gtB($.get$length(trimmed), 3)) {
      t1 = $.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X');
    } else t1 = false;
  } else t1 = true;
  var base = t1 ? 16 : 10;
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$._NotificationEventsImpl$ = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.ViewMatchContext_computeViewChildIndex = function(view) {
  for (var index = -1; !(view == null); ) {
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
  if (typeof a === "number") return -a;
  return a.operator$negate$0();
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    !first && $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.Selector$ = function(selectorIndex) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'SimpleSelectorSequence'}));
  return new $.Selector(t1, selectorIndex);
};

$.StringUtil__init = function() {
  var t1 = $.StringUtil__CC_0;
  if (t1 == null) {
    $.StringUtil__CC_0 = $.charCodeAt('0', 0);
    $.StringUtil__CC_9 = $.add($.StringUtil__CC_0, 9);
    $.StringUtil__CC_A = $.charCodeAt('A', 0);
    $.StringUtil__CC_Z = $.add($.StringUtil__CC_A, 25);
    $.StringUtil__CC_a = $.charCodeAt('a', 0);
    $.StringUtil__CC_z = $.add($.StringUtil__CC_a, 25);
  }
};

$._TouchDragGesture$ = function(owner, handle, transform, range, movement, start, end, moving) {
  var t1 = new $._TouchDragGesture(null, null, null, null, null, null, null, null, transform, null, movement, range, moving, end, start, handle, owner);
  t1._DragGesture$_init$8(owner, handle, transform, range, movement, start, end, moving);
  return t1;
};

$._PeerConnection00EventsImpl$ = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._WorkerContextEventsImpl$ = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$.AnchorRelation__getOffset = function(anchor, view) {
  if ($.eqB(view.get$style().get$position(), 'fixed')) var t1 = anchor.get$documentOffset();
  else {
    t1 = view.get$parent();
    t1 = (anchor == null ? t1 == null : anchor === t1) ? $._Offset$(0, 0) : $._Offset$(anchor.get$left(), anchor.get$top());
  }
  return t1;
};

$.AnchorRelation__positionRoot = function(view) {
  var loc = view.get$profile().get$location();
  if ($.isEmpty(loc) !== true) {
    var handlers = $.AnchorRelation__getHandlers(loc);
    $.index($._anchorXHandlers(), $.index(handlers, 0)).$call$3(0, $.CTC32, view);
    $.index($._anchorYHandlers(), $.index(handlers, 1)).$call$3(0, $.CTC32, view);
  }
};

$._DocumentEventsImpl$ = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$._ViewImpl_getDOMEventDispatcher = function(type) {
  var t1 = $._ViewImpl__domEvtDisps;
  if (t1 == null) {
    $._ViewImpl__domEvtDisps = $.makeLiteralMap([]);
    for (t1 = $.iterator($.CTC57); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      $.indexSet($._ViewImpl__domEvtDisps, t2, $._ViewImpl__domEvtDisp(t2));
    }
  }
  return $.index($._ViewImpl__domEvtDisps, type);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') return receiver.split(pattern);
  if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp) return receiver.split($.regExpGetNative(pattern));
  throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$._SpeechRecognitionEventsImpl$ = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$ = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.Futures_wait = function(futures) {
  var t1 = ({});
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || (futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))) return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC1);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2) throw $.ioore(i);
    var t3 = futures[i];
    t3.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    t3.handleException$1(new $.Futures_wait_anon0(result, completer, t3));
  }
  return result;
  var t2;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$._DialogInfo$ = function(dialog, maskClass) {
  return new $._DialogInfo(null, maskClass, dialog);
};

$.Primitives_getMinutes = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMinutes()) : ($.Primitives_lazyAsJsDate(receiver).getMinutes());
};

$.geB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a >= b);
  else {
    t1 = $.ge$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.ViewMatchContext$ = function(view) {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, ({E: 'List<bool>'}));
  t1 = new $.ViewMatchContext(t1, 0, view, null);
  t1.ViewMatchContext$1(view);
  return t1;
};

$.window = function() {
  return window;;
};

$._DocumentFragmentFactoryProvider_DocumentFragment = function() {
  return $.document().createDocumentFragment$0();
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = (String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1]);
    if (typeof decompiled === 'string') name$ = decompiled;
  }
  var t1 = $.charCodeAt(name$, 0);
  return t1 === 36 ? $.substring$1(name$, 1) : name$;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a <= b);
  else {
    t1 = $.le$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  }
  return receiver.isNegative$0();
};

$._DOMWindowCrossFrameImpl$ = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) return 0;
    if (result > 0) return result;
    b = (b);
    if (b < 0) return result - b;
    return result + b;
  }
  return a.operator$mod$1(b);
};

$.ViewIterator__getCommonSeqLength = function(list) {
  for (var t1 = $.iterator(list), strs = null, max = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (strs == null) {
      strs = $.ListFactory_List(null);
      $.setRuntimeTypeInfo(strs, ({E: 'String'}));
      for (var t3 = $.iterator(t2.get$seqs()); t3.hasNext$0() === true; ) {
        t2 = t3.next$0();
        var id = t2.get$id();
        if (!(id == null) && $.isEmpty(id) !== true) {
          strs.push($.toString(t2));
          strs.push(t2.printCombinator$0());
        } else break;
      }
      max = strs.length;
    } else {
      for (t3 = $.iterator(t2.get$seqs()), i = 0; t3.hasNext$0() === true; ) {
        t2 = t3.next$0();
        id = t2.get$id();
        if (!(i >= max || id == null || $.isEmpty(id) === true)) {
          var i0 = i + 1;
          var t4 = !$.eqB($.index(strs, i), $.toString(t2));
          i = i0;
        } else t4 = true;
        if (!t4) {
          i0 = i + 1;
          t4 = !$.eqB($.index(strs, i), t2.printCombinator$0());
          t2 = t4;
          i = i0;
        } else t2 = true;
        if (t2) break;
      }
      i0 = i - 1;
      if (i < max) max = i0;
    }
  }
  return $.toInt((max + 1) / 2);
  var i;
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.ViewIterator$ = function(_root, selector) {
  var t1 = new $.ViewIterator(-1, null, false, null, null, null, null, $.Selectors_parse(selector), _root);
  t1.ViewIterator$2(_root, selector);
  return t1;
};

$._XMLHttpRequestEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$ = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection())) {
    if ($.Collections__containsRef(visiting, o) === true) {
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    } else $.Collections__emitCollection(o, result, visiting);
  } else {
    if (typeof o === 'object' && o !== null && o.is$Map()) {
      if ($.Collections__containsRef(visiting, o) === true) $.add$1(result, '{...}');
      else $.Maps__emitMap(o, result, visiting);
    } else {
      $.add$1(result, o == null ? 'null' : o);
    }
  }
};

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = ({});
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.Food$ = function(snakeEnvironment) {
  return new $.Food(snakeEnvironment, true, null, null);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a + b) : $.add$slow(a, b);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$._ViewImpl__cast = function(v) {
  return v;
};

$.Browser__versionOf = function(version, separator) {
  var j = $.indexOf$1(version, separator);
  if ($.geB(j, 0)) {
    var j0 = $.indexOf$2(version, separator, $.add(j, 1));
    if ($.geB(j0, 0)) version = $.substring$2(version, 0, j0);
  }
  try {
    return $.Math_parseDouble(version);
  } catch (exception) {
    $.unwrapException(exception);
    return 1.0;
  }
};

$._SimpleClientRect$ = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$.MeasureContext$ = function() {
  var t1 = $.HashMapImplementation$();
  var t2 = $.HashMapImplementation$();
  return new $.MeasureContext($.HashMapImplementation$(), t2, t1);
};

$.View$ = function() {
  var t1 = new $.View(false, false, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, '');
  t1.View$0();
  return t1;
};

$._anchorWidth = function(anchor, view) {
  var t1 = view.get$parent();
  return (anchor == null ? t1 == null : anchor === t1) ? anchor.get$innerWidth() : anchor.get$outerWidth();
};

$._FileReaderEventsImpl$ = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.Primitives_getYear = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCFullYear()) : ($.Primitives_lazyAsJsDate(receiver).getFullYear());
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$._ElementFactoryProvider_Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$ = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a + b;
  return a.operator$add$1(b);
};

$.ListFactory_List$from = function(other) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.main = function() {
  $.SnakeCanvas$().run$0();
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.ViewMatchContext_matchClasses = function(view, classes) {
  if (classes == null || $.isEmpty(classes) === true) return true;
  for (var t1 = $.iterator(classes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if ($.contains$1(view.get$classes(), t2) !== true) return false;
  }
  return true;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.isInfinite$0();
  return (receiver == Infinity) || (receiver == -Infinity);
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null) {
    if ($.isJsArray(value) === true) return $.Collections_collectionToString(value);
    return value.toString$0();
  }
  if (value === 0 && (1 / value) < 0) return '-0.0';
  if (value == null) return 'null';
  if (typeof value == "function") return 'Closure';
  return String(value);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._VLayout$ = function() {
  return new $._VLayout();
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(1, needle, haystack, length$, patternLength, result);
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.ViewMatchContext$child = function(view, parent$) {
  return new $.ViewMatchContext($.ViewMatchContext__initBoolListFromParent(parent$), 0, view, parent$);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a <= b;
  return a.operator$le$1(b);
};

$.Section$ = function() {
  var t1 = new $.Section(null, false, false, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, '');
  t1.View$0();
  t1.Section$0();
  return t1;
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) return false;
  if (typeof otherLength !== 'number') throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.Primitives_getMilliseconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMilliseconds()) : ($.Primitives_lazyAsJsDate(receiver).getMilliseconds());
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$._DocumentFragmentFactoryProvider_DocumentFragment$html = function(html) {
  var fragment = $._DocumentFragmentFactoryProvider_DocumentFragment();
  fragment.set$innerHTML(html);
  return fragment;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.ltB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a < b);
  else {
    t1 = $.lt$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.ViewUtil_position = function(view, x, y, location$) {
  $.AnchorRelation_position(view, x, y, location$);
};

$.AnchorRelation_position = function(view, x, y, location$) {
  if (location$ == null || $.isEmpty(location$) === true) {
    view.set$left(x);
    view.set$top(y);
  } else {
    var handlers = $.AnchorRelation__getHandlers(location$);
    $.index($._anchorXHandlers(), $.index(handlers, 0)).$call$3(x, $.CTC48, view);
    $.index($._anchorYHandlers(), $.index(handlers, 1)).$call$3(y, $.CTC48, view);
  }
};

$.CSS_intOf = function(value, reportError) {
  try {
    var t1 = value;
    if (!(t1 == null) && $.isEmpty(t1) !== true) {
      var m = $.CTC30.firstMatch$1(value);
      t1 = m;
      if (!(t1 == null)) return $.Math_parseInt(t1.group$1(0));
    }
  } catch (exception) {
    t1 = $.unwrapException(exception);
    var e = t1;
    t1 = reportError;
    if (!(t1 == null) && t1 === true) throw $.captureStackTrace(e);
  }
  return 0;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.SnakeCanvas$ = function() {
  var t1 = new $.SnakeCanvas(null, null, null, null, null, null, 0, null, null, 0, 400, 250, 100, null, [], null, '');
  t1.Activity$0();
  return t1;
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) return receiver.getRange$2(start, length$);
  if (0 === length$) return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.ViewEvent$ = function(type, target, pageX, pageY, offsetX, offsetY) {
  var t1 = new $.ViewEvent(null, null, false, false, null, $.DateImplementation$now().millisecondsSinceEpoch, type, null);
  t1.ViewEvent$6(type, target, pageX, pageY, offsetX, offsetY);
  return t1;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number') return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number') throw $.iae(length$);
  var end = start + length$;
  if (end > a.length) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._TextTrackListEventsImpl$ = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._Size$ = function(width, height) {
  return new $._Size(height, width);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata0 = function() {
  var t1 = (typeof($dynamicMetadata));
  if (t1 === 'undefined') {
    t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$._DeprecatedPeerConnectionEventsImpl$ = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.ViewIterator_isGeneralSibling = function(c1, c2) {
  for (; !(c1 == null); ) {
    if ($.eqB(c1, c2)) return true;
    c1 = c1.get$previousSibling();
  }
  return false;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  return r == null ? (regExp._re = $.regExpMakeNative(regExp, false)) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$._DragGestureState$ = function(gesture, pageX, pageY) {
  var t1 = $._Offset$(0, 0);
  var t2 = $._Offset$(pageX, pageY);
  t2 = new $._DragGestureState(null, false, null, null, null, null, null, null, null, $._Offset$(0, 0), t1, t2, $.DOMQuery_DOMQuery(gesture.get$owner()).get$documentOffset(), gesture);
  t2._DragGestureState$3(gesture, pageX, pageY);
  return t2;
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.Primitives_getSeconds = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCSeconds()) : ($.Primitives_lazyAsJsDate(receiver).getSeconds());
};

$._WindowEventsImpl$ = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$._ViewImpl_checkIdSpaces = function(view, newId) {
  var space = view.get$spaceOwner();
  var t1 = space.getFellow$1(newId);
  if (!(t1 == null)) throw $.captureStackTrace($.UIException$('Not unique in the ID space of ' + $.S(space) + ': ' + $.S(newId)));
  if (typeof view === 'object' && view !== null && !!view.is$IdSpace) {
    var parent$ = view.get$parent();
    t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  if (t1) {
    space = parent$.get$spaceOwner();
    t1 = space.getFellow$1(newId);
    if (!(t1 == null)) throw $.captureStackTrace($.UIException$('Not unique in the ID space of ' + $.S(space) + ': ' + $.S(newId)));
  }
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') return true;
    $.checkNull(b);
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  return false;
};

$.Math_random = function() {
  return $.MathNatives_random();
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.Primitives_getHours = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCHours()) : ($.Primitives_lazyAsJsDate(receiver).getHours());
};

$.MathNatives_random = function() {
  return Math.random();
};

$._ElementAttributeMap$ = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$._Elements_DivElement = function() {
  return $._document().$dom_createElement$1('div');
};

$._Broadcaster$ = function() {
  var t1 = new $._Broadcaster(null, null);
  t1._Broadcaster$0();
  return t1;
};

$._globalState = function() {
  return $globalState;;
};

$._globalState0 = function(val) {
  $globalState = val;;
};

$.CSS_px = function(val) {
  return !(val == null) ? $.S(val) + 'px' : '';
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || ((strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())) return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings) === true) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      t2 = strings[i];
      $.checkNull(t2);
      if (!(typeof t2 === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(t2));
      t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = t2;
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
    if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  }
  return receiver.charCodeAt$1(index);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.toInt$0();
  if ($.isNaN(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('NaN'));
  if ($.isInfinite(receiver) === true) throw $.captureStackTrace($.BadNumberFormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return (truncated == -0.0) ? 0 : truncated;
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t1);
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration$css = function(css) {
  var style = $._ElementFactoryProvider_Element$tag('div').get$style();
  style.set$cssText(css);
  return style;
};

$._EventListenerInfo$ = function(_owner) {
  var t1 = new $._EventListenerInfo(null, null, null, _owner);
  t1._EventListenerInfo$1(_owner);
  return t1;
};

$.print = function(obj) {
  return $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a / b) : $.div$slow(a, b);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$._NullQuery$ = function() {
  return new $._NullQuery(null);
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f == null) && (!!f.methods)) return f.methods;
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC69)[name$]);
  !(dartMethod == null) && (methods['Object'] = dartMethod);
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.Browser$ = function() {
  var t1 = new $.Browser(null, null, null, null, false, false, false, false, false, false, false, false, false, null, null);
  t1.Browser$0();
  return t1;
};

$.broadcaster = function() {
  var t1 = $._broadcaster;
  if (t1 == null) $._broadcaster = $._Broadcaster$();
  return $._broadcaster;
};

$.ListUtil_rangeCheck = function(a, start, length$) {
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('negative length ' + $.S(length$)));
  if ($.ltB(start, 0) || $.geB(start, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if ($.gtB($.add(start, length$), $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$($.add(start, length$)));
};

$.AnchorRelation$ = function(view) {
  var t1 = $.ListFactory_List(null);
  t1 = new $.AnchorRelation(view, $.HashMapImplementation$(), t1);
  t1.AnchorRelation$1(view);
  return t1;
};

$.ViewMatchContext__initBoolListFromParent = function(parent$) {
  var plist = parent$.get$_qualified();
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'List<bool>'}));
  for (var t1 = $.iterator(plist), sublist = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    sublist = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(sublist, ({E: 'bool'}));
    list.push(sublist);
    for (var i = 0; $.ltB(i, $.get$length(t2)); ++i) {
      sublist.push(false);
    }
  }
  return list;
};

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$.SnakeEnvironment$ = function(height, width) {
  var t1 = new $.SnakeEnvironment(null, null, width, height);
  t1.SnakeEnvironment$2(height, width);
  return t1;
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) return receiver.trim$0();
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  if (method == null) {
    var t1 = $._dynamicMetadata0();
    var t2 = !(t1 == null);
    t1 = t2;
  } else t1 = false;
  if (t1) {
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = (methods[entry.get$tag()]);
        if (!(method == null)) break;
      }
    }
  }
  if (method == null) method = (methods['Object']);
  var proto = (Object.getPrototypeOf(obj));
  if (method == null) method = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  (!proto.hasOwnProperty(name$)) && $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    if (key === index && key < (a.length)) return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.Token_getTypeFromChar = function(c) {
  var code = $.charCodeAt(c, 0);
  if ($.Token_isLiteral(code) === true) return 1;
  if ($.Token_isWhitespace(code) === true) return 3;
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
  if (!(typeof receiver === 'string')) return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$._ViewImpl_addToIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0)) return;
  skipFirst !== true && $._ViewImpl__cast(view.get$spaceOwner()).bindFellow_$2(id, view);
  if (typeof view === 'object' && view !== null && !!view.is$IdSpace) {
    var parent$ = view.get$parent();
    var t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  t1 && $._ViewImpl__cast(parent$.get$spaceOwner()).bindFellow_$2(id, view);
};

$._DOMWindowCrossFrameImpl__createSafe = function(w) {
  var t1 = $.window();
  if (w == null ? t1 == null : w === t1) return w;
  return $._DOMWindowCrossFrameImpl$(w);
};

$.LayoutAmountInfo$ = function(profile) {
  var t1 = new $.LayoutAmountInfo(null, null);
  t1.LayoutAmountInfo$1(profile);
  return t1;
};

$._XMLHttpRequestUploadEventsImpl$ = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.insertRange$3 = function(receiver, start, length$, initialValue) {
  if ($.isJsArray(receiver) !== true) return receiver.insertRange$3(start, length$, initialValue);
  return $.listInsertRange(receiver, start, length$, initialValue);
};

$._CssClassSet$ = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  if (ex == null) ex = $.CTC2;
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.SimpleSelectorSequence$ = function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  var t2 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t2, ({E: 'Attribute'}));
  var t3 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t3, ({E: 'PseudoClass'}));
  return new $.SimpleSelectorSequence(0, t3, t2, t1, null, null);
};

$._ElementFactoryProvider_Element$html = function(html) {
  var match = $.CTC49.firstMatch$1(html);
  if (!(match == null)) {
    var tag = $.toLowerCase(match.group$1(1));
    var parentTag = $.CTC51.containsKey$1(tag) === true ? $.CTC51.operator$index$1(tag) : 'div';
  } else {
    tag = null;
    parentTag = 'div';
  }
  var temp = $._ElementFactoryProvider_Element$tag(parentTag);
  temp.set$innerHTML(html);
  if ($.eqB($.get$length(temp.get$elements()), 1)) var element = temp.get$elements().get$first();
  else {
    if ($.eqB(parentTag, 'html') && $.eqB($.get$length(temp.get$elements()), 2)) {
      var t1 = temp.get$elements();
      element = $.index(t1, $.eqB(tag, 'head') ? 0 : 1);
    } else throw $.captureStackTrace($.IllegalArgumentException$('HTML had ' + $.S($.get$length(temp.get$elements())) + ' ' + 'top level elements but 1 expected'));
  }
  element.remove$0();
  return element;
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (a == null) return b == null;
  if (b == null) return false;
  if (typeof a === "object") {
    if (!!a.operator$eq$1) return a.operator$eq$1(b);
  }
  return a === b;
};

$.Strings_join = function(strings, separator) {
  return $.StringBase_join(strings, separator);
};

$.StringBase_join = function(strings, separator) {
  $.checkNull(strings);
  $.checkNull(separator);
  if (!(typeof separator === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(separator));
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), separator);
};

$._SubviewList$ = function(_owner) {
  return new $._SubviewList(_owner);
};

$.CSS_translate3d = function(x, y, z) {
  var t1 = 'translate3d(' + $.S(x) + 'px,' + $.S(y) + 'px,';
  return t1 + $.S(!(z == null) ? z : 0) + 'px)';
};

$.Canvas$ = function() {
  var t1 = new $.Canvas(false, false, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, '');
  t1.View$0();
  return t1;
};

$.gtB = function(a, b) {
  if (typeof a === 'number' && typeof b === 'number') var t1 = (a > b);
  else {
    t1 = $.gt$slow(a, b);
    t1 = t1 === true;
  }
  return t1;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  !(target == null) && (target.builtin$typeInfo = typeInfo);
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    a = (a);
    b = (b);
    if (b < 0) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31) return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
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
  if (!(typeof receiver === 'number')) return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  var t1 = $._getTypeNameOf;
  if (t1 == null) $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.$call$1(obj);
};

$.ViewConfig$ = function() {
  var t1 = new $.ViewConfig('v_', 'v-');
  t1.ViewConfig$0();
  return t1;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true) return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
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

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false)) return;
  $._nextMeasurementFrameScheduled = false;
  var t1 = $._pendingRequests;
  if (!(t1 == null)) {
    for (t1 = $.iterator($._pendingRequests); t1.hasNext$0() === true; ) {
      var request = t1.next$0();
      try {
        var t2 = request.computeValue$0();
        request.set$value(t2);
      } catch (exception) {
        t2 = $.unwrapException(exception);
        var e = t2;
        t2 = e;
        request.set$value(t2);
        request.set$exception(true);
      }
    }
  }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = null;
  $._pendingMeasurementFrameCallbacks = null;
  if (!(completedRequests == null)) {
    for (t1 = $.iterator(completedRequests); t1.hasNext$0() === true; ) {
      t2 = t1.next$0();
      if (t2.get$exception() === true) t2.get$completer().completeException$1(t2.get$value());
      else t2.get$completer().complete$1(t2.get$value());
    }
  }
  if (!(readyMeasurementFrameCallbacks == null)) {
    for (t1 = $.iterator(readyMeasurementFrameCallbacks); t1.hasNext$0() === true; ) {
      t1.next$0().$call$0();
    }
  }
};

$._anchorHeight = function(anchor, view) {
  var t1 = view.get$parent();
  return (anchor == null ? t1 == null : anchor === t1) ? anchor.get$innerHeight() : anchor.get$outerHeight();
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$._LocationWrapper$ = function(_ptr) {
  return new $._LocationWrapper(_ptr);
};

$.isJsArray = function(value) {
  return !(value == null) && (value.constructor === Array);
};

$._BroadcastEvents$ = function(ptr) {
  return new $._BroadcastEvents($.makeLiteralMap([]), ptr);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now = function() {
  var t1 = new $.DateImplementation(false, $.Primitives_dateNow());
  t1.DateImplementation$now$0();
  return t1;
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a >= b;
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

$.ViewIterator_checkIdSpace = function(selector, index, ctx) {
  if (selector.requiresIdSpace$1(index) === true) {
    var t1 = ctx.get$view();
    var t2 = !((typeof t1 === 'object' && t1 !== null) && !!t1.is$IdSpace);
    t1 = t2;
  } else t1 = true;
  return t1;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) return 'HTMLTableCellElement';
  if ($.eqB(name$, 'MSStyleCSSProperties')) return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'CanvasPixelArray')) return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLPhraseElement')) return 'HTMLElement';
  if ($.eqB(name$, 'MouseWheelEvent')) return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  var t1 = (typeof(constructor$));
  if (t1 === 'function') {
    var name$ = (constructor$.name);
    t1 = (typeof(name$));
    if (t1 === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) return name$;
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsSerializer$().traverse$1(message);
  return $._JsCopier$().traverse$1(message);
};

$.SelectorParseException$unexpectedEnding = function(source) {
  return new $.SelectorParseException(-1, null, source);
};

$.Math_max = function(a, b) {
  return $.ltB($.compareTo(a, b), 0) ? b : a;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) return $._JsDeserializer$().deserialize$1(message);
  return message;
};

$.ViewMatchContext_matchID = function(view, id) {
  return id == null || $.eqB(id, view.get$id());
};

$._VirtualIdSpace$ = function(_owner) {
  return new $._VirtualIdSpace($.makeLiteralMap([]), _owner);
};

$.Snake$ = function(snakeEnvironment) {
  var t1 = new $.Snake(snakeEnvironment, true, null, null);
  t1.Snake$1(snakeEnvironment);
  return t1;
};

$.MeasureContext__amountOf = function(profile, parentInner) {
  var ai = $.LayoutAmountInfo$(profile);
  switch (ai.type) {
    case 1:
      return ai.value;
    case 2:
      return parentInner.$call$0();
    case 3:
      return $.toInt($.round($.mul(parentInner.$call$0(), ai.value)));
  }
  return;
};

$.CSS_name = function(propertyName) {
  var t1 = $.CSS__nsnms;
  if (t1 == null) {
    $.CSS__nsnms = $.HashSetImplementation$();
    if (!($.browser.get$ios() === true && $.ltB($.browser.get$iosVersion(), 5))) {
      t1 = $.browser.get$android() === true && $.ltB($.browser.get$androidVersion(), 2.4);
    } else t1 = true;
    (t1 || $.browser.get$firefox() === true) && $.add$1($.CSS__nsnms, 'box-sizing');
    for (t1 = $.iterator($.CTC64); t1.hasNext$0() === true; ) {
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
  if ($.eqB(numberOfArguments, 0)) return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  if ($.eqB(numberOfArguments, 1)) return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  if ($.eqB(numberOfArguments, 2)) return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a > b) : $.gt$slow(a, b);
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true) return;
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $._maybeScheduleMeasurementFrame_anon());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$ = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a * b) : $.mul$slow(a, b);
};

$._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration = function() {
  return $._CSSStyleDeclarationFactoryProvider_CSSStyleDeclaration$css('');
};

$.AnchorRelation__getHandlers = function(loc) {
  if ($.isEmpty(loc) === true) loc = 'top left';
  var handlers = $.CTC28.operator$index$1(loc);
  if (!(handlers == null)) return handlers;
  var j = $.indexOf$1(loc, ' ');
  if ($.gtB(j, 0)) {
    handlers = $.CTC28.operator$index$1($.S($.substring$1(loc, $.add(j, 1))) + ' ' + $.S($.substring$2(loc, 0, j)));
    if (!(handlers == null)) return handlers;
  }
  throw $.captureStackTrace($.UIException$('Unknown loation ' + $.S(loc)));
};

$._browserPrefix = function() {
  var t1 = $._cachedBrowserPrefix;
  if (t1 == null) {
    if ($._Device_isFirefox() === true) $._cachedBrowserPrefix = '-moz-';
    else $._cachedBrowserPrefix = '-webkit-';
  }
  return $._cachedBrowserPrefix;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$._ViewImpl_removeFromIdSpaceDown = function(view, space) {
  var id = view.get$id();
  var t1 = $.get$length(id);
  if (typeof t1 !== 'number') return $._ViewImpl_removeFromIdSpaceDown$bailout(1, view, space, id, t1);
  t1 > 0 && space.bindFellow_$2(id, null);
  if (!((typeof view === 'object' && view !== null) && !!view.is$IdSpace)) {
    for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling()) {
      $._ViewImpl_removeFromIdSpaceDown(view, space);
    }
  }
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
    } else ci.set$firstChild(child);
    beforeChild.set$_prevSibling(child);
    child.set$_nextSibling(beforeChild);
  }
  child.set$_lib3_parent(view);
  var t1 = view.get$_childInfo();
  t1.set$nChild($.add(t1.get$nChild(), 1));
  if (typeof child === 'object' && child !== null && !!child.is$IdSpace) $._ViewImpl_addToIdSpace(child, true);
  else $._ViewImpl_addToIdSpaceDown(child, child.get$spaceOwner());
};

$.Primitives_getDay = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCDate()) : ($.Primitives_lazyAsJsDate(receiver).getDate());
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
  return new $._ViewEventListenerList(_type, _ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.Application$ = function(name$) {
  var t1 = new $.Application(null, null, false, null);
  t1.Application$1(name$);
  return t1;
};

$._LocationWrapper__toString = function(p) {
  return p.toString();;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) return;
  return result;
};

$.Primitives_getMonth = function(receiver) {
  return receiver.get$isUtc() === true ? ($.Primitives_lazyAsJsDate(receiver).getUTCMonth()) + 1 : ($.Primitives_lazyAsJsDate(receiver).getMonth()) + 1;
};

$.Selectors__isWhitespace = function(c) {
  return $.eqB(c, 32) || $.eqB(c, 9) || $.eqB(c, 10) || $.eqB(c, 13);
};

$.ViewIterator__isAllIds = function(list, offset) {
  if (typeof offset !== 'number') return $.ViewIterator__isAllIds$bailout(1, list, offset);
  for (var t1 = $.iterator(list); t1.hasNext$0() === true; ) {
    if ($.gtB($.get$length(t1.next$0().get$seqs()), offset)) return false;
  }
  return true;
};

$._WindowQuery$ = function(v) {
  return new $._WindowQuery(v);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    var t1 = $.indexOf$2(receiver, other, startIndex);
    return !(t1 === -1);
  }
  if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp) return other.hasMatch$1($.substring$1(receiver, startIndex));
  return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$.LinearLayout$ = function() {
  return new $.LinearLayout();
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$._ViewImpl_spaceOwner = function(view) {
  var p = view;
  var top$ = null;
  do {
    if (typeof p === 'object' && p !== null && !!p.is$IdSpace) return $._ViewImpl__cast(p);
    top$ = p;
  } while (p = p.get$parent(), !(p == null));
  var t1 = top$.get$_virtIS();
  t1 == null && top$.set$_virtIS($._VirtualIdSpace$(top$));
  return top$.get$_virtIS();
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.abs$0();
  return Math.abs(receiver);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) return receiver.length === 0;
  return receiver.isEmpty$0();
};

$._DragGesture__DragGesture = function(owner, handle, transform, range, movement, start, end, moving) {
  if (handle == null) handle = owner;
  return $.browser.get$touch() === true ? $._TouchDragGesture$(owner, handle, transform, range, movement, start, end, moving) : $._MouseDragGesture$(owner, handle, transform, range, movement, start, end, moving);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  multiLine === true && $.add$1(sb, 'm');
  ignoreCase === true && $.add$1(sb, 'i');
  global === true && $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, (String(e))));
  }
};

$.BadNumberFormatException$ = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.Primitives_lazyAsJsDate = function(receiver) {
  (receiver.date === (void 0)) && (receiver.date = new Date(receiver.get$millisecondsSinceEpoch()));
  return receiver.date;
};

$._IDBDatabaseEventsImpl$ = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.TextView$ = function(text) {
  var t1 = new $.TextView(null, null, false, false, null, null, null, null, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, '');
  t1.View$0();
  t1.TextView$1(text);
  return t1;
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) return -1;
    if ($.gtB(a, b)) return 1;
    if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b))) return 0;
        if (aIsNegative === true) return -1;
        return 1;
      }
      return 0;
    }
    if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true) return 0;
      return 1;
    }
    return -1;
  }
  if (typeof a === 'string') {
    if (!(typeof b === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b) var t1 = 0;
    else {
      t1 = (a < b) ? -1 : 1;
    }
    return t1;
  }
  return a.compareTo$1(b);
};

$.ge = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a >= b) : $.ge$slow(a, b);
};

$.ViewIterator_isDescendant = function(c1, c2) {
  if ($.eqB(c1, c2)) return true;
  for (; c1 = c1.get$parent(), !(c1 == null); ) {
    if ($.eqB(c1, c2)) return true;
    if (typeof c1 === 'object' && c1 !== null && !!c1.is$IdSpace) return $.eq(c1, c2);
  }
  return false;
};

$._MeasurementRequest$ = function(computeValue, completer) {
  return new $._MeasurementRequest(false, null, completer, computeValue);
};

$._TextTrackCueEventsImpl$ = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.ViewEvent$dom = function(domEvent, type, target) {
  var t1 = !(type == null) ? type : domEvent.get$type();
  t1 = new $.ViewEvent(null, null, false, false, null, domEvent.get$timeStamp(), t1, domEvent);
  t1.ViewEvent$dom$3(domEvent, type, target);
  return t1;
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

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._Offset3d$ = function(x, y, z) {
  return new $._Offset3d(z, y, x);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, (receiver.length));
  }
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0) return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.RunOnceQueue$ = function() {
  return new $.RunOnceQueue(null);
};

$.Primitives_newList = function(length$) {
  if (length$ == null) return new Array();
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0))) || length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.Primitives_dateNow = function() {
  return Date.now();
};

$._AbstractWorkerEventsImpl$ = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$._Animator$ = function() {
  var t1 = new $._Animator(null, null, null, $.ListFactory_List(null));
  t1._Animator$0();
  return t1;
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
  if (typeof receiver === 'number') return isNaN(receiver);
  return receiver.isNaN$0();
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) return receiver.round$0();
  if (receiver < 0) return -Math.round(-receiver);
  return Math.round(receiver);
};

$.CSSStyleDeclarationImpl$ = function(_view) {
  return new $.CSSStyleDeclarationImpl(null, _view);
};

$._HLayout$ = function() {
  return new $._HLayout();
};

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object' || src === null || (src.constructor !== Array && !src.is$JavaScriptIndexingBehavior()))) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof dst !== 'object' || dst === null || ((dst.constructor !== Array || !!dst.immutable$list) && !dst.is$JavaScriptIndexingBehavior())) return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (typeof count !== 'number') return $.Arrays_copy$bailout(1, src, srcStart, dst, dstStart, count);
  if (srcStart == null) srcStart = 0;
  if (typeof srcStart !== 'number') return $.Arrays_copy$bailout(2, src, dst, dstStart, count, srcStart);
  if (dstStart == null) dstStart = 0;
  if (typeof dstStart !== 'number') return $.Arrays_copy$bailout(3, src, dst, count, srcStart, dstStart);
  if (srcStart < dstStart) {
    for (var i = srcStart + count - 1, j = dstStart + count - 1; i >= srcStart; --i, --j) {
      if (i !== (i | 0)) throw $.iae(i);
      var t1 = src.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      var t2 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t3 = dst.length;
      if (j < 0 || j >= t3) throw $.ioore(j);
      dst[j] = t2;
    }
  } else {
    for (t1 = srcStart + count, i = srcStart, j = dstStart; i < t1; ++i, ++j) {
      if (i !== (i | 0)) throw $.iae(i);
      t2 = src.length;
      if (i < 0 || i >= t2) throw $.ioore(i);
      t3 = src[i];
      if (j !== (j | 0)) throw $.iae(j);
      var t4 = dst.length;
      if (j < 0 || j >= t4) throw $.ioore(j);
      dst[j] = t3;
    }
  }
};

$._ViewImpl_removeFromIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0)) return;
  skipFirst !== true && $._ViewImpl__cast(view.get$spaceOwner()).bindFellow_$2(id, null);
  if (typeof view === 'object' && view !== null && !!view.is$IdSpace) {
    var parent$ = view.get$parent();
    var t1 = !(parent$ == null);
  } else {
    parent$ = null;
    t1 = false;
  }
  t1 && $._ViewImpl__cast(parent$.get$spaceOwner()).bindFellow_$2(id, null);
};

$.LayoutManager$ = function() {
  var t1 = $.RunOnceQueue$();
  var t2 = $.HashSetImplementation$();
  var t3 = $.ListFactory_List(null);
  var t4 = $.makeLiteralMap([]);
  var t5 = $.HashSetImplementation$();
  t1 = new $.LayoutManager(0, [], t5, t4, true, true, t3, null, t2, t1);
  t1.LayoutManager$0();
  return t1;
};

$.ProfileDeclarationImpl$ = function(owner) {
  return new $.ProfileDeclarationImpl(null, owner, $.HashMapImplementation$());
};

$.CSS_offset3dOf = function(value) {
  if (value == null || $.isEmpty(value) === true) return $._Offset3d$(0, 0, 0);
  var ary = [0, 0, 0];
  var i = $.indexOf$1(value, '(');
  if ($.geB(i, 0)) value = $.substring$1(value, $.add(i, 1));
  for (var t1 = $.iterator($.split(value, ',')), i = 0; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    var i0 = i + 1;
    t2 = $.CSS_intOf(t2, null);
    var t3 = ary.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    ary[i] = t2;
    if (i0 === 3) break;
    i = i0;
  }
  t1 = ary.length;
  if (0 >= t1) throw $.ioore(0);
  t2 = ary[0];
  if (1 >= t1) throw $.ioore(1);
  t3 = ary[1];
  if (2 >= t1) throw $.ioore(2);
  return $._Offset3d$(t2, t3, ary[2]);
};

$._DOMWindowCrossFrameImpl__top = function(win) {
  return win.top;;
};

$.Selectors__getTokenClass = function(c) {
  if ($.Selectors__isWhitespace(c) === true) var t1 = 1;
  else {
    t1 = $.Selectors__isLiteral(c) === true ? 0 : 2;
  }
  return t1;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$ = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$._MouseDragGesture$ = function(owner, handle, transform, range, movement, start, end, moving) {
  var t1 = new $._MouseDragGesture(false, null, null, null, null, null, null, transform, null, movement, range, moving, end, start, handle, owner);
  t1._DragGesture$_init$8(owner, handle, transform, range, movement, start, end, moving);
  return t1;
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null) return;
  var function$ = (closure.$identity);
  if (!!function$) return function$;
  function$ = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function$;
  return function$;
};

$.Selectors_parse = function(source) {
  var tokens = $.Selectors_tokenize(source);
  var selectors = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(selectors, ({E: 'Selector'}));
  $.get$length(tokens);
  for (var t1 = $.iterator(tokens), curr = null, currSeq = null, state = 1; t1.hasNext$0() === true; ) {
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
    if (currSeq == null && $.Selectors__requireSequence(state, t2.get$type()) === true) {
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
            if (curr == null) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
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
        if (!$.eqB(t2.get$type(), 1)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        t2 = t2.source$1(source);
        $.last(currSeq.get$pseudoClasses()).set$parameter(t2);
        state = 16;
        continue;
      case 16:
        if (!$.eqB(t2.get$type(), 22)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
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
        if (!$.eqB(t2.get$type(), 1)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        break;
    }
    switch (state) {
      case 2:
        if (!$.eqB(t2.get$type(), 3)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
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
        if (!$.eqB(t2.get$type(), 3)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
        state = 3;
        break;
      case 5:
        var t3 = currSeq.get$id();
        if (!(t3 == null)) throw $.captureStackTrace($.SelectorParseException$unexpectedToken(source, t2));
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
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) return receiver.split$1(pattern);
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
  var t1 = new $.PopupEvent(source, null, null, false, false, null, $.DateImplementation$now().millisecondsSinceEpoch, type, null);
  t1.ViewEvent$6(type, null, null, null, null, null);
  return t1;
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
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

$.SnakePoint$ = function(x, y) {
  return new $.SnakePoint(y, x);
};

$.checkNull = function(object) {
  if (object == null) throw $.captureStackTrace($.NullPointerException$(null, $.CTC1));
  return object;
};

$.StringUtil_addCharCodes = function(src, diff) {
  if (typeof diff !== 'number') return $.StringUtil_addCharCodes$bailout(1, src, diff, 0);
  var j = $.get$length(src);
  if (typeof j !== 'number') return $.StringUtil_addCharCodes$bailout(2, src, diff, j);
  var dst = $.ListFactory_List(j);
  for (; --j, j >= 0; ) {
    var t1 = $.add($.charCodeAt(src, j), diff);
    if (j !== (j | 0)) throw $.iae(j);
    var t2 = dst.length;
    if (j < 0 || j >= t2) throw $.ioore(j);
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
  return new $._EventListenerListImpl(_type, _ptr);
};

$._Offset$ = function(left, top$) {
  return new $._Offset(top$, left);
};

$.ViewMatchContext__initBoolList = function(selectors) {
  var list = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(list, ({E: 'List<bool>'}));
  for (var t1 = $.iterator(selectors), sublist = null; t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    sublist = $.ListFactory_List(null);
    $.setRuntimeTypeInfo(sublist, ({E: 'bool'}));
    list.push(sublist);
    for (var i = 0; $.ltB(i, $.get$length(t2.get$seqs())); ++i) {
      sublist.push(false);
    }
  }
  return list;
};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.Token_isLiteral = function(c) {
  if (!($.gtB(c, 96) && $.ltB(c, 123))) {
    var t1 = $.gtB(c, 64) && $.ltB(c, 91);
  } else t1 = true;
  if (!t1) {
    t1 = $.gtB(c, 47) && $.ltB(c, 58);
  } else t1 = true;
  return t1 || $.eqB(c, 95) || $.eqB(c, 45);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a < b;
  return a.operator$lt$1(b);
};

$._ChildInfo$ = function() {
  return new $._ChildInfo(null, 0, null, null);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) throw $.captureStackTrace($.IllegalArgumentException$(index));
      var t1 = $.truncate(index);
      if (!(t1 === index)) throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$._Animator__now = function() {
  return $.DateImplementation$now().millisecondsSinceEpoch;
};

$._anchorXHandlers = function() {
  var t1 = $._$anchorXHandlers;
  if (t1 == null) $._$anchorXHandlers = [new $._anchorXHandlers_anon(), new $._anchorXHandlers_anon0(), new $._anchorXHandlers_anon1(), new $._anchorXHandlers_anon2(), new $._anchorXHandlers_anon3()];
  return $._$anchorXHandlers;
};

$._DOMWindowCrossFrameImpl__postMessage3 = function(win, message, targetOrigin, messagePorts) {
      win.postMessage(message, targetOrigin, messagePorts);
;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$.listInsertRange = function(receiver, start, length$, initialValue) {
  if (typeof receiver !== 'object' || receiver === null || ((receiver.constructor !== Array || !!receiver.immutable$list) && !receiver.is$JavaScriptIndexingBehavior())) return $.listInsertRange$bailout(1, receiver, start, length$, initialValue);
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = (receiver.length);
  if (start < 0 || start > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null)) {
    for (var i = start; i < t2; ++i) {
      var t3 = receiver.length;
      if (i < 0 || i >= t3) throw $.ioore(i);
      receiver[i] = initialValue;
    }
  }
  $.set$length(receiver, t1);
};

$.UIException$ = function(message) {
  return new $.UIException(message);
};

$.IndexOutOfRangeException$ = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._AttributeClassSet$ = function(element) {
  return new $._AttributeClassSet(element);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$((exception.stack));
};

$.StringUtil_encodeId = function(v, prefix) {
  if (typeof v !== 'number') return $.StringUtil_encodeId$bailout(1, v, prefix);
  var sb = $.StringBufferImpl$('');
  !(prefix == null) && sb.add$1(prefix);
  do {
    var v2 = $.mod(v, 37);
    if (v2 <= 9) sb.add$1($.StringUtil_addCharCodes('0', v2));
    else {
      sb.add$1(v2 === 36 ? '_' : $.StringUtil_addCharCodes('a', v2 - 10));
    }
  } while (v = $.tdiv(v, 37), v >= 1);
  return sb.toString$0();
};

$._TextTrackEventsImpl$ = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$._BatteryManagerEventsImpl$ = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ElementRectImpl$ = function(element) {
  var t1 = $._SimpleClientRect$(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t2 = $._SimpleClientRect$(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t3 = $._SimpleClientRect$(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t4 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t4, t3, t2, t1);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    var t1 = $.get$length(receiver);
    if (t1 === 0) throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._WebSocketEventsImpl$ = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._ClassSet$ = function(view) {
  var t1 = new $._ClassSet(view, null);
  t1.HashSetImplementation$0();
  return t1;
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

$.DateImplementation$fromMillisecondsSinceEpoch = function(millisecondsSinceEpoch, isUtc) {
  var t1 = new $.DateImplementation($.checkNull(isUtc), millisecondsSinceEpoch);
  t1.DateImplementation$fromMillisecondsSinceEpoch$2(millisecondsSinceEpoch, isUtc);
  return t1;
};

$.Primitives_stringFromCharCodes = function(charCodes) {
  for (var t1 = $.iterator(charCodes); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    if (!((typeof t2 === 'number') && (t2 === (t2 | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(t2));
  }
  return String.fromCharCode.apply(null, charCodes);
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $.Arrays_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) return 'DOMWindow';
  if ($.eqB(name$, 'Document')) return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument')) return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent')) return 'MessageEvent';
  return name$;
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0) throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else receiver.set$length(newLength);
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) return a > b;
  return a.operator$gt$1(b);
};

$.Selectors_tokenize = function(source) {
  var tokens = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(tokens, ({E: 'Token'}));
  var len = $.get$length(source);
  if (typeof len !== 'number') return $.Selectors_tokenize$bailout(1, source, len, tokens);
  for (var curr = null, pclz = 2, i = 0; i < len; ++i) {
    var c = $.substring$2(source, i, i + 1);
    var clz = $.Selectors__getTokenClass($.charCodeAt(source, i));
    if (!(curr == null) && $.eqB(clz, pclz) && !$.eqB(clz, 2)) curr.extend$0();
    else {
      curr = $.Token$fromChar(c, i);
      tokens.push(curr);
    }
    pclz = clz;
  }
  return tokens;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || (a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))) return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number') return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length)) return -1;
  if ($.ltB(startIndex, 0)) startIndex = 0;
  if (typeof startIndex !== 'number') return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0)) throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    if ($.eqB(a[i], element)) return i;
  }
  return -1;
};

$._DOMWindowCrossFrameImpl__parent = function(win) {
  return win.parent;;
};

$._WCIterator$ = function(owner) {
  var t1 = new $._WCIterator(null);
  t1._WCIterator$1(owner);
  return t1;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string')) return receiver.hashCode$0();
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + (receiver.charCodeAt(i));
    var hash1 = 536870911 & hash0 + (524287 & hash0 << 10);
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + (67108863 & hash << 3);
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + (16383 & hash0 << 15);
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

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) return false;
  return other == receiver.substring(0, length$);
};

$.StringBase_createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object' && charCodes !== null) && (((charCodes.constructor === Array) || charCodes.is$List())))) throw $.captureStackTrace($.IllegalArgumentException$(charCodes));
    var charCodes0 = $.ListFactory_List$from(charCodes);
    charCodes = charCodes0;
  }
  return $.Primitives_stringFromCharCodes(charCodes);
};

$.le = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a <= b) : $.le$slow(a, b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
};

$._MessagePortEventsImpl$ = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$._document = function() {
  return document;;
};

$.getFunctionForTypeNameOf = function() {
  var t1 = (typeof(navigator));
  if (!(t1 === 'object')) return $.typeNameInChrome;
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC68) === true) return $.typeNameInChrome;
  if ($.contains$1(userAgent, 'Firefox') === true) return $.typeNameInFirefox;
  if ($.contains$1(userAgent, 'MSIE') === true) return $.typeNameInIE;
  return $.constructorNameFallback;
};

$.CSSStyleDeclarationImpl__check = function(propertyName) {
  var t1 = $.CSSStyleDeclarationImpl__illnms;
  if (t1 == null) {
    $.CSSStyleDeclarationImpl__illnms = $.HashSetImplementation$();
    for (t1 = $.iterator($.CTC65); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      $.add$1($.CSSStyleDeclarationImpl__illnms, t2);
    }
  }
  if ($.contains$1($.CSSStyleDeclarationImpl__illnms, propertyName) === true) throw $.captureStackTrace($.UIException$($.S(propertyName) + ' not allowed. Please use View\'s API instead, such as left, width and hidden.'));
};

$.PseudoClass$ = function(name$) {
  return new $.PseudoClass(null, name$);
};

$._ElementEventsImpl$ = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$._ViewImpl_unlink = function(view, child) {
  if (typeof child === 'object' && child !== null && !!child.is$IdSpace) $._ViewImpl_removeFromIdSpace(child, true);
  else $._ViewImpl_removeFromIdSpaceDown(child, child.get$spaceOwner());
  var p = child.get$_prevSibling();
  var n = child.get$_nextSibling();
  if (!(p == null)) p.set$_nextSibling(n);
  else view.get$_childInfo().set$firstChild(n);
  if (!(n == null)) n.set$_prevSibling(p);
  else view.get$_childInfo().set$lastChild(p);
  child.set$_lib3_parent(null);
  child.set$_prevSibling(null);
  child.set$_nextSibling(null);
  var t1 = view.get$_childInfo();
  t1.set$nChild($.sub(t1.get$nChild(), 1));
};

$.Math_parseDouble = function(str) {
  return $.MathNatives_parseDouble(str);
};

$.MathNatives_parseDouble = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  if (ret === 0) {
    var t1 = $.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true;
  } else t1 = false;
  if (t1) ret = (parseInt(str));
  if ($.isNaN(ret) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN')) throw $.captureStackTrace($.BadNumberFormatException$(str));
  return ret;
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$._anchorYHandlers = function() {
  var t1 = $._$anchorYHandlers;
  if (t1 == null) $._$anchorYHandlers = [new $._anchorYHandlers_anon(), new $._anchorYHandlers_anon0(), new $._anchorYHandlers_anon1(), new $._anchorYHandlers_anon2(), new $._anchorYHandlers_anon3()];
  return $._$anchorYHandlers;
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true) return $.Arrays_indexOf(receiver, element, 0, (receiver.length));
  if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof element === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(element));
    return receiver.indexOf(element);
  }
  return receiver.indexOf$1(element);
};

$._BroadcastListeners$ = function(_owner) {
  return new $._BroadcastListeners($.HashMapImplementation$(), _owner);
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
  if ($.checkNumbers(a, b) === true) return a / b;
  return a.operator$div$1(b);
};

$.MeasureContext__getSetByApp = function(view, val, nm) {
  return !(val == null) && !$.eqB(val, $.index(view.get$dataAttributes(), nm)) ? val : null;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) return receiver.forEach$1(f);
  return $.Collections_forEach(receiver, f);
};

$._SharedWorkerContextEventsImpl$ = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$ = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._OnDemandMap$ = function(_creator) {
  return new $._OnDemandMap(null, _creator);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.MapUtil_onDemand = function(creator) {
  return $._OnDemandMap$(creator);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a < b) : $.lt$slow(a, b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) return ex.dartException;
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NullPointerException$(null, $.CTC1);
    }
    if ($.eqB(type, 'undefined_method')) {
      if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) return $.ObjectNotClosureException$();
      return $.NoSuchMethodException$('', name$, [], null);
    }
    if (typeof message === 'string') {
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true) return $.NullPointerException$(null, $.CTC1);
      if ($.endsWith(message, 'is not a function') === true) return $.NoSuchMethodException$('', '<unknown>', [], null);
    }
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true) return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    if (typeof message === 'string' && message === 'too much recursion') return $.StackOverflowException$();
  }
  return ex;
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.StringUtil_isChar = function(cc, digit, upper, lower, whitespace, match) {
  $.StringUtil__init();
  var v = $.isEmpty(cc) === true ? 0 : $.charCodeAt(cc, 0);
  if (!(digit === true && $.geB(v, $.StringUtil__CC_0) && $.leB(v, $.StringUtil__CC_9))) {
    var t1 = upper === true && $.geB(v, $.StringUtil__CC_A) && $.leB(v, $.StringUtil__CC_Z);
  } else t1 = true;
  if (!t1) {
    t1 = lower === true && $.geB(v, $.StringUtil__CC_a) && $.leB(v, $.StringUtil__CC_z);
  } else t1 = true;
  if (!t1) {
    if (whitespace === true) {
      t1 = $.eqB(cc, ' ') || $.eqB(cc, '\x09') || $.eqB(cc, '\n') || $.eqB(cc, '\r');
    } else t1 = false;
  } else t1 = true;
  if (!t1) {
    t1 = !(match == null) && $.geB($.indexOf$1(match, cc), 0);
  } else t1 = true;
  return t1;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true; ) {
    f.$call$1(t1.next$0());
  }
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? (a - b) : $.sub$slow(a, b);
};

$.Selectors__requireSequence = function(state, type) {
  if (!$.eqB(type, 1) && !$.eqB(type, 2)) return false;
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
  !(prefix == null) && sb.add$1(prefix);
  do {
    var v2 = $.mod(v, 37);
    if ($.leB(v2, 9)) sb.add$1($.StringUtil_addCharCodes('0', v2));
    else {
      sb.add$1($.eqB(v2, 36) ? '_' : $.StringUtil_addCharCodes('a', $.sub(v2, 10)));
    }
  } while (v = $.tdiv(v, 37), $.geB(v, 1));
  return sb.toString$0();
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$.Arrays_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 1:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) return -1;
      if ($.ltB(startIndex, 0)) startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1)) {
        if ($.eqB($.index(a, i), element)) return i;
      }
      return -1;
  }
};

$._ViewImpl_addToIdSpaceDown$bailout = function(state, view, space, id, t1) {
  $.gtB(t1, 0) && space.bindFellow_$2(id, view);
  if (!((typeof view === 'object' && view !== null) && !!view.is$IdSpace)) {
    var vs = view.get$_virtIS();
    if (!(vs == null)) {
      view.set$_virtIS(null);
      for (t1 = $.iterator(vs.get$fellows()); t1.hasNext$0() === true; ) {
        var t2 = t1.next$0();
        space.bindFellow_$2(t2.get$id(), t2);
      }
    } else {
      for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling()) {
        $._ViewImpl_addToIdSpaceDown(view, space);
      }
    }
  }
};

$.StringUtil_addCharCodes$bailout = function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var src = env0;
      var diff = env1;
      break;
    case 2:
      src = env0;
      diff = env1;
      j = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var j = $.get$length(src);
    case 2:
      state = 0;
      var dst = $.ListFactory_List(j);
      for (; j = $.sub(j, 1), $.geB(j, 0); ) {
        var t1 = $.add($.charCodeAt(src, j), diff);
        if (j !== (j | 0)) throw $.iae(j);
        var t2 = dst.length;
        if (j < 0 || j >= t2) throw $.ioore(j);
        dst[j] = t1;
      }
      return $.Strings_String$fromCharCodes(dst);
  }
};

$.allMatchesInStringUnchecked$bailout = function(state, needle, haystack, length$, patternLength, result) {
  for (var startIndex = 0; true; ) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) break;
    else {
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
    }
  }
  return result;
};

$.StringUtil_encodeXML$bailout = function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var txt = env0;
      var multiline = env1;
      var maxlength = env2;
      var pre = env3;
      break;
    case 1:
      txt = env0;
      multiline = env1;
      maxlength = env2;
      pre = env3;
      break;
    case 2:
      txt = env0;
      t1 = env1;
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
    case 1:
      state = 0;
      if (txt == null) return;
      var tl = $.get$length(txt);
      var t1 = pre === true;
      multiline = t1 || multiline === true;
      var t2 = !multiline;
      if (t2 && $.gtB(maxlength, 0) && $.gtB(tl, maxlength)) {
        var j = maxlength;
        while (true) {
          if (!($.gtB(j, 0) && $.StringUtil_isChar($.index(txt, $.sub(j, 1)), false, false, false, true, null) === true)) break;
          j = $.sub(j, 1);
        }
        return $.StringUtil_encodeXML($.S($.substring$2(txt, 0, j)) + '...', multiline, 0, pre);
      }
      var out = $.StringBufferImpl$('');
    case 2:
      if (state == 2 || (state == 0 && (multiline || t1))) {
        switch (state) {
          case 0:
            var enc = null;
            j = 0;
            var k = 0;
          case 2:
            L0: while (true) {
              switch (state) {
                case 0:
                  if (!$.ltB(j, tl)) break L0;
                  var cc = $.index(txt, j);
                case 2:
                  state = 0;
                  enc = $.CTC54.operator$index$1(cc);
                  if (!(enc == null)) {
                    $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
                    var k0 = j + 1;
                    k = k0;
                  } else {
                    if (multiline && $.eqB(cc, '\n')) {
                      $.add$1(out.add$1($.substring$2(txt, k, j)), '<br/>\n');
                      k0 = j + 1;
                      k = k0;
                    } else {
                      if (t1) {
                        t2 = $.eqB(cc, ' ') || $.eqB(cc, '\x09');
                      } else t2 = false;
                      if (t2) {
                        $.add$1(out.add$1($.substring$2(txt, k, j)), '&nbsp;');
                        $.eqB(cc, '\x09') && out.add$1('&nbsp;&nbsp;&nbsp;');
                        k = j + 1;
                      }
                    }
                  }
                  ++j;
              }
            }
        }
      } else {
        for (enc = null, j = 0, k = 0; $.ltB(j, tl); ++j) {
          enc = $.CTC54.operator$index$1($.index(txt, j));
          if (!(enc == null)) {
            $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j)), '&'), enc), ';');
            k0 = j + 1;
            k = k0;
          }
        }
      }
      if (k === 0) return txt;
      $.ltB(k, tl) && out.add$1($.substring$1(txt, k));
      return out.toString$0();
  }
};

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC1);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
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
  $.gtB(t1, 0) && space.bindFellow_$2(id, null);
  if (!((typeof view === 'object' && view !== null) && !!view.is$IdSpace)) {
    for (view = view.get$firstChild(); !(view == null); view = view.get$nextSibling()) {
      $._ViewImpl_removeFromIdSpaceDown(view, space);
    }
  }
};

$.Arrays_copy$bailout = function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var src = env0;
      var srcStart = env1;
      var dst = env2;
      var dstStart = env3;
      var count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 1:
      src = env0;
      srcStart = env1;
      dst = env2;
      dstStart = env3;
      count = env4;
      break;
    case 2:
      src = env0;
      dst = env1;
      dstStart = env2;
      count = env3;
      srcStart = env4;
      break;
    case 3:
      src = env0;
      dst = env1;
      count = env2;
      srcStart = env3;
      dstStart = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 1:
      state = 0;
    case 1:
      state = 0;
      if (srcStart == null) srcStart = 0;
    case 2:
      state = 0;
      if (dstStart == null) dstStart = 0;
    case 3:
      state = 0;
      if ($.ltB(srcStart, dstStart)) {
        for (var i = $.sub($.add(srcStart, count), 1), j = $.sub($.add(dstStart, count), 1); $.geB(i, srcStart); i = $.sub(i, 1), j = $.sub(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      } else {
        for (i = srcStart, j = dstStart; $.ltB(i, $.add(srcStart, count)); i = $.add(i, 1), j = $.add(j, 1)) {
          $.indexSet(dst, j, $.index(src, i));
        }
      }
  }
};

$.Selectors_tokenize$bailout = function(state, source, len, tokens) {
  for (var curr = null, pclz = 2, i = 0; $.ltB(i, len); ++i) {
    var c = $.substring$2(source, i, i + 1);
    var clz = $.Selectors__getTokenClass($.charCodeAt(source, i));
    if (!(curr == null) && $.eqB(clz, pclz) && !$.eqB(clz, 2)) curr.extend$0();
    else {
      curr = $.Token$fromChar(c, i);
      tokens.push(curr);
    }
    pclz = clz;
  }
  return tokens;
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j) {
              set.add$1($.index(tagNames, j));
            }
            $.add$1(result, $.MetaInfo$(tag, tags, set));
            ++i;
        }
      }
      return result;
  }
};

$.listInsertRange$bailout = function(state, receiver, start, length$, initialValue) {
  if (length$ === 0) return;
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (length$ < 0) throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (!((typeof start === 'number') && (start === (start | 0)))) throw $.captureStackTrace($.IllegalArgumentException$(start));
  var receiverLength = (receiver.length);
  if (start < 0 || start > receiverLength) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var t1 = receiverLength + length$;
  $.set$length(receiver, t1);
  var t2 = start + length$;
  $.Arrays_copy(receiver, start, receiver, t2, receiverLength - start);
  if (!(initialValue == null)) {
    for (var i = start; i < t2; ++i) {
      $.indexSet(receiver, i, initialValue);
    }
  }
  $.set$length(receiver, t1);
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0)) throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0)) throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a))) throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    $.add$1(accumulator, $.index(a, i));
  }
  return accumulator;
};

$.ViewIterator__isAllIds$bailout = function(state, list, offset) {
  for (var t1 = $.iterator(list); t1.hasNext$0() === true; ) {
    if ($.gtB($.get$length(t1.next$0().get$seqs()), offset)) return false;
  }
  return true;
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings) === true) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string')) throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1) throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.invokeClosure.$call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC1 = Isolate.makeConstantList([]);
$.CTC6 = Isolate.makeConstantList([1, 0]);
$.CTC7 = Isolate.makeConstantList([2, 0]);
$.CTC8 = Isolate.makeConstantList([3, 0]);
$.CTC12 = Isolate.makeConstantList([0, 1]);
$.CTC9 = Isolate.makeConstantList([1, 4]);
$.CTC10 = Isolate.makeConstantList([2, 4]);
$.CTC11 = Isolate.makeConstantList([3, 4]);
$.CTC17 = Isolate.makeConstantList([4, 3]);
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC43 = new Isolate.$isolateProperties.UIException('type required');
$.CTC15 = Isolate.makeConstantList([4, 1]);
$.CTC13 = Isolate.makeConstantList([0, 2]);
$.CTC14 = Isolate.makeConstantList([0, 3]);
$.CTC62 = new Isolate.$isolateProperties.IllegalArgumentException('Require initialValue');
$.CTC18 = Isolate.makeConstantList([1, 1]);
$.CTC16 = Isolate.makeConstantList([4, 2]);
$.CTC20 = Isolate.makeConstantList([3, 1]);
$.CTC19 = Isolate.makeConstantList([2, 1]);
$.CTC49 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '<(\\w+)');
$.CTC30 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '([-]?[0-9]+)');
$.CTC23 = Isolate.makeConstantList([3, 2]);
$.CTC24 = Isolate.makeConstantList([1, 3]);
$.CTC21 = Isolate.makeConstantList([1, 2]);
$.CTC44 = new Isolate.$isolateProperties.UIException('listener required');
$.CTC53 = Isolate.makeConstantList(['<', '>', '&', '"']);
$.CTC54 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC53, {'<': 'lt', '>': 'gt', '&': 'amp', '"': 'quot'}, 4);
$.CTC22 = Isolate.makeConstantList([2, 2]);
$.CTC25 = Isolate.makeConstantList([2, 3]);
$.CTC34 = new Isolate.$isolateProperties.SystemException('document not ready yet');
$.CTC52 = new Isolate.$isolateProperties.UIException('No dialog at all');
$.CTC39 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(safari)[ /]([\\w.]+)');
$.CTC26 = Isolate.makeConstantList([3, 3]);
$.CTC61 = new Isolate.$isolateProperties.IllegalArgumentException('Allow only one view');
$.CTC27 = Isolate.makeConstantList(['north start', 'north center', 'north end', 'south start', 'south center', 'south end', 'west start', 'west center', 'west end', 'east start', 'east center', 'east end', 'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right']);
$.CTC69 = new Isolate.$isolateProperties.Object();
$.CTC28 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC27, {'north start': Isolate.$isolateProperties.CTC6, 'north center': Isolate.$isolateProperties.CTC7, 'north end': Isolate.$isolateProperties.CTC8, 'south start': Isolate.$isolateProperties.CTC9, 'south center': Isolate.$isolateProperties.CTC10, 'south end': Isolate.$isolateProperties.CTC11, 'west start': Isolate.$isolateProperties.CTC12, 'west center': Isolate.$isolateProperties.CTC13, 'west end': Isolate.$isolateProperties.CTC14, 'east start': Isolate.$isolateProperties.CTC15, 'east center': Isolate.$isolateProperties.CTC16, 'east end': Isolate.$isolateProperties.CTC17, 'top left': Isolate.$isolateProperties.CTC18, 'top center': Isolate.$isolateProperties.CTC19, 'top right': Isolate.$isolateProperties.CTC20, 'center left': Isolate.$isolateProperties.CTC21, 'center center': Isolate.$isolateProperties.CTC22, 'center right': Isolate.$isolateProperties.CTC23, 'bottom left': Isolate.$isolateProperties.CTC24, 'bottom center': Isolate.$isolateProperties.CTC25, 'bottom right': Isolate.$isolateProperties.CTC26}, 21);
$.CTC37 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(webkit)[ /]([\\w.]+)');
$.CTC65 = Isolate.makeConstantList(['left', 'top', 'right', 'bottom', 'width', 'height', 'display']);
$.CTC29 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC63 = new Isolate.$isolateProperties.UIException('The anchor can\'t be itself.');
$.CTC33 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC1, {}, 0);
$.CTC2 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC1, null);
$.CTC4 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC5 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC0 = new Isolate.$isolateProperties.UIException('run() called twice?');
$.CTC36 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'os[ /]([\\w_]+) like mac os');
$.CTC45 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC41 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(mozilla)(?:.*? rv:([\\w.]+))?');
$.CTC50 = Isolate.makeConstantList(['body', 'head', 'caption', 'td', 'colgroup', 'col', 'tr', 'tbody', 'tfoot', 'thead', 'track']);
$.CTC32 = new Isolate.$isolateProperties._AnchorOfRoot();
$.CTC48 = new Isolate.$isolateProperties._AnchorOfPoint();
$.CTC = new Isolate.$isolateProperties.UIException('Only one activity is allowed');
$.CTC40 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(msie) ([\\w.]+)');
$.CTC46 = new Isolate.$isolateProperties.NotImplementedException(null);
$.CTC68 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC38 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(chrome)[ /]([\\w.]+)');
$.CTC47 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC42 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC31 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\w+)');
$.CTC57 = Isolate.makeConstantList(['blur', 'click', 'focus', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'mouseWheel', 'scroll']);
$.CTC35 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'android[ /]([\\w.]+)');
$.CTC66 = new Isolate.$isolateProperties._EmptyColl();
$.CTC67 = new Isolate.$isolateProperties._EmptyIter();
$.CTC58 = new Isolate.$isolateProperties.UnsupportedOperationException('Not IdSpace');
$.CTC51 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC50, {'body': 'html', 'head': 'html', 'caption': 'table', 'td': 'tr', 'colgroup': 'table', 'col': 'colgroup', 'tr': 'tbody', 'tbody': 'table', 'tfoot': 'table', 'thead': 'table', 'track': 'audio'}, 11);
$.CTC64 = Isolate.makeConstantList(['animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backface-visibility', 'background-composite', 'border-after', 'border-after-color', 'border-after-style', 'border-after-width', 'border-before', 'border-before-color', 'border-before-style', 'border-before-width', 'border-end', 'border-end-color', 'border-end-style', 'border-end-width', 'border-fit', 'border-horizontal-spacing', 'border-start', 'border-start-color', 'border-start-style', 'border-start-width', 'border-vertical-spacing', 'box-align', 'box-direction', 'box-flex', 'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-reflect', 'color-correction', 'column-break-after', 'column-break-before', 'column-break-inside', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'filter', 'flex-align', 'flex-flow', 'flex-order', 'flex-pack', 'flow-from', 'flow-into', 'font-feature-settings', 'font-size-delta', 'font-smoothing', 'highlight', 'hyphenate-character', 'hyphenate-limit-after', 'hyphenate-limit-before', 'hyphenate-limit-lines', 'hyphens', 'line-box-contain', 'line-break', 'line-clamp', 'locale', 'logical-height', 'logical-width', 'margin-after', 'margin-after-collapse', 'margin-before', 'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse', 'margin-end', 'margin-start', 'margin-top-collapse', 'marquee', 'marquee-direction', 'marquee-increment', 'marquee-repetition', 'marquee-speed', 'marquee-style', 'mask', 'mask-attachment', 'mask-box-image', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice', 'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-position', 'mask-position-x', 'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size', 'match-nearest-mail-blockquote-color', 'max-logical-height', 'max-logical-width', 'min-logical-height', 'min-logical-width', 'nbsp-mode', 'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective', 'perspective-origin', 'perspective-origin-x', 'perspective-origin-y', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-overflow', 'rtl-ordering', 'tap-highlight-color', 'text-combine', 'text-decorations-in-effect', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-fill-color', 'text-orientation', 'text-security', 'text-size-adjust', 'text-stroke', 'text-stroke-color', 'text-stroke-width', 'transform', 'transform-origin', 'transform-origin-x', 'transform-origin-y', 'transform-origin-z', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'user-drag', 'user-modify', 'user-select', 'wrap-shape', 'writing-mode']);
$.CTC55 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC56 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC1, Isolate.$isolateProperties.CTC55, Isolate.$isolateProperties.CTC55, Isolate.$isolateProperties.CTC55, Isolate.$isolateProperties.CTC55);
$.CTC60 = new Isolate.$isolateProperties.IllegalArgumentException('null');
$.CTC59 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot modify');
$._pendingRequests = null;
$.StringUtil__CC_a = null;
$._$anchorXHandlers = null;
$.View__afters = null;
$.CSS__nsnms = null;
$._getTypeNameOf = null;
$._cachedBrowserPrefix = null;
$.View__mntCnt = 0;
$._firstMeasurementRequest = true;
$.StringUtil__CC_z = null;
$._ViewImpl__domEvtDisps = null;
$._broadcaster = null;
$.StringUtil__CC_Z = null;
$.CSS_prefix = null;
$.CSSStyleDeclarationImpl__illnms = null;
$.browser = null;
$.StringUtil__CC_0 = null;
$.StringUtil__CC_A = null;
$._$anchorYHandlers = null;
$.activity = null;
$._nextMeasurementFrameScheduled = false;
$._pendingMeasurementFrameCallbacks = null;
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
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'is$Window', function() { return false; });
$.defineProperty(Object.prototype, 'is$JavaScriptIndexingBehavior', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'is$Location', function() { return false; });
$.defineProperty(Object.prototype, 'is$UIEvent', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type=", "target=", "name="], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimation', ["name?"], {
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', ["width=", "name=", "height=", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', ["target="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
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

$.$defineNativeClass('AudioParam', ["value=", "name?"], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', ["target="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?", "size?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type=", "name="], {
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

$.$defineNativeClass('CSSRule', ["type?", "cssText="], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?", "cssText="], {
 get$zIndex: function() {
  return this.getPropertyValue$1('z-index');
 },
 set$width: function(value) {
  this.setProperty$3('width', value, '');
 },
 get$width: function() {
  return this.getPropertyValue$1('width');
 },
 set$whiteSpace: function(value) {
  this.setProperty$3('white-space', value, '');
 },
 get$whiteSpace: function() {
  return this.getPropertyValue$1('white-space');
 },
 set$transform: function(value) {
  this.setProperty$3($.S($._browserPrefix()) + 'transform', value, '');
 },
 get$transform: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'transform');
 },
 set$top: function(value) {
  this.setProperty$3('top', value, '');
 },
 get$top: function() {
  return this.getPropertyValue$1('top');
 },
 get$size: function() {
  return this.getPropertyValue$1('size');
 },
 get$right: function() {
  return this.getPropertyValue$1('right');
 },
 get$resize: function() {
  return this.getPropertyValue$1('resize');
 },
 set$position: function(value) {
  this.setProperty$3('position', value, '');
 },
 get$position: function() {
  return this.getPropertyValue$1('position');
 },
 set$overflow: function(value) {
  this.setProperty$3('overflow', value, '');
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
 set$left: function(value) {
  this.setProperty$3('left', value, '');
 },
 get$left: function() {
  return this.getPropertyValue$1('left');
 },
 set$height: function(value) {
  this.setProperty$3('height', value, '');
 },
 get$height: function() {
  return this.getPropertyValue$1('height');
 },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 set$direction: function(value) {
  this.setProperty$3('direction', value, '');
 },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 get$bottom: function() {
  return this.getPropertyValue$1('bottom');
 },
 get$borderWidth: function() {
  return this.getPropertyValue$1('border-width');
 },
 set$border: function(value) {
  this.setProperty$3('border', value, '');
 },
 set$backgroundImage: function(value) {
  this.setProperty$3('background-image', value, '');
 },
 setProperty$3: function(propertyName, value, priority) {
  return this.setProperty(propertyName,value,priority);
 },
 setProperty$2: function(propertyName,value) {
  return this.setProperty(propertyName,value);
},
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSStyleRule', ["style?"], {
});

$.$defineNativeClass('CSSValue', ["cssText="], {
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', ["width=", "height="], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext', ["canvas?"], {
});

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!"], {
 transform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.transform(m11,m12,m21,m22,dx,dy);
 },
 get$transform: function() { return new $.BoundClosure1(this, 'transform$6'); },
 setTransform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.setTransform(m11,m12,m21,m22,dx,dy);
 },
 save$0: function() {
  return this.save();
 },
 restore$0: function() {
  return this.restore();
 },
 rect$4: function(x, y, width, height) {
  return this.rect(x,y,width,height);
 },
 quadraticCurveTo$4: function(cpx, cpy, x, y) {
  return this.quadraticCurveTo(cpx,cpy,x,y);
 },
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 lineTo$2: function(x, y) {
  return this.lineTo(x,y);
 },
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRect', ["width?", "top?", "right?", "left?", "height?", "bottom?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

$.$defineNativeClass('CompositionEvent', [], {
 is$UIEvent: function() { return true; }
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
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMError', ["name?"], {
});

$.$defineNativeClass('DOMException', ["name?", "message?"], {
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

$.$defineNativeClass('DOMPlugin', ["name?", "length?"], {
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
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$(this);
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

$.$defineNativeClass('HTMLDocument', ["title!", "body?"], {
 query$1: function(selectors) {
  if ($.CTC42.hasMatch$1(selectors) === true) return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 $dom_createElement$1: function(tagName) {
  return this.createElement(tagName);
 },
 createDocumentFragment$0: function() {
  return this.createDocumentFragment();
 },
 head$0: function() { return this.head.$call$0(); },
 get$on: function() {
  return $._DocumentEventsImpl$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$(this);
 },
 set$title: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Title can\'t be set for document fragments.'));
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('ID can\'t be set for document fragments.'));
 },
 click$0: function() {
 },
 get$click: function() { return new $.BoundClosure0(this, 'click$0'); },
 get$style: function() {
  return $._ElementFactoryProvider_Element$tag('div').get$style();
 },
 get$dataAttributes: function() {
  return $.CTC33;
 },
 get$classes: function() {
  var t1 = $.HashSetImplementation$();
  $.setRuntimeTypeInfo(t1, ({E: 'String'}));
  return t1;
 },
 get$attributes: function() {
  return $.CTC33;
 },
 get$parent: function() {
  return;
 },
 get$offsetParent: function() {
  return;
 },
 get$nextElementSibling: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 get$hidden: function() {
  return false;
 },
 get$rect: function() {
  var t1 = new $._DocumentFragmentImpl_rect_anon();
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
 insertAdjacentHTML$2: function(where, text) {
  this._insertAdjacentNode$2(where, $._DocumentFragmentFactoryProvider_DocumentFragment$html(text));
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
      throw $.captureStackTrace($.IllegalArgumentException$('Invalid position ' + $.S(where)));
  }
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListFactory_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  var t1 = this._elements;
  if (t1 == null) this._elements = $.FilteredElementList$(this);
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["style?", "offsetParent?", "nextElementSibling?", "title!", "innerHTML!", "id=", "hidden?"], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
 },
 $dom_hasAttribute$1: function(name) {
  return this.hasAttribute(name);
 },
 $dom_getClientRects$0: function() {
  return this.getClientRects();
 },
 $dom_getBoundingClientRect$0: function() {
  return this.getBoundingClientRect();
 },
 $dom_getAttribute$1: function(name) {
  return this.getAttribute(name);
 },
 get$$$dom_scrollWidth: function() {
  return this.scrollWidth;;
 },
 get$$$dom_scrollTop: function() {
  return this.scrollTop;;
 },
 get$$$dom_scrollLeft: function() {
  return this.scrollLeft;;
 },
 get$$$dom_scrollHeight: function() {
  return this.scrollHeight;;
 },
 get$$$dom_offsetWidth: function() {
  return this.offsetWidth;;
 },
 get$$$dom_offsetTop: function() {
  return this.offsetTop;;
 },
 get$$$dom_offsetLeft: function() {
  return this.offsetLeft;;
 },
 get$$$dom_offsetHeight: function() {
  return this.offsetHeight;;
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 get$$$dom_clientWidth: function() {
  return this.clientWidth;;
 },
 get$$$dom_clientTop: function() {
  return this.clientTop;;
 },
 get$$$dom_clientLeft: function() {
  return this.clientLeft;;
 },
 get$$$dom_clientHeight: function() {
  return this.clientHeight;;
 },
 insertAdjacentHTML$2: function(where, html) {
  return this.insertAdjacentHTML(where,html);
 },
 click$0: function() {
  return this.click();
 },
 get$click: function() { return new $.BoundClosure0(this, 'click$0'); },
 set$$$dom_className: function(value) {
  this.className = value;;
 },
 get$$$dom_className: function() {
  return this.className;;
 },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$rect: function() {
  var t1 = new $._ElementImpl_rect_anon(this);
  var t2 = $.CompleterImpl$();
  $.setRuntimeTypeInfo(t2, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t1, t2);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
 get$dataAttributes: function() {
  return $._DataAttributeMap$(this.get$attributes());
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 get$attributes: function() {
  return $._ElementAttributeMap$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "type=", "name=", "height=", "align?"], {
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
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
 },
 moveTo$2: function(parent$,name$) {
  return this.moveTo(parent$,name$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', ["name?"], {
 remove$0: function() {
  return this.remove();
 },
 moveTo$2: function(parent, name) {
  return this.moveTo(parent,name);
 }
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["type?", "timeStamp?", "target?"], {
 preventDefault$0: function() {
  return this.preventDefault();
 }
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name=", "lib$_FieldSetElementImpl$elements?"], {
 get$elements: function() {
  return this.lib$_FieldSetElementImpl$elements;
 },
 set$elements: function(x) {
  this.lib$_FieldSetElementImpl$elements = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', ["name?"], {
});

$.$defineNativeClass('FileException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'File'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriter', ["position?", "length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["position?", "length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'num'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["target=", "name=", "length?"], {
 reset$0: function() {
  return this.reset();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name=", "location=", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', ["width=", "size?", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
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

$.$defineNativeClass('IDBCursor', ["key?"], {
 source$1: function(arg0) { return this.source.$call$1(arg0); }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', ["name?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBIndex', ["name?"], {
});

$.$defineNativeClass('IDBObjectStore', ["name?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 source$1: function(arg0) { return this.source.$call$1(arg0); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', ["width=", "name=", "height=", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?", "width=", "name=", "height=", "border!", "align?"], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["width=", "value=", "type=", "size?", "pattern?", "name=", "height=", "align?"], {
 get$on: function() {
  return $._InputElementEventsImpl$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('KeyboardEvent', [], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('HTMLKeygenElement', ["type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type=", "target="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('LocalMediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
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

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height=", "direction!"], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'String'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
 source$1: function(arg0) { return this.source.$call$1(arg0); }
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$(this);
 }
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

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('MutationRecord', ["type?", "target?", "previousSibling?", "nextSibling?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 insertBefore$2: function(newChild, refChild) {
  return this.insertBefore(newChild,refChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 get$$$dom_attributes: function() {
  return this.attributes;;
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
 remove$0: function() {
  var t1 = this.get$parent();
  !(t1 == null) && this.get$parent().$dom_removeChild$1(this);
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?", "_parent!"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  !(result == null) && this._parent.$dom_removeChild$1(result);
  return result;
 },
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection); t1.hasNext$0() === true; ) {
    var t2 = t1.next$0();
    this._parent.$dom_appendChild$1(t2);
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Node'}));
  return t1;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type=", "start?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "type=", "name=", "height=", "border!", "align?"], {
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

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OverflowEvent', ["orient?"], {
});

$.$defineNativeClass('HTMLParagraphElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type=", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', ["width="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ProcessingInstruction', ["target?"], {
});

$.$defineNativeClass('HTMLProgressElement', ["value=", "position?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
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

$.$defineNativeClass('RangeException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('Rect', ["top?", "right?", "left?", "bottom?"], {
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', ["transform?", "target?"], {
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

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?", "offset?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 set$id: function(value) {
  this.id = value;;
 },
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$(this);
 },
 get$classes: function() {
  var t1 = this.get$_cssClassSet();
  t1 == null && this.set$_cssClassSet($._AttributeClassSet$(this.get$_ptr()));
  return this.get$_cssClassSet();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', ["previousSibling?", "nextSibling?", "lastChild?", "firstChild?"], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "width?", "height?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "width?", "height?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGForeignObjectElement', ["transform?", "y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', ["transform?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["transform?", "y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGMaskElement', ["y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
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

$.$defineNativeClass('SVGRect', ["y=", "x=", "width=", "height="], {
});

$.$defineNativeClass('SVGRectElement', ["transform?", "y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?", "width?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', ["offset?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type="], {
 set$title: function(value) {
  this.title = value;;
 },
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

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
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

$.$defineNativeClass('SVGUseElement', ["transform?", "y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGZoomEvent', [], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('Screen', ["width?", "height?"], {
});

$.$defineNativeClass('HTMLScriptElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ScriptProfile', [], {
 head$0: function() { return this.head.$call$0(); }
});

$.$defineNativeClass('ScriptProfileNode', [], {
 children$0: function() {
  return this.children();
 },
 get$children: function() { return new $.BoundClosure0(this, 'children$0'); }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "size?", "name=", "length="], {
 add$2: function(element, before) {
  return this.add(element,before);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["lib$_ShadowRootImpl$innerHTML!"], {
 get$innerHTML: function() {
  return this.lib$_ShadowRootImpl$innerHTML;
 },
 set$innerHTML: function(x) {
  this.lib$_ShadowRootImpl$innerHTML = x;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.BoundClosure0(this, 'start$0'); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  var t1 = this.$dom_key$1(0);
  return t1 == null;
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null) return;
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  this.containsKey$1(key) !== true && this.operator$indexSet$2(key, ifAbsent.$call$0());
  return this.operator$index$1(key);
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  var t1 = this.$dom_getItem$1(key);
  return !(t1 == null);
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
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'StyleSheet'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', ["width=", "height=", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', ["width=", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', ["width=", "border!", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', ["align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?", "name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextEvent', [], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('TextMetrics', ["width?"], {
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "size?", "position=", "id=", "align?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$(this);
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

$.$defineNativeClass('Touch', ["target?", "pageY?", "pageX?"], {
});

$.$defineNativeClass('TouchEvent', ["touches?"], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'Touch'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 previousSibling$0: function() {
  return this.previousSibling();
 },
 get$previousSibling: function() { return new $.BoundClosure0(this, 'previousSibling$0'); },
 nextSibling$0: function() {
  return this.nextSibling();
 },
 get$nextSibling: function() { return new $.BoundClosure0(this, 'nextSibling$0'); },
 lastChild$0: function() {
  return this.lastChild();
 },
 get$lastChild: function() { return new $.BoundClosure0(this, 'lastChild$0'); },
 firstChild$0: function() {
  return this.firstChild();
 },
 get$firstChild: function() { return new $.BoundClosure0(this, 'firstChild$0'); },
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["view?", "pageY?", "pageX?", "keyCode?"], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('HTMLUListElement', ["type="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
 },
 insertRange$3: function(start, rangeLength, initialValue) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot insertRange on immutable List.'));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
 },
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, ({T: 'int'}));
  return t1;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', ["width=", "height="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?", "size?", "name?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 flush$0: function() {
  return this.flush();
 }
});

$.$defineNativeClass('WebKitNamedFlow', ["name?"], {
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$(this);
 }
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('DOMWindow', ["parent?", "outerWidth?", "outerHeight?", "navigator?", "name=", "length?", "innerWidth?", "innerHeight?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$3: function(message, targetOrigin, messagePorts) {
  return this.postMessage(message,targetOrigin,messagePorts);
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage(message,targetOrigin);
},
 moveTo$2: function(x, y) {
  return this.moveTo(x,y);
 },
 $dom_getComputedStyle$2: function(element, pseudoElement) {
  return this.getComputedStyle(element,pseudoElement);
 },
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$(this);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 },
 set$_location: function(value) {
  this.location = value;
 },
 get$_location: function() {
  return this.location;
 },
 _set_location$1: function(value) {
  if (typeof value === 'object' && value !== null && !!value.is$_LocationWrapper) this.set$_location(value.get$_ptr());
  else this.set$_location(value);
 },
 _get_location$0: function() {
  var result = this.get$_location();
  if ($._WindowImpl__isDartLocation(result) === true) return result;
  var t1 = this._location_wrapper;
  if (null == t1) this._location_wrapper = $._LocationWrapper$(result);
  return this._location_wrapper;
 },
 set$location: function(value) {
  return this._set_location$1(value);
 },
 get$location: function() {
  return this._get_location$0();
 },
 get$top: function() {
  return $._DOMWindowCrossFrameImpl__createSafe(this.get$_top());
 },
 get$_top: function() {
  return this.top;;
 },
 is$Window: function() { return true; }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?", "location?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestProgressEvent', ["position?"], {
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$(this);
 }
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
 }
});

$.$defineNativeClass('IDBOpenDBRequest', [], {
 get$on: function() {
  return $._IDBOpenDBRequestEventsImpl$(this);
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 set$id: function(i) {
  this.id = i;;
 },
 get$id: function() {
  return this.id;;
 }
});

// 360 dynamic classes.
// 403 classes
// 36 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_CSSValueListImpl)*/ = 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v9/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v10/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v11/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v12/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var v13/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v14/*class(_NodeImpl)*/ = [v9/*class(_ElementImpl)*/,v10/*class(_DocumentFragmentImpl)*/,v11/*class(_DocumentImpl)*/,v12/*class(_CharacterDataImpl)*/,v9/*class(_ElementImpl)*/,v10/*class(_DocumentFragmentImpl)*/,v11/*class(_DocumentImpl)*/,v12/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v15/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream|LocalMediaStream';
  var v16/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBOpenDBRequest|IDBVersionChangeRequest|IDBOpenDBRequest|IDBVersionChangeRequest';
  var v17/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet|CSSStyleSheet'],
    ['UIEvent', v8/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AbstractWorker', v17/*class(_AbstractWorkerImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', v13/*class(_WorkerContextImpl)*/],
    ['Blob', 'Blob|File|File'],
    ['CSSRule', 'CSSRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', v1/*class(_CSSValueListImpl)*/],
    ['CSSValue', [v1/*class(_CSSValueListImpl)*/,v1/*class(_CSSValueListImpl)*/,'CSSValue|SVGColor|SVGPaint|SVGPaint|CSSPrimitiveValue|SVGColor|SVGPaint|SVGPaint|CSSPrimitiveValue'].join('|')],
    ['CanvasRenderingContext', 'CanvasRenderingContext|WebGLRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|CanvasRenderingContext2D'],
    ['CharacterData', v12/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v11/*class(_DocumentImpl)*/],
    ['DocumentFragment', v10/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v9/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v8/*class(_UIEventImpl)*/,v8/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechRecognitionError|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v14/*class(_NodeImpl)*/],
    ['MediaStream', v15/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v16/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v13/*class(_WorkerContextImpl)*/,v14/*class(_NodeImpl)*/,v15/*class(_MediaStreamImpl)*/,v16/*class(_IDBRequestImpl)*/,v17/*class(_AbstractWorkerImpl)*/,v13/*class(_WorkerContextImpl)*/,v14/*class(_NodeImpl)*/,v15/*class(_MediaStreamImpl)*/,v16/*class(_IDBRequestImpl)*/,v17/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
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
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
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
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var collected in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, collected)) {
      var desc = collectedClasses[collected];
      Isolate.$defineClass(collected, desc.super, desc[''], desc);
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
    if (prototype.__proto__) {
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
