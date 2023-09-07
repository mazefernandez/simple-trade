// Test for user API 
const server = require("../server")

const chai = require("chai")
const chaiHttp = require("chai-http")

chai.use(chaiHttp)
const expect = chai.expect

describe("User", () => {
    const url = "http://localhost:3000"
    describe("/api/auth/register", () => {
        it("should register a new user", (done) => {
            var user = {
                "username": "testUser",
                "password": "t3sTPassw@rd"
            }
            chai.request(url)
                .post("/api/auth/register")
                .send(user)
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("message").that.is.equal("An error occurred")
                    }
                    else {
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property("message").that.is.equal("User created successfully")
                    }
                    done()
                })
        })
    })    
    describe("/api/auth/login", () => {
        it("should login to a user account", (done) => {
            var user = {
                "username": "testUser",
                "password": "t3sTPassw@rd"
            }
            chai.request(url)
                .post("/api/auth/login")
                .send(user)
                .end((err, res) => {
                    if (err) {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property("message").that.is.equal("Login not successful")
                    }
                    else {
                        expect(res).to.have.status(201)
                        expect(res.body).to.have.property("message").that.is.equal("Login was successful")
                    }
                    done()
                })
        })
    })
})