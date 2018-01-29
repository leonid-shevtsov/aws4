if (process.browser) {
  var jsSHA = require("jssha/src/sha256");

  // Determines type of argument for jsSHA functions
  function typeOfArgument(arg) {
    return typeof arg === "string" ? "TEXT" : "ARRAYBUFFER";
  }

  module.exports = {
    hmac: function(key, string, encoding) {
      if (typeof string === "string")
        var shaObject = new jsSHA("SHA-256", typeOfArgument(string));
      shaObject.setHMACKey(key, typeOfArgument(key));
      shaObject.update(string);
      return shaObject.getHMAC(encoding === "hex" ? "HEX" : "ARRAYBUFFER");
    },
    hash: function(string, encoding) {
      var shaObject = new jsSHA("SHA-256", typeOfArgument(string));
      shaObject.update(string);
      return shaObject.getHash(encoding === "hex" ? "HEX" : "ARRAYBUFFER");
    }
  };
} else {
  var crypto = require("crypto");

  module.exports = {
    hmac: function(key, string, encoding) {
      return crypto
        .createHmac("sha256", key)
        .update(string, "utf8")
        .digest(encoding);
    },

    hash: function(string, encoding) {
      return crypto
        .createHash("sha256")
        .update(string, "utf8")
        .digest(encoding);
    }
  };
}
