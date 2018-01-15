import * as mocha from 'mocha';
import * as superTest from 'supertest';
import { SuperTest, Test } from 'supertest';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

import app from '../../src/app';
import { InsertBody, TableUpdateBody }
    from '../../src/controllers/restaurants/index';

describe("Restaurant Route", function () {

    let request: SuperTest<Test>;
    let id: string;

    before(function () {
        chai.should();
        chai.use(chaiAsPromised);
        request = superTest(app);
    });

    it("Get empty", function () {
        return request.get("/api/v1/restaurants")
            .expect(200)
            .should.eventually
            .property("body")
            .property("data")
            .to.deep.equal([]);
    });

    it("Insert", function () {
        let res1: InsertBody = {
            tablesNumber: 10,
            restaurant: {
                nombre: "La Pizzarra",
                contacto: "8311313",
                direccion: "Parque el recuerdo",
                imagen: "http://",
                localizacion: {
                    type: "Point",
                    coordinates: [-76.59766137599945,
                        2.4531361343614724]
                }
            }
        }

        return request.post("/api/v1/restaurants")
            .set("Content-Type", "application/json")
            .send(res1)
            .expect(200)
            .should.eventually.property("body")
            .property("success").true
    });

    it("Get all", function (done) {
        request.get("/api/v1/restaurants")
            .expect(200)
            .then(res => {
                id = res.body.data[0]._id;
                res.body.data.should.to.have.lengthOf(1);                
                done();
            })
            .catch(err => done(err));

        //.should.eventually.property("body")
        //.property("data").to.have.lengthOf(1);
    });

    it("Get by Location", function () {
        return request.get("/api/v1/restaurants/point")
            .query({ lat: 2.452403, lon: -76.598183, km: 1 })
            .expect(200)
            .should.eventually.property("body")
            .property("data").to.have.lengthOf(1);
    });

    it("Get empty by Location", function () {
        return request.get("/api/v1/restaurants/point")
            .query({ lat: 2.4419159701623965, lon: -76.60635709762573, km: 1 })
            .expect(200)
            .should.eventually.property("body")
            .property("data").to.have.lengthOf(0);
    });

    it("Get Tables", function () {
        return request.get("/api/v1/restaurants/" + id + "/tables")
            .expect(200)
            .should.eventually.property("body")
            .property("data").to.have.lengthOf(10);
    });

    it("Update available table", function () {
        let body: TableUpdateBody = { table: 4, available: false };
        return request.put("/api/v1/restaurants/" + id + "/tables")
            .set("Content-Type", "application/json")
            .send(body)
            .should.eventually.property("body")
            .property("success").true;
    });

    it("Get available tables", function () {
        return request.get("/api/v1/restaurants/" + id + "/tables/available")
            .expect(200)
            .should.eventually.property("body")
            .property("data").to.have.lengthOf(9);
    });

    it("Delete restaurant", function () {
        return request.delete("/api/v1/restaurants/" + id)
            .expect(200)
            .should.eventually.property("body")
            .property("success").true;
    });

});