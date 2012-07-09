function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("FutureImpl", "Object", ["_exceptionHandlers", "_lib7_listeners", "_exceptionHandled", "_exception", "_value", "_isComplete"], {
 transform$1: function(transformation) {
  var t0 = ({});
  t0.transformation_1 = transformation;
  var completer = $.CompleterImpl$0();
  this.handleException$1(new $.Closure89(completer));
  this.then$1(new $.Closure90(completer, t0));
  return completer.get$future();
 },
 get$transform: function() { return new $.Closure93(this); },
 _setException$1: function(exception) {
  if (exception === (void 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1((void 0)));
  }
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  }
  this._exception = exception;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  }
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  if (!(this._exception === (void 0))) {
    for (var t0 = $.iterator(this._exceptionHandlers); t0.hasNext$0() === true; ) {
      if ($.eqB(t0.next$0().$call$1(this._exception), true)) {
        this._exceptionHandled = true;
        break;
      }
    }
  }
  if (this.get$hasValue() === true) {
    for (var t1 = $.iterator(this._lib7_listeners); t1.hasNext$0() === true; ) {
      t1.next$0().$call$1(this.get$value());
    }
  } else {
    if (this._exceptionHandled !== true && $.gtB($.get$length(this._lib7_listeners), 0)) {
      throw $.captureStackTrace(this._exception);
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) {
    return;
  }
  if (this._isComplete === true) {
    if (!$.eqNullB(this._exception)) {
      this._exceptionHandled = onException.$call$1(this._exception);
    }
  } else {
    $.add$1(this._exceptionHandlers, onException);
  }
 },
 then$1: function(onComplete) {
  if (this.get$hasValue() === true) {
    onComplete.$call$1(this.get$value());
  } else {
    if (this.get$isComplete() !== true) {
      $.add$1(this._lib7_listeners, onComplete);
    } else {
      if (this._exceptionHandled !== true) {
        throw $.captureStackTrace(this._exception);
      }
    }
  }
 },
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception === (void 0);
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$exception: function() {
  if (this.get$isComplete() !== true) {
    throw $.captureStackTrace($.FutureNotCompleteException$0());
  }
  return this._exception;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) {
    throw $.captureStackTrace($.FutureNotCompleteException$0());
  }
  if (!(this._exception === (void 0))) {
    throw $.captureStackTrace(this._exception);
  }
  return this._value;
 }
});

Isolate.$defineClass("CompleterImpl", "Object", ["_futureImpl"], {
 completeException$1: function(exception) {
  this._futureImpl._setException$1(exception);
 },
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t0.list_1 = list;
  t0.i_2 = 0;
  this.forEach$1(new $.Closure24(t0));
  return t0.list_1;
 },
 getKeys$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t0.list_1 = list;
  t0.i_2 = 0;
  this.forEach$1(new $.Closure74(t0));
  return t0.list_1;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.forEach$1$bailout(f, 1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    var key = $.index(this._keys, i);
    if (!(key === (void 0)) && !(key === $.CTC3)) {
      f.$call$2(key, $.index(this._values, i));
    }
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        var key = $.index(this._keys, i);
        if (!(key === (void 0)) && !(key === $.CTC3)) {
          f.$call$2(key, $.index(this._values, i));
        }
        i = i + 1;
      }
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
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC3);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    return $.index(this._values, index);
  }
  var value = ifAbsent.$call$0();
  this.operator$indexSet$2(key, value);
  return value;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  if ($.index(this._keys, index) === (void 0) || $.index(this._keys, index) === $.CTC3) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number') return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      this._numberOfEntries = 0;
      this._numberOfDeleted = 0;
      var length$ = $.get$length(this._keys);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, length$)) break L0;
        $.indexSet(this._keys, i, (void 0));
        $.indexSet(this._values, i, (void 0));
        i = i + 1;
      }
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number') return this._grow$1$bailout(newCapacity, 1, capacity);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 3, capacity, oldKeys, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; i < capacity; i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    if (t2 === (void 0) || t2 === $.CTC3) {
      continue;
    }
    var t3 = oldValues.length;
    if (i < 0 || i >= t3) throw $.ioore(i);
    var t4 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t4);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      break;
    case 2:
      capacity = env0;
      oldKeys = env1;
      break;
    case 3:
      capacity = env0;
      oldKeys = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          if (key === (void 0) || key === $.CTC3) {
            break c$0;
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
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
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var numberOfProbes0 = numberOfProbes;
    var hash0 = hash;
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    }
    var numberOfProbes1 = numberOfProbes + 1;
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var numberOfProbes0 = numberOfProbes;
    var hash1 = hash0;
    var insertionIndex0 = insertionIndex;
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        insertionIndex0 = insertionIndex;
        if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) {
          insertionIndex0 = hash0;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    numberOfProbes0 = numberOfProbes1;
    hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var numberOfProbes0 = numberOfProbes;
        var hash1 = hash0;
        var insertionIndex0 = insertionIndex;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            insertionIndex0 = insertionIndex;
            if ($.ltB(insertionIndex, 0) && $.CTC3 === existingKey) {
              insertionIndex0 = hash0;
            }
            var numberOfProbes1 = numberOfProbes + 1;
          }
        }
        var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        numberOfProbes0 = numberOfProbes1;
        hash1 = hash2;
        numberOfProbes = numberOfProbes0;
        hash0 = hash1;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._backingMap, new $.Closure20(t0));
  return t0.result_2;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure3(t0));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure18(this));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) {
    return false;
  }
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  if (typeof length$ !== 'number') return this._advance$0$bailout(1, length$);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    }
    entry = $.index(this._entries, this._nextValidIndex);
  } while (entry === (void 0) || entry === $.CTC3);
 },
 _advance$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      length$ = env0;
      break;
  }
  switch (state) {
    case 0:
      var length$ = $.get$length(this._entries);
    case 1:
      state = 0;
      var entry = (void 0);
      L0: while (true) {
        var t0 = $.add(this._nextValidIndex, 1);
        this._nextValidIndex = t0;
        if ($.geB(t0, length$)) {
          break;
        }
        entry = $.index(this._entries, this._nextValidIndex);
        if (!(entry === (void 0) || entry === $.CTC3)) break L0;
      }
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC4);
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC3) {
    this._advance$0();
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("KeyValuePair", "Object", ["value=", "key?"], {
});

Isolate.$defineClass("LinkedHashMapImplementation", "Object", ["_map", "_list"], {
 toString$0: function() {
  return $.mapToString(this);
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
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._list, new $.Closure5(t0));
 },
 getValues$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t0.list_1 = list;
  t0.index_2 = 0;
  $.forEach(this._list, new $.Closure25(t0));
  $.assert($.eq(t0.index_2, $.get$length(this)));
  return t0.list_1;
 },
 getKeys$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t0.list_1 = list;
  t0.index_2 = 0;
  $.forEach(this._list, new $.Closure75(t0));
  $.assert($.eq(t0.index_2, $.get$length(this)));
  return t0.list_1;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  var value = this.operator$index$1(key);
  var value0 = value;
  if (this.operator$index$1(key) === (void 0) && this.containsKey$1(key) !== true) {
    var value1 = ifAbsent.$call$0();
    this.operator$indexSet$2(key, value1);
    value0 = value1;
  }
  return value0;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry === (void 0)) {
    return;
  }
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry === (void 0)) {
    return;
  }
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    $.index(this._map, key).get$element().set$value(value);
  } else {
    $.addLast(this._list, $.KeyValuePair$2(key, value));
    $.indexSet(this._map, key, this._list.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t0 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t0, ({E: 'KeyValuePair<K, V>'}));
  this._list = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("DoubleLinkedQueueEntry", "Object", ["_element?", "_next=", "_previous="], {
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
  var t0 = this._next;
  this._previous.set$_next(t0);
  var t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._element;
 },
 prepend$1: function(e) {
  var t0 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  t0._link$2(this._previous, this);
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
});

Isolate.$defineClass("_DoubleLinkedQueueEntrySentinel", "DoubleLinkedQueueEntry", ["_element", "_next", "_previous"], {
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
});

Isolate.$defineClass("DoubleLinkedQueue", "Object", ["_sentinel"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var entry0 = entry;
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_element()) === true) {
      other.addLast$1(entry.get$_element());
    }
    entry0 = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var entry0 = entry;
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_element());
    entry0 = nextEntry;
  }
 },
 clear$0: function() {
  var t0 = this._sentinel;
  this._sentinel.set$_next(t0);
  var t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t0 = ({});
  t0.counter_1 = 0;
  this.forEach$1(new $.Closure4(t0));
  return t0.counter_1;
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
 get$first: function() { return new $.Closure95(this); },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t0 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  this._sentinel = t0;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_DoubleLinkedQueueIterator", "Object", ["_currentEntry", "_sentinel"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC4);
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str === (void 0) || $.isEmpty(str) === true) {
    return this;
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_lib7_end", "_lib7_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 },
 start$0: function() {
  return this._lib7_start;
 },
 get$start: function() { return new $.Closure96(this); }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next=", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC4);
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("TimeZoneImplementation", "Object", ["isUtc?"], {
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$TimeZoneImplementation)) {
    return false;
  }
  return $.eq(this.isUtc, other.isUtc);
 },
 is$TimeZoneImplementation: true
});

Isolate.$defineClass("DateImplementation", "Object", ["timeZone?", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.timeZone);
 },
 toString$0: function() {
  var t0 = new $.Closure14();
  var t1 = new $.Closure15();
  var t2 = new $.Closure16();
  var y = t0.$call$1(this.get$year());
  var m = t2.$call$1(this.get$month());
  var d = t2.$call$1(this.get$day());
  var h = t2.$call$1(this.get$hours());
  var min = t2.$call$1(this.get$minutes());
  var sec = t2.$call$1(this.get$seconds());
  var ms = t1.$call$1(this.get$milliseconds());
  if (this.timeZone.get$isUtc() === true) {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms) + 'Z';
  } else {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms);
  }
 },
 isUtc$0: function() {
  return this.timeZone.get$isUtc();
 },
 get$isUtc: function() { return new $.Closure97(this); },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 compareTo$1: function(other) {
  return $.compareTo(this.value, other.get$value());
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$le$1: function(other) {
  return $.le(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  }
  return $.eqB(this.value, other.value) && $.eqB(this.timeZone, other.timeZone);
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("Closure94", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("ConstantMap", "Object", ["_lib5_keys?", "_jsObject", "length?"], {
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
  throw $.captureStackTrace($.CTC12);
 },
 toString$0: function() {
  return $.mapToString(this);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 getValues$0: function() {
  var t0 = ({});
  t0.result_1 = [];
  $.forEach(this._lib5_keys, new $.Closure26(this, t0));
  return t0.result_1;
 },
 getKeys$0: function() {
  return this._lib5_keys;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._lib5_keys, new $.Closure17(this, t0));
 },
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true) {
    return;
  }
  return $.jsPropertyAccess(this._jsObject, key);
 },
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__')) {
    return false;
  }
  return $.jsHasOwnProperty(this._jsObject, key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 },
 start$0: function() {
  return this._start;
 },
 get$start: function() { return new $.Closure98(this); }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("IllegalAccessException", "Object", [], {
 toString$0: function() {
  return 'Attempt to modify an immutable object';
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("BadNumberFormatException", "Object", ["_s"], {
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.stringToString(this._s) + '\'';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("EmptyQueueException", "Object", [], {
 toString$0: function() {
  return 'EmptyQueueException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("NotImplementedException", "Object", [], {
 toString$0: function() {
  return 'NotImplementedException';
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("FutureNotCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
});

Isolate.$defineClass("FutureAlreadyCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future already completed';
 }
});

Isolate.$defineClass("SnakeCanvas", "Activity", ["right?", "left=", "down", "up", "canvas", "ctx2d?", "_score", "scoreBar", "environment?", "lastCycle=", "width?", "height?", "UPDATE?", "_dlgInfos", "_mainView", "_title"], {
 onKeyDown$1: function(event$) {
  if ($.eqB(event$.get$keyCode(), 37)) {
    this.environment.get$snake().set$direction(-1);
  } else {
    if ($.eqB(event$.get$keyCode(), 39)) {
      this.environment.get$snake().set$direction(1);
    } else {
      if ($.eqB(event$.get$keyCode(), 38)) {
        this.environment.get$snake().set$direction(-2);
      } else {
        if ($.eqB(event$.get$keyCode(), 40)) {
          this.environment.get$snake().set$direction(2);
        }
      }
    }
  }
 },
 get$onKeyDown: function() { return new $.Closure99(this); },
 onMount_$0: function() {
  this.ctx2d = this.canvas.get$context2D();
  var t0 = this.canvas.get$node();
  var t1 = this._gestureMove$0();
  $._DragGesture(t0, (void 0), false, (void 0), -1, (void 0), this._gestureEnd$0(), t1);
  $.add$1($.document().get$on().get$keyDown(), this.get$onKeyDown());
  $._Animator$0().add$1(new $.Closure77(this));
 },
 _gestureEnd$0: function() {
  return new $.Closure79();
 },
 _gestureMove$0: function() {
  return new $.Closure86(this);
 },
 onCreate_$0: function() {
  this.set$title('Circles');
  this.environment = $.SnakeEnvironment$2(this.height, this.width);
  this.get$mainView().get$profile().set$height('396');
  this.get$mainView().get$profile().set$width('572');
  var div = $.View$0();
  div.get$style().set$backgroundImage('url(\'./res/snake_bg.png\')');
  div.get$profile().set$width('flex');
  div.get$profile().set$height('flex');
  var vlayout = $.View$0();
  vlayout.get$layout().set$type('linear');
  vlayout.get$layout().set$orient('vertical');
  vlayout.get$profile().set$width('flex');
  vlayout.get$profile().set$height('flex');
  vlayout.set$top(60);
  vlayout.set$left(80);
  this.canvas = $.Canvas$0();
  var t0 = 'width: ' + $.stringToString(this.width) + '; height: ' + $.stringToString(this.height);
  this.canvas.get$profile().set$text(t0);
  this.canvas.get$style().set$border('1px solid black');
  vlayout.addChild$1(this.canvas);
  this.scoreBar = $.TextView$1('Your score is: ' + $.stringToString(this.get$score()));
  this.scoreBar.get$profile().set$width('flex');
  this.scoreBar.get$profile().set$height('30');
  vlayout.addChild$1(this.scoreBar);
  div.addChild$1(vlayout);
  this.get$mainView().addChild$1(div);
 },
 set$score: function(score) {
  this._score = score;
  var t0 = 'Your score is: ' + $.stringToString(score);
  this.scoreBar.set$text(t0);
 },
 get$score: function() {
  return this._score;
 }
});

Isolate.$defineClass("SnakePoint", "Object", ["y=", "x="], {
 toString$0: function() {
  return '(' + $.stringToString(this.x) + ', ' + $.stringToString(this.y) + ')';
 }
});

Isolate.$defineClass("SnakeEnvironment", "Object", ["food", "snake?", "width=", "height="], {
 draw$1: function(context) {
  this.food.draw$1(context);
  var grown = this.snake.act$2(context, this.food);
  var head = this.snake.head$0();
  if ($.geB(head.get$x(), this.width) || $.ltB(head.get$x(), 0) || ($.geB(head.get$y(), this.height) || $.ltB(head.get$y(), 0))) {
    return 1;
  }
  if (grown === true) {
    this.food.relocate$1(this.snake.get$body());
    return 0;
  }
  return 2;
 },
 SnakeEnvironment$2: function(height, width) {
  var t0 = $.eqB($.mod(this.height, 10), 0);
  var t1 = !t0;
  if (t0) {
    t1 = !$.eqB($.mod(this.width, 10), 0);
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1('Height & Width must be divisble by the adjustment (' + $.stringToString(10) + ') without a remainder'));
  }
  this.snake = $.Snake$1(this);
  this.food = $.Food$1(this);
  this.food.relocate$1(this.snake.get$body());
 }
});

Isolate.$defineClass("Food", "Object", ["snakeEnvironment", "redraw", "_y", "_x"], {
 toString$0: function() {
  return '' + $.stringToString(this._x) + ', ' + $.stringToString(this._y);
 },
 draw$1: function(context) {
  context.beginPath$0();
  context.set$fillStyle('black');
  context.rect$4($.add(this._x, 3.3333333333333335), this._y, 3.3333333333333335, 3.3333333333333335);
  context.rect$4(this._x, $.add(this._y, 3.3333333333333335), 3.3333333333333335, 3.3333333333333335);
  context.rect$4($.add(this._x, 6.666666666666667), $.add(this._y, 3.3333333333333335), 3.3333333333333335, 3.3333333333333335);
  context.rect$4($.add(this._x, 3.3333333333333335), $.add(this._y, 6.666666666666667), 3.3333333333333335, 3.3333333333333335);
  context.closePath$0();
  context.fill$0();
 },
 relocate$1: function(avoid) {
  var suggestedX = $.mul($.random(), $.sub($.div(this.snakeEnvironment.get$width(), 10), 1));
  var suggestedY = $.mul($.random(), $.sub($.div(this.snakeEnvironment.get$height(), 10), 1));
  var suggestedX0 = $.mul($.floor(suggestedX), 10);
  if (typeof suggestedX0 !== 'number') return this.relocate$1$bailout(avoid, 1, suggestedY, suggestedX0);
  var suggestedY0 = $.mul($.floor(suggestedY), 10);
  if (typeof suggestedY0 !== 'number') return this.relocate$1$bailout(avoid, 2, suggestedX0, suggestedY0);
  for (var t0 = $.iterator(avoid); has = false, t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (suggestedX0 === t1.get$x() && suggestedY0 === t1.get$y()) {
      has = true;
      break;
    }
  }
  if (has) {
    this.relocate$1(avoid);
  } else {
    this.set$x($.toInt(suggestedX0));
    this.set$y($.toInt(suggestedY0));
  }
  var has;
 },
 relocate$1$bailout: function(avoid, state, env0, env1) {
  switch (state) {
    case 1:
      suggestedY = env0;
      suggestedX0 = env1;
      break;
    case 2:
      suggestedX0 = env0;
      suggestedY0 = env1;
      break;
  }
  switch (state) {
    case 0:
      var suggestedX = $.mul($.random(), $.sub($.div(this.snakeEnvironment.get$width(), 10), 1));
      var suggestedY = $.mul($.random(), $.sub($.div(this.snakeEnvironment.get$height(), 10), 1));
      var suggestedX0 = $.mul($.floor(suggestedX), 10);
    case 1:
      state = 0;
      var suggestedY0 = $.mul($.floor(suggestedY), 10);
    case 2:
      state = 0;
      var t0 = $.iterator(avoid);
      L0: while (true) {
        var has = false;
        if (!(t0.hasNext$0() === true)) break L0;
        var t1 = t0.next$0();
        if ($.eqB(suggestedX0, t1.get$x()) && $.eqB(suggestedY0, t1.get$y())) {
          has = true;
          break;
        }
      }
      if (has) {
        this.relocate$1(avoid);
      } else {
        this.set$x($.toInt(suggestedX0));
        this.set$y($.toInt(suggestedY0));
      }
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
});

Isolate.$defineClass("Snake", "Object", ["snakeEnvironment", "initial", "body?", "_direction"], {
 drawSnake$3: function(context, point, removed) {
  context.beginPath$0();
  context.set$fillStyle('black');
  if (!$.eqNullB(removed)) {
    context.clearRect$4(removed.get$x(), removed.get$y(), 10, 10);
  }
  context.beginPath$0();
  context.moveTo$2($.add(point.get$x(), 3.3333333333333335), point.get$y());
  context.lineTo$2($.sub($.add(point.get$x(), 10), 3.3333333333333335), point.get$y());
  context.quadraticCurveTo$4($.add(point.get$x(), 10), point.get$y(), $.add(point.get$x(), 10), $.add(point.get$y(), 3.3333333333333335));
  context.lineTo$2($.add(point.get$x(), 10), $.sub($.add(point.get$y(), 10), 3.3333333333333335));
  context.quadraticCurveTo$4($.add(point.get$x(), 10), $.add(point.get$y(), 10), $.sub($.add(point.get$x(), 10), 3.3333333333333335), $.add(point.get$y(), 10));
  context.lineTo$2($.add(point.get$x(), 3.3333333333333335), $.add(point.get$y(), 10));
  context.quadraticCurveTo$4(point.get$x(), $.add(point.get$y(), 10), point.get$x(), $.sub($.add(point.get$y(), 10), 3.3333333333333335));
  context.lineTo$2(point.get$x(), $.add(point.get$y(), 3.3333333333333335));
  context.quadraticCurveTo$4(point.get$x(), point.get$y(), $.add(point.get$x(), 3.3333333333333335), point.get$y());
  context.closePath$0();
  context.fill$0();
 },
 draw$2: function(context, removed) {
  this.drawSnake$3(context, $.last(this.body), removed);
 },
 act$2: function(context, food) {
  var t0 = ({});
  t0.context_1 = context;
  if (this.initial === true) {
    $.forEach(this.body, new $.Closure92(this, t0));
    this.initial = false;
    return false;
  }
  var moveTo$ = this.nextMove$0();
  var grow = $.eqB(moveTo$.get$x(), food.get$x()) && $.eqB(moveTo$.get$y(), food.get$y());
  var removed = this.move$2(moveTo$, grow);
  this.draw$2(t0.context_1, removed);
  return grow;
 },
 move$2: function(to, grow) {
  var removed = (void 0);
  if (grow !== true) {
    var removed0 = $.index(this.body, 0);
    $.removeRange(this.body, 0, 1);
    removed = removed0;
  }
  $.add$1(this.body, to);
  return removed;
 },
 nextMove$0: function() {
  var snakeHead = $.SnakePoint$2(this.head$0().get$x(), this.head$0().get$y());
  $0:{
    var t0 = this._direction;
    if (-2 === t0) {
      snakeHead.y = $.sub(snakeHead.y, 10);
      break $0;
    } else {
      if (2 === t0) {
        snakeHead.y = $.add(snakeHead.y, 10);
        break $0;
      } else {
        if (-1 === t0) {
          snakeHead.x = $.sub(snakeHead.x, 10);
          break $0;
        } else {
          if (1 === t0) {
            snakeHead.x = $.add(snakeHead.x, 10);
            break $0;
          }
        }
      }
    }
  }
  return snakeHead;
 },
 head$0: function() {
  return $.last(this.body);
 },
 length$0: function() {
  return $.get$length(this.body);
 },
 get$length: function() { return new $.Closure100(this); },
 set$direction: function(value) {
  if (!$.eqB($.add(this._direction, value), 0)) {
    this._direction = value;
  }
 },
 Snake$1: function(snakeEnvironment) {
  this._direction = 1;
  this.body = [];
  for (var i = 0; i < 3; i = i + 1) {
    $.addLast(this.body, $.SnakePoint$2(i * 10, 0));
  }
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$touchStart: function() {
  return this._get$1('touchstart');
 },
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$touchEnd: function() {
  return this._get$1('touchend');
 },
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 }
});

Isolate.$defineClass("FilteredElementList", "Object", ["_childNodes", "_lib_node"], {
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
  return $.index(this.get$_filtered(), index);
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
  if (!$.eqNullB(result)) {
    result.remove$0();
  }
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure22());
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
 get$add: function() { return new $.Closure104(this); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) {
    return;
  } else {
    if ($.ltB(newLength, 0)) {
      throw $.captureStackTrace($.CTC14);
    }
  }
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t0 = $.iterator(this._childNodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (typeof t1 === 'object' && t1.is$Element()) {
      return t1;
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure19()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("EmptyElementRect", "Object", ["clientRects", "bounding", "scroll", "offset?", "client"], {
});

Isolate.$defineClass("_ChildrenElementList", "Object", ["_childElements", "_lib_element?"], {
 last$0: function() {
  return this._lib_element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._lib_element.$dom_removeChild$1(result);
  }
  return result;
 },
 clear$0: function() {
  this._lib_element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC57);
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._lib_element.$dom_appendChild$1(t1);
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
  throw $.captureStackTrace($.CTC13);
 },
 operator$indexSet$2: function(index, value) {
  this._lib_element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._lib_element.get$$$dom_firstElementChild());
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure21(t0, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t0 = $.iterator(this._childElements); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return this._lib_element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var output = $.List($.get$length(this._childElements));
  var len = $.get$length(this._childElements);
  if (typeof len !== 'number') return this._toList$0$bailout(1, output, len);
  var i = 0;
  for (; i < len; i = i + 1) {
    var t0 = $.index(this._childElements, i);
    var t1 = output.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    output[i] = t0;
  }
  return output;
 },
 _toList$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      output = env0;
      len = env1;
      break;
  }
  switch (state) {
    case 0:
      var output = $.List($.get$length(this._childElements));
      var len = $.get$length(this._childElements);
    case 1:
      state = 0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t0 = $.index(this._childElements, i);
        var t1 = output.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        output[i] = t0;
        i = i + 1;
      }
      return output;
  }
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementList", "Object", ["_nodeList"], {
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC13);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.CTC13);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC13);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC13);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC13);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC13);
 },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      out.add$1(t1);
    }
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementListIterator", "Object", ["_lib_index", "_lib_list"], {
 hasNext$0: function() {
  return $.lt(this._lib_index, $.get$length(this._lib_list));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC4);
  }
  var t0 = this._lib_list;
  var t1 = this._lib_index;
  this._lib_index = $.add(t1, 1);
  return $.index(t0, t1);
 }
});

