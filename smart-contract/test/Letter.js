const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Letter", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Letter = await ethers.getContractFactory("Letter");
    const letter = await Letter.deploy();

    return { letter, owner, otherAccount };
  }

  it("Should set the right owner", async function () {
    const { letter, owner } = await loadFixture(deployOneYearLockFixture);

    expect(await letter.owner()).to.equal(owner.address);
  });

  it("Should get error if content is null", async function () {
    const { letter, otherAccount } = await loadFixture(deployOneYearLockFixture);

    await expect(letter.connect(otherAccount).create('')).to.be.revertedWith(
      "You did not enter content"
    );
  });
});
  