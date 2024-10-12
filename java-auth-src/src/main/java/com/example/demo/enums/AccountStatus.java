package com.example.demo.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AccountStatus {
    CREATED("created"), APPLIED("applied"), APPROVED("approved");

    private String status;
}