Isolate.$defineClass("_ElementList", "_ListWrapper", ["_lib_list"], {
 getRange$2: function(start, rangeLength) {
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ElementAttributeMap", "Object", ["_lib_element?"], {
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._lib_element.get$$$dom_attributes());
 },
 getValues$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.getValues$0$bailout(1, attributes);
  var values = $.List(attributes.length);
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i].get$value();
    var t2 = values.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    values[i] = t1;
  }
  return values;
 },
 getValues$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._lib_element.get$$$dom_attributes();
    case 1:
      state = 0;
      var values = $.List($.get$length(attributes));
      $.setRuntimeTypeInfo(values, ({E: 'String'}));
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t0 = $.index(attributes, i).get$value();
        var t1 = values.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        values[i] = t0;
        i = i + 1;
      }
      return values;
  }
 },
 getKeys$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.getKeys$0$bailout(1, attributes);
  var keys = $.List(attributes.length);
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i].get$name();
    var t2 = keys.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    keys[i] = t1;
  }
  return keys;
 },
 getKeys$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._lib_element.get$$$dom_attributes();
    case 1:
      state = 0;
      var keys = $.List($.get$length(attributes));
      $.setRuntimeTypeInfo(keys, ({E: 'String'}));
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t0 = $.index(attributes, i).get$name();
        var t1 = keys.length;
        if (i < 0 || i >= t1) throw $.ioore(i);
        keys[i] = t0;
        i = i + 1;
      }
      return keys;
  }
 },
 forEach$1: function(f) {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.forEach$1$bailout(f, 1, attributes);
  for (var len = attributes.length, i = 0; i < len; i = i + 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = attributes[i];
    f.$call$2(t1.get$name(), t1.get$value());
  }
 },
 forEach$1$bailout: function(f, state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._lib_element.get$$$dom_attributes();
    case 1:
      state = 0;
      var len = $.get$length(attributes);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var item = $.index(attributes, i);
        f.$call$2(item.get$name(), item.get$value());
        i = i + 1;
      }
  }
 },
 clear$0: function() {
  var attributes = this._lib_element.get$$$dom_attributes();
  if (typeof attributes !== 'string' && (typeof attributes !== 'object'||attributes.constructor !== Array)) return this.clear$0$bailout(1, attributes);
  for (var i = attributes.length - 1; i >= 0; i = i - 1) {
    var t0 = attributes.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    this.remove$1(attributes[i].get$name());
  }
 },
 clear$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      attributes = env0;
      break;
  }
  switch (state) {
    case 0:
      var attributes = this._lib_element.get$$$dom_attributes();
    case 1:
      state = 0;
      var i = $.sub($.get$length(attributes), 1);
      L0: while (true) {
        if (!$.geB(i, 0)) break L0;
        this.remove$1($.index(attributes, i).get$name());
        i = $.sub(i, 1);
      }
  }
 },
 remove$1: function(key) {
  var value = this._lib_element.$dom_getAttribute$1(key);
  this._lib_element.$dom_removeAttribute$1(key);
  return value;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  if (this.containsKey$1(key) !== true) {
    this.operator$indexSet$2(key, ifAbsent.$call$0());
  }
  return this.operator$index$1(key);
 },
 operator$indexSet$2: function(key, value) {
  this._lib_element.$dom_setAttribute$2(key, '' + $.stringToString(value));
 },
 operator$index$1: function(key) {
  return this._lib_element.$dom_getAttribute$1(key);
 },
 containsKey$1: function(key) {
  return this._lib_element.$dom_hasAttribute$1(key);
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("_DataAttributeMap", "Object", ["$$dom_attributes?"], {
 _strip$1: function(key) {
  return $.substring$1(key, 5);
 },
 _matches$1: function(key) {
  return $.startsWith(key, 'data-');
 },
 _attr$1: function(key) {
  return 'data-' + $.stringToString(key);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this.getKeys$0());
 },
 getValues$0: function() {
  var values = $.List((void 0));
  $.setRuntimeTypeInfo(values, ({E: 'String'}));
  $.forEach(this.$$dom_attributes, new $.Closure49(this, values));
  return values;
 },
 getKeys$0: function() {
  var keys = $.List((void 0));
  $.setRuntimeTypeInfo(keys, ({E: 'String'}));
  $.forEach(this.$$dom_attributes, new $.Closure47(this, keys));
  return keys;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this.$$dom_attributes, new $.Closure48(this, t0));
 },
 clear$0: function() {
  for (var t0 = $.iterator(this.getKeys$0()); t0.hasNext$0() === true; ) {
    this.remove$1(t0.next$0());
  }
 },
 remove$1: function(key) {
  return this.$$dom_attributes.remove$1(this._attr$1(key));
 },
 putIfAbsent$2: function(key, ifAbsent) {
  return this.$$dom_attributes.putIfAbsent$2(this._attr$1(key), ifAbsent);
 },
 operator$indexSet$2: function(key, value) {
  $.indexSet(this.$$dom_attributes, this._attr$1(key), '' + $.stringToString(value));
 },
 operator$index$1: function(key) {
  return $.index(this.$$dom_attributes, this._attr$1(key));
 },
 containsKey$1: function(key) {
  return this.$$dom_attributes.containsKey$1(this._attr$1(key));
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("_CssClassSet", "Object", ["_lib_element?"], {
 _formatSet$1: function(s) {
  return $.join($.List$from(s), ' ');
 },
 _write$1: function(s) {
  var t0 = this._formatSet$1(s);
  this._lib_element.set$$$dom_className(t0);
 },
 _classname$0: function() {
  return this._lib_element.get$$$dom_className();
 },
 _read$0: function() {
  var s = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(s, ({E: 'String'}));
  for (var t0 = $.iterator($.split(this._classname$0(), ' ')); t0.hasNext$0() === true; ) {
    var trimmed = $.trim(t0.next$0());
    if ($.isEmpty(trimmed) !== true) {
      s.add$1(trimmed);
    }
  }
  return s;
 },
 _modify$1: function(f) {
  var s = this._read$0();
  f.$call$1(s);
  this._write$1(s);
 },
 clear$0: function() {
  this._modify$1(new $.Closure60());
 },
 addAll$1: function(collection) {
  var t0 = ({});
  t0.collection_1 = collection;
  this._modify$1(new $.Closure59(t0));
 },
 remove$1: function(value) {
  var s = this._read$0();
  var result = s.remove$1(value);
  this._write$1(s);
  return result;
 },
 add$1: function(value) {
  var t0 = ({});
  t0.value_1 = value;
  this._modify$1(new $.Closure58(t0));
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
});

Isolate.$defineClass("_SimpleClientRect", "Object", ["height?", "width?", "top?", "left?"], {
 toString$0: function() {
  return '(' + $.stringToString(this.left) + ', ' + $.stringToString(this.top) + ', ' + $.stringToString(this.width) + ', ' + $.stringToString(this.height) + ')';
 },
 operator$eq$1: function(other) {
  return !(other === (void 0)) && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
 },
 get$bottom: function() {
  return $.add(this.top, this.height);
 },
 get$right: function() {
  return $.add(this.left, this.width);
 }
});

Isolate.$defineClass("_ElementRectImpl", "Object", ["_clientRects", "_boundingClientRect", "scroll", "offset?", "client"], {
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
 get$touchStart: function() {
  return this._get$1('touchstart');
 },
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$touchEnd: function() {
  return this._get$1('touchend');
 },
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 }
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr?"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_lib_type", "_ptr?"], {
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
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
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
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._this.$dom_appendChild$1(t1);
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
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 get$first: function() {
  return $.index(this._lib_list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
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
  return $.index(this._lib_list, index);
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
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_lib_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._lib_list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._lib_list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_AttributeClassSet", "_CssClassSet", ["_lib_element"], {
 _write$1: function(s) {
  $.indexSet(this._lib_element.get$attributes(), 'class', this._formatSet$1(s));
 },
 $dom_className$0: function() {
  return $.index(this._lib_element.get$attributes(), 'class');
 },
 get$$$dom_className: function() { return new $.Closure107(this); }
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 }
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$start: function() {
  return this._get$1('start');
 }
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$touchStart: function() {
  return this._get$1('touchstart');
 },
 get$touchMove: function() {
  return this._get$1('touchmove');
 },
 get$touchEnd: function() {
  return this._get$1('touchend');
 },
 get$mouseUp: function() {
  return this._get$1('mouseup');
 },
 get$mouseMove: function() {
  return this._get$1('mousemove');
 },
 get$mouseDown: function() {
  return this._get$1('mousedown');
 },
 get$message: function() {
  return this._get$1('message');
 },
 get$keyDown: function() {
  return this._get$1('keydown');
 }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MeasurementRequest", "Object", ["exception=", "value=", "completer?", "computeValue"], {
 computeValue$0: function() { return this.computeValue.$call$0(); }
});

Isolate.$defineClass("_DOMWindowCrossFrameImpl", "Object", ["_window"], {
 postMessage$3: function(message, targetOrigin, messagePorts) {
  if ($.eqNullB(messagePorts)) {
    this._window.postMessage$2(message, targetOrigin);
  } else {
    this._window.postMessage$3(message, targetOrigin, messagePorts);
  }
 },
 postMessage$2: function(message,targetOrigin) {
  return this.postMessage$3(message,targetOrigin,(void 0))
},
 get$top: function() {
  return $._createSafe(this._window.get$top());
 },
 get$parent: function() {
  return $._createSafe(this._window.get$parent());
 },
 get$length: function() {
  return $.get$length(this._window);
 },
 is$Window: function() { return true; }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC4);
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("Activity", "Object", ["_dlgInfos?", "_mainView?"], {
 onMount_$0: function() {
 },
 onCreate_$0: function() {
 },
 set$title: function(title) {
  if (!$.eqNullB(title)) {
    var t0 = title;
  } else {
    t0 = '';
  }
  this._title = t0;
  $.document().set$title(t0);
 },
 updateSize$0: function() {
  var caveNode = $.document().query$1('#v-main');
  if (!(caveNode === (void 0))) {
    var t0 = caveNode;
  } else {
    t0 = $.window();
  }
  var qcave = $.DOMQuery(t0);
  var t1 = qcave.get$innerWidth();
  $.browser.get$size().set$width(t1);
  var t2 = qcave.get$innerHeight();
  $.browser.get$size().set$height(t2);
  var t3 = !(this.get$mainView() === (void 0));
  var t4 = t3;
  if (t3) {
    var t5 = $.eqB(this.get$mainView().get$width(), $.browser.get$size().get$width());
    t4 = !t5;
    if (t5) {
      t4 = !$.eqB(this.get$mainView().get$height(), $.browser.get$size().get$height());
    }
  }
  if (t4) {
    var t6 = $.browser.get$size().get$width();
    this.get$mainView().set$width(t6);
    var t7 = $.browser.get$size().get$height();
    this.get$mainView().set$height(t7);
    this.get$mainView().requestLayout$0();
  }
 },
 _init$0: function() {
  var t0 = $.window().get$on();
  if ($.browser.get$mobile() === true || $.application().get$inSimulator() === true) {
    var t1 = 'deviceOrientation';
  } else {
    t1 = 'resize';
  }
  $.add$1($.index(t0, t1), new $.Closure67(this));
  var t2 = $.document().get$on();
  if ($.browser.get$touch() === true) {
    var t3 = 'touchStart';
  } else {
    t3 = 'mouseDown';
  }
  $.add$1($.index(t2, t3), new $.Closure68());
  var clses = $.document().get$body().get$classes();
  $.add$1(clses, 'rikulo');
  $.add$1(clses, $.browser.get$name());
  if ($.browser.get$ios() === true) {
    $.add$1(clses, 'ios');
  } else {
    if ($.browser.get$android() === true) {
      $.add$1(clses, 'android');
    }
  }
 },
 run$1: function(containerId) {
  var t0 = ({});
  t0.containerId_1 = containerId;
  if (!($.activity === (void 0))) {
    throw $.captureStackTrace($.CTC);
  }
  $.activity = this;
  this._init$0();
  if (this._mainView === (void 0)) {
    this._mainView = $.Section$0();
  }
  var t1 = $.browser.get$size().get$width();
  this._mainView.set$width(t1);
  var t2 = $.browser.get$size().get$height();
  this._mainView.set$height(t2);
  this._mainView.get$style().set$overflow('hidden');
  $.application()._ready$1(new $.Closure(this, t0));
 },
 run$0: function() {
  return this.run$1('v-main')
},
 _createDialog$2: function(dlgInfo, effect) {
  var parent$ = this._mainView.get$node().get$parent();
  dlgInfo.createMask$1(parent$);
  dlgInfo.get$dialog().addToDocument$1(parent$);
 },
 _createDialog$1: function(dlgInfo) {
  return this._createDialog$2(dlgInfo,(void 0))
},
 get$mainView: function() {
  return this._mainView;
 },
 Activity$0: function() {
  this._title = $.application().get$name();
 }
});

Isolate.$defineClass("Application", "Object", ["_lib2_uuid", "_readyCB", "inSimulator?", "name="], {
 toString$0: function() {
  return 'Application(' + $.stringToString(this.name) + ', ' + $.stringToString(this._lib2_uuid) + ')';
 },
 get$uuid: function() {
  if (this._lib2_uuid === (void 0)) {
    var body = $.document().get$body();
    if (body === (void 0)) {
      throw $.captureStackTrace($.CTC44);
    }
    var sval = body.$dom_getAttribute$1('data-rikuloAppCount');
    if (!(sval === (void 0))) {
      this._lib2_uuid = $.parseInt(sval);
      body.$dom_setAttribute$2('data-rikuloAppCount', $.toString($.add(this._lib2_uuid, 1)));
    } else {
      this._lib2_uuid = 0;
      body.$dom_setAttribute$2('data-rikuloAppCount', '1');
    }
  }
  return this._lib2_uuid;
 },
 onCreate_$0: function() {
 },
 _ready$1: function(then) {
  if (!(this._readyCB === (void 0))) {
    this._readyCB$1(then);
  } else {
    then.$call$0();
  }
 },
 _readyCB$1: function(arg0) { return this._readyCB.$call$1(arg0); },
 Application$1: function(name$) {
  this.name = name$;
  $._app = this;
  this.inSimulator = !($.document().query$1('#v-simulator') === (void 0));
  if ($.browser === (void 0)) {
    $.browser = $.Browser$0();
  }
  if ($.viewConfig === (void 0)) {
    $.viewConfig = $.ViewConfig$0();
  }
  if ($.eqNullB($.layoutManager)) {
    $.layoutManager = $.LayoutManager$0();
  }
  this.onCreate_$0();
 }
});

Isolate.$defineClass("SystemException", "Object", ["message?"], {
 toString$0: function() {
  return 'SystemException(' + $.stringToString(this.message) + ')';
 }
});

Isolate.$defineClass("_EmptyColl", "Object", [], {
 get$length: function() {
  return 0;
 },
 isEmpty$0: function() {
  return true;
 },
 filter$1: function(f) {
  return $.CTC41;
 },
 forEach$1: function(f) {
 },
 iterator$0: function() {
  return $.CTC42;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_EmptyIter", "Object", [], {
 hasNext$0: function() {
  return false;
 },
 next$0: function() {
  throw $.captureStackTrace($.CTC4);
 }
});

Isolate.$defineClass("_OnDemandMap", "Object", ["_lib6_map", "_creator"], {
 remove$1: function(key) {
  if (!(this._lib6_map === (void 0))) {
    var t0 = this._lib6_map.remove$1(key);
  } else {
    t0 = (void 0);
  }
  return t0;
 },
 putIfAbsent$2: function(key, ifAbsent) {
  return this._lib6_init$0().putIfAbsent$2(key, ifAbsent);
 },
 get$length: function() {
  if (!(this._lib6_map === (void 0))) {
    var t0 = $.get$length(this._lib6_map);
  } else {
    t0 = 0;
  }
  return t0;
 },
 isEmpty$0: function() {
  return this._lib6_map === (void 0) || $.isEmpty(this._lib6_map) === true;
 },
 getValues$0: function() {
  if (!(this._lib6_map === (void 0))) {
    var t0 = this._lib6_map.getValues$0();
  } else {
    t0 = $.CTC41;
  }
  return t0;
 },
 getKeys$0: function() {
  if (!(this._lib6_map === (void 0))) {
    var t0 = this._lib6_map.getKeys$0();
  } else {
    t0 = $.CTC41;
  }
  return t0;
 },
 forEach$1: function(f) {
  if (!(this._lib6_map === (void 0))) {
    $.forEach(this._lib6_map, f);
  }
 },
 containsKey$1: function(key) {
  return !(this._lib6_map === (void 0)) && this._lib6_map.containsKey$1(key) === true;
 },
 clear$0: function() {
  if (!(this._lib6_map === (void 0))) {
    $.clear(this._lib6_map);
  }
 },
 operator$indexSet$2: function(key, value) {
  $.indexSet(this._lib6_init$0(), key, value);
 },
 operator$index$1: function(key) {
  if (!(this._lib6_map === (void 0))) {
    var t0 = $.index(this._lib6_map, key);
  } else {
    t0 = (void 0);
  }
  return t0;
 },
 _lib6_init$0: function() {
  if (!(this._lib6_map === (void 0))) {
    var t0 = this._lib6_map;
  } else {
    var t1 = this._creator$0();
    this._lib6_map = t1;
    t0 = t1;
  }
  return t0;
 },
 _creator$0: function() { return this._creator.$call$0(); },
 is$Map: function() { return true; }
});

Isolate.$defineClass("AbstractList", "Object", [], {
 toString$0: function() {
  var result = $.StringBufferImpl$1('[');
  for (var t0 = this.iterator$0(), comma = (void 0); t0.hasNext$0() === true; comma = comma0) {
    var comma0 = comma;
    var t1 = t0.next$0();
    if (comma === true) {
      result.add$1(', ');
      comma0 = comma;
    } else {
      comma0 = true;
    }
    if (!$.eqNullB(t1)) {
      var t2 = $.toString(t1);
    } else {
      t2 = 'null';
    }
    result.add$1(t2);
  }
  return result.toString$0();
 },
 removeRange$2: function(start, length$) {
  throw $.captureStackTrace($.CTC7);
 },
 getRange$2: function(start, length$) {
  if ($.eqB(length$, 0)) {
    return [];
  }
  $.rangeCheck(this, start, length$);
  var list = $.List((void 0));
  $.setRuntimeTypeInfo(list, ({E: 'E'}));
  $.set$length(list, length$);
  $.copy(this, start, list, 0, length$);
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
  if (!(start === (void 0))) {
    var t0 = start;
  } else {
    t0 = 0;
  }
  return $.indexOf2(this, element, t0, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,(void 0))
},
 addAll$1: function(elements) {
  for (var t0 = $.iterator(elements); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
 },
 addLast$1: function(element) {
  this.add$1(element);
 },
 add$1: function(element) {
  throw $.captureStackTrace($.CTC7);
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC7);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC7);
 },
 operator$index$1: function(index) {
  if (typeof index !== 'number') return this.operator$index$1$bailout(index,  0);
  $.rangeCheck(this, index, 1);
  var it = this.iterator$0();
  for (var index0 = index; index1 = index0 - 1, index1 >= 0; index0 = index1) {
    it.next$0();
  }
  return it.next$0();
  var index1;
 },
 operator$index$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.rangeCheck(this, index, 1);
      var it = this.iterator$0();
      var index0 = index;
      L0: while (true) {
        var index1 = $.sub(index0, 1);
        if (!$.geB(index1, 0)) break L0;
        it.next$0();
        index0 = index1;
      }
      return it.next$0();
  }
 },
 iterator$0: function() {
  return;
 },
 isEmpty$0: function() {
  return $.get$length(this) === 0;
 },
 forEach$1: function(f) {
  $.forEach2(this, f);
 },
 filter$1: function(f) {
  return $.filter2(this, [], f);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("RunOnceQueue", "Object", ["_tasks?"], {
 cancel$1: function(key) {
  var tid = this._tasks.remove$1(key);
  if (!(tid === (void 0))) {
    $.window().clearTimeout$1(tid);
  }
 },
 add$3: function(key, task, timeout) {
  var t0 = ({});
  t0.task_2 = task;
  t0.key_1 = key;
  if (!(this._tasks === (void 0))) {
    this.cancel$1(t0.key_1);
  } else {
    this._tasks = $.makeLiteralMap([]);
  }
  $.indexSet(this._tasks, t0.key_1, $.window().setTimeout$2(new $.Closure8(this, t0), timeout));
 },
 add$2: function(key,task) {
  return this.add$3(key,task,0)
}
});

Isolate.$defineClass("_Offset", "Object", ["top=", "left="], {
 toString$0: function() {
  return '(' + $.stringToString(this.left) + ', ' + $.stringToString(this.top) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add(this.left, this.top));
 },
 operator$div$1: function(scalar) {
  return $._Offset$2($.div(this.left, scalar), $.div(this.top, scalar));
 },
 operator$mul$1: function(scalar) {
  return $._Offset$2($.mul(this.left, scalar), $.mul(this.top, scalar));
 },
 operator$add$1: function(other) {
  return $._Offset$2($.add(this.left, other.get$left()), $.add(this.top, other.get$top()));
 },
 operator$sub$1: function(other) {
  return $._Offset$2($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$Offset && $.eqB(this.left, other.left) && $.eqB(this.top, other.get$top());
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
});

Isolate.$defineClass("_Offset3d", "_Offset", ["zIndex?", "top", "left"], {
 toString$0: function() {
  return '(' + $.stringToString(this.get$x()) + ', ' + $.stringToString(this.get$y()) + ', ' + $.stringToString(this.get$z()) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add($.add(this.get$x(), this.get$y()), this.get$z()));
 },
 operator$div$1: function(scalar) {
  return $._Offset3d$3($.div(this.left, scalar), $.div(this.top, scalar), $.div(this.zIndex, scalar));
 },
 operator$mul$1: function(scalar) {
  return $._Offset3d$3($.mul(this.left, scalar), $.mul(this.top, scalar), $.mul(this.zIndex, scalar));
 },
 operator$add$1: function(other) {
  return $._Offset3d$3($.add(this.left, other.get$left()), $.add(this.top, other.get$top()), $.add(this.zIndex, other.get$zIndex()));
 },
 operator$sub$1: function(other) {
  return $._Offset3d$3($.sub(this.left, other.get$left()), $.sub(this.top, other.get$top()), $.sub(this.zIndex, other.get$zIndex()));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$Offset3d && $.eqB(this.left, other.get$left()) && $.eqB(this.top, other.get$top()) && $.eqB(this.zIndex, other.get$zIndex());
 },
 get$z: function() {
  return this.zIndex;
 },
 is$Offset3d: true,
 is$Offset: true
});

Isolate.$defineClass("_Size", "Object", ["height=", "width="], {
 toString$0: function() {
  return '(' + $.stringToString(this.width) + ', ' + $.stringToString(this.height) + ')';
 },
 hashCode$0: function() {
  return $.toInt($.add(this.width, this.height));
 },
 operator$eq$1: function(other) {
  return typeof other === 'object' && !!other.is$Size && $.eqB(this.width, other.get$width()) && $.eqB(this.height, other.get$height());
 },
 is$Size: true
});

Isolate.$defineClass("Browser", "Object", ["size?", "androidVersion?", "iosVersion?", "webkitVersion", "touch?", "mobile?", "android?", "ios?", "webkit", "firefox?", "msie", "chrome", "safari", "version!", "name="], {
 _initBrowserInfo$0: function() {
  var ua = $.toLowerCase($.window().get$navigator().get$userAgent());
  var bm = new $.Closure57(this, ua);
  if (bm.$call$1($.CTC45) === true) {
    this.webkit = true;
    $.prefix = '-webkit-';
    this.webkitVersion = this.version;
    if (bm.$call$1($.CTC46) === true) {
      this.chrome = true;
      var m = $.CTC47.firstMatch$1(ua);
      if (!(m === (void 0))) {
        this.android = true;
        this.mobile = true;
        this.touch = true;
        this.androidVersion = $._versionOf(m.group$1(1), '.');
      }
    } else {
      if (bm.$call$1($.CTC48) === true) {
        this.safari = true;
        var m0 = $.CTC49.firstMatch$1(ua);
        if (!(m0 === (void 0))) {
          this.ios = true;
          this.mobile = true;
          this.touch = true;
          this.iosVersion = $._versionOf(m0.group$1(1), '_');
        }
      }
    }
  } else {
    if (bm.$call$1($.CTC50) === true) {
      $.prefix = '-ms-';
      this.msie = true;
      var t0 = $.ge($.indexOf$1(ua, 'IEMobile'), 0);
      this.mobile = t0;
      this.touch = t0;
    } else {
      if ($.ltB($.indexOf$1(ua, 'compatible'), 0) && bm.$call$1($.CTC51) === true) {
        $.prefix = '-moz-';
        this.name = 'firefox';
        this.firefox = true;
      } else {
        $.prefix = '';
        this.name = 'unknown';
        this.version = 1.0;
      }
    }
  }
  var caveNode = $.document().query$1('#v-main');
  if (!(caveNode === (void 0))) {
    var t1 = caveNode;
  } else {
    t1 = $.window();
  }
  var qcave = $.DOMQuery(t1);
  this.size = $._Size$2(qcave.get$innerWidth(), qcave.get$innerHeight());
 },
 toString$0: function() {
  return '' + $.stringToString(this.name) + '(v' + $.stringToString(this.version) + ', ' + $.stringToString(this.size) + ')';
 },
 Browser$0: function() {
  this._initBrowserInfo$0();
 }
});

Isolate.$defineClass("DOMQuery2", "Object", ["node?"], {
 get$borderWidth: function() {
  return $.intOf(this.get$computedStyle().get$borderWidth(), (void 0));
 },
 isDescendantOf$1: function(parent$) {
  for (var n = this.node; !(n === (void 0)); n = n.get$parent()) {
    if (n === parent$) {
      return true;
    }
  }
  return false;
 },
 get$computedStyle: function() {
  return $.window().$dom_getComputedStyle$2(this.node, '');
 },
 get$documentOffset: function() {
  var ofs = $._Offset$2(0, 0);
  var el = this.node;
  do {
    ofs.left = $.add(ofs.left, el.get$$$dom_offsetLeft());
    ofs.top = $.add(ofs.top, el.get$$$dom_offsetTop());
    var t0 = !$.eqB(el.get$style().get$position(), 'fixed');
    var el0 = el;
    var t1 = t0;
    if (t0) {
      var el1 = el.get$offsetParent();
      var t2 = !$.eqNullB(el1);
      el0 = el1;
      t1 = t2;
    }
    el = el0;
  } while (t1);
  return ofs;
 },
 get$offset: function() {
  return $._Offset$2(this.node.get$$$dom_offsetLeft(), this.node.get$$$dom_offsetTop());
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
});

Isolate.$defineClass("_WindowQuery", "DOMQuery2", ["node"], {
 get$computedStyle: function() {
  return $.CSSStyleDeclaration();
 },
 isDescendantOf$1: function(parent$) {
  return false;
 },
 get$documentOffset: function() {
  return this.get$offset();
 },
 get$offset: function() {
  return $._Offset$2(0, 0);
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
});

Isolate.$defineClass("_NullQuery", "_WindowQuery", ["node"], {
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
});

Isolate.$defineClass("_DragGestureState", "Object", ["_moved=", "data", "_pending=", "_touched=", "_dragged=", "_range", "_initTxOfs=", "_ofs", "_delta", "_initPgOfs?", "_ownerOfs?", "_gesture"], {
 _setDelta$2: function(x, y) {
  this._delta.set$x(x);
  this._delta.set$y(y);
 },
 _setOfs$2: function(x, y) {
  this._ofs.set$x(x);
  this._ofs.set$y(y);
 },
 get$range: function() {
  if (this._range === (void 0) && !(this._gesture.get$_fnRange() === (void 0))) {
    this._range = this._gesture._fnRange$0();
  }
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
});

Isolate.$defineClass("_DragGesture2", "Object", ["_fnRange?"], {
 _constraint$2: function(x, y) {
  var range = this._state.get$range();
  var y0 = y;
  var x0 = x;
  if (!(range === (void 0))) {
    if ($.eqB(range.get$width(), 0)) {
      x0 = this._state.get$_initTxOfs().get$x();
    } else {
      if (this._transform === true) {
        if ($.gtB(x, range.get$x())) {
          x0 = range.get$x();
        } else {
          x0 = x;
          if ($.ltB(x, range.get$right())) {
            x0 = range.get$right();
          }
        }
      } else {
        if ($.ltB(x, range.get$x())) {
          x0 = range.get$x();
        } else {
          x0 = x;
          if ($.gtB(x, range.get$right())) {
            x0 = range.get$right();
          }
        }
      }
    }
    if ($.eqB(range.get$height(), 0)) {
      y0 = this._state.get$_initTxOfs().get$y();
    } else {
      if (this._transform === true) {
        if ($.gtB(y, range.get$y())) {
          y0 = range.get$y();
        } else {
          y0 = y;
          if ($.ltB(y, range.get$bottom())) {
            y0 = range.get$bottom();
          }
        }
      } else {
        if ($.ltB(y, range.get$y())) {
          y0 = range.get$y();
        } else {
          y0 = y;
          if ($.gtB(y, range.get$bottom())) {
            y0 = range.get$bottom();
          }
        }
      }
    }
  }
  return $._Offset$2(x0, y0);
 },
 _moveBy$5: function(ofsX, ofsY, deltaX, deltaY, callback) {
  var initofs = this._state.get$_initTxOfs();
  var move = this._constraint$2($.add(deltaX, initofs.get$x()), $.add(deltaY, initofs.get$y()));
  if (!(callback === (void 0))) {
    this._state._setOfs$2(ofsX, ofsY);
    this._state._setDelta$2($.sub(move.get$x(), initofs.get$x()), $.sub(move.get$y(), initofs.get$y()));
    this._state.set$_moved(this._state.get$_moved() === true || !$.eqB(deltaX, 0) || !$.eqB(deltaY, 0));
    var done = callback.$call$1(this._state);
    if (!(done === (void 0)) && done === true) {
      return;
    }
  }
  if (this._transform === true) {
    var t0 = $.translate3d(move.get$x(), move.get$y(), (void 0));
    this._state.get$_dragged().get$style().set$transform(t0);
  } else {
    var t1 = $.px(move.get$x());
    this._state.get$_dragged().get$style().set$left(t1);
    var t2 = $.px(move.get$y());
    this._state.get$_dragged().get$style().set$top(t2);
  }
 },
 _touchEnd$2: function(pageX, pageY) {
  if (!(this._state === (void 0)) && !(this._state.get$_touched() === (void 0))) {
    this._moveBy$5($.sub(pageX, this._state.get$_ownerOfs().get$x()), $.sub(pageY, this._state.get$_ownerOfs().get$y()), $.sub(pageX, this._state.get$_initPgOfs().get$x()), $.sub(pageY, this._state.get$_initPgOfs().get$y()), this._end);
  }
  this._stop$0();
 },
 _touchMove$2: function(pageX, pageY) {
  if (!(this._state === (void 0))) {
    var initPgOfs = this._state.get$_initPgOfs();
    if (!(this._state.get$_pending() === (void 0))) {
      var v = $.sub(pageX, initPgOfs.get$x());
      var t0 = $.gtB(v, this._movement) || $.ltB(v, $.neg(this._movement));
      var v0 = v;
      var t1 = t0;
      if (!t0) {
        var v1 = $.sub(pageY, initPgOfs.get$y());
        var t2 = $.gtB(v1, this._movement);
        v0 = v1;
        t1 = t2;
      }
      if (t1 || $.ltB(v0, $.neg(this._movement))) {
        this._activate$0();
      }
    }
    if (!(this._state.get$_touched() === (void 0))) {
      this._moveBy$5($.sub(pageX, this._state.get$_ownerOfs().get$x()), $.sub(pageY, this._state.get$_ownerOfs().get$y()), $.sub(pageX, initPgOfs.get$x()), $.sub(pageY, initPgOfs.get$y()), this._moving);
    }
  }
 },
 _activate$0: function() {
  var t0 = this._state.get$_pending();
  this._state.set$_touched(t0);
  this._state.set$_pending((void 0));
  if (!(this._lib10_start === (void 0))) {
    var dragged = this._lib10_start$1(this._state);
  } else {
    dragged = this.get$owner();
  }
  this._state.set$_dragged(dragged);
  if (dragged === (void 0)) {
    this._stop$0();
    return;
  }
  if (this._transform === true) {
    var t1 = $.offset3dOf(dragged.get$style().get$transform());
  } else {
    t1 = $.DOMQuery(dragged).get$offset();
  }
  this._state.set$_initTxOfs(t1);
 },
 _touchStart$3: function(touched, pageX, pageY) {
  this._stop$0();
  this._state = $._DragGestureState$3(this, pageX, pageY);
  this._state.set$_pending(touched);
  if ($.ltB(this._movement, 0)) {
    this._activate$0();
  }
 },
 _stop$0: function() {
  this._state = (void 0);
 },
 get$handle: function() {
  return this._handle;
 },
 get$owner: function() {
  return this._lib10_owner;
 },
 _fnRange$0: function() { return this._fnRange.$call$0(); },
 _lib10_start$1: function(arg0) { return this._lib10_start.$call$1(arg0); },
 _DragGesture$_init$8: function(_owner, _handle, _transform, _fnRange, _movement, _start, _end, _moving) {
  this._listen$0();
 }
});

Isolate.$defineClass("_TouchDragGesture", "_DragGesture2", ["_elEnd", "_elMove", "_elStart", "_transform", "_state", "_movement", "_fnRange", "_moving", "_end", "_lib10_start", "_handle", "_lib10_owner"], {
 _listen$0: function() {
  var on = this.get$handle().get$on();
  var t0 = on.get$touchStart();
  var t1 = new $.Closure80(this);
  this._elStart = t1;
  $.add$1(t0, t1);
  var t2 = on.get$touchMove();
  var t3 = new $.Closure81(this);
  this._elMove = t3;
  $.add$1(t2, t3);
  var t4 = on.get$touchEnd();
  var t5 = new $.Closure82(this);
  this._elEnd = t5;
  $.add$1(t4, t5);
 }
});

Isolate.$defineClass("_MouseDragGesture", "_DragGesture2", ["_captured", "_elEnd", "_elMove", "_elStart", "_transform", "_state", "_movement", "_fnRange", "_moving", "_end", "_lib10_start", "_handle", "_lib10_owner"], {
 _listen$0: function() {
  var t0 = this.get$handle().get$on().get$mouseDown();
  var t1 = new $.Closure83(this);
  this._elStart = t1;
  $.add$1(t0, t1);
 },
 _capture$0: function() {
  this._captured = true;
  var on = $.document().get$on();
  var t0 = on.get$mouseMove();
  var t1 = new $.Closure84(this);
  this._elMove = t1;
  $.add$1(t0, t1);
  var t2 = on.get$mouseUp();
  var t3 = new $.Closure85(this);
  this._elEnd = t3;
  $.add$1(t2, t3);
 },
 _stop$0: function() {
  if (this._captured === true) {
    this._captured = false;
    var on = $.document().get$on();
    if (!(this._elMove === (void 0))) {
      on.get$mouseMove().remove$1(this._elMove);
    }
    if (!(this._elEnd === (void 0))) {
      on.get$mouseUp().remove$1(this._elEnd);
    }
  }
  $._DragGesture2.prototype._stop$0.call(this);
 }
});

Isolate.$defineClass("View", "Object", ["_inDoc", "_hidden", "_layout", "_profile", "_innerofs", "_height", "_width", "_lib4_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs!", "_evlInfo", "_childInfo?", "_virtIS=", "_prevSibling=", "_nextSibling=", "_lib4_parent!", "_uuid", "_id"], {
 toString$0: function() {
  var t0 = '' + $.stringToString(this.get$className()) + '(';
  if ($.isEmpty(this.get$id()) === true) {
    var t1 = this.get$uuid();
  } else {
    t1 = this.get$id();
  }
  return t0 + $.stringToString(t1) + ')';
 },
 hashCode$0: function() {
  return $.hashCode(this.get$uuid());
 },
 get$dataAttributes: function() {
  if (!(this._dataAttrs === (void 0))) {
    var t0 = this._dataAttrs;
  } else {
    t0 = $.onDemand(new $.Closure50(this));
  }
  return t0;
 },
 domUnlisten_$2: function(n, type) {
  if (!(this._evlInfo === (void 0))) {
    var ln = this._evlInfo.get$domListeners().remove$1(type);
    if (!(ln === (void 0))) {
      $.index(n.get$on(), type).remove$1(ln);
    }
  }
 },
 domListen_$3: function(n, type, disp) {
  var ln = disp.$call$1(this);
  var ei = this._initEventListenerInfo$0();
  if (ei.get$domListeners() === (void 0)) {
    ei.set$domListeners($.makeLiteralMap([]));
  }
  $.indexSet(ei.get$domListeners(), type, ln);
  $.add$1($.index(n.get$on(), type), ln);
 },
 getDOMEventDispatcher_$1: function(type) {
  return $.getDOMEventDispatcher(type);
 },
 sendEvent$2: function(event$, type) {
  return !(this._evlInfo === (void 0)) && this._evlInfo.send$2(event$, type) === true;
 },
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,(void 0))
},
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,(void 0))
},
 get$on: function() {
  return this._initEventListenerInfo$0().get$on();
 },
 domStyle_$7: function(out, noLeft, noTop, noWidth, noHeight, noHidden, noStyle) {
  if (noLeft !== true && !$.eqB(this.get$left(), 0)) {
    $.add$1($.add$1($.add$1(out, 'left:'), this.get$left()), 'px;');
  }
  if (noTop !== true && !$.eqB(this.get$top(), 0)) {
    $.add$1($.add$1($.add$1(out, 'top:'), this.get$top()), 'px;');
  }
  if (noWidth !== true && !(this._width === (void 0))) {
    $.add$1($.add$1($.add$1(out, 'width:'), this._width), 'px;');
  }
  if (noHeight !== true && !(this._height === (void 0))) {
    $.add$1($.add$1($.add$1(out, 'height:'), this._height), 'px;');
  }
  if (noHidden !== true && this.get$hidden() === true) {
    $.add$1(out, 'display:none;');
  }
  var t0 = noStyle !== true && !(this._style === (void 0));
  var s = (void 0);
  var t1 = t0;
  if (t0) {
    var s0 = this._style.get$cssText();
    var t2 = $.isEmpty(s0) !== true;
    s = s0;
    t1 = t2;
  }
  if (t1) {
    $.add$1(out, $.encodeXML(s, false, 0, false));
  }
 },
 domStyle_$1: function(out) {
  return this.domStyle_$7(out,false,false,false,false,false,false)
},
 domClass_$1: function(out) {
  $.add$1(out, $.viewConfig.get$classPrefix());
  for (var t0 = $.iterator(this.get$classes()); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    $.add$1($.add$1(out, ' '), t1);
  }
 },
 domInner_$1: function(out) {
  for (var child = this.get$firstChild(); !(child === (void 0)); child = child.get$nextSibling()) {
    child.draw$1(out);
  }
 },
 domAttrs_$4: function(out, noId, noStyle, noClass) {
  var t0 = noId !== true;
  var s = (void 0);
  var t1 = t0;
  if (t0) {
    var s0 = this.get$uuid();
    var t2 = $.isEmpty(s0) !== true;
    s = s0;
    t1 = t2;
  }
  if (t1) {
    $.add$1($.add$1($.add$1(out, ' id="'), s), '"');
  }
  if (noStyle !== true) {
    var stylesb = $.StringBufferImpl$1('');
    this.domStyle_$1(stylesb);
    if (stylesb.isEmpty$0() !== true) {
      $.add$1($.add$1($.add$1(out, ' style="'), stylesb), '"');
    }
  }
  if (noClass !== true) {
    var classsb = $.StringBufferImpl$1('');
    this.domClass_$1(classsb);
    if (classsb.isEmpty$0() !== true) {
      $.add$1($.add$1($.add$1(out, ' class="'), classsb), '"');
    }
  }
 },
 domAttrs_$1: function(out) {
  return this.domAttrs_$4(out,false,false,false)
},
 get$classes: function() {
  return this._classes;
 },
 get$style: function() {
  if (this._style === (void 0)) {
    this._style = $.CSSStyleDeclarationImpl$1(this);
  }
  return this._style;
 },
 get$profile: function() {
  if ($.eqNullB(this._profile)) {
    this._profile = $.ProfileDeclarationImpl$1(this);
  }
  return this._profile;
 },
 get$layout: function() {
  if ($.eqNullB(this._layout)) {
    this._layout = $.LayoutDeclarationImpl$1(this);
  }
  return this._layout;
 },
 get$documentOffset: function() {
  var ofs = $._Offset$2(0, 0);
  for (var view = this; true; view = view0) {
    var view0 = view;
    ofs.left = $.add(ofs.left, view.get$left());
    ofs.top = $.add(ofs.top, view.get$top());
    if ($.eqB(view.get$style().get$position(), 'fixed')) {
      break;
    }
    var p = view.get$parent();
    if ($.eqNullB(p)) {
      var nofs = $.DOMQuery(view.get$node()).get$documentOffset();
      ofs.left = $.add(ofs.left, nofs.get$left());
      ofs.top = $.add(ofs.top, nofs.get$top());
      break;
    } else {
    }
    view0 = p;
  }
  return ofs;
 },
 get$innerHeight: function() {
  if (this.get$inDocument() === true) {
    var v = $.DOMQuery(this.get$innerNode()).get$innerHeight();
  } else {
    if (!(this._height === (void 0))) {
      v = $.sub(this._height, this.get$innerSpacing_().get$height());
    } else {
      v = 0;
    }
  }
  if ($.gtB(v, 0)) {
    var t0 = v;
  } else {
    t0 = 0;
  }
  return t0;
 },
 get$innerWidth: function() {
  if (this.get$inDocument() === true) {
    var v = $.DOMQuery(this.get$innerNode()).get$innerWidth();
  } else {
    if (!(this._width === (void 0))) {
      v = $.sub(this._width, this.get$innerSpacing_().get$width());
    } else {
      v = 0;
    }
  }
  if ($.gtB(v, 0)) {
    var t0 = v;
  } else {
    t0 = 0;
  }
  return t0;
 },
 get$outerHeight: function() {
  if (!(this._height === (void 0))) {
    var t0 = this._height;
  } else {
    if (this.get$inDocument() === true) {
      t0 = $.DOMQuery(this.get$node()).get$outerHeight();
    } else {
      t0 = 0;
    }
  }
  return t0;
 },
 get$outerWidth: function() {
  if (!(this._width === (void 0))) {
    var t0 = this._width;
  } else {
    if (this.get$inDocument() === true) {
      t0 = $.DOMQuery(this.get$node()).get$outerWidth();
    } else {
      t0 = 0;
    }
  }
  return t0;
 },
 get$innerSpacing_: function() {
  return $._Size$2(this.get$innerLeft(), this.get$innerTop());
 },
 get$innerTop: function() {
  if (!(this._innerofs === (void 0))) {
    var t0 = this._innerofs.get$top();
  } else {
    t0 = 0;
  }
  return t0;
 },
 get$innerLeft: function() {
  if (!(this._innerofs === (void 0))) {
    var t0 = this._innerofs.get$left();
  } else {
    t0 = 0;
  }
  return t0;
 },
 set$height: function(height) {
  this._height = height;
  if (this._inDoc === true) {
    var t0 = $.px(height);
    this.get$node().get$style().set$height(t0);
    this.adjustInnerNode_$1$bHeight(true);
    $.layoutManager.sizeUpdated$3(this, height, false);
  }
 },
 get$height: function() {
  return this._height;
 },
 set$width: function(width) {
  this._width = width;
  if (this._inDoc === true) {
    var t0 = $.px(width);
    this.get$node().get$style().set$width(t0);
    this.adjustInnerNode_$1$bWidth(true);
    $.layoutManager.sizeUpdated$3(this, width, true);
  }
 },
 get$width: function() {
  return this._width;
 },
 set$top: function(top$) {
  this._lib4_top = top$;
  if (this._inDoc === true) {
    var t0 = $.px(top$);
    this.get$node().get$style().set$top(t0);
  }
 },
 get$top: function() {
  return this._lib4_top;
 },
 set$left: function(left) {
  this._left = left;
  if (this._inDoc === true) {
    var t0 = $.px(left);
    this.get$node().get$style().set$left(t0);
  }
 },
 get$left: function() {
  return this._left;
 },
 get$hidden: function() {
  return this._hidden;
 },
 _asHTML$0: function() {
  var out = $.StringBufferImpl$1('');
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
  if (child.get$hidden() === true) {
    return false;
  }
  var v = child.get$style().get$position();
  return $.isEmpty(v) === true || $.eqB(v, 'absolute');
 },
 measureHeight_$1: function(mctx) {
  if (this.isViewGroup$0() === true) {
    var t0 = mctx.measureHeight$1(this);
  } else {
    t0 = mctx.measureHeightByContent$2(this, true);
  }
  return t0;
 },
 measureWidth_$1: function(mctx) {
  if (this.isViewGroup$0() === true) {
    var t0 = mctx.measureWidth$1(this);
  } else {
    t0 = mctx.measureWidthByContent$2(this, true);
  }
  return t0;
 },
 doLayout_$1: function(mctx) {
  $.layoutManager.doLayout$2(mctx, this);
 },
 requestLayout$1: function(immediate) {
  if (immediate === true) {
    $.layoutManager.flush$1(this);
  } else {
    $.layoutManager.queue$1(this);
  }
 },
 requestLayout$0: function() {
  return this.requestLayout$1(false)
},
 requestLayout$0: function() {
  return this.requestLayout$1(false)
},
 unmount_$0: function() {
  this.sendEvent$1($.ViewEvent$6(this, 'unmount', (void 0), (void 0), (void 0), (void 0)));
  if (!(this._evlInfo === (void 0))) {
    this._evlInfo.unmount$0();
  }
  for (var child = this.get$firstChild(); !$.eqNullB(child); child = child.get$nextSibling()) {
    child.unmount_$0();
  }
  this._mntAttrs = (void 0);
  this._inDoc = false;
  this._node = (void 0);
 },
 mount_$0: function() {
  this._inDoc = true;
  this.adjustInnerNode_$4(true, true, true, true);
  for (var child = this.get$firstChild(); !$.eqNullB(child); child = child.get$nextSibling()) {
    child.mount_$0();
  }
  if (!(this._evlInfo === (void 0))) {
    this._evlInfo.mount$0();
  }
  this.sendEvent$1($.ViewEvent$6(this, 'mount', (void 0), (void 0), (void 0), (void 0)));
 },
 _unmount$0: function() {
  if (this.get$inDocument() === true) {
    this.unmount_$0();
  }
 },
 _mount$0: function() {
  $._mntCnt = $.add($._mntCnt, 1);
  try {
    this.mount_$0();
    this.requestLayout$0();
  } finally {
    $._mntCnt = $.sub($._mntCnt, 1);
  }
  if ($.eqB($._mntCnt, 0)) {
    if (!($._afters === (void 0)) && $.isEmpty($._afters) !== true) {
      var afters = $.List$from($._afters);
      $.clear($._afters);
      for (var t0 = $.iterator(afters); t0.hasNext$0() === true; ) {
        var t1 = t0.next$0();
        var view = $.index(t1, 0);
        if (view.get$inDocument() === true) {
          $.index(t1, 1).$call$1(view);
        }
      }
    }
    if ($.eqB($._mntCnt, 0)) {
      $.layoutManager.flush$0();
    }
  }
 },
 _addToDoc$5: function(node, outer, inner, before, keepId) {
  var t0 = outer === true;
  if (t0 && keepId === true && $.isEmpty(node.get$id()) !== true) {
    this._uuid = node.get$id();
  }
  var html = this._asHTML$0();
  if (inner === true) {
    node.set$innerHTML(html);
    var nxt = (void 0);
    var p = (void 0);
  } else {
    if (t0) {
      var p0 = node.get$parent();
      var nxt0 = node.get$nextElementSibling();
      node.remove$0();
      nxt = nxt0;
      p = p0;
    } else {
      nxt = before;
      p = node;
    }
  }
  if (!(nxt === (void 0))) {
    nxt.insertAdjacentHTML$2('beforeBegin', html);
  } else {
    if (!(p === (void 0))) {
      p.insertAdjacentHTML$2('beforeEnd', html);
    }
  }
  this._mount$0();
 },
 addToDocument$5: function(node, outer, inner, before, keepId) {
  var t0 = this.get$parent() === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = this.get$inDocument() === true;
  }
  if (t1) {
    throw $.captureStackTrace($.UIException$1('No parent allowed, nor attached twice: ' + $.stringToString(this)));
  }
  this._addToDoc$5(node, outer, inner, before, keepId);
 },
 addToDocument$1: function(node) {
  return this.addToDocument$5(node,false,false,(void 0),false)
},
 adjustInnerNode_$4: function(bLeft, bTop, bWidth, bHeight) {
  if (this._inDoc !== true) {
    return;
  }
  var n = this.get$node();
  var inner = this.get$innerNode();
  if (!(inner === n)) {
    if (bLeft === true) {
      var t0 = $.px(this.get$innerLeft());
      inner.get$style().set$left(t0);
    }
    if (bTop === true) {
      var t1 = $.px(this.get$innerTop());
      inner.get$style().set$top(t1);
    }
    if (bWidth === true) {
      var v = $.sub($.DOMQuery(n).get$innerWidth(), this.get$innerSpacing_().get$width());
      if ($.gtB(v, 0)) {
        var t2 = v;
      } else {
        t2 = 0;
      }
      var t3 = $.px(t2);
      inner.get$style().set$width(t3);
    }
    if (bHeight === true) {
      var v0 = $.sub($.DOMQuery(n).get$innerHeight(), this.get$innerSpacing_().get$height());
      if ($.gtB(v0, 0)) {
        var t4 = v0;
      } else {
        t4 = 0;
      }
      var t5 = $.px(t4);
      inner.get$style().set$height(t5);
    }
  }
 },
 adjustInnerNode_$1$bHeight: function(bHeight) {
  return this.adjustInnerNode_$4(false,false,false,bHeight)
},
 adjustInnerNode_$1$bWidth: function(bWidth) {
  return this.adjustInnerNode_$4(false,false,bWidth,false)
},
 get$innerNode: function() {
  return this.get$node();
 },
 get$inDocument: function() {
  return this._inDoc;
 },
 getNode$1: function(subId) {
  if (this._inDoc !== true) {
    throw $.captureStackTrace($.UIException$1('Not in document, ' + $.stringToString(this) + '. Don\'t access node in Activity.onCreate_().'));
  }
  var t0 = $.document();
  if (!$.eqNullB(subId) && $.gtB($.get$length(subId), 0)) {
    var t1 = '#' + $.stringToString(this.get$uuid()) + '-' + $.stringToString(subId);
  } else {
    t1 = '#' + $.stringToString(this.get$uuid());
  }
  return t0.query$1(t1);
 },
 get$node: function() {
  if (!(this._node === (void 0))) {
    var t0 = this._node;
  } else {
    t0 = this.getNode$1((void 0));
  }
  return t0;
 },
 removeChildFromDocument_$2: function(child, childNode) {
  childNode.remove$0();
 },
 insertChildToDocument_$3: function(child, childInfo, beforeChild) {
  if (!(beforeChild === (void 0))) {
    if (typeof childInfo === 'object' && childInfo.is$Element()) {
      var before = beforeChild.get$node();
      before.get$parent().insertBefore$2(childInfo, before);
    } else {
      beforeChild.get$node().insertAdjacentHTML$2('beforeBegin', childInfo);
    }
  } else {
    if (typeof childInfo === 'object' && childInfo.is$Element()) {
      this.get$innerNode().$dom_appendChild$1(childInfo);
    } else {
      this.get$innerNode().insertAdjacentHTML$2('beforeEnd', childInfo);
    }
  }
 },
 _removeChild$3: function(child, notifyChild, exit) {
  if (!(child.get$parent() === this)) {
    return;
  }
  this.beforeChildRemoved_$1(child);
  var t0 = notifyChild === true;
  if (t0) {
    child.beforeParentChanged_$1((void 0));
  }
  if (this.get$inDocument() === true) {
    var childNode = child.get$node();
    if (exit === true) {
      child._unmount$0();
    }
    this.removeChildFromDocument_$2(child, childNode);
  }
  $.unlink(this, child);
  if (t0) {
    child.onParentChanged_$1(this);
  }
  this.onChildRemoved_$1(child);
 },
 _removeChild$1: function(child) {
  return this._removeChild$3(child,true,true)
},
 _removeChild$2$notifyChild: function(child,notifyChild) {
  return this._removeChild$3(child,notifyChild,true)
},
 removeFromParent$0: function() {
  if (this.get$parent() === (void 0)) {
    throw $.captureStackTrace($.UIException$1('Unable to remove a root view, ' + $.stringToString(this)));
  }
  this.get$parent()._removeChild$1(this);
 },
 _addChild$3: function(child, beforeChild, childNode) {
  if (this.isDescendantOf$1(child) === true) {
    throw $.captureStackTrace($.UIException$1('' + $.stringToString(child) + ' is an ancestor of ' + $.stringToString(this)));
  }
  if (this.isViewGroup$0() !== true) {
    throw $.captureStackTrace($.UIException$1('No child allowed in ' + $.stringToString(this)));
  }
  var beforeChild0 = beforeChild;
  if (!(beforeChild === (void 0))) {
    if (!(beforeChild.get$parent() === this)) {
      beforeChild0 = (void 0);
    } else {
      if (child === beforeChild) {
        return;
      }
      beforeChild0 = beforeChild;
    }
  }
  var oldParent = child.get$parent();
  var t0 = oldParent === this;
  var parentChanged = !t0;
  if (t0 && beforeChild0 === child.get$nextSibling()) {
    return;
  }
  if (parentChanged) {
    child.beforeParentChanged_$1(this);
  }
  if (!(oldParent === (void 0))) {
    oldParent._removeChild$2$notifyChild(child, false);
  }
  $.link(this, child, beforeChild0);
  if (this.get$inDocument() === true) {
    if (!(childNode === (void 0))) {
      this.insertChildToDocument_$3(child, childNode, beforeChild0);
    } else {
      this.insertChildToDocument_$3(child, child._asHTML$0(), beforeChild0);
      child._mount$0();
    }
  }
  this.onChildAdded_$1(child);
  if (parentChanged) {
    child.onParentChanged_$1(oldParent);
  }
 },
 _addChild$2: function(child,beforeChild) {
  return this._addChild$3(child,beforeChild,(void 0))
},
 addChild$2: function(child, beforeChild) {
  this._addChild$2(child, beforeChild);
 },
 addChild$1: function(child) {
  return this.addChild$2(child,(void 0))
},
 isViewGroup$0: function() {
  return true;
 },
 onLayout$0: function() {
  this.sendEvent$1($.ViewEvent$6(this, 'layout', (void 0), (void 0), (void 0), (void 0)));
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
  if (!$.eqNullB(this._childInfo)) {
    var t0 = this._childInfo.get$nChild();
  } else {
    t0 = 0;
  }
  return t0;
 },
 get$children: function() {
  var ci = this._initChildInfo$0();
  if (ci.get$children() === (void 0)) {
    ci.set$children($._SubviewList$1(this));
  }
  return ci.get$children();
 },
 get$previousSibling: function() {
  return this._prevSibling;
 },
 get$nextSibling: function() {
  return this._nextSibling;
 },
 get$lastChild: function() {
  if (!(this._childInfo === (void 0))) {
    var t0 = this._childInfo.get$lastChild();
  } else {
    t0 = (void 0);
  }
  return t0;
 },
 get$firstChild: function() {
  if (!(this._childInfo === (void 0))) {
    var t0 = this._childInfo.get$firstChild();
  } else {
    t0 = (void 0);
  }
  return t0;
 },
 get$parent: function() {
  return this._lib4_parent;
 },
 isDescendantOf$1: function(parent$) {
  for (var w = this; !(w === (void 0)); w = w.get$parent()) {
    if (w === parent$) {
      return true;
    }
  }
  return false;
 },
 get$spaceOwner: function() {
  return $.spaceOwner(this);
 },
 bindFellow_$2: function(id, fellow) {
  throw $.captureStackTrace($.CTC8);
 },
 get$fellows: function() {
  return this.get$spaceOwner().get$fellows();
 },
 getFellow$1: function(id) {
  return this.get$spaceOwner().getFellow$1(id);
 },
 queryAll$1: function(selector) {
  return $.ViewIterable$2(this, selector);
 },
 query$1: function(selector) {
  if (selector === (void 0)) {
    return;
  }
  $0:{
    if ('' === selector) {
      return;
    } else {
      if ('parent' === selector) {
        return this.get$parent();
      } else {
        if ('spaceOwner' === selector) {
          var so = this.get$spaceOwner();
          if (typeof so === 'object' && !!so.is$View) {
            var t0 = so;
          } else {
            t0 = (void 0);
          }
          return t0;
        }
      }
    }
  }
  var iter = $.iterator(this.queryAll$1(selector));
  if (iter.hasNext$0() === true) {
    var t1 = iter.next$0();
  } else {
    t1 = (void 0);
  }
  return t1;
 },
 set$id: function(id) {
  var id0 = id;
  if (id === (void 0)) {
    id0 = '';
  }
  if (!$.eqB(this._id, id0)) {
    if ($.gtB($.get$length(id0), 0)) {
      $.checkIdSpaces(this, id0);
    }
    $.removeFromIdSpace(this, false);
    this._id = id0;
    $.addToIdSpace(this, false);
  }
 },
 get$id: function() {
  return this._id;
 },
 get$uuid: function() {
  if (this._uuid === (void 0)) {
    var t0 = $._uuidNext;
    $._uuidNext = $.add(t0, 1);
    this._uuid = $.encodeId(t0, $.viewConfig.get$uuidPrefix());
  }
  return this._uuid;
 },
 _initEventListenerInfo$0: function() {
  if (this._evlInfo === (void 0)) {
    this._evlInfo = $._EventListenerInfo$1(this);
  }
  return this._evlInfo;
 },
 _initChildInfo$0: function() {
  if (this._childInfo === (void 0)) {
    this._childInfo = $._ChildInfo$0();
  }
  return this._childInfo;
 },
 get$className: function() {
  return 'View';
 },
 View$0: function() {
  this._classes = $._ClassSet$1(this);
  $.add$1(this._classes, '' + $.stringToString($.viewConfig.get$classPrefix()) + $.stringToString(this.get$className()));
 },
 is$View: true
});

Isolate.$defineClass("UIException", "Object", ["message?"], {
 toString$0: function() {
  return 'UIException(' + $.stringToString(this.message) + ')';
 }
});

Isolate.$defineClass("_SubviewList", "AbstractList", ["_owner"], {
 removeRange$2: function(start, length$) {
  if (typeof length$ !== 'number') return this.removeRange$2$bailout(start, length$,  0);
  if (length$ <= 0) {
    return;
  }
  var child = this.operator$index$1(start);
  for (var length$ = length$, child0 = child; length0 = length$ - 1, length0 >= 0 && !$.eqNullB(child0); length$ = length0, child0 = child1) {
    var child1 = child0;
    var next = child0.get$nextSibling();
    child0.removeFromParent$0();
    child1 = next;
  }
  var length0;
 },
 removeRange$2$bailout: function(start, length$, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.leB(length$, 0)) {
        return;
      }
      var child = this.operator$index$1(start);
      var length$ = length$;
      var child0 = child;
      L0: while (true) {
        var length0 = $.sub(length$, 1);
        if (!($.geB(length0, 0) && !$.eqNullB(child0))) break L0;
        var child1 = child0;
        var next = child0.get$nextSibling();
        child0.removeFromParent$0();
        child1 = next;
        length$ = length0;
        child0 = child1;
      }
  }
 },
 last$0: function() {
  return this._owner.get$lastChild();
 },
 removeLast$0: function() {
  var w = this.last$0();
  if (!$.eqNullB(w)) {
    w.removeFromParent$0();
  }
  return w;
 },
 add$1: function(view) {
  this._owner.addChild$1(view);
 },
 operator$indexSet$2: function(index, value) {
  if (value === (void 0)) {
    throw $.captureStackTrace($.CTC9);
  }
  var w = this.operator$index$1(index);
  if (!(w === value)) {
    var next = w.get$nextSibling();
    w.removeFromParent$0();
    this._owner.addChild$2(value, next);
  }
 },
 operator$index$1: function(index) {
  if (typeof index !== 'number') return this.operator$index$1$bailout(index,  0);
  $.rangeCheck(this, index, 1);
  var index2 = $.sub($.sub($.get$length(this), index), 1);
  if (typeof index2 !== 'number') return this.operator$index$1$bailout(index, 2, index, index2);
  if (index <= index2) {
    var child = this._owner.get$firstChild();
    for (var index0 = index, child0 = child; index1 = index0 - 1, index1 >= 0; index0 = index1, child0 = child1) {
      var child1 = child0;
      child1 = child0.get$nextSibling();
    }
    return child0;
  } else {
    var child2 = this._owner.get$lastChild();
    for (var index20 = index2, child3 = child2; index21 = index20 - 1, index21 >= 0; index20 = index21, child3 = child4) {
      var child4 = child3;
      child4 = child3.get$previousSibling();
    }
    return child3;
  }
  var index21, index1;
 },
 operator$index$1$bailout: function(index, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      index2 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.rangeCheck(this, index, 1);
      var index2 = $.sub($.sub($.get$length(this), index), 1);
    case 2:
      state = 0;
      if ($.leB(index, index2)) {
        var child = this._owner.get$firstChild();
        var index0 = index;
        var child0 = child;
        L0: while (true) {
          var index1 = $.sub(index0, 1);
          if (!$.geB(index1, 0)) break L0;
          var child1 = child0;
          child1 = child0.get$nextSibling();
          index0 = index1;
          child0 = child1;
        }
        return child0;
      } else {
        var child2 = this._owner.get$lastChild();
        var index20 = index2;
        var child3 = child2;
        L1: while (true) {
          var index21 = $.sub(index20, 1);
          if (!$.geB(index21, 0)) break L1;
          var child4 = child3;
          child4 = child3.get$previousSibling();
          index20 = index21;
          child3 = child4;
        }
        return child3;
      }
  }
 },
 get$length: function() {
  return this._owner.get$childCount();
 },
 iterator$0: function() {
  return $._WCIterator$1(this._owner);
 }
});

