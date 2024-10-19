package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class AccountInfoDto implements Serializable {
    private String userId;
    private String givenName;
    private String familyName;
    private String password;
}
