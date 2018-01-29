if (process.browser) {
  var jsSHA = require("jssha/src/sha256");

  module.exports = {
    hmac: function(key, string, encoding) {
      var shaObject = new jsSHA("SHA-256", "TEXT");
      shaObject.setHMACKey(key);
      shaObject.update(string);
      return shaObject.getHMAC(encoding);
    },
    hash: function(string, encoding) {
      var shaObject = new jsSHA("SHA-256", "TEXT");
      shaObject.update(string);
      return shaObject.getHash(encoding);
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