Isolate.$defineClass("_WCIterator", "Object", ["_lib4_next="], {
 next$0: function() {
  if (this._lib4_next === (void 0)) {
    throw $.captureStackTrace($.CTC4);
  }
  var nxt = this._lib4_next;
  this._lib4_next = this._lib4_next.get$nextSibling();
  return nxt;
 },
 hasNext$0: function() {
  return !$.eqNullB(this._lib4_next);
 },
 _WCIterator$1: function(owner) {
  this._lib4_next = owner.get$firstChild();
 }
});

Isolate.$defineClass("_ChildInfo", "Object", ["children=", "nChild=", "lastChild=", "firstChild="], {
});

Isolate.$defineClass("_EventListenerInfo", "Object", ["domListeners=", "_listeners", "on?", "_owner"], {
 unmount$0: function() {
  if (!(this._listeners === (void 0))) {
    var n = this._owner.get$node();
    for (var t0 = $.iterator(this._listeners.getKeys$0()); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      if (!$.eqNullB(this._owner.getDOMEventDispatcher_$1(t1)) && $.isEmpty($.index(this._listeners, t1)) !== true) {
        this._owner.domUnlisten_$2(n, t1);
      }
    }
  }
 },
 mount$0: function() {
  if (!(this._listeners === (void 0))) {
    var n = this._owner.get$node();
    for (var t0 = $.iterator(this._listeners.getKeys$0()); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      var disp = this._owner.getDOMEventDispatcher_$1(t1);
      if (!$.eqNullB(disp) && $.isEmpty($.index(this._listeners, t1)) !== true) {
        this._owner.domListen_$3(n, t1, disp);
      }
    }
  }
 },
 send$2: function(event$, type) {
  var type0 = type;
  if ($.eqNullB(type)) {
    type0 = event$.get$type();
  }
  var t0 = !$.eqNullB(this._listeners);
  var ls = (void 0);
  var t1 = t0;
  if (t0) {
    var ls0 = $.index(this._listeners, type0);
    var t2 = !$.eqNullB(ls0);
    ls = ls0;
    t1 = t2;
  }
  var dispatched = false;
  if (t1) {
    event$.set$currentTarget(this._owner);
    for (var t3 = $.iterator($.List$from(ls)), dispatched0 = false; t3.hasNext$0() === true; dispatched0 = dispatched1) {
      var dispatched1 = dispatched0;
      t3.next$0().$call$1(event$);
      if (event$.isPropagationStopped$0() === true) {
        return true;
      }
      dispatched1 = true;
    }
    dispatched = dispatched0;
  }
  return dispatched;
 },
 remove$2: function(type, listener) {
  var t0 = !(this._listeners === (void 0));
  var ls = (void 0);
  var t1 = t0;
  if (t0) {
    var ls0 = $.index(this._listeners, type);
    var t2 = !(ls0 === (void 0));
    ls = ls0;
    t1 = t2;
  }
  var found = false;
  if (t1) {
    var j = $.indexOf$1(ls, listener);
    found = false;
    if ($.geB(j, 0)) {
      $.removeRange(ls, j, 1);
      if ($.isEmpty(ls) === true && this._owner.get$inDocument() === true && !(this._owner.getDOMEventDispatcher_$1(type) === (void 0))) {
        this._owner.domUnlisten_$2(this._owner.get$node(), type);
      }
      found = true;
    }
  }
  return found;
 },
 add$2: function(type, listener) {
  var t0 = ({});
  if (listener === (void 0)) {
    throw $.captureStackTrace($.CTC55);
  }
  if (this._listeners === (void 0)) {
    this._listeners = $.makeLiteralMap([]);
  }
  t0.first_1 = false;
  $.add$1(this._listeners.putIfAbsent$2(type, new $.Closure70(t0)), listener);
  var t1 = t0.first_1 === true && this._owner.get$inDocument() === true;
  var disp = (void 0);
  var t2 = t1;
  if (t1) {
    var disp0 = this._owner.getDOMEventDispatcher_$1(type);
    var t3 = !(disp0 === (void 0));
    disp = disp0;
    t2 = t3;
  }
  if (t2) {
    this._owner.domListen_$3(this._owner.get$node(), type, disp);
  }
 },
 isEmpty$1: function(type) {
  var t0 = this._listeners === (void 0);
  var ls = (void 0);
  var t1 = t0;
  if (!t0) {
    var ls0 = $.index(this._listeners, type);
    var t2 = ls0 === (void 0);
    ls = ls0;
    t1 = t2;
  }
  return t1 || $.isEmpty(ls) === true;
 },
 _EventListenerInfo$1: function(_owner) {
  this.on = $._ViewEvents$1(this);
 }
});

Isolate.$defineClass("_ClassSet", "HashSetImplementation", ["view?", "_backingMap"], {
 clear$0: function() {
  $.HashSetImplementation.prototype.clear$0.call(this);
  if (this.view.get$inDocument() === true) {
    $.clear(this.view.get$node().get$classes());
  }
 },
 remove$1: function(name$) {
  var removed = $.HashSetImplementation.prototype.remove$1.call(this, name$);
  if (removed === true && this.view.get$inDocument() === true) {
    this.view.get$node().get$classes().remove$1(name$);
  }
  return removed;
 },
 add$1: function(name$) {
  $.HashSetImplementation.prototype.add$1.call(this, name$);
  if (this.view.get$inDocument() === true) {
    $.add$1(this.view.get$node().get$classes(), name$);
  }
 }
});

Isolate.$defineClass("_VirtualIdSpace", "Object", ["_fellows", "_owner"], {
 toString$0: function() {
  return '_VirtualIdSpace(' + $.stringToString(this._owner) + ': ' + $.stringToString(this._fellows) + ')';
 },
 get$fellows: function() {
  return this._fellows.getValues$0();
 },
 bindFellow_$2: function(id, fellow) {
  if (!(fellow === (void 0))) {
    $.indexSet(this._fellows, id, fellow);
  } else {
    this._fellows.remove$1(id);
  }
 },
 getFellow$1: function(id) {
  return $.index(this._fellows, id);
 },
 query$1: function(selector) {
  return this._owner.query$1(selector);
 },
 is$IdSpace: true
});

Isolate.$defineClass("Section", "View", ["_fellows", "_inDoc", "_hidden", "_layout", "_profile", "_innerofs", "_height", "_width", "_lib4_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib4_parent", "_uuid", "_id"], {
 get$domTag_: function() {
  return 'section';
 },
 bindFellow_$2: function(id, fellow) {
  if (!(fellow === (void 0))) {
    $.indexSet(this._fellows, id, fellow);
  } else {
    this._fellows.remove$1(id);
  }
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
});

Isolate.$defineClass("TextView", "View", ["_html", "_text", "_inDoc", "_hidden", "_layout", "_profile", "_innerofs", "_height", "_width", "_lib4_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib4_parent", "_uuid", "_id"], {
 toString$0: function() {
  return '' + $.stringToString(this.get$className()) + '(\'' + $.stringToString(this.get$text()) + $.stringToString(this.get$html()) + '\')';
 },
 isViewGroup$0: function() {
  return false;
 },
 domInner_$1: function(out) {
  $.add$1(out, this.get$innerHTML_());
 },
 get$encodedText: function() {
  return $.encodeXML(this.get$text(), true, 0, false);
 },
 get$innerHTML_: function() {
  return '' + $.stringToString(this.get$encodedText()) + $.stringToString(this.get$html());
 },
 updateInner_$0: function() {
  if (this.get$inDocument() === true) {
    var t0 = this.get$innerHTML_();
    this.get$node().set$innerHTML(t0);
  }
 },
 get$html: function() {
  return this._html;
 },
 set$text: function(text) {
  if (!$.eqNullB(text)) {
    var t0 = text;
  } else {
    t0 = '';
  }
  this._text = t0;
  this.updateInner_$0();
 },
 get$text: function() {
  return this._text;
 },
 get$className: function() {
  return 'TextView';
 },
 TextView$1: function(text) {
  if (!$.eqNullB(text)) {
    var t0 = text;
  } else {
    t0 = '';
  }
  this._text = t0;
  this._html = '';
 }
});

Isolate.$defineClass("Canvas", "View", ["_inDoc", "_hidden", "_layout", "_profile", "_innerofs", "_height", "_width", "_lib4_top", "_left", "_node", "_style", "_classes", "_mntAttrs", "_dataAttrs", "_evlInfo", "_childInfo", "_virtIS", "_prevSibling", "_nextSibling", "_lib4_parent", "_uuid", "_id"], {
 get$domTag_: function() {
  return 'canvas';
 },
 domAttrs_$4: function(out, noId, noStyle, noClass) {
  if (!(this.get$width() === (void 0))) {
    $.add$1($.add$1($.add$1(out, '  width="'), this.get$width()), '"');
  }
  if (!(this.get$height() === (void 0))) {
    $.add$1($.add$1($.add$1(out, '  height="'), this.get$height()), '"');
  }
  $.View.prototype.domAttrs_$4.call(this, out, noId, noStyle, noClass);
 },
 domAttrs_$1: function(out) {
  return this.domAttrs_$4(out,false,false,false)
},
 adjustInnerNode_$4: function(bLeft, bTop, bWidth, bHeight) {
  if (bWidth === true) {
    var t0 = this.get$width();
    this.get$canvasNode().set$width(t0);
  }
  if (bHeight === true) {
    var t1 = this.get$height();
    this.get$canvasNode().set$height(t1);
  }
  $.View.prototype.adjustInnerNode_$4.call(this, bLeft, bTop, bWidth, bHeight);
 },
 adjustInnerNode_$1$bHeight: function(bHeight) {
  return this.adjustInnerNode_$4(false,false,false,bHeight)
},
 adjustInnerNode_$1$bWidth: function(bWidth) {
  return this.adjustInnerNode_$4(false,false,bWidth,false)
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
});

Isolate.$defineClass("ViewEvent", "Object", ["currentTarget!", "_propStop", "_offsetReady", "_offset", "_stamp", "_type", "_domEvt", "_target"], {
 toString$0: function() {
  return 'ViewEvent(' + $.stringToString(this.get$target()) + ',' + $.stringToString(this.get$type()) + ')';
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
 get$target: function() {
  return this._target;
 },
 get$offset: function() {
  if (this._offsetReady !== true) {
    this._offsetReady = true;
    try {
      if (!(this.get$domEvent() === (void 0))) {
        var t0 = this.get$domEvent();
        if (!((typeof t0 === 'object') && t0.is$UIEvent())) {
          return this._offset;
        }
        var uievt = this.get$domEvent();
        var t1 = uievt.get$pageX();
        this._offset.set$x(t1);
        var t2 = uievt.get$pageY();
        this._offset.set$y(t2);
      }
      var ofs = $.DOMQuery(this.get$target()).get$documentOffset();
      var t3 = this._offset;
      t3.set$left($.sub(t3.get$left(), ofs.get$left()));
      var t4 = this._offset;
      t4.set$top($.sub(t4.get$top(), ofs.get$top()));
    }catch (t5) {
      var t6 = $.unwrapException(t5);
      var e = t6;
      $.print('Faile to get offset for ' + $.stringToString(this) + ', ' + $.stringToString(e));
    }
  }
  return this._offset;
 },
 ViewEvent$dom$3: function(target, domEvent, type) {
  this.currentTarget = target;
  this._target = target;
  this._offset = $._Offset$2(0, 0);
 },
 ViewEvent$6: function(target, type, pageX, pageY, offsetX, offsetY) {
  if ($.eqNullB(type)) {
    throw $.captureStackTrace($.CTC6);
  }
  this.currentTarget = target;
  this._target = target;
  if (!(pageX === (void 0)) && !(pageY === (void 0))) {
    this._offset = $._Offset$2(pageX, pageY);
  } else {
    if (!(offsetX === (void 0))) {
      var t0 = offsetX;
    } else {
      t0 = 0;
    }
    if (!(offsetY === (void 0))) {
      var t1 = offsetY;
    } else {
      t1 = 0;
    }
    this._offset = $._Offset$2(t0, t1);
    this._offsetReady = true;
  }
 }
});

Isolate.$defineClass("_ViewEventListenerList", "Object", ["_type", "_lib9_ptr?"], {
 isEmpty$0: function() {
  return this._lib9_ptr.isEmpty$1(this._type);
 },
 remove$1: function(handler) {
  this._lib9_ptr.remove$2(this._type, handler);
  return this;
 },
 add$1: function(handler) {
  this._lib9_ptr.add$2(this._type, handler);
  return this;
 }
});

Isolate.$defineClass("_ViewEventListenerMap", "Object", ["_lib9_ptr?"], {
 _lib9_get$1: function(type) {
  var t0 = ({});
  t0.type_1 = type;
  return this._lnlist.putIfAbsent$2(t0.type_1, new $.Closure69(this, t0));
 },
 operator$index$1: function(type) {
  return this._lib9_get$1(type);
 }
});

Isolate.$defineClass("_ViewEvents", "_ViewEventListenerMap", ["_lnlist", "_lib9_ptr"], {
 get$unmount: function() {
  return this._lib9_get$1('unmount');
 },
 unmount$0: function() { return this.get$unmount().$call$0(); },
 get$mount: function() {
  return this._lib9_get$1('mount');
 },
 mount$0: function() { return this.get$mount().$call$0(); },
 get$layout: function() {
  return this._lib9_get$1('layout');
 },
 get$mouseUp: function() {
  return this._lib9_get$1('mouseUp');
 },
 get$mouseMove: function() {
  return this._lib9_get$1('mouseMove');
 },
 get$mouseDown: function() {
  return this._lib9_get$1('mouseDown');
 },
 get$keyDown: function() {
  return this._lib9_get$1('keyDown');
 }
});

Isolate.$defineClass("_BroadcastEvents", "_ViewEventListenerMap", ["_lnlist", "_lib9_ptr"], {
});

Isolate.$defineClass("_Broadcaster", "Object", ["_on", "_lib9_listeners"], {
 sendEvent$2: function(event$, type) {
  return this._lib9_listeners.send$2(event$, type);
 },
 sendEvent$1: function(event$) {
  return this.sendEvent$2(event$,(void 0))
},
 get$on: function() {
  return this._on;
 },
 _Broadcaster$0: function() {
  this._lib9_listeners = $._BroadcastListeners$1(this);
  this._on = $._BroadcastEvents$1(this._lib9_listeners);
 }
});

Isolate.$defineClass("_BroadcastListeners", "Object", ["_lib9_listeners", "_lib9_owner"], {
 send$2: function(event$, type) {
  var type0 = type;
  if ($.eqNullB(type)) {
    type0 = event$.get$type();
  }
  var ls = $.index(this._lib9_listeners, type0);
  var dispatched = false;
  if (!$.eqNullB(ls)) {
    for (var t0 = $.iterator($.List$from(ls)), dispatched0 = false; t0.hasNext$0() === true; dispatched0 = dispatched1) {
      var dispatched1 = dispatched0;
      t0.next$0().$call$1(event$);
      if (event$.isPropagationStopped$0() === true) {
        return true;
      }
      dispatched1 = true;
    }
    dispatched = dispatched0;
  }
  return dispatched;
 },
 remove$2: function(type, listener) {
  var ls = $.index(this._lib9_listeners, type);
  return !$.eqNullB(ls) && $.remove(ls, listener) === true;
 },
 add$2: function(type, listener) {
  if ($.eqNullB(listener)) {
    throw $.captureStackTrace($.CTC55);
  }
  $.add$1(this._lib9_listeners.putIfAbsent$2(type, new $.Closure76()), listener);
 },
 isEmpty$1: function(type) {
  var t0 = this._lib9_listeners === (void 0);
  var ls = (void 0);
  var t1 = t0;
  if (!t0) {
    var ls0 = $.index(this._lib9_listeners, type);
    var t2 = ls0 === (void 0);
    ls = ls0;
    t1 = t2;
  }
  return t1 || $.isEmpty(ls) === true;
 }
});

Isolate.$defineClass("PopupEvent", "ViewEvent", ["_source", "currentTarget", "_propStop", "_offsetReady", "_offset", "_stamp", "_type", "_domEvt", "_target"], {
 get$source: function() {
  return this._source;
 },
 source$1: function(arg0) { return this.get$source().$call$1(arg0); }
});

Isolate.$defineClass("LayoutManager", "RunOnceViewManager", ["_inLayout", "_imgWaits", "_layouts", "_ignoreSubviews", "_ignoreDetached", "_readyChecks", "_task", "_views", "_runQue"], {
 doLayout$2: function(mctx, view) {
  if (view.get$parent() === (void 0) && view.get$profile().get$anchorView() === (void 0)) {
    mctx.setWidthByProfile$2(view, new $.Closure12());
    mctx.setHeightByProfile$2(view, new $.Closure13());
    $._positionRoot(view);
  }
  this.getLayoutOfView$1(view).doLayout$2(mctx, view);
  view.onLayout$0();
 },
 handle_$1: function(view) {
  this._inLayout = $.add(this._inLayout, 1);
  try {
    this.doLayout$2($.MeasureContext$0(), view);
  } finally {
    this._inLayout = $.sub(this._inLayout, 1);
  }
 },
 flush$1: function(view) {
  if ($.isEmpty(this._imgWaits) === true) {
    $.RunOnceViewManager.prototype.flush$1.call(this, view);
  } else {
    if (!(view === (void 0))) {
      this.queue$1(view);
    }
  }
 },
 flush$0: function() {
  return this.flush$1((void 0))
},
 sizeUpdated$3: function(view, value, horizontal) {
  if (horizontal === true) {
    var nm = 'rk.layout.w';
  } else {
    nm = 'rk.layout.h';
  }
  if ($.gtB(this._inLayout, 0)) {
    $.indexSet(view.get$dataAttributes(), nm, value);
  } else {
    view.get$dataAttributes().remove$1(nm);
  }
 },
 getLayoutOfView$1: function(view) {
  var name$ = view.get$layout().get$type();
  var clayout = this.getLayout$1(name$);
  if ($.eqNullB(clayout)) {
    throw $.captureStackTrace($.UIException$1('Unknown layout, ' + $.stringToString(name$)));
  }
  return clayout;
 },
 getLayout$1: function(name$) {
  return $.index(this._layouts, name$);
 },
 addLayout$2: function(name$, clayout) {
  var old = $.index(this._layouts, name$);
  $.indexSet(this._layouts, name$, clayout);
  return old;
 },
 LayoutManager$0: function() {
  this.addLayout$2('linear', $.LinearLayout$0());
  var freeLayout = $.FreeLayout$0();
  this.addLayout$2('none', freeLayout);
  this.addLayout$2('', freeLayout);
 }
});

Isolate.$defineClass("MeasureContext", "Object", ["_borderWds", "heights?", "widths?"], {
 getHeightSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$1(this.getProfile$2(view, 'height'));
  $0:{
    var t0 = amtInf.type;
    if (1 === t0) {
      return amtInf.value;
    } else {
      if (0 === t0) {
        return $._getSetByApp(view, view.get$height(), 'rk.layout.h');
      }
    }
  }
 },
 getWidthSetByApp$1: function(view) {
  var amtInf = $.LayoutAmountInfo$1(this.getProfile$2(view, 'width'));
  $0:{
    var t0 = amtInf.type;
    if (1 === t0) {
      return amtInf.value;
    } else {
      if (0 === t0) {
        return $._getSetByApp(view, view.get$width(), 'rk.layout.w');
      }
    }
  }
 },
 _measureByContent$2: function(view, autowidth) {
  var t0 = ({});
  t0.view_1 = view;
  var t1 = autowidth === true;
  var orgwd = (void 0);
  var orghgh = (void 0);
  var orgspace = (void 0);
  var nodestyle = (void 0);
  if (t1) {
    var nodestyle0 = t0.view_1.get$node().get$style();
    var pos = nodestyle0.get$position();
    orgspace = (void 0);
    if (!$.eqB(pos, 'fixed') && !$.eqB(pos, 'static')) {
      var orgspace0 = nodestyle0.get$whiteSpace();
      orgspace = orgspace0;
      if (orgspace0 === (void 0)) {
        orgspace = '';
      }
      nodestyle0.set$whiteSpace('nowrap');
    }
    var orgwd0 = nodestyle0.get$width();
    var orghgh0 = nodestyle0.get$height();
    nodestyle0.set$width('');
    nodestyle0.set$height('');
    orgwd = orgwd0;
    orghgh = orghgh0;
    nodestyle = nodestyle0;
  }
  var qview = $.DOMQuery(t0.view_1);
  var size = $._Size$2(qview.get$outerWidth(), qview.get$outerHeight());
  if (!(orgspace === (void 0))) {
    nodestyle.set$whiteSpace(orgspace);
  }
  if (!(orgwd === (void 0)) && $.isEmpty(orgwd) !== true) {
    nodestyle.set$width(orgwd);
  }
  if (!(orghgh === (void 0)) && $.isEmpty(orghgh) !== true) {
    nodestyle.set$height(orghgh);
  }
  var parentInnerWidth = new $.Closure45(t0);
  var parentInnerHeight = new $.Closure46(t0);
  var limit = $._amountOf(t0.view_1.get$profile().get$maxWidth(), parentInnerWidth);
  if (t1 && $.gtB(size.width, $.browser.get$size().get$width()) || !(limit === (void 0)) && $.gtB(size.width, limit)) {
    if (!$.eqNullB(limit)) {
      var t2 = limit;
    } else {
      t2 = $.browser.get$size().get$width();
    }
    nodestyle.set$width($.px(t2));
    size.width = qview.get$outerWidth();
    size.height = qview.get$outerHeight();
  }
  var limit0 = $._amountOf(t0.view_1.get$profile().get$maxHeight(), parentInnerHeight);
  if (!(limit0 === (void 0)) && $.gtB(size.height, limit0)) {
    size.height = limit0;
  }
  var limit1 = $._amountOf(t0.view_1.get$profile().get$minWidth(), parentInnerWidth);
  if (!(limit1 === (void 0)) && $.ltB(size.width, limit1)) {
    size.width = limit1;
  }
  var limit2 = $._amountOf(t0.view_1.get$profile().get$minHeight(), parentInnerHeight);
  if (!(limit2 === (void 0)) && $.ltB(size.height, limit2)) {
    size.height = limit2;
  }
  $.indexSet(this.widths, t0.view_1, size.width);
  $.indexSet(this.heights, t0.view_1, size.height);
  return size;
 },
 measureHeightByContent$2: function(view, autowidth) {
  var hgh = $.index(this.heights, view);
  var t0 = hgh === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = this.heights.containsKey$1(view) === true;
  }
  if (t1) {
    var t2 = hgh;
  } else {
    t2 = this._measureByContent$2(view, autowidth).get$height();
  }
  return t2;
 },
 measureWidthByContent$2: function(view, autowidth) {
  var wd = $.index(this.widths, view);
  var t0 = wd === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = this.widths.containsKey$1(view) === true;
  }
  if (t1) {
    var t2 = wd;
  } else {
    t2 = this._measureByContent$2(view, autowidth).get$width();
  }
  return t2;
 },
 measureHeight$1: function(view) {
  return $.layoutManager.getLayoutOfView$1(view).measureHeight$2(this, view);
 },
 measureWidth$1: function(view) {
  return $.layoutManager.getLayoutOfView$1(view).measureWidth$2(this, view);
 },
 setHeightByProfile$2: function(view, height) {
  var amt = $.LayoutAmountInfo$1(this.getProfile$2(view, 'height'));
  $0:{
    var t0 = amt.type;
    if (1 === t0) {
      view.set$height(amt.value);
      break $0;
    } else {
      if (2 === t0) {
        view.set$height(height.$call$0());
        break $0;
      } else {
        if (3 === t0) {
          view.set$height($.toInt($.round($.mul(height.$call$0(), amt.value))));
          break $0;
        } else {
          if (0 === t0 || 4 === t0) {
            if ($.eqB(amt.type, 0) && !(this.getHeightSetByApp$1(view) === (void 0))) {
              break $0;
            }
            var hgh = view.measureHeight_$1(this);
            if (!$.eqNullB(hgh)) {
              view.set$height(hgh);
            }
            break $0;
          }
        }
      }
    }
  }
 },
 setWidthByProfile$2: function(view, width) {
  var amt = $.LayoutAmountInfo$1(this.getProfile$2(view, 'width'));
  $0:{
    var t0 = amt.type;
    if (1 === t0) {
      view.set$width(amt.value);
      break $0;
    } else {
      if (2 === t0) {
        view.set$width(width.$call$0());
        break $0;
      } else {
        if (3 === t0) {
          view.set$width($.toInt($.round($.mul(width.$call$0(), amt.value))));
          break $0;
        } else {
          if (0 === t0 || 4 === t0) {
            if ($.eqB(amt.type, 0) && !(this.getWidthSetByApp$1(view) === (void 0))) {
              break $0;
            }
            var wd = view.measureWidth_$1(this);
            if (!$.eqNullB(wd)) {
              view.set$width(wd);
            }
            break $0;
          }
        }
      }
    }
  }
 },
 getProfile$2: function(view, name$) {
  var v = view.get$profile().getPropertyValue$1(name$);
  var t0 = $.isEmpty(v) === true;
  var t1 = !t0;
  if (t0) {
    t1 = view.get$parent() === (void 0);
  }
  if (t1 || $.layoutManager.getLayoutOfView$1(view.get$parent()).isProfileInherited$0() !== true) {
    var t2 = v;
  } else {
    t2 = view.get$parent().get$layout().getPropertyValue$1(name$);
  }
  return t2;
 },
 getBorderWidth$1: function(view) {
  var v = $.index(this._borderWds, view);
  var v0 = v;
  if (v === (void 0)) {
    var t0 = this._borderWds;
    var v1 = $.DOMQuery(view.get$node()).get$borderWidth();
    $.indexSet(t0, view, v1);
    v0 = v1;
  }
  return v0;
 }
});

