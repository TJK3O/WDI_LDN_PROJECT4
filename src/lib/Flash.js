class Flash {

  _messages = null;

  // Static method calls are made directly on the class and are not callable on instances of the class. Static methods are often used to create utility functions. Static methods are not directly accessible using the this keyword from non-static methods. You need to call them using the class name: CLASSNAME.STATIC_METHOD_NAME() or by calling the method as a property of the constructor: this.constructor.STATIC_METHOD_NAME(). This does the same as assigning it as a function property e.g. User.staticMethod = function()

  static setMessage(type, message) {
    // if there aren't any messages then this._messages becomes an empty object
    this._messages = this._messages || {};
    this._messages[type] = message;
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }
}

export default Flash;
