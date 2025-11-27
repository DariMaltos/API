import test from "node:test";
import assert from "node:assert";
import { multiplicar } from "../src/multiplicar.js";

test("Debe multiplicar dos números positivos", () => {
  assert.strictEqual(multiplicar(3, 5), 15);
});