Isolate.$defineClass("FreeLayout", "Object", [], {
 doLayout$2: function(mctx, view) {
  var t0 = ({});
  t0.view_1 = view;
  if (!(t0.view_1.get$firstChild() === (void 0))) {
    var ar = $.AnchorRelation$1(t0.view_1);
    var innerWidth$ = new $.Closure55(t0);
    var innerHeight$ = new $.Closure56(t0);
    for (var t1 = $.iterator(ar.indeps); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      mctx.setWidthByProfile$2(t2, innerWidth$);
      mctx.setHeightByProfile$2(t2, innerHeight$);
    }
    ar.layoutAnchored$1(mctx);
    for (var t3 = $.iterator(t0.view_1.get$children()); t3.hasNext$0() === true; ) {
      t3.next$0().doLayout_$1(mctx);
    }
  }
 },
 isProfileInherited$0: function() {
  return false;
 },
 measureHeight$2: function(mctx, view) {
  var hgh = $.index(mctx.get$heights(), view);
  var t0 = hgh === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = mctx.get$heights().containsKey$1(view) === true;
  }
  if (t1) {
    return hgh;
  }
  var hgh0 = mctx.getHeightSetByApp$1(view);
  var hgh1 = hgh0;
  if (hgh0 === (void 0)) {
    var hgh2 = view.get$innerHeight();
    if (typeof hgh2 !== 'number') return this.measureHeight$2$bailout(mctx, view, 1, hgh2);
    for (var t2 = $.iterator(view.get$children()), hgh3 = hgh2; t2.hasNext$0() === true; hgh3 = hgh4) {
      var hgh4 = hgh3;
      var t3 = t2.next$0();
      hgh4 = hgh3;
      if (view.shallLayout_$1(t3) === true && $.eqNullB(t3.get$profile().get$anchorView())) {
        var subsz = t3.measureHeight_$1(mctx);
        var t4 = t3.get$top();
        if (!(subsz === (void 0))) {
          var t5 = subsz;
        } else {
          t5 = 0;
        }
        var subsz0 = $.add(t4, t5);
        hgh4 = hgh3;
        if ($.eqNullB(hgh3) || $.gtB(subsz0, hgh3)) {
          hgh4 = subsz0;
        }
      }
    }
    hgh1 = hgh3;
    if (!(hgh3 === (void 0))) {
      hgh1 = $.add(hgh3, $.shl(mctx.getBorderWidth$1(view), 1));
    }
  }
  $.indexSet(mctx.get$heights(), view, hgh1);
  return hgh1;
 },
 measureHeight$2$bailout: function(mctx, view, state, env0) {
  switch (state) {
    case 1:
      hgh2 = env0;
      break;
  }
  switch (state) {
    case 0:
      var hgh = $.index(mctx.get$heights(), view);
      var t0 = hgh === (void 0);
      var t1 = !t0;
      if (t0) {
        t1 = mctx.get$heights().containsKey$1(view) === true;
      }
      if (t1) {
        return hgh;
      }
      var hgh0 = mctx.getHeightSetByApp$1(view);
      var hgh1 = hgh0;
    case 1:
      if (state == 1 || (state == 0 && hgh0 === (void 0))) {
        switch (state) {
          case 0:
            var hgh2 = view.get$innerHeight();
          case 1:
            state = 0;
            var t2 = $.iterator(view.get$children());
            var hgh3 = hgh2;
            L0: while (true) {
              if (!(t2.hasNext$0() === true)) break L0;
              var hgh4 = hgh3;
              var t3 = t2.next$0();
              hgh4 = hgh3;
              if (view.shallLayout_$1(t3) === true && $.eqNullB(t3.get$profile().get$anchorView())) {
                var subsz = t3.measureHeight_$1(mctx);
                var t4 = t3.get$top();
                if (!(subsz === (void 0))) {
                  var t5 = subsz;
                } else {
                  t5 = 0;
                }
                var subsz0 = $.add(t4, t5);
                hgh4 = hgh3;
                if ($.eqNullB(hgh3) || $.gtB(subsz0, hgh3)) {
                  hgh4 = subsz0;
                }
              }
              hgh3 = hgh4;
            }
            hgh1 = hgh3;
            if (!(hgh3 === (void 0))) {
              hgh1 = $.add(hgh3, $.shl(mctx.getBorderWidth$1(view), 1));
            }
        }
      }
      $.indexSet(mctx.get$heights(), view, hgh1);
      return hgh1;
  }
 },
 measureWidth$2: function(mctx, view) {
  var wd = $.index(mctx.get$widths(), view);
  var t0 = wd === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = mctx.get$widths().containsKey$1(view) === true;
  }
  if (t1) {
    return wd;
  }
  var wd0 = mctx.getWidthSetByApp$1(view);
  var wd1 = wd0;
  if (wd0 === (void 0)) {
    var wd2 = view.get$innerWidth();
    if (typeof wd2 !== 'number') return this.measureWidth$2$bailout(mctx, view, 1, wd2);
    for (var t2 = $.iterator(view.get$children()), wd3 = wd2; t2.hasNext$0() === true; wd3 = wd4) {
      var wd4 = wd3;
      var t3 = t2.next$0();
      wd4 = wd3;
      if (view.shallLayout_$1(t3) === true && $.eqNullB(t3.get$profile().get$anchorView())) {
        var subsz = t3.measureWidth_$1(mctx);
        var t4 = t3.get$left();
        if (!(subsz === (void 0))) {
          var t5 = subsz;
        } else {
          t5 = 0;
        }
        var subsz0 = $.add(t4, t5);
        wd4 = wd3;
        if (wd3 === (void 0) || $.gtB(subsz0, wd3)) {
          wd4 = subsz0;
        }
      }
    }
    wd1 = wd3;
    if (!(wd3 === (void 0))) {
      wd1 = $.add(wd3, $.shl(mctx.getBorderWidth$1(view), 1));
    }
  }
  $.indexSet(mctx.get$widths(), view, wd1);
  return wd1;
 },
 measureWidth$2$bailout: function(mctx, view, state, env0) {
  switch (state) {
    case 1:
      wd2 = env0;
      break;
  }
  switch (state) {
    case 0:
      var wd = $.index(mctx.get$widths(), view);
      var t0 = wd === (void 0);
      var t1 = !t0;
      if (t0) {
        t1 = mctx.get$widths().containsKey$1(view) === true;
      }
      if (t1) {
        return wd;
      }
      var wd0 = mctx.getWidthSetByApp$1(view);
      var wd1 = wd0;
    case 1:
      if (state == 1 || (state == 0 && wd0 === (void 0))) {
        switch (state) {
          case 0:
            var wd2 = view.get$innerWidth();
          case 1:
            state = 0;
            var t2 = $.iterator(view.get$children());
            var wd3 = wd2;
            L0: while (true) {
              if (!(t2.hasNext$0() === true)) break L0;
              var wd4 = wd3;
              var t3 = t2.next$0();
              wd4 = wd3;
              if (view.shallLayout_$1(t3) === true && $.eqNullB(t3.get$profile().get$anchorView())) {
                var subsz = t3.measureWidth_$1(mctx);
                var t4 = t3.get$left();
                if (!(subsz === (void 0))) {
                  var t5 = subsz;
                } else {
                  t5 = 0;
                }
                var subsz0 = $.add(t4, t5);
                wd4 = wd3;
                if (wd3 === (void 0) || $.gtB(subsz0, wd3)) {
                  wd4 = subsz0;
                }
              }
              wd3 = wd4;
            }
            wd1 = wd3;
            if (!(wd3 === (void 0))) {
              wd1 = $.add(wd3, $.shl(mctx.getBorderWidth$1(view), 1));
            }
        }
      }
      $.indexSet(mctx.get$widths(), view, wd1);
      return wd1;
  }
 }
});

Isolate.$defineClass("LinearLayout", "Object", [], {
 doLayout$2: function(mctx, view) {
  if (!(view.get$firstChild() === (void 0))) {
    var ar = $.AnchorRelation$1(view);
    $._getRealLayout(view).doLayout$3(mctx, view, ar.indeps);
    ar.layoutAnchored$1(mctx);
    for (var t0 = $.iterator(view.get$children()); t0.hasNext$0() === true; ) {
      t0.next$0().doLayout_$1(mctx);
    }
  }
 },
 isProfileInherited$0: function() {
  return true;
 },
 measureHeight$2: function(mctx, view) {
  var height = $.index(mctx.get$heights(), view);
  var t0 = height === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = mctx.get$heights().containsKey$1(view) === true;
  }
  if (t1) {
    return height;
  }
  var t2 = mctx.get$heights();
  var t3 = $._getRealLayout(view).measureHeight$2(mctx, view);
  $.indexSet(t2, view, t3);
  return t3;
 },
 measureWidth$2: function(mctx, view) {
  var width = $.index(mctx.get$widths(), view);
  var t0 = width === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = mctx.get$widths().containsKey$1(view) === true;
  }
  if (t1) {
    return width;
  }
  var t2 = mctx.get$widths();
  var t3 = $._getRealLayout(view).measureWidth$2(mctx, view);
  $.indexSet(t2, view, t3);
  return t3;
 }
});

Isolate.$defineClass("_HLayout", "Object", [], {
 doLayout$3: function(mctx, view, children) {
  var t0 = ({});
  t0.view_1 = view;
  var innerWidth$ = new $.Closure51(t0);
  var spcinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$spacing(), 2, (void 0));
  var gapinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$gap(), (void 0), (void 0));
  var defpwd = t0.view_1.get$layout().get$width();
  var childspcinfs = $.HashMapImplementation$0();
  var flexViews = $.List((void 0));
  var flexs = $.List((void 0));
  for (var t1 = $.iterator(children), prevSpacing = (void 0), nflex = 0, assigned = 0; t1.hasNext$0() === true; prevSpacing = prevSpacing0, nflex = nflex0, assigned = assigned0) {
    var assigned0 = assigned;
    var prevSpacing0 = prevSpacing;
    var nflex0 = nflex;
    var t2 = t1.next$0();
    if (t0.view_1.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $.Closure52(t0));
      mctx.setHeightByProfile$2(t2, new $.Closure53(t0));
      assigned0 = assigned;
      prevSpacing0 = prevSpacing;
      nflex0 = nflex;
      continue;
    }
    var si = $.LayoutSideInfo$3(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing === (void 0)) {
      var t3 = si.left;
    } else {
      if (!(gapinf.left === (void 0))) {
        t3 = gapinf.left;
      } else {
        t3 = $.max(prevSpacing, si.left);
      }
    }
    var assigned1 = $.add(assigned, t3);
    var prevSpacing1 = si.right;
    var pwd = t2.get$profile().get$width();
    if ($.isEmpty(pwd) === true) {
      var t4 = defpwd;
    } else {
      t4 = pwd;
    }
    var amt = $.LayoutAmountInfo$1(t4);
    $1:{
      var t5 = amt.type;
      if (1 === t5) {
        var t6 = amt.value;
        t2.set$width(t6);
        var assigned2 = $.add(assigned1, t6);
        assigned0 = assigned2;
        nflex0 = nflex;
        break $1;
      } else {
        if (2 === t5) {
          var nflex1 = $.add(nflex, amt.value);
          flexs.push(amt.value);
          flexViews.push(t2);
          assigned0 = assigned1;
          nflex0 = nflex1;
          break $1;
        } else {
          if (3 === t5) {
            var t7 = $.toInt($.round($.mul(innerWidth$.$call$0(), amt.value)));
            t2.set$width(t7);
            var assigned3 = $.add(assigned1, t7);
            assigned0 = assigned3;
            nflex0 = nflex;
            break $1;
          } else {
            var wd = t2.measureWidth_$1(mctx);
            if (!$.eqNullB(wd)) {
              t2.set$width(wd);
              assigned0 = $.add(assigned1, wd);
            } else {
              assigned0 = $.add(assigned1, t2.get$outerWidth());
            }
            nflex0 = nflex;
            break $1;
          }
        }
      }
    }
    mctx.setHeightByProfile$2(t2, new $.Closure54(t0, si));
    prevSpacing0 = prevSpacing1;
  }
  if (nflex > 0) {
    var space = $.sub($.sub(innerWidth$.$call$0(), assigned), prevSpacing);
    if (typeof space !== 'number') return this.doLayout$3$bailout(mctx, view, children, 1, nflex, gapinf, t0, childspcinfs, flexViews, flexs, space);
    var per = space / nflex;
    for (var len = flexs.length - 1, space0 = space, j = 0; true; space0 = space1, j = j + 1) {
      var space1 = space0;
      if (j === len) {
        var t8 = flexViews.length;
        if (j < 0 || j >= t8) throw $.ioore(j);
        flexViews[j].set$width(space0);
        break;
      }
      var t9 = flexs.length;
      if (j < 0 || j >= t9) throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      var t10 = flexViews.length;
      if (j < 0 || j >= t10) throw $.ioore(j);
      flexViews[j].set$width(delta);
      space1 = $.sub(space0, delta);
    }
  }
  var defAlign = t0.view_1.get$layout().get$align();
  if (typeof defAlign !== 'string') return this.doLayout$3$bailout(mctx, view, children, 2, childspcinfs, gapinf, t0, defAlign);
  for (var t11 = $.iterator(children), assigned4 = 0, prevSpacing2 = (void 0); t11.hasNext$0() === true; assigned4 = assigned5, prevSpacing2 = prevSpacing3) {
    var prevSpacing3 = prevSpacing2;
    var assigned5 = assigned4;
    var t12 = t11.next$0();
    if (t0.view_1.shallLayout_$1(t12) !== true) {
      prevSpacing3 = prevSpacing2;
      assigned5 = assigned4;
      continue;
    }
    var si0 = childspcinfs.operator$index$1(t12);
    if (prevSpacing2 === (void 0)) {
      var t13 = si0.get$left();
    } else {
      if (!(gapinf.left === (void 0))) {
        t13 = gapinf.left;
      } else {
        t13 = $.max(prevSpacing2, si0.get$left());
      }
    }
    var assigned6 = $.add(assigned4, t13);
    t12.set$left(assigned6);
    var assigned7 = $.add(assigned6, t12.get$outerWidth());
    var prevSpacing4 = si0.get$right();
    var align = t12.get$profile().get$align();
    var align0 = align;
    if ($.isEmpty(align) === true) {
      align0 = defAlign;
    }
    var space2 = childspcinfs.operator$index$1(t12).get$top();
    $1:{
      if ('center' === align0 || 'end' === align0) {
        var delta0 = $.sub($.sub($.sub(t0.view_1.get$innerHeight(), si0.get$top()), si0.get$bottom()), t12.get$outerHeight());
        var delta1 = delta0;
        if ($.eqB(align0, 'center')) {
          delta1 = $.tdiv(delta0, 2);
        }
        t12.set$top($.add(space2, delta1));
        break $1;
      } else {
        t12.set$top(space2);
      }
    }
    prevSpacing3 = prevSpacing4;
    assigned5 = assigned7;
  }
 },
 doLayout$3$bailout: function(mctx, view, children, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      nflex = env0;
      gapinf = env1;
      t0 = env2;
      childspcinfs = env3;
      flexViews = env4;
      flexs = env5;
      space = env6;
      break;
    case 2:
      childspcinfs = env0;
      gapinf = env1;
      t0 = env2;
      defAlign = env3;
      break;
  }
  switch (state) {
    case 0:
      var t0 = ({});
      t0.view_1 = view;
      var innerWidth$ = new $.Closure51(t0);
      var spcinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$spacing(), 2, (void 0));
      var gapinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$gap(), (void 0), (void 0));
      var defpwd = t0.view_1.get$layout().get$width();
      var childspcinfs = $.HashMapImplementation$0();
      var flexViews = $.List((void 0));
      var flexs = $.List((void 0));
      var t1 = $.iterator(children);
      var prevSpacing = (void 0);
      var nflex = 0;
      var assigned = 0;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        c$0:{
          var assigned0 = assigned;
          var prevSpacing0 = prevSpacing;
          var nflex0 = nflex;
          var t2 = t1.next$0();
          if (t0.view_1.shallLayout_$1(t2) !== true) {
            mctx.setWidthByProfile$2(t2, new $.Closure52(t0));
            mctx.setHeightByProfile$2(t2, new $.Closure53(t0));
            assigned0 = assigned;
            prevSpacing0 = prevSpacing;
            nflex0 = nflex;
            break c$0;
          }
          var si = $.LayoutSideInfo$3(t2.get$profile().get$spacing(), 0, spcinf);
          childspcinfs.operator$indexSet$2(t2, si);
          if (prevSpacing === (void 0)) {
            var t3 = si.left;
          } else {
            if (!(gapinf.left === (void 0))) {
              t3 = gapinf.left;
            } else {
              t3 = $.max(prevSpacing, si.left);
            }
          }
          var assigned1 = $.add(assigned, t3);
          var prevSpacing1 = si.right;
          var pwd = t2.get$profile().get$width();
          if ($.isEmpty(pwd) === true) {
            var t4 = defpwd;
          } else {
            t4 = pwd;
          }
          var amt = $.LayoutAmountInfo$1(t4);
          $1:{
            var t5 = amt.type;
            if (1 === t5) {
              var t6 = amt.value;
              t2.set$width(t6);
              var assigned2 = $.add(assigned1, t6);
              assigned0 = assigned2;
              nflex0 = nflex;
              break $1;
            } else {
              if (2 === t5) {
                var nflex1 = $.add(nflex, amt.value);
                flexs.push(amt.value);
                flexViews.push(t2);
                assigned0 = assigned1;
                nflex0 = nflex1;
                break $1;
              } else {
                if (3 === t5) {
                  var t7 = $.toInt($.round($.mul(innerWidth$.$call$0(), amt.value)));
                  t2.set$width(t7);
                  var assigned3 = $.add(assigned1, t7);
                  assigned0 = assigned3;
                  nflex0 = nflex;
                  break $1;
                } else {
                  var wd = t2.measureWidth_$1(mctx);
                  if (!$.eqNullB(wd)) {
                    t2.set$width(wd);
                    assigned0 = $.add(assigned1, wd);
                  } else {
                    assigned0 = $.add(assigned1, t2.get$outerWidth());
                  }
                  nflex0 = nflex;
                  break $1;
                }
              }
            }
          }
          mctx.setHeightByProfile$2(t2, new $.Closure54(t0, si));
          prevSpacing0 = prevSpacing1;
        }
        prevSpacing = prevSpacing0;
        nflex = nflex0;
        assigned = assigned0;
      }
    case 1:
      if (state == 1 || (state == 0 && nflex > 0)) {
        switch (state) {
          case 0:
            var space = $.sub($.sub(innerWidth$.$call$0(), assigned), prevSpacing);
          case 1:
            state = 0;
            var per = $.div(space, nflex);
            var len = flexs.length - 1;
            var space0 = space;
            var j = 0;
            L1: while (true) {
              if (!true) break L1;
              var space1 = space0;
              if (j === len) {
                var t8 = flexViews.length;
                if (j < 0 || j >= t8) throw $.ioore(j);
                flexViews[j].set$width(space0);
                break;
              }
              var t9 = flexs.length;
              if (j < 0 || j >= t9) throw $.ioore(j);
              var delta = $.toInt($.round($.mul(per, flexs[j])));
              var t10 = flexViews.length;
              if (j < 0 || j >= t10) throw $.ioore(j);
              flexViews[j].set$width(delta);
              space1 = $.sub(space0, delta);
              space0 = space1;
              j = j + 1;
            }
        }
      }
      var defAlign = t0.view_1.get$layout().get$align();
    case 2:
      state = 0;
      var t11 = $.iterator(children);
      var assigned4 = 0;
      var prevSpacing2 = (void 0);
      L2: while (true) {
        if (!(t11.hasNext$0() === true)) break L2;
        c$0:{
          var prevSpacing3 = prevSpacing2;
          var assigned5 = assigned4;
          var t12 = t11.next$0();
          if (t0.view_1.shallLayout_$1(t12) !== true) {
            prevSpacing3 = prevSpacing2;
            assigned5 = assigned4;
            break c$0;
          }
          var si0 = childspcinfs.operator$index$1(t12);
          if (prevSpacing2 === (void 0)) {
            var t13 = si0.get$left();
          } else {
            if (!(gapinf.left === (void 0))) {
              t13 = gapinf.left;
            } else {
              t13 = $.max(prevSpacing2, si0.get$left());
            }
          }
          var assigned6 = $.add(assigned4, t13);
          t12.set$left(assigned6);
          var assigned7 = $.add(assigned6, t12.get$outerWidth());
          var prevSpacing4 = si0.get$right();
          var align = t12.get$profile().get$align();
          var align0 = align;
          if ($.isEmpty(align) === true) {
            align0 = defAlign;
          }
          var space2 = childspcinfs.operator$index$1(t12).get$top();
          $1:{
            if ('center' === align0 || 'end' === align0) {
              var delta0 = $.sub($.sub($.sub(t0.view_1.get$innerHeight(), si0.get$top()), si0.get$bottom()), t12.get$outerHeight());
              var delta1 = delta0;
              if ($.eqB(align0, 'center')) {
                delta1 = $.tdiv(delta0, 2);
              }
              t12.set$top($.add(space2, delta1));
              break $1;
            } else {
              t12.set$top(space2);
            }
          }
          prevSpacing3 = prevSpacing4;
          assigned5 = assigned7;
        }
        assigned4 = assigned5;
        prevSpacing2 = prevSpacing3;
      }
  }
 },
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va === (void 0))) {
    return va;
  }
  var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
  var defphgh = view.get$layout().get$height();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  if (borderWd !== (borderWd | 0)) return this.measureHeight$2$bailout(mctx, view, 1, spcinf, defphgh, borderWd);
  for (var t0 = $.iterator(view.get$children()), height = (void 0); t0.hasNext$0() === true; height = height0) {
    var height0 = height;
    var t1 = t0.next$0();
    var t2 = view.shallLayout_$1(t1) === true;
    var t3 = !t2;
    if (t2) {
      t3 = !(t1.get$profile().get$anchorView() === (void 0));
    }
    if (t3) {
      height0 = height;
      continue;
    }
    var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
    var hgh = $.add($.add(si.top, si.bottom), borderWd);
    var phgh = t1.get$profile().get$height();
    if ($.isEmpty(phgh) === true) {
      var t4 = defphgh;
    } else {
      t4 = phgh;
    }
    var amt = $.LayoutAmountInfo$1(t4);
    $1:{
      var t5 = amt.type;
      if (1 === t5) {
        var hgh0 = $.add(hgh, amt.value);
        break $1;
      } else {
        if (0 === t5 || 4 === t5) {
          var h = t1.measureHeight_$1(mctx);
          if (!$.eqNullB(h)) {
            var t6 = h;
          } else {
            t6 = t1.get$outerHeight();
          }
          hgh0 = $.add(hgh, t6);
          break $1;
        } else {
          height0 = height;
          continue;
        }
      }
    }
    height0 = height;
    if ($.eqNullB(height) || $.gtB(hgh0, height)) {
      height0 = hgh0;
    }
  }
  return height;
 },
 measureHeight$2$bailout: function(mctx, view, state, env0, env1, env2) {
  switch (state) {
    case 1:
      spcinf = env0;
      defphgh = env1;
      borderWd = env2;
      break;
  }
  switch (state) {
    case 0:
      var va = mctx.getHeightSetByApp$1(view);
      if (!(va === (void 0))) {
        return va;
      }
      var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
      var defphgh = view.get$layout().get$height();
      var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
    case 1:
      state = 0;
      var t0 = $.iterator(view.get$children());
      var height = (void 0);
      L0: while (true) {
        if (!(t0.hasNext$0() === true)) break L0;
        c$0:{
          var height0 = height;
          var t1 = t0.next$0();
          var t2 = view.shallLayout_$1(t1) === true;
          var t3 = !t2;
          if (t2) {
            t3 = !(t1.get$profile().get$anchorView() === (void 0));
          }
          if (t3) {
            height0 = height;
            break c$0;
          }
          var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
          var hgh = $.add($.add(si.top, si.bottom), borderWd);
          var phgh = t1.get$profile().get$height();
          if ($.isEmpty(phgh) === true) {
            var t4 = defphgh;
          } else {
            t4 = phgh;
          }
          var amt = $.LayoutAmountInfo$1(t4);
          $1:{
            var t5 = amt.type;
            if (1 === t5) {
              var hgh0 = $.add(hgh, amt.value);
              break $1;
            } else {
              if (0 === t5 || 4 === t5) {
                var h = t1.measureHeight_$1(mctx);
                if (!$.eqNullB(h)) {
                  var t6 = h;
                } else {
                  t6 = t1.get$outerHeight();
                }
                hgh0 = $.add(hgh, t6);
                break $1;
              } else {
                height0 = height;
                break c$0;
              }
            }
          }
          height0 = height;
          if ($.eqNullB(height) || $.gtB(hgh0, height)) {
            height0 = hgh0;
          }
        }
        height = height0;
      }
      return height;
  }
 },
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va === (void 0))) {
    return va;
  }
  var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
  var gapinf = $.LayoutSideInfo$3(view.get$layout().get$gap(), (void 0), (void 0));
  var defpwd = view.get$layout().get$width();
  for (var t0 = $.iterator(view.get$children()), width = 0, prevSpacing = (void 0); t0.hasNext$0() === true; width = width0, prevSpacing = prevSpacing0) {
    var prevSpacing0 = prevSpacing;
    var width0 = width;
    var t1 = t0.next$0();
    var t2 = view.shallLayout_$1(t1) === true;
    var t3 = !t2;
    if (t2) {
      t3 = !(t1.get$profile().get$anchorView() === (void 0));
    }
    if (t3) {
      prevSpacing0 = prevSpacing;
      width0 = width;
      continue;
    }
    var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing === (void 0)) {
      var t4 = si.left;
    } else {
      if (!(gapinf.left === (void 0))) {
        t4 = gapinf.left;
      } else {
        t4 = $.max(prevSpacing, si.left);
      }
    }
    var width1 = $.add(width, t4);
    var prevSpacing1 = si.right;
    var pwd = t1.get$profile().get$width();
    if ($.isEmpty(pwd) === true) {
      var t5 = defpwd;
    } else {
      t5 = pwd;
    }
    var amt = $.LayoutAmountInfo$1(t5);
    $1:{
      var t6 = amt.type;
      if (1 === t6) {
        width0 = $.add(width1, amt.value);
        break $1;
      } else {
        if (0 === t6 || 4 === t6) {
          var wd = t1.measureWidth_$1(mctx);
          if (!$.eqNullB(wd)) {
            var t7 = wd;
          } else {
            t7 = t1.get$outerWidth();
          }
          width0 = $.add(width1, t7);
          break $1;
        }
      }
      width0 = width1;
    }
    prevSpacing0 = prevSpacing1;
  }
  var t8 = $.mul(mctx.getBorderWidth$1(view), 2);
  if (!(prevSpacing === (void 0))) {
    var t9 = prevSpacing;
  } else {
    t9 = $.add(spcinf.left, spcinf.right);
  }
  return $.add(width, $.add(t8, t9));
 }
});

Isolate.$defineClass("_VLayout", "Object", [], {
 doLayout$3: function(mctx, view, children) {
  var t0 = ({});
  t0.view_1 = view;
  var innerHeight$ = new $.Closure41(t0);
  var spcinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$spacing(), 2, (void 0));
  var gapinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$gap(), (void 0), (void 0));
  var defphgh = t0.view_1.get$layout().get$height();
  var childspcinfs = $.HashMapImplementation$0();
  var flexViews = $.List((void 0));
  var flexs = $.List((void 0));
  for (var t1 = $.iterator(children), assigned = 0, nflex = 0, prevSpacing = (void 0); t1.hasNext$0() === true; assigned = assigned0, nflex = nflex0, prevSpacing = prevSpacing0) {
    var prevSpacing0 = prevSpacing;
    var assigned0 = assigned;
    var nflex0 = nflex;
    var t2 = t1.next$0();
    if (t0.view_1.shallLayout_$1(t2) !== true) {
      mctx.setWidthByProfile$2(t2, new $.Closure42(t0));
      mctx.setHeightByProfile$2(t2, new $.Closure43(t0));
      prevSpacing0 = prevSpacing;
      assigned0 = assigned;
      nflex0 = nflex;
      continue;
    }
    var si = $.LayoutSideInfo$3(t2.get$profile().get$spacing(), 0, spcinf);
    childspcinfs.operator$indexSet$2(t2, si);
    if (prevSpacing === (void 0)) {
      var t3 = si.top;
    } else {
      if (!(gapinf.top === (void 0))) {
        t3 = gapinf.top;
      } else {
        t3 = $.max(prevSpacing, si.top);
      }
    }
    var assigned1 = $.add(assigned, t3);
    var prevSpacing1 = si.bottom;
    var phgh = t2.get$profile().get$height();
    if ($.isEmpty(phgh) === true) {
      var t4 = defphgh;
    } else {
      t4 = phgh;
    }
    var amt = $.LayoutAmountInfo$1(t4);
    $1:{
      var t5 = amt.type;
      if (1 === t5) {
        var t6 = amt.value;
        t2.set$height(t6);
        var assigned2 = $.add(assigned1, t6);
        assigned0 = assigned2;
        nflex0 = nflex;
        break $1;
      } else {
        if (2 === t5) {
          var nflex1 = $.add(nflex, amt.value);
          flexs.push(amt.value);
          flexViews.push(t2);
          assigned0 = assigned1;
          nflex0 = nflex1;
          break $1;
        } else {
          if (3 === t5) {
            var t7 = $.toInt($.round($.mul(innerHeight$.$call$0(), amt.value)));
            t2.set$height(t7);
            var assigned3 = $.add(assigned1, t7);
            assigned0 = assigned3;
            nflex0 = nflex;
            break $1;
          } else {
            var hgh = t2.measureHeight_$1(mctx);
            if (!$.eqNullB(hgh)) {
              t2.set$height(hgh);
              assigned0 = $.add(assigned1, hgh);
            } else {
              assigned0 = $.add(assigned1, t2.get$outerHeight());
            }
            nflex0 = nflex;
            break $1;
          }
        }
      }
    }
    mctx.setWidthByProfile$2(t2, new $.Closure44(t0, si));
    prevSpacing0 = prevSpacing1;
  }
  if (nflex > 0) {
    var space = $.sub($.sub(innerHeight$.$call$0(), assigned), prevSpacing);
    if (typeof space !== 'number') return this.doLayout$3$bailout(mctx, view, children, 1, nflex, gapinf, t0, childspcinfs, flexViews, flexs, space);
    var per = space / nflex;
    for (var len = flexs.length - 1, space0 = space, j = 0; true; space0 = space1, j = j + 1) {
      var space1 = space0;
      if (j === len) {
        var t8 = flexViews.length;
        if (j < 0 || j >= t8) throw $.ioore(j);
        flexViews[j].set$height(space0);
        break;
      }
      var t9 = flexs.length;
      if (j < 0 || j >= t9) throw $.ioore(j);
      var delta = $.toInt($.round($.mul(per, flexs[j])));
      var t10 = flexViews.length;
      if (j < 0 || j >= t10) throw $.ioore(j);
      flexViews[j].set$height(delta);
      space1 = $.sub(space0, delta);
    }
  }
  var defAlign = t0.view_1.get$layout().get$align();
  if (typeof defAlign !== 'string') return this.doLayout$3$bailout(mctx, view, children, 2, childspcinfs, gapinf, t0, defAlign);
  for (var t11 = $.iterator(children), prevSpacing2 = (void 0), assigned4 = 0; t11.hasNext$0() === true; prevSpacing2 = prevSpacing3, assigned4 = assigned5) {
    var prevSpacing3 = prevSpacing2;
    var assigned5 = assigned4;
    var t12 = t11.next$0();
    if (t0.view_1.shallLayout_$1(t12) !== true) {
      prevSpacing3 = prevSpacing2;
      assigned5 = assigned4;
      continue;
    }
    var si0 = childspcinfs.operator$index$1(t12);
    if (prevSpacing2 === (void 0)) {
      var t13 = si0.get$top();
    } else {
      if (!(gapinf.top === (void 0))) {
        t13 = gapinf.top;
      } else {
        t13 = $.max(prevSpacing2, si0.get$top());
      }
    }
    var assigned6 = $.add(assigned4, t13);
    t12.set$top(assigned6);
    var assigned7 = $.add(assigned6, t12.get$outerHeight());
    var prevSpacing4 = si0.get$bottom();
    var align = t12.get$profile().get$align();
    var align0 = align;
    if ($.isEmpty(align) === true) {
      align0 = defAlign;
    }
    var space2 = childspcinfs.operator$index$1(t12).get$left();
    $1:{
      if ('center' === align0 || 'end' === align0) {
        var delta0 = $.sub($.sub($.sub(t0.view_1.get$innerWidth(), si0.get$left()), si0.get$right()), t12.get$outerWidth());
        var delta1 = delta0;
        if ($.eqB(align0, 'center')) {
          delta1 = $.tdiv(delta0, 2);
        }
        t12.set$left($.add(space2, delta1));
        break $1;
      } else {
        t12.set$left(space2);
      }
    }
    prevSpacing3 = prevSpacing4;
    assigned5 = assigned7;
  }
 },
 doLayout$3$bailout: function(mctx, view, children, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      nflex = env0;
      gapinf = env1;
      t0 = env2;
      childspcinfs = env3;
      flexViews = env4;
      flexs = env5;
      space = env6;
      break;
    case 2:
      childspcinfs = env0;
      gapinf = env1;
      t0 = env2;
      defAlign = env3;
      break;
  }
  switch (state) {
    case 0:
      var t0 = ({});
      t0.view_1 = view;
      var innerHeight$ = new $.Closure41(t0);
      var spcinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$spacing(), 2, (void 0));
      var gapinf = $.LayoutSideInfo$3(t0.view_1.get$layout().get$gap(), (void 0), (void 0));
      var defphgh = t0.view_1.get$layout().get$height();
      var childspcinfs = $.HashMapImplementation$0();
      var flexViews = $.List((void 0));
      var flexs = $.List((void 0));
      var t1 = $.iterator(children);
      var assigned = 0;
      var nflex = 0;
      var prevSpacing = (void 0);
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        c$0:{
          var prevSpacing0 = prevSpacing;
          var assigned0 = assigned;
          var nflex0 = nflex;
          var t2 = t1.next$0();
          if (t0.view_1.shallLayout_$1(t2) !== true) {
            mctx.setWidthByProfile$2(t2, new $.Closure42(t0));
            mctx.setHeightByProfile$2(t2, new $.Closure43(t0));
            prevSpacing0 = prevSpacing;
            assigned0 = assigned;
            nflex0 = nflex;
            break c$0;
          }
          var si = $.LayoutSideInfo$3(t2.get$profile().get$spacing(), 0, spcinf);
          childspcinfs.operator$indexSet$2(t2, si);
          if (prevSpacing === (void 0)) {
            var t3 = si.top;
          } else {
            if (!(gapinf.top === (void 0))) {
              t3 = gapinf.top;
            } else {
              t3 = $.max(prevSpacing, si.top);
            }
          }
          var assigned1 = $.add(assigned, t3);
          var prevSpacing1 = si.bottom;
          var phgh = t2.get$profile().get$height();
          if ($.isEmpty(phgh) === true) {
            var t4 = defphgh;
          } else {
            t4 = phgh;
          }
          var amt = $.LayoutAmountInfo$1(t4);
          $1:{
            var t5 = amt.type;
            if (1 === t5) {
              var t6 = amt.value;
              t2.set$height(t6);
              var assigned2 = $.add(assigned1, t6);
              assigned0 = assigned2;
              nflex0 = nflex;
              break $1;
            } else {
              if (2 === t5) {
                var nflex1 = $.add(nflex, amt.value);
                flexs.push(amt.value);
                flexViews.push(t2);
                assigned0 = assigned1;
                nflex0 = nflex1;
                break $1;
              } else {
                if (3 === t5) {
                  var t7 = $.toInt($.round($.mul(innerHeight$.$call$0(), amt.value)));
                  t2.set$height(t7);
                  var assigned3 = $.add(assigned1, t7);
                  assigned0 = assigned3;
                  nflex0 = nflex;
                  break $1;
                } else {
                  var hgh = t2.measureHeight_$1(mctx);
                  if (!$.eqNullB(hgh)) {
                    t2.set$height(hgh);
                    assigned0 = $.add(assigned1, hgh);
                  } else {
                    assigned0 = $.add(assigned1, t2.get$outerHeight());
                  }
                  nflex0 = nflex;
                  break $1;
                }
              }
            }
          }
          mctx.setWidthByProfile$2(t2, new $.Closure44(t0, si));
          prevSpacing0 = prevSpacing1;
        }
        assigned = assigned0;
        nflex = nflex0;
        prevSpacing = prevSpacing0;
      }
    case 1:
      if (state == 1 || (state == 0 && nflex > 0)) {
        switch (state) {
          case 0:
            var space = $.sub($.sub(innerHeight$.$call$0(), assigned), prevSpacing);
          case 1:
            state = 0;
            var per = $.div(space, nflex);
            var len = flexs.length - 1;
            var space0 = space;
            var j = 0;
            L1: while (true) {
              if (!true) break L1;
              var space1 = space0;
              if (j === len) {
                var t8 = flexViews.length;
                if (j < 0 || j >= t8) throw $.ioore(j);
                flexViews[j].set$height(space0);
                break;
              }
              var t9 = flexs.length;
              if (j < 0 || j >= t9) throw $.ioore(j);
              var delta = $.toInt($.round($.mul(per, flexs[j])));
              var t10 = flexViews.length;
              if (j < 0 || j >= t10) throw $.ioore(j);
              flexViews[j].set$height(delta);
              space1 = $.sub(space0, delta);
              space0 = space1;
              j = j + 1;
            }
        }
      }
      var defAlign = t0.view_1.get$layout().get$align();
    case 2:
      state = 0;
      var t11 = $.iterator(children);
      var prevSpacing2 = (void 0);
      var assigned4 = 0;
      L2: while (true) {
        if (!(t11.hasNext$0() === true)) break L2;
        c$0:{
          var prevSpacing3 = prevSpacing2;
          var assigned5 = assigned4;
          var t12 = t11.next$0();
          if (t0.view_1.shallLayout_$1(t12) !== true) {
            prevSpacing3 = prevSpacing2;
            assigned5 = assigned4;
            break c$0;
          }
          var si0 = childspcinfs.operator$index$1(t12);
          if (prevSpacing2 === (void 0)) {
            var t13 = si0.get$top();
          } else {
            if (!(gapinf.top === (void 0))) {
              t13 = gapinf.top;
            } else {
              t13 = $.max(prevSpacing2, si0.get$top());
            }
          }
          var assigned6 = $.add(assigned4, t13);
          t12.set$top(assigned6);
          var assigned7 = $.add(assigned6, t12.get$outerHeight());
          var prevSpacing4 = si0.get$bottom();
          var align = t12.get$profile().get$align();
          var align0 = align;
          if ($.isEmpty(align) === true) {
            align0 = defAlign;
          }
          var space2 = childspcinfs.operator$index$1(t12).get$left();
          $1:{
            if ('center' === align0 || 'end' === align0) {
              var delta0 = $.sub($.sub($.sub(t0.view_1.get$innerWidth(), si0.get$left()), si0.get$right()), t12.get$outerWidth());
              var delta1 = delta0;
              if ($.eqB(align0, 'center')) {
                delta1 = $.tdiv(delta0, 2);
              }
              t12.set$left($.add(space2, delta1));
              break $1;
            } else {
              t12.set$left(space2);
            }
          }
          prevSpacing3 = prevSpacing4;
          assigned5 = assigned7;
        }
        prevSpacing2 = prevSpacing3;
        assigned4 = assigned5;
      }
  }
 },
 measureWidth$2: function(mctx, view) {
  var va = mctx.getWidthSetByApp$1(view);
  if (!(va === (void 0))) {
    return va;
  }
  var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
  var defpwd = view.get$layout().get$width();
  var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
  if (borderWd !== (borderWd | 0)) return this.measureWidth$2$bailout(mctx, view, 1, spcinf, defpwd, borderWd);
  for (var t0 = $.iterator(view.get$children()), width = (void 0); t0.hasNext$0() === true; width = width0) {
    var width0 = width;
    var t1 = t0.next$0();
    var t2 = view.shallLayout_$1(t1) === true;
    var t3 = !t2;
    if (t2) {
      t3 = !(t1.get$profile().get$anchorView() === (void 0));
    }
    if (t3) {
      width0 = width;
      continue;
    }
    var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
    var wd = $.add($.add(si.left, si.right), borderWd);
    var pwd = t1.get$profile().get$width();
    if ($.isEmpty(pwd) === true) {
      var t4 = defpwd;
    } else {
      t4 = pwd;
    }
    var amt = $.LayoutAmountInfo$1(t4);
    $1:{
      var t5 = amt.type;
      if (1 === t5) {
        var wd0 = $.add(wd, amt.value);
        break $1;
      } else {
        if (0 === t5 || 4 === t5) {
          var w = t1.measureWidth_$1(mctx);
          if (!$.eqNullB(w)) {
            var t6 = w;
          } else {
            t6 = t1.get$outerWidth();
          }
          wd0 = $.add(wd, t6);
          break $1;
        } else {
          width0 = width;
          continue;
        }
      }
    }
    width0 = width;
    if ($.eqNullB(width) || $.gtB(wd0, width)) {
      width0 = wd0;
    }
  }
  return width;
 },
 measureWidth$2$bailout: function(mctx, view, state, env0, env1, env2) {
  switch (state) {
    case 1:
      spcinf = env0;
      defpwd = env1;
      borderWd = env2;
      break;
  }
  switch (state) {
    case 0:
      var va = mctx.getWidthSetByApp$1(view);
      if (!(va === (void 0))) {
        return va;
      }
      var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
      var defpwd = view.get$layout().get$width();
      var borderWd = $.shl(mctx.getBorderWidth$1(view), 1);
    case 1:
      state = 0;
      var t0 = $.iterator(view.get$children());
      var width = (void 0);
      L0: while (true) {
        if (!(t0.hasNext$0() === true)) break L0;
        c$0:{
          var width0 = width;
          var t1 = t0.next$0();
          var t2 = view.shallLayout_$1(t1) === true;
          var t3 = !t2;
          if (t2) {
            t3 = !(t1.get$profile().get$anchorView() === (void 0));
          }
          if (t3) {
            width0 = width;
            break c$0;
          }
          var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
          var wd = $.add($.add(si.left, si.right), borderWd);
          var pwd = t1.get$profile().get$width();
          if ($.isEmpty(pwd) === true) {
            var t4 = defpwd;
          } else {
            t4 = pwd;
          }
          var amt = $.LayoutAmountInfo$1(t4);
          $1:{
            var t5 = amt.type;
            if (1 === t5) {
              var wd0 = $.add(wd, amt.value);
              break $1;
            } else {
              if (0 === t5 || 4 === t5) {
                var w = t1.measureWidth_$1(mctx);
                if (!$.eqNullB(w)) {
                  var t6 = w;
                } else {
                  t6 = t1.get$outerWidth();
                }
                wd0 = $.add(wd, t6);
                break $1;
              } else {
                width0 = width;
                break c$0;
              }
            }
          }
          width0 = width;
          if ($.eqNullB(width) || $.gtB(wd0, width)) {
            width0 = wd0;
          }
        }
        width = width0;
      }
      return width;
  }
 },
 measureHeight$2: function(mctx, view) {
  var va = mctx.getHeightSetByApp$1(view);
  if (!(va === (void 0))) {
    return va;
  }
  var spcinf = $.LayoutSideInfo$3(view.get$layout().get$spacing(), 2, (void 0));
  var gapinf = $.LayoutSideInfo$3(view.get$layout().get$gap(), (void 0), (void 0));
  var defphgh = view.get$layout().get$height();
  for (var t0 = $.iterator(view.get$children()), height = 0, prevSpacing = (void 0); t0.hasNext$0() === true; height = height0, prevSpacing = prevSpacing0) {
    var height0 = height;
    var prevSpacing0 = prevSpacing;
    var t1 = t0.next$0();
    var t2 = view.shallLayout_$1(t1) === true;
    var t3 = !t2;
    if (t2) {
      t3 = !(t1.get$profile().get$anchorView() === (void 0));
    }
    if (t3) {
      height0 = height;
      prevSpacing0 = prevSpacing;
      continue;
    }
    var si = $.LayoutSideInfo$3(t1.get$profile().get$spacing(), 0, spcinf);
    if (prevSpacing === (void 0)) {
      var t4 = si.top;
    } else {
      if (!(gapinf.top === (void 0))) {
        t4 = gapinf.top;
      } else {
        t4 = $.max(prevSpacing, si.top);
      }
    }
    var height1 = $.add(height, t4);
    var prevSpacing1 = si.bottom;
    var phgh = t1.get$profile().get$height();
    if ($.isEmpty(phgh) === true) {
      var t5 = defphgh;
    } else {
      t5 = phgh;
    }
    var amt = $.LayoutAmountInfo$1(t5);
    $1:{
      var t6 = amt.type;
      if (1 === t6) {
        height0 = $.add(height1, amt.value);
        break $1;
      } else {
        if (0 === t6 || 4 === t6) {
          var hgh = t1.measureHeight_$1(mctx);
          if (!$.eqNullB(hgh)) {
            var t7 = hgh;
          } else {
            t7 = t1.get$outerHeight();
          }
          height0 = $.add(height1, t7);
          break $1;
        }
      }
      height0 = height1;
    }
    prevSpacing0 = prevSpacing1;
  }
  var t8 = $.mul(mctx.getBorderWidth$1(view), 2);
  if (!(prevSpacing === (void 0))) {
    var t9 = prevSpacing;
  } else {
    t9 = $.add(spcinf.top, spcinf.bottom);
  }
  return $.add(height, $.add(t8, t9));
 }
});

