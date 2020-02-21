//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';
import { SecretLensProvider } from '../src/secretlens';

// Defines a Mocha test suite to group tests of similar kind together
describe("secretlens", () => {
    var provider: SecretLensProvider;
    before(() => {
        provider = new SecretLensProvider();

        provider.getFunction().setPassword("teste");

    });

    context("encrypt", () => {
        it("should encrypt correctly", () => {
            provider.getFunction().setUseSalt(false);
            var tests = [
                {
                    method: 'default',
                    text: 'test',
                    encrypted: '46800f525d58bb6a3886d37a247bd4db'
                },{
                    method: 'pbkdf2',
                    text: 'test',
                    encrypted: 'pbkdf2:53616c7465645f5f0000000000000000b455bed4b84f8cbea2afb755feeac6fe'
                }
            ];
            tests.forEach(test => {
                assert.equal(provider.getFunction().encrypt(test.text, test.method), test.encrypted);
            });
        });
    });
    context("decrypt", () => {
        it("should decrypt correctly", () => {
            provider.getFunction().setUseSalt(true);
            var tests = [
                {
                    text: 'test',
                    encrypted: '7cdfda208c21275a6188573a4f2476e6c2e89f9579107a813ab8defab1f69956'
                },{
                    text: 'test',
                    encrypted: 'pbkdf2:53616c7465645f5f8e30a5ff83f7d2612164ab18781b486929de0746f3157a27'
                }
            ];
            tests.forEach(test => {
                assert.equal(provider.getFunction().decrypt(test.encrypted), test.text);
            });
        });
    });
});