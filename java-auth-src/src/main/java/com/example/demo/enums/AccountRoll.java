package com.example.demo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AccountRoll {

    ADMINISTRATOR("administrator"), STUDENT("student"), GRADUATE("graduate");

    private final String roll;

}