Isolate.$defineClass("AnchorRelation", "Object", ["parent?", "anchored", "indeps"], {
 _layoutAnchored$2: function(mctx, anchor) {
  var t0 = ({});
  t0.anchor_1 = anchor;
  var views = $.index(this.anchored, t0.anchor_1);
  if (!(views === (void 0)) && $.isEmpty(views) !== true) {
    var anchorOuterWidth = new $.Closure27(t0);
    var anchorOuterHeight = new $.Closure28(t0);
    var anchorInnerWidth = new $.Closure29(t0);
    var anchorInnerHeight = new $.Closure30(t0);
    for (var t1 = $.iterator(views); t1.hasNext$0() === true; ) {
      var t2 = t1.next$0();
      if (t0.anchor_1 === t2.get$parent()) {
        var t3 = anchorInnerWidth;
      } else {
        t3 = anchorOuterWidth;
      }
      mctx.setWidthByProfile$2(t2, t3);
      if (t0.anchor_1 === t2.get$parent()) {
        var t4 = anchorInnerHeight;
      } else {
        t4 = anchorOuterHeight;
      }
      mctx.setHeightByProfile$2(t2, t4);
      var handlers = $._getHandlers(t2.get$profile().get$location());
      var offset = $._getOffset(t0.anchor_1, t2);
      $.index($._anchorXHandlers(), $.index(handlers, 0)).$call$3(offset.get$left(), t0.anchor_1, t2);
      $.index($._anchorYHandlers(), $.index(handlers, 1)).$call$3(offset.get$top(), t0.anchor_1, t2);
    }
    for (var t5 = $.iterator(views); t5.hasNext$0() === true; ) {
      this._layoutAnchored$2(mctx, t5.next$0());
    }
  }
 },
 layoutAnchored$1: function(mctx) {
  this._layoutAnchored$2(mctx, this.parent);
  for (var t0 = $.iterator(this.indeps); t0.hasNext$0() === true; ) {
    this._layoutAnchored$2(mctx, t0.next$0());
  }
 },
 AnchorRelation$1: function(view) {
  for (var t0 = $.iterator(view.get$children()); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var av = t1.get$profile().get$anchorView();
    if ($.eqNullB(av)) {
      $.add$1(this.indeps, t1);
    } else {
      if (!(av.get$parent() === view) && !(av === view)) {
        throw $.captureStackTrace($.UIException$1('Anchor can be parent or sibling, not ' + $.stringToString(av)));
      }
      var deps = $.index(this.anchored, av);
      var deps0 = deps;
      if ($.eqNullB(deps)) {
        var t2 = this.anchored;
        var deps1 = $.List((void 0));
        $.indexSet(t2, av, deps1);
        deps0 = deps1;
      }
      $.add$1(deps0, t1);
    }
  }
 }
});

Isolate.$defineClass("_AnchorOfRoot", "Object", [], {
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
});

Isolate.$defineClass("LayoutAmountInfo", "Object", ["value=", "type="], {
 toString$0: function() {
  return '' + $.stringToString(this.type) + ':' + $.stringToString(this.value);
 },
 LayoutAmountInfo$1: function(profile) {
  if ($.eqNullB(profile) || $.isEmpty(profile) === true) {
    this.type = 0;
  } else {
    if ($.eqB(profile, 'content')) {
      this.type = 4;
    } else {
      if ($.startsWith(profile, 'flex') === true) {
        this.type = 2;
        if ($.gtB($.get$length(profile), 4)) {
          var t0 = $.parseInt($.trim($.substring$1(profile, 4)));
        } else {
          t0 = 1;
        }
        this.value = t0;
        if ($.ltB(this.value, 1)) {
          this.value = 1;
        }
      } else {
        if ($.endsWith(profile, '%') === true) {
          this.type = 3;
          this.value = $.div($.parseDouble($.trim($.substring$2(profile, 0, $.sub($.get$length(profile), 1)))), 100);
        } else {
          this.type = 1;
          this.value = $.intOf(profile, true);
        }
      }
    }
  }
 }
});

Isolate.$defineClass("LayoutSideInfo", "Object", ["right?", "left=", "bottom?", "top="], {
 toString$0: function() {
  return '(' + $.stringToString(this.left) + ',' + $.stringToString(this.top) + ':' + $.stringToString(this.right) + ',' + $.stringToString(this.bottom) + ')';
 },
 LayoutSideInfo$3: function(profile, defaultValue, defaultInfo) {
  if (!$.eqNullB(profile) && $.isEmpty(profile) !== true) {
    var wds = [];
    for (var t0 = $.iterator($.CTC39.allMatches$1(profile)); t0.hasNext$0() === true; ) {
      $.add$1(wds, $.parseInt(t0.next$0().group$1(0)));
    }
    $0:{
      var t1 = wds.length;
      if (0 === t1) {
        break $0;
      } else {
        if (1 === t1) {
          var t2 = wds.length;
          if (0 >= t2) throw $.ioore(0);
          var t3 = wds[0];
          this.right = t3;
          this.left = t3;
          this.bottom = t3;
          this.top = t3;
          return;
        } else {
          if (2 === t1) {
            var t4 = wds.length;
            if (0 >= t4) throw $.ioore(0);
            var t5 = wds[0];
            this.bottom = t5;
            this.top = t5;
            var t6 = wds.length;
            if (1 >= t6) throw $.ioore(1);
            var t7 = wds[1];
            this.right = t7;
            this.left = t7;
            return;
          } else {
            if (3 === t1) {
              var t8 = wds.length;
              if (0 >= t8) throw $.ioore(0);
              this.top = wds[0];
              var t9 = wds.length;
              if (1 >= t9) throw $.ioore(1);
              var t10 = wds[1];
              this.right = t10;
              this.left = t10;
              var t11 = wds.length;
              if (2 >= t11) throw $.ioore(2);
              this.bottom = wds[2];
              return;
            } else {
              var t12 = wds.length;
              if (0 >= t12) throw $.ioore(0);
              this.top = wds[0];
              var t13 = wds.length;
              if (1 >= t13) throw $.ioore(1);
              this.right = wds[1];
              var t14 = wds.length;
              if (2 >= t14) throw $.ioore(2);
              this.bottom = wds[2];
              var t15 = wds.length;
              if (3 >= t15) throw $.ioore(3);
              this.left = wds[3];
              return;
            }
          }
        }
      }
    }
  }
  if (!$.eqNullB(defaultInfo)) {
    this.top = defaultInfo.get$top();
    this.bottom = defaultInfo.get$bottom();
    this.left = defaultInfo.get$left();
    this.right = defaultInfo.get$right();
  } else {
    if (!(defaultValue === (void 0))) {
      this.right = defaultValue;
      this.left = defaultValue;
      this.bottom = defaultValue;
      this.top = defaultValue;
    }
  }
 }
});

Isolate.$defineClass("CSSStyleDeclarationImpl", "Object", ["_pcss", "_view"], {
 _unwrap$1: function(value) {
  if (!(value === (void 0))) {
    var t0 = value;
  } else {
    t0 = '';
  }
  return t0;
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
  if (!(this._pcss === (void 0))) {
    var t0 = $.get$length(this._pcss);
  } else {
    t0 = 0;
  }
  return t0;
 },
 set$cssText: function(value) {
  var t0 = this._pcss === (void 0);
  var t1 = !t0;
  if (t0) {
    t1 = !(value === (void 0)) && $.isEmpty(value) !== true;
  }
  if (t1) {
    this.get$_css().set$cssText(value);
  }
  if (!(this._view === (void 0)) && this._view.get$inDocument() === true) {
    this._view.get$node().get$style().set$cssText(value);
  }
 },
 get$cssText: function() {
  if (!(this._pcss === (void 0))) {
    var t0 = this._pcss.get$cssText();
  } else {
    t0 = '';
  }
  return t0;
 },
 setProperty$3: function(propertyName, value, priority) {
  $._check(propertyName);
  var propertyName0 = $.name(propertyName);
  if (priority === (void 0)) {
    this.get$_css().setProperty$2(propertyName0, value);
    if (!(this._view === (void 0)) && this._view.get$inDocument() === true) {
      this._view.get$node().get$style().setProperty$2(propertyName0, value);
    }
  } else {
    this.get$_css().setProperty$3(propertyName0, value, priority);
    if (!(this._view === (void 0)) && this._view.get$inDocument() === true) {
      this._view.get$node().get$style().setProperty$3(propertyName0, value, priority);
    }
  }
 },
 setProperty$2: function(propertyName,value) {
  return this.setProperty$3(propertyName,value,(void 0))
},
 getPropertyValue$1: function(propertyName) {
  $._check(propertyName);
  if (!(this._pcss === (void 0))) {
    var t0 = this._unwrap$1(this._pcss.getPropertyValue$1($.name(propertyName)));
  } else {
    t0 = '';
  }
  return t0;
 },
 get$_css: function() {
  if (this._pcss === (void 0)) {
    this._pcss = $.CSSStyleDeclaration();
  }
  return this._pcss;
 }
});

Isolate.$defineClass("DeclarationImpl", "Object", [], {
 setProperty$2: function(propertyName, value) {
  if (value === (void 0) || $.isEmpty(value) === true) {
    this.removeProperty$1(propertyName);
  } else {
    $.indexSet(this._props, propertyName, $.trim(value));
  }
 },
 removeProperty$1: function(propertyName) {
  this._props.remove$1(propertyName);
 },
 getPropertyValue$1: function(propertyName) {
  var value = $.index(this._props, propertyName);
  if (!(value === (void 0))) {
    var t0 = value;
  } else {
    t0 = '';
  }
  return t0;
 },
 set$text: function(text) {
  $.clear(this._props);
  for (var t0 = $.iterator($.split(text, ';')); t0.hasNext$0() === true; ) {
    var pair = $.trim(t0.next$0());
    if ($.isEmpty(pair) === true) {
      continue;
    }
    var j = $.indexOf$1(pair, ':');
    if ($.gtB(j, 0)) {
      var key = $.trim($.substring$2(pair, 0, j));
      var value = $.trim($.substring$1(pair, $.add(j, 1)));
      if ($.isEmpty(key) !== true) {
        this.setProperty$2(key, value);
        continue;
      }
    }
    throw $.captureStackTrace($.UIException$1('Unknown declaration: ' + $.stringToString(pair)));
  }
 }
});

Isolate.$defineClass("LayoutDeclarationImpl", "DeclarationImpl", ["_lib3_owner", "_props"], {
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
});

Isolate.$defineClass("ProfileDeclarationImpl", "DeclarationImpl", ["_anchorView", "_lib3_owner", "_props"], {
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
 get$location: function() {
  return this.getPropertyValue$1('location');
 },
 get$anchorView: function() {
  if (!(this._anchorView === (void 0))) {
    var t0 = this._anchorView;
  } else {
    t0 = this._lib3_owner.query$1(this.get$anchor());
  }
  return t0;
 },
 get$anchor: function() {
  return this.getPropertyValue$1('anchor');
 }
});

Isolate.$defineClass("RunOnceViewManager", "Object", [], {
 _lib3_ready$1: function(view) {
  var t0 = ({});
  t0.view_1 = view;
  if ($.isEmpty(this._readyChecks) !== true) {
    var continueTask = new $.Closure6(this, t0);
    for (var t1 = $.iterator(this._readyChecks); t1.hasNext$0() === true; ) {
      if (t1.next$0().$call$2(t0.view_1, continueTask) !== true) {
        return false;
      }
    }
  }
  return true;
 },
 _flushOne$1: function(view) {
  this._views.remove$1(view);
  var t0 = this._ignoreDetached === true;
  var t1 = !t0;
  if (t0) {
    t1 = view.get$inDocument() === true;
  }
  if (t1) {
    for (var v = view; v0 = v.get$parent(), !(v0 === (void 0)); v = v0) {
      if ($.contains$1(this._views, v0) === true) {
        return;
      }
    }
    if (this._ignoreSubviews === true) {
      for (var t2 = $.iterator(this._views); t2.hasNext$0() === true; ) {
        var t3 = t2.next$0();
        if (t3.isDescendantOf$1(view) === true) {
          this._views.remove$1(t3);
        }
      }
    }
    this.handle_$1(view);
  }
  var v0;
 },
 _flushAll$0: function() {
  for (var t0 = $.iterator(this._views); t0.hasNext$0() === true; ) {
    var v = t0.next$0();
    if (this._ignoreDetached === true && v.get$inDocument() !== true) {
      this._views.remove$1(v);
      continue;
    }
    if (this._ignoreSubviews === true) {
      for (var v0 = v; v1 = v0.get$parent(), !(v1 === (void 0)); v0 = v1) {
        if ($.contains$1(this._views, v1) === true) {
          this._views.remove$1(v);
          break;
        }
      }
    }
  }
  var todo = $.List$from(this._views);
  $.clear(this._views);
  for (var t1 = $.iterator(todo); t1.hasNext$0() === true; ) {
    this.handle_$1(t1.next$0());
  }
  var v1;
 },
 handle_$1: function(view) {
  this._task$1(view);
 },
 flush$1: function(view) {
  if (this._lib3_ready$1(view) !== true) {
    if (!(view === (void 0))) {
      $.add$1(this._views, view);
    }
  } else {
    if (!(view === (void 0))) {
      this._flushOne$1(view);
    } else {
      this._flushAll$0();
    }
  }
 },
 flush$0: function() {
  return this.flush$1((void 0))
},
 queue$1: function(view) {
  $.add$1(this._views, view);
  this._runQue.add$3('', new $.Closure7(this), 5);
 },
 _task$1: function(arg0) { return this._task.$call$1(arg0); }
});

Isolate.$defineClass("ViewConfig", "Object", ["uuidPrefix?", "classPrefix?"], {
 ViewConfig$0: function() {
  var appid = $.application().get$uuid();
  if ($.gtB(appid, 0)) {
    this.uuidPrefix = '' + $.stringToString($.encodeId(appid, 'v')) + '_';
  }
 }
});

Isolate.$defineClass("Token", "Object", ["end", "start?", "type?"], {
 toString$0: function() {
  return '' + $.stringToString(this.type);
 },
 extend$0: function() {
  var t0 = this.end;
  this.end = $.add(t0, 1);
  return t0;
 },
 source$1: function(src) {
  return $.substring$2(src, this.start, this.end);
 }
});

Isolate.$defineClass("ViewMatchContext", "Object", ["_qualified?", "viewChildIndex", "view?", "parent?"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var t0 = $.iterator(this._qualified); t0.hasNext$0() === true; ) {
    sb.add$1(t0.next$0());
  }
  return $.toString(sb.add$1(' @' + $.stringToString(this.view)));
 },
 matchPseudoClasses$1: function(pseudoClasses) {
  if ($.eqNullB(pseudoClasses) || $.isEmpty(pseudoClasses) === true) {
    return true;
  }
  for (var t0 = $.iterator(pseudoClasses); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var accept = $.getDefinition(t1.get$name());
    if ($.eqNullB(accept)) {
      throw $.captureStackTrace($.ExceptionImplementation$1('Pseudo class definition not found: ' + $.stringToString(t1.get$name())));
    }
    if (accept.$call$2(this, t1.get$parameter()) !== true) {
      return false;
    }
  }
  return true;
 },
 match$1: function(seq) {
  return $.matchType(this.view, seq.get$type()) === true && $.matchID(this.view, seq.get$id()) === true && $.matchClasses(this.view, seq.get$classes()) === true && this.matchPseudoClasses$1(seq.get$pseudoClasses()) === true;
 },
 isMatched$1: function(selectorIndex) {
  if ($.ltB(selectorIndex, 0)) {
    for (var i = 0; $.ltB(i, $.get$length(this._qualified)); i = i + 1) {
      if (this.isMatched$1(i) === true) {
        return true;
      }
    }
    return false;
  } else {
    return $.ltB(selectorIndex, $.get$length(this._qualified)) && $.last($.index(this._qualified, selectorIndex)) === true;
  }
 },
 isMatched$0: function() {
  return this.isMatched$1(-1)
},
 qualify$3: function(selectorIndex, position, qualified) {
  $.indexSet($.index(this._qualified, selectorIndex), position, qualified);
 },
 qualify$2: function(selectorIndex,position) {
  return this.qualify$3(selectorIndex,position,true)
},
 isQualified$2: function(selectorIndex, position) {
  if ($.ltB(selectorIndex, 0) || $.geB(selectorIndex, $.get$length(this._qualified))) {
    return false;
  }
  var posq = $.index(this._qualified, selectorIndex);
  return $.gtB(position, -1) && $.ltB(position, $.get$length(posq)) && $.index(posq, position) === true;
 },
 moveToNextSibling$0: function() {
  this.view = this.view.get$nextSibling();
  this.viewChildIndex = $.add(this.viewChildIndex, 1);
 },
 ViewMatchContext$1: function(view) {
  this.viewChildIndex = $.computeViewChildIndex(this.view);
 },
 ViewMatchContext$root$2: function(view, selectors) {
  this.viewChildIndex = $.computeViewChildIndex(this.view);
 }
});

Isolate.$defineClass("PseudoClass", "Object", ["parameter=", "name?"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1(':' + $.stringToString(this.name));
  if (!$.eqNullB(this.parameter)) {
    sb.add$1('(' + $.stringToString(this.parameter) + ')');
  }
  return sb.toString$0();
 }
});

Isolate.$defineClass("SimpleSelectorSequence", "Object", ["combinator?", "pseudoClasses?", "attributes?", "classes?", "id=", "type="], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  if (!$.eqNullB(this.type)) {
    sb.add$1(this.type);
  }
  if (!$.eqNullB(this.id)) {
    sb.add$1('#' + $.stringToString(this.id));
  }
  for (var t0 = $.iterator(this.classes); t0.hasNext$0() === true; ) {
    sb.add$1('.' + $.stringToString(t0.next$0()));
  }
  for (var t1 = $.iterator(this.pseudoClasses); t1.hasNext$0() === true; ) {
    sb.add$1('' + $.stringToString(t1.next$0()));
  }
  if (sb.isEmpty$0() === true) {
    var t2 = '*';
  } else {
    t2 = sb.toString$0();
  }
  return t2;
 },
 printCombinator$0: function() {
  $0:{
    var t0 = this.combinator;
    if (1 === t0) {
      return ' >';
    } else {
      if (2 === t0) {
        return ' +';
      } else {
        if (3 === t0) {
          return ' ~';
        } else {
          return '';
        }
      }
    }
  }
 },
 setCombinatorByToken$1: function(token) {
  $0:{
    var t0 = token.get$type();
    if (7 === t0) {
      this.combinator = 1;
      break $0;
    } else {
      if (8 === t0) {
        this.combinator = 2;
        break $0;
      } else {
        if (9 === t0) {
          this.combinator = 3;
          break $0;
        } else {
        }
      }
    }
  }
 }
});

Isolate.$defineClass("Selector", "Object", ["seqs?", "selectorIndex?"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var t0 = $.iterator(this.seqs); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    sb.add$1('' + $.stringToString(t1) + $.stringToString(t1.printCombinator$0()) + ' ');
  }
  return $.trim(sb.toString$0());
 },
 addSequence$0: function() {
  var seq = $.SimpleSelectorSequence$0();
  $.add$1(this.seqs, seq);
  return seq;
 },
 requiresIdSpace$1: function(index) {
  return !$.eqNullB($.index(this.seqs, index).get$id());
 },
 getCombinator$1: function(index) {
  return $.index(this.seqs, index).get$combinator();
 },
 addCombinator$1: function(token) {
  $.last(this.seqs).setCombinatorByToken$1(token);
 }
});

Isolate.$defineClass("SelectorParseException", "Object", ["index", "token", "source"], {
 toString$0: function() {
  if ($.eqNullB(this.token)) {
    if ($.ltB(this.index, 0)) {
      var t0 = 'Unexpected end of selector: ' + $.stringToString(this.source);
    } else {
      t0 = 'Unexpected character at ' + $.stringToString(this.index) + ' in selector ' + $.stringToString(this.source);
    }
  } else {
    t0 = 'Unexpected token ' + $.stringToString(this.token.get$type()) + ' at ' + $.stringToString(this.index) + ' in selector ' + $.stringToString(this.source);
  }
  return t0;
 },
 source$1: function(arg0) { return this.source.$call$1(arg0); }
});

Isolate.$defineClass("ViewIterator", "Object", ["_lib8_index", "_lib8_next=", "_lib8_ready", "_currCtx", "_offsetRoot", "_allIds", "_posOffset", "_selectors", "_root"], {
 match$3: function(selector, ctx, index) {
  return ctx.match$1($.index(selector.get$seqs(), index));
 },
 matchLevel0$1: function(ctx) {
  for (var t0 = $.iterator(this._selectors); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (this.match$3(t1, ctx, 0) === true) {
      ctx.qualify$2(t1.get$selectorIndex(), 0);
    }
  }
 },
 _buildNextSiblingCtx$1: function(ctx) {
  ctx.moveToNextSibling$0();
  for (var t0 = $.iterator(this._selectors); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var i = t1.get$selectorIndex();
    if ($.gtB(this._posOffset, 0)) {
      var posEnd = $.sub(this._posOffset, 1);
    } else {
      posEnd = 0;
    }
    if (typeof posEnd !== 'number') return this._buildNextSiblingCtx$1$bailout(ctx, 1, t1, i, t0, posEnd);
    var len = $.get$length(t1.get$seqs());
    ctx.qualify$3(i, $.sub(len, 1), false);
    var j = $.sub(len, 2);
    if (typeof j !== 'number') return this._buildNextSiblingCtx$1$bailout(ctx, 2, t1, i, posEnd, t0, j);
    var j0 = j;
    for (; j0 >= posEnd; j0 = j0 - 1) {
      var cb = t1.getCombinator$1(j0);
      var parent$ = ctx.get$parent();
      $2:{
        if (0 === cb) {
          var parentPass = !$.eqNullB(parent$) && parent$.isQualified$2(i, j0) === true;
          ctx.qualify$3(i, j0, parentPass && $.checkIdSpace(t1, j0 + 1, ctx) === true);
          if (parentPass && this.match$3(t1, ctx, j0 + 1) === true) {
            ctx.qualify$2(i, j0 + 1);
          }
          break $2;
        } else {
          if (1 === cb) {
            var t2 = j0 + 1;
            ctx.qualify$3(i, t2, !$.eqNullB(parent$) && parent$.isQualified$2(i, j0) === true && this.match$3(t1, ctx, t2) === true);
            break $2;
          } else {
            if (3 === cb) {
              if (ctx.isQualified$2(i, j0) === true) {
                var t3 = j0 + 1;
                ctx.qualify$3(i, t3, this.match$3(t1, ctx, t3));
              }
              break $2;
            } else {
              if (2 === cb) {
                var t4 = j0 + 1;
                ctx.qualify$3(i, t4, ctx.isQualified$2(i, j0) === true && this.match$3(t1, ctx, t4) === true);
                ctx.qualify$3(i, j0, false);
              }
            }
          }
        }
      }
    }
  }
  if ($.eqB(this._posOffset, 0)) {
    this.matchLevel0$1(ctx);
  }
  return ctx;
 },
 _buildNextSiblingCtx$1$bailout: function(ctx, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t1 = env0;
      i = env1;
      t0 = env2;
      posEnd = env3;
      break;
    case 2:
      t1 = env0;
      i = env1;
      posEnd = env2;
      t0 = env3;
      j = env4;
      break;
  }
  switch (state) {
    case 0:
      ctx.moveToNextSibling$0();
      var t0 = $.iterator(this._selectors);
    case 1:
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(t0.hasNext$0() === true)) break L0;
            var t1 = t0.next$0();
            var i = t1.get$selectorIndex();
            if ($.gtB(this._posOffset, 0)) {
              var posEnd = $.sub(this._posOffset, 1);
            } else {
              posEnd = 0;
            }
          case 1:
            state = 0;
            var len = $.get$length(t1.get$seqs());
            ctx.qualify$3(i, $.sub(len, 1), false);
            var j = $.sub(len, 2);
          case 2:
            state = 0;
            var j0 = j;
            L1: while (true) {
              if (!$.geB(j0, posEnd)) break L1;
              var cb = t1.getCombinator$1(j0);
              var parent$ = ctx.get$parent();
              $2:{
                if (0 === cb) {
                  var parentPass = !$.eqNullB(parent$) && parent$.isQualified$2(i, j0) === true;
                  ctx.qualify$3(i, j0, parentPass && $.checkIdSpace(t1, $.add(j0, 1), ctx) === true);
                  if (parentPass && this.match$3(t1, ctx, $.add(j0, 1)) === true) {
                    ctx.qualify$2(i, $.add(j0, 1));
                  }
                  break $2;
                } else {
                  if (1 === cb) {
                    var t2 = $.add(j0, 1);
                    ctx.qualify$3(i, t2, !$.eqNullB(parent$) && parent$.isQualified$2(i, j0) === true && this.match$3(t1, ctx, $.add(j0, 1)) === true);
                    break $2;
                  } else {
                    if (3 === cb) {
                      if (ctx.isQualified$2(i, j0) === true) {
                        ctx.qualify$3(i, $.add(j0, 1), this.match$3(t1, ctx, $.add(j0, 1)));
                      }
                      break $2;
                    } else {
                      if (2 === cb) {
                        var t3 = $.add(j0, 1);
                        ctx.qualify$3(i, t3, ctx.isQualified$2(i, j0) === true && this.match$3(t1, ctx, $.add(j0, 1)) === true);
                        ctx.qualify$3(i, j0, false);
                      }
                    }
                  }
                }
              }
              j0 = $.sub(j0, 1);
            }
        }
      }
      if ($.eqB(this._posOffset, 0)) {
        this.matchLevel0$1(ctx);
      }
      return ctx;
  }
 },
 _buildFirstChildCtx$1: function(parent$) {
  var ctx = $.ViewMatchContext$child$2(parent$.get$view().get$firstChild(), parent$);
  if ($.eqB(this._posOffset, 0)) {
    this.matchLevel0$1(ctx);
  }
  for (var t0 = $.iterator(this._selectors); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var i = t1.get$selectorIndex();
    if ($.gtB(this._posOffset, 0)) {
      var posStart = $.sub(this._posOffset, 1);
    } else {
      posStart = 0;
    }
    if (typeof posStart !== 'number') return this._buildFirstChildCtx$1$bailout(parent$, 1, t0, ctx, t1, i, posStart);
    for (var j = posStart; $.ltB(j, $.sub($.get$length(t1.get$seqs()), 1)); j = j + 1) {
      $2:{
        var t2 = t1.getCombinator$1(j);
        if (0 === t2) {
          if (parent$.isQualified$2(i, j) === true && $.checkIdSpace(t1, j + 1, ctx) === true) {
            ctx.qualify$2(i, j);
          }
          if (parent$.isQualified$2(i, j) === true && this.match$3(t1, ctx, j + 1) === true) {
            ctx.qualify$2(i, j + 1);
          }
          break $2;
        } else {
          if (1 === t2) {
            if (parent$.isQualified$2(i, j) === true && this.match$3(t1, ctx, j + 1) === true) {
              ctx.qualify$2(i, j + 1);
            }
            break $2;
          }
        }
      }
    }
  }
  return ctx;
 },
 _buildFirstChildCtx$1$bailout: function(parent$, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t0 = env0;
      ctx = env1;
      t1 = env2;
      i = env3;
      posStart = env4;
      break;
  }
  switch (state) {
    case 0:
      var ctx = $.ViewMatchContext$child$2(parent$.get$view().get$firstChild(), parent$);
      if ($.eqB(this._posOffset, 0)) {
        this.matchLevel0$1(ctx);
      }
      var t0 = $.iterator(this._selectors);
    case 1:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!(t0.hasNext$0() === true)) break L0;
            var t1 = t0.next$0();
            var i = t1.get$selectorIndex();
            if ($.gtB(this._posOffset, 0)) {
              var posStart = $.sub(this._posOffset, 1);
            } else {
              posStart = 0;
            }
          case 1:
            state = 0;
            var j = posStart;
            L1: while (true) {
              if (!$.ltB(j, $.sub($.get$length(t1.get$seqs()), 1))) break L1;
              $2:{
                var t2 = t1.getCombinator$1(j);
                if (0 === t2) {
                  if (parent$.isQualified$2(i, j) === true && $.checkIdSpace(t1, $.add(j, 1), ctx) === true) {
                    ctx.qualify$2(i, j);
                  }
                  if (parent$.isQualified$2(i, j) === true && this.match$3(t1, ctx, $.add(j, 1)) === true) {
                    ctx.qualify$2(i, $.add(j, 1));
                  }
                  break $2;
                } else {
                  if (1 === t2) {
                    if (parent$.isQualified$2(i, j) === true && this.match$3(t1, ctx, $.add(j, 1)) === true) {
                      ctx.qualify$2(i, $.add(j, 1));
                    }
                    break $2;
                  }
                }
              }
              j = $.add(j, 1);
            }
        }
      }
      return ctx;
  }
 },
 _buildNextCtx$0: function() {
  if (this._allIds === true) {
    return;
  }
  if (!$.eqNullB(this._currCtx.get$view().get$firstChild())) {
    return this._buildFirstChildCtx$1(this._currCtx);
  }
  for (; $.eqNullB(this._currCtx.get$view().get$nextSibling()); ) {
    this._currCtx = this._currCtx.get$parent();
    var t0 = $.eqNullB(this._currCtx);
    var t1 = t0;
    if (!t0) {
      var t2 = this._currCtx.get$view();
      if ($.gtB(this._posOffset, 0)) {
        var t3 = this._offsetRoot;
      } else {
        t3 = this._root;
      }
      t1 = $.eqB(t2, t3);
    }
    if (t1) {
      return;
    }
  }
  return this._buildNextSiblingCtx$1(this._currCtx);
 },
 _buildRootCtx$0: function() {
  var rt = this._root;
  var rt0 = rt;
  if ($.gtB(this._posOffset, 0)) {
    var selector = $.index(this._selectors, 0);
    for (var rt1 = rt, i = 0; $.ltB(i, this._posOffset); rt1 = rt2, i = i0) {
      var rt2 = rt1;
      var seq = $.index(selector.get$seqs(), i);
      var rt2_ = rt1.getFellow$1(seq.get$id());
      if ($.eqNullB(rt2_)) {
        return;
      }
      var t0 = $.matchType(rt2_, seq.get$type()) === true;
      var t1 = !t0;
      if (t0) {
        t1 = $.matchClasses(rt2_, seq.get$classes()) !== true;
      }
      if (t1 || $.ViewMatchContext$1(rt2_).matchPseudoClasses$1(seq.get$pseudoClasses()) !== true) {
        return;
      }
      if (i > 0) {
        $1:{
          var t2 = selector.getCombinator$1(i - 1);
          if (0 === t2) {
            if ($.isDescendant(rt2_, rt1) !== true) {
              return;
            }
            break $1;
          } else {
            if (1 === t2) {
              if (!$.eqB(rt2_.get$parent(), rt1)) {
                return;
              }
              break $1;
            } else {
              if (3 === t2) {
                if ($.isGeneralSibling(rt2_, rt1) !== true) {
                  return;
                }
                break $1;
              } else {
                if (2 === t2) {
                  if (!$.eqB(rt2_.get$previousSibling(), rt1)) {
                    return;
                  }
                  break $1;
                }
              }
            }
          }
        }
      }
      rt2 = rt2_;
      var i0 = i + 1;
    }
    this._offsetRoot = rt1.get$parent();
    rt0 = rt1;
  }
  var ctx = $.ViewMatchContext$root$2(rt0, this._selectors);
  if ($.gtB(this._posOffset, 0)) {
    for (var t3 = $.iterator(this._selectors); t3.hasNext$0() === true; ) {
      ctx.qualify$2(t3.next$0().get$selectorIndex(), $.sub(this._posOffset, 1));
    }
  } else {
    this.matchLevel0$1(ctx);
  }
  return ctx;
 },
 _seekNext$0: function() {
  if ($.ltB(this._lib8_index, 0)) {
    var t0 = this._buildRootCtx$0();
  } else {
    t0 = this._buildNextCtx$0();
  }
  this._currCtx = t0;
  for (; !$.eqNullB(this._currCtx) && this._currCtx.isMatched$0() !== true; ) {
    this._currCtx = this._buildNextCtx$0();
  }
  if (!$.eqNullB(this._currCtx)) {
    this._lib8_index = $.add(this._lib8_index, 1);
    return this._currCtx.get$view();
  }
  return;
 },
 _loadNext$0: function() {
  if (this._lib8_ready === true) {
    return;
  }
  this._lib8_next = this._seekNext$0();
  this._lib8_ready = true;
 },
 hasNext$0: function() {
  this._loadNext$0();
  return !$.eqNullB(this._lib8_next);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  }
  this._lib8_ready = false;
  return this._lib8_next;
 },
 _lib8_ready$1: function(arg0) { return this._lib8_ready.$call$1(arg0); },
 ViewIterator$2: function(_root, selector) {
  this._posOffset = $._getCommonSeqLength(this._selectors);
  this._allIds = $._isAllIds(this._selectors, this._posOffset);
 }
});

Isolate.$defineClass("ViewIterable", "Object", ["_selector", "_root"], {
 iterator$0: function() {
  return $.ViewIterator$2(this._root, this._selector);
 }
});

