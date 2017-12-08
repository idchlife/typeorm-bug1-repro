import "reflect-metadata";
import { createConnection } from "typeorm";
import { Connection } from "typeorm/connection/Connection";
import * as fs from "fs";
import Parent from "./entities/Parent";
import Child from "./entities/Child";
import * as assert from "assert";

let connection: Connection;

async function bootstrap() {
  connection = await createConnection({
    type: "postgres",
    entities: [__dirname + "/entities/*.js"],
    // Replace with yours
    password: "typeorm_test",
    username: "typeorm_test",
    database: "typeorm_test",
    synchronize: true
  });
}

async function test() {
  let parent = new Parent();
  
  parent = await connection.manager.save(parent);

  let child = new Child();

  child.parent = parent;

  child = await connection.manager.save(child);

  parent.modifyObj();

  parent = await connection.manager.save(parent);

  const refreshedChild = await connection.manager.findOne(Child, {
    where: { id: child.id },
    relations: ["parent"]
  });

  assert(refreshedChild.parent instanceof Parent, "Parent was removed from child");

  console.log("Everything is OK");
}

async function init() {
  await bootstrap();
  await test()
}

init();