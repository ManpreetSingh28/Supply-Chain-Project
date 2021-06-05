const shim = require("fabric-shim");
const util = require("util");
const { throws } = require("assert");

var Chaincode = class {
  async Init(stub) {
    console.info("Intialized");
    return shim.success();
  }

  async Invoke(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    let method = this[ret.fcn];
    if (!method) {
      console.log("no method of name:" + ret.fcn + " found");
      return shim.success();
    }
    try {
      let payload = await method(stub, ret.params);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  async enrollEntity(stub, args) {
    // stub.putState("esting", Buffer.from(args[0]));
    let ret = stub.getFunctionAndParameters();
    let json = JSON.parse(args[0]);
    try {
      json.forEach(async (data, index) => {
        let errorData = [];
        let foundData = await stub.getState(data["basicDetails"]["emailId"]);
        console.log("foundData", foundData.toString());

        if (foundData.toString()) {
          console.info(
            `This Email is Already registered : ${data["basicDetails"]["emailId"]}`
          );
          if (json.length - 1 == index) {
            throw new Error(errorData);
          } else {
            errorData.push(data);
          }
        }
        console.log("email", data["basicDetails"]["emailId"]);
        try {
          await stub.putState(
            data["basicDetails"]["emailId"],
            Buffer.from(JSON.stringify(data))
          );
          // if (json.length - 1 == index)
          //   await stub.SetEvent(
          //     "enrollEntity",
          //     Buffer.from(JSON.stringify(json))
          //   );
        } catch (error) {
          console.log(error);
          if (json.length - 1 == index) {
            throw new Error(errorData.length > 0 ? errorData : error);
          } else {
            errorData.push(data);
          }
        }
      });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  async readEntity(stub, args) {
    let emailId = args[0];
    let jsonResp = {};
    let Avalbytes = await stub.getState(emailId);
    if (!Avalbytes || Avalbytes.toString().length <= 0) {
      throw new Error(`data with this emaiId does not exist: ${emailId}`);
    }
    console.log(Avalbytes.toString());

    let data = JSON.parse(Avalbytes.toString());
    return JSON.stringify(data);
  }
};

shim.start(new Chaincode());