Isolate.$defineClass("_Animator", "Object", ["_prevTime=", "_callback?", "_tmpRemoved", "_anims?"], {
 remove$1: function(animate) {
  if (!(this._tmpRemoved === (void 0))) {
    $.add$1(this._tmpRemoved, animate);
  } else {
    $.remove(this._anims, animate);
  }
 },
 add$1: function(animate) {
  $.add$1(this._anims, animate);
  if ($.eqB($.get$length(this._anims), 1)) {
    this._prevTime = $._now();
    $.window().requestAnimationFrame$1(this._callback);
  }
 },
 _isRemoved$1: function(index) {
  if (typeof index !== 'number') return this._isRemoved$1$bailout(index,  0);
  if ($.isEmpty(this._tmpRemoved) !== true) {
    var animate = $.index(this._anims, index);
    for (var t0 = $.iterator(this._tmpRemoved), cnt = 0; t0.hasNext$0() === true; cnt = cnt0) {
      var cnt0 = cnt;
      cnt0 = cnt;
      if ($.eqB(t0.next$0(), animate)) {
        cnt0 = cnt + 1;
      }
    }
    if (cnt > 0) {
      for (var j = 0, cnt1 = cnt; j < index; j = j + 1, cnt1 = cnt2) {
        var cnt2 = cnt1;
        var t1 = $.eqB($.index(this._anims, j), animate);
        cnt2 = cnt1;
        var t2 = t1;
        if (t1) {
          var cnt3 = cnt1 - 1;
          var t3 = cnt3 === 0;
          cnt2 = cnt3;
          t2 = t3;
        }
        if (t2) {
          return false;
        }
      }
      return true;
    }
  }
  return false;
 },
 _isRemoved$1$bailout: function(index, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.isEmpty(this._tmpRemoved) !== true) {
        var animate = $.index(this._anims, index);
        var t1 = $.iterator(this._tmpRemoved);
        var cnt = 0;
        L0: while (true) {
          if (!(t1.hasNext$0() === true)) break L0;
          var cnt0 = cnt;
          cnt0 = cnt;
          if ($.eqB(t1.next$0(), animate)) {
            cnt0 = cnt + 1;
          }
          cnt = cnt0;
        }
        if (cnt > 0) {
          var j = 0;
          var cnt1 = cnt;
          L1: while (true) {
            if (!$.ltB(j, index)) break L1;
            var cnt2 = cnt1;
            var t2 = $.eqB($.index(this._anims, j), animate);
            cnt2 = cnt1;
            var t3 = t2;
            if (t2) {
              var cnt3 = cnt1 - 1;
              var t4 = cnt3 === 0;
              cnt2 = cnt3;
              t3 = t4;
            }
            if (t3) {
              return false;
            }
            j = j + 1;
            cnt1 = cnt2;
          }
          return true;
        }
      }
      return false;
  }
 },
 _afterCallback$0: function() {
  var removed = this._tmpRemoved;
  this._tmpRemoved = (void 0);
  for (var t0 = $.iterator(removed); t0.hasNext$0() === true; ) {
    this.remove$1(t0.next$0());
  }
 },
 _beforeCallback$0: function() {
  this._tmpRemoved = $.List((void 0));
 },
 _Animator$0: function() {
  this._callback = new $.Closure78(this);
 }
});

Isolate.$defineClass("Closure", "Closure94", ["this_2", "box_0"], {
 $call$0: function() {
  this.this_2.onCreate_$0();
  if (this.this_2.get$_mainView().get$inDocument() !== true) {
    if (!(this.box_0.containerId_1 === (void 0))) {
      var container = $.document().query$1('#' + $.stringToString(this.box_0.containerId_1));
    } else {
      container = (void 0);
    }
    var t0 = this.this_2.get$_mainView();
    if (!$.eqNullB(container)) {
      var t1 = container;
    } else {
      t1 = $.document().get$body();
    }
    t0.addToDocument$1(t1);
    for (var t2 = $.iterator(this.this_2.get$_dlgInfos()); t2.hasNext$0() === true; ) {
      var t3 = t2.next$0();
      this.this_2._createDialog$1(t3);
    }
  }
  this.this_2.onMount_$0();
 }
});

Isolate.$defineClass("Closure2", "Closure94", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure3", "Closure94", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure4", "Closure94", ["box_0"], {
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
});

Isolate.$defineClass("Closure5", "Closure94", ["box_0"], {
 $call$1: function(entry) {
  this.box_0.f_1.$call$2(entry.get$key(), entry.get$value());
 }
});

Isolate.$defineClass("Closure6", "Closure94", ["this_2", "box_0"], {
 $call$0: function() {
  this.this_2.flush$1(this.box_0.view_1);
 }
});

Isolate.$defineClass("Closure7", "Closure94", ["this_0"], {
 $call$0: function() {
  this.this_0.flush$0();
 }
});

Isolate.$defineClass("Closure8", "Closure94", ["this_3", "box_0"], {
 $call$0: function() {
  this.this_3.get$_tasks().remove$1(this.box_0.key_1);
  this.box_0.task_2.$call$0();
 }
});

Isolate.$defineClass("Closure9", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure10", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure11", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure12", "Closure94", [], {
 $call$0: function() {
  return $.browser.get$size().get$width();
 }
});

Isolate.$defineClass("Closure13", "Closure94", [], {
 $call$0: function() {
  return $.browser.get$size().get$height();
 }
});

Isolate.$defineClass("Closure14", "Closure94", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return '' + $.stringToString(n);
  }
  if ($.geB(absN, 100)) {
    return '' + $.stringToString(sign) + '0' + $.stringToString(absN);
  }
  if ($.geB(absN, 10)) {
    return '' + $.stringToString(sign) + '00' + $.stringToString(absN);
  }
  if ($.geB(absN, 1)) {
    return '' + $.stringToString(sign) + '000' + $.stringToString(absN);
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure15", "Closure94", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  }
  if ($.geB(n, 10)) {
    return '0' + $.stringToString(n);
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure16", "Closure94", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure17", "Closure94", ["this_2", "box_0"], {
 $call$1: function(key) {
  return this.box_0.f_1.$call$2(key, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure18", "Closure94", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
});

Isolate.$defineClass("Closure19", "Closure94", [], {
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
});

Isolate.$defineClass("Closure20", "Closure94", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  }
 }
});

Isolate.$defineClass("Closure21", "Closure94", ["box_0", "output_2"], {
 $call$1: function(element) {
  if (this.box_0.f_1.$call$1(element) === true) {
    $.add$1(this.output_2, element);
  }
 }
});

Isolate.$defineClass("Closure22", "Closure94", [], {
 $call$1: function(el) {
  return el.remove$0();
 }
});

Isolate.$defineClass("Closure23", "Closure94", ["values_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
});

Isolate.$defineClass("Closure24", "Closure94", ["box_0"], {
 $call$2: function(key, value) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.i_2;
  var i = $.add(t1, 1);
  this.box_0.i_2 = i;
  $.indexSet(t0, t1, value);
 }
});

Isolate.$defineClass("Closure25", "Closure94", ["box_0"], {
 $call$1: function(entry) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.index_2;
  var index = $.add(t1, 1);
  this.box_0.index_2 = index;
  $.indexSet(t0, t1, entry.get$value());
 }
});

Isolate.$defineClass("Closure26", "Closure94", ["this_2", "box_0"], {
 $call$1: function(key) {
  return $.add$1(this.box_0.result_1, $.index(this.this_2, key));
 }
});

Isolate.$defineClass("Closure27", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.anchor_1.get$outerWidth();
 }
});

Isolate.$defineClass("Closure28", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.anchor_1.get$outerHeight();
 }
});

Isolate.$defineClass("Closure29", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.anchor_1.get$innerWidth();
 }
});

Isolate.$defineClass("Closure30", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.anchor_1.get$innerHeight();
 }
});

Isolate.$defineClass("Closure31", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$top($.sub(offset, view.get$outerHeight()));
 }
});

Isolate.$defineClass("Closure32", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$top(offset);
 }
});

Isolate.$defineClass("Closure33", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, $.tdiv($.sub(anchor.get$outerHeight(), view.get$outerHeight()), 2)));
 }
});

Isolate.$defineClass("Closure34", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  if (anchor === view.get$parent()) {
    var t0 = anchor.get$innerHeight();
  } else {
    t0 = anchor.get$outerHeight();
  }
  view.set$top($.sub($.add(offset, t0), view.get$outerHeight()));
 }
});

Isolate.$defineClass("Closure35", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$top($.add(offset, anchor.get$outerHeight()));
 }
});

Isolate.$defineClass("Closure36", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$left($.sub(offset, view.get$outerWidth()));
 }
});

Isolate.$defineClass("Closure37", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$left(offset);
 }
});

Isolate.$defineClass("Closure38", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, $.tdiv($.sub(anchor.get$outerWidth(), view.get$outerWidth()), 2)));
 }
});

Isolate.$defineClass("Closure39", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  if (anchor === view.get$parent()) {
    var t0 = anchor.get$innerWidth();
  } else {
    t0 = anchor.get$outerWidth();
  }
  view.set$left($.sub($.add(offset, t0), view.get$outerWidth()));
 }
});

Isolate.$defineClass("Closure40", "Closure94", [], {
 $call$3: function(offset, anchor, view) {
  view.set$left($.add(offset, anchor.get$outerWidth()));
 }
});

Isolate.$defineClass("Closure41", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerHeight();
 }
});

Isolate.$defineClass("Closure42", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerWidth();
 }
});

Isolate.$defineClass("Closure43", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerHeight();
 }
});

Isolate.$defineClass("Closure44", "Closure94", ["box_0", "si_2"], {
 $call$0: function() {
  return $.sub($.sub(this.box_0.view_1.get$innerWidth(), this.si_2.get$left()), this.si_2.get$right());
 }
});

Isolate.$defineClass("Closure45", "Closure94", ["box_0"], {
 $call$0: function() {
  if (!(this.box_0.view_1.get$parent() === (void 0))) {
    var t0 = this.box_0.view_1.get$parent().get$innerWidth();
  } else {
    t0 = $.browser.get$size().get$width();
  }
  return t0;
 }
});

Isolate.$defineClass("Closure46", "Closure94", ["box_0"], {
 $call$0: function() {
  if (!(this.box_0.view_1.get$parent() === (void 0))) {
    var t0 = this.box_0.view_1.get$parent().get$innerHeight();
  } else {
    t0 = $.browser.get$size().get$height();
  }
  return t0;
 }
});

Isolate.$defineClass("Closure47", "Closure94", ["this_1", "keys_0"], {
 $call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true) {
    $.add$1(this.keys_0, this.this_1._strip$1(key));
  }
 }
});

Isolate.$defineClass("Closure48", "Closure94", ["this_2", "box_0"], {
 $call$2: function(key, value) {
  if (this.this_2._matches$1(key) === true) {
    this.box_0.f_1.$call$2(this.this_2._strip$1(key), value);
  }
 }
});

Isolate.$defineClass("Closure49", "Closure94", ["this_1", "values_0"], {
 $call$2: function(key, value) {
  if (this.this_1._matches$1(key) === true) {
    $.add$1(this.values_0, value);
  }
 }
});

Isolate.$defineClass("Closure50", "Closure94", ["this_0"], {
 $call$0: function() {
  var t0 = $.HashMapImplementation$0();
  this.this_0.set$_dataAttrs(t0);
  return t0;
 }
});

Isolate.$defineClass("Closure51", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerWidth();
 }
});

Isolate.$defineClass("Closure52", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerWidth();
 }
});

Isolate.$defineClass("Closure53", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerHeight();
 }
});

Isolate.$defineClass("Closure54", "Closure94", ["box_0", "si_2"], {
 $call$0: function() {
  return $.sub($.sub(this.box_0.view_1.get$innerHeight(), this.si_2.get$top()), this.si_2.get$bottom());
 }
});

Isolate.$defineClass("Closure55", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerWidth();
 }
});

Isolate.$defineClass("Closure56", "Closure94", ["box_0"], {
 $call$0: function() {
  return this.box_0.view_1.get$innerHeight();
 }
});

Isolate.$defineClass("Closure57", "Closure94", ["this_1", "ua_0"], {
 $call$1: function(regex) {
  var m = regex.firstMatch$1(this.ua_0);
  if (!(m === (void 0))) {
    var t0 = m.group$1(1);
    this.this_1.set$name(t0);
    var t1 = $._versionOf(m.group$1(2), '.');
    this.this_1.set$version(t1);
    return true;
  }
  return false;
 }
});

Isolate.$defineClass("Closure58", "Closure94", ["box_0"], {
 $call$1: function(s) {
  return $.add$1(s, this.box_0.value_1);
 }
});

Isolate.$defineClass("Closure59", "Closure94", ["box_0"], {
 $call$1: function(s) {
  return $.addAll(s, this.box_0.collection_1);
 }
});

Isolate.$defineClass("Closure60", "Closure94", [], {
 $call$1: function(s) {
  return $.clear(s);
 }
});

Isolate.$defineClass("Closure61", "Closure94", [], {
 $call$2: function(ctx, param) {
  return $.eqNullB(param) && $.eqNullB(ctx.get$view().get$previousSibling());
 }
});

Isolate.$defineClass("Closure62", "Closure94", [], {
 $call$2: function(ctx, param) {
  return $.eqNullB(param) && $.eqNullB(ctx.get$view().get$nextSibling());
 }
});

Isolate.$defineClass("Closure63", "Closure94", [], {
 $call$2: function(ctx, param) {
  return $.eqNullB(param) && $.eqNullB(ctx.get$view().get$previousSibling()) && $.eqNullB(ctx.get$view().get$nextSibling());
 }
});

Isolate.$defineClass("Closure64", "Closure94", [], {
 $call$2: function(ctx, param) {
  return $.eqNullB(param) && $.eqB(ctx.get$view().get$childCount(), 0);
 }
});

Isolate.$defineClass("Closure65", "Closure94", [], {
 $call$2: function(ctx, param) {
  return !$.eqNullB(param);
 }
});

Isolate.$defineClass("Closure66", "Closure94", [], {
 $call$2: function(ctx, param) {
  return !$.eqNullB(param);
 }
});

Isolate.$defineClass("Closure67", "Closure94", ["this_0"], {
 $call$1: function(event$) {
  this.this_0.updateSize$0();
 }
});

Isolate.$defineClass("Closure68", "Closure94", [], {
 $call$1: function(event$) {
  $.broadcaster().sendEvent$1($.PopupEvent$2(event$.get$target(), 'popup'));
 }
});

Isolate.$defineClass("Closure69", "Closure94", ["this_2", "box_0"], {
 $call$0: function() {
  return $._ViewEventListenerList$2(this.this_2.get$_lib9_ptr(), this.box_0.type_1);
 }
});

Isolate.$defineClass("Closure70", "Closure94", ["box_0"], {
 $call$0: function() {
  this.box_0.first_1 = true;
  return [];
 }
});

Isolate.$defineClass("Closure71", "Closure94", ["box_2"], {
 $call$1: function(target) {
  var t0 = ({});
  t0.target_1 = target;
  return new $.Closure72(t0, this.box_2);
 }
});

Isolate.$defineClass("Closure72", "Closure94", ["box_0", "box_2"], {
 $call$1: function(event$) {
  this.box_0.target_1.sendEvent$1($.ViewEvent$dom$3(this.box_0.target_1, event$, this.box_2.type_3));
 }
});

Isolate.$defineClass("Closure73", "Closure94", ["keys_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
});

Isolate.$defineClass("Closure74", "Closure94", ["box_0"], {
 $call$2: function(key, value) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.i_2;
  var i = $.add(t1, 1);
  this.box_0.i_2 = i;
  $.indexSet(t0, t1, key);
 }
});

Isolate.$defineClass("Closure75", "Closure94", ["box_0"], {
 $call$1: function(entry) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.index_2;
  var index = $.add(t1, 1);
  this.box_0.index_2 = index;
  $.indexSet(t0, t1, entry.get$key());
 }
});

Isolate.$defineClass("Closure76", "Closure94", [], {
 $call$0: function() {
  return [];
 }
});

Isolate.$defineClass("Closure77", "Closure94", ["this_0"], {
 $call$2: function(time, elapsed) {
  var ret = true;
  if ($.gtB($.sub(time, this.this_0.get$lastCycle()), this.this_0.get$UPDATE())) {
    var message = this.this_0.get$environment().draw$1(this.this_0.get$ctx2d());
    $0:{
      if (1 === message) {
        $.window().alert$1('GAME OVER!! Your score was ' + $.stringToString(this.this_0.get$score()));
        ret = false;
        break $0;
      } else {
        if (0 === message) {
          var t0 = this.this_0;
          t0.set$score($.add(t0.get$score(), 1));
          ret = true;
          break $0;
        }
      }
      ret = true;
    }
    this.this_0.set$lastCycle(time);
  }
  return ret;
 }
});

Isolate.$defineClass("Closure78", "Closure94", ["this_0"], {
 $call$1: function(now) {
  if ($.isEmpty(this.this_0.get$_anims()) !== true) {
    if (now === (void 0)) {
      var inow = $._now();
    } else {
      inow = $.toInt(now);
    }
    var inow = inow;
    var diff = $.sub(inow, this.this_0.get$_prevTime());
    var t0 = inow;
    this.this_0.set$_prevTime(t0);
    this.this_0._beforeCallback$0();
    try {
      for (j = 0; $.ltB(j, $.get$length(this.this_0.get$_anims())); j = $.add(j, 1)) {
        if (this.this_0._isRemoved$1(j) !== true && $.index(this.this_0.get$_anims(), j).$call$2(inow, diff) !== true) {
          $.removeRange(this.this_0.get$_anims(), j, 1);
          var j = $.sub(j, 1);
        }
      }
    } finally {
      this.this_0._afterCallback$0();
    }
    if ($.isEmpty(this.this_0.get$_anims()) !== true) {
      $.window().requestAnimationFrame$1(this.this_0.get$_callback());
    }
  }
  var j, j;
 }
});

Isolate.$defineClass("Closure79", "Closure94", [], {
 $call$1: function(state) {
  return true;
 }
});

Isolate.$defineClass("Closure80", "Closure94", ["this_0"], {
 $call$1: function(event$) {
  if ($.gtB($.get$length(event$.get$touches()), 1)) {
    this.this_0._touchEnd$2(event$.get$pageX(), event$.get$pageY());
  } else {
    this.this_0._touchStart$3(event$.get$target(), event$.get$pageX(), event$.get$pageY());
  }
 }
});

Isolate.$defineClass("Closure81", "Closure94", ["this_1"], {
 $call$1: function(event$) {
  this.this_1._touchMove$2(event$.get$pageX(), event$.get$pageY());
 }
});

Isolate.$defineClass("Closure82", "Closure94", ["this_2"], {
 $call$1: function(event$) {
  this.this_2._touchEnd$2(event$.get$pageX(), event$.get$pageY());
 }
});

Isolate.$defineClass("Closure83", "Closure94", ["this_0"], {
 $call$1: function(event$) {
  this.this_0._touchStart$3(event$.get$target(), event$.get$pageX(), event$.get$pageY());
  this.this_0._capture$0();
 }
});

Isolate.$defineClass("Closure84", "Closure94", ["this_0"], {
 $call$1: function(event$) {
  this.this_0._touchMove$2(event$.get$pageX(), event$.get$pageY());
 }
});

Isolate.$defineClass("Closure85", "Closure94", ["this_1"], {
 $call$1: function(event$) {
  this.this_1._touchEnd$2(event$.get$pageX(), event$.get$pageY());
 }
});

Isolate.$defineClass("Closure86", "Closure94", ["this_0"], {
 $call$1: function(state) {
  if ($.gtB($.abs(state.get$delta().get$x()), $.abs(state.get$delta().get$y())) && $.gtB($.abs(state.get$delta().get$x()), 5)) {
    if ($.gtB(state.get$delta().get$x(), 0)) {
      this.this_0.get$environment().get$snake().set$direction(1);
    } else {
      this.this_0.get$environment().get$snake().set$direction(-1);
    }
  } else {
    if ($.gtB($.abs(state.get$delta().get$y()), 5)) {
      if ($.gtB(state.get$delta().get$y(), 0)) {
        this.this_0.get$environment().get$snake().set$direction(2);
      } else {
        this.this_0.get$environment().get$snake().set$direction(-2);
      }
    }
  }
  return true;
 }
});

Isolate.$defineClass("Closure87", "Closure94", ["this_0"], {
 $call$0: function() {
  return $._ElementRectImpl$1(this.this_0);
 }
});

Isolate.$defineClass("Closure88", "Closure94", [], {
 $call$1: function(e) {
  return $._completeMeasurementFutures();
 }
});

Isolate.$defineClass("Closure89", "Closure94", ["completer_2"], {
 $call$1: function(e) {
  this.completer_2.completeException$1(e);
  return true;
 }
});

Isolate.$defineClass("Closure90", "Closure94", ["completer_3", "box_0"], {
 $call$1: function(v) {
  var transformed = (void 0);
  try {
    var transformed = this.box_0.transformation_1.$call$1(v);
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    this.completer_3.completeException$1(e);
    return;
  }
  this.completer_3.complete$1(transformed);
 }
});

Isolate.$defineClass("Closure91", "Closure94", [], {
 $call$0: function() {
  return $.CTC59;
 }
});

Isolate.$defineClass("Closure92", "Closure94", ["this_2", "box_0"], {
 $call$1: function(element) {
  return this.this_2.drawSnake$3(this.box_0.context_1, element, (void 0));
 }
});

Isolate.$defineClass('Closure93', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.transform$1(arg0);
},
});
Isolate.$defineClass('Closure95', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.first$0();
},
});
Isolate.$defineClass('Closure96', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.start$0();
},
});
Isolate.$defineClass('Closure97', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.isUtc$0();
},
});
Isolate.$defineClass('Closure98', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.start$0();
},
});
Isolate.$defineClass('Closure99', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.onKeyDown$1(arg0);
},
});
Isolate.$defineClass('Closure100', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.length$0();
},
});
Isolate.$defineClass('Closure101', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$6: function(arg0, arg1, arg2, arg3, arg4, arg5) {
  return this.self.transform$6(arg0, arg1, arg2, arg3, arg4, arg5);
},
});
Isolate.$defineClass('Closure102', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.timeStamp$1(arg0);
},
});
Isolate.$defineClass('Closure103', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.profile$1(arg0);
},
});
Isolate.$defineClass('Closure104', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.add$1(arg0);
},
});
Isolate.$defineClass('Closure105', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.start$0();
},
});
Isolate.$defineClass('Closure106', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.start$0();
},
});
Isolate.$defineClass('Closure107', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.$dom_className$0();
},
});
Isolate.$defineClass('Closure108', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.start$0();
},
});
Isolate.$defineClass('Closure109', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$1: function(arg0) {
  return this.self.start$1(arg0);
},
});
Isolate.$defineClass('Closure110', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.previousSibling$0();
},
});
Isolate.$defineClass('Closure111', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.nextSibling$0();
},
});
Isolate.$defineClass('Closure112', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.lastChild$0();
},
});
Isolate.$defineClass('Closure113', 'Closure94', function BoundClosure(self) { this.self = self; }, {
$call$0: function() {
  return this.self.firstChild$0();
},
});
$._ViewEvents$1 = function(ptr) {
  return new $._ViewEvents($.makeLiteralMap([]), ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  }
  return Math.floor(receiver);
};

$.eqB = function(a, b) {
  return $.eq(a, b) === true;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    }
  }
  return false;
};

$.DOMQuery$_init$1 = function(node) {
  return new $.DOMQuery2(node);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.Token$fromChar$2 = function(c, index) {
  return new $.Token($.add(index, 1), index, $.getTypeFromChar(c));
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  }
  $.set$length(receiver, 0);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$.SelectorParseException$unexpectedToken$2 = function(source, token) {
  return new $.SelectorParseException(token.get$start(), token, source);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate($.div(a, b));
  }
  return a.operator$tdiv$1(b);
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.removeRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.removeRange$2(start, length$);
  }
  $.checkGrowable(receiver, 'removeRange');
  if ($.eqB(length$, 0)) {
    return;
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var receiverLength = (receiver.length);
  if (start < 0 || start >= receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var t0 = start + length$;
  if (t0 > receiverLength) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(t0));
  }
  $.copy(receiver, $.add(start, length$), receiver, start, $.sub($.sub(receiverLength, length$), start));
  $.set$length(receiver, $.sub(receiverLength, length$));
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  }
  if (value === (void 0)) {
    return 'null';
  }
  if (typeof value == "function") {
    return 'Closure';
  }
  return String(value);
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  }
  return name$;
};

$._isLiteral = function(c) {
  return $.gtB(c, 96) && $.ltB(c, 123) || $.gtB(c, 64) && $.ltB(c, 91) || $.gtB(c, 47) && $.ltB(c, 58) || $.eqB(c, 95) || $.eqB(c, 45);
};

$._getRealLayout = function(view) {
  if (!$.eqB(view.get$layout().get$orient(), 'vertical')) {
    var t0 = $._HLayout$0();
  } else {
    t0 = $._VLayout$0();
  }
  return t0;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(b, 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if ($.gtB(b, 31)) {
      return 0;
    }
    return a >>> b;
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  var endIndex0 = endIndex;
  if (endIndex === (void 0)) {
    endIndex0 = length$;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.addToIdSpaceDown = function(view, space) {
  var id = view.get$id();
  if ($.gtB($.get$length(id), 0)) {
    space.bindFellow_$2(id, view);
  }
  if (!((typeof view === 'object') && !!view.is$IdSpace)) {
    var vs = view.get$_virtIS();
    if (!(vs === (void 0))) {
      view.set$_virtIS((void 0));
      for (var t0 = $.iterator(vs.get$fellows()); t0.hasNext$0() === true; ) {
        var t1 = t0.next$0();
        space.bindFellow_$2(t1.get$id(), t1);
      }
    } else {
      for (var view0 = view.get$firstChild(); !$.eqNullB(view0); view0 = view0.get$nextSibling()) {
        $.addToIdSpaceDown(view0, space);
      }
    }
  }
};

$.indexSet = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0 || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.encodeXML = function(txt, multiline, maxlength, pre) {
  if (typeof txt !== 'string' && (typeof txt !== 'object'||txt.constructor !== Array)) return $.encodeXML$bailout(txt, multiline, maxlength, pre,  0);
  if (typeof maxlength !== 'number') return $.encodeXML$bailout(txt, multiline, maxlength, pre,  0);
  var tl = txt.length;
  var t0 = pre === true;
  var multiline0 = t0 || multiline === true;
  var t1 = !multiline0;
  if (t1 && maxlength > 0 && tl > maxlength) {
    var j = maxlength;
    while (true) {
      var t2 = j > 0;
      var t3 = t2;
      if (t2) {
        var t4 = j - 1;
        if (t4 !== (t4 | 0)) throw $.iae(t4);
        var t5 = txt.length;
        if (t4 < 0 || t4 >= t5) throw $.ioore(t4);
        t3 = $.isChar(txt[t4], false, false, false, true, (void 0)) === true;
      }
      if (!t3) break;
      var j0 = j;
      j0 = j - 1;
      j = j0;
    }
    return $.encodeXML('' + $.stringToString($.substring$2(txt, 0, j)) + '...', multiline0, 0, pre);
  }
  var out = $.StringBufferImpl$1('');
  var t6 = multiline0;
  if (t1) {
    t6 = t0;
  }
  if (t6) {
    for (var k = 0, enc = (void 0), j1 = 0; j1 < tl; k = k0, j1 = j2) {
      var k0 = k;
      var t7 = txt.length;
      if (j1 < 0 || j1 >= t7) throw $.ioore(j1);
      var t8 = txt[j1];
      var enc0 = $.CTC11.operator$index$1(t8);
      if (!$.eqNullB(enc0)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j1)), '&'), enc0), ';');
        k0 = j1 + 1;
      } else {
        if (multiline0 && $.eqB(t8, '\n')) {
          $.add$1(out.add$1($.substring$2(txt, k, j1)), '<br/>\n');
          k0 = j1 + 1;
        } else {
          k0 = k;
          if (t0 && ($.eqB(t8, ' ') || $.eqB(t8, '\x09'))) {
            $.add$1(out.add$1($.substring$2(txt, k, j1)), '&nbsp;');
            if ($.eqB(t8, '\x09')) {
              out.add$1('&nbsp;&nbsp;&nbsp;');
            }
            k0 = j1 + 1;
          }
        }
      }
      enc = enc0;
      var j2 = j1 + 1;
    }
    var k1 = k;
  } else {
    for (var k2 = 0, enc1 = (void 0), j3 = 0; j3 < tl; k2 = k3, j3 = j4) {
      var k3 = k2;
      var t9 = txt.length;
      if (j3 < 0 || j3 >= t9) throw $.ioore(j3);
      var enc2 = $.CTC11.operator$index$1(txt[j3]);
      k3 = k2;
      if (!$.eqNullB(enc2)) {
        $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k2, j3)), '&'), enc2), ';');
        k3 = j3 + 1;
      }
      enc1 = enc2;
      var j4 = j3 + 1;
    }
    k1 = k2;
  }
  if (k1 === 0) {
    return txt;
  }
  if (k1 < tl) {
    out.add$1($.substring$1(txt, k1));
  }
  return out.toString$0();
};

$.ViewMatchContext$root$2 = function(view, selectors) {
  var t0 = new $.ViewMatchContext($._initBoolList(selectors), 0, view, (void 0));
  t0.ViewMatchContext$root$2(view, selectors);
  return t0;
};

$.ViewIterable$2 = function(_root, _selector) {
  return new $.ViewIterable(_selector, _root);
};

$.String$fromCharCodes = function(charCodes) {
  return $.createFromCharCodes(charCodes);
};

$._DataAttributeMap$1 = function($$dom_attributes) {
  return new $._DataAttributeMap($$dom_attributes);
};

$._createMeasurementFuture = function(computeValue, completer) {
  if ($._pendingRequests === (void 0)) {
    $._pendingRequests = [];
    $._maybeScheduleMeasurementFrame();
  }
  $.add$1($._pendingRequests, $._MeasurementRequest$2(computeValue, completer));
  return completer.get$future();
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, inputTable, result, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$.filter2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$.application = function() {
  if ($._app === (void 0)) {
    $._app = $.Application$1('');
  }
  return $._app;
};

$.DOMQuery = function(v) {
  if (typeof v === 'object' && !!v.is$View) {
    var v0 = v.get$node();
  } else {
    if (typeof v === 'string') {
      v0 = $.document().query$1(v);
    } else {
      v0 = v;
    }
  }
  if (typeof v0 === 'object' && v0.is$Window()) {
    var t0 = $._WindowQuery$1(v0);
  } else {
    if (!(v0 === (void 0))) {
      t0 = $.DOMQuery$_init$1(v0);
    } else {
      t0 = $._NullQuery$0();
    }
  }
  return t0;
};

$.parseInt = function(str) {
  return $.parseInt2(str);
};

$.parseInt2 = function(str) {
  $.checkString(str);
  if (!(/^\s*[+-]?(?:0[xX][abcdefABCDEF0-9]+|\d+)\s*$/.test(str))) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  var trimmed = $.trim(str);
  var base = 10;
  if ($.gtB($.get$length(trimmed), 2) && ($.eqB($.index(trimmed, 1), 'x') || $.eqB($.index(trimmed, 1), 'X')) || $.gtB($.get$length(trimmed), 3) && ($.eqB($.index(trimmed, 2), 'x') || $.eqB($.index(trimmed, 2), 'X'))) {
    base = 16;
  }
  var ret = (parseInt(trimmed, base));
  if ($.isNaN(ret) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret;
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    }
  }
  return destination;
};

$.computeViewChildIndex = function(view) {
  for (var index = -1, view0 = view; !$.eqNullB(view0); index = index0, view0 = view1) {
    var index0 = index;
    var view1 = view0;
    var view2 = view0.get$previousSibling();
    index0 = index + 1;
    view1 = view2;
  }
  return index;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  }
  return a.operator$negate$0();
};

$.Selector$1 = function(selectorIndex) {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'SimpleSelectorSequence'}));
  return new $.Selector(t0, selectorIndex);
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var first0 = first;
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    }
    $._emitObject(t2, result, visiting);
    first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$._init = function() {
  if ($.eqNullB($._CC_0)) {
    $._CC_0 = $.charCodeAt('0', 0);
    $._CC_9 = $.add($._CC_0, 9);
    $._CC_A = $.charCodeAt('A', 0);
    $._CC_Z = $.add($._CC_A, 25);
    $._CC_a = $.charCodeAt('a', 0);
    $._CC_z = $.add($._CC_a, 25);
  }
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t0 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1(e);
  return t0;
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._TouchDragGesture$8 = function(owner, handle, transform, range, movement, start, end, moving) {
  var t0 = new $._TouchDragGesture((void 0), (void 0), (void 0), transform, (void 0), movement, range, moving, end, start, handle, owner);
  t0._DragGesture$_init$8(owner, handle, transform, range, movement, start, end, moving);
  return t0;
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._getOffset = function(anchor, view) {
  if ($.eqB(view.get$style().get$position(), 'fixed')) {
    var t0 = anchor.get$documentOffset();
  } else {
    if (anchor === view.get$parent()) {
      t0 = $._Offset$2(0, 0);
    } else {
      t0 = $._Offset$2(anchor.get$left(), anchor.get$top());
    }
  }
  return t0;
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$._positionRoot = function(view) {
  var loc = view.get$profile().get$location();
  if ($.isEmpty(loc) !== true) {
    var handlers = $._getHandlers(loc);
    $.index($._anchorXHandlers(), $.index(handlers, 0)).$call$3(0, $.CTC43, view);
    $.index($._anchorYHandlers(), $.index(handlers, 1)).$call$3(0, $.CTC43, view);
  }
};

$.getDOMEventDispatcher = function(type) {
  if ($._domEvtDisps === (void 0)) {
    $._domEvtDisps = $.makeLiteralMap([]);
    for (var t0 = $.iterator($.CTC56); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      $.indexSet($._domEvtDisps, t1, $._domEvtDisp(t1));
    }
  }
  return $.index($._domEvtDisps, type);
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.getMinutes = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t0;
};

$.geB = function(a, b) {
  return $.ge(a, b) === true;
};

$.ViewMatchContext$1 = function(view) {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'List<bool>'}));
  var t1 = new $.ViewMatchContext(t0, 0, view, (void 0));
  t1.ViewMatchContext$1(view);
  return t1;
};

$.window = function() {
  return window;;
};

$.DocumentFragment = function() {
  return $.document().createDocumentFragment$0();
};

$.add = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    }
  }
  return a.operator$add$1(b);
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  return $.le(a, b) === true;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number') {
    if (receiver === 0) {
      var t0 = 1 / receiver < 0;
    } else {
      t0 = receiver < 0;
    }
    return t0;
  } else {
    return receiver.isNegative$0();
  }
};

$._DOMWindowCrossFrameImpl$1 = function(_window) {
  return new $._DOMWindowCrossFrameImpl(_window);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) {
      return 0;
    }
    if (result > 0) {
      return result;
    }
    if ($.ltB(b, 0)) {
      return $.sub(result, b);
    } else {
      return $.add(result, b);
    }
  }
  return a.operator$mod$1(b);
};

