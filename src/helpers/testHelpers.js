function stubPrototype(classToStub, functionToStub, stubCB) {
  const holder = classToStub.prototype[functionToStub];
  classToStub.prototype[functionToStub] = jest.fn(stubCB);
  return () => {
    classToStub.prototype[functionToStub] = holder;
  };
}

module.exports = {
  stubPrototype
};