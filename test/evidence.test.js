const { assert } = require('chai')
const Evidence=artifacts.require("evidence")
require('chai')
.use(require('chai-as-promised'))
.should()
contract('evidence',(accounts)=>{
    let evidence
    before(async ()=>{
        evidence = await Evidence.deployed()
    })
    describe('deployment',async()=>{
        it('deploys contract',async()=>{
            const address= evidence.address
            assert.notEqual(address,'')
            assert.notEqual(address,0X0)
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)

        })

    })
    describe('storage',async()=>{
        it('updates the evidenceHash',async ()=>{
           let evidenceHash = 'abc123'
           await evidence.set(evidenceHash)
           const result= await evidence.get()
           assert.equal(result,evidenceHash) 
        })
    })
})