$._getCommonSeqLength = function(list) {
  for (var t0 = $.iterator(list), strs = (void 0), max = 0; t0.hasNext$0() === true; strs = strs0, max = max0) {
    var strs0 = strs;
    var max0 = max;
    var t1 = t0.next$0();
    if ($.eqNullB(strs)) {
      var strs1 = $.List((void 0));
      $.setRuntimeTypeInfo(strs1, ({E: 'String'}));
      for (var t2 = $.iterator(t1.get$seqs()); t2.hasNext$0() === true; ) {
        var t3 = t2.next$0();
        var id = t3.get$id();
        if (!$.eqNullB(id) && $.isEmpty(id) !== true) {
          strs1.push($.toString(t3));
          strs1.push(t3.printCombinator$0());
        } else {
          break;
        }
      }
      var max1 = strs1.length;
      strs0 = strs1;
      max0 = max1;
    } else {
      for (var t4 = $.iterator(t1.get$seqs()), i = 0; i0 = i, t4.hasNext$0() === true; i = i1) {
        var i1 = i;
        var t5 = t4.next$0();
        var id0 = t5.get$id();
        var t6 = i >= max || $.eqNullB(id0) || $.isEmpty(id0) === true;
        var i2 = i;
        var t7 = t6;
        if (!t6) {
          var i3 = i + 1;
          var t8 = !$.eqB($.index(strs, i), $.toString(t5));
          i2 = i3;
          t7 = t8;
        }
        var i4 = i2;
        var t9 = t7;
        if (!t7) {
          var i5 = i2 + 1;
          var t10 = !$.eqB($.index(strs, i2), t5.printCombinator$0());
          i4 = i5;
          t9 = t10;
        }
        if (t9) {
          i0 = i4;
          break;
        }
        i1 = i4;
      }
      var i6 = i0 - 1;
      max0 = max;
      if (i0 < max) {
        max0 = i6;
      }
      strs0 = strs;
    }
  }
  return $.toInt((max + 1) / 2);
  var i0;
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.ViewIterator$2 = function(_root, selector) {
  var t0 = new $.ViewIterator(-1, (void 0), false, (void 0), (void 0), (void 0), (void 0), $.parse(selector), _root);
  t0.ViewIterator$2(_root, selector);
  return t0;
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure2(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$.Food$1 = function(snakeEnvironment) {
  return new $.Food(snakeEnvironment, true, (void 0), (void 0));
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$._cast = function(v) {
  return v;
};

$._versionOf = function(version, separator) {
  var j = $.indexOf$1(version, separator);
  if ($.geB(j, 0)) {
    var j0 = $.indexOf$2(version, separator, $.add(j, 1));
    if ($.geB(j0, 0)) {
      var version = $.substring$2(version, 0, j0);
    }
  }
  try {
    return $.parseDouble(version);
  }catch (t0) {
    $.unwrapException(t0);
    return 1.0;
  }
};

$._SimpleClientRect$4 = function(left, top$, width, height) {
  return new $._SimpleClientRect(height, width, top$, left);
};

$.MeasureContext$0 = function() {
  var t0 = $.HashMapImplementation$0();
  var t1 = $.HashMapImplementation$0();
  return new $.MeasureContext($.HashMapImplementation$0(), t1, t0);
};

$.View$0 = function() {
  var t0 = new $.View(false, false, (void 0), (void 0), (void 0), (void 0), (void 0), 0, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), '');
  t0.View$0();
  return t0;
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.getYear = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t0;
};

$.eqNullB = function(a) {
  return $.eqNull(a) === true;
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.main = function() {
  $.SnakeCanvas$0().run$0();
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.matchClasses = function(view, classes) {
  if ($.eqNullB(classes) || $.isEmpty(classes) === true) {
    return true;
  }
  for (var t0 = $.iterator(classes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if ($.contains$1(view.get$classes(), t1) !== true) {
      return false;
    }
  }
  return true;
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.FutureImpl$0 = function() {
  var t0 = [];
  return new $.FutureImpl([], t0, false, (void 0), (void 0), false);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.isInfinite$0();
  }
  return (receiver == Infinity) || (receiver == -Infinity);
};

$._VLayout$0 = function() {
  return new $._VLayout();
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var startIndex0 = startIndex;
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.ViewMatchContext$child$2 = function(view, parent$) {
  return new $.ViewMatchContext($._initBoolListFromParent(parent$), 0, view, parent$);
};

$.Section$0 = function() {
  var t0 = new $.Section((void 0), false, false, (void 0), (void 0), (void 0), (void 0), (void 0), 0, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), '');
  t0.View$0();
  t0.Section$0();
  return t0;
};

$._ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addLast$1(value);
  }
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.getMilliseconds = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t0;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$.DocumentFragment$html = function(html) {
  var fragment = $.DocumentFragment();
  fragment.set$innerHTML(html);
  return fragment;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.ltB = function(a, b) {
  return $.lt(a, b) === true;
};

$.intOf = function(value, reportError) {
  try {
    if (!(value === (void 0)) && $.isEmpty(value) !== true) {
      var m = $.CTC38.firstMatch$1(value);
      if (!(m === (void 0))) {
        return $.parseInt(m.group$1(0));
      }
    }
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    if (!(reportError === (void 0)) && reportError === true) {
      throw $.captureStackTrace(e);
    }
  }
  return 0;
};

$.SnakeCanvas$0 = function() {
  var t0 = new $.SnakeCanvas((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 0, (void 0), (void 0), 0, 400, 250, 100, [], (void 0), '');
  t0.Activity$0();
  return t0;
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  }
  if (0 === length$) {
    return [];
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  return receiver.slice(start, end);
};

$.ViewEvent$6 = function(target, type, pageX, pageY, offsetX, offsetY) {
  var t0 = new $.ViewEvent((void 0), false, false, (void 0), $.DateImplementation$now$0().get$millisecondsSinceEpoch(), type, (void 0), (void 0));
  t0.ViewEvent$6(target, type, pageX, pageY, offsetX, offsetY);
  return t0;
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if (typeof start !== 'number') return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  var end = $.add(start, length$);
  if (end > a.length) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  }
  for (var i = start; i < end; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$.jsPropertyAccess = function(jsObject, property) {
  return jsObject[property];
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$._Size$2 = function(width, height) {
  return new $._Size(height, width);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  }
  return $dynamicMetadata;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$.isGeneralSibling = function(c1, c2) {
  for (var c10 = c1; !$.eqNullB(c10); c10 = c11) {
    var c11 = c10;
    if ($.eqB(c10, c2)) {
      return true;
    }
    c11 = c10.get$previousSibling();
  }
  return false;
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  var r0 = r;
  if (r === (void 0)) {
    r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$._DragGestureState$3 = function(gesture, pageX, pageY) {
  var t0 = new $._DragGestureState(false, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), $._Offset$2(0, 0), $._Offset$2(pageX, pageY), $.DOMQuery(gesture.get$owner()).get$documentOffset(), gesture);
  t0._DragGestureState$3(gesture, pageX, pageY);
  return t0;
};

$.getSeconds = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t0;
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.checkIdSpaces = function(view, newId) {
  var space = view.get$spaceOwner();
  if (!(space.getFellow$1(newId) === (void 0))) {
    throw $.captureStackTrace($.UIException$1('Not unique in the ID space of ' + $.stringToString(space) + ': ' + $.stringToString(newId)));
  }
  var t0 = typeof view === 'object' && !!view.is$IdSpace;
  var t1 = t0;
  var parent$ = (void 0);
  if (t0) {
    var parent0 = view.get$parent();
    var t2 = !$.eqNullB(parent0);
    t1 = t2;
    parent$ = parent0;
  }
  if (t1) {
    var space0 = parent$.get$spaceOwner();
    if (!(space0.getFellow$1(newId) === (void 0))) {
      throw $.captureStackTrace($.UIException$1('Not unique in the ID space of ' + $.stringToString(space0) + ': ' + $.stringToString(newId)));
    }
  }
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t0 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1((void 0));
  t0._DoubleLinkedQueueEntrySentinel$0();
  return t0;
};

$.getHours = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t0;
};

$.random = function() {
  return $.random2();
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return res;
};

$.random2 = function() {
  return Math.random();
};

$._ElementAttributeMap$1 = function(_element) {
  return new $._ElementAttributeMap(_element);
};

$._Broadcaster$0 = function() {
  var t0 = new $._Broadcaster((void 0), (void 0));
  t0._Broadcaster$0();
  return t0;
};

$.px = function(val) {
  if (!(val === (void 0))) {
    var t0 = '' + $.stringToString(val) + 'px';
  } else {
    t0 = '';
  }
  return t0;
};

$.matchType = function(view, type) {
  return $.eqNullB(type) || $.eqB(type, view.get$className());
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toInt$0();
  }
  if ($.isNaN(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  }
  if ($.isInfinite(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  }
  var truncated = $.truncate(receiver);
  if (truncated == -0.0) {
    var t0 = 0;
  } else {
    t0 = truncated;
  }
  return t0;
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.CSSStyleDeclaration$css = function(css) {
  var style = $.Element$tag('div').get$style();
  style.set$cssText(css);
  return style;
};

$._EventListenerInfo$1 = function(_owner) {
  var t0 = new $._EventListenerInfo((void 0), (void 0), (void 0), _owner);
  t0._EventListenerInfo$1(_owner);
  return t0;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  }
  return value;
};

$.div = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  }
  return a.operator$div$1(b);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$._NullQuery$0 = function() {
  return new $._NullQuery((void 0));
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  if (!(f === (void 0)) && (!!f.methods)) {
    return f.methods;
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC61)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  var name0 = name$;
  if ($.charCodeAt(name$, 0) === 36) {
    name0 = $.substring$1(name$, 1);
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.Browser$0 = function() {
  var t0 = new $.Browser((void 0), (void 0), (void 0), (void 0), false, false, false, false, false, false, false, false, false, (void 0), (void 0));
  t0.Browser$0();
  return t0;
};

$.broadcaster = function() {
  if ($._broadcaster === (void 0)) {
    $._broadcaster = $._Broadcaster$0();
  }
  return $._broadcaster;
};

$.rangeCheck = function(a, start, length$) {
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('negative length ' + $.stringToString(length$)));
  }
  if ($.ltB(start, 0) || $.geB(start, $.get$length(a))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  }
  if ($.gtB($.add(start, length$), $.get$length(a))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1($.add(start, length$)));
  }
};

$.AnchorRelation$1 = function(view) {
  var t0 = $.List((void 0));
  var t1 = new $.AnchorRelation(view, $.HashMapImplementation$0(), t0);
  t1.AnchorRelation$1(view);
  return t1;
};

$._initBoolListFromParent = function(parent$) {
  var plist = parent$.get$_qualified();
  var list = $.List((void 0));
  $.setRuntimeTypeInfo(list, ({E: 'List<bool>'}));
  for (var t0 = $.iterator(plist), sublist = (void 0); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var sublist0 = $.List((void 0));
    $.setRuntimeTypeInfo(sublist0, ({E: 'bool'}));
    list.push(sublist0);
    for (var i = 0; $.ltB(i, $.get$length(t1)); i = i + 1) {
      sublist0.push(false);
    }
    sublist = sublist0;
  }
  return list;
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.SnakeEnvironment$2 = function(height, width) {
  var t0 = new $.SnakeEnvironment((void 0), (void 0), width, height);
  t0.SnakeEnvironment$2(height, width);
  return t0;
};

$.TimeZoneImplementation$local$0 = function() {
  return new $.TimeZoneImplementation(false);
};

$.trim = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.trim$0();
  }
  return receiver.trim();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var method0 = method;
  if (method === (void 0) && !($._dynamicMetadata2() === (void 0))) {
    for (var method1 = method, i = 0; method0 = method1, $.ltB(i, $.get$length($._dynamicMetadata2())); method1 = method2, i = i0) {
      var method2 = method1;
      var entry = $.index($._dynamicMetadata2(), i);
      method2 = method1;
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method0 = method3;
          break;
        }
        method2 = method3;
      }
      var i0 = i + 1;
    }
  }
  var method4 = method0;
  if (method0 === (void 0)) {
    method4 = (methods['Object']);
  }
  var proto = (Object.getPrototypeOf(obj));
  var method5 = method4;
  if (method4 === (void 0)) {
    method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  }
  return nullCheckMethod.apply(obj, arguments$);
};

$.index = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      }
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a))) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    }
    return a[index];
  }
  return a.operator$index$1(index);
};

$.getTypeFromChar = function(c) {
  var code = $.charCodeAt(c, 0);
  if ($.isLiteral(code) === true) {
    return 1;
  }
  if ($.isWhitespace(code) === true) {
    return 3;
  }
  $0:{
    if ('*' === c) {
      return 2;
    } else {
      if (',' === c) {
        return 5;
      } else {
        if ('>' === c) {
          return 7;
        } else {
          if ('+' === c) {
            return 8;
          } else {
            if ('~' === c) {
              return 9;
            } else {
              if ('#' === c) {
                return 10;
              } else {
                if ('.' === c) {
                  return 11;
                } else {
                  if (':' === c) {
                    return 12;
                  } else {
                    if ('=' === c) {
                      return 13;
                    } else {
                      if ('\'' === c) {
                        return 17;
                      } else {
                        if ('"' === c) {
                          return 18;
                        } else {
                          if ('[' === c) {
                            return 19;
                          } else {
                            if (']' === c) {
                              return 20;
                            } else {
                              if ('(' === c) {
                                return 21;
                              } else {
                                if (')' === c) {
                                  return 22;
                                } else {
                                  return -1;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  }
  return receiver.toLowerCase();
};

$.addToIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0)) {
    return;
  }
  if (skipFirst !== true) {
    $._cast(view.get$spaceOwner()).bindFellow_$2(id, view);
  }
  var t0 = typeof view === 'object' && !!view.is$IdSpace;
  var parent$ = (void 0);
  var t1 = t0;
  if (t0) {
    var parent0 = view.get$parent();
    var t2 = !$.eqNullB(parent0);
    parent$ = parent0;
    t1 = t2;
  }
  if (t1) {
    $._cast(parent$.get$spaceOwner()).bindFellow_$2(id, view);
  }
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._createSafe = function(w) {
  if (w === $.window()) {
    return w;
  } else {
    return $._DOMWindowCrossFrameImpl$1(w);
  }
};

$.LayoutAmountInfo$1 = function(profile) {
  var t0 = new $.LayoutAmountInfo((void 0), (void 0));
  t0.LayoutAmountInfo$1(profile);
  return t0;
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$.SimpleSelectorSequence$0 = function() {
  var t0 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  var t1 = $.List((void 0));
  $.setRuntimeTypeInfo(t1, ({E: 'Attribute'}));
  var t2 = $.List((void 0));
  $.setRuntimeTypeInfo(t2, ({E: 'PseudoClass'}));
  return new $.SimpleSelectorSequence(0, t2, t1, t0, (void 0), (void 0));
};

$._CssClassSet$1 = function(_element) {
  return new $._CssClassSet(_element);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  }
  return a === b;
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator,  0);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t0 = $.iterator(strings), result = '', first = true; t0.hasNext$0() === true; result = result0, first = first0) {
    var result0 = result;
    var first0 = first;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    var result1 = result;
    if (!first) {
      result1 = result + separator;
    }
    var result2 = result1 + t1;
    result0 = result2;
    first0 = false;
  }
  return result;
};

$._SubviewList$1 = function(_owner) {
  return new $._SubviewList(_owner);
};

$.translate3d = function(x, y, z) {
  var t0 = 'translate3d(' + $.stringToString(x) + 'px,' + $.stringToString(y) + 'px,';
  if (!(z === (void 0))) {
    var t1 = z;
  } else {
    t1 = 0;
  }
  return t0 + $.stringToString(t1) + 'px)';
};

$.Canvas$0 = function() {
  var t0 = new $.Canvas(false, false, (void 0), (void 0), (void 0), (void 0), (void 0), 0, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), '');
  t0.View$0();
  return t0;
};

$.gtB = function(a, b) {
  return $.gt(a, b) === true;
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  }
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(b, 0)) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
    if ($.gtB(b, 31)) {
      return 0;
    }
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$.LayoutSideInfo$3 = function(profile, defaultValue, defaultInfo) {
  var t0 = new $.LayoutSideInfo((void 0), (void 0), (void 0), (void 0));
  t0.LayoutSideInfo$3(profile, defaultValue, defaultInfo);
  return t0;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.ViewConfig$0 = function() {
  var t0 = new $.ViewConfig('v_', 'v-');
  t0.ViewConfig$0();
  return t0;
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.FreeLayout$0 = function() {
  return new $.FreeLayout();
};

$._completeMeasurementFutures = function() {
  if ($.eqB($._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $._nextMeasurementFrameScheduled = false;
  if (!($._pendingRequests === (void 0))) {
    for (var t0 = $.iterator($._pendingRequests); t0.hasNext$0() === true; ) {
      var request = t0.next$0();
      try {
        var t1 = request.computeValue$0();
        request.set$value(t1);
      }catch (t2) {
        var t3 = $.unwrapException(t2);
        var e = t3;
        var t4 = e;
        request.set$value(t4);
        request.set$exception(true);
      }
    }
  }
  var completedRequests = $._pendingRequests;
  var readyMeasurementFrameCallbacks = $._pendingMeasurementFrameCallbacks;
  $._pendingRequests = (void 0);
  $._pendingMeasurementFrameCallbacks = (void 0);
  if (!(completedRequests === (void 0))) {
    for (var t5 = $.iterator(completedRequests); t5.hasNext$0() === true; ) {
      var t6 = t5.next$0();
      if (t6.get$exception() === true) {
        t6.get$completer().completeException$1(t6.get$value());
      } else {
        t6.get$completer().complete$1(t6.get$value());
      }
    }
  }
  if (!(readyMeasurementFrameCallbacks === (void 0))) {
    for (var t7 = $.iterator(readyMeasurementFrameCallbacks); t7.hasNext$0() === true; ) {
      t7.next$0().$call$0();
    }
  }
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.isJsArray = function(value) {
  return !(value === (void 0)) && (value.constructor === Array);
};

$._BroadcastEvents$1 = function(ptr) {
  return new $._BroadcastEvents($.makeLiteralMap([]), ptr);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now$0 = function() {
  var t0 = new $.DateImplementation($.TimeZoneImplementation$local$0(), $.dateNow());
  t0.DateImplementation$now$0();
  return t0;
};

$.isWhitespace = function(c) {
  return $.eqB(c, 32) || $.eqB(c, 9) || $.eqB(c, 10) || $.eqB(c, 13);
};

$.checkIdSpace = function(selector, index, ctx) {
  var t0 = selector.requiresIdSpace$1(index) === true;
  var t1 = !t0;
  if (t0) {
    var t2 = ctx.get$view();
    t1 = !((typeof t2 === 'object') && !!t2.is$IdSpace);
  }
  return t1;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    }
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  }
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    if ((typeof(name$)) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object')) {
      return name$;
    }
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.SelectorParseException$unexpectedEnding$1 = function(source) {
  return new $.SelectorParseException(-1, (void 0), source);
};

$.max = function(a, b) {
  if ($.ltB($.compareTo(a, b), 0)) {
    var t0 = b;
  } else {
    t0 = a;
  }
  return t0;
};

$.matchID = function(view, id) {
  return $.eqNullB(id) || $.eqB(id, view.get$id());
};

$._VirtualIdSpace$1 = function(_owner) {
  return new $._VirtualIdSpace($.makeLiteralMap([]), _owner);
};

$.Snake$1 = function(snakeEnvironment) {
  var t0 = new $.Snake(snakeEnvironment, true, (void 0), (void 0));
  t0.Snake$1(snakeEnvironment);
  return t0;
};

$._amountOf = function(profile, parentInner) {
  var ai = $.LayoutAmountInfo$1(profile);
  $0:{
    var t0 = ai.type;
    if (1 === t0) {
      return ai.value;
    } else {
      if (2 === t0) {
        return parentInner.$call$0();
      } else {
        if (3 === t0) {
          return $.toInt($.round($.mul(parentInner.$call$0(), ai.value)));
        }
      }
    }
  }
  return;
};

$.name = function(propertyName) {
  if ($._nsnms === (void 0)) {
    $._nsnms = $.HashSetImplementation$0();
    if ($.browser.get$ios() === true && $.ltB($.browser.get$iosVersion(), 5) || $.browser.get$android() === true && $.ltB($.browser.get$androidVersion(), 2.4) || $.browser.get$firefox() === true) {
      $.add$1($._nsnms, 'box-sizing');
    }
    for (var t0 = $.iterator($.CTC53); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      $.add$1($._nsnms, t1);
    }
  }
  if ($.contains$1($._nsnms, propertyName) === true) {
    var t2 = '' + $.stringToString($.prefix) + $.stringToString(propertyName);
  } else {
    t2 = propertyName;
  }
  return t2;
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return new $.Closure9(t0).$call$0();
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return new $.Closure10(t0).$call$0();
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return new $.Closure11(t0).$call$0();
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  }
  return a.operator$gt$1(b);
};

$.assert = function(condition) {
};

$._maybeScheduleMeasurementFrame = function() {
  if ($._nextMeasurementFrameScheduled === true) {
    return;
  }
  $._nextMeasurementFrameScheduled = true;
  if ($._firstMeasurementRequest === true) {
    $.add$1($.window().get$on().get$message(), new $.Closure88());
    $._firstMeasurementRequest = false;
  }
  $.window().postMessage$2('DART-MEASURE', '*');
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.last$0();
  }
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  }
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  }
  return a.operator$mul$1(b);
};

$.CSSStyleDeclaration = function() {
  return $.CSSStyleDeclaration$css('');
};

$._getHandlers = function(loc) {
  var loc0 = loc;
  if ($.isEmpty(loc) === true) {
    loc0 = 'top left';
  }
  var handlers = $.CTC37.operator$index$1(loc0);
  if (!$.eqNullB(handlers)) {
    return handlers;
  }
  var j = $.indexOf$1(loc0, ' ');
  if ($.gtB(j, 0)) {
    var handlers0 = $.CTC37.operator$index$1('' + $.stringToString($.substring$1(loc0, $.add(j, 1))) + ' ' + $.stringToString($.substring$2(loc0, 0, j)));
    if (!$.eqNullB(handlers0)) {
      return handlers0;
    }
  }
  throw $.captureStackTrace($.UIException$1('Unknown loation ' + $.stringToString(loc0)));
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  }
  return $._cachedBrowserPrefix;
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$._ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$.removeFromIdSpaceDown = function(view, space) {
  var id = view.get$id();
  if ($.gtB($.get$length(id), 0)) {
    space.bindFellow_$2(id, (void 0));
  }
  if (!((typeof view === 'object') && !!view.is$IdSpace)) {
    for (var view0 = view.get$firstChild(); !$.eqNullB(view0); view0 = view0.get$nextSibling()) {
      $.removeFromIdSpaceDown(view0, space);
    }
  }
};

$.link = function(view, child, beforeChild) {
  var ci = view._initChildInfo$0();
  if (beforeChild === (void 0)) {
    var p = ci.get$lastChild();
    if (!(p === (void 0))) {
      p.set$_nextSibling(child);
      child.set$_prevSibling(p);
      ci.set$lastChild(child);
    } else {
      ci.set$lastChild(child);
      ci.set$firstChild(child);
    }
  } else {
    var p0 = beforeChild.get$_prevSibling();
    if (!(p0 === (void 0))) {
      child.set$_prevSibling(p0);
      p0.set$_nextSibling(child);
    } else {
      ci.set$firstChild(child);
    }
    beforeChild.set$_prevSibling(child);
    child.set$_nextSibling(beforeChild);
  }
  child.set$_lib4_parent(view);
  var t0 = view.get$_childInfo();
  t0.set$nChild($.add(t0.get$nChild(), 1));
  if (typeof child === 'object' && !!child.is$IdSpace) {
    $.addToIdSpace(child, true);
  } else {
    $.addToIdSpaceDown(child, child.get$spaceOwner());
  }
};

$.getDay = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t0;
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.DateImplementation$fromEpoch$2 = function(value, timeZone) {
  return new $.DateImplementation(timeZone, value);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver) === true) {
    return receiver.length === 0;
  }
  return receiver.isEmpty$0();
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$._ViewEventListenerList$2 = function(_ptr, _type) {
  return new $._ViewEventListenerList(_type, _ptr);
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  }
};

$.Application$1 = function(name$) {
  var t0 = new $.Application((void 0), (void 0), false, (void 0));
  t0.Application$1(name$);
  return t0;
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  }
  return result;
};

$.getMonth = function(receiver) {
  if (receiver.get$timeZone().get$isUtc() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t0;
};

$._isWhitespace = function(c) {
  return $.eqB(c, 32) || $.eqB(c, 9) || $.eqB(c, 10) || $.eqB(c, 13);
};

$._isAllIds = function(list, offset) {
  if (typeof offset !== 'number') return $._isAllIds$bailout(list, offset,  0);
  for (var t0 = $.iterator(list); t0.hasNext$0() === true; ) {
    if ($.gtB($.get$length(t0.next$0().get$seqs()), offset)) {
      return false;
    }
  }
  return true;
};

$._WindowQuery$1 = function(v) {
  return new $._WindowQuery(v);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.LinearLayout$0 = function() {
  return new $.LinearLayout();
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.spaceOwner = function(view) {
  var top$ = (void 0);
  var p = view;
  do {
    if (typeof p === 'object' && !!p.is$IdSpace) {
      return $._cast(p);
    }
    top$ = p;
  } while (p0 = p.get$parent(), p = p0, !$.eqNullB(p0));
  if (top$.get$_virtIS() === (void 0)) {
    top$.set$_virtIS($._VirtualIdSpace$1(top$));
  }
  return top$.get$_virtIS();
  var p0;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  }
  return Math.abs(receiver);
};

$._DragGesture = function(owner, handle, transform, range, movement, start, end, moving) {
  var handle0 = handle;
  if (handle === (void 0)) {
    handle0 = owner;
  }
  if ($.browser.get$touch() === true) {
    var t0 = $._TouchDragGesture$8(owner, handle0, transform, range, movement, start, end, moving);
  } else {
    t0 = $._MouseDragGesture$8(owner, handle0, transform, range, movement, start, end, moving);
  }
  return t0;
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(sb, 'm');
  }
  if (ignoreCase === true) {
    $.add$1(sb, 'i');
  }
  if (global === true) {
    $.add$1(sb, 'g');
  }
  try {
    return new RegExp(pattern, $.toString(sb));
  }catch (t0) {
    var t1 = $.unwrapException(t0);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(pattern, (String(e))));
  }
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  }
  return receiver.iterator$0();
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  }
  return receiver.date;
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.TextView$1 = function(text) {
  var t0 = new $.TextView((void 0), (void 0), false, false, (void 0), (void 0), (void 0), (void 0), (void 0), 0, 0, (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), '');
  t0.View$0();
  t0.TextView$1(text);
  return t0;
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    if ($.ltB(a, b)) {
      return -1;
    } else {
      if ($.gtB(a, b)) {
        return 1;
      } else {
        if ($.eqB(a, b)) {
          if ($.eqB(a, 0)) {
            var aIsNegative = $.isNegative(a);
            if ($.eqB(aIsNegative, $.isNegative(b))) {
              return 0;
            }
            if (aIsNegative === true) {
              return -1;
            }
            return 1;
          }
          return 0;
        } else {
          if ($.isNaN(a) === true) {
            if ($.isNaN(b) === true) {
              return 0;
            }
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  } else {
    if (typeof a === 'string') {
      if (!(typeof b === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(b));
      }
      if (a == b) {
        var t0 = 0;
      } else {
        if (a < b) {
          t0 = -1;
        } else {
          t0 = 1;
        }
      }
      return t0;
    } else {
      return a.compareTo$1(b);
    }
  }
};

$.ge = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  }
  return a.operator$ge$1(b);
};

$.isDescendant = function(c1, c2) {
  if ($.eqB(c1, c2)) {
    return true;
  }
  for (var c10 = c1; c11 = c10.get$parent(), !$.eqNullB(c11); c10 = c11) {
    if ($.eqB(c11, c2)) {
      return true;
    }
    if (typeof c11 === 'object' && !!c11.is$IdSpace) {
      return $.eq(c11, c2);
    }
  }
  return false;
  var c11;
};

$._MeasurementRequest$2 = function(computeValue, completer) {
  return new $._MeasurementRequest(false, (void 0), completer, computeValue);
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.ViewEvent$dom$3 = function(target, domEvent, type) {
  if (!$.eqNullB(type)) {
    var t0 = type;
  } else {
    t0 = domEvent.get$type();
  }
  var t1 = new $.ViewEvent((void 0), false, false, (void 0), domEvent.get$timeStamp(), t0, domEvent, (void 0));
  t1.ViewEvent$dom$3(target, domEvent, type);
  return t1;
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$._Offset3d$3 = function(x, y, z) {
  return new $._Offset3d(z, y, x);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    }
    return $.indexOf2(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      }
      if (start < 0) {
        return -1;
      }
      return receiver.indexOf(element, start);
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.RunOnceQueue$0 = function() {
  return new $.RunOnceQueue((void 0));
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    t1 = length$ < 0;
  }
  if (t1) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.dateNow = function() {
  return Date.now();
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$._Animator$0 = function() {
  var t0 = new $._Animator((void 0), (void 0), (void 0), $.List((void 0)));
  t0._Animator$0();
  return t0;
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._domEvtDisp = function(type) {
  var t0 = ({});
  t0.type_3 = type;
  return new $.Closure71(t0);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.round = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.round$0();
  }
  if (receiver < 0) {
    return -Math.round(-receiver);
  } else {
    return Math.round(receiver);
  }
};

$.CSSStyleDeclarationImpl$1 = function(_view) {
  return new $.CSSStyleDeclarationImpl((void 0), _view);
};

$._HLayout$0 = function() {
  return new $._HLayout();
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.copy = function(src, srcStart, dst, dstStart, count) {
  if (typeof src !== 'string' && (typeof src !== 'object'||src.constructor !== Array)) return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  if (typeof dst !== 'object'||dst.constructor !== Array||!!dst.immutable$list) return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  if (typeof count !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count,  0);
  var srcStart0 = srcStart;
  if (srcStart === (void 0)) {
    srcStart0 = 0;
  }
  if (typeof srcStart0 !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 4, src, dst, count, srcStart0);
  var dstStart0 = dstStart;
  if (dstStart === (void 0)) {
    dstStart0 = 0;
  }
  if (typeof dstStart0 !== 'number') return $.copy$bailout(src, srcStart, dst, dstStart, count, 5, src, dst, count, srcStart0, dstStart0);
  var t0 = srcStart0 < dstStart0;
  var t1 = srcStart0 + count;
  if (t0) {
    var t2 = dstStart0 + count;
    for (var i = t1 - 1, i0 = i, j = t2 - 1; i0 >= srcStart0; i0 = i1, j = j - 1) {
      if (i0 !== (i0 | 0)) throw $.iae(i0);
      var t3 = src.length;
      if (i0 < 0 || i0 >= t3) throw $.ioore(i0);
      var t4 = src[i0];
      if (j !== (j | 0)) throw $.iae(j);
      var t5 = dst.length;
      if (j < 0 || j >= t5) throw $.ioore(j);
      dst[j] = t4;
      var i1 = i0 - 1;
    }
  } else {
    for (var i2 = srcStart0, j0 = dstStart0; i2 < t1; i2 = i3, j0 = j0 + 1) {
      if (i2 !== (i2 | 0)) throw $.iae(i2);
      var t6 = src.length;
      if (i2 < 0 || i2 >= t6) throw $.ioore(i2);
      var t7 = src[i2];
      if (j0 !== (j0 | 0)) throw $.iae(j0);
      var t8 = dst.length;
      if (j0 < 0 || j0 >= t8) throw $.ioore(j0);
      dst[j0] = t7;
      var i3 = i2 + 1;
    }
  }
};

$.removeFromIdSpace = function(view, skipFirst) {
  var id = view.get$id();
  if ($.eqB($.get$length(id), 0)) {
    return;
  }
  if (skipFirst !== true) {
    $._cast(view.get$spaceOwner()).bindFellow_$2(id, (void 0));
  }
  var t0 = typeof view === 'object' && !!view.is$IdSpace;
  var parent$ = (void 0);
  var t1 = t0;
  if (t0) {
    var parent0 = view.get$parent();
    var t2 = !$.eqNullB(parent0);
    parent$ = parent0;
    t1 = t2;
  }
  if (t1) {
    $._cast(parent$.get$spaceOwner()).bindFellow_$2(id, (void 0));
  }
};

$.LayoutManager$0 = function() {
  var t0 = $.RunOnceQueue$0();
  var t1 = $.HashSetImplementation$0();
  var t2 = $.List((void 0));
  var t3 = $.makeLiteralMap([]);
  var t4 = new $.LayoutManager(0, $.HashSetImplementation$0(), t3, true, true, t2, (void 0), t1, t0);
  t4.LayoutManager$0();
  return t4;
};

$.ProfileDeclarationImpl$1 = function(owner) {
  return new $.ProfileDeclarationImpl((void 0), owner, $.HashMapImplementation$0());
};

$.offset3dOf = function(value) {
  if ($.eqNullB(value) || $.isEmpty(value) === true) {
    return $._Offset3d$3(0, 0, 0);
  }
  var ary = [0, 0, 0];
  var i = $.indexOf$1(value, '(');
  var value0 = value;
  if ($.geB(i, 0)) {
    value0 = $.substring$1(value, $.add(i, 1));
  }
  for (var t0 = $.iterator($.split(value0, ',')), i0 = 0; t0.hasNext$0() === true; i0 = i1) {
    var i1 = i0;
    var t1 = t0.next$0();
    var i2 = i0 + 1;
    var t2 = $.intOf(t1, (void 0));
    var t3 = ary.length;
    if (i0 < 0 || i0 >= t3) throw $.ioore(i0);
    ary[i0] = t2;
    if (i2 === 3) {
      break;
    }
    i1 = i2;
  }
  var t4 = ary.length;
  if (0 >= t4) throw $.ioore(0);
  var t5 = ary[0];
  var t6 = ary.length;
  if (1 >= t6) throw $.ioore(1);
  var t7 = ary[1];
  var t8 = ary.length;
  if (2 >= t8) throw $.ioore(2);
  return $._Offset3d$3(t5, t7, ary[2]);
};

$.remove = function(list, obj) {
  if (!(list === (void 0))) {
    var j = $.indexOf$1(list, obj);
    if ($.geB(j, 0)) {
      $.removeRange(list, j, 1);
      return true;
    }
  }
  return false;
};

$._getTokenClass = function(c) {
  if ($._isWhitespace(c) === true) {
    var t0 = 1;
  } else {
    if ($._isLiteral(c) === true) {
      t0 = 0;
    } else {
      t0 = 2;
    }
  }
  return t0;
};

$.FutureAlreadyCompleteException$0 = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$._MouseDragGesture$8 = function(owner, handle, transform, range, movement, start, end, moving) {
  var t0 = new $._MouseDragGesture(false, (void 0), (void 0), (void 0), transform, (void 0), movement, range, moving, end, start, handle, owner);
  t0._DragGesture$_init$8(owner, handle, transform, range, movement, start, end, moving);
  return t0;
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.convertDartClosureToJS = function(closure) {
  if (closure === (void 0)) {
    return;
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $, arguments.length, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$.parse = function(source) {
  var tokens = $.tokenize(source);
  var selectors = $.List((void 0));
  $.setRuntimeTypeInfo(selectors, ({E: 'Selector'}));
  $.get$length(tokens);
  for (var t0 = $.iterator(tokens), curr = (void 0), currSeq = (void 0), state = 1; t0.hasNext$0() === true; curr = curr0, currSeq = currSeq0, state = state0) {
    var currSeq0 = currSeq;
    var state0 = state;
    var curr0 = curr;
    var t1 = t0.next$0();
    if ($.eqB(t1.get$type(), 5)) {
      var t2 = 9 === state;
      $1:{
        var t3 = t2;
        if (!t2) {
          var t4 = 14 === state;
          t3 = t4;
          if (!t4) {
            var t5 = 8 === state;
            t3 = t5;
            if (!t5) {
              var t6 = 3 === state;
              t3 = t6;
              if (!t6) {
                t3 = t2;
              }
            }
          }
        }
        if (t3) {
          break $1;
        } else {
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
        }
      }
      currSeq0 = (void 0);
      state0 = 17;
      curr0 = (void 0);
      continue;
    }
    var curr1 = curr;
    var currSeq1 = currSeq;
    if ($.eqNullB(currSeq) && $._requireSequence(state, t1.get$type()) === true) {
      var curr2 = curr;
      if ($.eqNullB(curr)) {
        var curr3 = $.Selector$1(selectors.length);
        selectors.push(curr3);
        curr2 = curr3;
      }
      var currSeq2 = curr2.addSequence$0();
      curr1 = curr2;
      currSeq1 = currSeq2;
    }
    var t7 = 17 === state;
    $1:{
      if (t7) {
        if ($.eqB(t1.get$type(), 3)) {
          currSeq0 = currSeq1;
          state0 = 1;
          curr0 = curr1;
          continue;
        }
        break $1;
      } else {
        if (3 === state) {
          $2:{
            var t8 = t1.get$type();
            if (7 === t8 || (9 === t8 || 8 === t8)) {
              if ($.eqNullB(curr1)) {
                throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
              }
              curr1.addCombinator$1(t1);
              currSeq0 = currSeq1;
              state0 = 2;
              curr0 = curr1;
              continue;
            }
          }
          break $1;
        } else {
          if (8 === state) {
            if ($.eqB(t1.get$type(), 21)) {
              currSeq0 = currSeq1;
              state0 = 15;
              curr0 = curr1;
              continue;
            }
            break $1;
          } else {
            if (15 === state) {
              if (!$.eqB(t1.get$type(), 1)) {
                throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
              }
              var t9 = t1.source$1(source);
              $.last(currSeq1.get$pseudoClasses()).set$parameter(t9);
              currSeq0 = currSeq1;
              state0 = 16;
              curr0 = curr1;
              continue;
            } else {
              if (16 === state) {
                if (!$.eqB(t1.get$type(), 22)) {
                  throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
                }
                currSeq0 = currSeq1;
                state0 = 9;
                curr0 = curr1;
                continue;
              }
            }
          }
        }
      }
    }
    $1:{
      if (t7 || (3 === state || 1 === state)) {
        $2:{
          var t10 = t1.get$type();
          if (1 === t10) {
            currSeq1.set$type(t1.source$1(source));
            currSeq0 = currSeq1;
            state0 = 9;
            curr0 = curr1;
            continue;
          } else {
            if (2 === t10) {
              currSeq0 = (void 0);
              state0 = 14;
              curr0 = curr1;
              continue;
            }
          }
        }
        break $1;
      } else {
        if (8 === state || 9 === state) {
          if ($.eqB(t1.get$type(), 3)) {
            currSeq0 = (void 0);
            state0 = 3;
            curr0 = curr1;
            continue;
          }
          break $1;
        } else {
          if (5 === state || (6 === state || 7 === state)) {
            if (!$.eqB(t1.get$type(), 1)) {
              throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
            }
            break $1;
          }
        }
      }
    }
    $1:{
      if (2 === state) {
        if (!$.eqB(t1.get$type(), 3)) {
          throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
        }
        state0 = 1;
        break $1;
      } else {
        if (t7 || (3 === state || (8 === state || (1 === state || 9 === state)))) {
          $2:{
            var t11 = t1.get$type();
            if (10 === t11) {
              state0 = 5;
              break $2;
            } else {
              if (11 === t11) {
                state0 = 6;
                break $2;
              } else {
                if (12 === t11) {
                  state0 = 7;
                  break $2;
                } else {
                  throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
                }
              }
            }
          }
          break $1;
        } else {
          if (14 === state) {
            if (!$.eqB(t1.get$type(), 3)) {
              throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
            }
            state0 = 3;
            break $1;
          } else {
            if (5 === state) {
              if (!$.eqNullB(currSeq1.get$id())) {
                throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
              }
              currSeq1.set$id(t1.source$1(source));
              state0 = 9;
              break $1;
            } else {
              if (6 === state) {
                $.add$1(currSeq1.get$classes(), t1.source$1(source));
                state0 = 9;
                break $1;
              } else {
                if (7 === state) {
                  $.add$1(currSeq1.get$pseudoClasses(), $.PseudoClass$1(t1.source$1(source)));
                  state0 = 8;
                  break $1;
                } else {
                  throw $.captureStackTrace($.SelectorParseException$unexpectedToken$2(source, t1));
                }
              }
            }
          }
        }
      }
    }
    currSeq0 = currSeq1;
    curr0 = curr1;
  }
  $0:{
    if (5 === state || (6 === state || (7 === state || (17 === state || (2 === state || (1 === state || (15 === state || 16 === state))))))) {
      throw $.captureStackTrace($.SelectorParseException$unexpectedEnding$1(source));
    }
  }
  return selectors;
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var result0 = result;
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
    result0 = result + t1;
  }
  return result;
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.PopupEvent$2 = function(source, type) {
  var t0 = new $.PopupEvent(source, (void 0), false, false, (void 0), $.DateImplementation$now$0().get$millisecondsSinceEpoch(), type, (void 0), (void 0));
  t0.ViewEvent$6((void 0), type, (void 0), (void 0), (void 0), (void 0));
  return t0;
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t0 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t0._DoubleLinkedQueueIterator$1(_sentinel);
  return t0;
};

$.LinkedHashMapImplementation$0 = function() {
  var t0 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t0.LinkedHashMapImplementation$0();
  return t0;
};

$.SnakePoint$2 = function(x, y) {
  return new $.SnakePoint(y, x);
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC2));
  }
  return object;
};

$.addCharCodes = function(src, diff) {
  var j = $.get$length(src);
  if (typeof j !== 'number') return $.addCharCodes$bailout(src, diff, 1, j);
  var dst = $.List(j);
  for (var j0 = j; j1 = j0 - 1, j1 >= 0; j0 = j1) {
    var t0 = $.add($.charCodeAt(src, j1), diff);
    if (j1 !== (j1 | 0)) throw $.iae(j1);
    var t1 = dst.length;
    if (j1 < 0 || j1 >= t1) throw $.ioore(j1);
    dst[j1] = t0;
  }
  return $.String$fromCharCodes(dst);
  var j1;
};

$.CompleterImpl$0 = function() {
  return new $.CompleterImpl($.FutureImpl$0());
};

$.getDefinition = function(name$) {
  $0:{
    if ('first-child' === name$) {
      return new $.Closure61();
    } else {
      if ('last-child' === name$) {
        return new $.Closure62();
      } else {
        if ('only-child' === name$) {
          return new $.Closure63();
        } else {
          if ('empty' === name$) {
            return new $.Closure64();
          } else {
            if ('nth-child' === name$) {
              return new $.Closure65();
            } else {
              if ('last-nth-child' === name$) {
                return new $.Closure66();
              } else {
                return;
              }
            }
          }
        }
      }
    }
  }
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._Offset$2 = function(left, top$) {
  return new $._Offset(top$, left);
};

$._initBoolList = function(selectors) {
  var list = $.List((void 0));
  $.setRuntimeTypeInfo(list, ({E: 'List<bool>'}));
  for (var t0 = $.iterator(selectors), sublist = (void 0); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    var sublist0 = $.List((void 0));
    $.setRuntimeTypeInfo(sublist0, ({E: 'bool'}));
    list.push(sublist0);
    for (var i = 0; $.ltB(i, $.get$length(t1.get$seqs())); i = i + 1) {
      sublist0.push(false);
    }
    sublist = sublist0;
  }
  return list;
};

$.DoubleLinkedQueue$0 = function() {
  var t0 = new $.DoubleLinkedQueue((void 0));
  t0.DoubleLinkedQueue$0();
  return t0;
};

$.isLiteral = function(c) {
  return $.gtB(c, 96) && $.ltB(c, 123) || $.gtB(c, 64) && $.ltB(c, 91) || $.gtB(c, 47) && $.ltB(c, 58) || $.eqB(c, 95) || $.eqB(c, 45);
};

$._ChildInfo$0 = function() {
  return new $._ChildInfo((void 0), 0, (void 0), (void 0));
};

$._now = function() {
  return $.DateImplementation$now$0().get$millisecondsSinceEpoch();
};

$._anchorXHandlers = function() {
  if ($.eqNullB($._cacheXAnchorHandlers)) {
    $._cacheXAnchorHandlers = [new $.Closure36(), new $.Closure37(), new $.Closure38(), new $.Closure39(), new $.Closure40()];
  }
  return $._cacheXAnchorHandlers;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.UIException$1 = function(message) {
  return new $.UIException(message);
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$._AttributeClassSet$1 = function(element) {
  return new $._AttributeClassSet(element);
};

$.encodeId = function(v, prefix) {
  if (typeof v !== 'number') return $.encodeId$bailout(v, prefix,  0);
  var t0 = prefix === (void 0);
  var sb = $.StringBufferImpl$1('');
  if (!t0) {
    sb.add$1(prefix);
  }
  var v0 = v;
  do {
    var v2 = $.mod(v0, 37);
    if (v2 <= 9) {
      sb.add$1($.addCharCodes('0', v2));
    } else {
      if (v2 === 36) {
        var t1 = '_';
      } else {
        t1 = $.addCharCodes('a', v2 - 10);
      }
      sb.add$1(t1);
    }
    var v1 = $.tdiv(v0, 37);
  } while (v0 = v1, v1 >= 1);
  return sb.toString$0();
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$._ElementRectImpl$1 = function(element) {
  var t0 = $._SimpleClientRect$4(element.get$$$dom_clientLeft(), element.get$$$dom_clientTop(), element.get$$$dom_clientWidth(), element.get$$$dom_clientHeight());
  var t1 = $._SimpleClientRect$4(element.get$$$dom_offsetLeft(), element.get$$$dom_offsetTop(), element.get$$$dom_offsetWidth(), element.get$$$dom_offsetHeight());
  var t2 = $._SimpleClientRect$4(element.get$$$dom_scrollLeft(), element.get$$$dom_scrollTop(), element.get$$$dom_scrollWidth(), element.get$$$dom_scrollHeight());
  var t3 = element.$dom_getBoundingClientRect$0();
  return new $._ElementRectImpl(element.$dom_getClientRects$0(), t3, t2, t1, t0);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    }
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$._ClassSet$1 = function(view) {
  var t0 = new $._ClassSet(view, (void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$.LayoutDeclarationImpl$1 = function(owner) {
  return new $.LayoutDeclarationImpl(owner, $.HashMapImplementation$0());
};

$.stringFromCharCodes = function(charCodes) {
  for (var t0 = $.iterator(charCodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (!((typeof t1 === 'number') && (t1 === (t1 | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    }
  }
  return String.fromCharCode.apply((void 0), charCodes);
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  }
  return name$;
};

$.tokenize = function(source) {
  var tokens = $.List((void 0));
  $.setRuntimeTypeInfo(tokens, ({E: 'Token'}));
  var len = $.get$length(source);
  if (typeof len !== 'number') return $.tokenize$bailout(source, 1, tokens, len);
  for (var pclz = 2, i = 0, curr = (void 0); i < len; pclz = pclz0, i = i0, curr = curr0) {
    var pclz0 = pclz;
    var curr0 = curr;
    var c = $.substring$2(source, i, i + 1);
    var clz = $._getTokenClass($.charCodeAt(source, i));
    if (!$.eqNullB(curr) && $.eqB(clz, pclz) && !$.eqB(clz, 2)) {
      curr.extend$0();
      curr0 = curr;
    } else {
      var curr1 = $.Token$fromChar$2(c, i);
      tokens.push(curr1);
      curr0 = curr1;
    }
    pclz0 = clz;
    var i0 = i + 1;
  }
  return tokens;
};

$._WCIterator$1 = function(owner) {
  var t0 = new $._WCIterator((void 0));
  t0._WCIterator$1(owner);
  return t0;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  }
  var length$ = (receiver.length);
  for (var hash = 0, i = 0; i < length$; hash = hash0, i = i0) {
    var hash0 = hash;
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$0();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  }
  return other == receiver.substring(0, length$);
};

$.createFromCharCodes = function(charCodes) {
  $.checkNull(charCodes);
  var charCodes0 = charCodes;
  if ($.isJsArray(charCodes) !== true) {
    if (!((typeof charCodes === 'object') && (((charCodes.constructor === Array) || charCodes.is$List2())))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(charCodes));
    }
    charCodes0 = $.List$from(charCodes);
  }
  return $.stringFromCharCodes(charCodes0);
};

$.le = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  }
  return a.operator$le$1(b);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC60) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$._check = function(propertyName) {
  if ($._illnms === (void 0)) {
    $._illnms = $.HashSetImplementation$0();
    for (var t0 = $.iterator($.CTC54); t0.hasNext$0() === true; ) {
      var t1 = t0.next$0();
      $.add$1($._illnms, t1);
    }
  }
  if ($.contains$1($._illnms, propertyName) === true) {
    throw $.captureStackTrace($.UIException$1('' + $.stringToString(propertyName) + ' not allowed. Please use View\'s API instead, such as left, width and hidden.'));
  }
};

$.PseudoClass$1 = function(name$) {
  return new $.PseudoClass((void 0), name$);
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  }
  var startIndex0 = startIndex;
  if ($.ltB(startIndex, 0)) {
    startIndex0 = 0;
  }
  if (typeof startIndex0 !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex, 3, a, endIndex, startIndex0);
  for (var i = startIndex0; i < endIndex; i = i + 1) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    }
  }
  return -1;
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.unlink = function(view, child) {
  if (typeof child === 'object' && !!child.is$IdSpace) {
    $.removeFromIdSpace(child, true);
  } else {
    $.removeFromIdSpaceDown(child, child.get$spaceOwner());
  }
  var p = child.get$_prevSibling();
  var n = child.get$_nextSibling();
  if (!(p === (void 0))) {
    p.set$_nextSibling(n);
  } else {
    view.get$_childInfo().set$firstChild(n);
  }
  if (!(n === (void 0))) {
    n.set$_prevSibling(p);
  } else {
    view.get$_childInfo().set$lastChild(p);
  }
  child.set$_lib4_parent((void 0));
  child.set$_prevSibling((void 0));
  child.set$_nextSibling((void 0));
  var t0 = view.get$_childInfo();
  t0.set$nChild($.sub(t0.get$nChild(), 1));
};

$.parseDouble = function(str) {
  return $.parseDouble2(str);
};

$.parseDouble2 = function(str) {
  $.checkString(str);
  var ret = (parseFloat(str));
  var ret0 = ret;
  if (ret === 0 && ($.startsWith(str, '0x') === true || $.startsWith(str, '0X') === true)) {
    ret0 = (parseInt(str));
  }
  if ($.isNaN(ret0) === true && !$.eqB(str, 'NaN') && !$.eqB(str, '-NaN')) {
    throw $.captureStackTrace($.BadNumberFormatException$1(str));
  }
  return ret0;
};

$.List = function(length$) {
  return $.newList(length$);
};

$.indexOf$1 = function(receiver, element) {
  if ($.isJsArray(receiver) === true || typeof receiver === 'string') {
    return $.indexOf$2(receiver, element, 0);
  }
  return receiver.indexOf$1(element);
};

$._anchorYHandlers = function() {
  if ($.eqNullB($._cacheYAnchorHandlers)) {
    $._cacheYAnchorHandlers = [new $.Closure31(), new $.Closure32(), new $.Closure33(), new $.Closure34(), new $.Closure35()];
  }
  return $._cacheYAnchorHandlers;
};

$._BroadcastListeners$1 = function(_owner) {
  return new $._BroadcastListeners($.HashMapImplementation$0(), _owner);
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$._getSetByApp = function(view, val, nm) {
  if (!(val === (void 0)) && !$.eqB(val, $.index(view.get$dataAttributes(), nm))) {
    var t0 = val;
  } else {
    t0 = (void 0);
  }
  return t0;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$._OnDemandMap$1 = function(_creator) {
  return new $._OnDemandMap((void 0), _creator);
};

$.onDemand = function(creator) {
  return $._OnDemandMap$1(creator);
};

$.FutureNotCompleteException$0 = function() {
  return new $.FutureNotCompleteException();
};

$.lt = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  }
  return a.operator$lt$1(b);
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
    if (ex instanceof TypeError) {
      var type = (ex.type);
      var name$ = $.index((ex.arguments), 0);
      if (type === 'property_not_function' || type === 'called_non_callable' || type === 'non_object_property_call' || type === 'non_object_property_load') {
        if (!(name$ === (void 0)) && $.startsWith(name$, '$call$') === true) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NullPointerException$2((void 0), $.CTC2);
        }
      } else {
        if (type === 'undefined_method') {
          if (typeof name$ === 'string' && $.startsWith(name$, '$call$') === true) {
            return $.ObjectNotClosureException$0();
          } else {
            return $.NoSuchMethodException$4('', name$, [], (void 0));
          }
        }
      }
    } else {
      if (ex instanceof RangeError) {
        if ($.contains$1((ex.message), 'call stack') === true) {
          return $.StackOverflowException$0();
        }
      }
    }
  }
  return ex;
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.isChar = function(cc, digit, upper, lower, whitespace, match) {
  $._init();
  if ($.isEmpty(cc) === true) {
    var v = 0;
  } else {
    v = $.charCodeAt(cc, 0);
  }
  return digit === true && $.geB(v, $._CC_0) && $.leB(v, $._CC_9) || upper === true && $.geB(v, $._CC_A) && $.leB(v, $._CC_Z) || lower === true && $.geB(v, $._CC_a) && $.leB(v, $._CC_z) || whitespace === true && ($.eqB(cc, ' ') || $.eqB(cc, '\x09') || $.eqB(cc, '\n') || $.eqB(cc, '\r')) || !$.eqNullB(match) && $.geB($.indexOf$1(match, cc), 0);
};

$.sub = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  }
  return a.operator$sub$1(b);
};

$._requireSequence = function(state, type) {
  if (!$.eqB(type, 1) && !$.eqB(type, 2)) {
    return false;
  }
  $0:{
    if (17 === state || (3 === state || (1 === state || (5 === state || (6 === state || (7 === state || 10 === state)))))) {
      return true;
    } else {
      return false;
    }
  }
};

$.tokenize$bailout = function(source, state, env0, env1) {
  switch (state) {
    case 1:
      tokens = env0;
      len = env1;
      break;
  }
  switch (state) {
    case 0:
      var tokens = $.List((void 0));
      $.setRuntimeTypeInfo(tokens, ({E: 'Token'}));
      var len = $.get$length(source);
    case 1:
      state = 0;
      var pclz = 2;
      var i = 0;
      var curr = (void 0);
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var pclz0 = pclz;
        var curr0 = curr;
        var c = $.substring$2(source, i, i + 1);
        var clz = $._getTokenClass($.charCodeAt(source, i));
        if (!$.eqNullB(curr) && $.eqB(clz, pclz) && !$.eqB(clz, 2)) {
          curr.extend$0();
          curr0 = curr;
        } else {
          var curr1 = $.Token$fromChar$2(c, i);
          tokens.push(curr1);
          curr0 = curr1;
        }
        pclz0 = clz;
        var i0 = i + 1;
        pclz = pclz0;
        i = i0;
        curr = curr0;
      }
      return tokens;
  }
};

$.encodeId$bailout = function(v, prefix, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var sb = $.StringBufferImpl$1('');
      if (!(prefix === (void 0))) {
        sb.add$1(prefix);
      }
      var v0 = v;
      L0: while (true) {
        var v2 = $.mod(v0, 37);
        if ($.leB(v2, 9)) {
          sb.add$1($.addCharCodes('0', v2));
        } else {
          if ($.eqB(v2, 36)) {
            var t1 = '_';
          } else {
            t1 = $.addCharCodes('a', $.sub(v2, 10));
          }
          sb.add$1(t1);
        }
        var v1 = $.tdiv(v0, 37);
        v0 = v1;
        if (!$.geB(v1, 1)) break L0;
      }
      return sb.toString$0();
  }
};

$.copy$bailout = function(src, srcStart, dst, dstStart, count, state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      break;
    case 4:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      srcStart0 = env3;
      break;
    case 5:
      t0 = env0;
      t1 = env1;
      t2 = env2;
      srcStart0 = env3;
      dstStart0 = env4;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
    case 3:
      state = 0;
      var srcStart0 = srcStart;
      if (srcStart === (void 0)) {
        srcStart0 = 0;
      }
    case 4:
      state = 0;
      var dstStart0 = dstStart;
      if (dstStart === (void 0)) {
        dstStart0 = 0;
      }
    case 5:
      state = 0;
      if ($.ltB(srcStart0, dstStart0)) {
        var i = $.sub($.add(srcStart0, count), 1);
        var i0 = i;
        var j = $.sub($.add(dstStart0, count), 1);
        L0: while (true) {
          if (!$.geB(i0, srcStart0)) break L0;
          $.indexSet(dst, j, $.index(src, i0));
          var i1 = $.sub(i0, 1);
          i0 = i1;
          j = $.sub(j, 1);
        }
      } else {
        var i2 = srcStart0;
        var j0 = dstStart0;
        L1: while (true) {
          if (!$.ltB(i2, $.add(srcStart0, count))) break L1;
          $.indexSet(dst, j0, $.index(src, i2));
          var i3 = $.add(i2, 1);
          i2 = i3;
          j0 = $.add(j0, 1);
        }
      }
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1, env2) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
    case 3:
      t0 = env0;
      t1 = env1;
      startIndex0 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      }
      var startIndex0 = startIndex;
      if ($.ltB(startIndex, 0)) {
        startIndex0 = 0;
      }
    case 3:
      state = 0;
      var i = startIndex0;
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var result = '';
      var first = true;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var result0 = result;
        var first0 = first;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        }
        var result1 = result;
        if (!first) {
          result1 = $.add(result, separator);
        }
        var result2 = result1 + t2;
        result0 = result2;
        first0 = false;
        result = result0;
        first = first0;
      }
      return result;
  }
};

$.addCharCodes$bailout = function(src, diff, state, env0) {
  switch (state) {
    case 1:
      j = env0;
      break;
  }
  switch (state) {
    case 0:
      var j = $.get$length(src);
    case 1:
      state = 0;
      var dst = $.List(j);
      var j0 = j;
      L0: while (true) {
        var j1 = $.sub(j0, 1);
        if (!$.geB(j1, 0)) break L0;
        var t0 = $.add($.charCodeAt(src, j1), diff);
        if (j1 !== (j1 | 0)) throw $.iae(j1);
        var t1 = dst.length;
        if (j1 < 0 || j1 >= t1) throw $.ioore(j1);
        dst[j1] = t0;
        j0 = j1;
      }
      return $.String$fromCharCodes(dst);
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      result = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
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
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var startIndex0 = startIndex;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      i = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      }
      var i0 = start;
      L0: while (true) {
        if (!$.ltB(i0, end)) break L0;
        $.add$1(accumulator, $.index(a, i0));
        i0 = $.add(i0, 1);
      }
      return accumulator;
  }
};

$.encodeXML$bailout = function(txt, multiline, maxlength, pre, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      j = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.eqNullB(txt)) {
        return;
      }
      var tl = $.get$length(txt);
      var t1 = pre === true;
      var multiline0 = t1 || multiline === true;
      var t2 = !multiline0;
      if (t2 && $.gtB(maxlength, 0) && $.gtB(tl, maxlength)) {
        var j0 = maxlength;
        L0: while (true) {
          if (!($.gtB(j0, 0) && $.isChar($.index(txt, $.sub(j0, 1)), false, false, false, true, (void 0)) === true)) break L0;
          var j1 = j0;
          j1 = $.sub(j0, 1);
          j0 = j1;
        }
        return $.encodeXML('' + $.stringToString($.substring$2(txt, 0, j0)) + '...', multiline0, 0, pre);
      }
      var out = $.StringBufferImpl$1('');
      var t3 = multiline0;
      if (t2) {
        t3 = t1;
      }
      if (t3) {
        var k = 0;
        var enc = (void 0);
        var j2 = 0;
        L1: while (true) {
          if (!$.ltB(j2, tl)) break L1;
          var k0 = k;
          var cc = $.index(txt, j2);
          var enc0 = $.CTC11.operator$index$1(cc);
          if (!$.eqNullB(enc0)) {
            $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k, j2)), '&'), enc0), ';');
            k0 = j2 + 1;
          } else {
            if (multiline0 && $.eqB(cc, '\n')) {
              $.add$1(out.add$1($.substring$2(txt, k, j2)), '<br/>\n');
              k0 = j2 + 1;
            } else {
              k0 = k;
              if (t1 && ($.eqB(cc, ' ') || $.eqB(cc, '\x09'))) {
                $.add$1(out.add$1($.substring$2(txt, k, j2)), '&nbsp;');
                if ($.eqB(cc, '\x09')) {
                  out.add$1('&nbsp;&nbsp;&nbsp;');
                }
                k0 = j2 + 1;
              }
            }
          }
          enc = enc0;
          var j3 = j2 + 1;
          k = k0;
          j2 = j3;
        }
        var k1 = k;
      } else {
        var k2 = 0;
        var enc1 = (void 0);
        var j4 = 0;
        L2: while (true) {
          if (!$.ltB(j4, tl)) break L2;
          var k3 = k2;
          var enc2 = $.CTC11.operator$index$1($.index(txt, j4));
          k3 = k2;
          if (!$.eqNullB(enc2)) {
            $.add$1($.add$1($.add$1(out.add$1($.substring$2(txt, k2, j4)), '&'), enc2), ';');
            k3 = j4 + 1;
          }
          enc1 = enc2;
          var j5 = j4 + 1;
          k2 = k3;
          j4 = j5;
        }
        k1 = k2;
      }
      if (k1 === 0) {
        return txt;
      }
      if ($.ltB(k1, tl)) {
        out.add$1($.substring$1(txt, k1));
      }
      return out.toString$0();
  }
};

