import "react-native";
import React, { Component } from "react";
import Connect from "../Connect";

describe("Connect", () => {
    const comp = new Connect({});

    beforeEach(() => {
        jest.resetAllMocks;
        comp.setState = jest.fn();
    });
    it("Should update Port in state", () => {
        comp.updatePort("1234");
        expect(comp.setState).toBeCalledWith({ port: "1234" });
    });

    it("Should update Host in state", () => {
        comp.updateHost("192.168.1.1");
        expect(comp.setState).toBeCalledWith({ host: "192.168.1.1" });
    });

    it.skip('should call onChange prop', () => {
        // const event = {
        //     preventDefault() { },
        //     target: { value: 'onChange' }
        // };
        // const component = enzyme.shallow(<InputBox onSearch={onSearchMock} />);
        // component.find('input').simulate('change', event);
        // expect(onSearchMock).toBeCalledWith('the-value');
    });
});