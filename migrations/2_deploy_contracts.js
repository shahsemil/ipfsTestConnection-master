const evidence = artifacts.require("evidence");

module.exports = function(deployer) {
  deployer.deploy(evidence);
};