$._isAllIds$bailout = function(list, offset, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = $.iterator(list);
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        if ($.gtB($.get$length(t1.next$0().get$seqs()), offset)) {
          return false;
        }
      }
      return true;
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.invokeClosure.$call$5 = $.invokeClosure;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC2 = Isolate.makeConstantList([]);
$.CTC15 = Isolate.makeConstantList([1, 0]);
$.CTC16 = Isolate.makeConstantList([2, 0]);
$.CTC17 = Isolate.makeConstantList([3, 0]);
$.CTC23 = Isolate.makeConstantList([0, 3]);
$.CTC18 = Isolate.makeConstantList([1, 4]);
$.CTC19 = Isolate.makeConstantList([2, 4]);
$.CTC20 = Isolate.makeConstantList([3, 4]);
$.CTC22 = Isolate.makeConstantList([0, 2]);
$.CTC = new Isolate.$isolateProperties.UIException('Only one activity is allowed');
$.CTC40 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC2, {}, 0);
$.CTC21 = Isolate.makeConstantList([0, 1]);
$.CTC3 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC26 = Isolate.makeConstantList([4, 3]);
$.CTC24 = Isolate.makeConstantList([4, 1]);
$.CTC25 = Isolate.makeConstantList([4, 2]);
$.CTC29 = Isolate.makeConstantList([3, 1]);
$.CTC28 = Isolate.makeConstantList([2, 1]);
$.CTC38 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '([-]?[0-9]+)');
$.CTC32 = Isolate.makeConstantList([3, 2]);
$.CTC33 = Isolate.makeConstantList([1, 3]);
$.CTC30 = Isolate.makeConstantList([1, 2]);
$.CTC10 = Isolate.makeConstantList(['<', '>', '&', '"']);
$.CTC11 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC10, {'<': 'lt', '>': 'gt', '&': 'amp', '"': 'quot'}, 4);
$.CTC27 = Isolate.makeConstantList([1, 1]);
$.CTC34 = Isolate.makeConstantList([2, 3]);
$.CTC48 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(safari)[ /]([\\w.]+)');
$.CTC41 = new Isolate.$isolateProperties._EmptyColl();
$.CTC42 = new Isolate.$isolateProperties._EmptyIter();
$.CTC31 = Isolate.makeConstantList([2, 2]);
$.CTC43 = new Isolate.$isolateProperties._AnchorOfRoot();
$.CTC36 = Isolate.makeConstantList(['north start', 'north center', 'north end', 'south start', 'south center', 'south end', 'west start', 'west center', 'west end', 'east start', 'east center', 'east end', 'top left', 'top center', 'top right', 'center left', 'center center', 'center right', 'bottom left', 'bottom center', 'bottom right']);
$.CTC61 = new Isolate.$isolateProperties.Object();
$.CTC35 = Isolate.makeConstantList([3, 3]);
$.CTC45 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(webkit)[ /]([\\w.]+)');
$.CTC54 = Isolate.makeConstantList(['left', 'top', 'right', 'bottom', 'width', 'height', 'display']);
$.CTC12 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC37 = new Isolate.$isolateProperties.ConstantMap(Isolate.$isolateProperties.CTC36, {'north start': Isolate.$isolateProperties.CTC15, 'north center': Isolate.$isolateProperties.CTC16, 'north end': Isolate.$isolateProperties.CTC17, 'south start': Isolate.$isolateProperties.CTC18, 'south center': Isolate.$isolateProperties.CTC19, 'south end': Isolate.$isolateProperties.CTC20, 'west start': Isolate.$isolateProperties.CTC21, 'west center': Isolate.$isolateProperties.CTC22, 'west end': Isolate.$isolateProperties.CTC23, 'east start': Isolate.$isolateProperties.CTC24, 'east center': Isolate.$isolateProperties.CTC25, 'east end': Isolate.$isolateProperties.CTC26, 'top left': Isolate.$isolateProperties.CTC27, 'top center': Isolate.$isolateProperties.CTC28, 'top right': Isolate.$isolateProperties.CTC29, 'center left': Isolate.$isolateProperties.CTC30, 'center center': Isolate.$isolateProperties.CTC31, 'center right': Isolate.$isolateProperties.CTC32, 'bottom left': Isolate.$isolateProperties.CTC33, 'bottom center': Isolate.$isolateProperties.CTC34, 'bottom right': Isolate.$isolateProperties.CTC35}, 21);
$.CTC49 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'OS[ /]([\\w_]+) like Mac OS');
$.CTC4 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC5 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC13 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC57 = new Isolate.$isolateProperties.NotImplementedException();
$.CTC51 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(mozilla)(?:.*? rv:([\\w.]+))?');
$.CTC50 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(msie) ([\\w.]+)');
$.CTC8 = new Isolate.$isolateProperties.UnsupportedOperationException('Not IdSpace');
$.CTC6 = new Isolate.$isolateProperties.UIException('type required');
$.CTC56 = Isolate.makeConstantList(['blur', 'click', 'focus', 'mouseDown', 'mouseMove', 'mouseOut', 'mouseOver', 'mouseUp', 'mouseWheel', 'scroll']);
$.CTC60 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC46 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(chrome)[ /]([\\w.]+)');
$.CTC44 = new Isolate.$isolateProperties.SystemException('document not ready yet');
$.CTC14 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC52 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC39 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '(\\w+)');
$.CTC47 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'android[ /]([\\w.]+)');
$.CTC55 = new Isolate.$isolateProperties.UIException('listener required');
$.CTC58 = new Isolate.$isolateProperties._SimpleClientRect(0, 0, 0, 0);
$.CTC59 = new Isolate.$isolateProperties.EmptyElementRect(Isolate.$isolateProperties.CTC2, Isolate.$isolateProperties.CTC58, Isolate.$isolateProperties.CTC58, Isolate.$isolateProperties.CTC58, Isolate.$isolateProperties.CTC58);
$.CTC53 = Isolate.makeConstantList(['animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'backface-visibility', 'background-composite', 'border-after', 'border-after-color', 'border-after-style', 'border-after-width', 'border-before', 'border-before-color', 'border-before-style', 'border-before-width', 'border-end', 'border-end-color', 'border-end-style', 'border-end-width', 'border-fit', 'border-horizontal-spacing', 'border-start', 'border-start-color', 'border-start-style', 'border-start-width', 'border-vertical-spacing', 'box-align', 'box-direction', 'box-flex', 'box-flex-group', 'box-lines', 'box-ordinal-group', 'box-orient', 'box-pack', 'box-reflect', 'color-correction', 'column-break-after', 'column-break-before', 'column-break-inside', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'filter', 'flex-align', 'flex-flow', 'flex-order', 'flex-pack', 'flow-from', 'flow-into', 'font-feature-settings', 'font-size-delta', 'font-smoothing', 'highlight', 'hyphenate-character', 'hyphenate-limit-after', 'hyphenate-limit-before', 'hyphenate-limit-lines', 'hyphens', 'line-box-contain', 'line-break', 'line-clamp', 'locale', 'logical-height', 'logical-width', 'margin-after', 'margin-after-collapse', 'margin-before', 'margin-before-collapse', 'margin-bottom-collapse', 'margin-collapse', 'margin-end', 'margin-start', 'margin-top-collapse', 'marquee', 'marquee-direction', 'marquee-increment', 'marquee-repetition', 'marquee-speed', 'marquee-style', 'mask', 'mask-attachment', 'mask-box-image', 'mask-box-image-outset', 'mask-box-image-repeat', 'mask-box-image-slice', 'mask-box-image-source', 'mask-box-image-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-position', 'mask-position-x', 'mask-position-y', 'mask-repeat', 'mask-repeat-x', 'mask-repeat-y', 'mask-size', 'match-nearest-mail-blockquote-color', 'max-logical-height', 'max-logical-width', 'min-logical-height', 'min-logical-width', 'nbsp-mode', 'padding-after', 'padding-before', 'padding-end', 'padding-start', 'perspective', 'perspective-origin', 'perspective-origin-x', 'perspective-origin-y', 'region-break-after', 'region-break-before', 'region-break-inside', 'region-overflow', 'rtl-ordering', 'tap-highlight-color', 'text-combine', 'text-decorations-in-effect', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-fill-color', 'text-orientation', 'text-security', 'text-size-adjust', 'text-stroke', 'text-stroke-color', 'text-stroke-width', 'transform', 'transform-origin', 'transform-origin-x', 'transform-origin-y', 'transform-origin-z', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'user-drag', 'user-modify', 'user-select', 'wrap-shape', 'writing-mode']);
$.CTC9 = new Isolate.$isolateProperties.IllegalArgumentException('null');
$.CTC7 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot modify');
$._pendingRequests = (void 0);
$._CC_A = (void 0);
$._cachedBrowserPrefix = (void 0);
$._mntCnt = 0;
$._firstMeasurementRequest = true;
$._nextMeasurementFrameScheduled = false;
$._pendingMeasurementFrameCallbacks = (void 0);
$._app = (void 0);
$._CC_z = (void 0);
$._CC_9 = (void 0);
$._CC_a = (void 0);
$._uuidNext = 0;
$.layoutManager = (void 0);
$._domEvtDisps = (void 0);
$.activity = (void 0);
$._afters = (void 0);
$._cacheXAnchorHandlers = (void 0);
$._nsnms = (void 0);
$._broadcaster = (void 0);
$._cacheYAnchorHandlers = (void 0);
$.viewConfig = (void 0);
$._CC_Z = (void 0);
$.prefix = (void 0);
$._getTypeNameOf = (void 0);
$._illnms = (void 0);
$.browser = (void 0);
$._CC_0 = (void 0);
var $ = null;
Isolate.$finishClasses();
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
$.defineProperty(Object.prototype, 'is$UIEvent', function() { return false; });
$.defineProperty(Object.prototype, 'is$Window', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type=", "target?", "name="], {
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

$.$defineNativeClass('HTMLAreaElement', ["target?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value=", "name?"], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
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

$.$defineNativeClass('HTMLBaseElement', ["target?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type="], {
});

$.$defineNativeClass('Blob', ["type?", "size?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?", "name="], {
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
  this.setProperty$3('' + $.stringToString($._browserPrefix()) + 'transform', value, '');
 },
 get$transform: function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'transform');
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
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
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

$.$defineNativeClass('CanvasRenderingContext2D', ["fillStyle!"], {
 transform$6: function(m11, m12, m21, m22, dx, dy) {
  return this.transform(m11,m12,m21,m22,dx,dy);
 },
 get$transform: function() { return new $.Closure101(this); },
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
_ConsoleImpl.get$timeStamp = function() { return new $.Closure102(this); };
_ConsoleImpl.profile$1 = function(title) {
  return this.profile(title);
 };
_ConsoleImpl.get$profile = function() { return new $.Closure103(this); };
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
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
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC52.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 createDocumentFragment$0: function() {
  return this.createDocumentFragment();
 },
 head$0: function() { return this.head.$call$0(); },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 set$title: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Title can\'t be set for document fragments.'));
 },
 set$id: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('ID can\'t be set for document fragments.'));
 },
 get$style: function() {
  return $.Element$tag('div').get$style();
 },
 get$dataAttributes: function() {
  return $.CTC40;
 },
 get$classes: function() {
  var t0 = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  return t0;
 },
 get$attributes: function() {
  return $.CTC40;
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
  var t0 = new $.Closure91();
  var t1 = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(t1, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t0, t1);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
 insertAdjacentHTML$2: function(where, text) {
  this._insertAdjacentNode$2(where, $.DocumentFragment$html(text));
 },
 _insertAdjacentNode$2: function(where, node) {
  $0:{
    var t0 = $.toLowerCase(where);
    if ('beforebegin' === t0) {
      return;
    } else {
      if ('afterend' === t0) {
        return;
      } else {
        if ('afterbegin' === t0) {
          this.insertBefore$2(node, this.get$nodes().get$first());
          return node;
        } else {
          if ('beforeend' === t0) {
            $.add$1(this.get$nodes(), node);
            return node;
          } else {
            throw $.captureStackTrace($.IllegalArgumentException$1('Invalid position ' + $.stringToString(where)));
          }
        }
      }
    }
  }
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) {
    this._elements = $.FilteredElementList$1(this);
  }
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentType', ["name?"], {
});

$.$defineNativeClass('Element', ["title!", "style?", "offsetParent?", "nextElementSibling?", "innerHTML!", "id=", "hidden?"], {
 $dom_setAttribute$2: function(name, value) {
  return this.setAttribute(name,value);
 },
 $dom_removeAttribute$1: function(name) {
  return this.removeAttribute(name);
 },
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 insertAdjacentHTML$2: function(where, html) {
  return this.insertAdjacentHTML(where,html);
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
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$rect: function() {
  var t0 = new $.Closure87(this);
  var t1 = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(t1, ({T: 'ElementRect'}));
  return $._createMeasurementFuture(t0, t1);
 },
 rect$4: function(arg0, arg1, arg2, arg3) { return this.get$rect().$call$4(arg0, arg1, arg2, arg3); },
 get$dataAttributes: function() {
  return $._DataAttributeMap$1(this.get$attributes());
 },
 get$classes: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$classes')) {
    return $._CssClassSet$1(this);
  } else {
    return Object.prototype.get$classes.call(this);
  }
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
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
  return $._ElementAttributeMap$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('ElementTraversal', ["nextElementSibling?"], {
});

$.$defineNativeClass('HTMLEmbedElement', ["width=", "type=", "name=", "height=", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', ["name?"], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback),$.convertDartClosureToJS(errorCallback));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback);
  errorCallback = $.convertDartClosureToJS(errorCallback);
  return this.remove(successCallback);
},
 moveTo$4: function(parent, name, successCallback, errorCallback) {
  return this.moveTo(parent,name,$.convertDartClosureToJS(successCallback),$.convertDartClosureToJS(errorCallback));
 },
 moveTo$2: function(parent$,name$) {
  successCallback = $.convertDartClosureToJS(successCallback);
  errorCallback = $.convertDartClosureToJS(errorCallback);
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
});

$.$defineNativeClass('EventException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?", "name="], {
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["position?", "length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["position?", "length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', ["size?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["target?", "name=", "length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', ["width?", "name=", "location?", "height?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
 is$List2: function() { return true; },
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
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
    return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 source$1: function(arg0) { return this.source.$call$1(arg0); },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
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
  return $._InputElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
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

$.$defineNativeClass('HTMLLinkElement', ["type=", "target?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', ["name="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', ["width=", "height=", "direction!"], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure105(this); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', [], {
 source$1: function(arg0) { return this.source.$call$1(arg0); }
});

$.$defineNativeClass('MessagePort', [], {
 start$0: function() {
  return this.start();
 },
 get$start: function() { return new $.Closure106(this); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
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
  }catch (t0) {
    $.unwrapException(t0);
  }
  return this;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
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
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._parent.$dom_appendChild$1(t1);
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type=", "start?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["width=", "type=", "name=", "height=", "border!", "align?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OperationNotAllowedException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
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
 is$List2: function() { return true; },
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
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.stringToString(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 get$classes: function() {
  if (this.get$_cssClassSet() === (void 0)) {
    this.set$_cssClassSet($._AttributeClassSet$1(this.get$_ptr()));
  }
  return this.get$_cssClassSet();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', ["previousSibling?", "nextSibling?", "lastChild?", "firstChild?"], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
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

$.$defineNativeClass('SVGFilterPrimitiveStandardAttributes', ["y?", "x?", "width?", "height?"], {
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

$.$defineNativeClass('SVGStylable', ["style?"], {
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

$.$defineNativeClass('SVGTransformable', ["transform?"], {
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

$.$defineNativeClass('ScriptProfileNode', ["children?"], {
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

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', ["name?"], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
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
 get$start: function() { return new $.Closure108(this); },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
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
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $.Closure23(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $.Closure73(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    }
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
  if (this.containsKey$1(key) !== true) {
    this.operator$indexSet$2(key, ifAbsent.$call$0());
  }
  return this.operator$index$1(key);
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "size?", "position?", "id=", "align?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
 start$1: function(index) {
  return this.start(index);
 },
 get$start: function() { return new $.Closure109(this); }
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 previousSibling$0: function() {
  return this.previousSibling();
 },
 get$previousSibling: function() { return new $.Closure110(this); },
 nextSibling$0: function() {
  return this.nextSibling();
 },
 get$nextSibling: function() { return new $.Closure111(this); },
 lastChild$0: function() {
  return this.lastChild();
 },
 get$lastChild: function() { return new $.Closure112(this); },
 firstChild$0: function() {
  return this.firstChild();
 },
 get$firstChild: function() { return new $.Closure113(this); },
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
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeRange$2: function(start, rangeLength) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeRange on immutable List.'));
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf(this, element, start, $.get$length(this));
 },
 indexOf$1: function(element) {
  return this.indexOf$2(element,0)
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
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

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
 is$UIEvent: function() { return true; }
});

$.$defineNativeClass('DOMWindow', ["parent?", "outerWidth?", "outerHeight?", "navigator?", "name=", "location?", "length?", "innerWidth?", "innerHeight?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
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
 alert$1: function(message) {
  return this.alert(message);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 },
 requestAnimationFrame$1: function(callback) {
  callback = $.convertDartClosureToJS(callback);
      if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
          };
    }
    return window.requestAnimationFrame(callback);
;
 },
 get$top: function() {
  return $._createSafe(this.get$_top());
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
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?", "location?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 clearTimeout$1: function(handle) {
  return this.clearTimeout(handle);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
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
  return this.removeEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["name?", "message?"], {
 toString$0: function() {
  return this.toString();
 }
});

// 358 dynamic classes.
// 403 classes
// 36 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_CSSValueListImpl)*/ = 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v9/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v10/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v11/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v12/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v13/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v14/*class(_NodeImpl)*/ = [v9/*class(_ElementImpl)*/,v10/*class(_DocumentFragmentImpl)*/,v11/*class(_DocumentImpl)*/,v12/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v15/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v16/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v17/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGStylable', 'SVGStylable|SVGFilterPrimitiveStandardAttributes'],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v17/*class(_AbstractWorkerImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['UIEvent', v8/*class(_UIEventImpl)*/],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['WorkerContext', v13/*class(_WorkerContextImpl)*/],
    ['CSSValueList', v1/*class(_CSSValueListImpl)*/],
    ['CSSValue', [v1/*class(_CSSValueListImpl)*/,'CSSValue|SVGColor|SVGPaint|CSSPrimitiveValue'].join('|')],
    ['CharacterData', v12/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v11/*class(_DocumentImpl)*/],
    ['DocumentFragment', v10/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v9/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v8/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v14/*class(_NodeImpl)*/],
    ['MediaStream', v15/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v16/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v13/*class(_WorkerContextImpl)*/,v14/*class(_NodeImpl)*/,v15/*class(_MediaStreamImpl)*/,v16/*class(_IDBRequestImpl)*/,v17/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.main();
  });
} else {
  $.main();
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
Isolate.$finishClasses = function() {
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
